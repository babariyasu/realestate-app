import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PropertyForm } from '../components/PropertyForm'
import type { Property, PropertyInput } from '../types/property'

export function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // モーダルの開閉と編集対象の管理
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Property | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // ログインユーザーの物件一覧を取得（RLS により自分の物件のみ返る）
  const fetchProperties = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件の取得に失敗しました')
    } else {
      setProperties(data ?? [])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // 新規登録
  const handleCreate = async (input: PropertyInput) => {
    setSubmitting(true)
    setError(null)

    const { error } = await supabase
      .from('properties')
      .insert({ ...input, user_id: user!.id })

    if (error) {
      setError('登録に失敗しました')
    } else {
      closeModal()
      await fetchProperties()
    }

    setSubmitting(false)
  }

  // 更新（editing に編集対象の物件が入っている前提）
  const handleUpdate = async (input: PropertyInput) => {
    if (!editing) return
    setSubmitting(true)
    setError(null)

    const { error } = await supabase
      .from('properties')
      .update(input)
      .eq('id', editing.id)

    if (error) {
      setError('更新に失敗しました')
    } else {
      closeModal()
      await fetchProperties()
    }

    setSubmitting(false)
  }

  // 削除（確認ダイアログを表示してから実行）
  const handleDelete = async (property: Property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？\nこの操作は元に戻せません。`)) return

    setError(null)

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id)

    if (error) {
      setError('削除に失敗しました')
    } else {
      await fetchProperties()
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const openCreateModal = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEditModal = (property: Property) => {
    setEditing(property)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>不動産管理アプリ</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleSignOut} className="btn-signout">
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        <div className="section-header">
          <div>
            <h2 className="section-title">物件一覧</h2>
            {!loading && (
              <p className="properties-count">
                {properties.length}件の物件が登録されています
              </p>
            )}
          </div>
          <button onClick={openCreateModal} className="btn-add">
            ＋ 新規登録
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {loading ? (
          <div className="loading-indicator">読み込み中...</div>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <p>物件がまだ登録されていません</p>
            <button onClick={openCreateModal} className="btn-primary">
              最初の物件を登録する
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-card-header">
                  <h3>{property.name}</h3>
                  <span className="property-area">{property.area}</span>
                </div>
                <div className="property-card-body">
                  <div className="property-rent">
                    <span className="rent-label">月額家賃</span>
                    <span className="rent-value">
                      ¥{property.rent.toLocaleString()}
                      <small>/月</small>
                    </span>
                  </div>
                  <div className="property-tags">
                    <span className="tag">{property.room_type}</span>
                  </div>
                  <div className="property-actions">
                    <button
                      onClick={() => openEditModal(property)}
                      className="btn-edit"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(property)}
                      className="btn-delete"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 登録・編集モーダル（オーバーレイ外クリックで閉じる） */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? '物件を編集' : '物件を新規登録'}</h2>
              <button onClick={closeModal} className="modal-close" aria-label="閉じる">
                ×
              </button>
            </div>
            <PropertyForm
              initial={editing}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={closeModal}
              submitting={submitting}
            />
          </div>
        </div>
      )}
    </div>
  )
}
