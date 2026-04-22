-- ================================================================
-- 不動産管理アプリ：物件テーブル定義
-- Supabase の SQL エディタで実行してください
-- ================================================================

-- 物件テーブルの作成
CREATE TABLE properties (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  rent        INTEGER     NOT NULL CHECK (rent >= 0),
  area        TEXT        NOT NULL,
  room_type   TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- Row Level Security（RLS）の有効化
-- ----------------------------------------------------------------
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 自分が登録した物件のみ参照できるポリシー
CREATE POLICY "自分の物件を参照" ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- 自分の user_id でのみ挿入できるポリシー
CREATE POLICY "自分の物件を登録" ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できるポリシー
CREATE POLICY "自分の物件を更新" ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できるポリシー
CREATE POLICY "自分の物件を削除" ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
