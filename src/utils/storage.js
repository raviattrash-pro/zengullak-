// Fresh Clean Role-Specific Financial Profiles (Zero Mock / Zero Default Numbers)

export const ROLE_PROFILES = {
  child: {
    role: 'child',
    title: 'Bachha Mode (Ages 5-12)',
    incomeLabel: 'Monthly Pocket Money',
    salaryOrIncome: 0,
    gullakBalance: 0,
    dailyAllowance: 0,
    streakDays: 0,
    lastVibeCheckDate: null,
    todayVibe: null,
    antiBrokeDaysLeft: 30,
    dreamGoal: {
      title: 'My Dream Toy 🚲',
      targetAmount: 1000,
      currentAmount: 0,
    },
    kakeibo: {
      needs: 0,
      wants: 0,
      culture: 0,
      unexpected: 0,
    },
    kakeiboLabels: {
      needs: { name: '🍬 Treats (Chocolate/Snacks)', sub: 'Ice cream, chips, canteen treats', icon: '🍬' },
      wants: { name: '🧸 Toy Fund (Mauj)', sub: 'Action figures, toys, games', icon: '🧸' },
      culture: { name: '🎨 Colors & Books (Gyaan)', sub: 'Drawing books, sketch pens, storybooks', icon: '🎨' },
      unexpected: { name: '🎁 Sharing Jar (Daan)', sub: 'Friend gifts, helping someone', icon: '🎁' }
    },
    expenseLogs: [],
    freezeItems: [],
    totalShieldedAmount: 0,
  },

  youth: {
    role: 'youth',
    title: 'College & Youth Mode (18-24)',
    incomeLabel: 'Monthly Stipend / Allowance',
    salaryOrIncome: 0,
    gullakBalance: 0,
    dailyAllowance: 0,
    streakDays: 0,
    lastVibeCheckDate: null,
    todayVibe: null,
    antiBrokeDaysLeft: 30,
    dreamGoal: {
      title: 'My Dream Trip / Goal 🏖️',
      targetAmount: 5000,
      currentAmount: 0,
    },
    kakeibo: {
      needs: 0,
      wants: 0,
      culture: 0,
      unexpected: 0,
    },
    kakeiboLabels: {
      needs: { name: '🍛 Essentials & Travel', sub: 'Canteen food, PG rent, Metro card', icon: '🍛' },
      wants: { name: '🎈 Swiggy & Hangouts', sub: 'Late-night snacks, weekend movies', icon: '🎈' },
      culture: { name: '📚 Upskilling & Courses', sub: 'Coding tools, books, gym pass', icon: '📚' },
      unexpected: { name: '🩹 Rapid Fixes', sub: 'Bike petrol, phone data recharge', icon: '🩹' }
    },
    expenseLogs: [],
    freezeItems: [],
    totalShieldedAmount: 0,
  },

  parent: {
    role: 'parent',
    title: 'Household Financial Manager',
    incomeLabel: 'Monthly Take-Home Salary',
    salaryOrIncome: 0,
    gullakBalance: 0,
    dailyAllowance: 0,
    streakDays: 0,
    lastVibeCheckDate: null,
    todayVibe: null,
    antiBrokeDaysLeft: 30,
    dreamGoal: {
      title: 'Family Savings & Gold Fund 🛡️',
      targetAmount: 50000,
      currentAmount: 0,
    },
    kakeibo: {
      needs: 0,
      wants: 0,
      culture: 0,
      unexpected: 0,
    },
    kakeiboLabels: {
      needs: { name: '🏠 Ghar Kharcha & EMI', sub: 'Ration, Home Loan, School fees, LPG, Bills', icon: '🏠' },
      wants: { name: '🛍️ Family Mauj & Tyohar', sub: 'Family dining, festivals, new clothes', icon: '🛍️' },
      culture: { name: '🎓 Bacho ki Padhai', sub: 'Tuitions, education SIP, books', icon: '🎓' },
      unexpected: { name: '🛡️ Emergency & Health', sub: 'Medical buffer, car service, home repairs', icon: '🛡️' }
    },
    expenseLogs: [],
    freezeItems: [],
    totalShieldedAmount: 0,
  }
};

// V3 storage key resets all old mock numbers from the user's browser
const STORAGE_KEY = 'zengullak_data_v3';

export function loadData() {
  try {
    // Clear legacy mock versions from browser
    localStorage.removeItem('zengullak_data_v1');
    localStorage.removeItem('zengullak_data_v2');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        isLoggedIn: false,
        activeRole: 'parent',
        profiles: ROLE_PROFILES,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      isLoggedIn: parsed.isLoggedIn ?? false,
      activeRole: parsed.activeRole || 'parent',
      profiles: { ...ROLE_PROFILES, ...(parsed.profiles || {}) },
    };
  } catch (e) {
    console.error('Failed to load data:', e);
    return {
      isLoggedIn: false,
      activeRole: 'parent',
      profiles: ROLE_PROFILES,
    };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}
