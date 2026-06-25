# Deployment — Azure Static Web Apps (ABeam POC)

The app is built and deployed by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
on every push to `main` (and manually via **Run workflow**).

- **Hosting:** Azure Static Web Apps
- **Resource group:** `client-abeam-rg-poc`
- **Auth:** OIDC federated credentials (no long-lived secret stored)
- **Build output uploaded:** `dist/`

---

## Current configuration (provisioned 2026-06-25)

Everything below is already set up — this section is the record of what exists.

| Item | Value |
|------|-------|
| Static Web App | `client-abeam-swa-poc1-poc` (separate demo app; existing apps untouched) |
| Live URL | <https://gray-stone-0a7b70d00.7.azurestaticapps.net> |
| Region | East Asia |
| App registration | `abeam-poc1-deploy` — client ID `8070a1f4-70c5-474e-bc0d-05228f20c737` |
| RBAC | `Contributor` scoped to **only** the SWA resource (least privilege) |
| Federated credential | subject `repo:optimum-ai-lab/abeam-poc1:environment:abeam-poc` |
| GitHub Environment | `abeam-poc` with secrets `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` |

> The reference instructions below document how this was set up (for re-creation
> or another environment). You don't need to repeat them for normal deploys.

---

## One value you must set

Edit `.github/workflows/deploy.yml` and replace the placeholder with the
Static Web App **resource name** that lives in `client-abeam-rg-poc`:

```yaml
env:
  AZURE_STATIC_WEB_APP_NAME: REPLACE_WITH_SWA_RESOURCE_NAME
```

Find it with:

```bash
az staticwebapp list --resource-group client-abeam-rg-poc \
  --query "[].name" -o tsv
```

If no Static Web App exists yet, create one (no GitHub integration — this
workflow deploys it):

```bash
az staticwebapp create \
  --name <swa-name> \
  --resource-group client-abeam-rg-poc \
  --location eastasia
```

---

## Required GitHub secrets

Set these in **Settings → Secrets and variables → Actions** (repo level, or on
the `abeam-poc` environment):

| Secret | Where to get it |
|--------|-----------------|
| `AZURE_CLIENT_ID` | App registration (service principal) client/app ID |
| `AZURE_TENANT_ID` | Azure AD tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Subscription containing `client-abeam-rg-poc` |

No client secret / deployment token is stored — the workflow logs in with OIDC
and resolves the Static Web Apps deployment token at runtime.

---

## One-time Azure setup (OIDC federated credential)

1. **Create an app registration** (service principal) for this deployment:

   ```bash
   az ad app create --display-name "abeam-poc-deploy"
   # note the appId -> AZURE_CLIENT_ID
   az ad sp create --id <appId>
   ```

2. **Grant it rights on the resource group** so it can read the SWA token and
   deploy:

   ```bash
   az role assignment create \
     --assignee <appId> \
     --role "Contributor" \
     --scope /subscriptions/<sub-id>/resourceGroups/client-abeam-rg-poc
   ```

3. **Add a federated credential** matching this repo. This repo deploys through
   the GitHub Environment `abeam-poc`, so the subject is environment-scoped:

   ```bash
   az ad app federated-credential create --id <appId> --parameters '{
     "name": "abeam-poc-main",
     "issuer": "https://token.actions.githubusercontent.com",
     "subject": "repo:optimum-ai-lab/abeam-poc1:environment:abeam-poc",
     "audiences": ["api://AzureADTokenExchange"]
   }'
   ```

   > If you remove `environment: abeam-poc` from the workflow, use a
   > branch-scoped subject instead:
   > `repo:optimum-ai-lab/abeam-poc1:ref:refs/heads/main`

4. **Create the GitHub Environment** named `abeam-poc`
   (**Settings → Environments**) and, optionally, add protection rules
   (required reviewers, etc.). The three `AZURE_*` secrets can live here.

---

## SPA routing

`public/staticwebapp.config.json` sets a navigation fallback to `/index.html`
so client-side deep links don't 404. Vite copies it into `dist/` at build time.

---

## How a deploy proceeds

1. Push to `main` → workflow triggers.
2. `npm ci` + `npm run build` → produces `dist/`.
3. `azure/login@v2` authenticates via OIDC.
4. `az staticwebapp secrets list` resolves the deployment token (fails loudly if
   the resource name is wrong / missing — no silent fallback).
5. `Azure/static-web-apps-deploy@v1` uploads `dist/` to the Static Web App.

The deployed URL is the Static Web App's default hostname (e.g.
`https://<swa-name>.azurestaticapps.net`) or a configured custom domain.
