import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  increment
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyA1jymXrf6_jzB40t0S116bHKD3hD5rdIU",
  authDomain: "masar-12856.firebaseapp.com",
  projectId: "masar-12856",
  storageBucket: "masar-12856.firebasestorage.app",
  messagingSenderId: "286030138642",
  appId: "1:286030138642:web:367f4fd89455af8f33f7cb",
  measurementId: "G-RYG2QT0E0M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const MasarDB = {
  app,
  auth,
  db,
  currentUser: null,

  async signUp(email, password, displayName = 'Traveler') {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: displayName || 'Traveler',
        email: user.email,
        points: 10000,
        streakWeeks: 0,
        createdAt: serverTimestamp(),
        preferences: {},
        unlockedBadges: ['first_hike', 'gourmet', 'photographer']
      });

      await setDoc(doc(db, 'user_challenges', `${user.uid}_shrak_bread`), {
        userId: user.uid,
        challengeId: 'shrak_bread',
        stepsCompleted: 2,
        totalSteps: 3,
        progressPercent: 67,
        isCompleted: false,
        updatedAt: serverTimestamp()
      });

      await setDoc(doc(db, 'user_challenges', `${user.uid}_wadi_hidan`), {
        userId: user.uid,
        challengeId: 'wadi_hidan',
        stepsCompleted: 1,
        totalSteps: 4,
        progressPercent: 25,
        isCompleted: false,
        updatedAt: serverTimestamp()
      });

      return { success: true, user };
    } catch (error) {
      console.error('Sign Up Error:', error);
      return { success: false, error: error.message };
    }
  },

  async signIn(email, password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: cred.user };
    } catch (error) {
      console.error('Sign In Error:', error);
      return { success: false, error: error.message };
    }
  },

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return { success: true, user: res.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async logOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Log Out Error:', error);
      return { success: false, error: error.message };
    }
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      MasarDB.currentUser = user;
      callback(user);
    });
  },

  async getUserProfile(uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        return { success: true, data: snap.data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async savePreferences(uid, preferences) {
    try {
      await setDoc(doc(db, 'users', uid), {
        preferences,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async addPoints(uid, amount) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        points: increment(amount),
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async logChallengeStep(userId, challengeId, pointsReward = 6.25) {
    try {
      const userChallengeRef = doc(db, 'user_challenges', `${userId}_${challengeId}`);
      const docSnap = await getDoc(userChallengeRef);

      let stepsCompleted = 1;
      let totalSteps = 3;

      if (docSnap.exists()) {
        const d = docSnap.data();
        totalSteps = d.totalSteps || 3;
        stepsCompleted = Math.min(totalSteps, (d.stepsCompleted || 0) + 1);
      }

      const percent = Math.round((stepsCompleted / totalSteps) * 100);
      const isCompleted = stepsCompleted >= totalSteps;

      await setDoc(userChallengeRef, {
        userId,
        challengeId,
        stepsCompleted,
        totalSteps,
        progressPercent: percent,
        isCompleted,
        updatedAt: serverTimestamp()
      }, { merge: true });

      await MasarDB.addPoints(userId, isCompleted ? 25 : pointsReward);

      return { success: true, stepsCompleted, totalSteps, percent, isCompleted };
    } catch (error) {
      console.error('Log step error:', error);
      return { success: false, error: error.message };
    }
  },

  async bookExperience(userId, experienceData) {
    try {
      const tripRef = doc(collection(db, 'trips'));
      await setDoc(tripRef, {
        id: tripRef.id,
        userId,
        experience: experienceData,
        status: 'booked',
        createdAt: serverTimestamp()
      });
      return { success: true, tripId: tripRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async addToTrip(userId, experienceData) {
    try {
      const tripRef = doc(collection(db, 'trips'));
      await setDoc(tripRef, {
        id: tripRef.id,
        userId,
        experience: experienceData,
        status: 'saved',
        createdAt: serverTimestamp()
      });
      return { success: true, tripId: tripRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  subscribeLeaderboard(callback) {
    const q = query(collection(db, 'leaderboard'), orderBy('points', 'desc'), limit(10));
    return onSnapshot(q, (snap) => {
      const items = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    }, (error) => {
      console.error('Leaderboard subscription error:', error);
    });
  },

  async askGeminiAI(userPrompt, userName = 'Traveler', livePoints = '10000') {
    const systemPrompt = `أنت "راشد" رفيق المسار ومستكشف الأردن في تطبيق "مسار" (Masar).
اسم المستخدم الحالي: ${userName}.
رصيد نقاط المستخدم الحالي: ${livePoints} نقطة.
تحديات الأسبوع الحالية في التطبيق:
1. خبز الشراك مع أم محمد في السلط (مكتمل 67%)
2. مسير وادي الهيدان في مادبا (مكتمل 25%)

أبرز التجارب المتوفرة في مسار:
- مغامرة وادي الموجب المائية (15 د.أ - 3 ساعات)
- تعلّم الطبخ الأردني مع سارة في السلط (12 د.أ - ساعتان)
- ليلة تحت نجوم وادي رم مع أحمد (25 د.أ - يوم كامل)

تعليمات الإجابة:
- تحدث بلهجة أردنية ودودة ومرحة وطبيعية (استخدم عبارات أردنية لطيفة مثل: "حيّاك الله يا ${userName}", "أبشر", "شو رأيك بـ", "يا هلا بيك", "يسعد مساك").
- أجب عن أي سؤال يسأله المستخدم عن الأردن (سياحة، تاريخ، أماكن مخفية، طقس، عادات وتقاليد، منسف، قهوة سادة، أمان، نصائح سفر ومسارات).
- اجعل الإجابة مركزة، موجزة وجميلة ومنظمة بنقاط عند الحاجة بدون إطالة مملة.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${firebaseConfig.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nسؤال المستخدم: ${userPrompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 350
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { success: true, text: text.trim() };
      }
    } catch (e) {
      console.warn('Gemini API call notice:', e);
    }

    return { success: false };
  },

  async seedFullDatabase() {
    try {
      console.log('🔄 Checking & Seeding Firestore Database...');

      const expSnap = await getDocs(collection(db, 'experiences'));
      if (expSnap.empty) {
        const experiences = [
          {
            id: 'wadi_mujib',
            title: 'مغامرة في وادي الموجب',
            description: 'مسار مائي رائع بين الصخور الشاهقة، استمتع بالسباحة وتحدي الشلالات الطبيعية في أروع وديان الأردن.',
            location: 'وادي الموجب',
            category: 'طبيعة • مغامرة',
            duration: '3 ساعات',
            price: '15 د.أ',
            rating: 4.9,
            imageUrl: 'assets/images/wadi_mujib.png',
            steps: ['الوصول والترحيب', 'المسير المائي وتخطي العقبات', 'تسلق الشلال الطبيعي', 'الاستراحة والعودة'],
            host: { name: 'عمر من الموجب', desc: 'دليل محلي معتمد ومحب لاستكشاف الوديان الطبيعية.', avatar: 'assets/images/wadi_mujib.png' },
            isFeatured: true
          },
          {
            id: 'salt_cooking',
            title: 'تعلّم الطبخ الأردني مع أهل السلط',
            description: 'عِش تجربة أصيلة مع عائلة أردنية في السلط، تعلّم تحضير الأطباق التراثية وشاركهم قصص المدينة التاريخية.',
            location: 'السلط',
            category: 'تجربة محلية',
            duration: 'ساعتان',
            price: '12 د.أ',
            rating: 4.9,
            imageUrl: 'assets/images/salt_cooking.jpg',
            steps: ['تعرّف على المضيف', 'تعلّم وصفة أردنية تقليدية', 'حضّر الطعام معًا', 'شارك الوجبة مع أهل المكان'],
            host: { name: 'سارة من السلط', desc: 'أحب أشارك الزوار وصفات تعلّمتها من عائلتي وقصص من السلط.', avatar: 'assets/images/sara_host.png' },
            isFeatured: true
          },
          {
            id: 'rum_stargazing',
            title: 'ليلة تحت نجوم وادي رم',
            description: 'تجربة سحرية في صحراء وادي رم، جولة على ظهور الجمال، عشاء زرب بدوي، وتأمل النجوم مع قصص الصحراء.',
            location: 'وادي رم',
            category: 'ثقافة • مغامرة',
            duration: 'يوم كامل',
            price: '25 د.أ',
            rating: 4.8,
            imageUrl: 'assets/images/rum_stargazing.jpg',
            steps: ['جولة في الصحراء بالدفع الرباعي', 'تعرّف على حياة أهل البادية', 'عشاء أردني تقليدي (زرب)', 'جلسة تأمل تحت النجوم'],
            host: { name: 'أحمد من وادي رم', desc: 'أشارك الزوار قصص الصحراء والحياة البدوية التي عشتها هنا.', avatar: 'assets/images/ahmed_host.png' },
            isFeatured: true
          }
        ];

        for (const exp of experiences) {
          await setDoc(doc(db, 'experiences', exp.id), exp);
        }
        console.log('✅ Experiences catalog seeded.');
      }

      const chSnap = await getDocs(collection(db, 'challenges'));
      if (chSnap.empty) {
        const challenges = [
          {
            id: 'shrak_bread',
            title: 'خبز الشراك مع أم محمد',
            location: 'السلط',
            rating: 4.9,
            pointsReward: 25,
            totalSteps: 3,
            iconUrl: 'assets/images/shrak_bread_icon.png',
            weekIdentifier: '2026-W40',
            isActive: true
          },
          {
            id: 'wadi_hidan',
            title: 'مسير وادي الهيدان',
            location: 'مادبا',
            rating: 4.8,
            pointsReward: 25,
            totalSteps: 4,
            iconUrl: 'assets/images/wadi_hidan.png',
            weekIdentifier: '2026-W40',
            isActive: true
          }
        ];

        for (const ch of challenges) {
          await setDoc(doc(db, 'challenges', ch.id), ch);
        }
        console.log('✅ Weekly Challenges seeded.');
      }

      const badgeSnap = await getDocs(collection(db, 'badges'));
      if (badgeSnap.empty) {
        const badges = [
          { id: 'first_hike', name: 'أول مسير', icon: '🥾', isUnlocked: true, color: 'pink' },
          { id: 'gourmet', name: 'ذوّاق', icon: '🍽️', isUnlocked: true, color: 'pink' },
          { id: 'photographer', name: 'مصوّر', icon: '📸', isUnlocked: true, color: 'pink' },
          { id: '7_days', name: '٧ أيام', icon: '🔥', isUnlocked: false, color: 'beige' },
          { id: 'bedouin', name: 'بدوي', icon: '⛺', isUnlocked: false, color: 'beige' },
          { id: 'legend', name: 'أسطورة', icon: '👑', isUnlocked: false, color: 'beige' }
        ];

        for (const badge of badges) {
          await setDoc(doc(db, 'badges', badge.id), badge);
        }
        console.log('✅ Badges seeded.');
      }

      const lbSnap = await getDocs(collection(db, 'leaderboard'));
      if (lbSnap.empty) {
        const leaderboard = [
          { id: 'rank_1', name: 'سارة العمري', points: 1240, rank: 1, medal: '🥇' },
          { id: 'rank_2', name: 'خالد الحوراني', points: 1080, rank: 2, medal: '🥈' },
          { id: 'rank_3', name: 'لينا الطراونة', points: 970, rank: 3, medal: '🥉' },
          { id: 'rank_4', name: (window.MasarI18n && window.MasarI18n.isEn()) ? 'Traveler (You)' : 'كمال (أنت)', points: 10000, rank: 4, medal: '4', isCurrent: true },
          { id: 'rank_5', name: 'عمر الشوبكي', points: 520, rank: 5, medal: '5' }
        ];

        for (const lb of leaderboard) {
          await setDoc(doc(db, 'leaderboard', lb.id), lb);
        }
        console.log('✅ Leaderboard seeded.');
      }

      console.log('🎉 Full Masar Firestore Database is Ready!');
    } catch (error) {
      console.warn('Seeding notice (check Firestore rules if restricted):', error);
    }
  }
};

window.MasarFirebase = MasarDB;

MasarDB.onAuthChange((user) => {
  if (user) {
    console.log('👤 Logged in as:', user.email, user.uid);
  }
});

MasarDB.seedFullDatabase();
