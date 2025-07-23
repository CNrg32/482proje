import React from 'react';

export interface ChartStrategy {
  render(data: MoodData): React.ReactNode;
}

export type MoodData = { [mood: string]: number }; 