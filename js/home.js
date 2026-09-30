(function () {
  'use strict';

  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
    },
    playChime() {
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(659.25, now);
        osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
      } catch (e) {}
    },
    playTap() {
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch (e) {}
    }
  };

  window.MasarAudio = AudioEngine;

  function showMasarToast(message, icon = '🔔') {
    const container = document.getElementById('masarToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'masar-toast';
    toast.innerHTML = `
      <span>${icon} ${message}</span>
      <button type="button" style="background:none; border:none; color:#FFFFFF; opacity:0.7; cursor:pointer; font-size:14px;">✕</button>
    `;

    toast.querySelector('button').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 3200);
  }

  window.showMasarToast = showMasarToast;

  function spawnSparkleBadge(text, targetEl) {
    const layer = document.getElementById('masarSparkleLayer');
    if (!layer) return;

    const rect = targetEl ? targetEl.getBoundingClientRect() : { top: window.innerHeight / 2, left: window.innerWidth / 2 };
    const badge = document.createElement('div');
    badge.className = 'floating-point-badge';
    badge.textContent = text;
    badge.style.top = `${Math.max(20, rect.top - 20)}px`;
    badge.style.left = `${Math.max(20, rect.left + 20)}px`;

    layer.appendChild(badge);
    setTimeout(() => {
      if (badge.parentElement) badge.remove();
    }, 1500);
  }

  const EXPERIENCES_CATALOG = [
    {
      id: 'wadi_mujib',
      title: 'مغامرة في وادي الموجب',
      loc: 'وادي الموجب',
      cat: 'طبيعة • مغامرة',
      duration: '3 ساعات',
      price: '15 د.أ',
      img: 'assets/images/wadi_mujib.png',
      steps: [
        'استكشف الوادي والمسار المائي',
        'امش بين المياه والصخور الشاهقة',
        'اكتشف المناظر الطبيعية والشلالات',
        'التقط لحظتك الخاصة مع رفاق المسار'
      ],
      gearList: [
        'حذاء مشي مائي مناسب للصخور المبللة 👟',
        'حقيبة مقاومة للماء (Dry Bag) للهاتف والمقتنيات 📱',
        'سترة نجاة خفيفة ومطابقة للمواصفات 🦺',
        'ماء شرب وواقي شمس صديق للبيئة 💧'
      ],
      weather: {
        temp: '24° م',
        status: 'آمن للمسير 🟢',
        wind: '12 كم/س',
        flood: 'منخفض جداً',
        sunset: '06:20 م'
      },
      audioStory: {
        title: 'حكاية شريان الموجب وسر السيق المائي 🎧',
        host: 'بصوت الدليل حمزة',
        duration: '01:45'
      },
      suitability: 'مناسبة لعشاق المغامرة والمسارات المائية والطبيعة.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'salt_cooking',
      title: 'تعلّم الطبخ الأردني مع أهل السلط',
      loc: 'السلط',
      cat: 'طعام • تجربة محلية',
      duration: 'ساعتان',
      price: '12 د.أ',
      img: 'assets/images/salt_cooking.jpg',
      steps: [
        'تعرّف على المضيف في بيت سلطي عريق',
        'تعلّم وصفة أردنية تقليدية من الأمهات',
        'حضّر وجبة الرشوف أو الكتمة معًا',
        'شارك الوجبة مع أهل المكان بجلسة دافئة'
      ],
      gearList: [
        'مريول طبخ تقليدي مريح 🧑‍🍳',
        'دفتر ملاحظات لتدوين بهارات ووصفات الأمهات 📝',
        'حذاء مريح للمشي في أزقة السلط التراثية 👟',
        'شهية مفتوحة لتذوق الرشوف واللزاقيات 🍲'
      ],
      weather: {
        temp: '21° م',
        status: 'أجواء سلطية عليلة 🌤️',
        wind: '8 كم/س',
        flood: 'معدوم (داخل البيت)',
        sunset: '06:30 م'
      },
      audioStory: {
        title: 'حكاية أسرار المطبخ السلطي والتسامح 🎧',
        host: 'بصوت المضيفة سارة',
        duration: '02:10'
      },
      host: {
        name: 'سارة من السلط',
        desc: 'أحب أشارك الزوار وصفات تعلّمتها من عائلتي وقصص التسامح والضيافة من السلط.',
        avatar: 'assets/images/sara_host.png'
      },
      btnLabel: 'احجز التجربة'
    },
    {
      id: 'rum_stargazing',
      title: 'ليلة تحت نجوم وادي رم',
      loc: 'وادي رم',
      cat: 'ثقافة • مغامرة',
      duration: 'يوم كامل',
      price: '25 د.أ',
      img: 'assets/images/rum_stargazing.jpg',
      steps: [
        'جولة في رمال الصحراء بالدفع الرباعي 4x4',
        'تعرّف على عادات وحياة أهل البادية',
        'عشاء أردني تقليدي (زرب مطبوخ تحت الرمال)',
        'جلسة سمر وشاي كرك وتأمل النجوم'
      ],
      gearList: [
        'سترة صوفية دافئة لأجواء الليل الصحراوي 🧥',
        'مصباح يدوي بضوء أحمر لحماية الرؤية الليلية 🔦',
        'شماغ أردني أو شال للحماية من رمال الصحراء 🧣',
        'كاميرا أو هاتف مع حامل ثلاثي لتصوير النجوم 📸'
      ],
      weather: {
        temp: '16° م ليلاً',
        status: 'سماء صافية 100% 🌌',
        wind: '10 كم/س',
        flood: 'معدوم تماماً',
        sunset: '06:15 م'
      },
      audioStory: {
        title: 'حكاية النجوم وقصائد البادية في وادي القمر 🎧',
        host: 'بصوت المرشد أحمد البدوي',
        duration: '02:40'
      },
      host: {
        name: 'أحمد من وادي رم',
        desc: 'أشارك الزوار قصص الصحراء والنجوم والحياة البدوية الأصيلة التي عشتها هنا.',
        avatar: 'assets/images/ahmed_host.png'
      },
      btnLabel: 'احجز التجربة'
    },
    {
      id: 'shrak_bread',
      title: 'خبز الشراك مع أم محمد',
      loc: 'السلط',
      cat: 'طعام • تجربة محلية',
      duration: 'ساعة ونصف',
      price: '8 د.أ',
      img: 'assets/images/shrak_bread_icon.png',
      steps: [
        'عجن الطحين البلدي على الطريقة التقليدية',
        'فرد العجين باليد على الصاج الساخن',
        'تذوق الخبز طازجاً مع زيت الزيتون والزعتر البلدي'
      ],
      gearList: [
        'ملابس قطنية مريحة مناسبة لحرارة الصاج 👕',
        'ربطة أو غطاء شعر للعمل في العجين 👩‍🍳',
        'علبة لحفظ أرغفة الخبز الساخنة لأخذها معك 📦',
        'كاميرا لتوثيق حركة تدوير الشراك السريعة 📸'
      ],
      weather: {
        temp: '22° م',
        status: 'طقس معتدل ودافئ ☀️',
        wind: '6 كم/س',
        flood: 'معدوم',
        sunset: '06:30 م'
      },
      audioStory: {
        title: 'حكاية الصاج البلدي ورائحة طحين القمح 🎧',
        host: 'بصوت أم محمد',
        duration: '01:25'
      },
      host: {
        name: 'أم محمد من السلط',
        desc: 'خبازة سلطية أصيلة تشارك حبها لخبز الصاج والشراك منذ 30 عاماً.',
        avatar: 'assets/images/sara_host.png'
      },
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'wadi_hidan',
      title: 'مسير وادي الهيدان',
      loc: 'مادبا',
      cat: 'طبيعة • مغامرة',
      duration: '4 ساعات',
      price: '18 د.أ',
      img: 'assets/images/wadi_hidan.png',
      steps: [
        'بدء المسير من ينابيع وادي الهيدان',
        'السباحة في البرك الصخرية السوداء الطبيعية',
        'القفز في الشلالات الآمنة مع المرشد',
        'استراحة شاي الحطب على ضفاف الوادي'
      ],
      gearList: [
        'بدلة أو ملابس سباحة سريعة الجفاف 🩱',
        'حذاء مائي بمسامير مانعة للانزلاق على الصخور 🥾',
        'جراب هاتف عائم ومقاوم للماء 100% 📱',
        'وجبات خفيفة ومطارة ماء معزولة 💧'
      ],
      weather: {
        temp: '26° م',
        status: 'مستوى المياه ممتاز للسباحة 🏊',
        wind: '14 كم/س',
        flood: 'منخفض ومستقر',
        sunset: '06:22 م'
      },
      audioStory: {
        title: 'حكاية ينابيع الهيدان والصخور البازلتية 🎧',
        host: 'بصوت المغامر ركان',
        duration: '01:50'
      },
      suitability: 'مناسبة لمحبي المغامرات المائية والسباحة في الطبيعة البكر.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'citadel_sunset',
      title: 'غروب من جبل القلعة',
      loc: 'عمّان',
      cat: 'طبيعة • تصوير',
      duration: 'ساعتان',
      price: 'مجاناً',
      img: 'assets/images/citadel_sunset.jpg',
      steps: [
        'جولة في معبد هرقل والمتحف الأثري الوطني',
        'الاستمتاع بإطلالة بانورامية 360 درجة على عمّان',
        'مشاهدة ألوان الغروب الذهبية فوق التلال',
        'التقاط صور تذكارية مذهلة للعاصمة'
      ],
      gearList: [
        'نظارات شمسية وقبعة خفيفة لحماية وقت العصر 🕶️',
        'كاميرا مع عدسة واسعة لالتقاط أفق عمّان 📷',
        'حذاء مشي خفيف ومريح بين الآثار الحجرية 👟',
        'سماعات أذن للاستماع إلى حكاية القلعة 🎧'
      ],
      weather: {
        temp: '23° م',
        status: 'إطلالة ذهبية نقية 🌅',
        wind: '15 كم/س',
        flood: 'معدوم',
        sunset: '06:28 م'
      },
      audioStory: {
        title: 'حكاية عمون ومعبد هرقل فوق التلال السبع 🎧',
        host: 'بصوت المؤرخ يوسف',
        duration: '02:05'
      },
      suitability: 'مناسبة للعائلات ولعشاق التصوير والإطلالات الهادئة.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'salt_alleys',
      title: 'اكتشف حكايات السلط',
      loc: 'السلط',
      cat: 'تاريخ • ثقافة',
      duration: 'ساعتان',
      price: '5 د.أ',
      img: 'assets/images/salt_alleys.jpg',
      steps: [
        'التجول بين بيوت الحجر الأصفر التاريخية',
        'زيارة شارع الحمام وأقدم الدكاكين الحرفية',
        'استكشاف متحف بيت أبو جابر للتراث المعماري',
        'شرب الشاي بالنعناع في مقهى تراثي عريق'
      ],
      gearList: [
        'حذاء مريح جداً لصعود الأدراج الحجرية التاريخية 👟',
        'دفتر رسم أو كاميرا لتوثيق العقود والنوافذ المقوسة 🎨',
        'مظلة أو قبعة شمسية لجولات النهار المفتوحة 🧢',
        'حقيبة قماشية لمشتريات الحرفيين من شارع الحمام 🛍️'
      ],
      weather: {
        temp: '20° م',
        status: 'نسمات جبلية لطيفة 🍃',
        wind: '11 كم/س',
        flood: 'معدوم',
        sunset: '06:31 م'
      },
      audioStory: {
        title: 'حكاية بيوت الحجر الأصفر ومسار الوئام 🎧',
        host: 'بصوت الحكواتي معاذ',
        duration: '02:15'
      },
      suitability: 'مناسبة لمحبي العمارة التراثية وقصص المدن القديمة.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'arabic_coffee',
      title: 'قهوة على طريقة أهل الأردن',
      loc: 'عمّان',
      cat: 'طعام • تجربة محلية',
      duration: 'ساعة',
      price: '5 د.أ',
      img: 'assets/images/arabic_coffee.jpg',
      steps: [
        'تحميص حبوب البن وطحنها مع الهيل بالمهباش',
        'طبخ القهوة السادة في الدلة النحاسية على الجمر',
        'تعلّم أصول وآداب صب القهوة باليد اليسرى واليمنى',
        'تذوق القهوة مع التمر والحلويات التراثية'
      ],
      gearList: [
        'دفتر صغير لتدوين أسرار تحميص البن والهيل 📝',
        'فضول للتعرف على دلالات فنجان الهيف والضيف والسيف ☕',
        'ملابس تراثية أو أنيقة ملائمة لجلسة الضيافة 👔',
        'كاميرا لتوثيق نغمات المهباش التراثي 🎥'
      ],
      weather: {
        temp: '22° م',
        status: 'جلسة عربية أصيلة 🪑',
        wind: '7 كم/س',
        flood: 'معدوم',
        sunset: '06:25 م'
      },
      audioStory: {
        title: 'حكاية دلة القهوة وأصول الكرم الأردني 🎧',
        host: 'بصوت أبو طارق',
        duration: '01:35'
      },
      suitability: 'تجربة ضيافة تراثية أصيلة لكل زائر ومستكشف.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'wadi_bin_hammad',
      title: 'واحة وادي بن حماد المعلقة 🌿',
      loc: 'الكرك',
      cat: 'كنوز مخفية • مغامرة',
      duration: '3 ساعات ونصف',
      price: '10 د.أ',
      img: 'assets/images/wadi_bin_hammad.jpg',
      steps: [
        'المسير المائي الدافئ بين الصخور الوردية الشاهقة',
        'استكشاف حدائق السرخس وأشجار النخيل المعلقة',
        'الاسترخاء في برك المياه الكبريتية الطبيعية',
        'شرب شاي الحطب على الجمر مع المرشد الكركي'
      ],
      gearList: [
        'حذاء خوض مائي (Water Shoes) بنعل سميك 👟',
        'ملابس تبديل إضافية وحقيبة جافة 🎒',
        'منشفة خفيفة سريعة الامتصاص 🧖',
        'عصا مشي للمساعدة في التوازن بين مجاري المياه 🦯'
      ],
      weather: {
        temp: '27° م',
        status: 'ينابيع دافئة ومسار آمن 🌴',
        wind: '9 كم/س',
        flood: 'منخفض جداً',
        sunset: '06:18 م'
      },
      audioStory: {
        title: 'حكاية الواحة المعلقة وحدائق السرخس الكركية 🎧',
        host: 'بصوت أبو يوسف الكركي',
        duration: '02:20'
      },
      host: {
        name: 'أبو يوسف من الكرك',
        desc: 'خبير دروب وادي بن حماد والينابيع الطبيعية المخبأة في جبال الكرك.',
        avatar: 'assets/images/ahmed_host.png'
      },
      suitability: 'واحة استوائية ساحرة ومسار مائي دافئ يناسب عشاق الطبيعة والهدوء.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'dana_reserve',
      title: 'سحر محمية وضيعة ضانا التراثية 🦅',
      loc: 'الطفيلة',
      cat: 'كنوز مخفية • طبيعة',
      duration: 'يوم كامل',
      price: '20 د.أ',
      img: 'assets/images/dana_reserve.jpg',
      steps: [
        'جولة بين بيوت القرية العثمانية الحجرية القديمة',
        'مسار وادي ضانا الطبيعي ومراقبة الطيور والوعول النادرة',
        'مشاهدة غروب الشمس الأسطوري فوق قمم الجبال الوردية',
        'عشاء قروي أصيل وجلسة سمر تحت سماء النجوم'
      ],
      gearList: [
        'حذاء هايكنج جبلي متين وعالي الرقبة 🥾',
        'دربيل (منظار) لمراقبة الوعل النوبي والطيور الجارحة 🔭',
        'مطارة ماء سعة 2 لتر مع أملاح ترطيب 💧',
        'سترة عازلة للرياح لقمم الجبال العالية 🧥'
      ],
      weather: {
        temp: '19° م',
        status: 'هواء نقي ورؤية ممتازة 🦅',
        wind: '18 كم/س',
        flood: 'معدوم (مسار جبلي)',
        sunset: '06:19 م'
      },
      audioStory: {
        title: 'حكاية أودية ضانا وحراس التنوع البيولوجي 🎧',
        host: 'بصوت المرشد سليمان',
        duration: '02:30'
      },
      host: {
        name: 'سليمان من ضانا',
        desc: 'مرشد بيئي معتمد في محمية ضانا الطبيعية يشارك حكايات الجبال وحماة البرية.',
        avatar: 'assets/images/ahmed_host.png'
      },
      suitability: 'أكبر محمية طبيعية في الأردن، مثالية للباحثين عن السكينة والمناظر الجبلية المهيبة.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'little_petra',
      title: 'درب السيق البارد والدير الخفي 🏺',
      loc: 'البترا',
      cat: 'كنوز مخفية • تاريخ',
      duration: '5 ساعات',
      price: '15 د.أ',
      img: 'assets/images/little_petra.jpg',
      steps: [
        'استكشاف بيوت وصهاريج الأنباط في السيق البارد (البيضا)',
        'سلوك المسار الجبلي السري خلف جبال وادي موسى',
        'الوصول المذهل إلى دير البترا الشامخ بدون ازدحام',
        'تذوق الشاي بالمرمية في ضيافة البدو المحليين'
      ],
      gearList: [
        'حذاء هايكنج للمسافات الطويلة والدرجات الصخرية 🥾',
        'قبعة عريضة وواقي شمس قوي للمسارات المكشوفة 🤠',
        'حقيبة ظهر مريحة مع 2 لتر ماء وفواكه مجففة 🎒',
        'عصي تتبع لمساندة الركبتين في الصعود إلى الدير 🦯'
      ],
      weather: {
        temp: '25° م',
        status: 'طقس مشمس ورائع للمسير ☀️',
        wind: '13 كم/س',
        flood: 'معدوم ومسار آمن',
        sunset: '06:17 م'
      },
      audioStory: {
        title: 'حكاية القوافل النبطية والمدخل الخلفي للدير 🎧',
        host: 'بصوت هارون البدول',
        duration: '02:45'
      },
      host: {
        name: 'هارون البدول',
        desc: 'ابن جبال البترا وخبير المسارات النبطية الخفية والآثار القديمة.',
        avatar: 'assets/images/ahmed_host.png'
      },
      suitability: 'أجمل مسار بديل للبترا يمنحك تجربة حصرية بعيداً عن الطرق التقليدية.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'aqaba_dive',
      title: 'غوص حطام الطائرة والمرجان في العقبة 🤿',
      loc: 'العقبة',
      cat: 'كنوز مخفية • بحرية',
      duration: '3 ساعات',
      price: '30 د.أ',
      img: 'assets/images/aqaba_dive.jpg',
      steps: [
        'تجهيز معدات الغوص والتدريب مع مدرب PADI محترف',
        'النزول إلى المتحف العسكري المائي وحطام طائرة C-130',
        'السباحة مع سلاحف البحر الأحمر وأسراب الأسماك الملونة',
        'جلسة استرخاء على شاطئ تالابيه وتناول الصيادية العقباوية'
      ],
      gearList: [
        'نظارة غوص (ماسك) وزعانف مناسبة 🤿',
        'بدلة غوص مائية وساعة مقاومة لضغط الأعماق ⌚',
        'واقي شمس آمن للشعاب المرجانية (Reef-Safe) 🧴',
        'حقيبة شبكية للمعدات ومنشفة شاطئية 🏖️'
      ],
      weather: {
        temp: '28° م (ماء: 24°)',
        status: 'بحر هادئ ورؤية تحت الماء 25م 🤿',
        wind: '10 كم/س',
        flood: 'معدوم',
        sunset: '06:24 م'
      },
      audioStory: {
        title: 'حكاية أسرار الطائرة الغارقة وحدائق المرجان 🎧',
        host: 'بصوت كابتن زياد',
        duration: '02:15'
      },
      host: {
        name: 'كابتن زياد من العقبة',
        desc: 'غواص محترف وبحار عقباوي يرشدك لأجمل أسرار خليج العقبة والشعاب المرجانية.',
        avatar: 'assets/images/ahmed_host.png'
      },
      suitability: 'مغامرة بحرية استثنائية في أحد أروع مواقع الغوص على البحر الأحمر.',
      btnLabel: 'أضف إلى رحلتي'
    },
    {
      id: 'madaba_mosaic',
      title: 'حرفة الفسيفساء البيزنطية في مادبا 🎨',
      loc: 'مادبا',
      cat: 'كنوز مخفية • فن وتراث',
      duration: 'ساعتان',
      price: '10 د.أ',
      img: 'assets/images/madaba_mosaic.jpg',
      steps: [
        'التعرف على تاريخ خارطة مادبا الفسيفسائية الأقدم في العالم',
        'تقطيع الأحجار الطبيعية الملونة بالأزاميل التقليدية',
        'رصف لوحتك الفسيفسائية الخاصة بإشراف الحرفيين',
        'أخذ لوحتك التذكارية المكتملة كهدية من الأردن'
      ],
      gearList: [
        'نظارات حماية خفيفة لتقطيع قطع الفسيفساء الصخرية 👓',
        'ملابس عمل مريحة تتحمل غبار الحجر والصمغ 👕',
        'دفتر رسم ومسطرة لتخطيط الأنماط الهندسية 📐',
        'صندوق آمن لأخذ لوحتك الفسيفسائية بعد اكتمالها 🎁'
      ],
      weather: {
        temp: '22° م',
        status: 'ورشة داخلية مكيّفة ومريحة 🎨',
        wind: '8 كم/س',
        flood: 'معدوم',
        sunset: '06:26 م'
      },
      audioStory: {
        title: 'حكاية خارطة مادبا ورصف أحجار التاريخ 🎧',
        host: 'بصوت أم جورج المادباوية',
        duration: '02:00'
      },
      host: {
        name: 'أم جورج من مادبا',
        desc: 'فنانة فسيفساء ورثت الحرفة عن أجدادها وتعلم صناعة التحف الحجرية منذ عقود.',
        avatar: 'assets/images/sara_host.png'
      },
      suitability: 'تجربة فنية تراثية غنية تناسب الكبار والأطفال ومحبي الفنون اليدوية.',
      btnLabel: 'أضف إلى رحلتي'
    }
  ];

  function getBadgesCatalog() {
    const isEn = window.MasarI18n && window.MasarI18n.isEn();
    return {
      'first_hike': {
        name: isEn ? 'First Hike' : 'أول مسير',
        emoji: '🥾',
        unlocked: true,
        desc: isEn ? 'Completed your first nature trail in Jordan and earned the Active Explorer badge.' : 'أكملت أول مسار استكشافي في الطبيعة الأردنية وحصلت على شارة المستكشف النشط.',
        progress: isEn ? '1/1 (Complete)' : '1/1 (مكتمل)',
        percent: '100%',
        reward: isEn ? '25 pts' : '25 نقطة'
      },
      'gourmet': {
        name: isEn ? 'Gourmet' : 'ذوّاق',
        emoji: '🍽️',
        unlocked: true,
        desc: isEn ? 'Tasted 3 authentic Jordanian heritage dishes (Mansaf, Shrak, and Galayet Bandora).' : 'تذوقت 3 مأكولات تراثية أردنية أصيلة (المنسف، الشراك، وقلاية البندورة).',
        progress: isEn ? '3/3 (Complete)' : '3/3 (مكتمل)',
        percent: '100%',
        reward: isEn ? '25 pts' : '25 نقطة'
      },
      'photographer': {
        name: isEn ? 'Photographer' : 'مصوّر',
        emoji: '📸',
        unlocked: true,
        desc: isEn ? 'Documented 5 amazing landmarks and shared them with the Masar community.' : 'وثقت 5 معالم سياحية رائعة وشاركت صورها مع مجتمع مسار.',
        progress: isEn ? '5/5 (Complete)' : '5/5 (مكتمل)',
        percent: '100%',
        reward: isEn ? '25 pts' : '25 نقطة'
      },
      'aqaba_diver': {
        name: isEn ? 'Aqaba Diver' : 'غواص العقبة',
        emoji: '🤿',
        unlocked: true,
        desc: isEn ? 'Explored the military plane wreck and stunning coral reefs in the depths of Aqaba.' : 'استكشفت حطام الطائرة العسكرية والشعاب المرجانية الساحرة في أعماق خليج العقبة.',
        progress: isEn ? '1/1 (Complete)' : '1/1 (مكتمل)',
        percent: '100%',
        reward: isEn ? '35 pts' : '35 نقطة'
      },
      'petra_knight': {
        name: isEn ? 'Petra Knight' : 'فارس البترا',
        emoji: '🏛️',
        unlocked: true,
        desc: isEn ? 'Walked the Siq, climbed to the Monastery, and reached the highest viewpoints above the Rose City.' : 'مشيت درب السيق والديْر وتسلقت أعلى المطلات فوق المدينة الوردية إحدى عجائب الدنيا.',
        progress: isEn ? '1/1 (Complete)' : '1/1 (مكتمل)',
        percent: '100%',
        reward: isEn ? '40 pts' : '40 نقطة'
      },
      '7_days': {
        name: isEn ? '7 Days' : '٧ أيام',
        emoji: '🔥',
        unlocked: false,
        desc: isEn ? 'Keep exploring Jordan trails and daily engagement for 7 consecutive days.' : 'حافظ على استكشاف مسارات الأردن والتفاعل اليومي لمدة 7 أيام متتالية.',
        progress: isEn ? '4/7 days' : '4/7 أيام',
        percent: '57%',
        reward: isEn ? '50 pts' : '50 نقطة'
      },
      'bedouin': {
        name: isEn ? 'Bedouin' : 'بدوي',
        emoji: '🏜️',
        unlocked: false,
        desc: isEn ? 'Experience camping, Zarb dinner, and stargazing under the clear skies of Wadi Rum.' : 'عش تجربة التخييم وعشاء الزرب والسمر تحت سماء وادي رم الصافية.',
        progress: isEn ? '0/1 experience' : '0/1 تجربة',
        percent: '0%',
        reward: isEn ? '75 pts' : '75 نقطة'
      },
      'nature_guardian': {
        name: isEn ? 'Nature Guardian' : 'حارس الطبيعة',
        emoji: '🌿',
        unlocked: false,
        desc: isEn ? 'Visit 3 Jordanian nature reserves (Dana, Mujib, Ajloun) and help protect the environment.' : 'قم بزيارة 3 محميات طبيعية أردنية (ضانا، الموجب، عجلون) وساهم بحماية البيئة.',
        progress: isEn ? '1/3 reserves' : '1/3 محميات',
        percent: '33%',
        reward: isEn ? '60 pts' : '60 نقطة'
      },
      'jordan_falcon': {
        name: isEn ? 'Jordan Falcon' : 'صقر الأردن',
        emoji: '🦅',
        unlocked: false,
        desc: isEn ? 'Challenge Um Al-Dami peak, Jordan\'s highest summit, and venture through rugged canyons.' : 'تحدَّ قمة جبل أم الدامي أعلى قمم المملكة وانطلق في مسار الوديان الوعرة.',
        progress: isEn ? '0/1 peak' : '0/1 قمة',
        percent: '0%',
        reward: isEn ? '100 pts' : '100 نقطة'
      },
      'mosaic_artist': {
        name: isEn ? 'Mosaic Artist' : 'نحات الفسيفساء',
        emoji: '🎨',
        unlocked: false,
        desc: isEn ? 'Join a hands-on Byzantine mosaic crafting workshop in Madaba.' : 'شارك في ورشة تدريبية لصناعة الفسيفساء البيزنطية اليدوية في مادبا.',
        progress: isEn ? '0/1 workshop' : '0/1 ورشة',
        percent: '0%',
        reward: isEn ? '30 pts' : '30 نقطة'
      },
      'karam_nashama': {
        name: isEn ? 'Nashama Hospitality' : 'كرم النشامى',
        emoji: '☕',
        unlocked: false,
        desc: isEn ? 'Share Jordanian hospitality and Arabic coffee across 5 different local experiences.' : 'تشارك الضيافة الأردنية وفنجان القهوة السادة في 5 تجارب محلية مختلفة.',
        progress: isEn ? '2/5 experiences' : '2/5 تجارب',
        percent: '40%',
        reward: isEn ? '45 pts' : '45 نقطة'
      },
      'legend': {
        name: isEn ? 'Legend' : 'أسطورة',
        emoji: '👑',
        unlocked: true,
        desc: isEn ? 'Collect 2000 points and explore landmarks across all 12 governorates of Jordan.' : 'اجمع 2000 نقطة واكتشف معالم ومسارات محافظات المملكة الـ 12 كافة.',
        progress: isEn ? '10000/2000 pts' : '10000/2000 نقطة',
        percent: '100%',
        reward: isEn ? '200 pts' : '200 نقطة'
      }
    };
  }
  const BADGES_CATALOG = getBadgesCatalog();

  function hideAllScreens() {
    const screens = [
      'splashContainer', 'onboardingContainer', 'profileContainer',
      'loginContainer', 'registerContainer', 'homeContainer',
      'rewardsContainer', 'assistantContainer', 'experienceDetailContainer',
      'settingsContainer'
    ];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === 'splashContainer') {
          el.style.setProperty('display', 'none', 'important');
        } else {
          el.setAttribute('hidden', '');
        }
      }
    });
  }

  function syncUrlAndStorage(screenName, extraParams) {
    try {
      localStorage.setItem('masar_active_screen', screenName);
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', screenName);
        if (extraParams) {
          Object.keys(extraParams).forEach(k => {
            if (extraParams[k] !== undefined && extraParams[k] !== null && extraParams[k] !== '') {
              url.searchParams.set(k, extraParams[k]);
            } else {
              url.searchParams.delete(k);
            }
          });
        } else {
          url.searchParams.delete('id');
        }
        window.history.replaceState(null, '', url.pathname + url.search);
      }
    } catch (e) {}
  }

  function openHomeScreen() {
    hideAllScreens();
    const home = document.getElementById('homeContainer');
    if (home) {
      home.removeAttribute('hidden');
      window.scrollTo(0, 0);
      applyDynamicUserName();
      updateBottomNavActive('navItemHome');
      syncUrlAndStorage('home');
    }
  }

  function openRewardsScreen() {
    hideAllScreens();
    const rewards = document.getElementById('rewardsContainer');
    if (rewards) {
      rewards.removeAttribute('hidden');
      window.scrollTo(0, 0);
      applyDynamicUserName();
      updateBottomNavActive('navItemRewards');
      syncUrlAndStorage('rewards');
    }
  }

  function openAssistantScreen() {
    hideAllScreens();
    const assistant = document.getElementById('assistantContainer');
    if (assistant) {
      assistant.removeAttribute('hidden');
      window.scrollTo(0, 0);
      applyDynamicUserName();
      updateBottomNavActive('navItemMap');
      syncUrlAndStorage('assistant');
    }
  }

  function openSettingsScreen() {
    hideAllScreens();
    const settings = document.getElementById('settingsContainer');
    if (settings) {
      settings.removeAttribute('hidden');
      window.scrollTo(0, 0);
      applyDynamicUserName();
      updateBottomNavActive('navItemProfile');
      syncUrlAndStorage('settings');
    }
  }

  function updateBottomNavActive(activeId) {
    document.querySelectorAll('.home-bottom-nav .nav-item').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtns = document.querySelectorAll(`#${activeId}, #${activeId}2, #${activeId}3`);
    activeBtns.forEach(btn => btn.classList.add('active'));
  }

  window.openHomeScreen = openHomeScreen;
  window.openRewardsScreen = openRewardsScreen;
  window.openAssistantScreen = openAssistantScreen;
  window.openSettingsScreen = openSettingsScreen;

  function getUserPoints() {
    const raw = localStorage.getItem('masar_user_points');
    if (raw !== null && !isNaN(parseInt(raw, 10))) {
      return Math.max(10000, parseInt(raw, 10));
    }
    return 10000;
  }

  function getLeaderboardPoints() {
    const raw = localStorage.getItem('masar_user_leaderboard_points');
    if (raw !== null && !isNaN(parseInt(raw, 10))) {
      return Math.max(10000, parseInt(raw, 10));
    }
    return 10000;
  }

  function setUserPoints(pts) {
    const valid = Math.max(0, Math.round(pts));
    localStorage.setItem('masar_user_points', valid.toString());
    applyDynamicPoints();
    return valid;
  }

  function addPoints(amount) {
    const ptsToAdd = Math.max(0, Math.round(amount));
    const newWallet = getUserPoints() + ptsToAdd;
    const newLeaderboard = getLeaderboardPoints() + ptsToAdd;

    localStorage.setItem('masar_user_points', newWallet.toString());
    localStorage.setItem('masar_user_leaderboard_points', newLeaderboard.toString());
    applyDynamicPoints();
    return { wallet: newWallet, leaderboard: newLeaderboard };
  }

  function spendPoints(cost) {
    const ptsCost = Math.max(0, Math.round(cost));
    const current = getUserPoints();
    if (current < ptsCost) return false;

    const newWallet = current - ptsCost;
    localStorage.setItem('masar_user_points', newWallet.toString());

    applyDynamicPoints();
    return true;
  }

  function applyDynamicPoints() {
    const walletPts = getUserPoints();
    const leaderboardPts = getLeaderboardPoints();

    document.querySelectorAll('.points-amount, .rewards-points-amount').forEach(el => {
      el.textContent = walletPts;
    });
    const marketPts = document.getElementById('marketCurrentPointsVal');
    if (marketPts) marketPts.textContent = walletPts;

    const leaderUserPts = document.querySelector('.leaderboard-row.highlight-user .leader-points-num');
    if (leaderUserPts) leaderUserPts.textContent = leaderboardPts;

    const leaderBadge = document.querySelector('.leaderboard-row.highlight-user .leader-rank-badge, .leaderboard-row.highlight-user .leader-rank-medal');
    if (leaderBadge) {
      leaderBadge.textContent = '🥇';
    }

    const highlightRow = document.querySelector('.leaderboard-row.highlight-user');
    const leaderboardCard = document.querySelector('.leaderboard-card');
    if (highlightRow && leaderboardCard && leaderboardCard.firstElementChild !== highlightRow) {
      leaderboardCard.insertBefore(highlightRow, leaderboardCard.firstElementChild);
    }
  }

  function applyDynamicUserName() {
    const isEn = window.MasarI18n && window.MasarI18n.isEn();
    const storedName = localStorage.getItem('masar_user_name') || 'zeyad';
    const greetingPrefix = isEn ? 'Welcome' : 'مرحبا';
    const youTag = isEn ? '(You)' : '(أنت)';
    document.querySelectorAll('.home-greeting-title').forEach(el => {
      el.textContent = `${greetingPrefix} ${storedName}`;
    });
    document.querySelectorAll('.leaderboard-row.highlight-user .leader-name').forEach(el => {
      el.textContent = `${storedName} ${youTag}`;
    });
    const profileNameEl = document.querySelector('.profile-user-name');
    if (profileNameEl) profileNameEl.textContent = storedName;
    applyDynamicPoints();
  }

  window.applyDynamicUserName = applyDynamicUserName;
  window.applyDynamicPoints = applyDynamicPoints;
  window.getUserPoints = getUserPoints;
  window.getLeaderboardPoints = getLeaderboardPoints;
  window.setUserPoints = setUserPoints;
  window.addPoints = addPoints;
  window.spendPoints = spendPoints;

  function openExperienceDetail(data) {
    const expContainer = document.getElementById('experienceDetailContainer');
    if (!expContainer || !data) return;

    hideAllScreens();
    expContainer.removeAttribute('hidden');
    window.scrollTo(0, 0);
    syncUrlAndStorage('experience', { id: data && data.id ? data.id : '' });
    if (data && data.id) {
      try { localStorage.setItem('masar_active_exp_id', data.id); } catch (e) {}
    }

    const heroImg = document.getElementById('expDetailHeroImg');
    const titleEl = document.getElementById('expDetailTitle');
    const locEl = document.getElementById('expDetailLocation');
    const catEl = document.getElementById('expDetailCategory');
    const durEl = document.getElementById('expDetailDuration');
    const priceEl = document.getElementById('expDetailPrice');
    const activitiesList = document.getElementById('expActivitiesList');
    const hostCard = document.getElementById('expHostCard');
    const hostName = document.getElementById('expHostName');
    const hostDesc = document.getElementById('expHostDesc');
    const hostAvatar = document.getElementById('expHostAvatar');
    const suitBanner = document.getElementById('expSuitabilityBanner');
    const suitText = document.getElementById('expSuitabilityText');
    const actionBtn = document.getElementById('btnAddToTrip');

    const isEn = window.MasarI18n && window.MasarI18n.isEn();
    const expDict = {
      wadi_mujib: {
        title: 'Wadi Mujib Canyon Adventure',
        loc: 'Dead Sea',
        cat: 'Nature • Adventure',
        duration: '3 hours',
        price: '21 JOD',
        steps: ['Enter the refreshing water canyon', 'Hike through natural limestone pools', 'Reach the large waterfall with certified guide', 'Relax at the coastal rest area'],
        gearList: ['Water shoes with anti-slip soles 🥾', 'Waterproof phone pouch 📱', 'Life jacket & light backpack 🎒', 'Dry change of clothes 👕'],
        weather: { temp: '28° C', status: 'Optimal Water Level 🟢', wind: '12 km/h', flood: 'Low & Monitored', sunset: '06:20 PM' },
        suitability: 'Ideal for water adventure lovers and natural canyon explorers.',
        btnLabel: 'Add to My Trip'
      },
      wadi_hidan: {
        title: 'Wadi Al-Heydan Trail',
        loc: 'Madaba',
        cat: 'Nature • Adventure',
        duration: '4 hours',
        price: '18 JOD',
        steps: ['Start hike from Al-Heydan springs', 'Swim in natural black basalt rock pools', 'Safe cliff jumping with trail guide', 'Campfire tea break by the stream'],
        gearList: ['Quick-dry swim clothes 🩱', 'Water shoes with grip 🥾', 'Floating waterproof phone case 📱', 'Light snacks & insulated water bottle 💧'],
        weather: { temp: '26° C', status: 'Great Water for Swimming 🏊', wind: '14 km/h', flood: 'Low & Stable', sunset: '06:22 PM' },
        suitability: 'Perfect for aquatic adventure fans and wild nature swimming.',
        btnLabel: 'Add to My Trip'
      },
      citadel_sunset: {
        title: 'Amman Citadel Sunset',
        loc: 'Amman',
        cat: 'Nature • Photography',
        duration: '2 hours',
        price: 'Free',
        steps: ['Tour the Temple of Hercules & National Archaeological Museum', 'Enjoy 360-degree panoramic views of Amman', 'Watch the golden sunset over the seven hills', 'Capture stunning capital skyline photos'],
        gearList: ['Sunglasses & sunhat 🕶️', 'Wide-angle camera for city skyline 📷', 'Comfortable walking shoes on ancient stone 👟', 'Headphones for Citadel audio story 🎧'],
        weather: { temp: '23° C', status: 'Golden Clear View 🌅', wind: '15 km/h', flood: 'None', sunset: '06:28 PM' },
        suitability: 'Family-friendly, ideal for photography and tranquil viewpoints.',
        btnLabel: 'Add to My Trip'
      },
      salt_alleys: {
        title: 'Stories of As-Salt',
        loc: 'As-Salt',
        cat: 'History • Culture',
        duration: '2 hours',
        price: '5 JOD',
        steps: ['Stroll through historic yellow stone heritage houses', 'Visit Hammam Street and traditional artisan shops', 'Explore Abu Jaber Architecture Museum', 'Mint tea at a classic heritage cafe'],
        gearList: ['Comfortable shoes for climbing historic stone stairs 👟', 'Sketchbook or camera for arched windows 🎨', 'Sun umbrella or cap for open day tours 🧢', 'Tote bag for artisan crafts from Hammam Street 🛍️'],
        weather: { temp: '20° C', status: 'Pleasant Mountain Breeze 🍃', wind: '11 km/h', flood: 'None', sunset: '06:31 PM' },
        suitability: 'Ideal for architecture and historic city storytelling enthusiasts.',
        btnLabel: 'Add to My Trip'
      },
      arabic_coffee: {
        title: 'Authentic Jordanian Coffee',
        loc: 'Amman',
        cat: 'Food • Local Experience',
        duration: '1 hour',
        price: '5 JOD',
        steps: ['Roasting and grinding cardamom coffee beans with Mihbash', 'Brewing plain Arabic coffee over hot charcoal', 'Learning coffee pouring traditions and etiquette', 'Tasting coffee with fresh dates and heritage sweets'],
        gearList: ['Notebook to write coffee roasting secrets 📝', 'Curiosity to learn meanings of traditional cups ☕', 'Smart or traditional casual attire 👔', 'Camera to record traditional rhythmic beats 🎥'],
        weather: { temp: '22° C', status: 'Authentic Arabic Gathering 🪑', wind: '7 km/h', flood: 'None', sunset: '06:25 PM' },
        suitability: 'Authentic Jordanian hospitality experience for every traveler.',
        btnLabel: 'Add to My Trip'
      },
      wadi_bin_hammad: {
        title: 'Wadi Bin Hammad Hanging Oasis 🌿',
        loc: 'Karak',
        cat: 'Hidden Gems • Adventure',
        duration: '3.5 hours',
        price: '10 JOD',
        steps: ['Warm water canyon trekking between towering pink cliffs', 'Exploring hanging fern gardens and palm trees', 'Relaxing in natural hot sulfur pools', 'Campfire tea with a local Karak guide'],
        gearList: ['Thick-soled water shoes 👟', 'Spare change of clothes & dry bag 🎒', 'Quick-dry microfiber towel 🧖', 'Hiking pole for stream balance 🦯'],
        weather: { temp: '27° C', status: 'Warm Springs & Safe Trail 🌴', wind: '9 km/h', flood: 'Very Low', sunset: '06:18 PM' },
        suitability: 'Tropical oasis and warm water trail ideal for nature & serenity lovers.',
        btnLabel: 'Add to My Trip'
      }
    };

    const activeData = (isEn && expDict[data.id]) ? { ...data, ...expDict[data.id] } : data;

    if (heroImg && activeData.img) heroImg.src = activeData.img;
    if (titleEl && activeData.title) titleEl.textContent = activeData.title;
    if (locEl && activeData.loc) locEl.textContent = activeData.loc;
    if (catEl && activeData.cat) catEl.textContent = activeData.cat;
    if (durEl && activeData.duration) durEl.textContent = activeData.duration;
    if (priceEl && activeData.price) priceEl.textContent = activeData.price;

    if (activitiesList && activeData.steps && Array.isArray(activeData.steps)) {
      activitiesList.innerHTML = '';
      activeData.steps.forEach((step, i) => {
        const li = document.createElement('li');
        const isPink = (i % 2 === 1);
        const isDarkBadge = (i === activeData.steps.length - 1 && activeData.steps.length > 3);
        li.className = `exp-activity-card ${isPink ? 'card-pink' : 'card-white'}`;
        li.innerHTML = `
          <span class="exp-step-badge ${isDarkBadge ? 'badge-dark' : ''}">${i + 1}</span>
          <span class="exp-step-text">${step}</span>
        `;
        activitiesList.appendChild(li);
      });
    }

    if (activeData.host) {
      if (hostCard) {
        hostCard.removeAttribute('hidden');
        if (hostName) hostName.textContent = activeData.host.name;
        if (hostDesc) hostDesc.textContent = activeData.host.desc;
        if (hostAvatar && activeData.host.avatar) hostAvatar.src = activeData.host.avatar;
      }
      if (suitBanner) suitBanner.setAttribute('hidden', '');
    } else {
      if (hostCard) hostCard.setAttribute('hidden', '');
      if (suitBanner) {
        suitBanner.removeAttribute('hidden');
        if (suitText && activeData.suitability) suitText.textContent = activeData.suitability;
      }
    }

    if (actionBtn && activeData.btnLabel) {
      actionBtn.textContent = activeData.btnLabel;
    }

    const packingList = document.getElementById('packingItemsList');
    const packingProgressTag = document.getElementById('packingProgressTag');
    const defaultGear = isEn ? [
      'Comfortable hiking shoes suitable for terrain 👟',
      'Adequate drinking water (at least 1.5L) 💧',
      'Sunscreen and headwear 🧢',
      'Light daypack for personal essentials 🎒'
    ] : [
      'حذاء مشي مريح ومناسب لطبيعة الأرض 👟',
      'ماء شرب كافٍ (1.5 لتر على الأقل) 💧',
      'واقي شمس وغطاء للرأس 🧢',
      'حقيبة خفيفة للأغراض الشخصية 🎒'
    ];
    const currentGear = (activeData.gearList && activeData.gearList.length > 0) ? activeData.gearList : defaultGear;

    if (packingList) {
      packingList.innerHTML = '';
      currentGear.forEach(itemText => {
        const label = document.createElement('label');
        label.className = 'packing-check-item';
        label.innerHTML = `
          <input type="checkbox" class="packing-checkbox">
          <span class="packing-check-box"></span>
          <span class="packing-check-text">${itemText}</span>
        `;
        packingList.appendChild(label);
      });

      if (packingProgressTag) {
        packingProgressTag.textContent = isEn ? `0/${currentGear.length} Ready` : `0/${currentGear.length} جاهز`;
      }

      const checkboxes = packingList.querySelectorAll('.packing-checkbox');
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          const total = checkboxes.length;
          const checked = packingList.querySelectorAll('.packing-checkbox:checked').length;
          if (packingProgressTag) {
            packingProgressTag.textContent = isEn ? `${checked}/${total} Ready` : `${checked}/${total} جاهز`;
            if (checked === total) {
              packingProgressTag.textContent = isEn ? 'Fully Packed! 🎒✅' : 'جاهز بالكامل! 🎒✅';
              AudioEngine.playChime();
              showMasarToast(isEn ? 'Great! All gear is packed 🥾' : 'ممتاز! تم تجهيز جميع مستلزمات المسار 🥾', '✅');
            } else {
              AudioEngine.playTap();
            }
          }
        });
      });
    }

    const trailTempVal = document.getElementById('trailTempVal');
    const trailSafetyTag = document.getElementById('trailSafetyTag');
    const trailWindVal = document.getElementById('trailWindVal');
    const trailFloodVal = document.getElementById('trailFloodVal');
    const trailSunsetVal = document.getElementById('trailSunsetVal');

    const defaultWeather = isEn ? {
      temp: '24° C',
      status: 'Safe for Hiking 🟢',
      wind: '12 km/h',
      flood: 'Very Low',
      sunset: '06:20 PM'
    } : {
      temp: '24° م',
      status: 'آمن للمسير 🟢',
      wind: '12 كم/س',
      flood: 'منخفض جداً',
      sunset: '06:20 م'
    };
    const weatherData = activeData.weather || defaultWeather;

    if (trailTempVal) trailTempVal.textContent = weatherData.temp;
    if (trailSafetyTag) {
      trailSafetyTag.textContent = weatherData.status;
      if (weatherData.status.includes('آمن') || weatherData.status.includes('صافية') || weatherData.status.includes('ممتاز') || weatherData.status.includes('هادئ')) {
        trailSafetyTag.className = 'trail-safety-tag safe';
      } else {
        trailSafetyTag.className = 'trail-safety-tag';
      }
    }
    if (trailWindVal) trailWindVal.textContent = weatherData.wind;
    if (trailFloodVal) trailFloodVal.textContent = weatherData.flood;
    if (trailSunsetVal) trailSunsetVal.textContent = weatherData.sunset;

    const expAudioStoryBadge = document.getElementById('expAudioStoryBadge');
    const expAudioDuration = document.getElementById('expAudioDuration');
    const audioHostLabel = document.getElementById('audioHostLabel');
    const audioWavesWrap = document.getElementById('audioWavesWrap');
    const audioPlayIcon = document.getElementById('audioPlayIcon');

    if (audioWavesWrap) audioWavesWrap.classList.remove('playing');
    if (audioPlayIcon) {
      audioPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }

    const audioData = data.audioStory || {
      title: 'حكاية المكان 🎧',
      host: 'بصوت الدليل المحلي',
      duration: '01:45'
    };

    if (expAudioStoryBadge) expAudioStoryBadge.textContent = audioData.title;
    if (expAudioDuration) expAudioDuration.textContent = audioData.duration;
    if (audioHostLabel) audioHostLabel.textContent = audioData.host;
  }

  window.openExperienceDetail = openExperienceDetail;

  let activeModalsCount = 0;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      activeModalsCount++;
      document.body.classList.add('modal-open');
      AudioEngine.playTap();
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      activeModalsCount = Math.max(0, activeModalsCount - 1);
      if (activeModalsCount === 0) {
        document.body.classList.remove('modal-open');
      }
    }
  }

  window.openMasarModal = openModal;
  window.closeMasarModal = closeModal;

  function renderExploreCards(filterCat = 'all', searchQuery = '') {
    const list = document.getElementById('exploreCardsList');
    if (!list) return;

    let filtered = EXPERIENCES_CATALOG;
    if (filterCat !== 'all') {
      filtered = filtered.filter(item => item.cat.includes(filterCat));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.loc.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q)
      );
    }

    list.innerHTML = '';
    if (filtered.length === 0) {
      list.innerHTML = '<p style="text-align:center; color:#6B665F; padding:20px;">لم يتم العثور على تجارب مطابقة لبحثك.</p>';
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'suggestion-card';
      card.innerHTML = `
        <div class="suggestion-img-wrap">
          <img src="${item.img}" alt="${item.title}" class="suggestion-img">
        </div>
        <div class="suggestion-content">
          <h3 class="suggestion-name">${item.title}</h3>
          <p class="suggestion-desc">${item.cat} • ${item.duration}</p>
          <div class="suggestion-meta">
            <span class="suggestion-tag">${item.price}</span>
            <span class="meta-separator"></span>
            <div class="suggestion-loc-group">
              <span class="suggestion-loc-text">📍 ${item.loc}</span>
            </div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        closeModal('exploreAllModal');
        openExperienceDetail(item);
      });
      list.appendChild(card);
    });
  }

  function getSavedTrips() {
    try {
      return JSON.parse(localStorage.getItem('masar_saved_trips') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveTripItem(item) {
    const trips = getSavedTrips();
    if (!trips.some(t => t.title === item.title)) {
      trips.push({ ...item, savedAt: new Date().toISOString() });
      localStorage.setItem('masar_saved_trips', JSON.stringify(trips));
    }
  }

  function renderSavedTrips() {
    const list = document.getElementById('savedTripsList');
    const empty = document.getElementById('savedTripsEmpty');
    if (!list || !empty) return;

    const trips = getSavedTrips();
    if (trips.length === 0) {
      list.innerHTML = '';
      empty.removeAttribute('hidden');
      return;
    }

    empty.setAttribute('hidden', '');
    list.innerHTML = '';
    trips.forEach((t, idx) => {
      const card = document.createElement('article');
      card.className = 'suggestion-card';
      card.innerHTML = `
        <div class="suggestion-img-wrap">
          <img src="${t.img || 'assets/images/wadi_mujib.png'}" alt="${t.title}" class="suggestion-img">
        </div>
        <div class="suggestion-content">
          <h3 class="suggestion-name">${t.title}</h3>
          <p class="suggestion-desc">${t.loc || 'الأردن'} • ${t.price || 'تذكرة'}</p>
          <button type="button" class="btn-bubble-speak" style="color:#D44A58; margin-top:4px;" data-remove-trip="${idx}">
            🗑️ إزالة من رحلتي
          </button>
        </div>
      `;
      card.querySelector('[data-remove-trip]').addEventListener('click', (e) => {
        e.stopPropagation();
        trips.splice(idx, 1);
        localStorage.setItem('masar_saved_trips', JSON.stringify(trips));
        renderSavedTrips();
        showMasarToast('تمت إزالة التجربة من رحلتك', '🗑️');
      });
      list.appendChild(card);
    });
  }

  function openBadgeDetailModal(badgeData) {
    if (!badgeData) return;
    const modalEmoji = document.getElementById('modalBadgeEmoji');
    const modalName = document.getElementById('modalBadgeName');
    const modalStatus = document.getElementById('modalBadgeStatus');
    const modalDesc = document.getElementById('modalBadgeDesc');
    const modalProgressLabel = document.getElementById('modalBadgeProgressLabel');
    const modalProgressPercent = document.getElementById('modalBadgeProgressPercent');
    const modalProgressBar = document.getElementById('modalBadgeProgressBar');
    const iconWrap = document.getElementById('modalBadgeIconWrap');

    if (modalEmoji) modalEmoji.textContent = badgeData.emoji;
    if (modalName) modalName.textContent = badgeData.name;
    if (modalStatus) modalStatus.textContent = badgeData.unlocked ? 'مفتوح 🎖️' : 'مغلق 🔒';
    if (modalDesc) modalDesc.textContent = badgeData.desc;
    if (modalProgressLabel) modalProgressLabel.textContent = badgeData.unlocked ? 'مكتمل' : 'قيد الإنجاز';
    if (modalProgressPercent) modalProgressPercent.textContent = badgeData.progress;
    if (modalProgressBar) modalProgressBar.style.width = badgeData.percent;
    if (iconWrap) {
      iconWrap.className = `badge-big-circle ${badgeData.unlocked ? 'pink-bg' : 'beige-bg'}`;
    }

    AudioEngine.playTap();
    openModal('badgeDetailModal');
  }

  function renderAllBadgesModal(filter = 'all') {
    const list = document.getElementById('allBadgesModalList');
    if (!list) return;
    list.innerHTML = '';

    const badges = Object.entries(BADGES_CATALOG);
    const filtered = badges.filter(([key, b]) => {
      if (filter === 'unlocked') return b.unlocked;
      if (filter === 'locked') return !b.unlocked;
      return true;
    });

    filtered.forEach(([key, b]) => {
      const card = document.createElement('div');
      card.className = `badge-item-card ${b.unlocked ? 'active' : 'locked'}`;
      card.setAttribute('data-badge-id', key);
      card.innerHTML = `
        <div class="badge-icon-circle ${b.unlocked ? 'pink-bg' : 'beige-bg'}">
          <span class="badge-emoji">${b.emoji}</span>
        </div>
        <span class="badge-item-name">${b.name}</span>
        <span style="font-size: 11px; font-weight: 700; color: ${b.unlocked ? '#85122D' : '#8E8A82'};">
          ${b.unlocked ? 'مفتوح 🎖️' : 'مغلق 🔒'}
        </span>
      `;
      card.addEventListener('click', () => {
        openBadgeDetailModal(b);
      });
      list.appendChild(card);
    });
  }

  function initHome() {

    document.querySelectorAll('.challenges-see-all').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.id === 'btnSeeAllBadges') {

          renderAllBadgesModal('all');
          openModal('allBadgesModal');
          AudioEngine.playTap();
          return;
        }

        const text = btn.textContent.trim();
        if (text === 'الأصدقاء' || text === 'الكل') {

          btn.textContent = (text === 'الأصدقاء') ? 'الكل' : 'الأصدقاء';
          showMasarToast(`تم التبديل إلى عرض: ${btn.textContent}`, '👥');
          AudioEngine.playTap();
        } else {
          renderExploreCards();
          openModal('exploreAllModal');
        }
      });
    });

    document.querySelectorAll('#allBadgesFilterRow .explore-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#allBadgesFilterRow .explore-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-badge-filter') || 'all';
        renderAllBadgesModal(filter);
        AudioEngine.playTap();
      });
    });

    document.querySelectorAll('#exploreCategoryPills .explore-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#exploreCategoryPills .explore-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-cat');
        const searchVal = document.getElementById('exploreSearchInput')?.value || '';
        renderExploreCards(cat, searchVal);
        AudioEngine.playTap();
      });
    });

    const searchInput = document.getElementById('exploreSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const activeCat = document.querySelector('#exploreCategoryPills .explore-pill.active')?.getAttribute('data-cat') || 'all';
        renderExploreCards(activeCat, searchInput.value);
      });
    }

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-close-modal');
        closeModal(target);
      });
    });

    document.querySelectorAll('.masar-modal-backdrop').forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) closeModal(bd.id);
      });
    });

    const challengeCards = document.querySelectorAll('.challenge-card, .rewards-challenge-card');
    challengeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-log-step')) return;
        const name = card.querySelector('.challenge-name')?.textContent || '';
        let matched = EXPERIENCES_CATALOG.find(x => name.includes(x.loc) || x.title.includes(name)) || EXPERIENCES_CATALOG[0];
        if (name.includes('شراك')) matched = EXPERIENCES_CATALOG.find(x => x.id === 'shrak_bread');
        if (name.includes('هيدان')) matched = EXPERIENCES_CATALOG.find(x => x.id === 'wadi_hidan');
        openExperienceDetail(matched);
      });
    });

    const suggestionCards = document.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.suggestion-name')?.textContent || '';
        let matched = EXPERIENCES_CATALOG[0];
        if (name.includes('القلعة')) matched = EXPERIENCES_CATALOG.find(x => x.id === 'citadel_sunset');
        else if (name.includes('السلط')) matched = EXPERIENCES_CATALOG.find(x => x.id === 'salt_alleys');
        else if (name.includes('قهوة')) matched = EXPERIENCES_CATALOG.find(x => x.id === 'arabic_coffee');
        openExperienceDetail(matched);
      });
    });

    const expCards = document.querySelectorAll('.experience-card');
    expCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (idx === 0) openExperienceDetail(EXPERIENCES_CATALOG.find(x => x.id === 'wadi_mujib'));
        else if (idx === 1) openExperienceDetail(EXPERIENCES_CATALOG.find(x => x.id === 'salt_cooking'));
        else if (idx === 2) openExperienceDetail(EXPERIENCES_CATALOG.find(x => x.id === 'rum_stargazing'));
      });
    });

    const badgeItems = document.querySelectorAll('.badge-item-card');
    badgeItems.forEach(item => {
      item.addEventListener('click', () => {
        const badgeId = item.getAttribute('data-badge-id');
        const name = item.querySelector('.badge-item-name')?.textContent.trim();
        let badgeData = (badgeId && BADGES_CATALOG[badgeId]) || Object.values(BADGES_CATALOG).find(b => b.name === name) || BADGES_CATALOG['first_hike'];
        openBadgeDetailModal(badgeData);
      });
    });

    const btnClaimBadge = document.getElementById('btnClaimBadgeReward');
    if (btnClaimBadge) {
      btnClaimBadge.addEventListener('click', () => {
        closeModal('badgeDetailModal');
      });
    }

    const logStepButtons = document.querySelectorAll('.btn-log-step');
    logStepButtons.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.rewards-challenge-card');
        if (!card) return;

        const fillBar = card.querySelector('.rewards-progress-bar-fill');
        const percentText = card.querySelector('.rewards-progress-percent');
        const stepsText = card.querySelector('.rewards-progress-steps');

        AudioEngine.playChime();

        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        if (idx === 0) {
          if (fillBar) fillBar.style.width = '100%';
          if (percentText) percentText.textContent = '100%';
          if (stepsText) stepsText.textContent = isEn ? '3 / 3 steps complete!' : '3 / 3 خطوات مكتملة!';
          btn.textContent = isEn ? '✅ Challenge Completed (+25 pts)' : '✅ تم إكمال التحدي (+25 نقطة)';
          btn.style.backgroundColor = '#424628';
          btn.disabled = true;
          addPoints(25);
          spawnSparkleBadge(isEn ? '+25 pts ⭐' : '+25 نقطة ⭐', btn);
          showMasarToast(isEn ? 'Congrats! Shrak bread challenge completed 🎉' : 'مبروك! أكملت تحدي خبز الشراك بنجاح 🎉', '🎖️');
        } else if (idx === 1) {
          if (fillBar) fillBar.style.width = '50%';
          if (percentText) percentText.textContent = '50%';
          if (stepsText) stepsText.textContent = isEn ? '2 / 4 steps' : '2 / 4 خطوات';
          btn.textContent = isEn ? '✅ Step Logged (+10 pts)' : '✅ تم تسجيل الخطوة (+10 نقاط)';
          btn.style.backgroundColor = '#424628';
          addPoints(10);
          spawnSparkleBadge(isEn ? '+10 pts ⭐' : '+10 نقطة ⭐', btn);
          showMasarToast(isEn ? 'Great! Another step on the Wadi Al-Heydan trail 🌊' : 'أحسنت! خطوة إضافية بمسير وادي الهيدان 🌊', '🌊');
          setTimeout(() => {
            btn.textContent = isEn ? 'Log Step' : 'سجّل خطوة';
            btn.style.backgroundColor = '#85122D';
          }, 2000);
        }
      });
    });

    const btnExpBack = document.getElementById('btnExpDetailBack');
    if (btnExpBack) {
      btnExpBack.addEventListener('click', () => {
        openHomeScreen();
      });
    }

    const btnAddToTrip = document.getElementById('btnAddToTrip');
    if (btnAddToTrip) {
      btnAddToTrip.addEventListener('click', async () => {
        const title = document.getElementById('expDetailTitle')?.textContent || 'تجربة أردنية';
        const loc = document.getElementById('expDetailLocation')?.textContent || 'الأردن';
        const price = document.getElementById('expDetailPrice')?.textContent || '';
        const img = document.getElementById('expDetailHeroImg')?.src || '';

        saveTripItem({ title, loc, price, img });
        AudioEngine.playChime();
        spawnSparkleBadge('تمت الإضافة! 🎒', btnAddToTrip);
        showMasarToast(`تم حفظ "${title}" في رحلتك بنجاح!`, '🎒');

        btnAddToTrip.disabled = true;
        btnAddToTrip.textContent = '✅ تم الحفظ في رحلتك!';
        btnAddToTrip.style.backgroundColor = '#424628';

        setTimeout(() => {
          btnAddToTrip.disabled = false;
          btnAddToTrip.textContent = 'أضف إلى رحلتي';
          btnAddToTrip.style.backgroundColor = '#85122D';
        }, 2200);
      });
    }

    const JORDAN_MAP_DATA = {
      'salt': {
        title: 'مدينة السلط والبيوت التراثية 🏡',
        region: 'إقليم الوسط',
        dist: 'تبعد ٣٠ كم من موقعك',
        desc: 'استكشف شارع الحمام والأزقة القديمة وتجربة الطبخ التراثي مع أم محمد.',
        img: 'assets/images/salt_alleys.jpg',
        expId: 'salt_cooking'
      },
      'amman': {
        title: 'جبل القلعة والمدرج الروماني 🌅',
        region: 'إقليم الوسط',
        dist: 'في قلب العاصمة عمّان',
        desc: 'إطلالة الغروب الهادئة وتاريخ الحضارات المتعاقبة على جبال عمّان السبعة.',
        img: 'assets/images/citadel_sunset.jpg',
        expId: 'citadel_sunset'
      },
      'madaba': {
        title: 'مادبا وحرفة الفسيفساء البيزنطية 🎨',
        region: 'إقليم الوسط',
        dist: 'تبعد ٣٣ كم من موقعك',
        desc: 'خريطة مأدبا الفسيفسائية الأقدم ومسير وادي الهيدان الساحر.',
        img: 'assets/images/madaba_mosaic.jpg',
        expId: 'madaba_mosaic'
      },
      'mujib': {
        title: 'مغامرة السيق المائي في وادي الموجب 🧗',
        region: 'إقليم الوسط',
        dist: 'تبعد ٨٠ كم من موقعك',
        desc: 'مسار السيق المائي الممتع وشلالات الموجب الطبيعية بجانب البحر الميت.',
        img: 'assets/images/wadi_mujib.png',
        expId: 'wadi_mujib'
      },
      'karak': {
        title: 'واحة وادي بن حماد المعلقة 🌿',
        region: 'إقليم الجنوب',
        dist: 'تبعد ١٢٠ كم من موقعك',
        desc: 'واحة النخيل المعلق والمياه الكبريتية الدافئة والممر الصخري الملون.',
        img: 'assets/images/wadi_bin_hammad.jpg',
        expId: 'wadi_bin_hammad'
      },
      'petra': {
        title: 'درب السيق البارد والديْر الخفي 🏺',
        region: 'إقليم الجنوب',
        dist: 'تبعد ٢٣٠ كم من موقعك',
        desc: 'إحدى عجائب الدنيا السبع والمسار البديل الساحر للمدينة الوردية.',
        img: 'assets/images/little_petra.jpg',
        expId: 'little_petra'
      },
      'rum': {
        title: 'ليلة النجوم والتخييم في وادي رم ⛺',
        region: 'إقليم الجنوب',
        dist: 'تبعد ٣٠٠ كم من موقعك',
        desc: 'رمال وادي القمر الحمراء، عشاء الزرب البدوي، وتأمل مجرة درب التبانة.',
        img: 'assets/images/rum_night.png',
        expId: 'rum_stargazing'
      },
      'aqaba': {
        title: 'غوص حطام الطائرة والمرجان في العقبة 🤿',
        region: 'إقليم الجنوب',
        dist: 'تبعد ٣٣٠ كم من موقعك',
        desc: 'أعماق خليج العقبة ومشاهدة الطائرة العسكرية الغارقة وأسراب الأسماك الملونة.',
        img: 'assets/images/aqaba_dive.jpg',
        expId: 'aqaba_dive'
      },
      'jerash': {
        title: 'مدينة جرش الأثرية وغابات عجلون 🌲',
        region: 'إقليم الشمال',
        dist: 'تبعد ٤٨ كم من موقعك',
        desc: 'أكبر مدينة رومانية محفوظة في العالم ومسار قمم أشجار غابات عجلون.',
        img: 'assets/images/citadel_sunset.jpg',
        expId: 'citadel_sunset'
      }
    };

    let currentSelectedPin = 'salt';

    const btnOpenMap = document.getElementById('btnOpenJordanMap');
    if (btnOpenMap) {
      btnOpenMap.addEventListener('click', () => {
        openModal('jordanMapModal');
        AudioEngine.playTap();
      });
    }

    const mapPinButtons = document.querySelectorAll('.map-pin-btn');
    mapPinButtons.forEach(pin => {
      pin.addEventListener('click', () => {
        mapPinButtons.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');
        const pinId = pin.getAttribute('data-pin-id') || 'salt';
        currentSelectedPin = pinId;
        const data = JORDAN_MAP_DATA[pinId] || JORDAN_MAP_DATA['salt'];

        const imgEl = document.getElementById('mapPreviewImg');
        const titleEl = document.getElementById('mapPreviewTitle');
        const descEl = document.getElementById('mapPreviewDesc');
        const regionEl = document.getElementById('mapPreviewRegion');
        const distEl = document.getElementById('mapPreviewDistance');

        if (imgEl) imgEl.src = data.img;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (regionEl) regionEl.textContent = data.region;
        if (distEl) distEl.textContent = data.dist;

        AudioEngine.playTap();
      });
    });

    const btnMapOpenDetail = document.getElementById('btnMapPreviewOpenDetail');
    if (btnMapOpenDetail) {
      btnMapOpenDetail.addEventListener('click', () => {
        closeModal('jordanMapModal');
        const data = JORDAN_MAP_DATA[currentSelectedPin] || JORDAN_MAP_DATA['salt'];
        const matched = EXPERIENCES_CATALOG.find(x => x.id === data.expId) || EXPERIENCES_CATALOG[0];
        openExperienceDetail(matched);
      });
    }

    const mapRegionPills = document.querySelectorAll('#mapRegionPills .explore-pill');
    mapRegionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        mapRegionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const region = pill.getAttribute('data-region') || 'all';

        mapPinButtons.forEach(pin => {
          const pinRegion = pin.getAttribute('data-region');
          if (region === 'all' || pinRegion === region) {
            pin.style.display = 'flex';
          } else {
            pin.style.display = 'none';
          }
        });
        AudioEngine.playTap();
      });
    });

    const btnOpenPlanner = document.getElementById('btnOpenTripPlanner');
    if (btnOpenPlanner) {
      btnOpenPlanner.addEventListener('click', () => {
        openModal('tripPlannerModal');
        AudioEngine.playTap();
      });
    }

    const plannerPills = document.querySelectorAll('.planner-pill');
    plannerPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const parent = pill.parentElement;
        if (parent) {
          parent.querySelectorAll('.planner-pill').forEach(p => p.classList.remove('active'));
        }
        pill.classList.add('active');
        AudioEngine.playTap();
      });
    });

    const btnGenerateTrip = document.getElementById('btnGenerateTripPlan');
    if (btnGenerateTrip) {
      btnGenerateTrip.addEventListener('click', () => {
        const activeDuration = document.querySelector('#plannerDurationOptions .planner-pill.active')?.getAttribute('data-duration') || '1';
        const activeStyle = document.querySelector('#plannerStyleOptions .planner-pill.active')?.getAttribute('data-style') || 'adventure';
        const activeBudget = document.querySelector('#plannerBudgetOptions .planner-pill.active')?.getAttribute('data-budget') || 'economic';

        const titleEl = document.getElementById('plannerPlanTitle');
        const descEl = document.getElementById('plannerPlanDesc');
        const costEl = document.getElementById('plannerEstCost');
        const listEl = document.getElementById('plannerStepsList');

        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        let costText = isEn ? '25 JOD (Budget)' : '25 د.أ (اقتصادية)';
        if (activeBudget === 'medium') costText = isEn ? '45 JOD (Standard)' : '45 د.أ (متوسطة)';
        if (activeBudget === 'vip') costText = isEn ? '85 JOD (Premium)' : '85 د.أ (فاخرة)';
        if (costEl) costEl.textContent = isEn ? `Estimated Cost: ${costText}` : `التكلفة التقديرية: ${costText}`;

        let planTitle = isEn ? 'Custom Jordan Discovery Itinerary' : 'خطة استكشاف الأردن المخصصة';
        let planDesc = isEn ? 'Harmonious schedule designed to give you the best local experience and maximum points.' : 'جدول متناسق مصمم ليمنحك أفضل تجربة مع السكان المحليين وأعلى نقاط ممكنة.';
        let stops = [];

        if (activeStyle === 'adventure') {
          const daysStr = isEn ? (activeDuration === '1' ? '1 Day' : `${activeDuration} Days`) : (activeDuration === '1' ? 'يوم واحد' : `${activeDuration} أيام`);
          planTitle = isEn ? `Nature & Canyons Adventure (${daysStr}) 🧗` : `مغامرة الطبيعة والوديان الساحرة (${daysStr}) 🧗`;
          planDesc = isEn ? 'An exciting trail combining freshwater canyon trekking, rock scaling, and lush hanging oases.' : 'مسار مشوق يجمع بين خوض السيول المائية، تسلق الصخور، وتأمل الواحات المعلقة.';
          stops = isEn ? [
            { time: '08:30 AM', title: 'Depart to Wadi Mujib Canyon', sub: 'Equip water shoes and enter the refreshing water canyon.' },
            { time: '12:30 PM', title: 'Traditional Lunch & Local Tomato Galayet', sub: 'Rest and enjoy authentic meal by the coast.' },
            { time: '03:00 PM', title: 'Wadi Al-Heydan Trail in Madaba', sub: 'Swim in natural volcanic pools and capture scenic photos.' },
            { time: '06:30 PM', title: 'Sunset Campfire & Bedouin Tea', sub: 'Relax, discuss trail highlights and log steps.' }
          ] : [
            { time: '08:30 ص', title: 'الانطلاق نحو وادي الموجب', sub: 'تجهيز الأحذية المائية ودخول السيق المائي المنعش.' },
            { time: '12:30 م', title: 'غداء بلدي وتذوق قلاية البندورة', sub: 'استراحة وتناول وجبة بلدية عند استراحة الساحل.' },
            { time: '03:00 م', title: 'مسير وادي الهيدان بمادبا', sub: 'سباحة في البرك الطبيعية وتوثيق صور رائعة للمسار.' },
            { time: '06:30 م', title: 'جلسة شاي على الحطب وقت الغروب', sub: 'استرخاء ونقاش حول تفاصيل المسار وتسجيل الخطوات.' }
          ];
        } else if (activeStyle === 'culture') {
          const daysStr = isEn ? (activeDuration === '1' ? '1 Day' : `${activeDuration} Days`) : (activeDuration === '1' ? 'يوم واحد' : `${activeDuration} أيام`);
          planTitle = isEn ? `Heritage & Authentic Jordan Tour (${daysStr}) 🏰` : `جولة التراث والأصالة الأردنية (${daysStr}) 🏰`;
          planDesc = isEn ? 'A journey through historic alleys, yellow stone architecture, and northern castles.' : 'رحلة عبر أزقة التاريخ، البيوت العتيقة، وقلاع الشمال الشامخة.';
          stops = isEn ? [
            { time: '09:00 AM', title: 'Hammam Street & As-Salt Yellow Houses', sub: 'Walking tour with local guide exploring heritage architecture.' },
            { time: '12:00 PM', title: 'Madaba Stone Mosaic Workshop', sub: 'Hands-on stone crafting experience and custom souvenir making.' },
            { time: '04:00 PM', title: 'Sunset at Amman Citadel', sub: 'Panoramic capital views and Roman Theatre photography.' }
          ] : [
            { time: '09:00 ص', title: 'زيارة شارع الحمام والبيوت الصفراء بالسلط', sub: 'جولة مشي مع الدليل المحلي واستكشاف التراث المعماري.' },
            { time: '12:00 م', title: 'ورشة صناعة الفسيفساء في مادبا', sub: 'تجربة حية لتركيب الأحجار وصنع تذكار يدوي.' },
            { time: '04:00 م', title: 'غروب الشمس من جبل القلعة بعمان', sub: 'إطلالة بانورامية وتصوير المدرج الروماني.' }
          ];
        } else if (activeStyle === 'food') {
          planTitle = isEn ? `Authentic Jordanian Cuisine & Gastronomy 🍽️` : `مسار الذواقة والمطبخ الأردني الأصيل 🍽️`;
          planDesc = isEn ? 'Delicious heritage dishes from fresh Shrak bread to Karak Mansaf and Arabic coffee.' : 'أشهى الأطباق التراثية من الشراك الطازج والمنسف البلدي والقهوة السادة.';
          stops = isEn ? [
            { time: '09:30 AM', title: 'Fresh Shrak Bread with Um Mohammed', sub: 'Bake together and enjoy farm-fresh ghee and labneh.' },
            { time: '01:30 PM', title: 'Traditional Karak Mansaf Cooking Experience', sub: 'Learn the secrets of Jameed and local lamb with local host.' },
            { time: '05:00 PM', title: 'Arabic Coffee Gathering on Rainbow Street', sub: 'The story of cardamom beans and Jordanian hospitality.' }
          ] : [
            { time: '09:30 ص', title: 'خبز الشراك الطازج مع أم محمد', sub: 'مشاركة إعداد الخبز وتناول إفطار بلدي بالسمن واللبنة.' },
            { time: '01:30 م', title: 'تجربة طهي المنسف الكركي الأصيل', sub: 'تعلم أسرار الجميد واللحم البلدي مع مضيف محلي.' },
            { time: '05:00 م', title: 'فنجان قهوة عربية وضيافة شارع الرينبو', sub: 'حكاية البن والهيل والضيافة الأردنية.' }
          ];
        } else {
          planTitle = isEn ? `Southern Charm, Sea & Relaxation 🌊` : `استجمام وبحر وسحر الجنوب 🌊`;
          planDesc = isEn ? 'Float in Dead Sea mineral waters, dive the Red Sea reefs, and stargaze in Wadi Rum.' : 'استرخاء في مياه البحر الميت والغوص في خليج العقبة وتأمل نجوم رم.';
          stops = isEn ? [
            { time: '10:00 AM', title: 'Aqaba Coral Reef & Airplane Wreck Diving', sub: 'Explore vivid marine life with a certified dive guide.' },
            { time: '04:30 PM', title: 'Depart to Wadi Rum for Bedouin Gathering', sub: 'Underground Zarb dinner and stargazing under desert skies.' }
          ] : [
            { time: '10:00 ص', title: 'غوص حطام الطائرة وشعاب العقبة المرجانية', sub: 'استكشاف الحياة البحرية الخلابة مع مرشد غوص محترف.' },
            { time: '04:30 م', title: 'الانطلاق لرم وحضور جلسة سمر بدوية', sub: 'عشاء زرب تحت الأرض وتأمل النجوم الساطعة.' }
          ];
        }

        if (titleEl) titleEl.textContent = planTitle;
        if (descEl) descEl.textContent = planDesc;

        if (listEl) {
          listEl.innerHTML = '';
          stops.forEach(st => {
            const row = document.createElement('div');
            row.className = 'planner-step-row';
            row.innerHTML = `
              <span class="planner-time-badge">${st.time}</span>
              <div class="planner-step-body">
                <h4 class="planner-step-title">${st.title}</h4>
                <p class="planner-step-sub">${st.sub}</p>
              </div>
            `;
            listEl.appendChild(row);
          });
        }

        AudioEngine.playChime();
        showMasarToast(isEn ? 'Your custom itinerary is ready! 🎒' : 'تم تجهيز خطة رحلتك بنجاح! 🎒', '🎒');
      });
    }

    const btnSavePlan = document.getElementById('btnSaveGeneratedTrip');
    if (btnSavePlan) {
      btnSavePlan.addEventListener('click', () => {
        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        const title = document.getElementById('plannerPlanTitle')?.textContent || (isEn ? 'Masar Trip Plan' : 'خطة رحلة مسار');
        saveTripItem({
          title,
          loc: isEn ? 'Jordan - Custom Plan' : 'الأردن - خطة مخصصة',
          price: isEn ? 'Full Itinerary' : 'خطة متكاملة',
          img: 'assets/images/wadi_bin_hammad.jpg'
        });
        spawnSparkleBadge(isEn ? 'Saved! 🎒' : 'تم الحفظ! 🎒', btnSavePlan);
        showMasarToast(isEn ? 'Trip plan saved to your saved routes (+15 pts) 🎉' : 'تم حفظ خطة الرحلة في مساراتك المحفوظة (+15 نقطة) 🎉', '🎒');
        closeModal('tripPlannerModal');
      });
    }

    const btnSharePlan = document.getElementById('btnShareTripPlan');
    if (btnSharePlan) {
      btnSharePlan.addEventListener('click', () => {
        const _isEn = window.MasarI18n && window.MasarI18n.isEn();
        showMasarToast(_isEn ? 'Plan link copied to share with friends 📲' : 'تم نسخ رابط الخطة لمشاركتها مع أصدقائك 📲', '🔗');
        AudioEngine.playTap();
      });
    }

    const redeemButtons = document.querySelectorAll('.btn-redeem-voucher');
    redeemButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cost = parseInt(btn.getAttribute('data-cost') || '100', 10);
        const isEn = window.MasarI18n && window.MasarI18n.isEn();
        const title = btn.getAttribute('data-title') || (isEn ? 'Discount Voucher' : 'كوبون خصم');
        const code = btn.getAttribute('data-code') || 'MASAR-JORDAN-2026';

        const success = spendPoints(cost);
        if (!success) {
          showMasarToast(isEn ? `Sorry, not enough points! You need ${cost} points to redeem this voucher.` : `عذراً، نقاطك لا تكفي! تحتاج ${cost} نقطة لاستبدال هذا الكوبون.`, '⚠️');
          AudioEngine.playTap();
          return;
        }

        const vTitle = document.getElementById('voucherModalTitle');
        const vCode = document.getElementById('voucherModalCode');
        if (vTitle) vTitle.textContent = title;
        if (vCode) vCode.textContent = code;

        AudioEngine.playChime();
        spawnSparkleBadge(isEn ? `-${cost} pts ⭐` : `-${cost} نقطة ⭐`, btn);
        openModal('voucherSuccessModal');
      });
    });

    const btnCopyVoucher = document.getElementById('btnCopyVoucherCode');
    if (btnCopyVoucher) {
      btnCopyVoucher.addEventListener('click', () => {
        const code = document.getElementById('voucherModalCode')?.textContent || 'MASAR-JORDAN-2026';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).catch(() => {});
        }
        const isEn2 = window.MasarI18n && window.MasarI18n.isEn();
        showMasarToast(isEn2 ? `Code copied: ${code} 📋` : `تم نسخ الرمز: ${code} بنجاح! 📋`, '✅');
        AudioEngine.playTap();
      });
    }

    const btnOpenCommunity = document.getElementById('btnOpenCommunityFeed');
    if (btnOpenCommunity) {
      btnOpenCommunity.addEventListener('click', () => {
        openModal('communityFeedModal');
        AudioEngine.playTap();
      });
    }

    const likeButtons = document.querySelectorAll('.btn-community-like');
    likeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const countEl = btn.querySelector('.like-count');
        let current = parseInt(btn.getAttribute('data-likes') || '50', 10);
        const isLiked = btn.classList.contains('liked');

        if (isLiked) {
          btn.classList.remove('liked');
          current--;
          btn.setAttribute('data-likes', current);
          if (countEl) countEl.textContent = current;
        } else {
          btn.classList.add('liked');
          current++;
          btn.setAttribute('data-likes', current);
          if (countEl) countEl.textContent = current;
          AudioEngine.playChime();
          spawnSparkleBadge('❤️ +1', btn);
        }
      });
    });

    const btnChallengePhoto = document.getElementById('btnUploadChallengePhoto');
    if (btnChallengePhoto) {
      btnChallengePhoto.addEventListener('click', () => {
        const isEn3 = window.MasarI18n && window.MasarI18n.isEn();
        showMasarToast(isEn3 ? 'Your Wadi Rum challenge photo submitted! (+15 pts) 🌅📸' : 'تم إرسال صورتك لتحدي وادي رم بنجاح (+15 نقطة) 🌅📸', '🏆');
        AudioEngine.playChime();
        spawnSparkleBadge(isEn3 ? '+15 pts ⭐' : '+15 نقطة ⭐', btnChallengePhoto);
      });
    }

    let isAudioPlaying = false;
    const btnAudioPlay = document.getElementById('btnAudioPlay');
    const audioWavesWrap = document.getElementById('audioWavesWrap');

    if (btnAudioPlay && audioWavesWrap) {
      btnAudioPlay.addEventListener('click', () => {
        isAudioPlaying = !isAudioPlaying;
        if (isAudioPlaying) {
          audioWavesWrap.classList.add('playing');
          btnAudioPlay.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          `;
          AudioEngine.playChime();
          showMasarToast('جاري تشغيل حكاية المكان بصوت الدليل المحلي 🎧', '🔊');
        } else {
          audioWavesWrap.classList.remove('playing');
          btnAudioPlay.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          `;
          AudioEngine.playTap();
        }
      });
    }

    document.querySelectorAll('#navItemHome, #navItemHome2, #navItemHome3').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); AudioEngine.playTap(); openHomeScreen(); });
    });
    document.querySelectorAll('#navItemRewards, #navItemRewards3').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); AudioEngine.playTap(); openRewardsScreen(); });
    });
    document.querySelectorAll('#navItemMap, #navItemMap2').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); AudioEngine.playTap(); openAssistantScreen(); });
    });
    document.querySelectorAll('#navItemProfile, #navItemProfile2, #navItemProfile3').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); AudioEngine.playTap(); openSettingsScreen(); });
    });

    const urlParams = new URLSearchParams(window.location.search);
    let screen = urlParams.get('screen');
    if (!screen) {
      const saved = localStorage.getItem('masar_active_screen');
      if (saved && saved !== 'splash') screen = saved;
    }
    if (screen === 'home') openHomeScreen();
    else if (screen === 'rewards' || screen === 'awards') openRewardsScreen();
    else if (screen === 'assistant' || screen === 'map') openAssistantScreen();
    else if (screen === 'settings') openSettingsScreen();
    else if (screen === 'experience' || screen === 'experienceDetail') {
      const expId = urlParams.get('id') || localStorage.getItem('masar_active_exp_id') || 'wadi_mujib';
      const found = EXPERIENCES_CATALOG.find(x => x.id === expId) || EXPERIENCES_CATALOG[0];
      if (found) openExperienceDetail(found);
      else openHomeScreen();
    }
    try {
      const existingPts = localStorage.getItem('masar_user_points');
      if (!existingPts || parseInt(existingPts, 10) < 10000) {
        localStorage.setItem('masar_user_points', '10000');
        localStorage.setItem('masar_user_leaderboard_points', '10000');
      }
    } catch (e) {}

    applyDynamicUserName();

    window.addEventListener('masar:languageChanged', () => {
      applyDynamicUserName();
      applyDynamicPoints();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
  } else {
    initHome();
  }
})();
