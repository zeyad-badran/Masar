(function () {
  'use strict';

  let currentStep = 1;
  const totalSteps = 3;
  let isNavigating = false;

  const slides = document.querySelectorAll('.onboarding-slide');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const btnNext = document.getElementById('btnNext');
  const btnLabel = document.getElementById('btnLabel');

  if (!slides.length || !btnNext || !btnLabel) {
    return;
  }

  function goToStep(step) {
    if (step < 1 || step > totalSteps || step === currentStep) return;

    currentStep = step;

    slides.forEach((slide) => {
      const slideStep = parseInt(slide.getAttribute('data-step'), 10);
      if (slideStep === currentStep) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dotBtns.forEach((dot) => {
      const dotStep = parseInt(dot.getAttribute('data-step'), 10);
      if (dotStep === currentStep) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    btnLabel.textContent = 'ابدأ';
    btnNext.setAttribute('aria-label', 'ابدأ');

    try {
      localStorage.setItem('masar_active_screen', 'onboarding-' + step);
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', 'onboarding-' + step);
        window.history.replaceState(null, '', url.pathname + url.search);
      }
    } catch (e) {}
  }

  function handleNextClick() {
    if (isNavigating) return;

    isNavigating = true;
    setTimeout(() => { isNavigating = false; }, 350);

    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    } else {
      handleOnboardingComplete();
    }
  }

  function handleOnboardingComplete() {
    console.log('[Masar Onboarding] Final screen completed. Navigating to Profile Setup.');
    if (typeof window.startProfileSetup === 'function') {
      window.startProfileSetup();
    } else if (typeof window.onMasarOnboardingComplete === 'function') {
      window.onMasarOnboardingComplete();
    }
  }

  window.onmasarGoToOnboardingStep = function (step) {
    goToStep(step);
  };

  btnNext.addEventListener('click', handleNextClick);

  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetStep = parseInt(dot.getAttribute('data-step'), 10);
      goToStep(targetStep);
    });
  });

  document.addEventListener('keydown', (e) => {
    const onboardingContainer = document.getElementById('onboardingContainer');
    if (!onboardingContainer || onboardingContainer.hasAttribute('hidden')) return;

    if (e.key === 'ArrowLeft') {
      if (currentStep < totalSteps) goToStep(currentStep + 1);
    } else if (e.key === 'ArrowRight') {
      if (currentStep > 1) goToStep(currentStep - 1);
    }
  });

  window.addEventListener('masar:bypassSplash', (e) => {
    if (e.detail && e.detail.screen) {
      const match = e.detail.screen.match(/onboarding-(\d)/);
      if (match && match[1]) {
        const stepNum = parseInt(match[1], 10);
        if (stepNum >= 1 && stepNum <= totalSteps) {
          goToStep(stepNum);
        }
      }
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  let screenParam = urlParams.get('screen');
  if (!screenParam) {
    const saved = localStorage.getItem('masar_active_screen');
    if (saved && saved.startsWith('onboarding-')) screenParam = saved;
  }
  if (screenParam) {
    const match = screenParam.match(/onboarding-(\d)/);
    if (match && match[1]) {
      const stepNum = parseInt(match[1], 10);
      if (stepNum >= 1 && stepNum <= totalSteps) {
        goToStep(stepNum);
      }
    }
  }
})();
