"use client";
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// Example data format
// [
//   { date: '2026-01', value: 120 },
//   { date: '2026-02', value: 130 },
// ]

export default function DataChart({
  title = 'Mumbai Property Price Index',
  data = [],
  source = 'Source: Mumbai Real Estate Board',
}) {
  return (
    <div className="prose-nyt mx-auto w-full">
      {/* Chart Header */}
      <div className="mb-2">
        <div className="font-serif text-lg md:text-xl font-bold text-ink text-center">
          {title}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 16, right: 16, left: 16, bottom: 0 }}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#1A1A1A' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#1A1A1A' }}
            width={40}
          />
          <Tooltip
            contentStyle={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              background: '#FCFAF8',
              border: '1px solid #E5E5E5',
              color: '#1A1A1A',
              boxShadow: 'none',
              padding: '6px 10px',
            }}
            labelStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#1A1A1A' }}
            cursor={{ stroke: '#1A1A1A', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1A1A1A"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: '#1A1A1A', strokeWidth: 1, fill: '#FCFAF8' }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Source Note */}
      <div className="mt-2 text-xs font-serif italic text-ink text-center opacity-70">
        {source}
      </div>
    </div>
  );
}
