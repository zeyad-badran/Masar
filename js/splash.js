(function () {
  'use strict';

  const splashContainer = document.getElementById('splashContainer');
  const emblemWrapper = document.getElementById('emblemWrapper');
  const emblemImg = document.getElementById('emblemImg');
  const brandTitle = document.getElementById('brandTitle');
  const onboardingContainer = document.getElementById('onboardingContainer');

  if (!splashContainer || !emblemWrapper || !emblemImg || !brandTitle) {
    return;
  }

  function getTransitionDurationMs() {
    const rawValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--transition-duration')
      .trim();
    if (rawValue.endsWith('ms')) return parseFloat(rawValue);
    if (rawValue.endsWith('s')) return parseFloat(rawValue) * 1000;
    return 1000;
  }

  function updateAlignmentOffset() {
    const rect = emblemWrapper.getBoundingClientRect();
    const viewportCenterY = window.innerHeight / 2;
    const emblemCenterY = rect.top + rect.height / 2;
    const shiftY = viewportCenterY - emblemCenterY;

    splashContainer.style.setProperty('--shift-y', `${shiftY.toFixed(2)}px`);
  }

  async function waitForImage(img) {
    if (!img.complete) {
      await new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }
    if (typeof img.decode === 'function') {
      try { await img.decode(); } catch (err) {}
    }
  }

  async function waitForFonts() {
    if (document.fonts && typeof document.fonts.ready !== 'undefined') {
      try { await document.fonts.ready; } catch (err) {}
    }
  }

  function transitionToOnboarding() {
    if (!onboardingContainer) return;

    onboardingContainer.removeAttribute('hidden');

    splashContainer.classList.add('hidden');

    setTimeout(() => {
      splashContainer.style.display = 'none';

      window.dispatchEvent(new CustomEvent('masar:splashCompleted'));
    }, 500);
  }

  async function initSplash() {
    const urlParams = new URLSearchParams(window.location.search);
    const screenParam = urlParams.get('screen');
    const forcedState = urlParams.get('state');

    if (screenParam && screenParam !== 'splash') {
      splashContainer.style.setProperty('display', 'none', 'important');
      if (screenParam.startsWith('onboarding') && onboardingContainer) {
        onboardingContainer.removeAttribute('hidden');
        window.dispatchEvent(new CustomEvent('masar:bypassSplash', { detail: { screen: screenParam } }));
      }
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      splashContainer.classList.remove('state-1', 'is-animating');
      splashContainer.classList.add('state-2');

      setTimeout(transitionToOnboarding, 600);
      return;
    }

    if (forcedState === '2') {
      splashContainer.classList.remove('state-1', 'is-animating');
      splashContainer.classList.add('state-2');
      return;
    }

    await Promise.all([waitForImage(emblemImg), waitForFonts()]);
    updateAlignmentOffset();

    if (forcedState === '1') {
      splashContainer.classList.remove('is-animating', 'state-2');
      splashContainer.classList.add('state-1');
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        splashContainer.classList.remove('state-1');
        splashContainer.classList.add('is-animating');

        const durationMs = getTransitionDurationMs();
        let hasSettled = false;
        const settleState2 = () => {
          if (hasSettled) return;
          hasSettled = true;
          splashContainer.classList.remove('is-animating');
          splashContainer.classList.add('state-2');

          setTimeout(transitionToOnboarding, 1200);
        };

        const timer = setTimeout(settleState2, durationMs);
        emblemImg.addEventListener('transitionend', (e) => {
          if (e.target === emblemImg && e.propertyName === 'transform') {
            clearTimeout(timer);
            settleState2();
          }
        }, { once: true });
      });
    });
  }

  window.addEventListener('resize', () => {
    if (splashContainer.classList.contains('state-1')) {
      updateAlignmentOffset();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash);
  } else {
    initSplash();
  }
})();
