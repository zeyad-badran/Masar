(function () {
  'use strict';

  function openAssistantScreen() {
    if (typeof window.openAssistantScreen === 'function') {
      window.openAssistantScreen();
    }
  }

  function initAssistant() {
    const messagesList = document.getElementById('assistantMessagesList');
    const chatForm = document.getElementById('assistantChatForm');
    const textInput = document.getElementById('assistantTextInput');
    const sendBtn = document.getElementById('btnAssistantSend');
    const micBtn = document.getElementById('btnAssistantMic');
    const chips = document.querySelectorAll('.assistant-chip-btn');

    let recognition = null;
    let isListening = false;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'ar-JO';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListening = true;
        if (micBtn) micBtn.classList.add('listening');
        if (window.showMasarToast) window.showMasarToast('راشد يستمع إليك الآن... 🎙️', '🎙️');
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        if (textInput) {
          textInput.value = spokenText;
          if (sendBtn) sendBtn.classList.add('active');
        }
        handleSend(spokenText);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition notice:', e);
        if (micBtn) micBtn.classList.remove('listening');
        isListening = false;
      };

      recognition.onend = () => {
        if (micBtn) micBtn.classList.remove('listening');
        isListening = false;
      };
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!recognition) {
          if (window.showMasarToast) {
            window.showMasarToast('التسجيل الصوتي غير مدعوم في هذا المتصفح. يمكنك الكتابة مباشرة!', 'ℹ️');
          }
          return;
        }
        if (isListening) {
          recognition.stop();
        } else {
          try {
            recognition.start();
          } catch (err) {
            recognition.stop();
          }
        }
      });
    }

    if (textInput && sendBtn) {
      textInput.addEventListener('input', () => {
        if (textInput.value.trim().length > 0) {
          sendBtn.classList.add('active');
        } else {
          sendBtn.classList.remove('active');
        }
      });
    }

    function scrollToBottom() {
      if (messagesList) {
        messagesList.scrollTop = messagesList.scrollHeight;
      }
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m]));
    }

    function speakText(text) {
      if (!('speechSynthesis' in window)) {
        if (window.showMasarToast) window.showMasarToast('ميزة القراءة الصوتية غير مدعومة في هذا المتصفح', 'ℹ️');
        return;
      }

      window.speechSynthesis.cancel();

      const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#•]/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ar-JO';
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.name.includes('Arabic'));
      if (arabicVoice) utterance.voice = arabicVoice;

      window.speechSynthesis.speak(utterance);
      if (window.showMasarToast) window.showMasarToast('جاري قراءة الإجابة بصوت راشد 🔊', '🔊');
    }

    function appendMessage(text, isUser = false) {
      if (!messagesList) return;

      const row = document.createElement('div');
      row.className = `chat-bubble-row ${isUser ? 'user-row' : 'bot-row'}`;

      if (isUser) {
        row.innerHTML = `
          <div class="chat-bubble-content user-bubble">
            <p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>
          </div>
        `;
      } else {
        const cleanPlainText = text.replace(/<[^>]*>/g, '');
        row.innerHTML = `
          <div class="chat-avatar-mini">
            <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <rect x="10" y="12" width="60" height="56" rx="28" fill="#85122D"/>
              <polygon points="40,15 44,20 40,25 36,20" fill="#FFFFFF"/>
              <circle cx="40" cy="44" r="19" fill="#FFFFFF"/>
              <path d="M31 42c1-2.5 4-2.5 5 0" stroke="#1E1F1A" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M44 42c1-2.5 4-2.5 5 0" stroke="#1E1F1A" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M35 48c2 3 8 3 10 0" stroke="#1E1F1A" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="chat-bubble-content bot-bubble">
            <p>${text.replace(/\n/g, '<br>')}</p>
            <div style="display:flex; gap:10px; margin-top:6px;">
              <button type="button" class="btn-bubble-speak" title="استمع للإجابة">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                <span>استمع</span>
              </button>
              <button type="button" class="btn-bubble-copy" title="نسخ الإجابة">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>نسخ</span>
              </button>
            </div>
          </div>
        `;

        row.querySelector('.btn-bubble-speak')?.addEventListener('click', () => {
          speakText(text);
        });

        row.querySelector('.btn-bubble-copy')?.addEventListener('click', () => {
          navigator.clipboard.writeText(cleanPlainText);
          if (window.showMasarToast) window.showMasarToast('تم نسخ الإجابة إلى الحافظة 📋', '📋');
        });
      }

      messagesList.appendChild(row);
      scrollToBottom();
    }

    let currentTypingEl = null;

    function showTypingIndicator() {
      if (currentTypingEl || !messagesList) return;
      currentTypingEl = document.createElement('div');
      currentTypingEl.className = 'typing-indicator-row';
      currentTypingEl.innerHTML = `
        <div class="chat-avatar-mini">
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <rect x="10" y="12" width="60" height="56" rx="28" fill="#85122D"/>
            <circle cx="40" cy="44" r="19" fill="#FFFFFF"/>
          </svg>
        </div>
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      messagesList.appendChild(currentTypingEl);
      scrollToBottom();
    }

    function hideTypingIndicator() {
      if (currentTypingEl) {
        currentTypingEl.remove();
        currentTypingEl = null;
      }
    }

    function tryMathEvaluation(raw) {
      const clean = raw.replace(/[^\d+\-*/().%^ xX÷]/g, '').trim();
      if (!clean || clean.length < 3 || !/[\d]/.test(clean)) return null;
      try {
        let expr = clean.replace(/x|X/g, '*').replace(/÷/g, '/');
        if (/^[\d+\-*/().\s]+$/.test(expr)) {

          const result = Function(`'use strict'; return (${expr})`)();
          if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return `🔢 <strong>الناتج الحسابي:</strong>\n\n${clean} = <strong>${result}</strong>`;
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    }

    function resolveSmartResponse(query, userName, livePoints) {
      const q = query.toLowerCase().trim();

      const mathAns = tryMathEvaluation(query);
      if (mathAns) return mathAns;

      if (q.includes('نقط') || q.includes('نقاط') || q.includes('رصيد') || q.includes('محفظ') || q.includes('point') || q.includes('balance') || q.includes('كم نقطة')) {
        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        if (isEn) {
          return `🌟 <strong>Your wallet balance, ${userName}:</strong>\n\nYou currently have: <strong>${livePoints} Masar points</strong> 🎖️\n\n💡 <strong>How to use your points:</strong>\n• Redeem exclusive discounts on experiences & activities.\n• Get gifts & handmade crafts from local communities.\n• Climb the weekly leaderboard!\n\n💡 <em>Tip:</em> Earn more points by completing the Wadi Al-Heydan trail and Shrak bread making!`;
        }
        return `🌟 <strong>رصيد محفظتك يا ${userName}:</strong>\n\nلديك حالياً: <strong>${livePoints} نقطة مسار</strong> 🎖️\n\n💡 <strong>كيف تستفيد من نقاطك؟</strong>\n• استبدالها بخصومات حصرية على تذاكر التجارب والأنشطة.\n• الحصول على هدايا ومصنوعات يدوية من المجتمع المحلي.\n• الارتقاء في قائمة المتصدرين الأسبوعية!\n\n💡 <em>نصيحة:</em> يمكنك كسب المزيد من النقاط بإكمال تجارب وادي الهيدان وصُنع خبز الشراك!`;
      }

      if (q.includes('تحدي') || q.includes('تحديات') || q.includes('أسبوع') || q.includes('challenge') || q.includes('tasks')) {
        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        if (isEn) {
          return `🏆 <strong>Active Weekly Challenges:</strong>\n\n1. 🍞 <strong>Authentic Shrak Bread Making (As-Salt):</strong>\n• Reward: +25 pts ⭐\n• Progress: 2 of 3 steps completed.\n\n2. 🌊 <strong>Wadi Al-Heydan Trail (Madaba):</strong>\n• Reward: +25 pts ⭐\n• Progress: 1 of 4 steps completed.\n\nLog your steps from the <strong>Rewards</strong> screen to climb the weekly leaderboard! 🚀`;
        }
        return `🏆 <strong>تحديات الأسبوع النشطة:</strong>\n\n1. 🍞 <strong>صُنع خبز الشراك الأصيل (السلط):</strong>\n• المكافأة: +25 نقطة ⭐\n• التقدم الحالي: أنجزت 2 من 3 خطوات.\n\n2. 🌊 <strong>مسير وادي الهيدان (مادبا):</strong>\n• المكافأة: +25 نقطة ⭐\n• التقدم الحالي: أنجزت 1 من 4 خطوات.\n\nسجّل خطواتك من شاشة <strong>الجوائز</strong> لترتقي بالترتيب الأسبوعي! 🚀`;
      }

      if (q.includes('مرحبا') || q.includes('أهلا') || q.includes('هلا') || q.includes('صباح') || q.includes('مساء') || q.includes('سلام') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('من أنت') || q.includes('شو بتعمل') || q.includes('عرف عن نفسك') || q.includes('who are you') || q.includes('what can you do')) {
        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        if (isEn) {
          return `Welcome ${userName}! 🇯🇴\n\nI'm <strong>Rashid</strong>, your Jordan explorer & guide in the Masar app.\nI can help you with:\n• Discovering every landmark in Jordan (Petra, Wadi Rum, Dead Sea, Aqaba, As-Salt, Jerash, Ajloun, Madaba & more).\n• Recommending the best restaurants & traditional dishes (Mansaf, Zarb, Kunafa, Shrak).\n• Tracking your points, weekly challenges & planning your trips.\n• Answering any question you have!\n\nWhat would you like to explore today? 🎒`;
        }
        return `يا مية أهلاً وسهلاً يا ${userName}! 🇯🇴\n\nأنا <strong>راشد</strong> دليلك ومستكشف الأردن في تطبيق "مسار".\nمهمتي أساعدك في:\n• اكتشاف كل زاوية ومعلم بالأردن (البترا، وادي رم، البحر الميت، العقبة، السلط، جرش، عجلون، مادبا وغيرها).\n• ترشيح أطيب المطاعم والأكلات الشعبية (المنسف، الزرب، الكنافة، الشراك).\n• متابعة رصيد نقاطك وتحديات الأسبوع وتخطيط رحلاتك.\n• الإجابة عن أي استفسار أو معلومة عامة ترغب بمعرفتها.\n\nتفضل، عن شو حابب نسولف اليوم؟ 🎒`;
      }

      if (q.includes('بترا') || q.includes('البتراء') || q.includes('petra')) {
        return `🇯🇴 <strong>قصة البترا (المدينة الوردية المنحوتة بالصخر):</strong>\n\nبناها الأنباط العرب قبل أكثر من 2000 عام وجعلوها عاصمة عالمية للتجارة ومفترق طرق لقوافل الحرير والتوابل.\n\n🏛️ <strong>أهم ما يجب زيارته:</strong>\n• <strong>السيق:</strong> ممر صخري مذهل بطول 1.2 كم يفتح على الخزنة.\n• <strong>الخزنة (Al-Khazneh):</strong> تحفة نحتية بارتفاع 40 متراً.\n• <strong>الدير (Ad-Deir):</strong> أضخم واجهة منحوتة وتطل على وادي عربة (800 درجة صخرية).\n• <strong>المسرح النبطي والمقابر الملكية.</strong>\n\n💡 <em>نصيحة مسار:</em> ارتدِ حذاء مشي مريح واستمتع بتجربة "البترا ليلاً" المضاءة بالشموع!`;
      }

      if (q.includes('وادي رم') || q.includes('رم') || q.includes('rum') || q.includes('wadi rum') || q.includes('desert') || q.includes('صحراء')) {
        return `⛺ <strong>وادي رم (وادي القمر الساحر):</strong>\n\nأحد أروع صحاري العالم برماله الحمراء الشبيهة بكوكب المريخ وتكويناته الصخرية الشاهقة.\n\n🏜️ <strong>أبرز الأنشطة:</strong>\n• جولات الدفع الرباعي 4x4 (جسر أم فروث الصخري، عين لورنس، الكثبان الحمراء).\n• تجربة عشاء <strong>"الزرب"</strong> البدوي المطبوخ تحت الرمال الساخنة.\n• ركوب الجمال عند شروق الشمس.\n• رصد مجرة درب التبانة والنجوم في سماء نقية خالية من التلوث الضوئي.`;
      }

      if (q.includes('عمان') || q.includes('عمّان') || q.includes('amman') || q.includes('البلد') || q.includes('الرينبو') || q.includes('القلعة') || q.includes('المدرج')) {
        return `🏙️ <strong>عمّان الحبيبة (مدينة التلال السبعة):</strong>\n\nتجمع بين عبق التاريخ والحداثة النابضة بالحياة!\n\n🏛️ <strong>أبرز أماكن الزيارة:</strong>\n• <strong>جبل القلعة:</strong> معبد هرقل والمتحف الوطني بإطلالة بانورامية ساحرة على العاصمة.\n• <strong>المدرج الروماني:</strong> تحفة معمارية تتسع لـ 6000 متفرج في قلب وسط البلد.\n• <strong>شارع الرينبو وجبل اللويبدة:</strong> مقاهٍ فنية، معارض تشكيلية، وأجواء شبابية.\n• <strong>وسط البلد:</strong> تذوق فلافل هاشم وكنافة حبيبة التراثية الساخنة!`;
      }

      if (q.includes('عقبة') || q.includes('العقبة') || q.includes('aqaba') || q.includes('diving') || q.includes('غوص') || q.includes('شاطئ') || q.includes('بحر')) {
        return `🌊 <strong>العقبة (ثغر الأردن الباسم):</strong>\n\nمنفذ الأردن الساحلي على البحر الأحمر، وجهة مثالية للاسترخاء والرياضات المائية طوال العام!\n\n🐠 <strong>أهم التجارب:</strong>\n• الغوص واستكشاف الشعاب المرجانية وحطام الطائرة والسفينة (Cedar Pride).\n• رحلات القوارب الزجاجية واليخوت البحرية.\n• تذوق أكلة <strong>"الصيادية العقباوية"</strong> بالسمك الطازج والبهارات الخاصة.\n• التسوق في أسواق العقبة الحرة المعفية من الرسوم الجمركية.`;
      }

      if (q.includes('موجب') || q.includes('الموجب') || q.includes('mujib') || q.includes('canyon') || q.includes('شلال')) {
        return `🌊 <strong>مغامرة وادي الموجب (مسار السيق المائي):</strong>\n\nأخفض محمية مائية طبيعية في العالم! مسار مائي مثير بين صخور شاهقة يصل ارتفاعها لأكثر من 50 متراً مع السباحة وتسلق الشلالات الطبيعية.\n\n⏱️ <strong>المدة:</strong> ساعتان إلى 3 ساعات.\n💰 <strong>الرسوم:</strong> 15 د.أ (شامل سترة النجاة).\n🦺 <em>ملاحظة:</em> يتطلب العمر 18+ وإتقان مبادئ السباحة، ومفتوح من أبريل حتى أكتوبر.`;
      }

      if (q.includes('منسف') || q.includes('mansaf') || q.includes('أكل') || q.includes('طعام') || q.includes('food') || q.includes('كنافة') || q.includes('مطعم') || q.includes('زرب') || q.includes('شراك') || q.includes('قلاية')) {
        return `🍽️ <strong>أطيب المأكولات التراثية في الأردن:</strong>\n\n1. 👑 <strong>المنسف الأردني:</strong> رمز الكرم والضيافة! لحم بلدي مطبوخ بشراب الجميد الكركي الأصيل مع الأرز وخبز الشراك ومزين باللوز المقلي والبقدونس.\n2. 🥩 <strong>الزرب:</strong> لحم وخضار مشوية في براميل حفر تحت رمال الصحراء على الفحم الهادئ.\n3. 🍅 <strong>قلاية البندورة:</strong> طماطم طازجة مع زيت زيتون بلدي بكر وثوم وفلفل حار تؤكل مع خبز الطابون الساخن.\n4. 🧀 <strong>الكنافة النابلسية:</strong> ناعمة أو خشنة بالجبنة البلدية الساخنة والقطر الخفيف.`;
      }

      if (q.includes('سلط') || q.includes('السلط') || q.includes('salt')) {
        return `🏰 <strong>مدينة السلط (مدينة التسامح والضيافة الحضرية - يونسكو):</strong>\n\nتتميز ببيوتها المبنية من الحجر الأصفر العريق ونوافذها المقوسة، وتعتبر نموذجاً عالمياً للتعايش الديني المتجذر.\n\n🏛️ <strong>أهم المعالم:</strong>\n• <strong>شارع الحمام:</strong> أقدم أسواق المدينة التراثية والمحال الحرفية.\n• <strong>متحف بيت أبو جابر:</strong> للتراث المعماري والتاريخ العثماني.\n• <strong>مطل الجادور ومضافات السلط:</strong> لتذوق أشهى الأطباق التراثية وضيافة أهل السلط.`;
      }

      if (q.includes('بحر ميت') || q.includes('البحر الميت') || q.includes('dead sea')) {
        return `🏖️ <strong>البحر الميت (أخفض بقعة على وجه الأرض - 430م تحت مستوى البحر):</strong>\n\nمياهه تحتوي على تركيز أملاح ومعادن يصل إلى 34%، مما يتيح لك الطفو بدون بذل أي مجهود إطلاقاً!\n\n🧴 <strong>فوائد صحية:</strong> طين البحر الميت الأسود الغني بالمعادن مفيد جداً للبشرة وتجديد النشاط والاسترخاء في المنتجعات العلاجية العالمية.`;
      }

      if (q.includes('جرش') || q.includes('jerash') || q.includes('عجلون') || q.includes('ajloun') || q.includes('تلفريك')) {
        return `🏛️ <strong>شمال الأردن الأخضر:</strong>\n\n• <strong>جرش (مدينة الألف عمود):</strong> أكبر مدينة رومانية كلاسيكية متكاملة في الشرق الأوسط (الساحة البيضاوية، شارع الأعمدة، معبد آرتميس، ومسارحها الرومانية).\n• <strong>قلعة عجلون (قلعة الربض):</strong> حصن إسلامي تاريخي بناه القائد عز الدين أسامة عام 1184م لحماية مناجم الحديد والتحكم بطرق التجارة.\n• 🚡 <strong>تلفريك عجلون:</strong> تجربة ممتعة فوق غابات عجلون الكثيفة بإطلالات ساحرة!`;
      }

      if (q.includes('عائل') || q.includes('أطفال') || q.includes('family') || q.includes('kids')) {
        return `👨‍👩‍👧‍👦 <strong>أفضل أماكن للعائلة في الأردن:</strong>\n\n1. 🌅 <strong>جبل القلعة والمدرج الروماني:</strong> إطلالة غروب ساحرة وتاريخ عريق ومساحات مفتوحة.\n2. 🚡 <strong>تلفريك عجلون:</strong> رحلة هوائية ممتعة للأطفال والكبار فوق أحضان الطبيعة.\n3. 🌊 <strong>شاطئ العقبة الجنوبي:</strong> رحلات القوارب الزجاجية والسباحة.\n4. 🏰 <strong>شارع الحمام بالسلط:</strong> جولة هادئة وممتعة بين البيوت التراثية والدكاكين القديمة.\n5. 🏛️ <strong>متحف الأطفال في حدائق الحسين:</strong> أنشطة تفاعلية وتعليمية مبهرة.`;
      }

      if (q.includes('مغامر') || q.includes('مكان') || q.includes('رحلة') || q.includes('وين أروح') || q.includes('suggest') || q.includes('trip') || q.includes('explore')) {
        return `🧭 <strong>اقتراح مسار لمغامرتك القادمة يا ${userName}:</strong>\n\n🔥 <strong>الخيار الأول (مغامرة مائية وشلالات):</strong> وادي الموجب أو وادي الهيدان بمادبا.\n⛺ <strong>الخيار الثاني (صحراء ونجوم وسفاري):</strong> ليلة تخييم في وادي رم مع جولة 4x4 وعشاء زرب.\n🏰 <strong>الخيار الثالث (تراث وأصالة وتذوق):</strong> جولة تاريخية في بيوت السلط العتيقة وشارع الحمام مع غداء محلي.\n🏛️ <strong>الخيار الرابع (عراقة وحضارة):</strong> استكشاف البترا والدير والسيق ليوم كامل.\n\nأي منها تفضل لنبدأ التخطيط له فوراً؟ 🎒`;
      }

      const isEn = window.MasarI18n && window.MasarI18n.isEn();
      if (isEn) {
        return `Welcome ${userName}! 🇯🇴\n\nGreat question! Regarding: <em>"${escapeHtml(query)}"</em>:\n\nI'd love to help you! As your Masar travel guide, I can assist with:\n• Tourist landmarks, historical sites & nature reserves in Jordan.\n• Trip planning, activities, local food & travel costs.\n• Points tracking, challenges & achievement badges.\n• Any general questions you want to ask.\n\nPlease specify what you'd like to know more about! 🌟`;
      }
      return `أهلاً بك يا ${userName}! 🇯🇴\n\nسؤالك رائع ومهم! بخصوص: <em>"${escapeHtml(query)}"</em>:\n\nيسرّني تقديم المساعدة الكاملة لك. بصفتي دليلك السياحي في "مسار"، يمكنني إرشادك وتزويدك بأدق التفاصيل حول:\n• المعالم السياحية والتاريخية والمحميات الطبيعية بالأردن.\n• تخطيط الرحلات، الأنشطة، والمأكولات الشعبية وتكاليف السفر.\n• حساب النقاط والتحديات ومتابعة إنجازاتك.\n• أي معلومات عامة أو أسئلة ترغب بطرحها.\n\nتفضّل بتحديد أي جانب تود معرفة المزيد عنه وسأجيبك فوراً! 🌟`;
    }

    async function handleSend(query) {
      const q = query.trim();
      if (!q) return;

      appendMessage(q, true);
      if (window.MasarAudio) window.MasarAudio.playTap();

      if (textInput) {
        textInput.value = '';
        if (sendBtn) sendBtn.classList.remove('active');
      }

      showTypingIndicator();

      const isEn = window.MasarI18n && window.MasarI18n.isEn();
      const userName = localStorage.getItem('masar_user_name') || (isEn ? 'Traveler' : 'كمال');
      const livePoints = window.getUserPoints ? window.getUserPoints().toString() : (localStorage.getItem('masar_user_points') || '10000');

      const currentLang = localStorage.getItem('masar_language') || 'ar';
      let responded = false;
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: q, userName, points: livePoints, lang: currentLang })
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.reply) {
            hideTypingIndicator();
            appendMessage(data.reply, false);
            if (window.MasarAudio) window.MasarAudio.playChime();
            responded = true;
            return;
          }
        }
      } catch (err) {

      }

      if (!responded) {
        setTimeout(() => {
          hideTypingIndicator();
          const answer = resolveSmartResponse(q, userName, livePoints);
          appendMessage(answer, false);
          if (window.MasarAudio) window.MasarAudio.playChime();
        }, 400);
      }
    }

    if (chatForm && textInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSend(textInput.value);
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query') || chip.textContent.trim();
        handleSend(query);
      });
    });

    const contactRashidBtn = document.getElementById('btnContactRashidDirect');
    if (contactRashidBtn) {
      contactRashidBtn.addEventListener('click', () => {
        if (window.closeMasarModal) window.closeMasarModal('supportModal');
        openAssistantScreen();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();
