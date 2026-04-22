import { useState, useEffect, type FormEvent } from 'react'
import type { Property, PropertyInput } from '../types/property'

interface Props {
  /** 編集時は既存物件データを渡す。新規登録時は null */
  initial: Property | null
  onSubmit: (input: PropertyInput) => Promise<void>
  onCancel: () => void
  submitting: boolean
}

export function PropertyForm({ initial, onSubmit, onCancel, submitting }: Props) {
  const [name, setName] = useState('')
  const [rent, setRent] = useState('')
  const [area, setArea] = useState('')
  const [roomType, setRoomType] = useState('')

  // モーダルを開くたびに初期値をセット
  useEffect(() => {
    setName(initial?.name ?? '')
    setRent(initial?.rent?.toString() ?? '')
    setArea(initial?.area ?? '')
    setRoomType(initial?.room_type ?? '')
  }, [initial])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit({ name, rent: Number(rent), area, room_type: roomType })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="prop-name">物件名</label>
        <input
          id="prop-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="例：パークハイツ渋谷"
        />
      </div>
      <div className="form-group">
        <label htmlFor="prop-rent">家賃（円）</label>
        <input
          id="prop-rent"
          type="number"
          value={rent}
          onChange={e => setRent(e.target.value)}
          required
          min={0}
          placeholder="例：150000"
        />
      </div>
      <div className="form-group">
        <label htmlFor="prop-area">エリア</label>
        <input
          id="prop-area"
          type="text"
          value={area}
          onChange={e => setArea(e.target.value)}
          required
          placeholder="例：東京都渋谷区"
        />
      </div>
      <div className="form-group">
        <label htmlFor="prop-room">間取り</label>
        <input
          id="prop-room"
          type="text"
          value={roomType}
          onChange={e => setRoomType(e.target.value)}
          required
          placeholder="例：1LDK"
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          キャンセル
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? '保存中...' : initial ? '更新する' : '登録する'}
        </button>
      </div>
    </form>
  )
}
