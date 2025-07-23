import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IdeaInput from '../IdeaInput';

describe('IdeaInput', () => {
  it('bileşen doğru şekilde render ediliyor', () => {
    render(<IdeaInput onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText('Fikrinizi yazın...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Etiketler (virgülle ayırın)')).toBeInTheDocument();
    expect(screen.getByText('Fikri Kaydet')).toBeInTheDocument();
  });

  it('kullanıcı metin ve etiket girişi yapabiliyor', () => {
    render(<IdeaInput onSubmit={jest.fn()} />);
    const textarea = screen.getByPlaceholderText('Fikrinizi yazın...');
    const input = screen.getByPlaceholderText('Etiketler (virgülle ayırın)');

    fireEvent.change(textarea, { target: { value: 'Yeni bir fikir' } });
    fireEvent.change(input, { target: { value: 'etiket1, etiket2' } });

    expect(textarea).toHaveValue('Yeni bir fikir');
    expect(input).toHaveValue('etiket1, etiket2');
  });

  it('form gönderildiğinde onSubmit doğru parametreyle çağrılıyor', () => {
    const handleSubmit = jest.fn();
    render(<IdeaInput onSubmit={handleSubmit} />);
    const textarea = screen.getByPlaceholderText('Fikrinizi yazın...');
    const input = screen.getByPlaceholderText('Etiketler (virgülle ayırın)');
    const button = screen.getByText('Fikri Kaydet');

    fireEvent.change(textarea, { target: { value: 'Test fikri' } });
    fireEvent.change(input, { target: { value: 'etiket1, etiket2' } });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const arg = handleSubmit.mock.calls[0][0];
    expect(arg.content).toBe('Test fikri');
    expect(arg.tags).toEqual(['etiket1', 'etiket2']);
    expect(arg.mood).toBeDefined();
  });

  it('Ctrl+Enter ile form gönderilebiliyor', () => {
    const handleSubmit = jest.fn();
    render(<IdeaInput onSubmit={handleSubmit} />);
    const textarea = screen.getByPlaceholderText('Fikrinizi yazın...');

    fireEvent.change(textarea, { target: { value: 'Klavye testi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
}); 