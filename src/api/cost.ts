/**
 * Cost / Billing API — mock implementation.
 *
 * Each function mirrors a real REST route:
 *   GET /api/cost/summary     → fetchCostSummary()
 *   GET /api/cost/trend       → fetchCostTrend(range)
 *   GET /api/cost/budget      → fetchBudget()
 *   GET /api/cost/drivers     → fetchCostDrivers(period)
 *
 * All functions return Promises so callers are unaffected when the real
 * backend replaces the mock data — only this file changes.
 *
 * Response schema
 * ───────────────
 * All amounts are USD floats rounded to 2 decimal places.
 * Timestamps follow ISO-8601 (UTC).
 * Delta values are percentage points (positive = increase vs. prior period).
 */

import {
  BudgetUtilizationData,
  CostDriversData,
  CostSummaryData,
  CostTrendData,
} from '../types';
import {
  MOCK_BUDGET,
  MOCK_COST_DRIVERS,
  MOCK_COST_DRIVERS_WEEK,
  MOCK_COST_SUMMARY,
  MOCK_COST_TREND_24H,
  MOCK_COST_TREND_30D,
  MOCK_COST_TREND_7D,
} from '../data';

const SIMULATED_LATENCY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

/**
 * GET /api/cost/summary
 *
 * Returns aggregated cost KPIs for the current day and month, plus
 * per-run and per-task averages with period-over-period deltas.
 */
export function fetchCostSummary(): Promise<CostSummaryData> {
  return delay(MOCK_COST_SUMMARY);
}

/**
 * GET /api/cost/trend?range=24h|7d|30d
 *
 * Returns time-bucketed cost data:
 *   - 24h → hourly buckets, last 24 hours
 *   - 7d  → daily buckets, last 7 days
 *   - 30d → daily buckets, last 30 days
 *
 * Each point optionally includes a `budget` field for the reference
 * line overlay (only present when a budget limit is configured).
 */
export function fetchCostTrend(range: '24h' | '7d' | '30d' = '24h'): Promise<CostTrendData> {
  const data =
    range === '7d'
      ? MOCK_COST_TREND_7D
      : range === '30d'
        ? MOCK_COST_TREND_30D
        : MOCK_COST_TREND_24H;
  return delay(data);
}

/**
 * GET /api/cost/budget
 *
 * Returns configured budget limits for the current daily and monthly
 * periods alongside current cumulative spend and a projected end-of-period
 * spend based on the current burn rate.
 */
export function fetchBudget(): Promise<BudgetUtilizationData> {
  return delay(MOCK_BUDGET);
}

/**
 * GET /api/cost/drivers?period=today|week
 *
 * Returns per-agent cost records ranked by total cost descending.
 * Each record includes: agentId, agentName, totalCost, runCount,
 * costPerRun, and shareOfTotal (% of overall spend).
 */
export function fetchCostDrivers(period: 'today' | 'week' = 'today'): Promise<CostDriversData> {
  return delay(period === 'week' ? MOCK_COST_DRIVERS_WEEK : MOCK_COST_DRIVERS);
}
