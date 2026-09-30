(function () {
  'use strict';

  function updateSettingsUserDisplay() {
    const userNameEl = document.getElementById('settingsUserName');
    if (userNameEl) {
      const savedName = localStorage.getItem('masar_user_name') || 'طارق';
      userNameEl.textContent = savedName;
    }

    const avatarImgEl = document.getElementById('settingsUserAvatarImg');
    if (avatarImgEl) {
      const savedAvatar = localStorage.getItem('masar_user_avatar') || 'mascot';
      const avatarMap = {
        mascot: 'assets/images/mascot_pin.png',
        bedouin: 'assets/images/ahmed_host.png',
        chef: 'assets/images/salt_cooking.jpg',
        explorer: 'assets/images/sara_host.png',
        diver: 'assets/images/wadi_mujib.png',
        artist: 'assets/images/citadel_sunset.jpg'
      };
      avatarImgEl.src = avatarMap[savedAvatar] || 'assets/images/mascot_pin.png';
    }
  }

  function initSettings() {
    updateSettingsUserDisplay();

    const btnSettingsBack = document.getElementById('btnSettingsBack');
    if (btnSettingsBack) {
      btnSettingsBack.addEventListener('click', () => {
        if (window.MasarAudio) window.MasarAudio.playTap();
        if (typeof window.openHomeScreen === 'function') {
          window.openHomeScreen();
        }
      });
    }

    const settingsUserPreview = document.getElementById('settingsUserPreview');
    const rowPersonalInfo = document.getElementById('rowPersonalInfo');

    function openEditProfile() {
      const editNameInput = document.getElementById('editNicknameInput');
      if (editNameInput) {
        editNameInput.value = localStorage.getItem('masar_user_name') || 'طارق';
      }
      if (window.openMasarModal) window.openMasarModal('editProfileModal');
      if (window.MasarAudio) window.MasarAudio.playTap();
    }

    if (settingsUserPreview) settingsUserPreview.addEventListener('click', openEditProfile);
    if (rowPersonalInfo) rowPersonalInfo.addEventListener('click', openEditProfile);

    const rowLanguage = document.getElementById('rowLanguage');
    if (rowLanguage) {
      rowLanguage.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('languageModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const languageOptions = document.querySelectorAll('.language-option-card');
    let selectedLang = localStorage.getItem('masar_language') || 'ar';

    languageOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        languageOptions.forEach(o => {
          o.classList.remove('selected');
          o.style.border = '1px solid #E5DFD5';
          o.style.background = '#F8F4EE';
          const check = o.querySelector('span:last-child');
          if (check) check.textContent = '';
        });

        opt.classList.add('selected');
        opt.style.border = '2px solid #85122D';
        opt.style.background = '#FFF5F6';
        const check = opt.querySelector('span:last-child');
        if (check) {
          check.textContent = '✓';
          check.style.color = '#85122D';
        }

        selectedLang = opt.getAttribute('data-lang');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    });

    const btnConfirmLanguage = document.getElementById('btnConfirmLanguage');
    if (btnConfirmLanguage) {
      btnConfirmLanguage.addEventListener('click', () => {
        if (window.MasarI18n) {
          window.MasarI18n.set(selectedLang);
        } else {
          localStorage.setItem('masar_language', selectedLang);
        }
        if (window.closeMasarModal) window.closeMasarModal('languageModal');
        const langName = selectedLang === 'ar' ? 'العربية (الأردن) 🇯🇴' : 'English 🇬🇧';
        const toastMsg = selectedLang === 'ar' ? `تم ضبط لغة التطبيق: ${langName}` : `App language set to: ${langName}`;
        if (window.showMasarToast) window.showMasarToast(toastMsg, '🌐');
        if (window.MasarAudio) window.MasarAudio.playChime();
      });
    }

    const rowNotifications = document.getElementById('rowNotifications');
    if (rowNotifications) {
      rowNotifications.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('notificationsModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const notifSwitches = document.querySelectorAll('#notificationsModal .settings-switch-toggle');
    notifSwitches.forEach(sw => {
      sw.addEventListener('click', () => {
        sw.classList.toggle('active');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    });

    const btnSaveNotificationPrefs = document.getElementById('btnSaveNotificationPrefs');
    if (btnSaveNotificationPrefs) {
      btnSaveNotificationPrefs.addEventListener('click', () => {
        if (window.closeMasarModal) window.closeMasarModal('notificationsModal');
        if (window.showMasarToast) window.showMasarToast('تم حفظ تفضيلات الإشعارات بنجاح 🔔', '✅');
        if (window.MasarAudio) window.MasarAudio.playChime();
      });
    }

    const rowLocation = document.getElementById('rowLocation');
    if (rowLocation) {
      rowLocation.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('locationModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const cityCards = document.querySelectorAll('.city-card');
    let selectedCity = localStorage.getItem('masar_city') || 'عمّان';

    cityCards.forEach(card => {
      card.addEventListener('click', () => {
        cityCards.forEach(c => {
          c.classList.remove('selected');
          c.style.border = '1px solid #E5DFD5';
          c.style.background = '#F8F4EE';
          const strong = c.querySelector('strong');
          if (strong) strong.style.color = '#1E1F1A';
        });

        card.classList.add('selected');
        card.style.border = '2px solid #85122D';
        card.style.background = '#FFF5F6';
        const strong = card.querySelector('strong');
        if (strong) strong.style.color = '#85122D';

        selectedCity = card.getAttribute('data-city');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    });

    const btnConfirmCityLocation = document.getElementById('btnConfirmCityLocation');
    if (btnConfirmCityLocation) {
      btnConfirmCityLocation.addEventListener('click', () => {
        localStorage.setItem('masar_city', selectedCity);
        if (window.closeMasarModal) window.closeMasarModal('locationModal');
        if (window.showMasarToast) window.showMasarToast(`تم تعيين موقعك: ${selectedCity} 📍`, '📍');
        if (window.MasarAudio) window.MasarAudio.playChime();
      });
    }

    const toggleSystemNotifications = document.getElementById('toggleSystemNotifications');
    if (toggleSystemNotifications) {
      toggleSystemNotifications.addEventListener('click', () => {
        const isActive = toggleSystemNotifications.classList.contains('active');
        if (isActive) {
          toggleSystemNotifications.classList.remove('active');
          toggleSystemNotifications.setAttribute('aria-checked', 'false');
          if (window.showMasarToast) window.showMasarToast('تم إيقاف إشعارات النظام 🔕', '🔕');
        } else {
          toggleSystemNotifications.classList.add('active');
          toggleSystemNotifications.setAttribute('aria-checked', 'true');
          if (window.showMasarToast) window.showMasarToast('تم تفعيل إشعارات النظام 🔔', '🔔');
        }
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const toggleDarkMode = document.getElementById('toggleDarkMode');
    const savedTheme = localStorage.getItem('masar_theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleDarkMode) {
        toggleDarkMode.classList.add('active');
        toggleDarkMode.setAttribute('aria-checked', 'true');
      }
    }

    if (toggleDarkMode) {
      toggleDarkMode.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          toggleDarkMode.classList.remove('active');
          toggleDarkMode.setAttribute('aria-checked', 'false');
          localStorage.setItem('masar_theme', 'light');
          if (window.showMasarToast) window.showMasarToast('تم تفعيل الوضع الفاتح ☀️', '☀️');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          toggleDarkMode.classList.add('active');
          toggleDarkMode.setAttribute('aria-checked', 'true');
          localStorage.setItem('masar_theme', 'dark');
          if (window.showMasarToast) window.showMasarToast('تم تفعيل الوضع الليلي 🌙', '🌙');
        }
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rowSupportFeedback = document.getElementById('rowSupportFeedback');
    if (rowSupportFeedback) {
      rowSupportFeedback.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('supportModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const supportFeedbackForm = document.getElementById('supportFeedbackForm');
    if (supportFeedbackForm) {
      supportFeedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msgInput = document.getElementById('supportFeedbackMsg');
        const feedbackText = msgInput ? msgInput.value.trim() : '';

        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        if (window.closeMasarModal) window.closeMasarModal('supportModal');
        if (window.showMasarToast) window.showMasarToast(isEn ? 'Thank you! Your feedback was sent to Team Masar (+15 pts)' : 'شكراً لك! تم إرسال اقتراحك لفريق مسار (+15 نقطة)', '💌');
        if (window.MasarAudio) window.MasarAudio.playChime();
        if (window.spawnFloatingPoint) window.spawnFloatingPoint(rowSupportFeedback, '+15');

        if (msgInput) msgInput.value = '';
      });
    }

    const rowEmergencyNumbers = document.getElementById('rowEmergencyNumbers');
    if (rowEmergencyNumbers) {
      rowEmergencyNumbers.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('emergencyModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rowAboutMasar = document.getElementById('rowAboutMasar');
    if (rowAboutMasar) {
      rowAboutMasar.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('aboutModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rowSecurityPrivacy = document.getElementById('rowSecurityPrivacy');
    if (rowSecurityPrivacy) {
      rowSecurityPrivacy.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('privacyModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rowShareApp = document.getElementById('rowShareApp');
    if (rowShareApp) {
      rowShareApp.addEventListener('click', async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'تطبيق مسار | Masar',
              text: 'اكتشف أجمل المعالم والمسارات السياحية في الأردن مع تطبيق مسار! 🇯🇴',
              url: window.location.origin
            });
          } catch (e) {

          }
        } else {
          try {
            await navigator.clipboard.writeText(window.location.origin);
            if (window.showMasarToast) window.showMasarToast('تم نسخ رابط تطبيق مسار إلى الحافظة 📋', '🔗');
          } catch (e) {
            if (window.showMasarToast) window.showMasarToast('شارك الرابط: ' + window.location.origin, '🔗');
          }
        }
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rowRateApp = document.getElementById('rowRateApp');
    if (rowRateApp) {
      rowRateApp.addEventListener('click', () => {
        if (window.openMasarModal) window.openMasarModal('rateModal');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    }

    const rateStars = document.querySelectorAll('.rate-star');
    let selectedRating = 5;
    rateStars.forEach(star => {
      star.addEventListener('click', () => {
        const starIndex = parseInt(star.getAttribute('data-star'), 10);
        selectedRating = starIndex;
        rateStars.forEach((s, idx) => {
          s.style.opacity = idx < starIndex ? '1' : '0.35';
        });
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    });

    const btnSubmitRateApp = document.getElementById('btnSubmitRateApp');
    if (btnSubmitRateApp) {
      btnSubmitRateApp.addEventListener('click', () => {
        if (window.closeMasarModal) window.closeMasarModal('rateModal');
        if (window.showMasarToast) window.showMasarToast(`شكراً لتقييمك (${selectedRating} ⭐)! حصلت على +10 نقاط`, '⭐');
        if (window.MasarAudio) window.MasarAudio.playChime();
        if (window.spawnFloatingPoint) window.spawnFloatingPoint(btnSubmitRateApp, '+10');
      });
    }

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editNameInput = document.getElementById('editNicknameInput');
        const newName = editNameInput ? editNameInput.value.trim() : '';

        if (newName) {
          localStorage.setItem('masar_user_name', newName);
          updateSettingsUserDisplay();
          if (typeof window.applyDynamicUserName === 'function') {
            window.applyDynamicUserName();
          }
          if (window.closeMasarModal) window.closeMasarModal('editProfileModal');
          if (window.showMasarToast) window.showMasarToast(`أهلاً بك يا ${newName}! تم حفظ التعديلات`, '✅');
          if (window.MasarAudio) window.MasarAudio.playChime();
        }
      });
    }

    const avatarChoices = document.querySelectorAll('.avatar-choice-card');
    let selectedAvatar = localStorage.getItem('masar_user_avatar') || 'mascot';
    avatarChoices.forEach(choice => {
      if (choice.getAttribute('data-avatar') === selectedAvatar) {
        choice.classList.add('selected');
      }
      choice.addEventListener('click', () => {
        avatarChoices.forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
        selectedAvatar = choice.getAttribute('data-avatar');
        if (window.MasarAudio) window.MasarAudio.playTap();
      });
    });

    const btnSaveAvatar = document.getElementById('btnSaveAvatarChoice');
    if (btnSaveAvatar) {
      btnSaveAvatar.addEventListener('click', () => {
        localStorage.setItem('masar_user_avatar', selectedAvatar);
        updateSettingsUserDisplay();
        if (window.closeMasarModal) window.closeMasarModal('avatarSelectorModal');
        if (window.showMasarToast) window.showMasarToast('تم تعيين صورتك الرمزية بنجاح 🌟', '🌟');
        if (window.MasarAudio) window.MasarAudio.playChime();
      });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', async () => {
        if (window.MasarAudio) window.MasarAudio.playTap();
        try {
          localStorage.removeItem('masar_active_screen');
          localStorage.removeItem('masar_active_exp_id');
        } catch (e) {}
        if (window.MasarFirebase && typeof window.MasarFirebase.logOut === 'function') {
          await window.MasarFirebase.logOut();
        }
        if (typeof window.openLoginScreen === 'function') {
          const settings = document.getElementById('settingsContainer');
          if (settings) settings.setAttribute('hidden', '');
          window.openLoginScreen();
          if (window.showMasarToast) window.showMasarToast('تم تسجيل الخروج بنجاح. نراك قريباً!', '👋');
        }
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const screenParam = urlParams.get('screen') || localStorage.getItem('masar_active_screen');
    if (screenParam === 'settings') {
      if (typeof window.openSettingsScreen === 'function') {
        window.openSettingsScreen();
      }
    }
  }

  window.updateSettingsUserDisplay = updateSettingsUserDisplay;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
  } else {
    initSettings();
  }
})();
