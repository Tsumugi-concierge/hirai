/*
  Minimal client-side i18n for 6 languages
  - Uses data-i18n="key" to replace textContent
  - If data-i18n-html present, uses innerHTML
  - If data-i18n-attr present, sets that attribute
  - Selected language persisted to localStorage ('i18n_lang')
  - First visit defaults to browser language if supported, else English
*/
(function(){
  const STORAGE_KEY = 'i18n_lang';
  const SUPPORTED = ['en','ja','zh-CN','ko','fr','es'];

  // Helpers
  const norm = (lang) => {
    if (!lang) return 'en';
    lang = lang.toLowerCase();
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('ko')) return 'ko';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('zh')) return 'zh-CN';
    return 'en';
  };

  const initial = (() => {
    const fromStore = localStorage.getItem(STORAGE_KEY);
    if (fromStore && SUPPORTED.includes(fromStore)) return fromStore;
    const nav = typeof navigator !== 'undefined' ? (navigator.language || (navigator.languages && navigator.languages[0])) : 'en';
    const lang = norm(nav);
    return SUPPORTED.includes(lang) ? lang : 'en';
  })();

  // Translation dictionary
  const T = {
    en: {
      'hero.title': 'Hirai',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': 'Address',
      'notice.address.text': '〒132-0035 東京都江戸川区平井5丁目58-2<br>Maison de cinq 2・3F',
      'notice.address.note': '2F and 3F are used together as one reservation.',
      'menu.arriving': 'Arriving',
      'menu.access': 'Access',
      'menu.inside': 'Inside the Home',
      'menu.houseRules': 'House Rules',
      'menu.emergency': 'Emergency',
      'top.back': 'Back',
      'access.title': 'Access',
      'access.address.h': 'Address',
      'access.maps': 'Open in Google Maps',
      'access.keybox.note': 'Your keybox code will be sent to you by message before check-in.',
      'rules.title': 'House Rules',
      'rules.help': 'Please help us keep the home comfortable.',
      'rules.noise': 'Please keep noise low, especially at night and in shared areas.',
      'rules.smoking': 'No smoking inside the room or building.',
      'rules.trash': 'Please separate trash according to the local rules when instructed.',
      'rules.lock': 'Please lock the door when leaving the room.',
      'rules.times': 'Please follow the check-in and check-out times shown in your booking message.',
      'rules.times.jaNote': 'ご予約メッセージに記載されたチェックイン・チェックアウト時間をご確認ください。',
      'em.title': 'Emergency',
      'em.numbers': 'Emergency numbers in Japan',
      'em.police': 'Police',
      'em.fire': 'Fire / Ambulance',
      'em.contact': 'For non-urgent questions about the room, please contact the host through your booking platform.',
      'em.contact.ja': 'お部屋に関する通常のお問い合わせは、予約サイトのメッセージからホストへご連絡ください。'
    },
    ja: {
      'hero.title': '平井',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': '住所',
      'notice.address.text': '〒132-0035 東京都江戸川区平井5丁目58-2<br>Maison de cinq 2・3F',
      'notice.address.note': '2F と 3F は一つのご予約としてご利用いただきます。',
      'menu.arriving': '到着',
      'menu.access': 'アクセス',
      'menu.inside': '室内のご案内',
      'menu.houseRules': 'ハウスルール',
      'menu.emergency': '緊急時',
      'top.back': '戻る',
      'access.title': 'アクセス',
      'access.address.h': '住所',
      'access.maps': 'Google マップで開く',
      'access.keybox.note': 'キーボックスの暗証番号はチェックイン前にメッセージでお送りします。',
      'rules.title': 'ハウスルール',
      'rules.help': '快適にお過ごしいただくためご協力ください。',
      'rules.noise': '特に夜間や共用部ではお静かにお過ごしください。',
      'rules.smoking': '室内および建物内は禁煙です。',
      'rules.trash': '案内がある場合は地域の分別ルールに従ってゴミを分けてください。',
      'rules.lock': '外出時は施錠をお願いします。',
      'rules.times': 'ご予約メッセージに記載されたチェックイン・チェックアウト時間をご確認ください。',
      'rules.times.jaNote': 'ご予約メッセージに記載されたチェックイン・チェックアウト時間をご確認ください。',
      'em.title': '緊急時',
      'em.numbers': '日本の緊急電話番号',
      'em.police': '警察',
      'em.fire': '消防・救急',
      'em.contact': 'お部屋に関する通常のお問い合わせは、予約サイトのメッセージからホストへご連絡ください。',
      'em.contact.ja': 'お部屋に関する通常のお問い合わせは、予約サイトのメッセージからホストへご連絡ください。'
    },
    'zh-CN': {
      'hero.title': '平井',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': '地址',
      'notice.address.text': '〒132-0035 东京都江户川区平井5丁目58-2<br>Maison de cinq 2・3F',
      'notice.address.note': '2F 和 3F 将作为一个预订一起使用。',
      'menu.arriving': '到达',
      'menu.access': '交通',
      'menu.inside': '房内指南',
      'menu.houseRules': '房屋守则',
      'menu.emergency': '紧急情况',
      'top.back': '返回',
      'access.title': '交通',
      'access.address.h': '地址',
      'access.maps': '在 Google 地图中打开',
      'access.keybox.note': '门禁密码将在入住前通过消息发送给您。',
      'rules.title': '房屋守则',
      'rules.help': '请帮助我们保持房间舒适。',
      'rules.noise': '请尽量保持安静，尤其是夜间及公共区域。',
      'rules.smoking': '房间内及建筑内禁止吸烟。',
      'rules.trash': '如有指引，请按照当地规定分类垃圾。',
      'rules.lock': '外出时请务必锁门。',
      'rules.times': '请遵守预订消息中标注的入住/退房时间。',
      'rules.times.jaNote': '请确认预订消息中标注的入住/退房时间。',
      'em.title': '紧急情况',
      'em.numbers': '日本的紧急电话号码',
      'em.police': '警察',
      'em.fire': '消防 / 急救',
      'em.contact': '非紧急的房间问题，请通过预订平台联系房东。',
      'em.contact.ja': '非紧急咨询请通过预订平台消息联系房东。'
    },
    ko: {
      'hero.title': '히라이',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': '주소',
      'notice.address.text': '〒132-0035 도쿄도 에도가와구 히라이 5-58-2<br>Maison de cinq 2・3F',
      'notice.address.note': '2F와 3F는 하나의 예약으로 함께 사용됩니다.',
      'menu.arriving': '도착',
      'menu.access': '오시는 길',
      'menu.inside': '객실 안내',
      'menu.houseRules': '하우스 룰',
      'menu.emergency': '비상 시',
      'top.back': '뒤로',
      'access.title': '오시는 길',
      'access.address.h': '주소',
      'access.maps': 'Google 지도에서 열기',
      'access.keybox.note': '키박스 비밀번호는 체크인 전 메시지로 안내드립니다.',
      'rules.title': '하우스 룰',
      'rules.help': '쾌적한 숙박을 위해 협조 부탁드립니다.',
      'rules.noise': '특히 야간 및 공용 공간에서는 소음을 자제해 주세요.',
      'rules.smoking': '객실 및 건물 내 흡연 금지입니다.',
      'rules.trash': '안내가 있는 경우 지역 규정에 따라 분리수거해 주세요.',
      'rules.lock': '외출 시 반드시 문을 잠가 주세요.',
      'rules.times': '예약 메시지에 기재된 체크인/체크아웃 시간을 지켜 주세요.',
      'rules.times.jaNote': '예약 메시지에 기재된 체크인/체크아웃 시간을 확인해 주세요.',
      'em.title': '비상 시',
      'em.numbers': '일본의 비상 전화번호',
      'em.police': '경찰',
      'em.fire': '소방 / 구급',
      'em.contact': '비상 상황이 아닌 객실 문의는 예약 플랫폼 메시지로 호스트에게 연락해 주세요.',
      'em.contact.ja': '비상 상황이 아닌 문의는 예약 플랫폼 메시지로 연락해 주세요.'
    },
    fr: {
      'hero.title': 'Hirai',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': 'Adresse',
      'notice.address.text': '〒132-0035 Tokyo, Edogawa, Hirai 5-58-2<br>Maison de cinq 2・3F',
      'notice.address.note': 'Les 2F et 3F sont utilisés ensemble pour une seule réservation.',
      'menu.arriving': 'Arrivée',
      'menu.access': 'Accès',
      'menu.inside': 'Dans la maison',
      'menu.houseRules': 'Règles de la maison',
      'menu.emergency': 'Urgence',
      'top.back': 'Retour',
      'access.title': 'Accès',
      'access.address.h': 'Adresse',
      'access.maps': 'Ouvrir dans Google Maps',
      'access.keybox.note': 'Le code du coffret à clés vous sera envoyé par message avant l’arrivée.',
      'rules.title': 'Règles de la maison',
      'rules.help': 'Aidez-nous à garder la maison confortable.',
      'rules.noise': 'Merci de limiter le bruit, surtout la nuit et dans les parties communes.',
      'rules.smoking': 'Il est interdit de fumer dans la chambre et l’immeuble.',
      'rules.trash': 'Merci de trier les déchets selon les règles locales lorsque c’est demandé.',
      'rules.lock': 'Veuillez verrouiller la porte en quittant la chambre.',
      'rules.times': 'Veuillez respecter les heures d’arrivée et de départ indiquées dans votre message de réservation.',
      'rules.times.jaNote': 'Veuillez vérifier les heures d’arrivée et de départ indiquées dans votre message de réservation.',
      'em.title': 'Urgence',
      'em.numbers': 'Numéros d’urgence au Japon',
      'em.police': 'Police',
      'em.fire': 'Pompiers / Ambulance',
      'em.contact': 'Pour toute question non urgente concernant la chambre, contactez l’hôte via votre plateforme de réservation.',
      'em.contact.ja': 'Pour les questions non urgentes, contactez l’hôte via la plateforme.'
    },
    es: {
      'hero.title': 'Hirai',
      'hero.subtitle': 'Maison de cinq 2F / 3F',
      'notice.address.label': 'Dirección',
      'notice.address.text': '〒132-0035 Tokio, Edogawa, Hirai 5-58-2<br>Maison de cinq 2・3F',
      'notice.address.note': '2F y 3F se usan juntos como una sola reserva.',
      'menu.arriving': 'Llegada',
      'menu.access': 'Cómo llegar',
      'menu.inside': 'Dentro de la casa',
      'menu.houseRules': 'Normas de la casa',
      'menu.emergency': 'Emergencia',
      'top.back': 'Atrás',
      'access.title': 'Cómo llegar',
      'access.address.h': 'Dirección',
      'access.maps': 'Abrir en Google Maps',
      'access.keybox.note': 'El código del portallaves se enviará por mensaje antes del check‑in.',
      'rules.title': 'Normas de la casa',
      'rules.help': 'Ayúdanos a mantener la casa confortable.',
      'rules.noise': 'Mantén el ruido bajo, especialmente de noche y en zonas comunes.',
      'rules.smoking': 'No fumar dentro de la habitación ni del edificio.',
      'rules.trash': 'Separa la basura según las normas locales cuando se indique.',
      'rules.lock': 'Cierra la puerta con llave al salir de la habitación.',
      'rules.times': 'Respeta los horarios de check‑in y check‑out indicados en tu mensaje de reserva.',
      'rules.times.jaNote': 'Consulta los horarios de check‑in y check‑out en tu mensaje de reserva.',
      'em.title': 'Emergencia',
      'em.numbers': 'Números de emergencia en Japón',
      'em.police': 'Policía',
      'em.fire': 'Bomberos / Ambulancia',
      'em.contact': 'Para consultas no urgentes sobre la habitación, contacta al anfitrión a través de tu plataforma de reserva.',
      'em.contact.ja': 'Para consultas no urgentes, usa la mensajería de la plataforma.'
    }
  };

  function apply(lang) {
    const dict = T[lang] || T.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key] != null ? dict[key] : T.en[key];
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n');
      const val = dict[key] != null ? dict[key] : T.en[key];
      if (val == null) return;
      el.setAttribute(attr, val);
    });
    // Update switcher current state
    document.querySelectorAll('.i18n-switcher button').forEach(btn => {
      btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  function mountSwitcher(current) {
    if (document.querySelector('.i18n-switcher')) return;
    const wrap = document.createElement('div');
    wrap.className = 'i18n-switcher';
    const langs = [
      { code: 'en', label: 'EN' },
      { code: 'ja', label: 'JA' },
      { code: 'zh-CN', label: 'ZH' },
      { code: 'ko', label: 'KO' },
      { code: 'fr', label: 'FR' },
      { code: 'es', label: 'ES' },
    ];
    langs.forEach(({code,label}) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.dataset.lang = code;
      b.setAttribute('aria-current', code === current ? 'true' : 'false');
      b.addEventListener('click', () => {
        const next = code;
        localStorage.setItem(STORAGE_KEY, next);
        apply(next);
      });
      wrap.appendChild(b);
    });
    document.body.appendChild(wrap);
  }

  function init(){
    const css = document.querySelector('link[href$="assets/i18n.css"], link[href$="../assets/i18n.css"]');
    if (!css) {
      // Best-effort inject CSS if not linked
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      // Resolve relative path by checking if current page is in a subdir
      const path = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
      const depth = (path.match(/\//g) || []).length - 1; // rough
      link.href = depth > 1 ? '../assets/i18n.css' : 'assets/i18n.css';
      document.head.appendChild(link);
    }
    mountSwitcher(initial);
    apply(initial);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
