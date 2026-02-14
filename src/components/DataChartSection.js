"use client";
import dynamic from 'next/dynamic';

const DataChart = dynamic(() => import('./DataChart'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

export default function DataChartSection({ data }) {
  return <DataChart data={data} />;
}
