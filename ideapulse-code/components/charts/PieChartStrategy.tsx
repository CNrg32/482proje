import React from 'react';
import { ChartStrategy, MoodData } from './ChartStrategy';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];
const MOOD_LABELS: { [key: string]: string } = {
  inspired: 'İlham dolu',
  excited: 'Heyecanlı',
  neutral: 'Nötr',
  tired: 'Yorgun',
};

function moodDataToChartData(data: MoodData) {
  return Object.entries(data)
    .filter(([_, value]) => value > 0)
    .map(([mood, value]) => ({ name: MOOD_LABELS[mood] || mood, value }));
}

export class PieChartStrategy implements ChartStrategy {
  render(data: MoodData): React.ReactNode {
    const chartData = moodDataToChartData(data);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
} 