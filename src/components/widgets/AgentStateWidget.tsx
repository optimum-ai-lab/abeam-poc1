import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_AGENT_STATES } from '../../data';

export function AgentStateWidget() {
  return (
    <div className="h-full w-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={MOCK_AGENT_STATES}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: '#334155', opacity: 0.4 }}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
          />
          <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
