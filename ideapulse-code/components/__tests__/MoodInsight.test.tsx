import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoodInsight from '../MoodInsight';

jest.mock('../charts/PieChartStrategy', () => {
  return {
    PieChartStrategy: jest.fn().mockImplementation(() => ({
      render: () => <div>Pie Chart Rendered</div>,
    })),
  };
});

jest.mock('../charts/BarChartStrategy', () => {
  return {
    BarChartStrategy: jest.fn().mockImplementation(() => ({
      render: () => <div>Bar Chart Rendered</div>,
    })),
  };
});

describe('MoodInsight', () => {
  const data = { inspired: 3, excited: 2, neutral: 1, tired: 4 };

  it('başlangıçta Pie Chart render ediliyor', () => {
    render(<MoodInsight data={data} />);
    expect(screen.getByText('Pie Chart Rendered')).toBeInTheDocument();
  });

  it('Bar Chart butonuna tıklanınca Bar Chart render ediliyor', () => {
    render(<MoodInsight data={data} />);
    fireEvent.click(screen.getByText('Bar Chart'));
    expect(screen.getByText('Bar Chart Rendered')).toBeInTheDocument();
  });

  it('Pie Chart butonuna tıklanınca Pie Chart tekrar render ediliyor', () => {
    render(<MoodInsight data={data} />);
    fireEvent.click(screen.getByText('Bar Chart'));
    fireEvent.click(screen.getByText('Pie Chart'));
    expect(screen.getByText('Pie Chart Rendered')).toBeInTheDocument();
  });
}); 