import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// ダミー物件データ
const PROPERTIES = [
  { id: 1, name: 'パークハイツ渋谷', rent: 150000, area: '東京都渋谷区', rooms: '1LDK', size: '45㎡' },
  { id: 2, name: 'サンライズ新宿', rent: 120000, area: '東京都新宿区', rooms: '1K', size: '32㎡' },
  { id: 3, name: 'グリーンヒルズ目黒', rent: 200000, area: '東京都目黒区', rooms: '2LDK', size: '65㎡' },
  { id: 4, name: 'リバーサイド品川', rent: 180000, area: '東京都品川区', rooms: '2LDK', size: '58㎡' },
  { id: 5, name: 'スカイタワー池袋', rent: 95000, area: '東京都豊島区', rooms: '1K', size: '28㎡' },
  { id: 6, name: 'ガーデンコート世田谷', rent: 220000, area: '東京都世田谷区', rooms: '3LDK', size: '80㎡' },
]

export function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
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
        <h2 className="section-title">物件一覧</h2>
        <p className="properties-count">{PROPERTIES.length}件の物件が見つかりました</p>
        <div className="properties-grid">
          {PROPERTIES.map(property => (
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
                  <span className="tag">{property.rooms}</span>
                  <span className="tag">{property.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
