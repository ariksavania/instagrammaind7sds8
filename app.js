/**
 * instaDL - Instagram Downloader
 * Handles: language switching, URL validation, download simulation, FAQ accordion.
 */

(function () {
  'use strict';

  // ── DOM Elements ─────────────────────────────────────────────────────────
  var urlInput        = document.getElementById('url-input');
  var btnPaste        = document.getElementById('btn-paste');
  var btnClear        = document.getElementById('btn-clear');
  var btnDownload     = document.getElementById('btn-download');
  var tabBtns         = document.querySelectorAll('.tab-btn');
  var processingConsole = document.getElementById('processing-console');
  var consoleLogs     = document.getElementById('console-logs');
  var consoleProgress = document.getElementById('console-progress');
  var downloadResults = document.getElementById('download-results');
  var toastContainer  = document.getElementById('toast-container');
  var langBtns        = document.querySelectorAll('.lang-btn');

  // Guard: abort if any critical element is missing
  if (!urlInput || !btnPaste || !btnClear || !btnDownload ||
      !processingConsole || !downloadResults || !toastContainer) {
    return;
  }

  // ── Translation Database ──────────────────────────────────────────────────
  var translations = {
    id: {
      doc_title: "instaDL - Pengunduh Instagram Premium | Simpan Video, Foto, Reels & Stories",
      nav_downloader: "Pengunduh",
      nav_features: "Fitur",
      nav_how_to: "Cara Kerja",
      nav_faq: "FAQ",
      hero_badge: "Ultra-Speed CDN Aktif",
      hero_title: "Instagram Downloader",
      hero_subtitle: "Simpan Reels, Video, Foto, Stories, dan Galeri dalam kualitas asli. Privasi mutlak. Tanpa perlu registrasi.",
      tab_all: "Semua-dalam-Satu",
      tab_video: "Video",
      tab_photo: "Foto",
      tab_reels: "Reels",
      tab_story: "Story",
      ph_all: "Tempel tautan Instagram di sini (contoh: https://instagram.com/p/...)",
      ph_video: "Tempel tautan video Instagram di sini (contoh: https://instagram.com/tv/...)",
      ph_photo: "Tempel tautan foto Instagram di sini (contoh: https://instagram.com/p/...)",
      ph_reels: "Tempel tautan Reel Instagram di sini (contoh: https://instagram.com/reel/...)",
      ph_story: "Tempel tautan Story Instagram di sini (contoh: https://instagram.com/stories/...)",
      btn_paste: "Tempel",
      btn_download: "Unduh",
      terms_helper_1: "Dengan menggunakan layanan kami, Anda menyetujui",
      terms_helper_2: "Ketentuan Layanan",
      terms_helper_3: "kami.",
      bookmark_title: "Trik Alamat Unduh Super Cepat",
      bookmark_desc: "Lewati kunjungan web! Cukup tambahkan <span class=\"code-badge\">l-d.app/</span> sebelum URL Instagram apa pun di bilah alamat browser Anda (contoh: <span class=\"glow-span\">l-d.app/https://instagram.com/p/...</span>) dan tekan Enter untuk mengunduh secara instan.",
      feat_sec_title_1: "Didesain untuk Performa",
      feat_sec_title_2: "Maksimal",
      feat_sec_title_3: "",
      feat_sec_subtitle: "Rasakan mesin pengunduh yang dibangun ulang dari awal untuk kecepatan, kualitas, dan gaya.",
      feat_1_title: "Dekripsi Cloud Kecepatan Tinggi",
      feat_1_desc: "Script parsing server-less kami mendekripsi aliran konten Instagram secara real-time, memberikan kecepatan hingga 1Gbps.",
      feat_2_title: "Tanpa Log Data & Privasi Aman",
      feat_2_desc: "Kami menghormati privasi Anda. Tidak perlu akun, log tidak disimpan, dan URL segera dihapus setelah diproses.",
      feat_3_title: "Kualitas Media Asli Tanpa Kompresi",
      feat_3_desc: "Dapatkan file CDN mentah langsung dengan resolusi asli (Foto hingga 1080p, Video hingga 4K UHD), tanpa kompresi sama sekali.",
      feat_4_title: "Optimasi Lintas Platform",
      feat_4_desc: "Dioptimalkan sepenuhnya untuk Safari, Chrome, Edge, dan webview bawaan iOS/Android. Tanpa perlu install aplikasi.",
      guide_sec_title_1: "Proses Mudah",
      guide_sec_title_2: "3 Langkah",
      guide_sec_title_3: "",
      guide_sec_subtitle: "Simpan konten ke komputer, tablet, atau ponsel Anda dalam hitungan detik.",
      guide_step_1_title: "Salin Tautan",
      guide_step_1_desc: "Buka Instagram dan salin URL Foto, Video, Reel, Story, atau Galeri dari bilah alamat atau ikon bagikan.",
      guide_step_2_title: "Tempel ke instaDL",
      guide_step_2_desc: "Tempel tautan yang disalin ke kolom input di atas, pilih kategori, dan klik tombol Unduh.",
      guide_step_3_title: "Simpan ke Perangkat",
      guide_step_3_desc: "Mesin kami memproses tautan, mengambil data langsung dari CDN, dan menghasilkan tombol unduh secara instan.",
      faq_sec_title_1: "Pertanyaan yang",
      faq_sec_title_2: "Sering Diajukan",
      faq_sec_subtitle: "Semua hal yang perlu Anda ketahui tentang instaDL. Jawaban jelas untuk pertanyaan umum.",
      faq_1_q: "Apa itu instaDL dan bagaimana cara memproses media?",
      faq_1_a: "instaDL adalah alat berbasis browser premium yang terhubung secara aman ke server Instagram untuk mengekstrak dan memproses file media mentah berkualitas tinggi (video, foto, reels, dan stories). Alat ini melewati batas pemutar standar dan menyediakan tautan unduh bersih untuk menyimpan file langsung ke perangkat Anda.",
      faq_2_q: "Apakah ada batasan unduhan harian atau biaya pendaftaran?",
      faq_2_a: "Tidak. instaDL 100% gratis dan tidak memberlakukan batasan harian untuk mengunduh. Anda dapat menyimpan video dan foto sebanyak yang Anda suka tanpa perlu mendaftar atau memasukkan detail akun.",
      faq_3_q: "Apakah saya bisa mengunduh media dari akun privat?",
      faq_3_a: "instaDL menghormati pengaturan pengguna. Karena file dari akun privat dilindungi secara ketat oleh izin API dan cookie Instagram, instaDL hanya dapat mengunduh konten dari profil publik. Jika Anda bisa melihat video tersebut di tab browser tanpa login, instaDL bisa memprosesnya.",
      faq_4_q: "Format dan kualitas apa saja yang disediakan instaDL?",
      faq_4_a: "Kami mengambil aset media mentah tanpa kompresi. Foto dikirimkan dalam format JPG resolusi tinggi hingga 1080p. Video disimpan dalam format MP4 standar hingga HD 1080p, mempertahankan kejelasan audio asli dan frame video persis seperti yang diunggah oleh pembuat konten.",
      faq_5_q: "Di mana file unduhan saya disimpan di perangkat saya?",
      faq_5_a: "Pada komputer (macOS, Windows, Linux), file akan tersimpan di folder 'Downloads' default browser Anda. Pada perangkat seluler (iOS, Android), file diunduh ke daftar unduhan browser atau aplikasi File sistem, yang akan otomatis memasukkannya ke galeri foto Anda.",
      footer_desc: "Menyediakan alat ekstraksi media premium dan responsif sejak 2026. Cepat, anonim, dan andal.",
      footer_links_tools: "Alat",
      footer_links_legal: "Hukum",
      footer_tool_video: "Pengunduh Video",
      footer_tool_photo: "Pengunduh Foto",
      footer_tool_reels: "Pengunduh Reels",
      footer_tool_story: "Pengunduh Story",
      footer_legal_terms: "Ketentuan Layanan",
      footer_legal_privacy: "Kebijakan Privasi",
      footer_legal_contact: "Hubungi Dukungan",
      toast_mode_switch: "Beralih ke Bahasa Indonesia",
      toast_copied: "Tautan disalin dari clipboard",
      toast_copied_empty: "Clipboard kosong",
      toast_paste_fallback: "Tempel langsung tidak didukung. Tekan Ctrl+V (atau Cmd+V) untuk menempel.",
      toast_paste_denied: "Izin clipboard ditolak. Silakan tempel secara manual.",
      toast_cleared: "Kolom input dibersihkan",
      toast_enter_link: "Silakan masukkan tautan postingan Instagram terlebih dahulu",
      toast_invalid_link: "URL Instagram tidak valid. Gunakan format seperti: instagram.com/p/CODE",
      toast_decrypt_success: "Dekripsi selesai! Media siap diunduh.",
      toast_packaging: "Mempersiapkan paket unduhan untuk",
      toast_downloaded: "Berhasil menyimpan file ke unduhan Anda!",
      mock_download: "Unduh",
      mock_save_media: "Simpan Media",
      console_active: "AKTIF",
      log_1: "[SYS] Menginisialisasi dekripsi untuk node Instagram: ",
      log_2: "[SEC] Mengambil parameter jabat tangan (TLS v1.3)...",
      log_3: "[SYS] Saluran terhubung: secure-proxy-edge.instadl.net",
      log_4: "[CDN] Meminta header media dari edge CDN Instagram...",
      log_5: "[CDN] Media terurai. Respon kode: 200 OK",
      log_6: "[SEC] Membongkar enkripsi kontainer DRM...",
      log_7: "[SYS] Konten terbuka. Mengekstrak tautan unduhan HD...",
      log_8: "[SYS] Optimasi instaDL selesai. File siap diunduh.",
      out_caption: "Menjelajahi batas gaya dan performa. 🚀✨ #luxury #tech #lifestyle",
      out_btn_reel_hd: "Unduh Reel (1080p HD)",
      out_btn_reel_sd: "Unduh Reel (720p SD)",
      out_btn_audio: "Ekstrak Aliran Audio",
      out_btn_video_hd: "Unduh Video (1080p Full HD)",
      out_btn_video_sd: "Unduh Video (720p HD)",
      out_btn_story: "Simpan Video Story",
      out_btn_story_thumb: "Simpan Sampul Story",
      out_btn_photo_hd: "Unduh Gambar (Asli 1080px)",
      out_btn_photo_sd: "Unduh Gambar (Optimal 720px)"
    },
    en: {
      doc_title: "instaDL - Premium Instagram Downloader | Save Videos, Photos, Reels & Stories",
      nav_downloader: "Downloader",
      nav_features: "Features",
      nav_how_to: "How it Works",
      nav_faq: "FAQ",
      hero_badge: "Ultra-Speed CDN Live",
      hero_title: "Instagram Downloader",
      hero_subtitle: "Save Reels, Videos, Photos, Stories, and Galleries in high fidelity. Absolute privacy. No registration required.",
      tab_all: "All-in-One",
      tab_video: "Video",
      tab_photo: "Photo",
      tab_reels: "Reels",
      tab_story: "Story",
      ph_all: "Paste Instagram link here (e.g., https://instagram.com/p/...)",
      ph_video: "Paste Instagram video link here (e.g., https://instagram.com/tv/...)",
      ph_photo: "Paste Instagram photo link here (e.g., https://instagram.com/p/...)",
      ph_reels: "Paste Instagram Reel link here (e.g., https://instagram.com/reel/...)",
      ph_story: "Paste Instagram Story link here (e.g., https://instagram.com/stories/...)",
      btn_paste: "Paste",
      btn_download: "Download",
      terms_helper_1: "By using our service, you agree to our",
      terms_helper_2: "Terms of Service",
      terms_helper_3: ".",
      bookmark_title: "Super Fast Download Address Trick",
      bookmark_desc: "Skip the website! Simply insert <span class=\"code-badge\">l-d.app/</span> before any Instagram URL in your browser address bar (e.g., <span class=\"glow-span\">l-d.app/https://instagram.com/p/...</span>) and press Enter to download instantly.",
      feat_sec_title_1: "Designed for",
      feat_sec_title_2: "Elite",
      feat_sec_title_3: "Performance",
      feat_sec_subtitle: "Experience a download engine rebuilt from the ground up to achieve high speed, fidelity, and style.",
      feat_1_title: "Ultra-Speed Cloud Decryption",
      feat_1_desc: "Our server-less parsing script decrypts private Instagram content streams in real-time, delivering immediate speeds up to 1Gbps.",
      feat_2_title: "Zero Data Logging & Privacy",
      feat_2_desc: "We respect your privacy. No account configuration required, no logs stored, and all URLs are instantly purged after delivery.",
      feat_3_title: "True Lossless Media Quality",
      feat_3_desc: "Extract direct raw CDN files with original resolutions (Photos up to 1080p, Videos up to 4K UHD), absolutely untouched.",
      feat_4_title: "Cross-Platform Optimization",
      feat_4_desc: "Fully optimized for Safari, Chrome, Edge, and iOS/Android native webviews. Zero application installations required.",
      guide_sec_title_1: "Seamless",
      guide_sec_title_2: "3-Step",
      guide_sec_title_3: "Process",
      guide_sec_subtitle: "Save content on your desktop, tablet, or phone within seconds.",
      guide_step_1_title: "Copy the Link",
      guide_step_1_desc: "Open Instagram and copy the URL of the Photo, Video, Reel, Story, or Carousel post from the address bar or share icon.",
      guide_step_2_title: "Paste into instaDL",
      guide_step_2_desc: "Paste the copied address link into the input bar above, choose your category tab, and click the Download trigger.",
      guide_step_3_title: "Save to Device",
      guide_step_3_desc: "Our decrypter parses the link, compiles direct CDN resources, and generates direct download action links immediately.",
      faq_sec_title_1: "Frequently Asked",
      faq_sec_title_2: "Questions",
      faq_sec_subtitle: "Everything you need to know about instaDL. Clear answers for common queries.",
      faq_1_q: "What exactly is instaDL and how does it process media?",
      faq_1_a: "instaDL is a premium browser-based utility that connects securely to Instagram content servers to extract and parse high-quality raw media files (videos, photos, reels, and stories). It bypasses regular player limits and provides a clean download link to save files directly to your device.",
      faq_2_q: "Are there daily download caps or registration fees?",
      faq_2_a: "No. instaDL is 100% free and does not impose any daily limits on downloading. You can save as many videos and photos as you like without needing to sign up or input account details.",
      faq_3_q: "Can I download media from private accounts?",
      faq_3_a: "instaDL respects user settings. Since files from private accounts are strictly protected by Instagram's API permissions and cookies, instaDL can only download content hosted on public profiles. If you can view the video in a logged-out web browser tab, instaDL can process it.",
      faq_4_q: "What formats and quality does instaDL provide?",
      faq_4_a: "We retrieve raw, uncompressed assets. Photos are delivered in high-res JPG formats up to 1080p. Videos are saved in standard MP4 formats up to HD 1080p, retaining original audio clarity and video frames exactly as uploaded by the content creator.",
      faq_5_q: "Where are my downloaded files saved on my device?",
      faq_5_a: "On computer OS (macOS, Windows, Linux), files land in your default browser \"Downloads\" folder. On mobile devices (iOS, Android), they are downloaded to the browser's downloads list or the system Files app, which will automatically map them into your photo library or gallery.",
      footer_desc: "Providing high-end, responsive media extraction tools since 2026. Fast, anonymous, and reliable.",
      footer_links_tools: "Tools",
      footer_links_legal: "Legal",
      footer_tool_video: "Video Downloader",
      footer_tool_photo: "Photo Downloader",
      footer_tool_reels: "Reels Downloader",
      footer_tool_story: "Story Downloader",
      footer_legal_terms: "Terms of Service",
      footer_legal_privacy: "Privacy Policy",
      footer_legal_contact: "Contact Support",
      toast_mode_switch: "Switched to English",
      toast_copied: "Link pasted from clipboard",
      toast_copied_empty: "Clipboard is empty",
      toast_paste_fallback: "Direct paste not supported. Press Ctrl+V (or Cmd+V) to paste manually.",
      toast_paste_denied: "Clipboard permission denied. Please paste manually.",
      toast_cleared: "Field cleared",
      toast_enter_link: "Please enter an Instagram post link first",
      toast_invalid_link: "Invalid Instagram URL. Use a format like: instagram.com/p/CODE",
      toast_decrypt_success: "Decryption complete! Media ready for download.",
      toast_packaging: "Bundling package for",
      toast_downloaded: "Saved file to your downloads!",
      mock_download: "Download",
      mock_save_media: "Save Media",
      console_active: "ACTIVE",
      log_1: "[SYS] Init decryption hook for Instagram node: ",
      log_2: "[SEC] Fetching handshake parameters (TLS v1.3)...",
      log_3: "[SYS] Tunnel established: secure-proxy-edge.instadl.net",
      log_4: "[CDN] Querying raw media headers from Instagram edge CDN...",
      log_5: "[CDN] Media parsed. Response code: 200 OK",
      log_6: "[SEC] Deciphering DRM container layers...",
      log_7: "[SYS] Content unlocked. Extracting HD direct stream links...",
      log_8: "[SYS] instaDL Optimizer compiled files successfully. Render ready.",
      out_caption: "Exploring the limits of style and performance. 🚀✨ #luxury #tech #lifestyle",
      out_btn_reel_hd: "Download Reel (1080p HD)",
      out_btn_reel_sd: "Download Reel (720p SD)",
      out_btn_audio: "Extract Audio Stream",
      out_btn_video_hd: "Download Video (1080p Full HD)",
      out_btn_video_sd: "Download Video (720p HD)",
      out_btn_story: "Save Story Video",
      out_btn_story_thumb: "Save Story Cover",
      out_btn_photo_hd: "Download Image (Original 1080px)",
      out_btn_photo_sd: "Download Image (Optimized 720px)"
    }
  };

  // ── Language ──────────────────────────────────────────────────────────────
  var currentLang = localStorage.getItem('preferred_lang') || 'id';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred_lang', lang);
    langBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.title = translations[lang].doc_title;
    document.querySelectorAll('[data-translate]').forEach(function (el) {
      var key = el.getAttribute('data-translate');
      if (translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });
    updatePlaceholder();
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sel = btn.getAttribute('data-lang');
      if (sel && sel !== currentLang) {
        applyLanguage(sel);
        showToast(translations[sel].toast_mode_switch, 'success');
      }
    });
  });

  // ── Tabs ──────────────────────────────────────────────────────────────────
  var activeType = 'all';

  function updatePlaceholder() {
    var key = 'ph_' + activeType;
    if (translations[currentLang][key]) {
      urlInput.placeholder = translations[currentLang][key];
    }
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type');
      updatePlaceholder();
      var label = translations[currentLang]['tab_' + activeType] || activeType;
      showToast(currentLang === 'id' ? ('Beralih ke mode ' + label) : ('Switched to ' + label + ' mode'), 'success');
    });
  });

  // ── Footer nav links ──────────────────────────────────────────────────────
  document.querySelectorAll('.footer-nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var type = link.getAttribute('data-type');
      var target = document.querySelector('.tab-btn[data-type="' + type + '"]');
      if (target) {
        target.click();
        var dl = document.getElementById('downloader');
        if (dl) dl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.modal-link, .footer-link').forEach(function (link) {
    link.addEventListener('click', function (e) { e.preventDefault(); });
  });

  // ── Input helpers ─────────────────────────────────────────────────────────
  urlInput.addEventListener('input', toggleClear);

  function toggleClear() {
    if (urlInput.value.trim().length > 0) {
      btnClear.classList.remove('hidden');
    } else {
      btnClear.classList.add('hidden');
    }
  }

  btnClear.addEventListener('click', function () {
    urlInput.value = '';
    toggleClear();
    urlInput.focus();
    showToast(translations[currentLang].toast_cleared, 'success');
  });

  // ── Paste button ──────────────────────────────────────────────────────────
  btnPaste.addEventListener('click', function () {
    var dict = translations[currentLang];
    if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
      navigator.clipboard.readText().then(function (text) {
        if (text && text.trim()) {
          urlInput.value = text.trim();
          toggleClear();
          showToast(dict.toast_copied, 'success');
        } else {
          showToast(dict.toast_copied_empty, 'error');
        }
      }).catch(function () {
        showToast(dict.toast_paste_fallback, 'error');
        urlInput.focus();
      });
    } else {
      showToast(dict.toast_paste_fallback, 'error');
      urlInput.focus();
    }
  });

  // ── Download button ───────────────────────────────────────────────────────
  btnDownload.addEventListener('click', processDownload);
  urlInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') processDownload();
  });

  function validateInstagramUrl(url) {
    var clean = url.trim();
    if (!clean) return { isValid: false, reason: 'empty' };
    var pat = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv|stories|[\w.-]+)\/?[a-zA-Z0-9_-]*/i;
    if (!pat.test(clean)) return { isValid: false, reason: 'invalid_domain' };
    var type = 'post';
    if (clean.indexOf('/reel/') !== -1) type = 'reels';
    else if (clean.indexOf('/tv/') !== -1) type = 'video';
    else if (clean.indexOf('/stories/') !== -1) type = 'story';
    var code = 'media_asset';
    try {
      var parts = clean.split('instagram.com/')[1].split('/');
      code = (parts[0] === 'stories') ? (parts[2] || parts[1] || 'story_asset') : (parts[1] || 'media_asset');
    } catch (e) {}
    return { isValid: true, type: type, code: code };
  }

  function processDownload() {
    var url = urlInput.value.trim();
    var dict = translations[currentLang];
    if (url.indexOf('l-d.app/') === 0) url = url.replace('l-d.app/', '');
    var check = validateInstagramUrl(url);
    if (check.reason === 'empty') { showToast(dict.toast_enter_link, 'error'); return; }
    if (!check.isValid) { showToast(dict.toast_invalid_link, 'error'); return; }
    startDecryption(check.type, check.code);
  }

  // ── Decryption animation ──────────────────────────────────────────────────
  function startDecryption(mediaType, mediaCode) {
    processingConsole.scrollIntoView({ behavior: 'smooth', block: 'center' });
    downloadResults.classList.add('hidden');
    processingConsole.classList.remove('hidden');
    consoleLogs.innerHTML = '';
    consoleProgress.style.width = '0%';

    var dict = translations[currentLang];
    var logs = [
      { text: dict.log_1 + mediaCode, type: 'sys',    delay: 100  },
      { text: dict.log_2,             type: 'sec',    delay: 500  },
      { text: dict.log_3,             type: 'sys',    delay: 900  },
      { text: dict.log_4,             type: 'normal', delay: 1300 },
      { text: dict.log_5,             type: 'normal', delay: 1800 },
      { text: dict.log_6,             type: 'sec',    delay: 2100 },
      { text: dict.log_7,             type: 'sys',    delay: 2500 },
      { text: dict.log_8,             type: 'sys',    delay: 2900 }
    ];

    logs.forEach(function (log) {
      setTimeout(function () {
        var row = document.createElement('div');
        row.className = 'console-log-row ' + (log.type || '');
        row.textContent = log.text;
        consoleLogs.appendChild(row);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        consoleProgress.style.width = Math.round((log.delay / 3000) * 100) + '%';
      }, log.delay);
    });

    setTimeout(function () {
      processingConsole.classList.add('hidden');
      renderResultCard(mediaType, mediaCode);
      showToast(dict.toast_decrypt_success, 'success');
    }, 3200);
  }

  // ── Result Card ───────────────────────────────────────────────────────────
  function renderResultCard(mediaType, mediaCode) {
    downloadResults.innerHTML = '';
    var dict = translations[currentLang];
    var creators = ['alpha_visuals', 'neon_chaser', 'cyber_aesthetic', 'luxe_frame', 'orbit_studio'];
    var creator = creators[Math.floor(Math.random() * creators.length)];
    var caption = dict.out_caption;
    var preview = '';
    var buttons = '';
    var label   = currentLang === 'id' ? 'Postingan' : 'Post';

    if (mediaType === 'reels') {
      label = 'Reel';
      preview = '<div class="mock-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg><span style="font-size:0.8rem;color:var(--cyan-neon)">' + (currentLang === 'id' ? 'Putar Reel' : 'Play Reel Preview') + '</span></div>';
      buttons = '<button class="btn btn-option primary-option" data-filename="instadl_reel_' + mediaCode + '_1080p.mp4"><span>' + dict.out_btn_reel_hd + '</span><span class="option-meta">MP4 • 24.8 MB</span></button>' +
                '<button class="btn btn-option" data-filename="instadl_reel_' + mediaCode + '_720p.mp4"><span>' + dict.out_btn_reel_sd + '</span><span class="option-meta">MP4 • 11.2 MB</span></button>' +
                '<button class="btn btn-option" data-filename="instadl_audio_' + mediaCode + '.m4a"><span>' + dict.out_btn_audio + '</span><span class="option-meta">M4A • 3.1 MB</span></button>';
    } else if (mediaType === 'video') {
      label = 'Video';
      preview = '<div class="mock-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg><span style="font-size:0.8rem;color:var(--cyan-neon)">' + (currentLang === 'id' ? 'Putar Video' : 'Play Video Preview') + '</span></div>';
      buttons = '<button class="btn btn-option primary-option" data-filename="instadl_video_' + mediaCode + '_1080p.mp4"><span>' + dict.out_btn_video_hd + '</span><span class="option-meta">MP4 • 38.5 MB</span></button>' +
                '<button class="btn btn-option" data-filename="instadl_video_' + mediaCode + '_720p.mp4"><span>' + dict.out_btn_video_sd + '</span><span class="option-meta">MP4 • 18.1 MB</span></button>';
    } else if (mediaType === 'story') {
      label = 'Story';
      preview = '<div class="mock-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg><span style="font-size:0.8rem;color:var(--cyan-neon)">' + (currentLang === 'id' ? 'Konten Story' : 'Story Content') + '</span></div>';
      buttons = '<button class="btn btn-option primary-option" data-filename="instadl_story_' + mediaCode + '.mp4"><span>' + dict.out_btn_story + '</span><span class="option-meta">MP4 • 8.6 MB</span></button>' +
                '<button class="btn btn-option" data-filename="instadl_story_snap_' + mediaCode + '.jpg"><span>' + dict.out_btn_story_thumb + '</span><span class="option-meta">JPG • 1.2 MB</span></button>';
    } else {
      label = currentLang === 'id' ? 'Foto' : 'Photo';
      preview = '<div class="mock-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span style="font-size:0.8rem;color:var(--cyan-neon)">' + (currentLang === 'id' ? 'Gambar HD' : 'High-Res Image') + '</span></div>';
      buttons = '<button class="btn btn-option primary-option" data-filename="instadl_photo_' + mediaCode + '_max.jpg"><span>' + dict.out_btn_photo_hd + '</span><span class="option-meta">JPG • 2.4 MB</span></button>' +
                '<button class="btn btn-option" data-filename="instadl_photo_' + mediaCode + '_med.jpg"><span>' + dict.out_btn_photo_sd + '</span><span class="option-meta">JPG • 480 KB</span></button>';
    }

    downloadResults.innerHTML =
      '<div class="result-card glass-card">' +
        '<div class="result-preview-area">' + preview + '<div class="result-badge">' + label + '</div></div>' +
        '<div class="result-details">' +
          '<div class="author-info"><div class="author-avatar"></div><span class="author-username">@' + creator + '</span></div>' +
          '<p class="post-caption">' + caption + '</p>' +
          '<div class="download-actions-grid">' + buttons + '</div>' +
        '</div>' +
      '</div>';

    downloadResults.classList.remove('hidden');
    downloadResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    downloadResults.querySelectorAll('.btn-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        simulateDownload(btn.getAttribute('data-filename'));
      });
    });
  }

  // ── File download simulation ──────────────────────────────────────────────
  function simulateDownload(filename) {
    var dict = translations[currentLang];
    showToast(dict.toast_packaging + ' ' + filename + '...', 'info');
    setTimeout(function () {
      var content = 'instaDL Download\nFile: ' + filename + '\nTime: ' + new Date().toISOString();
      var blob = new Blob([content], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(dict.toast_downloaded, 'success');
    }, 1200);
  }

  // ── Toast notification ────────────────────────────────────────────────────
  function showToast(message, type) {
    type = type || 'info';
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    var icon = '';
    if (type === 'success') {
      icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'error') {
      icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
    toast.innerHTML = icon + '<div class="toast-message">' + message + '</div>';
    toastContainer.appendChild(toast);
    setTimeout(function () {
      toast.style.animation = 'toastIn 0.3s cubic-bezier(0.16,1,0.3,1) reverse forwards';
      setTimeout(function () {
        if (toastContainer.contains(toast)) toastContainer.removeChild(toast);
      }, 300);
    }, 4000);
  }

  // ── FAQ Accordion ─────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Init ──────────────────────────────────────────────────────────────────
  applyLanguage(currentLang);

}());
