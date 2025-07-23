import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoodSelector from '../MoodSelector';
import { Idea } from '@/types/idea';

describe('MoodSelector', () => {
  const moods: Idea['mood'][] = ['inspired', 'excited', 'neutral', 'tired'];

  it('tüm mood seçenekleri ve etiketleri render ediliyor', () => {
    render(<MoodSelector value="neutral" onChange={jest.fn()} />);
    expect(screen.getByText('Ruh haliniz')).toBeInTheDocument();
    expect(screen.getByText('İlham dolu')).toBeInTheDocument();
    expect(screen.getByText('Heyecanlı')).toBeInTheDocument();
    expect(screen.getByText('Nötr')).toBeInTheDocument();
    expect(screen.getByText('Yorgun')).toBeInTheDocument();
    expect(screen.getByText('Yaratıcı ve ilham dolu')).toBeInTheDocument();
    expect(screen.getByText('Enerji dolu ve heyecanlı')).toBeInTheDocument();
    expect(screen.getByText('Normal, sakin')).toBeInTheDocument();
    expect(screen.getByText('Düşük enerji, yorgun')).toBeInTheDocument();
  });

  it('seçili mood vurgulanıyor', () => {
    render(<MoodSelector value="excited" onChange={jest.fn()} />);
    const selected = screen.getByText('Heyecanlı').closest('button');
    expect(selected).toHaveClass('bg-blue-100');
  });

  it('mood butonuna tıklanınca onChange doğru mood ile çağrılıyor', () => {
    const onChange = jest.fn();
    render(<MoodSelector value="neutral" onChange={onChange} />);
    fireEvent.click(screen.getByText('İlham dolu').closest('button'));
    expect(onChange).toHaveBeenCalledWith('inspired');
    fireEvent.click(screen.getByText('Heyecanlı').closest('button'));
    expect(onChange).toHaveBeenCalledWith('excited');
    fireEvent.click(screen.getByText('Nötr').closest('button'));
    expect(onChange).toHaveBeenCalledWith('neutral');
    fireEvent.click(screen.getByText('Yorgun').closest('button'));
    expect(onChange).toHaveBeenCalledWith('tired');
  });
}); 