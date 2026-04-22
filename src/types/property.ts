/** Supabase の properties テーブルの行型 */
export interface Property {
  id: string
  user_id: string
  name: string
  rent: number
  area: string
  room_type: string
  created_at: string
}

/** INSERT / UPDATE 時に送信するフィールド（id / user_id / created_at は除く） */
export type PropertyInput = Pick<Property, 'name' | 'rent' | 'area' | 'room_type'>
