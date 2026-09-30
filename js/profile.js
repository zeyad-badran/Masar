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
        if (window.MasarFirebase && typeof window.MasarFirebase.signIn === 'function') {
          const authTask = (async () => {
            let res = await window.MasarFirebase.signIn(email, password);
            if (!res.success) {
              res = await window.MasarFirebase.signUp(email, password, travelerProfile.nickname || 'Traveler');
            }
            if (res.success && res.user && typeof window.MasarFirebase.savePreferences === 'function') {
              await window.MasarFirebase.savePreferences(res.user.uid, travelerProfile);
            }
            return res;
          })();

          const timeoutTask = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 1500));
          await Promise.race([authTask, timeoutTask]);
        }
      } catch (err) {
        console.warn('Login handled with fallback:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'تسجيل الدخول';
        }
        if (typeof window.openHomeScreen === 'function') {
          window.openHomeScreen();
        }
      }
    });
  }

  const btnGuestLogin = document.getElementById('btnGuestLogin');
  if (btnGuestLogin) {
    btnGuestLogin.addEventListener('click', () => {
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
        if (window.MasarFirebase && typeof window.MasarFirebase.signUp === 'function') {
          const regTask = (async () => {
            const res = await window.MasarFirebase.signUp(email, password, name);
            if (res.success && res.user && typeof window.MasarFirebase.savePreferences === 'function') {
              await window.MasarFirebase.savePreferences(res.user.uid, travelerProfile);
            }
            return res;
          })();

          const timeoutTask = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 1500));
          await Promise.race([regTask, timeoutTask]);
        }
      } catch (err) {
        console.warn('Registration handled with fallback:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'إنشاء الحساب';
        }
        if (typeof window.openHomeScreen === 'function') {
          window.openHomeScreen();
        }
      }
    });
  }

  const socialGoogleButtons = document.querySelectorAll('.btn-google');
  socialGoogleButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        if (window.MasarFirebase && typeof window.MasarFirebase.signInWithGoogle === 'function') {
          await window.MasarFirebase.signInWithGoogle();
        }
      } catch (err) {
        console.warn('Google sign-in fallback:', err);
      }
      if (typeof window.openHomeScreen === 'function') {
        window.openHomeScreen();
      }
    });
  });

  const socialFacebookButtons = document.querySelectorAll('.btn-facebook');
  const socialAppleButtons = document.querySelectorAll('.btn-apple');
  socialFacebookButtons.forEach(btn => btn.addEventListener('click', () => {
    if (typeof window.openHomeScreen === 'function') window.openHomeScreen();
  }));
  socialAppleButtons.forEach(btn => btn.addEventListener('click', () => {
    if (typeof window.openHomeScreen === 'function') window.openHomeScreen();
  }));

  document.addEventListener('keydown', (e) => {
    if (!profileContainer || profileContainer.hasAttribute('hidden')) return;

    if (e.key === 'ArrowLeft') {
      handleNextProfile();
    } else if (e.key === 'ArrowRight') {
      handlePrevProfile();
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const screenParam = urlParams.get('screen');
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
