import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginScreen from './components/LoginScreen';
import CashRegister from './components/CashRegister';
import RealisticGullak from './components/RealisticGullak';
import ImpulseFreezer from './components/ImpulseFreezer';
import ArigatoModal from './components/ArigatoModal';
import KaizenReels from './components/KaizenReels';
import DanshariSorter from './components/DanshariSorter';
import KakeiboPillars from './components/KakeiboPillars';
import HisabBudgetLog from './components/HisabBudgetLog';
import KalpavrikshaTree from './components/KalpavrikshaTree';
import SetBudgetModal from './components/SetBudgetModal';
import { loadData, saveData } from './utils/storage';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Zap, Shield, Heart, Edit3 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(loadData);
  const [activeTab, setActiveTab] = useState('counter');
  const [activeSpendModal, setActiveSpendModal] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [flyingMoneyEvent, setFlyingMoneyEvent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const activeRole = data.activeRole || 'parent';
  const currentProfile = data.profiles?.[activeRole] || data.profiles.parent;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginProfile = (roleId) => {
    setData((prev) => ({
      ...prev,
      isLoggedIn: true,
      activeRole: roleId,
    }));
    showToast(`Welcome! Logged in as ${roleId === 'parent' ? '👨‍👩‍👧 Parent' : roleId === 'child' ? '🧒 Child' : '⚡ Youth / Adult'}`);
  };

  const handleLogoutOrSwitch = () => {
    setData((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  // Save Custom Salary/Pocket Money counted via real banknotes & coins
  const handleSaveBudget = (newSalary) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.salaryOrIncome = newSalary;
      roleProf.dailyAllowance = Math.max(1, Math.round(newSalary / 30));
      // Re-allocate to Japanese 50/20/15/15 ratio
      roleProf.kakeibo = {
        needs: Math.round(newSalary * 0.5),
        wants: Math.round(newSalary * 0.2),
        culture: Math.round(newSalary * 0.15),
        unexpected: Math.round(newSalary * 0.15),
      };
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`✓ Monthly budget set to ₹${newSalary.toLocaleString('en-IN')}!`);
  };

  // Log expense via Cash Counter
  const handleLogSpend = (spend) => {
    setActiveSpendModal(spend);
  };

  // Finalize with Arigato Blessing & Record in Khata / Spending Log
  const handleArigatoBlessing = (blessedSpend) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      const newKakeibo = { ...roleProf.kakeibo };
      const cat = blessedSpend.category || 'needs';
      newKakeibo[cat] = (newKakeibo[cat] || 0) + blessedSpend.amount;
      roleProf.kakeibo = newKakeibo;

      const newLog = {
        id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        title: blessedSpend.title || 'Expense',
        amount: Number(blessedSpend.amount),
        category: cat,
        timestamp: Date.now(),
        dateStr: new Intl.DateTimeFormat('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(new Date()),
        prompt: blessedSpend.prompt,
      };

      roleProf.expenseLogs = [newLog, ...(roleProf.expenseLogs || [])];
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`🌸 ₹${blessedSpend.amount} logged in Hisab with Arigato gratitude!`);
  };

  // Direct Add Expense from Hisab Tab
  const handleDirectAddExpense = ({ title, amount, category }) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      const newKakeibo = { ...roleProf.kakeibo };
      const cat = category || 'needs';
      newKakeibo[cat] = (newKakeibo[cat] || 0) + amount;
      roleProf.kakeibo = newKakeibo;

      const newLog = {
        id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        title: title || 'Expense',
        amount: Number(amount),
        category: cat,
        timestamp: Date.now(),
        dateStr: new Intl.DateTimeFormat('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(new Date()),
      };

      roleProf.expenseLogs = [newLog, ...(roleProf.expenseLogs || [])];
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`✓ ₹${amount} saved in spending log!`);
  };

  // Delete an individual expense entry
  const handleDeleteExpense = (logId) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      const currentLogs = roleProf.expenseLogs || [];
      const itemToDelete = currentLogs.find((l) => l.id === logId);

      if (itemToDelete) {
        const newKakeibo = { ...roleProf.kakeibo };
        const cat = itemToDelete.category || 'needs';
        newKakeibo[cat] = Math.max(0, (newKakeibo[cat] || 0) - itemToDelete.amount);
        roleProf.kakeibo = newKakeibo;
      }

      roleProf.expenseLogs = currentLogs.filter((l) => l.id !== logId);
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`Deleted from spending log`);
  };

  // Reset entire month's expense history
  const handleResetMonth = () => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.expenseLogs = [];
      roleProf.kakeibo = { needs: 0, wants: 0, culture: 0, unexpected: 0 };
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`✓ Month reset for fresh Hisab tracking!`);
  };

  // Feed Gullak directly
  const handleAddFundsToGullak = (amount) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.gullakBalance += amount;
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`🏺 +₹${amount} safely stored in your Gullak!`);
  };

  // Reset Gullak Balance back to ₹0
  const handleResetGullak = () => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.gullakBalance = 0;
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`🏺 Gullak emptied & reset to ₹0!`);
  };

  // Parent Match Bonus
  const handleParentMatch = (bonus) => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.gullakBalance += bonus;
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`❤️ Parent added ₹${bonus} bonus match for honest saving!`);
  };

  // Add Item to Impulse Freezer
  const handleFreezeItem = ({ title, amount, imageUrl }) => {
    const newItem = {
      id: 'f_' + Date.now(),
      title,
      amount,
      imageUrl,
      createdAt: Date.now(),
      durationHours: 24,
      status: 'frozen',
    };
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.freezeItems = [newItem, ...(roleProf.freezeItems || [])];
      updatedProfiles[activeRole] = roleProf;

      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`❄️ "${title}" locked in 3D Ice Cube!`);
  };

  // Resolve Frozen Item (Saved vs Bought)
  const handleResolveFrozenItem = (id, resolution) => {
    const target = currentProfile.freezeItems?.find((i) => i.id === id);
    if (!target) return;

    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };

      if (resolution === 'saved') {
        roleProf.totalShieldedAmount = (roleProf.totalShieldedAmount || 0) + target.amount;
        roleProf.gullakBalance += Math.round(target.amount * 0.5); // 50% reward to Gullak
        roleProf.freezeItems = roleProf.freezeItems.filter((i) => i.id !== id);
      } else {
        roleProf.freezeItems = roleProf.freezeItems.filter((i) => i.id !== id);
      }

      updatedProfiles[activeRole] = roleProf;
      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });

    if (resolution === 'saved') {
      showToast(`🎉 Shabash! Kept ₹${target.amount} & saved bonus to Gullak!`);
    } else {
      showToast(`🛍️ Bought "${target.title}" mindfully with zero guilt.`);
    }
  };

  // Daily Vibe Check (Strictly 1 streak per calendar day!)
  const handleDailyVibeCheck = (vibe) => {
    const todayStr = new Date().toISOString().split('T')[0];

    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };

      const alreadyCheckedToday = roleProf.lastVibeCheckDate === todayStr;

      if (!alreadyCheckedToday) {
        // First check-in today -> increment streak by 1
        roleProf.streakDays = (roleProf.streakDays || 0) + 1;
        roleProf.lastVibeCheckDate = todayStr;
        roleProf.todayVibe = vibe;
      } else {
        // Already checked in today -> update vibe selection without adding duplicate streak
        roleProf.todayVibe = vibe;
      }

      updatedProfiles[activeRole] = roleProf;
      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });

    const isFirstToday = currentProfile.lastVibeCheckDate !== todayStr;
    if (isFirstToday) {
      showToast(`🔥 Day ${(currentProfile.streakDays || 0) + 1} Streak! Checked in for today.`);
    } else {
      showToast(`✓ Today's vibe updated to ${vibe === 'bachat' ? 'Bachat Day 🌿' : vibe === 'santulit' ? 'Santulit ☀️' : 'Kharchila 💖'} (1 streak per day)`);
    }
  };

  // Reset streak counter back to 0
  const handleResetStreak = () => {
    setData((prev) => {
      const updatedProfiles = { ...prev.profiles };
      const roleProf = { ...updatedProfiles[activeRole] };
      roleProf.streakDays = 0;
      roleProf.lastVibeCheckDate = null;
      roleProf.todayVibe = null;
      updatedProfiles[activeRole] = roleProf;
      return {
        ...prev,
        profiles: updatedProfiles,
      };
    });
    showToast(`↺ Streak reset to 0 days!`);
  };

  // IF USER HAS NOT SELECTED PERSONA / LOGGED IN, RENDER WELCOME LOGIN SCREEN
  if (data.isLoggedIn === false) {
    return <LoginScreen onSelectProfile={handleLoginProfile} />;
  }

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] flex flex-col antialiased selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Apple Ambient Mesh Diffused Glow */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-amber-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-1/4 w-96 h-96 bg-emerald-600/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Sleek Header displaying ONLY the logged in user profile */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        role={activeRole}
        onSwitchProfile={handleLogoutOrSwitch}
      />

      {/* Main Container (Extra bottom padding for native iOS floating tab bar) */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 space-y-4 pb-28">
        {/* Apple Wallet Style Monthly Income Card */}
        <div className="apple-card rounded-[26px] p-3.5 flex items-center justify-between text-xs transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4 fill-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block tracking-tight">
                {activeRole === 'parent'
                  ? `👨‍👩‍👧 Family Salary: ₹${currentProfile.salaryOrIncome.toLocaleString('en-IN')}/mo`
                  : activeRole === 'child'
                  ? `🧒 My Pocket Money: ₹${currentProfile.salaryOrIncome}/mo`
                  : `⚡ Monthly Stipend: ₹${currentProfile.salaryOrIncome.toLocaleString('en-IN')}/mo`}
              </span>
              <span className="text-[10px] text-stone-400 font-mono font-medium">
                ₹{currentProfile.dailyAllowance}/day daily limit
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              setShowBudgetModal(true);
            }}
            className="apple-pill hover:bg-white/10 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold text-emerald-300 border border-emerald-500/30 active:scale-95 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Tap real notes & coins to set your exact monthly income"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Count Cash</span>
          </button>
        </div>

        {/* View 1: Gullak & Counter Tab */}
        {activeTab === 'counter' && (
          <>
            <RealisticGullak
              balance={currentProfile.gullakBalance}
              dreamGoal={currentProfile.dreamGoal}
              onAddFunds={handleAddFundsToGullak}
              role={activeRole}
              onParentMatch={handleParentMatch}
              onResetGullak={handleResetGullak}
              externalAnimationEvent={flyingMoneyEvent}
            />

            <CashRegister
              onLogSpend={handleLogSpend}
              role={activeRole}
              onMoneyTapped={(evt) => setFlyingMoneyEvent({ ...evt, triggerId: Date.now() })}
            />

            <KalpavrikshaTree
              streakDays={currentProfile.streakDays || 0}
              todayVibe={currentProfile.todayVibe}
              isCheckedInToday={currentProfile.lastVibeCheckDate === new Date().toISOString().split('T')[0]}
              onDailyVibeCheck={handleDailyVibeCheck}
              onResetStreak={handleResetStreak}
              role={activeRole}
            />
          </>
        )}

        {/* View 2: Impulse Icebox (Mottainai 24h Freeze) */}
        {activeTab === 'icebox' && (
          <ImpulseFreezer
            items={currentProfile.freezeItems || []}
            onFreezeItem={handleFreezeItem}
            onResolveItem={handleResolveFrozenItem}
            totalShielded={currentProfile.totalShieldedAmount || 0}
          />
        )}

        {/* View 3: Kaizen Reels (Daily 30-Sec TikTok Swipe) */}
        {activeTab === 'reels' && (
          <div className="space-y-3">
            <div className="text-center py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Daily 30-Sec Kaizen Scroll 改善
              </span>
              <p className="text-xs text-stone-400">
                1 bite-sized micro-habit a day. Swipe to unlock wisdom.
              </p>
            </div>
            <KaizenReels onCardCompleted={() => showToast('🌸 Micro-win added to your streak!')} />
          </div>
        )}

        {/* View 4: Danshari Sorter */}
        {activeTab === 'danshari' && (
          <DanshariSorter />
        )}

        {/* View 5: Hisab & Budget Spend Log (Where Did I Spend? Where to Save Next Month?) */}
        {(activeTab === 'hisab' || activeTab === 'kakeibo') && (
          <HisabBudgetLog
            roleProfile={currentProfile}
            activeRole={activeRole}
            onAddExpense={handleDirectAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onResetMonth={handleResetMonth}
            onOpenBudgetModal={() => setShowBudgetModal(true)}
          />
        )}
      </main>

      {/* Set Monthly Budget via Real Currency Counter Modal */}
      {showBudgetModal && (
        <SetBudgetModal
          roleProfile={currentProfile}
          activeRole={activeRole}
          onClose={() => setShowBudgetModal(false)}
          onSaveBudget={handleSaveBudget}
        />
      )}

      {/* Arigato Modal */}
      {activeSpendModal && (
        <ArigatoModal
          spendData={activeSpendModal}
          onClose={() => setActiveSpendModal(null)}
          onBless={handleArigatoBlessing}
        />
      )}

      {/* Floating Emil Kowalski / Sonner-Style Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-white text-stone-900 rounded-full shadow-2xl text-xs font-bold border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
