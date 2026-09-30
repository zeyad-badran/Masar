const https = require('https');

const PROJECT_ID = 'masar-12856';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function writeDocument(collection, docId, fields) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ fields });
    const url = new URL(`${BASE_URL}/${collection}/${docId}`);

    const req = https.request(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ [${collection}] Document '${docId}' written successfully.`);
          resolve(JSON.parse(body));
        } else {
          console.error(`❌ [${collection}] Failed '${docId}':`, res.statusCode, body);
          resolve(null);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runSeed() {
  console.log(`🚀 Seeding Firestore for project: ${PROJECT_ID}...`);

  const experiences = [
    {
      id: 'wadi_mujib',
      fields: {
        title: { stringValue: 'مغامرة في وادي الموجب' },
        description: { stringValue: 'مسار مائي رائع بين الصخور الشاهقة، استمتع بالسباحة وتحدي الشلالات الطبيعية في أروع وديان الأردن.' },
        location: { stringValue: 'وادي الموجب' },
        category: { stringValue: 'طبيعة • مغامرة' },
        duration: { stringValue: '3 ساعات' },
        price: { stringValue: '15 د.أ' },
        rating: { doubleValue: 4.9 },
        imageUrl: { stringValue: 'assets/images/wadi_mujib.png' },
        isFeatured: { booleanValue: true }
      }
    },
    {
      id: 'salt_cooking',
      fields: {
        title: { stringValue: 'تعلّم الطبخ الأردني مع أهل السلط' },
        description: { stringValue: 'عِش تجربة أصيلة مع عائلة أردنية في السلط، تعلّم تحضير الأطباق التراثية وشاركهم قصص المدينة التاريخية.' },
        location: { stringValue: 'السلط' },
        category: { stringValue: 'تجربة محلية' },
        duration: { stringValue: 'ساعتان' },
        price: { stringValue: '12 د.أ' },
        rating: { doubleValue: 4.9 },
        imageUrl: { stringValue: 'assets/images/salt_cooking.jpg' },
        isFeatured: { booleanValue: true }
      }
    },
    {
      id: 'rum_stargazing',
      fields: {
        title: { stringValue: 'ليلة تحت نجوم وادي رم' },
        description: { stringValue: 'تجربة سحرية في صحراء وادي رم، جولة على ظهور الجمال، عشاء زرب بدوي، وتأمل النجوم مع قصص الصحراء.' },
        location: { stringValue: 'وادي رم' },
        category: { stringValue: 'ثقافة • مغامرة' },
        duration: { stringValue: 'يوم كامل' },
        price: { stringValue: '25 د.أ' },
        rating: { doubleValue: 4.8 },
        imageUrl: { stringValue: 'assets/images/rum_stargazing.jpg' },
        isFeatured: { booleanValue: true }
      }
    }
  ];

  for (const exp of experiences) {
    await writeDocument('experiences', exp.id, exp.fields);
  }

  const challenges = [
    {
      id: 'shrak_bread',
      fields: {
        title: { stringValue: 'خبز الشراك مع أم محمد' },
        location: { stringValue: 'السلط' },
        rating: { doubleValue: 4.9 },
        pointsReward: { integerValue: 25 },
        totalSteps: { integerValue: 3 },
        iconUrl: { stringValue: 'assets/images/shrak_bread_icon.png' },
        weekIdentifier: { stringValue: '2026-W40' },
        isActive: { booleanValue: true }
      }
    },
    {
      id: 'wadi_hidan',
      fields: {
        title: { stringValue: 'مسير وادي الهيدان' },
        location: { stringValue: 'مادبا' },
        rating: { doubleValue: 4.8 },
        pointsReward: { integerValue: 25 },
        totalSteps: { integerValue: 4 },
        iconUrl: { stringValue: 'assets/images/wadi_hidan.png' },
        weekIdentifier: { stringValue: '2026-W40' },
        isActive: { booleanValue: true }
      }
    }
  ];

  for (const ch of challenges) {
    await writeDocument('challenges', ch.id, ch.fields);
  }

  const badges = [
    { id: 'first_hike', fields: { name: { stringValue: 'أول مسير' }, icon: { stringValue: '🥾' }, isUnlocked: { booleanValue: true }, color: { stringValue: 'pink' } } },
    { id: 'gourmet', fields: { name: { stringValue: 'ذوّاق' }, icon: { stringValue: '🍽️' }, isUnlocked: { booleanValue: true }, color: { stringValue: 'pink' } } },
    { id: 'photographer', fields: { name: { stringValue: 'مصوّر' }, icon: { stringValue: '📸' }, isUnlocked: { booleanValue: true }, color: { stringValue: 'pink' } } },
    { id: '7_days', fields: { name: { stringValue: '٧ أيام' }, icon: { stringValue: '🔥' }, isUnlocked: { booleanValue: false }, color: { stringValue: 'beige' } } },
    { id: 'bedouin', fields: { name: { stringValue: 'بدوي' }, icon: { stringValue: '⛺' }, isUnlocked: { booleanValue: false }, color: { stringValue: 'beige' } } },
    { id: 'legend', fields: { name: { stringValue: 'أسطورة' }, icon: { stringValue: '👑' }, isUnlocked: { booleanValue: false }, color: { stringValue: 'beige' } } }
  ];

  for (const b of badges) {
    await writeDocument('badges', b.id, b.fields);
  }

  const leaderboard = [
    { id: 'rank_1', fields: { name: { stringValue: 'سارة العمري' }, points: { integerValue: 1240 }, rank: { integerValue: 1 }, medal: { stringValue: '🥇' } } },
    { id: 'rank_2', fields: { name: { stringValue: 'خالد الحوراني' }, points: { integerValue: 1080 }, rank: { integerValue: 2 }, medal: { stringValue: '🥈' } } },
    { id: 'rank_3', fields: { name: { stringValue: 'لينا الطراونة' }, points: { integerValue: 970 }, rank: { integerValue: 3 }, medal: { stringValue: '🥉' } } },
    { id: 'rank_4', fields: { name: { stringValue: 'كمال (أنت)' }, points: { integerValue: 640 }, rank: { integerValue: 4 }, medal: { stringValue: '4' }, isCurrent: { booleanValue: true } } },
    { id: 'rank_5', fields: { name: { stringValue: 'عمر الشوبكي' }, points: { integerValue: 520 }, rank: { integerValue: 5 }, medal: { stringValue: '5' } } }
  ];

  for (const lb of leaderboard) {
    await writeDocument('leaderboard', lb.id, lb.fields);
  }

  console.log('🎉 Firestore Seed Completed Successfully!');
}

runSeed();
