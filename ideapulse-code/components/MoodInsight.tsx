import React, { useState } from 'react';
import { ChartStrategy, MoodData } from './charts/ChartStrategy';
import { PieChartStrategy } from './charts/PieChartStrategy';
import { BarChartStrategy } from './charts/BarChartStrategy';

interface Props {
  data: MoodData;
}

const strategies: { [key: string]: ChartStrategy } = {
  pie: new PieChartStrategy(),
  bar: new BarChartStrategy(),
};

const MoodInsight: React.FC<Props> = ({ data }) => {
  const [type, setType] = useState<'pie' | 'bar'>('pie');
  const strategy = strategies[type];

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setType('pie')} className="btn-primary mr-2">Pie Chart</button>
        <button onClick={() => setType('bar')} className="btn-secondary">Bar Chart</button>
      </div>
      {strategy.render(data)}
    </div>
  );
};

export default MoodInsight; 