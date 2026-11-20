Internationalization Summary (6 Languages)

Scope
- Implemented client-side i18n across the Hirai manual site with a single HTML per page and no per-language copies.
- Supported languages: English (en), Japanese (ja), Simplified Chinese (zh-CN), Korean (ko), French (fr), Spanish (es).
- Language is persisted in localStorage and defaults to the browser language on first visit if supported, otherwise English.
- All existing URLs kept unchanged (no query params or path changes). The key page was removed as required (see Flags), and the Access page includes a code-delivery note.

Changes
- Added shared assets:
  - assets/i18n.js: translation engine, language detection/persistence, and a floating language switcher.
  - assets/i18n.css: minimal styles for the switcher.
- Updated pages to wire i18n and include the language switcher on every page:
  1. /index.html
     - Added data-i18n keys for hero, address, and menu labels.
     - Removed the “How to Open” menu button (page deleted per Hirai-specific requirement).
     - Included assets/i18n.css and assets/i18n.js.
  2. /access/index.html
     - Added data-i18n keys for titles, address, note, and Google Maps link.
     - Included assets/i18n.css and assets/i18n.js.
     - Added a note: “Your keybox code will be sent to you by message before check-in.” (translated in all 6 languages).
  3. /house-rules/index.html
     - Added data-i18n keys for title, help text, list items, and the Japanese reminder line.
     - Included assets/i18n.css and assets/i18n.js.
  4. /emergency/index.html
     - Added data-i18n keys for title, section heading, labels for Police and Fire/Ambulance, and contact guidance lines.
     - Included assets/i18n.css and assets/i18n.js.

How It Works
- Elements with data-i18n are replaced with translated text.
- Elements with data-i18n-html receive innerHTML (used where <br> is needed, e.g., the address line).
- Elements with data-i18n-attr set a specific attribute (e.g., aria-label for the back button).
- A floating language switcher (EN / JA / ZH / KO / FR / ES) appears on all pages; the current selection is highlighted.

Flags (Sensitive Info / Codes)
- The page how-to-open/index.html previously contained a keybox code (9125). Per the requirement to NEVER include key numbers or access codes and the Hirai-specific instruction that the key page has already been deleted, the page has been removed and the menu link on the home page was removed as well.
- The Access page now includes a neutral note indicating the keybox code will be sent by message before check-in. No codes are present anywhere in the site.

Notes
- The site’s address remains written with Japanese postal formatting across all languages, matching the original content. UI labels, notices, and guidance are translated.
- The html lang attribute updates dynamically to the selected language at runtime.
