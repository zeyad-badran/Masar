(function() {
  'use strict';

  const translations = {
    ar: {

      app_name: 'مسار',
      app_slogan: 'دليلك السياحي الذكي في الأردن',
      points_unit: 'نقطة',
      points_earned: 'نقطة مكتسبة ⭐',
      streak_weeks: 'اسابيع متتالية',
      see_all: 'عرض الكل',
      save_changes: 'حفظ التعديلات',
      cancel: 'إلغاء',
      close: 'إغلاق',
      back: 'رجوع',
      free: 'مجاناً',
      done_thanks: 'تم، شكراً',
      copied: 'تم النسخ بنجاح!',
      saved: 'تم الحفظ بنجاح!',
      points_badge: '25 نقطة',
      discover_exp: 'اكتشف التجربة',

      onboarding_title_1: 'اكتشف خبايا الأردن',
      onboarding_desc_1: 'مسارات وتجارب محلية أصيلة تأخذك إلى قلب الطبيعة والتاريخ الأردني.',
      onboarding_title_2: 'اكسب نقاط ومكافآت',
      onboarding_desc_2: 'سجل خطواتك وأكمل التحديات الأسبوعية لتحصل على جوائز وخصومات حقيقية.',
      onboarding_title_3: 'رفيقك الذكي في كل خطوة',
      onboarding_desc_3: 'المساعد راشد يجيب عن كل تساؤلاتك ويخطط لرحلتك بذكاء ودقة.',
      btn_start: 'ابدأ الآن',
      btn_next: 'التالي',
      btn_skip: 'تخطي',

      slide_1_title: 'اكتشف الأردن',
      slide_1_desc: 'أماكن مخفية، قصص ما سمعت عنها،\nوتجارب بعيدة عن الطرق المعتادة.',
      slide_2_title: 'أماكن مخفية',
      slide_2_desc: 'تعرّف على أهل الأردن، جرّب ثقافتهم،\nوعيش لحظات حقيقية من قلب المكان.',
      slide_3_title: 'مسارك بانتظارك !',
      slide_3_desc: 'اكتشف، عيش\nاجمع ذكرياتك.',
      onboarding_btn: 'ابدأ',

      profile_skip: 'تخطي',
      profile_q1: 'حيّاك! أنا <span class="text-burgundy">راشد</span> رفيقك بمسارك. شو بتحب أناديك؟',
      profile_input_placeholder: 'اسمك الأول أو كنيتك',
      profile_q2: 'عاشت الأسامي! عشان أعطيك مسارك<br>المناسب، بحتاج أعرف فئتك العمرية؟',
      profile_age_subtitle: 'اختر فئتك العمرية',
      profile_age_under18: 'أقل من 18',
      profile_q3: 'شو بتحب تكتشف بالاردن؟',
      profile_interest_1: 'القصص والتاريخ',
      profile_interest_2: 'الطبيعة',
      profile_interest_3: 'الأكل',
      profile_interest_4: 'المغامرات',
      profile_interest_5: 'الفن والحرف اليدوية',
      profile_interest_6: 'تجربة العيش مثل اهل المكان',
      profile_q4_budget: 'هل لديك ميزانية محددة؟',
      profile_budget_1: 'مسار اقتصادي',
      profile_budget_2: 'مسار متوازن',
      profile_budget_3: 'لا يهمني',
      profile_q4_companion: 'مين رفيقك بالمسار؟',
      profile_companion_1: 'العائلة',
      profile_companion_2: 'الأصدقاء',
      profile_companion_3: 'لا أحد',
      profile_btn_next: 'التالي',
      profile_btn_prev: 'السابق',
      profile_btn_login: 'تسجيل الدخول',
      profile_btn_start: 'ابدأ الآن',

      login_title: 'تسجيل الدخول',
      login_email_placeholder: 'البريد الالكتروني',
      login_password_placeholder: 'كلمة السر',
      login_terms_text: 'انا اوافق على',
      login_terms_link: 'التعليمات والشروط',
      login_submit: 'تسجيل الدخول',
      login_no_account: 'ليس لديك حساب؟',
      login_create_account: 'إنشاء حساب جديد',
      login_guest: 'أو الاستمرار كزائر',
      login_divider: 'Or continue with',

      register_title: 'إنشاء حساب جديد',
      register_subtitle: 'انضم إلى مجتمع مسار واستكشف أجمل تجارب الأردن',
      register_name_placeholder: 'الاسم الكامل',
      register_email_placeholder: 'البريد الالكتروني',
      register_password_placeholder: 'كلمة السر',
      register_submit: 'إنشاء الحساب',
      register_has_account: 'لديك حساب بالفعل؟',
      register_login: 'تسجيل الدخول',

      greeting_prefix: 'مرحبا',
      greeting_sub: 'مسارك صار جاهز، بتحب نكمل ولا نغيره؟',

      map_title: 'خريطة الأردن',
      map_sub: 'استكشف المسارات جغرافياً',
      planner_title: 'مخطط الرحلات',
      planner_sub: 'جدول مسار مخصص لرحلتك',
      community_title: 'مجتمع مسار',
      community_sub: 'تحديات ولحظات المستكشفين',

      weekly_challenges_title: 'تحديات الأسبوع',
      suggestions_title: 'اقتراحات لك',
      suggestions_sub: 'تجارب تناسب ذوقك',
      featured_experiences_title: 'تجارب مميزة',

      challenge_1_name: 'خبز الشراك مع أم محمد',
      challenge_1_loc: 'السلط',
      challenge_2_name: 'مسير وادي الهيدان',
      challenge_2_loc: 'مادبا',

      shrak_title: 'خبز الشراك مع أم محمد',
      shrak_loc: 'السلط • 4.9 ★',
      shrak_steps: '3 / 2 خطوات',
      log_step: 'سجّل خطوة',
      step_logged: '✅ تم تسجيل الخطوة (+10 نقاط)',
      challenge_completed: '✅ تم إكمال التحدي (+25 نقطة)',

      heydan_title: 'مسير وادي الهيدان',
      heydan_loc: 'مادبا • 4.8 ★',
      heydan_steps: '4 / 1 خطوات',

      citadel_title: 'غروب من جبل القلعة',
      citadel_desc: 'استمتع بإطلالة هادئة على عمّان وقت الغروب.',
      citadel_tag: 'طبيعة • تصوير',
      citadel_loc: 'عمّان',

      salt_title: 'اكتشف حكايات السلط',
      salt_desc: 'جولة قصيرة بين البيوت القديمة والأزقة التاريخية.',
      salt_tag: 'تاريخ • ثقافة',
      salt_loc: 'السلط',

      coffee_title: 'قهوة على طريقة أهل الأردن',
      coffee_desc: 'تعرّف على العادات المحلية واستمتع بجلسة قهوة أصيلة.',
      coffee_tag: 'طعام • تجربة محلية',
      coffee_loc: 'عمّان',

      exp_1_title: 'مغامرة في وادي الموجب',
      exp_1_desc: 'استكشف الوديان والمياه والمناظر الطبيعية في واحدة من أجمل مغامرات الأردن.',
      exp_1_tag: 'طبيعة • مغامرة 🌿',
      exp_1_loc: 'وادي الموجب',
      exp_2_title: 'تعلّم الطبخ الأردني مع أهل السلط',
      exp_2_desc: 'تعلّم وصفة أردنية تقليدية وشارك أهل المكان وجبة من قلب البيت.',
      exp_2_tag: 'طعام • تجربة محلية 🍽️',
      exp_2_loc: 'السلط',
      exp_3_title: 'ليلة تحت نجوم وادي رم',
      exp_3_desc: 'عش ليلة بين الصحراء والنجوم، وتعرّف على قصص أهل البادية.',
      exp_3_tag: 'ثقافة • مغامرة ⛺',
      exp_3_loc: 'وادي رم',

      nav_home: 'الرئيسية',
      nav_rewards: 'الجوائز',
      nav_assistant: 'دليل مسار',
      nav_profile: 'الملف الشخصي',

      rewards_points_title: 'رصيد النقاط',
      rewards_market_title: 'سوق المكافآت',
      rewards_market_sub: 'استبدل نقاطك بخصومات وتجارب أردنية حقيقية',
      rewards_balance_prefix: 'رصيدك:',
      redeem_now: 'استبدل الآن',
      badges_section_title: 'أوسمة الإنجاز',
      leaderboard_title: 'لوحة المتصدرين',
      leaderboard_this_week: 'هذا الأسبوع',
      leaderboard_friends: 'الأصدقاء',
      you_tag: '(أنت)',

      voucher_1_title: 'إفطار بلدي وتراثي في السلط',
      voucher_1_tag: 'خصم 20%',
      voucher_1_desc: 'خصم 20% على أشهى وجبة إفطار بلدية وتجربة طعام أصيلة في بيوت السلط التراثية.',
      voucher_1_partner: 'بيت السلط التراثي',

      voucher_2_title: 'فنجان قهوة وضيافة في شارع الرينبو',
      voucher_2_tag: 'مجاناً ☕',
      voucher_2_desc: 'فنجان قهوة أردنية أصيلة وضيافة مجانية في جبل عمّان التاريخي.',
      voucher_2_partner: 'مقهى رينبو القديم',

      voucher_3_title: 'مخيمات وادي رم النجمية',
      voucher_3_tag: 'خصم 15 د.أ',
      voucher_3_desc: 'قسيمة خصم 15 دينار على المبيت وعشاء الزرب وجلسات السمر وتأمل النجوم.',
      voucher_3_partner: 'مخيم نجوم رم',

      voucher_4_title: 'ورشة صناعة الفسيفساء في مادبا',
      voucher_4_tag: 'ورشة مجانية 🎨',
      voucher_4_desc: 'تذكرة مجانية للمشاركة في ورشة نحت وصناعة الفسيفساء الحجرية مع الحرفيين.',
      voucher_4_partner: 'مشغل فسيفساء مادبا',

      assistant_title: 'دليل مسار',
      assistant_sub: 'رفيقك ومستشارك في كل خطوة بالأردن',
      assistant_mascot_sub: 'مستكشف الأردن – رفيقك في الرحلة',
      assistant_chip_1: 'كم نقطة عندي؟',
      assistant_chip_2: 'اقترح لي مغامرة',
      assistant_chip_3: 'وش تحديات الأسبوع؟',
      assistant_chip_4: 'أماكن للعائلة',
      assistant_placeholder: 'اكتب سؤالك أو تحدث مع راشد...',

      settings_title: 'الإعدادات',
      settings_account: 'حسابك',
      settings_edit_profile: 'تعديل الملف الشخصي',
      settings_app_prefs: 'تفضيلات التطبيق',
      settings_lang: 'اللغة',
      settings_lang_val: 'العربية',
      settings_notifications: 'الإشعارات',
      settings_notifications_val: 'مفعلة',
      settings_sound: 'المؤثرات الصوتية',
      settings_sound_val: 'أصوات التفاعل والنقاط',
      settings_support: 'المساعدة والدعم',
      settings_feedback: 'أرسل اقتراحاً أو مشكلة',
      settings_privacy: 'سياسة الخصوصية والشروط',
      settings_logout: 'تسجيل خروج',
      settings_theme_label: 'الوضع الليلي',
      settings_theme_sub: 'مظهر داكن ومريح للعين',

      add_to_trip: 'أضف إلى رحلتي',
      added_to_trip: '✅ مضاف إلى رحلتك',
      audio_story_title: 'القصة الصوتية للمعلم',
      weather_status_title: 'حالة الطقس والموقع',
      gear_checklist_title: 'ماذا تحتاج معك؟',
      itinerary_timeline_title: 'خطوات التجربة والجدول',
      temperature: 'درجة الحرارة',
      wind_speed: 'سرعة الرياح',
      flood_risk: 'خطر السيول',
      sunset_time: 'وقت الغروب',
      duration_label: 'المدة المقدرة',
      cost_label: 'التكلفة'
    },

    en: {

      app_name: 'Masar',
      app_slogan: 'Your smart travel companion in Jordan',
      points_unit: 'points',
      points_earned: 'points earned ⭐',
      streak_weeks: 'consecutive weeks',
      see_all: 'View All',
      save_changes: 'Save Changes',
      cancel: 'Cancel',
      close: 'Close',
      back: 'Back',
      free: 'Free',
      done_thanks: 'Done, Thanks',
      copied: 'Copied successfully!',
      saved: 'Saved successfully!',
      points_badge: '25 pts',
      discover_exp: 'Discover Experience',

      onboarding_title_1: 'Discover Hidden Jordan',
      onboarding_desc_1: 'Authentic local trails and experiences taking you to the heart of Jordanian nature and history.',
      onboarding_title_2: 'Earn Points & Rewards',
      onboarding_desc_2: 'Log your steps and complete weekly challenges to claim real vouchers and perks.',
      onboarding_title_3: 'Your AI Travel Companion',
      onboarding_desc_3: 'Rashid the AI guide answers your questions and crafts smart custom itineraries.',
      btn_start: 'Get Started',
      btn_next: 'Next',
      btn_skip: 'Skip',

      slide_1_title: 'Discover Jordan',
      slide_1_desc: 'Hidden places, untold stories,\nand off-the-beaten-path experiences.',
      slide_2_title: 'Hidden Gems',
      slide_2_desc: 'Meet the people of Jordan, experience their culture,\nand live genuine moments from the heart.',
      slide_3_title: 'Your Journey Awaits!',
      slide_3_desc: 'Discover, experience,\ncollect your memories.',
      onboarding_btn: 'Start',

      profile_skip: 'Skip',
      profile_q1: 'Hey there! I\'m <span class="text-burgundy">Rashid</span>, your travel companion. What should I call you?',
      profile_input_placeholder: 'Your first name or nickname',
      profile_q2: 'Great name! To build your perfect<br>route, I need to know your age group.',
      profile_age_subtitle: 'Select your age group',
      profile_age_under18: 'Under 18',
      profile_q3: 'What do you love to discover in Jordan?',
      profile_interest_1: 'Stories & History',
      profile_interest_2: 'Nature',
      profile_interest_3: 'Food',
      profile_interest_4: 'Adventures',
      profile_interest_5: 'Arts & Crafts',
      profile_interest_6: 'Live like a local',
      profile_q4_budget: 'Do you have a specific budget?',
      profile_budget_1: 'Budget-friendly',
      profile_budget_2: 'Balanced',
      profile_budget_3: 'No preference',
      profile_q4_companion: 'Who is your travel companion?',
      profile_companion_1: 'Family',
      profile_companion_2: 'Friends',
      profile_companion_3: 'Solo',
      profile_btn_next: 'Next',
      profile_btn_prev: 'Previous',
      profile_btn_login: 'Log In',
      profile_btn_start: 'Get Started',

      login_title: 'Sign In',
      login_email_placeholder: 'Email address',
      login_password_placeholder: 'Password',
      login_terms_text: 'I agree to the',
      login_terms_link: 'Terms & Conditions',
      login_submit: 'Sign In',
      login_no_account: "Don't have an account?",
      login_create_account: 'Create Account',
      login_guest: 'Or continue as guest',
      login_divider: 'Or continue with',

      register_title: 'Create Account',
      register_subtitle: 'Join Masar community and explore the best of Jordan',
      register_name_placeholder: 'Full Name',
      register_email_placeholder: 'Email address',
      register_password_placeholder: 'Password',
      register_submit: 'Create Account',
      register_has_account: 'Already have an account?',
      register_login: 'Sign In',

      greeting_prefix: 'Welcome',
      greeting_sub: 'Your journey is ready. Shall we continue or customize it?',

      map_title: 'Jordan Map',
      map_sub: 'Explore routes geographically',
      planner_title: 'Trip Planner',
      planner_sub: 'Custom itinerary for your trip',
      community_title: 'Community',
      community_sub: 'Explorer moments & challenges',

      weekly_challenges_title: 'Weekly Challenges',
      suggestions_title: 'Recommended For You',
      suggestions_sub: 'Experiences tailored to your taste',
      featured_experiences_title: 'Featured Experiences',

      challenge_1_name: 'Shrak Bread with Um Mohammed',
      challenge_1_loc: 'As-Salt',
      challenge_2_name: 'Wadi Al-Heydan Trail',
      challenge_2_loc: 'Madaba',

      shrak_title: 'Shrak Bread with Um Mohammed',
      shrak_loc: 'As-Salt • 4.9 ★',
      shrak_steps: '2 of 3 steps',
      log_step: 'Log Step',
      step_logged: '✅ Step Logged (+10 pts)',
      challenge_completed: '✅ Challenge Completed (+25 pts)',

      heydan_title: 'Wadi Al-Heydan Trail',
      heydan_loc: 'Madaba • 4.8 ★',
      heydan_steps: '1 of 4 steps',

      citadel_title: 'Amman Citadel Sunset',
      citadel_desc: 'Enjoy a peaceful golden view of Amman at sunset.',
      citadel_tag: 'Nature • Photography',
      citadel_loc: 'Amman',

      salt_title: 'Stories of As-Salt',
      salt_desc: 'A stroll through historic yellow stone houses and heritage alleys.',
      salt_tag: 'History • Culture',
      salt_loc: 'As-Salt',

      coffee_title: 'Authentic Jordanian Coffee',
      coffee_desc: 'Learn local coffee traditions & hospitality gathering.',
      coffee_tag: 'Food • Local Experience',
      coffee_loc: 'Amman',

      exp_1_title: 'Wadi Mujib Adventure',
      exp_1_desc: 'Explore canyons, water trails and breathtaking landscapes in one of Jordan\'s most epic adventures.',
      exp_1_tag: 'Nature • Adventure 🌿',
      exp_1_loc: 'Wadi Mujib',
      exp_2_title: 'Learn Jordanian Cooking with Salt Locals',
      exp_2_desc: 'Learn a traditional Jordanian recipe and share a home-cooked meal with locals.',
      exp_2_tag: 'Food • Local Experience 🍽️',
      exp_2_loc: 'As-Salt',
      exp_3_title: 'A Night Under Wadi Rum Stars',
      exp_3_desc: 'Spend a night between the desert and stars, and hear tales from the Bedouin.',
      exp_3_tag: 'Culture • Adventure ⛺',
      exp_3_loc: 'Wadi Rum',

      nav_home: 'Home',
      nav_rewards: 'Rewards',
      nav_assistant: 'Masar Guide',
      nav_profile: 'Profile',

      rewards_points_title: 'Points Balance',
      rewards_market_title: 'Rewards Market',
      rewards_market_sub: 'Redeem points for authentic Jordanian discounts & perks',
      rewards_balance_prefix: 'Balance:',
      redeem_now: 'Redeem Now',
      badges_section_title: 'Achievement Badges',
      leaderboard_title: 'Leaderboard',
      leaderboard_this_week: 'This Week',
      leaderboard_friends: 'Friends',
      you_tag: '(You)',

      voucher_1_title: 'Traditional Breakfast in As-Salt',
      voucher_1_tag: '20% OFF',
      voucher_1_desc: '20% discount on an authentic traditional breakfast in As-Salt heritage houses.',
      voucher_1_partner: 'As-Salt Heritage House',

      voucher_2_title: 'Coffee & Hospitality on Rainbow Street',
      voucher_2_tag: 'Free ☕',
      voucher_2_desc: 'Free authentic Jordanian coffee & hospitality in historic Jabal Amman.',
      voucher_2_partner: 'Old Rainbow Cafe',

      voucher_3_title: 'Wadi Rum Stargazing Camps',
      voucher_3_tag: '15 JOD OFF',
      voucher_3_desc: '15 JOD voucher for overnight stay, underground Zarb dinner & stargazing.',
      voucher_3_partner: 'Rum Stars Camp',

      voucher_4_title: 'Madaba Mosaic Workshop',
      voucher_4_tag: 'Free Workshop 🎨',
      voucher_4_desc: 'Free ticket for stone mosaic crafting workshop with local artisans.',
      voucher_4_partner: 'Madaba Mosaic Workshop',

      assistant_title: 'Masar Guide',
      assistant_sub: 'Your travel guide & AI companion across Jordan',
      assistant_mascot_sub: 'Jordan Explorer – Your Journey Companion',
      assistant_chip_1: 'How many points do I have?',
      assistant_chip_2: 'Suggest an adventure',
      assistant_chip_3: "What are this week's challenges?",
      assistant_chip_4: 'Family-friendly places',
      assistant_placeholder: 'Ask a question or chat with Rashid...',

      settings_title: 'Settings',
      settings_account: 'Your Account',
      settings_edit_profile: 'Edit Profile',
      settings_app_prefs: 'App Preferences',
      settings_lang: 'Language',
      settings_lang_val: 'English',
      settings_notifications: 'Notifications',
      settings_notifications_val: 'Enabled',
      settings_sound: 'Sound Effects',
      settings_sound_val: 'Interaction & chime sounds',
      settings_support: 'Help & Support',
      settings_feedback: 'Send Feedback or Bug',
      settings_privacy: 'Privacy Policy & Terms',
      settings_logout: 'Log Out',
      settings_theme_label: 'Dark Mode',
      settings_theme_sub: 'Comfortable dark theme for eyes',

      add_to_trip: 'Add to My Trip',
      added_to_trip: '✅ Added to Your Trip',
      audio_story_title: 'Audio Guide & Landmark Story',
      weather_status_title: 'Weather & Trail Conditions',
      gear_checklist_title: 'What should you bring?',
      itinerary_timeline_title: 'Experience Timeline & Steps',
      temperature: 'Temperature',
      wind_speed: 'Wind Speed',
      flood_risk: 'Flood Risk',
      sunset_time: 'Sunset Time',
      duration_label: 'Estimated Duration',
      cost_label: 'Cost'
    }
  };

  function getCurrentLanguage() {
    return localStorage.getItem('masar_language') || 'en';
  }

  function setLanguage(lang) {
    const validLang = lang === 'en' ? 'en' : 'ar';
    localStorage.setItem('masar_language', validLang);
    applyLanguage(validLang);
    return validLang;
  }

  function applyLanguage(lang) {
    const isEn = lang === 'en';
    const dict = translations[lang] || translations.en;

    document.documentElement.lang = isEn ? 'en' : 'ar';
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';

    const currentLangLabel = document.getElementById('currentLangLabel');
    if (currentLangLabel) {
      currentLangLabel.textContent = isEn ? 'English' : 'العربية';
    }

    const storedName = localStorage.getItem('masar_user_name') || (isEn ? 'Traveler' : 'كمال');
    document.querySelectorAll('.home-greeting-title').forEach(el => {
      el.textContent = `${dict.greeting_prefix} ${storedName}`;
    });
    document.querySelectorAll('.home-greeting-sub').forEach(el => {
      el.textContent = dict.greeting_sub;
    });

    document.querySelectorAll('.points-label, .rewards-points-label, .leader-points-lbl').forEach(el => {
      el.textContent = dict.points_unit;
    });
    document.querySelectorAll('.streak-text').forEach(el => {
      el.textContent = dict.streak_weeks;
    });

    const qaCards = document.querySelectorAll('.quick-action-card');
    if (qaCards.length >= 3) {
      const qa1Title = qaCards[0].querySelector('.quick-action-title');
      const qa1Sub = qaCards[0].querySelector('.quick-action-sub');
      if (qa1Title) qa1Title.textContent = dict.map_title;
      if (qa1Sub) qa1Sub.textContent = dict.map_sub;

      const qa2Title = qaCards[1].querySelector('.quick-action-title');
      const qa2Sub = qaCards[1].querySelector('.quick-action-sub');
      if (qa2Title) qa2Title.textContent = dict.planner_title;
      if (qa2Sub) qa2Sub.textContent = dict.planner_sub;

      const qa3Title = qaCards[2].querySelector('.quick-action-title');
      const qa3Sub = qaCards[2].querySelector('.quick-action-sub');
      if (qa3Title) qa3Title.textContent = dict.community_title;
      if (qa3Sub) qa3Sub.textContent = dict.community_sub;
    }

    const actionCards = document.querySelectorAll('.home-action-card');
    if (actionCards.length >= 3) {
      const mapTitle = actionCards[0].querySelector('.action-title');
      const mapSub = actionCards[0].querySelector('.action-sub');
      if (mapTitle) mapTitle.textContent = dict.map_title;
      if (mapSub) mapSub.textContent = dict.map_sub;

      const planTitle = actionCards[1].querySelector('.action-title');
      const planSub = actionCards[1].querySelector('.action-sub');
      if (planTitle) planTitle.textContent = dict.planner_title;
      if (planSub) planSub.textContent = dict.planner_sub;

      const commTitle = actionCards[2].querySelector('.action-title');
      const commSub = actionCards[2].querySelector('.action-sub');
      if (commTitle) commTitle.textContent = dict.community_title;
      if (commSub) commSub.textContent = dict.community_sub;
    }

    document.querySelectorAll('.challenges-title').forEach(el => {
      const txt = el.textContent;
      if (txt.includes('سوق') || txt.includes('Market')) {
        el.textContent = dict.rewards_market_title;
      } else if (txt.includes('المتصدرين') || txt.includes('Leaderboard')) {
        el.textContent = dict.leaderboard_title;
      } else if (txt.includes('أوسمة') || txt.includes('Badges')) {
        el.textContent = dict.badges_section_title;
      } else if (txt.includes('تحديات') || txt.includes('Weekly Challenges')) {
        el.textContent = dict.weekly_challenges_title;
      }
    });

    const suggHead = document.querySelector('.suggestions-section .suggestions-title');
    if (suggHead) suggHead.textContent = dict.suggestions_title;

    const suggSub = document.querySelector('.suggestions-section .suggestions-sub');
    if (suggSub) suggSub.textContent = dict.suggestions_sub;

    const expHead = document.querySelector('.experiences-section .challenges-title');
    if (expHead) expHead.textContent = dict.featured_experiences_title;

    document.querySelectorAll('.challenges-see-all').forEach(el => {
      if (el.textContent.includes('الأصدقاء') || el.textContent.includes('Friends')) {
        el.textContent = dict.leaderboard_friends;
      } else {
        el.textContent = dict.see_all;
      }
    });

    const suggCards = document.querySelectorAll('.suggestion-card');
    if (suggCards.length >= 3) {
      const c1Name = suggCards[0].querySelector('.suggestion-name');
      const c1Desc = suggCards[0].querySelector('.suggestion-desc');
      const c1Tag = suggCards[0].querySelector('.suggestion-tag');
      const c1Loc = suggCards[0].querySelector('.suggestion-loc-text');
      if (c1Name) c1Name.textContent = dict.citadel_title;
      if (c1Desc) c1Desc.textContent = dict.citadel_desc;
      if (c1Tag) c1Tag.textContent = dict.citadel_tag;
      if (c1Loc) c1Loc.textContent = dict.citadel_loc;

      const c2Name = suggCards[1].querySelector('.suggestion-name');
      const c2Desc = suggCards[1].querySelector('.suggestion-desc');
      const c2Tag = suggCards[1].querySelector('.suggestion-tag');
      const c2Loc = suggCards[1].querySelector('.suggestion-loc-text');
      if (c2Name) c2Name.textContent = dict.salt_title;
      if (c2Desc) c2Desc.textContent = dict.salt_desc;
      if (c2Tag) c2Tag.textContent = dict.salt_tag;
      if (c2Loc) c2Loc.textContent = dict.salt_loc;

      const c3Name = suggCards[2].querySelector('.suggestion-name');
      const c3Desc = suggCards[2].querySelector('.suggestion-desc');
      const c3Tag = suggCards[2].querySelector('.suggestion-tag');
      const c3Loc = suggCards[2].querySelector('.suggestion-loc-text');
      if (c3Name) c3Name.textContent = dict.coffee_title;
      if (c3Desc) c3Desc.textContent = dict.coffee_desc;
      if (c3Tag) c3Tag.textContent = dict.coffee_tag;
      if (c3Loc) c3Loc.textContent = dict.coffee_loc;
    }

    const challengeCards = document.querySelectorAll('.rewards-challenge-card');
    if (challengeCards.length >= 2) {
      const ch1Title = challengeCards[0].querySelector('.rewards-challenge-title');
      const ch1Loc = challengeCards[0].querySelector('.rewards-challenge-location');
      const ch1Steps = challengeCards[0].querySelector('.rewards-progress-steps');
      if (ch1Title) ch1Title.textContent = dict.shrak_title;
      if (ch1Loc) ch1Loc.textContent = dict.shrak_loc;
      if (ch1Steps && !ch1Steps.textContent.includes('مكتملة') && !ch1Steps.textContent.includes('Completed')) {
        ch1Steps.textContent = dict.shrak_steps;
      }

      const ch2Title = challengeCards[1].querySelector('.rewards-challenge-title');
      const ch2Loc = challengeCards[1].querySelector('.rewards-challenge-location');
      const ch2Steps = challengeCards[1].querySelector('.rewards-progress-steps');
      if (ch2Title) ch2Title.textContent = dict.heydan_title;
      if (ch2Loc) ch2Loc.textContent = dict.heydan_loc;
      if (ch2Steps && !ch2Steps.textContent.includes('مكتملة') && !ch2Steps.textContent.includes('Completed')) {
        ch2Steps.textContent = dict.heydan_steps;
      }
    }

    const homeChallengeCards = document.querySelectorAll('.challenge-card');
    if (homeChallengeCards.length >= 2) {
      const hc1Name = homeChallengeCards[0].querySelector('.challenge-name');
      const hc1Loc = homeChallengeCards[0].querySelector('.challenge-location');
      const hc1Badge = homeChallengeCards[0].querySelector('.challenge-points-badge');
      if (hc1Name) hc1Name.textContent = dict.challenge_1_name;
      if (hc1Loc) hc1Loc.textContent = dict.challenge_1_loc;
      if (hc1Badge) hc1Badge.textContent = dict.points_badge;

      const hc2Name = homeChallengeCards[1].querySelector('.challenge-name');
      const hc2Loc = homeChallengeCards[1].querySelector('.challenge-location');
      const hc2Badge = homeChallengeCards[1].querySelector('.challenge-points-badge');
      if (hc2Name) hc2Name.textContent = dict.challenge_2_name;
      if (hc2Loc) hc2Loc.textContent = dict.challenge_2_loc;
      if (hc2Badge) hc2Badge.textContent = dict.points_badge;
    }

    const voucherCards = document.querySelectorAll('.market-voucher-card');
    if (voucherCards.length >= 4) {
      const v1Tag = voucherCards[0].querySelector('.market-voucher-tag');
      const v1Title = voucherCards[0].querySelector('.market-voucher-title');
      const v1Desc = voucherCards[0].querySelector('.market-voucher-desc');
      const v1Partner = voucherCards[0].querySelector('.market-partner-name');
      const v1Btn = voucherCards[0].querySelector('.btn-redeem-voucher');
      if (v1Tag) v1Tag.textContent = dict.voucher_1_tag;
      if (v1Title) v1Title.textContent = dict.voucher_1_title;
      if (v1Desc) v1Desc.textContent = dict.voucher_1_desc;
      if (v1Partner) v1Partner.textContent = dict.voucher_1_partner;
      if (v1Btn) v1Btn.textContent = dict.redeem_now;

      const v2Tag = voucherCards[1].querySelector('.market-voucher-tag');
      const v2Title = voucherCards[1].querySelector('.market-voucher-title');
      const v2Desc = voucherCards[1].querySelector('.market-voucher-desc');
      const v2Partner = voucherCards[1].querySelector('.market-partner-name');
      const v2Btn = voucherCards[1].querySelector('.btn-redeem-voucher');
      if (v2Tag) v2Tag.textContent = dict.voucher_2_tag;
      if (v2Title) v2Title.textContent = dict.voucher_2_title;
      if (v2Desc) v2Desc.textContent = dict.voucher_2_desc;
      if (v2Partner) v2Partner.textContent = dict.voucher_2_partner;
      if (v2Btn) v2Btn.textContent = dict.redeem_now;

      const v3Tag = voucherCards[2].querySelector('.market-voucher-tag');
      const v3Title = voucherCards[2].querySelector('.market-voucher-title');
      const v3Desc = voucherCards[2].querySelector('.market-voucher-desc');
      const v3Partner = voucherCards[2].querySelector('.market-partner-name');
      const v3Btn = voucherCards[2].querySelector('.btn-redeem-voucher');
      if (v3Tag) v3Tag.textContent = dict.voucher_3_tag;
      if (v3Title) v3Title.textContent = dict.voucher_3_title;
      if (v3Desc) v3Desc.textContent = dict.voucher_3_desc;
      if (v3Partner) v3Partner.textContent = dict.voucher_3_partner;
      if (v3Btn) v3Btn.textContent = dict.redeem_now;

      const v4Tag = voucherCards[3].querySelector('.market-voucher-tag');
      const v4Title = voucherCards[3].querySelector('.market-voucher-title');
      const v4Desc = voucherCards[3].querySelector('.market-voucher-desc');
      const v4Partner = voucherCards[3].querySelector('.market-partner-name');
      const v4Btn = voucherCards[3].querySelector('.btn-redeem-voucher');
      if (v4Tag) v4Tag.textContent = dict.voucher_4_tag;
      if (v4Title) v4Title.textContent = dict.voucher_4_title;
      if (v4Desc) v4Desc.textContent = dict.voucher_4_desc;
      if (v4Partner) v4Partner.textContent = dict.voucher_4_partner;
      if (v4Btn) v4Btn.textContent = dict.redeem_now;
    }

    document.querySelectorAll('.leaderboard-row.highlight-user .leader-name').forEach(el => {
      el.textContent = `${storedName} ${dict.you_tag}`;
    });

    const asTitle = document.querySelector('.assistant-title');
    if (asTitle) asTitle.textContent = dict.assistant_title;
    const asSub = document.querySelector('.assistant-sub');
    if (asSub) asSub.textContent = dict.assistant_sub;
    const asMascotSub = document.querySelector('.assistant-card-subtitle');
    if (asMascotSub) asMascotSub.textContent = dict.assistant_mascot_sub;

    const chips = document.querySelectorAll('.assistant-chip-btn');
    if (chips.length >= 4) {
      chips[0].textContent = dict.assistant_chip_1;
      chips[0].setAttribute('data-query', dict.assistant_chip_1);

      chips[1].textContent = dict.assistant_chip_2;
      chips[1].setAttribute('data-query', dict.assistant_chip_2);

      chips[2].textContent = dict.assistant_chip_3;
      chips[2].setAttribute('data-query', dict.assistant_chip_3);

      chips[3].textContent = dict.assistant_chip_4;
      chips[3].setAttribute('data-query', dict.assistant_chip_4);
    }

    const asInput = document.getElementById('assistantTextInput');
    if (asInput) asInput.placeholder = dict.assistant_placeholder;

    const expBackSpan = document.querySelector('.exp-detail-back-btn span');
    if (expBackSpan) expBackSpan.textContent = dict.back;
    const btnAddToTrip = document.getElementById('btnAddToTrip');
    if (btnAddToTrip) {
      const isAdded = btnAddToTrip.getAttribute('data-added') === 'true';
      btnAddToTrip.textContent = isAdded ? dict.added_to_trip : dict.add_to_trip;
    }

    const settingsHeadings = document.querySelectorAll('.settings-section-heading');
    if (settingsHeadings.length >= 3) {
      settingsHeadings[0].textContent = dict.settings_account;
      settingsHeadings[1].textContent = dict.settings_app_prefs;
      settingsHeadings[2].textContent = dict.settings_support;
    }

    const settingsRows = document.querySelectorAll('.settings-flat-row');
    settingsRows.forEach(row => {
      const mainLbl = row.querySelector('.settings-row-main-label');
      const subLbl = row.querySelector('.settings-row-sub-label');
      if (!mainLbl) return;
      const t = mainLbl.textContent.trim();

      if (t === 'تعديل الملف الشخصي' || t === 'Edit Profile') {
        mainLbl.textContent = dict.settings_edit_profile;
      } else if (t === 'اللغة' || t === 'Language') {
        mainLbl.textContent = dict.settings_lang;
        if (subLbl) subLbl.textContent = dict.settings_lang_val;
      } else if (t === 'الإشعارات' || t === 'Notifications') {
        mainLbl.textContent = dict.settings_notifications;
        if (subLbl) subLbl.textContent = dict.settings_notifications_val;
      } else if (t === 'المؤثرات الصوتية' || t === 'Sound Effects') {
        mainLbl.textContent = dict.settings_sound;
        if (subLbl) subLbl.textContent = dict.settings_sound_val;
      } else if (t === 'المظهر الليلي' || t === 'Dark Mode') {
        mainLbl.textContent = dict.settings_theme_label;
        if (subLbl) subLbl.textContent = dict.settings_theme_sub;
      } else if (t === 'أرسل اقتراحاً أو مشكلة' || t === 'Send Feedback or Bug') {
        mainLbl.textContent = dict.settings_feedback;
      } else if (t === 'سياسة الخصوصية والشروط' || t === 'Privacy Policy & Terms') {
        mainLbl.textContent = dict.settings_privacy;
      }
    });

    const logoutText = document.querySelector('.settings-logout-text');
    if (logoutText) logoutText.textContent = dict.settings_logout;

    document.querySelectorAll('#navItemHome, #navItemHome2, #navItemHome3').forEach(btn => {
      btn.setAttribute('aria-label', dict.nav_home);
    });
    document.querySelectorAll('#navItemRewards, #navItemRewards3').forEach(btn => {
      btn.setAttribute('aria-label', dict.nav_rewards);
    });
    document.querySelectorAll('#navItemMap, #navItemMap2, #navItemMap3').forEach(btn => {
      btn.setAttribute('aria-label', dict.nav_assistant);
    });
    document.querySelectorAll('#navItemProfile, #navItemProfile2, #navItemProfile3').forEach(btn => {
      btn.setAttribute('aria-label', dict.nav_profile);
    });

    document.querySelectorAll('.language-option-card').forEach(card => {
      const cardLang = card.getAttribute('data-lang');
      const check = card.querySelector('span:last-child');
      if (cardLang === lang) {
        card.classList.add('selected');
        card.style.border = '2px solid #85122D';
        card.style.background = '#FFF5F6';
        if (check) {
          check.textContent = '✓';
          check.style.color = '#85122D';
        }
      } else {
        card.classList.remove('selected');
        card.style.border = '1px solid #E5DFD5';
        card.style.background = '#F8F4EE';
        if (check) check.textContent = '';
      }
    });

    const btnConfirmLang = document.getElementById('btnConfirmLanguage');
    if (btnConfirmLang) {
      const spanEl = btnConfirmLang.querySelector('span');
      if (spanEl) spanEl.textContent = isEn ? 'Confirm Language' : 'تأكيد اللغة';
    }

    const slides = document.querySelectorAll('.onboarding-slide');
    if (slides.length >= 3) {
      const s1Title = slides[0].querySelector('.slide-title');
      const s1Desc = slides[0].querySelector('.slide-description');
      if (s1Title) s1Title.textContent = dict.slide_1_title;
      if (s1Desc) s1Desc.innerHTML = dict.slide_1_desc.replace('\n', '<br>');

      const s2Title = slides[1].querySelector('.slide-title');
      const s2Desc = slides[1].querySelector('.slide-description');
      if (s2Title) s2Title.textContent = dict.slide_2_title;
      if (s2Desc) s2Desc.innerHTML = dict.slide_2_desc.replace('\n', '<br>');

      const s3Title = slides[2].querySelector('.slide-title');
      const s3Desc = slides[2].querySelector('.slide-description');
      if (s3Title) s3Title.textContent = dict.slide_3_title;
      if (s3Desc) s3Desc.innerHTML = dict.slide_3_desc.replace('\n', '<br>');
    }

    const btnLabel = document.getElementById('btnLabel');
    if (btnLabel) btnLabel.textContent = dict.onboarding_btn;

    const profileSlides = document.querySelectorAll('.profile-slide');
    if (profileSlides.length >= 4) {

      const pq1 = profileSlides[0].querySelector('.profile-question');
      if (pq1) pq1.innerHTML = dict.profile_q1;
      const pInput = profileSlides[0].querySelector('.profile-input-field');
      if (pInput) pInput.placeholder = dict.profile_input_placeholder;

      const pq2 = profileSlides[1].querySelector('.profile-question');
      if (pq2) pq2.innerHTML = dict.profile_q2;
      const ageSub = profileSlides[1].querySelector('.profile-subtitle');
      if (ageSub) ageSub.textContent = dict.profile_age_subtitle;

      const agePills = profileSlides[1].querySelectorAll('.pill-btn');
      agePills.forEach(pill => {
        const txt = pill.textContent.trim();
        if (txt === 'أقل من 18' || txt === 'Under 18') pill.textContent = dict.profile_age_under18;
      });

      const pq3 = profileSlides[2].querySelector('.profile-question');
      if (pq3) pq3.textContent = dict.profile_q3;
      const interestLabels = profileSlides[2].querySelectorAll('.option-label-text');
      const interestKeys = [
        ['القصص والتاريخ', 'Stories & History', 'profile_interest_1'],
        ['الطبيعة', 'Nature', 'profile_interest_2'],
        ['الأكل', 'Food', 'profile_interest_3'],
        ['المغامرات', 'Adventures', 'profile_interest_4'],
        ['الفن والحرف اليدوية', 'Arts & Crafts', 'profile_interest_5'],
        ['تجربة العيش مثل اهل المكان', 'Live like a local', 'profile_interest_6']
      ];
      interestLabels.forEach(lbl => {
        const t = lbl.textContent.trim();
        for (const [ar, en, key] of interestKeys) {
          if (t === ar || t === en) {
            lbl.textContent = dict[key];
            break;
          }
        }
      });

      const budgetTitle = profileSlides[3].querySelectorAll('.section-title');
      if (budgetTitle.length >= 2) {
        budgetTitle[0].textContent = dict.profile_q4_budget;
        budgetTitle[1].textContent = dict.profile_q4_companion;
      } else if (budgetTitle.length >= 1) {
        budgetTitle[0].textContent = dict.profile_q4_budget;
      }

      const budgetLabels = profileSlides[3].querySelectorAll('.option-label-text');
      const budgetKeys = [
        ['مسار اقتصادي', 'Budget-friendly', 'profile_budget_1'],
        ['مسار متوازن', 'Balanced', 'profile_budget_2'],
        ['لا يهمني', 'No preference', 'profile_budget_3'],
        ['العائلة', 'Family', 'profile_companion_1'],
        ['الأصدقاء', 'Friends', 'profile_companion_2'],
        ['لا أحد', 'Solo', 'profile_companion_3']
      ];
      budgetLabels.forEach(lbl => {
        const t = lbl.textContent.trim();
        for (const [ar, en, key] of budgetKeys) {
          if (t === ar || t === en) {
            lbl.textContent = dict[key];
            break;
          }
        }
      });
    }

    document.querySelectorAll('.btn-skip').forEach(btn => {
      btn.textContent = dict.profile_skip;
    });

    const btnProfileNext = document.getElementById('btnProfileNext');
    if (btnProfileNext) {
      const btnText = btnProfileNext.querySelector('.btn-text');
      if (btnText) btnText.textContent = dict.profile_btn_next;
    }
    const btnProfilePrev = document.getElementById('btnProfilePrev');
    if (btnProfilePrev) btnProfilePrev.textContent = dict.profile_btn_prev;

    const btnStep4Login = document.getElementById('btnStep4Login');
    if (btnStep4Login) {
      const btnText = btnStep4Login.querySelector('.btn-text');
      if (btnText) btnText.textContent = dict.profile_btn_login;
    }
    const btnStep4Start = document.getElementById('btnStep4Start');
    if (btnStep4Start) btnStep4Start.textContent = dict.profile_btn_start;

    const loginContainer = document.getElementById('loginContainer');
    if (loginContainer) {
      const loginTitle = loginContainer.querySelector('.login-title');
      if (loginTitle) loginTitle.textContent = dict.login_title;

      const emailInput = loginContainer.querySelector('#inputEmail');
      if (emailInput) {
        emailInput.placeholder = dict.login_email_placeholder;
        emailInput.setAttribute('aria-label', dict.login_email_placeholder);
      }

      const passInput = loginContainer.querySelector('#inputPassword');
      if (passInput) {
        passInput.placeholder = dict.login_password_placeholder;
        passInput.setAttribute('aria-label', dict.login_password_placeholder);
      }

      const termsText = loginContainer.querySelector('.terms-text');
      if (termsText) {
        const termsLink = termsText.querySelector('.terms-link');
        if (termsLink) {
          termsText.childNodes[0].textContent = dict.login_terms_text + ' ';
          termsLink.textContent = dict.login_terms_link;
        }
      }

      const loginSubmit = loginContainer.querySelector('#btnLoginSubmit');
      if (loginSubmit) loginSubmit.textContent = dict.login_submit;

      const switchText = loginContainer.querySelector('.login-switch-text');
      if (switchText) switchText.textContent = dict.login_no_account;

      const btnGoToRegister = loginContainer.querySelector('#btnGoToRegister');
      if (btnGoToRegister) btnGoToRegister.textContent = dict.login_create_account;

      const guestBtn = loginContainer.querySelector('#btnGuestLogin');
      if (guestBtn) guestBtn.textContent = dict.login_guest;

      const dividerText = loginContainer.querySelector('.divider-text');
      if (dividerText) dividerText.textContent = dict.login_divider;
    }

    const registerContainer = document.getElementById('registerContainer');
    if (registerContainer) {
      const regTitle = registerContainer.querySelector('.login-title');
      if (regTitle) regTitle.textContent = dict.register_title;

      const regSub = registerContainer.querySelector('.register-subtitle');
      if (regSub) regSub.textContent = dict.register_subtitle;

      const regName = registerContainer.querySelector('#inputRegName');
      if (regName) {
        regName.placeholder = dict.register_name_placeholder;
        regName.setAttribute('aria-label', dict.register_name_placeholder);
      }

      const regEmail = registerContainer.querySelector('#inputRegEmail');
      if (regEmail) {
        regEmail.placeholder = dict.register_email_placeholder;
        regEmail.setAttribute('aria-label', dict.register_email_placeholder);
      }

      const regPass = registerContainer.querySelector('#inputRegPassword');
      if (regPass) {
        regPass.placeholder = dict.register_password_placeholder;
        regPass.setAttribute('aria-label', dict.register_password_placeholder);
      }

      const regTermsText = registerContainer.querySelector('.terms-text');
      if (regTermsText) {
        const termsLink = regTermsText.querySelector('.terms-link');
        if (termsLink) {
          regTermsText.childNodes[0].textContent = dict.login_terms_text + ' ';
          termsLink.textContent = dict.login_terms_link;
        }
      }

      const regSubmit = registerContainer.querySelector('#btnRegisterSubmit');
      if (regSubmit) regSubmit.textContent = dict.register_submit;

      const regSwitchText = registerContainer.querySelector('.login-switch-text');
      if (regSwitchText) regSwitchText.textContent = dict.register_has_account;

      const btnGoToLogin = registerContainer.querySelector('#btnGoToLogin');
      if (btnGoToLogin) btnGoToLogin.textContent = dict.register_login;

      const regDividerText = registerContainer.querySelector('.divider-text');
      if (regDividerText) regDividerText.textContent = dict.login_divider;
    }

    const expCards = document.querySelectorAll('.experience-card');
    if (expCards.length >= 3) {
      const e1Title = expCards[0].querySelector('.experience-title');
      const e1Desc = expCards[0].querySelector('.experience-desc');
      const e1Tag = expCards[0].querySelector('.exp-tag');
      const e1Loc = expCards[0].querySelector('.exp-loc-text');
      const e1Btn = expCards[0].querySelector('.btn-discover-exp span');
      if (e1Title) e1Title.textContent = dict.exp_1_title;
      if (e1Desc) e1Desc.textContent = dict.exp_1_desc;
      if (e1Tag) e1Tag.textContent = dict.exp_1_tag;
      if (e1Loc) e1Loc.textContent = dict.exp_1_loc;
      if (e1Btn) e1Btn.textContent = dict.discover_exp;

      const e2Title = expCards[1].querySelector('.experience-title');
      const e2Desc = expCards[1].querySelector('.experience-desc');
      const e2Tag = expCards[1].querySelector('.exp-tag');
      const e2Loc = expCards[1].querySelector('.exp-loc-text');
      const e2Btn = expCards[1].querySelector('.btn-discover-exp span');
      if (e2Title) e2Title.textContent = dict.exp_2_title;
      if (e2Desc) e2Desc.textContent = dict.exp_2_desc;
      if (e2Tag) e2Tag.textContent = dict.exp_2_tag;
      if (e2Loc) e2Loc.textContent = dict.exp_2_loc;
      if (e2Btn) e2Btn.textContent = dict.discover_exp;

      const e3Title = expCards[2].querySelector('.experience-title');
      const e3Desc = expCards[2].querySelector('.experience-desc');
      const e3Tag = expCards[2].querySelector('.exp-tag');
      const e3Loc = expCards[2].querySelector('.exp-loc-text');
      const e3Btn = expCards[2].querySelector('.btn-discover-exp span');
      if (e3Title) e3Title.textContent = dict.exp_3_title;
      if (e3Desc) e3Desc.textContent = dict.exp_3_desc;
      if (e3Tag) e3Tag.textContent = dict.exp_3_tag;
      if (e3Loc) e3Loc.textContent = dict.exp_3_loc;
      if (e3Btn) e3Btn.textContent = dict.discover_exp;
    }

    document.querySelectorAll('.quick-action-arrow').forEach(el => {
      el.textContent = isEn ? '→' : '←';
    });

    window.dispatchEvent(new CustomEvent('masar:languageChanged', { detail: { lang, isEn, dict } }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getCurrentLanguage());
  });

  window.MasarI18n = {
    get: getCurrentLanguage,
    set: setLanguage,
    apply: applyLanguage,
    t: (key) => {
      const lang = getCurrentLanguage();
      return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
    },
    isEn: () => getCurrentLanguage() === 'en'
  };
})();
