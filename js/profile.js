(function () {
  'use strict';

  let currentProfileStep = 1;
  const totalProfileSteps = 4;
  let isNavigating = false;

  const travelerProfile = {
    nickname: '',
    ageRange: '',
    interests: [],
    budgetStyle: '',
    companion: ''
  };

  const profileContainer = document.getElementById('profileContainer');
  const profileSlides = document.querySelectorAll('.profile-slide');
  const btnProfileNext = document.getElementById('btnProfileNext');
  const btnProfilePrev = document.getElementById('btnProfilePrev');
  const btnSkip = document.getElementById('btnSkip');
  const footerDefault = document.getElementById('footerDefault');
  const footerStep4 = document.getElementById('footerStep4');
  const btnStep4Login = document.getElementById('btnStep4Login');
  const btnStep4Start = document.getElementById('btnStep4Start');

  const inputNickname = document.getElementById('inputNickname');
  const valMsg1 = document.getElementById('valMsg1');
  const valMsg2 = document.getElementById('valMsg2');
  const valMsg3 = document.getElementById('valMsg3');
  const valMsg4 = document.getElementById('valMsg4');

  if (!profileContainer || !profileSlides.length || !btnProfileNext || !btnProfilePrev) {
    return;
  }

  function syncStateFromDOM() {
    if (inputNickname) {
      travelerProfile.nickname = inputNickname.value.trim();
    }

    const selectedAge = document.querySelector('input[name="ageRange"]:checked');
    travelerProfile.ageRange = selectedAge ? selectedAge.value : '';

    const selectedInterests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    travelerProfile.interests = selectedInterests;

    const selectedBudget = document.querySelector('input[name="budgetStyle"]:checked');
    travelerProfile.budgetStyle = selectedBudget ? selectedBudget.value : '';

    const selectedCompanion = document.querySelector('input[name="companion"]:checked');
    travelerProfile.companion = selectedCompanion ? selectedCompanion.value : '';
  }

  function clearValidationMessages() {
    if (valMsg1) valMsg1.textContent = '';
    if (valMsg2) valMsg2.textContent = '';
    if (valMsg3) valMsg3.textContent = '';
    if (valMsg4) valMsg4.textContent = '';
  }

  function validateCurrentStep() {
    clearValidationMessages();
    syncStateFromDOM();

    if (currentProfileStep === 1) {
      if (!travelerProfile.nickname || !travelerProfile.nickname.trim()) {
        if (valMsg1) valMsg1.textContent = 'يرجى إدخال اسمك أو كنيتك للمتابعة';
        return false;
      }
      localStorage.setItem('masar_user_name', travelerProfile.nickname.trim());
      if (typeof window.applyDynamicUserName === 'function') {
        window.applyDynamicUserName();
      }
    } else if (currentProfileStep === 2) {
      if (!travelerProfile.ageRange) {
        if (valMsg2) valMsg2.textContent = 'يرجى اختيار فئتك العمرية للمتابعة';
        return false;
      }
    } else if (currentProfileStep === 3) {
      if (!travelerProfile.interests.length) {
        if (valMsg3) valMsg3.textContent = 'يرجى اختيار اهتمام واحد على الأقل للمتابعة';
        return false;
      }
    } else if (currentProfileStep === 4) {
      if (!travelerProfile.budgetStyle || !travelerProfile.companion) {
        if (valMsg4) valMsg4.textContent = 'يرجى تحديد تفضيل الميزانية ورفيق المسار للمتابعة';
        return false;
      }
    }

    return true;
  }

  function goToProfileStep(step) {
    if (step < 1 || step > totalProfileSteps) return;

    currentProfileStep = step;
    clearValidationMessages();

    profileSlides.forEach((slide) => {
      const slideStep = parseInt(slide.getAttribute('data-step'), 10);
      if (slideStep === currentProfileStep) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    if (footerDefault && footerStep4) {
      if (currentProfileStep === 4) {
        footerDefault.setAttribute('hidden', '');
        footerStep4.removeAttribute('hidden');
      } else {
        footerDefault.removeAttribute('hidden');
        footerStep4.setAttribute('hidden', '');
      }
    }

    profileContainer.removeAttribute('hidden');

    try {
      localStorage.setItem('masar_active_screen', 'profile-' + step);
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', 'profile-' + step);
        window.history.replaceState(null, '', url.pathname + url.search);
      }
    } catch (e) {}
  }

  function handleNextProfile() {
    if (isNavigating) return;

    if (!validateCurrentStep()) {
      return;
    }

    isNavigating = true;
    setTimeout(() => { isNavigating = false; }, 350);

    if (currentProfileStep < totalProfileSteps) {
      goToProfileStep(currentProfileStep + 1);
    } else {
      handleProfileSetupComplete();
    }
  }

  function handlePrevProfile() {
    if (isNavigating) return;

    isNavigating = true;
    setTimeout(() => { isNavigating = false; }, 350);

    clearValidationMessages();
    syncStateFromDOM();

    if (currentProfileStep > 1) {
      goToProfileStep(currentProfileStep - 1);
    } else {

      profileContainer.setAttribute('hidden', '');
      const onboardingContainer = document.getElementById('onboardingContainer');
      if (onboardingContainer) {
        onboardingContainer.removeAttribute('hidden');
        if (typeof window.onmasarGoToOnboardingStep === 'function') {
          window.onmasarGoToOnboardingStep(3);
        }
      }
    }
  }

  function handleSkip() {
    if (isNavigating) return;

    isNavigating = true;
    setTimeout(() => { isNavigating = false; }, 350);

    clearValidationMessages();
    syncStateFromDOM();

    if (currentProfileStep < totalProfileSteps) {
      goToProfileStep(currentProfileStep + 1);
    } else {
      handleProfileSetupComplete();
    }
  }

  function handleProfileSetupComplete() {
    syncStateFromDOM();
    console.log('[Masar Traveler Details] Questionnaire completed:', travelerProfile);

    if (typeof window.onMasarProfileSetupComplete === 'function') {
      window.onMasarProfileSetupComplete(travelerProfile);
    }
  }

  window.startProfileSetup = function () {
    const onboardingContainer = document.getElementById('onboardingContainer');
    if (onboardingContainer) {
      onboardingContainer.setAttribute('hidden', '');
    }
    goToProfileStep(1);
  };

  const loginContainer = document.getElementById('loginContainer');
  const registerContainer = document.getElementById('registerContainer');
  const registerForm = document.getElementById('registerForm');
  const btnGoToRegister = document.getElementById('btnGoToRegister');
  const btnGoToLogin = document.getElementById('btnGoToLogin');

  function openLoginScreen() {
    if (profileContainer) profileContainer.setAttribute('hidden', '');
    if (registerContainer) registerContainer.setAttribute('hidden', '');
    const splash = document.getElementById('splashContainer');
    const onboarding = document.getElementById('onboardingContainer');
    if (splash) splash.style.display = 'none';
    if (onboarding) onboarding.setAttribute('hidden', '');
    if (loginContainer) loginContainer.removeAttribute('hidden');
    window.scrollTo(0, 0);

    try {
      localStorage.setItem('masar_active_screen', 'login');
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', 'login');
        window.history.replaceState(null, '', url.pathname + url.search);
      }
    } catch (e) {}
  }

  function openRegisterScreen() {
    if (profileContainer) profileContainer.setAttribute('hidden', '');
    if (loginContainer) loginContainer.setAttribute('hidden', '');
    const splash = document.getElementById('splashContainer');
    const onboarding = document.getElementById('onboardingContainer');
    if (splash) splash.style.display = 'none';
    if (onboarding) onboarding.setAttribute('hidden', '');
    if (registerContainer) registerContainer.removeAttribute('hidden');
    window.scrollTo(0, 0);

    try {
      localStorage.setItem('masar_active_screen', 'register');
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', 'register');
        window.history.replaceState(null, '', url.pathname + url.search);
      }
    } catch (e) {}
  }

  window.openLoginScreen = openLoginScreen;
  window.openRegisterScreen = openRegisterScreen;

  btnProfileNext.addEventListener('click', handleNextProfile);
  btnProfilePrev.addEventListener('click', handlePrevProfile);
  if (btnSkip) btnSkip.addEventListener('click', handleSkip);
  if (btnStep4Login) {
    btnStep4Login.addEventListener('click', () => {
      syncStateFromDOM();
      openLoginScreen();
    });
  }
  if (btnStep4Start) {
    btnStep4Start.addEventListener('click', () => {
      syncStateFromDOM();
      if (typeof window.openHomeScreen === 'function') {
        window.openHomeScreen();
      } else {
        handleNextProfile();
      }
    });
  }

  if (btnGoToRegister) {
    btnGoToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      openRegisterScreen();
    });
  }

  if (btnGoToLogin) {
    btnGoToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      openLoginScreen();
    });
  }

  function saveAuthenticatedUserSession(user, profileData, fallbackName) {
    if (!user) return;
    const isSpecial = (window.MasarFirebase && typeof window.MasarFirebase.isSpecialEmail === 'function')
      ? window.MasarFirebase.isSpecialEmail(user.email)
      : (user.email && user.email.toLowerCase().trim() === 'zeyadbadran81@gmail.com');

    const name = (profileData && profileData.displayName)
      || user.displayName
      || fallbackName
      || (isSpecial ? 'زياد بدران' : (user.email ? user.email.split('@')[0] : 'المسافر'));

    const pts = (profileData && typeof profileData.points === 'number')
      ? profileData.points
      : (isSpecial ? 10000 : 0);

    localStorage.setItem('masar_user_id', user.uid);
    localStorage.setItem('masar_user_email', user.email || '');
    localStorage.setItem('masar_user_name', name);
    localStorage.setItem('masar_user_is_special', isSpecial ? 'true' : 'false');
    localStorage.setItem('masar_user_points', pts.toString());
    localStorage.setItem('masar_user_leaderboard_points', pts.toString());
    if (user.photoURL) {
      localStorage.setItem('masar_user_avatar_url', user.photoURL);
    }

    if (typeof window.applyDynamicUserName === 'function') {
      window.applyDynamicUserName();
    }
    if (typeof window.applyDynamicPoints === 'function') {
      window.applyDynamicPoints();
    }
    if (typeof window.updateSettingsUserDisplay === 'function') {
      window.updateSettingsUserDisplay();
    }
  }

  if (loginForm) {
    const checkTerms = document.getElementById('checkTerms');
    const valMsgTerms = document.getElementById('valMsgTerms');

    if (checkTerms && valMsgTerms) {
      checkTerms.addEventListener('change', () => {
        if (checkTerms.checked) valMsgTerms.textContent = '';
      });
    }

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (valMsgTerms) valMsgTerms.textContent = '';

      if (!checkTerms || !checkTerms.checked) {
        if (valMsgTerms) {
          valMsgTerms.textContent = 'يرجى الموافقة على التعليمات والشروط للمتابعة';
        }
        return;
      }

      const email = document.getElementById('inputEmail')?.value.trim();
      const password = document.getElementById('inputPassword')?.value.trim();

      if (!email) {
        if (valMsgTerms) valMsgTerms.textContent = 'يرجى إدخال البريد الإلكتروني';
        return;
      }

      if (!password) {
        if (valMsgTerms) valMsgTerms.textContent = 'يرجى إدخال كلمة السر';
        return;
      }

      const submitBtn = document.getElementById('btnLoginSubmit');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري تسجيل الدخول...';
      }

      try {
        if (!window.MasarFirebase || typeof window.MasarFirebase.signIn !== 'function') {
          throw new Error('خدمة المصادقة غير متصلة حالياً.');
        }

        const res = await window.MasarFirebase.signIn(email, password);

        if (res && res.success && res.user) {
          saveAuthenticatedUserSession(res.user, res.profileData, travelerProfile.nickname);

          const welcomeName = res.profileData?.displayName || res.user.displayName || (res.isSpecial ? 'زياد بدران' : 'المسافر');
          const isSpecial = res.isSpecial;
          if (window.showMasarToast) {
            window.showMasarToast(
              isSpecial ? `مرحباً بك يا ${welcomeName}! 👑 الحساب المميز` : `مرحباً بك يا ${welcomeName}! تم تسجيل الدخول بنجاح`,
              isSpecial ? '👑' : '✅'
            );
          }
          if (window.MasarAudio) window.MasarAudio.playChime();

          if (typeof window.openHomeScreen === 'function') {
            window.openHomeScreen();
          }
        } else {
          let errorText = 'تعذر تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.';
          const rawErr = (res && res.error) ? res.error : '';
          if (rawErr.includes('user-not-found') || rawErr.includes('invalid-credential') || rawErr.includes('wrong-password')) {
            errorText = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
          } else if (rawErr.includes('invalid-email')) {
            errorText = 'صيغة البريد الإلكتروني غير صالحة.';
          } else if (rawErr.includes('too-many-requests')) {
            errorText = 'تم حظر المحاولات مؤقتاً بسبب تكرار الأخطاء، يرجى المحاولة لاحقاً.';
          }
          if (valMsgTerms) valMsgTerms.textContent = errorText;
          if (window.showMasarToast) window.showMasarToast(errorText, '⚠️');
        }
      } catch (err) {
        console.error('Login error:', err);
        const errMsg = err.message || 'حدث خطأ أثناء تسجيل الدخول';
        if (valMsgTerms) valMsgTerms.textContent = errMsg;
        if (window.showMasarToast) window.showMasarToast(errMsg, '⚠️');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'تسجيل الدخول';
        }
      }
    });
  }

  const btnGuestLogin = document.getElementById('btnGuestLogin');
  if (btnGuestLogin) {
    btnGuestLogin.addEventListener('click', () => {
      const guestName = (travelerProfile && travelerProfile.nickname) ? travelerProfile.nickname : 'زائر مسار';
      localStorage.setItem('masar_user_id', 'guest_' + Date.now());
      localStorage.setItem('masar_user_email', '');
      localStorage.setItem('masar_user_name', guestName);
      localStorage.setItem('masar_user_is_special', 'false');
      localStorage.setItem('masar_user_points', '0');
      localStorage.setItem('masar_user_leaderboard_points', '0');

      if (typeof window.applyDynamicUserName === 'function') window.applyDynamicUserName();
      if (typeof window.applyDynamicPoints === 'function') window.applyDynamicPoints();
      if (typeof window.updateSettingsUserDisplay === 'function') window.updateSettingsUserDisplay();
      if (window.showMasarToast) window.showMasarToast('أهلاً بك كزائر في مسار! استمتع بالاستكشاف ✨', '🧭');

      if (typeof window.openHomeScreen === 'function') {
        window.openHomeScreen();
      }
    });
  }

  if (registerForm) {
    const checkRegTerms = document.getElementById('checkRegTerms');
    const valMsgRegTerms = document.getElementById('valMsgRegTerms');

    if (checkRegTerms && valMsgRegTerms) {
      checkRegTerms.addEventListener('change', () => {
        if (checkRegTerms.checked) valMsgRegTerms.textContent = '';
      });
    }

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (valMsgRegTerms) valMsgRegTerms.textContent = '';

      if (!checkRegTerms || !checkRegTerms.checked) {
        if (valMsgRegTerms) {
          valMsgRegTerms.textContent = 'يرجى الموافقة على التعليمات والشروط للمتابعة';
        }
        return;
      }

      const name = document.getElementById('inputRegName')?.value.trim();
      const email = document.getElementById('inputRegEmail')?.value.trim();
      const password = document.getElementById('inputRegPassword')?.value.trim();

      if (!name) {
        if (valMsgRegTerms) valMsgRegTerms.textContent = 'يرجى إدخال الاسم الكامل';
        return;
      }

      if (!email) {
        if (valMsgRegTerms) valMsgRegTerms.textContent = 'يرجى إدخال البريد الإلكتروني';
        return;
      }

      if (!password) {
        if (valMsgRegTerms) valMsgRegTerms.textContent = 'يرجى إدخال كلمة السر';
        return;
      }

      if (password.length < 6) {
        if (valMsgRegTerms) valMsgRegTerms.textContent = 'كلمة السر يجب أن تتكون من 6 خانات على الأقل';
        return;
      }

      const submitBtn = document.getElementById('btnRegisterSubmit');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري إنشاء الحساب...';
      }

      try {
        if (!window.MasarFirebase || typeof window.MasarFirebase.signUp !== 'function') {
          throw new Error('خدمة المصادقة غير متصلة حالياً.');
        }

        const res = await window.MasarFirebase.signUp(email, password, name);

        if (res && res.success && res.user) {
          saveAuthenticatedUserSession(res.user, res.profileData, name);

          const isSpecial = res.isSpecial;
          if (res.user && typeof window.MasarFirebase.savePreferences === 'function') {
            await window.MasarFirebase.savePreferences(res.user.uid, travelerProfile);
          }

          if (window.showMasarToast) {
            window.showMasarToast(
              isSpecial ? `أهلاً بك يا ${name}! 👑 تم تفعيل الحساب المميز` : `أهلاً بك يا ${name}! تم إنشاء حسابك الخاص بنجاح 🎉`,
              isSpecial ? '👑' : '🎉'
            );
          }
          if (window.MasarAudio) window.MasarAudio.playChime();

          if (typeof window.openHomeScreen === 'function') {
            window.openHomeScreen();
          }
        } else {
          let errorText = 'تعذر إنشاء الحساب. يرجى التأكد من البيانات والمحاولة مجدداً.';
          const rawErr = (res && res.error) ? res.error : '';
          if (rawErr.includes('email-already-in-use')) {
            errorText = 'هذا البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول.';
          } else if (rawErr.includes('weak-password')) {
            errorText = 'كلمة السر ضعيفة جداً. يرجى اختيار كلمة سر أقوى.';
          } else if (rawErr.includes('invalid-email')) {
            errorText = 'صيغة البريد الإلكتروني غير صحيحة.';
          }
          if (valMsgRegTerms) valMsgRegTerms.textContent = errorText;
          if (window.showMasarToast) window.showMasarToast(errorText, '⚠️');
        }
      } catch (err) {
        console.error('Registration error:', err);
        const errMsg = err.message || 'حدث خطأ أثناء إنشاء الحساب';
        if (valMsgRegTerms) valMsgRegTerms.textContent = errMsg;
        if (window.showMasarToast) window.showMasarToast(errMsg, '⚠️');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'إنشاء الحساب';
        }
      }
    });
  }

  // Google Sign-In Handler (Active and working exclusively)
  const socialGoogleButtons = document.querySelectorAll('.btn-google');
  socialGoogleButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.style.opacity = '0.75';
      if (window.showMasarToast) window.showMasarToast('جاري الاتصال بحساب Google...', '🔄');

      try {
        if (!window.MasarFirebase || typeof window.MasarFirebase.signInWithGoogle !== 'function') {
          throw new Error('خدمة المصادقة عبر Google غير متصلة حالياً.');
        }

        const res = await window.MasarFirebase.signInWithGoogle();

        if (res && res.success && res.user) {
          saveAuthenticatedUserSession(res.user, res.profileData, travelerProfile.nickname);

          const isSpecial = res.isSpecial;
          const welcomeName = res.profileData?.displayName || res.user.displayName || (isSpecial ? 'زياد بدران' : 'المسافر');
          const greetingMsg = isSpecial
            ? `مرحباً بك يا ${welcomeName}! 👑 تم الدخول إلى حسابك الخاص المميز (10,000 نقطة)`
            : `مرحباً بك يا ${welcomeName}! تم تسجيل الدخول بحسابك بنجاح ✨`;

          if (window.showMasarToast) window.showMasarToast(greetingMsg, isSpecial ? '👑' : '✨');
          if (window.MasarAudio) window.MasarAudio.playChime();

          if (typeof window.openHomeScreen === 'function') {
            window.openHomeScreen();
          }
        } else {
          const errMsg = (res && res.error) ? res.error : '';
          if (errMsg.includes('popup-closed-by-user') || errMsg.includes('cancelled')) {
            if (window.showMasarToast) window.showMasarToast('تم إغلاق نافذة تسجيل الدخول عبر Google', 'ℹ️');
          } else if (errMsg.includes('unauthorized-domain')) {
            console.error('Firebase Auth Error: Domain not authorized.', window.location.hostname);
            console.info('Add this domain in Firebase Console: https://console.firebase.google.com/project/masar-12856/authentication/settings -> Authorized domains');
            if (window.showMasarToast) {
              window.showMasarToast(`يرجى إضافة ${window.location.hostname} في لوحة Firebase (Authorized Domains)`, '🔒');
            }
          } else {
            console.warn('Google sign-in did not complete:', errMsg);
            if (window.showMasarToast) window.showMasarToast('تعذر تسجيل الدخول عبر Google. يرجى المحاولة لاحقاً.', '⚠️');
          }
        }
      } catch (err) {
        console.error('Google sign-in exception:', err);
        const msg = err.message || 'حدث خطأ أثناء تسجيل الدخول عبر Google';
        if (window.showMasarToast) window.showMasarToast(msg, '⚠️');
      } finally {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  });

  // Facebook & Apple buttons: Strictly blocked (just decorative shape, never enters)
  const socialFacebookButtons = document.querySelectorAll('.btn-facebook');
  const socialAppleButtons = document.querySelectorAll('.btn-apple');

  socialFacebookButtons.forEach((btn) => {
    btn.setAttribute('aria-disabled', 'true');
    btn.setAttribute('title', 'تسجيل الدخول عبر فيسبوك غير متوفر حالياً');
    btn.classList.add('btn-blocked');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.MasarAudio) window.MasarAudio.playTap();
      if (window.showMasarToast) {
        window.showMasarToast('تسجيل الدخول عبر فيسبوك غير متوفر حالياً. يرجى استخدام Google أو البريد الإلكتروني.', 'ℹ️');
      }
    });
  });

  socialAppleButtons.forEach((btn) => {
    btn.setAttribute('aria-disabled', 'true');
    btn.setAttribute('title', 'تسجيل الدخول عبر آبل غير متوفر حالياً');
    btn.classList.add('btn-blocked');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.MasarAudio) window.MasarAudio.playTap();
      if (window.showMasarToast) {
        window.showMasarToast('تسجيل الدخول عبر آبل غير متوفر حالياً. يرجى استخدام Google أو البريد الإلكتروني.', 'ℹ️');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (!profileContainer || profileContainer.hasAttribute('hidden')) return;

    if (e.key === 'ArrowLeft') {
      handleNextProfile();
    } else if (e.key === 'ArrowRight') {
      handlePrevProfile();
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  let screenParam = urlParams.get('screen');
  if (!screenParam) {
    const saved = localStorage.getItem('masar_active_screen');
    if (saved && (saved === 'login' || saved === 'register' || saved.startsWith('profile-'))) {
      screenParam = saved;
    }
  }
  if (screenParam === 'login') {
    openLoginScreen();
  } else if (screenParam === 'register' || screenParam === 'signup') {
    openRegisterScreen();
  } else if (screenParam && screenParam.startsWith('profile')) {
    const match = screenParam.match(/profile-(\d)/);
    if (match && match[1]) {
      const stepNum = parseInt(match[1], 10);
      if (stepNum >= 1 && stepNum <= totalProfileSteps) {
        const splashContainer = document.getElementById('splashContainer');
        const onboardingContainer = document.getElementById('onboardingContainer');
        if (splashContainer) splashContainer.style.display = 'none';
        if (onboardingContainer) onboardingContainer.setAttribute('hidden', '');

        goToProfileStep(stepNum);
      }
    }
  }
})();
