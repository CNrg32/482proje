import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IdeaList from '../IdeaList';
import { Idea } from '@/types/idea';

describe('IdeaList', () => {
  const ideas: Idea[] = [
    {
      id: '1',
      content: 'Birinci fikir',
      tags: ['etiket1', 'etiket2'],
      mood: 'inspired',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      content: 'İkinci fikir',
      tags: ['etiket3'],
      mood: 'tired',
      timestamp: new Date().toISOString(),
    },
  ];

  it('fikirler listeleniyor', () => {
    render(
      <IdeaList ideas={ideas} onDelete={jest.fn()} onEdit={jest.fn()} />
    );
    expect(screen.getByText('Birinci fikir')).toBeInTheDocument();
    expect(screen.getByText('İkinci fikir')).toBeInTheDocument();
    expect(screen.getByText('#etiket1')).toBeInTheDocument();
    expect(screen.getByText('#etiket2')).toBeInTheDocument();
    expect(screen.getByText('#etiket3')).toBeInTheDocument();
  });

  it('fikir yoksa uyarı gösteriliyor', () => {
    render(
      <IdeaList ideas={[]} onDelete={jest.fn()} onEdit={jest.fn()} />
    );
    expect(screen.getByText('Henüz fikir eklenmemiş.')).toBeInTheDocument();
  });

  it('Düzenle butonuna tıklanınca düzenleme formu açılıyor', () => {
    render(
      <IdeaList ideas={ideas} onDelete={jest.fn()} onEdit={jest.fn()} />
    );
    fireEvent.click(screen.getAllByText('Düzenle')[0]);
    expect(screen.getByDisplayValue('Birinci fikir')).toBeInTheDocument();
    expect(screen.getByDisplayValue('etiket1, etiket2')).toBeInTheDocument();
  });

  it('Sil butonuna tıklanınca onDelete çağrılıyor', () => {
    const onDelete = jest.fn();
    render(
      <IdeaList ideas={ideas} onDelete={onDelete} onEdit={jest.fn()} />
    );
    fireEvent.click(screen.getAllByText('Sil')[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('Etiket butonuna tıklanınca onTagClick çağrılıyor', () => {
    const onTagClick = jest.fn();
    render(
      <IdeaList ideas={ideas} onDelete={jest.fn()} onEdit={jest.fn()} onTagClick={onTagClick} />
    );
    fireEvent.click(screen.getByText('#etiket1'));
    expect(onTagClick).toHaveBeenCalledWith('etiket1');
  });

  it('Düzenleme formunda Kaydet ile onEdit çağrılıyor', () => {
    const onEdit = jest.fn();
    render(
      <IdeaList ideas={ideas} onDelete={jest.fn()} onEdit={onEdit} />
    );
    fireEvent.click(screen.getAllByText('Düzenle')[0]);
    const textarea = screen.getByDisplayValue('Birinci fikir');
    fireEvent.change(textarea, { target: { value: 'Güncellenmiş fikir' } });
    fireEvent.click(screen.getByText('Kaydet'));
    expect(onEdit).toHaveBeenCalled();
    expect(onEdit.mock.calls[0][0].content).toBe('Güncellenmiş fikir');
  });

  it('Düzenleme formunda İptal ile form kapanıyor', () => {
    render(
      <IdeaList ideas={ideas} onDelete={jest.fn()} onEdit={jest.fn()} />
    );
    fireEvent.click(screen.getAllByText('Düzenle')[0]);
    fireEvent.click(screen.getByText('İptal'));
    expect(screen.queryByDisplayValue('Birinci fikir')).not.toBeInTheDocument();
  });
}); 