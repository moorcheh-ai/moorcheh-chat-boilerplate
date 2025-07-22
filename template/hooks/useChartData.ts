import { useState, useEffect } from 'react';

export interface DataPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill?: boolean;
  }[];
}

export default function useChartData() {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'expenses' | 'profit'>('revenue');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  // Simulated API data
  const mockData: DataPoint[] = [
    { date: 'Jan', revenue: 12000, expenses: 8500, profit: 3500 },
    { date: 'Feb', revenue: 19000, expenses: 12000, profit: 7000 },
    { date: 'Mar', revenue: 15000, expenses: 9800, profit: 5200 },
    { date: 'Apr', revenue: 24500, expenses: 15000, profit: 9500 },
    { date: 'May', revenue: 28000, expenses: 16200, profit: 11800 },
    { date: 'Jun', revenue: 32000, expenses: 18500, profit: 13500 }
  ];

  // Function to update chart data based on selected metric and time range
  const updateChartData = () => {
    setLoading(true);
    
    // In a real app, this would be an API call with the selected parameters
    setTimeout(() => {
      try {
        // Filter data based on time range if necessary
        let filteredData = mockData;
        if (timeRange === 'month') {
          filteredData = mockData.slice(-3); // Last 3 months
        } else if (timeRange === 'quarter') {
          filteredData = mockData.slice(-6); // Last 6 months
        }
        
        // Build dataset for the selected metric
        const labels = filteredData.map(d => d.date);
        let newData: ChartData = {
          labels,
          datasets: [],
        };

        // Add the primary metric
        switch (selectedMetric) {
          case 'revenue':
            newData.datasets.push({
              label: 'Revenue',
              data: filteredData.map(d => d.revenue),
              borderColor: 'rgb(59, 130, 246)', // blue
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true,
            });
            break;
          case 'expenses':
            newData.datasets.push({
              label: 'Expenses',
              data: filteredData.map(d => d.expenses),
              borderColor: 'rgb(239, 68, 68)', // red
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.3,
              fill: true,
            });
            break;
          case 'profit':
            newData.datasets.push({
              label: 'Profit',
              data: filteredData.map(d => d.profit),
              borderColor: 'rgb(34, 197, 94)', // green
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.3,
              fill: true,
            });
            break;
        }

        setData(newData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error loading chart data'));
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate API delay
  };

  // Update chart when selections change
  useEffect(() => {
    updateChartData();
  }, [selectedMetric, timeRange]);

  return {
    data,
    loading,
    error,
    selectedMetric,
    setSelectedMetric,
    timeRange,
    setTimeRange,
    updateChartData
  };
} 