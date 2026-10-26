import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Receipt,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Calendar,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  Wallet,
  Clock,
  Filter,
  RefreshCw,
  Coins
} from 'lucide-react';

export default function HisabBudgetLog({
  roleProfile,
  activeRole,
  onAddExpense,
  onDeleteExpense,
  onResetMonth,
  onOpenBudgetModal,
}) {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'needs' | 'wants' | 'culture' | 'unexpected'
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('needs');

  const salaryOrIncome = roleProfile?.salaryOrIncome || 0;
  const expenseLogs = roleProfile?.expenseLogs || [];
  const kakeibo = roleProfile?.kakeibo || { needs: 0, wants: 0, culture: 0, unexpected: 0 };
  const labels = roleProfile?.kakeiboLabels || {
    needs: { name: 'Zaroorat (Needs)', sub: 'Food, rent, bills, groceries', icon: '🏠' },
    wants: { name: 'Mauj (Wants)', sub: 'Dining, shopping, treats', icon: '🎈' },
    culture: { name: 'Gyaan (Growth)', sub: 'Books, skills, education', icon: '📚' },
    unexpected: { name: 'Achanak (Emergency)', sub: 'Repairs, health, buffers', icon: '🛡️' },
  };

  // Calculations
  const totalSpent = expenseLogs.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const remainingBudget = Math.max(0, salaryOrIncome - totalSpent);
  const spentPercent = salaryOrIncome > 0 ? Math.min(100, Math.round((totalSpent / salaryOrIncome) * 100)) : 0;

  // Category totals
  const catTotals = {
    needs: expenseLogs.filter(e => e.category === 'needs').reduce((a, b) => a + Number(b.amount || 0), 0),
    wants: expenseLogs.filter(e => e.category === 'wants').reduce((a, b) => a + Number(b.amount || 0), 0),
    culture: expenseLogs.filter(e => e.category === 'culture').reduce((a, b) => a + Number(b.amount || 0), 0),
    unexpected: expenseLogs.filter(e => e.category === 'unexpected').reduce((a, b) => a + Number(b.amount || 0), 0),
  };

  // Filtered expense list
  const filteredLogs = expenseLogs.filter((log) => {
    if (selectedFilter === 'all') return true;
    return log.category === selectedFilter;
  });

  // Next Month Saving Advice Engine (Kaizen Insights)
  const getNextMonthAdvice = () => {
    const adviceList = [];

    // 1. Wants evaluation
    const wantsPercent = totalSpent > 0 ? Math.round((catTotals.wants / totalSpent) * 100) : 0;
    if (catTotals.wants > 0 && wantsPercent > 25) {
      const suggestedCut = Math.round(catTotals.wants * 0.3);
      adviceList.push({
        type: 'warning',
        title: `High Spending on Mauj / Wants (${wantsPercent}% of spend)`,
        desc: `You spent ₹${catTotals.wants.toLocaleString('en-IN')} on non-essentials (Swiggy, outings, snacks).`,
        action: `Next Month Kaizen: Cut just 2-3 impulse orders to save ~₹${suggestedCut.toLocaleString('en-IN')} for your Gullak!`,
        icon: AlertTriangle,
        color: 'border-amber-500/30 bg-amber-950/20 text-amber-300',
      });
    }

    // 2. Small leaks detector (Transactions under ₹100)
    const microSpends = expenseLogs.filter(e => Number(e.amount) <= 100);
    const microTotal = microSpends.reduce((a, b) => a + Number(b.amount || 0), 0);
    if (microSpends.length >= 2) {
      adviceList.push({
        type: 'leak',
        title: `Chhutta Leaks: ${microSpends.length} small spends totaled ₹${microTotal}`,
        desc: `Small daily spends (₹20 - ₹80) add up quietly without noticing.`,
        action: `Next Month Tip: Set a daily cash limit or move ₹20 into Gullak before spending!`,
        icon: Coins,
        color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
      });
    }

    // 3. Culture / Learning investment
    const culturePercent = totalSpent > 0 ? Math.round((catTotals.culture / totalSpent) * 100) : 0;
    if (culturePercent < 10 && totalSpent > 0) {
      adviceList.push({
        type: 'growth',
        title: `Low Investment in Growth / Gyaan (${culturePercent}%)`,
        desc: `Japanese Ikigai recommends 15% on books, learning, and self-enrichment.`,
        action: `Next Month Idea: Re-allocate ₹300-₹500 from Mauj into a skill book or course.`,
        icon: Lightbulb,
        color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300',
      });
    }

    // 4. Budget remaining health
    if (salaryOrIncome > 0 && totalSpent > salaryOrIncome) {
      const overspent = totalSpent - salaryOrIncome;
      adviceList.push({
        type: 'danger',
        title: `Monthly Budget Exceeded by ₹${overspent.toLocaleString('en-IN')}`,
        desc: `Expenses surpassed your allocated income for this period.`,
        action: `Next Month Rule: Put 20% in Gullak on Day 1 (Pay yourself first) before opening wallet!`,
        icon: TrendingDown,
        color: 'border-rose-500/30 bg-rose-950/20 text-rose-300',
      });
    } else if (salaryOrIncome > 0 && totalSpent < salaryOrIncome * 0.7) {
      adviceList.push({
        type: 'success',
        title: `Great Discipline! Healthy Savings Surplus`,
        desc: `You have ₹${remainingBudget.toLocaleString('en-IN')} remaining unspent this month.`,
        action: `Next Month Plan: Sweep ₹${Math.round(remainingBudget * 0.5).toLocaleString('en-IN')} directly into Gullak gold fund!`,
        icon: Sparkles,
        color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
      });
    }

    return adviceList;
  };

  const adviceItems = getNextMonthAdvice();

  const handleCreateExpense = (e) => {
    e.preventDefault();
    const amt = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(amt) || amt <= 0) return;

    sounds.playNote();
    onAddExpense({
      title: newTitle.trim(),
      amount: amt,
      category: newCategory,
    });

    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4 select-none">
      {/* 1. Header Banner & Monthly Salary Context (Apple Card) */}
      <div className="apple-card rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-mono">
              <Receipt className="w-3.5 h-3.5" />
              Khata & Hisab (खर्च का हिसाब • Kakeibo)
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5 tracking-tight">
              Monthly Spending & Savings Log
            </h2>
            <p className="text-xs text-stone-400 font-medium">
              Track where every rupee went to save more next month
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 apple-pill text-emerald-300 hover:text-white rounded-full text-xs font-semibold transition active:scale-95 shadow-sm cursor-pointer border-emerald-500/30 hover:bg-white/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Spend</span>
          </button>
        </div>

        {/* Quick Add Expense Form Drawer */}
        {showAddForm && (
          <form onSubmit={handleCreateExpense} className="mt-4 p-4 apple-pill rounded-[24px] border border-white/[0.08] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-stone-300 font-mono">
              <span>+ Record New Kharcha / Spend</span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-stone-500 hover:text-white"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="What was it for? (e.g. Swiggy Lunch, Metro, Milk)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-3.5 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />

              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-stone-400 font-mono">₹</span>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Quick Amount Taps */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono no-scrollbar">
              <span className="text-stone-500 text-[10px]">Quick:</span>
              {[20, 50, 100, 200, 500].map((quick) => (
                <button
                  type="button"
                  key={quick}
                  onClick={() => setNewAmount(quick.toString())}
                  className="px-2.5 py-1 apple-pill hover:bg-white/10 text-stone-300 rounded-lg active:scale-95 transition cursor-pointer"
                >
                  ₹{quick}
                </button>
              ))}
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'needs', label: 'Needs (ज़्यादा ज़रूरी)' },
                { id: 'wants', label: 'Wants (मौज़/शौक)' },
                { id: 'culture', label: 'Gyaan (सीखना)' },
                { id: 'unexpected', label: 'Achanak (अचानक)' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setNewCategory(c.id)}
                  className={`text-[11px] px-3 py-1.5 rounded-xl font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap ${
                    newCategory === c.id
                      ? 'bg-white/20 text-white shadow-sm border border-white/20'
                      : 'apple-pill text-stone-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition cursor-pointer"
            >
              ✓ Save into Hisab Log
            </button>
          </form>
        )}

        {/* 3 Apple Metric Summary Blocks */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          {/* Monthly Budget / Salary */}
          <div className="p-3 apple-pill rounded-[22px] border border-white/[0.08]">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-medium">
              {roleProfile?.incomeLabel || 'Monthly Budget'}
            </span>
            <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight mt-0.5 block">
              ₹{salaryOrIncome.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => {
                sounds.playTap();
                onOpenBudgetModal();
              }}
              className="text-[9px] font-bold text-emerald-400 hover:underline block mt-0.5 mx-auto font-mono"
            >
              Edit ✎
            </button>
          </div>

          {/* Total Spent */}
          <div className="p-3 apple-pill rounded-[22px] border border-white/[0.08]">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-medium">
              Total Spent
            </span>
            <span className={`text-base sm:text-lg font-black font-mono tracking-tight mt-0.5 block ${totalSpent > salaryOrIncome && salaryOrIncome > 0 ? 'text-rose-400' : 'text-amber-400'}`}>
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] font-medium text-stone-500 font-mono block mt-0.5">
              {spentPercent}% used
            </span>
          </div>

          {/* Safe Remaining */}
          <div className="p-3 apple-pill rounded-[22px] border border-white/[0.08]">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-medium">
              Remaining Safe
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono tracking-tight mt-0.5 block">
              ₹{remainingBudget.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] font-medium text-emerald-400/80 font-mono block mt-0.5">
              {expenseLogs.length} items
            </span>
          </div>
        </div>

        {/* Visual Spent Progress Bar */}
        <div className="mt-3.5">
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                spentPercent > 90
                  ? 'bg-rose-500'
                  : spentPercent > 60
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. NEXT MONTH SAVINGS ADVISOR (Apple Card) */}
      <div className="apple-card rounded-[32px] p-6 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Next Month Saving Insights (अगले महीने बचत)
              </h3>
              <p className="text-[10px] text-stone-400 font-medium">
                Actionable tips to prevent overspending next month
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400 font-bold apple-pill px-2.5 py-0.5 rounded-full border-amber-500/30">
            Kaizen 改善
          </span>
        </div>

        {/* Advice Cards List */}
        {adviceItems.length > 0 ? (
          <div className="space-y-2.5 pt-1">
            {adviceItems.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-[22px] border ${adv.color} space-y-1 transition hover:brightness-110`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{adv.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 font-medium">
                    {adv.desc}
                  </p>
                  <p className="text-xs font-bold text-white pt-1 flex items-center gap-1.5 font-mono">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {adv.action}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-stone-400 apple-pill rounded-[22px] border border-white/[0.08]">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1.5 animate-pulse" />
            <span>Log a few expenses below using banknotes & coins, and ZenGullak will reveal exactly where you can cut costs next month!</span>
          </div>
        )}
      </div>

      {/* 3. Kakeibo 4 Pillars Breakdown (Apple Card) */}
      <div className="apple-card rounded-[32px] p-6 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Category Wise Spend (4 Kakeibo Pillars)
            </h3>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">Ideal Ratio 50/20/15/15</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Needs */}
          <div
            onClick={() => setSelectedFilter(selectedFilter === 'needs' ? 'all' : 'needs')}
            className={`p-3.5 rounded-[22px] border transition cursor-pointer active:scale-95 ${
              selectedFilter === 'needs' ? 'border-emerald-500 bg-emerald-950/40 shadow-sm' : 'apple-pill hover:border-emerald-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1">{labels.needs.icon} Needs</span>
              <span className="text-[10px] font-mono text-emerald-400">50% Target</span>
            </div>
            <div className="text-base font-black text-white font-mono mt-1">
              ₹{catTotals.needs.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-stone-400 truncate mt-0.5 font-medium">
              {labels.needs.sub}
            </p>
          </div>

          {/* Wants */}
          <div
            onClick={() => setSelectedFilter(selectedFilter === 'wants' ? 'all' : 'wants')}
            className={`p-3.5 rounded-[22px] border transition cursor-pointer active:scale-95 ${
              selectedFilter === 'wants' ? 'border-amber-500 bg-amber-950/40 shadow-sm' : 'apple-pill hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1">{labels.wants.icon} Wants</span>
              <span className="text-[10px] font-mono text-amber-400">20% Target</span>
            </div>
            <div className="text-base font-black text-white font-mono mt-1">
              ₹{catTotals.wants.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-stone-400 truncate mt-0.5 font-medium">
              {labels.wants.sub}
            </p>
          </div>

          {/* Culture / Growth */}
          <div
            onClick={() => setSelectedFilter(selectedFilter === 'culture' ? 'all' : 'culture')}
            className={`p-3.5 rounded-[22px] border transition cursor-pointer active:scale-95 ${
              selectedFilter === 'culture' ? 'border-indigo-500 bg-indigo-950/40 shadow-sm' : 'apple-pill hover:border-indigo-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1">{labels.culture.icon} Culture</span>
              <span className="text-[10px] font-mono text-indigo-400">15% Target</span>
            </div>
            <div className="text-base font-black text-white font-mono mt-1">
              ₹{catTotals.culture.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-stone-400 truncate mt-0.5 font-medium">
              {labels.culture.sub}
            </p>
          </div>

          {/* Unexpected / Leaks */}
          <div
            onClick={() => setSelectedFilter(selectedFilter === 'unexpected' ? 'all' : 'unexpected')}
            className={`p-3.5 rounded-[22px] border transition cursor-pointer active:scale-95 ${
              selectedFilter === 'unexpected' ? 'border-rose-500 bg-rose-950/40 shadow-sm' : 'apple-pill hover:border-rose-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1">{labels.unexpected.icon} Achanak</span>
              <span className="text-[10px] font-mono text-rose-400">15% Target</span>
            </div>
            <div className="text-base font-black text-white font-mono mt-1">
              ₹{catTotals.unexpected.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-stone-400 truncate mt-0.5 font-medium">
              {labels.unexpected.sub}
            </p>
          </div>
        </div>
      </div>

      {/* 4. PASSBOOK / TRANSACTION EXPENSE LEDGER (Apple Card) */}
      <div className="apple-card rounded-[32px] p-6 shadow-2xl space-y-3.5">
        {/* Ledger Header & Category Filters */}
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Spending History ({filteredLogs.length})
            </h3>
          </div>

          {expenseLogs.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all expense logs for this month and start fresh?')) {
                  sounds.playTap();
                  onResetMonth();
                }
              }}
              className="text-[10px] text-stone-500 hover:text-rose-400 apple-pill px-2.5 py-1 rounded-full flex items-center gap-1 transition cursor-pointer font-mono"
              title="Reset expense history for a new month"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Month</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'needs', label: 'Needs 🏠' },
            { id: 'wants', label: 'Wants 🎈' },
            { id: 'culture', label: 'Gyaan 📚' },
            { id: 'unexpected', label: 'Achanak 🛡️' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sounds.playTap();
                setSelectedFilter(f.id);
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition active:scale-95 cursor-pointer flex-shrink-0 ${
                selectedFilter === f.id
                  ? 'bg-white/20 text-white shadow-sm border border-white/20'
                  : 'apple-pill text-stone-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List of Logged Expenses */}
        <div className="space-y-2 pt-1 max-h-[420px] overflow-y-auto cash-tray-scroll pr-1">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => {
              const catIcon =
                log.category === 'needs' ? '🏠' :
                log.category === 'wants' ? '🎈' :
                log.category === 'culture' ? '📚' : '🛡️';

              const catBadgeColor =
                log.category === 'needs' ? 'text-emerald-400 border-emerald-500/25 bg-emerald-950/30' :
                log.category === 'wants' ? 'text-amber-400 border-amber-500/25 bg-amber-950/30' :
                log.category === 'culture' ? 'text-indigo-400 border-indigo-500/25 bg-indigo-950/30' :
                'text-rose-400 border-rose-500/25 bg-rose-950/30';

              return (
                <div
                  key={log.id}
                  className="p-3.5 apple-pill rounded-[22px] border border-white/[0.06] flex items-center justify-between gap-3 hover:border-white/15 transition active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl flex-shrink-0">{catIcon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate tracking-tight">
                        {log.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono mt-0.5">
                        <span>{log.dateStr || 'Recent'}</span>
                        <span className={`px-1.5 py-0.2 rounded-full border uppercase text-[8px] font-bold ${catBadgeColor}`}>
                          {log.category}
                        </span>
                      </div>
                      {log.prompt && (
                        <p className="text-[10px] text-rose-300/80 italic mt-0.5 truncate font-medium">
                          {log.prompt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm sm:text-base font-black text-white font-mono">
                      ₹{Number(log.amount).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => {
                        sounds.playTap();
                        onDeleteExpense(log.id);
                      }}
                      className="p-1.5 text-stone-500 hover:text-rose-400 rounded-full hover:bg-white/10 transition cursor-pointer"
                      title="Delete this entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center apple-pill rounded-[24px] border border-white/[0.06] p-4">
              <Receipt className="w-8 h-8 text-stone-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-300">
                Koi kharcha log nahi hua (No records yet)
              </p>
              <p className="text-[11px] text-stone-500 mt-1 max-w-xs mx-auto">
                Use the Cash Register or the Gullak above to tap banknotes and coins, or tap '+ Add Spend' above to log your daily expenses.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
