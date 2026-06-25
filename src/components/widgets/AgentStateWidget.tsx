import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_AGENT_STATES } from '../../data';
import { useTheme } from '../../context/ThemeContext';

export function AgentStateWidget() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#94a3b8';
  const yAxisColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';
  const cursorColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="h-full w-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={MOCK_AGENT_STATES}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
          <XAxis type="number" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke={yAxisColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: cursorColor, opacity: 0.4 }}
            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px' }}
          />
          <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
