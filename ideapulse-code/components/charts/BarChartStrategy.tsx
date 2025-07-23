import React from 'react';
import { ChartStrategy, MoodData } from './ChartStrategy';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

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

export class BarChartStrategy implements ChartStrategy {
  render(data: MoodData): React.ReactNode {
    const chartData = moodDataToChartData(data);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Fikir Sayısı">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
} 