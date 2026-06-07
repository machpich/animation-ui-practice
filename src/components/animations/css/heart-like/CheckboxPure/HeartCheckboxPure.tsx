import { heartCheckboxHtml } from './heartCheckbox.html'

/**
 * pure HTML + CSS だけで作った「いいね」アニメーションを、そのまま描画するラッパー。
 * React のロジックは一切持たず、状態管理は HTML 内の <input type="checkbox"> の
 * :checked に任せている。中身は heartCheckbox.html.ts の文字列をそのまま挿入するだけ。
 */
function HeartCheckboxPure() {
  return <div dangerouslySetInnerHTML={{ __html: heartCheckboxHtml }} />
}

export default HeartCheckboxPure
