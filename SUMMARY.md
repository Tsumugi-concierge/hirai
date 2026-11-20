平井マニュアルサイト（hirai）6言語化 検証サマリ

1. ブランチの状態
- ローカル/リモートに `feat/i18n-6lang` が存在。
  - ローカル先頭: 459c6a4 feat(i18n): add 6-language client-side i18n with shared assets; remove key page, add access note; wire language switcher and translations across pages; add SUMMARY.md
  - `origin/feat/i18n-6lang`: 459c6a4 と一致
- `main` との差分（main..feat/i18n-6lang）
  - 追加: `assets/i18n.js`, `assets/i18n.css`, `SUMMARY.md`
  - 更新: `index.html`, `access/index.html`, `house-rules/index.html`, `emergency/index.html`
  - 削除: `how-to-open/index.html`（鍵ページ）

2. 6言語化の完了条件の検証結果
- 言語切替（lang-switcher）：全ページに `assets/i18n.js` を読み込み、JS がフローティングスイッチャーを自動挿入。OK
- 共有 `assets/i18n.js` の利用：全ページで `<script ... i18n.js defer>` を確認。OK
- localStorage で保持：`localStorage('i18n_lang')` に保存。OK
- 初回はブラウザ言語をデフォルト：`navigator.language` を正規化し対応言語なら適用。OK
- URL は不変：クライアント置換方式でパス/クエリ変更なし。OK
- ページの複製なし：各ページは単一HTMLのみ（言語別ファイル無し）。OK

3. 鍵・キーボックス等のアクセスコード混入チェック
- `how-to-open/index.html` は削除済み（本ブランチでも D 扱い）。OK
- 全HTMLをキーワード走査（鍵/キーボックス/暗証/番号/keybox/access code 等）し、案内文以外のコード表記は無し。OK
- アクセスページには「チェックイン前にメッセージでコードを送る」旨の案内のみで、番号の掲載なし。OK
- Wi‑Fi パスワードは今回のサイト内に掲載なし（掲載されていても許容範囲だが現状なし）。OK

4. 補完・修正の要否
- 既存実装で完了条件を全て満たしているため、コード修正・追補は不要。
- 本サマリ（SUMMARY.md）のみ最新の検証結果に差し替え（機微情報の具体的番号は記載しない運用に統一）。

5. 反映（PRは不要）
- 作業ブランチ: `feat/i18n-6lang`
- 本サマリの更新のみコミット/プッシュ済み（このファイル）。

6. 実装補足
- 翻訳適用: `data-i18n`（textContent）, `data-i18n-html`（innerHTML）, `data-i18n-attr`（任意属性）に対応。
- 言語: en/ja/zh-CN/ko/fr/es をサポート。非対応言語は英語フォールバック。
- `<html lang>` は選択言語に同期。

以上の通り、6言語化は要件を満たしており、鍵番号等の機微情報の露出はありません。
