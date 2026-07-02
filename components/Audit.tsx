import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── helpers ─── */
const fmt = (n: number) => '$' + Math.round(n).toLocaleString();
const num = (n: number) => Math.round(n).toLocaleString();

/* ─── Segmented Button Group ─── */
const SegmentedGroup: React.FC<{
  options: { label: string; value: string }[];
  selected: string;
  onChange: (v: string) => void;
  columns?: number;
}> = ({ options, selected, onChange, columns = 3 }) => (
  <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
          selected === opt.value
            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.06]'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

/* ─── Animated Number ─── */
const AnimatedNumber: React.FC<{ value: number; prefix?: string; className?: string }> = ({ value, prefix = '$', className = '' }) => {
  const [displayed, setDisplayed] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = displayed;
    const diff = value - start;
    const duration = 400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span className={className}>{prefix}{displayed.toLocaleString()}</span>;
};

/* ─── FAQ Item Component ─── */
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-white font-semibold text-[15px] group-hover:text-emerald-400 transition-colors pr-4">{q}</span>
        <span className={`text-gray-500 group-hover:text-emerald-400 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-[#949494] text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

/* ─── Main Audit Component ─── */
const Audit: React.FC = () => {
  const [trade, setTrade] = useState('');
  const [jobValue, setJobValue] = useState(1500);
  const [inbound, setInbound] = useState(25);
  const [missed, setMissed] = useState(30);
  const [followup, setFollowup] = useState('sometimes');
  const [ads, setAds] = useState(false);
  const [adLeads, setAdLeads] = useState(10);
  const [adFast, setAdFast] = useState(3);
  const [adFollowup, setAdFollowup] = useState(false);
  const [afterhours, setAfterhours] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  // Constrain adFast
  useEffect(() => {
    if (adFast > adLeads) setAdFast(adLeads);
  }, [adLeads, adFast]);

  /* ─── Calculations ─── */
  const missedOrg = inbound * (missed / 100);
  const lossMissed = missedOrg * 0.30 * jobValue * 52;

  let slowAd = 0, lossAds = 0;
  if (ads) {
    slowAd = Math.max(0, adLeads - adFast);
    lossAds = slowAd * 0.25 * jobValue * 52;
  }

  const orgAnswered = inbound * (1 - missed / 100);
  const orgMult: Record<string, number> = { never: 1.0, sometimes: 0.5, always: 0.0 };
  let followupBase = orgAnswered * (orgMult[followup] ?? 0.5);
  if (ads && !adFollowup) followupBase += adFast;
  const lossFollowup = followupBase * 0.15 * jobValue * 52;

  const totalWeekly = inbound + (ads ? adLeads : 0);
  const invisible = afterhours ? 0 : totalWeekly * 0.43;
  const lossAfterhours = invisible * 0.30 * jobValue * 52;

  const total = lossMissed + lossAds + lossFollowup + lossAfterhours;
  const jobsLost = jobValue > 0 ? Math.round(total / jobValue) : 0;
  const recoverable = total * 0.65;

  const losses = [
    { label: 'Missed calls', value: lossMissed, sub: 'Organic leads lost', icon: '📞' },
    { label: 'Slow ad response', value: lossAds, sub: 'Paid leads wasted', icon: '⏱️' },
    { label: 'No follow-up', value: lossFollowup, sub: 'Warm leads gone cold', icon: '🔄' },
    { label: 'After-hours leak', value: lossAfterhours, sub: 'Nights & weekends', icon: '🌙' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[70vw] h-[70vw] rounded-full blur-[200px] bg-emerald-500 opacity-[0.08]" style={{ left: '-10%', top: '-20%' }} />
        <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[180px] bg-teal-600 opacity-[0.06]" style={{ right: '-5%', top: '30%' }} />
        <div className="absolute w-[60vw] h-[40vw] rounded-full blur-[220px] bg-[#064e3b] opacity-[0.05]" style={{ left: '10%', bottom: '-10%' }} />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 z-50 w-full h-20 bg-[#011a13] border-b border-emerald-900/40 backdrop-blur-xl flex items-center shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <img src="/assets/logo.png" alt="GrownexAI Logo" className="w-full h-full object-cover" />
            </div>
            <img src="/assets/grownexai_text.png" alt="GrownexAI" className="h-8 md:h-10 object-contain" />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-400 text-[15px] font-medium hover:text-emerald-400 transition-colors hidden md:block">← Back to Home</Link>
            <a
              href="https://cal.com/kiran-grownexai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold py-2.5 px-6 rounded-lg text-[15px] transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Book a call
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-20">

        {/* ─── Hero ─── */}
        <section className="pt-16 md:pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs md:text-[13px] font-bold mb-6 backdrop-blur-md">
                <span className="animate-pulse">📊</span>
                Free Revenue Leak Calculator
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] text-white headline-style tracking-tight"
            >
              How much is your phone<br />
              <span className="text-emerald-400">costing you?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#b4b4b4] text-sm md:text-lg max-w-[680px] mx-auto leading-relaxed mb-10 font-medium"
            >
              A 90-second audit shows the exact revenue walking past your business every month — missed calls, slow callbacks, dropped follow-ups, and after-hours leaks.
            </motion.p>
          </div>
        </section>

        {/* ─── Stat Hook ─── */}
        <section className="px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="text-5xl md:text-6xl font-bold text-red-400 tracking-tight flex-shrink-0" style={{ letterSpacing: '-0.03em' }}>
                $47k
              </div>
              <p className="text-[#949494] text-sm md:text-[15px] leading-relaxed">
                Average annual revenue a 5-person home service business loses to slow callbacks, missed follow-ups, and after-hours leaks. Most owners are surprised by how big it is.
              </p>
            </div>
          </motion.div>
        </section>



        {/* ─── THE CALCULATOR ─── */}
        <section className="px-4 md:px-6 pb-20" id="calculator">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-[900px] mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center headline-style tracking-tight">
              Find <span className="text-emerald-400">your number</span>
            </h2>

            <div className="rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.04)]">

              {/* ── Inputs Section ── */}
              <div className="p-6 md:p-10">

                {/* Trade */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 font-medium mb-2">What service do you offer?</label>
                  <input
                    type="text"
                    value={trade}
                    onChange={e => setTrade(e.target.value)}
                    placeholder="e.g., HVAC, plumbing, carpet cleaning, junk removal"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>

                {/* Job Value */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <label className="text-sm text-gray-400 font-medium">Average job value</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      value={jobValue || ''}
                      onChange={e => setJobValue(parseFloat(e.target.value) || 0)}
                      min="0"
                      className="w-28 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm text-right focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Divider: Organic Leads */}
                <div className="border-t border-white/[0.06] pt-6 mb-6">
                  <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Organic Leads
                  </h3>

                  {/* Leads per week */}
                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm text-gray-400 font-medium">Leads per week <span className="text-gray-600">(website, GMB, referrals)</span></label>
                      <span className="text-white font-semibold text-sm tabular-nums">{inbound}</span>
                    </div>
                    <input
                      type="range" min="0" max="200" step="1" value={inbound}
                      onChange={e => setInbound(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>

                  {/* Missed callbacks */}
                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm text-gray-400 font-medium">Missed or slow callbacks</label>
                      <span className="text-white font-semibold text-sm tabular-nums">{missed}%</span>
                    </div>
                    <input
                      type="range" min="0" max="100" step="1" value={missed}
                      onChange={e => setMissed(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                    <p className="text-gray-600 text-xs mt-1">No answer, voicemail, or called back after an hour</p>
                  </div>

                  {/* Follow-up */}
                  <div className="mb-2">
                    <label className="block text-sm text-gray-400 font-medium mb-2">Follow-up on unclosed organic leads</label>
                    <SegmentedGroup
                      options={[
                        { label: 'Never', value: 'never' },
                        { label: 'Sometimes', value: 'sometimes' },
                        { label: 'Always', value: 'always' },
                      ]}
                      selected={followup}
                      onChange={setFollowup}
                    />
                  </div>
                </div>

                {/* Divider: Paid Ads */}
                <div className="border-t border-white/[0.06] pt-6 mb-6">
                  <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Paid Ads
                  </h3>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 font-medium mb-2">Running ads? <span className="text-gray-600">(Google, Meta, LSAs)</span></label>
                    <SegmentedGroup
                      options={[{ label: 'No', value: 'no' }, { label: 'Yes', value: 'yes' }]}
                      selected={ads ? 'yes' : 'no'}
                      onChange={v => setAds(v === 'yes')}
                      columns={2}
                    />
                  </div>

                  <div className={`transition-all duration-300 ${ads ? 'opacity-100 max-h-[600px]' : 'opacity-30 max-h-0 overflow-hidden pointer-events-none'}`}>
                    <div className="mb-6">
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-sm text-gray-400 font-medium">Ad leads per week</label>
                        <span className="text-white font-semibold text-sm tabular-nums">{adLeads}</span>
                      </div>
                      <input
                        type="range" min="0" max="100" step="1" value={adLeads}
                        onChange={e => setAdLeads(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-sm text-gray-400 font-medium">Called within 5 minutes</label>
                        <span className="text-white font-semibold text-sm tabular-nums">{adFast} of {adLeads}</span>
                      </div>
                      <input
                        type="range" min="0" max={adLeads} step="1" value={adFast}
                        onChange={e => setAdFast(Math.min(parseInt(e.target.value), adLeads))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                      <p className="text-gray-600 text-xs mt-1">Leads contacted in 5 min are ~21x more likely to close (MIT)</p>
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm text-gray-400 font-medium mb-2">Follow up with ad leads via SMS/call every 2 days?</label>
                      <SegmentedGroup
                        options={[{ label: 'No', value: 'no' }, { label: 'Yes', value: 'yes' }]}
                        selected={adFollowup ? 'yes' : 'no'}
                        onChange={v => setAdFollowup(v === 'yes')}
                        columns={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider: Coverage */}
                <div className="border-t border-white/[0.06] pt-6 mb-8">
                  <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Coverage
                  </h3>

                  <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">Answer after-hours and weekends?</div>
                      <div className="text-xs text-gray-500 mt-1">~30% of home service calls fall outside business hours</div>
                    </div>
                    <SegmentedGroup
                      options={[{ label: 'No', value: 'no' }, { label: 'Yes', value: 'yes' }]}
                      selected={afterhours ? 'yes' : 'no'}
                      onChange={v => setAfterhours(v === 'yes')}
                      columns={2}
                    />
                  </div>
                </div>
              </div>

              {/* ── Results Section ── */}
              <div className="border-t border-white/[0.06] bg-gradient-to-b from-emerald-950/20 to-transparent">
                <div className="p-6 md:p-10">

                  {/* Big Number */}
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm mb-2">You're walking away from</p>
                    <div className="text-5xl md:text-7xl font-bold tracking-tight text-red-400" style={{ letterSpacing: '-0.03em' }}>
                      <AnimatedNumber value={total} />
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      a year — about <span className="text-white font-semibold">{num(jobsLost)} jobs</span> walking out the door
                    </p>
                  </div>

                  {/* Loss Cards Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {losses.map((l, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-emerald-500/20 transition-all"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <div className="text-lg mb-1">{l.icon}</div>
                        <p className="text-xs text-gray-500 mb-1">{l.label}</p>
                        <p className="text-xl font-bold text-white">{fmt(l.value)}</p>
                        <p className="text-[11px] text-gray-600 mt-1">{l.sub}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pro tip */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 mb-8">
                    <p className="text-emerald-300 text-xs leading-relaxed">
                      ⚡ Top performers answer 95%+ of calls, respond to ad leads in under 2 minutes, and follow up on every lead until it closes or dies.
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://cal.com/kiran-grownexai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-4 px-6 rounded-xl bg-[#00ffa3] hover:bg-[#00e692] text-black font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_40px_rgba(0,255,163,0.3)]"
                  >
                    See how to recover {fmt(recoverable)} of this ↗
                  </a>

                  {/* Math Breakdown */}
                  <div className="mt-8 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                    <button
                      onClick={() => setMathOpen(!mathOpen)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-white">How we calculate this</h3>
                      <span className="text-gray-500 text-xs">{mathOpen ? 'Hide ↑' : 'Show ↓'}</span>
                    </button>

                    <div className={`transition-all duration-300 ${mathOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="px-4 md:px-5 pb-5 space-y-0">

                        {/* Missed organic */}
                        <div className="py-4 border-t border-white/[0.06]">
                          <p className="text-sm font-semibold text-white mb-1">Missed organic calls</p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            <strong className="text-gray-300">{num(missedOrg)}</strong> missed leads/wk × <strong className="text-gray-300">30%</strong> close rate × <strong className="text-gray-300">{fmt(jobValue)}</strong>/job × <strong className="text-gray-300">52</strong> weeks = <span className="text-emerald-400 font-semibold">{fmt(lossMissed)}</span>/year
                          </p>
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">If you'd answered fast, ~30% of those leads would have booked. Industry close rates for home service inbound run 25–40%; we use the conservative middle.</p>
                        </div>

                        {/* Slow ads */}
                        <div className="py-4 border-t border-white/[0.06]">
                          <p className="text-sm font-semibold text-white mb-1">Slow ad response</p>
                          {!ads ? (
                            <p className="text-sm text-gray-600 italic">Not running ads — no loss here.</p>
                          ) : (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              <strong className="text-gray-300">{num(slowAd)}</strong> slow ad leads/wk × <strong className="text-gray-300">25%</strong> lost close rate × <strong className="text-gray-300">{fmt(jobValue)}</strong>/job × <strong className="text-gray-300">52</strong> weeks = <span className="text-emerald-400 font-semibold">{fmt(lossAds)}</span>/year
                            </p>
                          )}
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Ad leads called in 5 minutes close at ~35%. After 30 minutes that drops to ~10% — a 25-point gap. Source: MIT Lead Response Management Study.</p>
                        </div>

                        {/* No follow-up */}
                        <div className="py-4 border-t border-white/[0.06]">
                          <p className="text-sm font-semibold text-white mb-1">No follow-up</p>
                          {followupBase < 0.5 ? (
                            <p className="text-sm text-gray-600 italic">Already following up on every lead — no loss here.</p>
                          ) : (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              <strong className="text-gray-300">{num(followupBase)}</strong> un-followed-up leads/wk × <strong className="text-gray-300">15%</strong> recovery × <strong className="text-gray-300">{fmt(jobValue)}</strong>/job × <strong className="text-gray-300">52</strong> weeks = <span className="text-emerald-400 font-semibold">{fmt(lossFollowup)}</span>/year
                            </p>
                          )}
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Consistent follow-up recovers ~15% of leads that didn't close on first contact. Source: National Sales Executive Association — 80% of sales need 5+ touches.</p>
                        </div>

                        {/* After-hours */}
                        <div className="py-4 border-t border-white/[0.06]">
                          <p className="text-sm font-semibold text-white mb-1">After-hours leak</p>
                          {afterhours ? (
                            <p className="text-sm text-gray-600 italic">Already covering after-hours — no loss here.</p>
                          ) : (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              <strong className="text-gray-300">{num(invisible)}</strong> invisible after-hours leads/wk × <strong className="text-gray-300">30%</strong> close × <strong className="text-gray-300">{fmt(jobValue)}</strong>/job × <strong className="text-gray-300">52</strong> weeks = <span className="text-emerald-400 font-semibold">{fmt(lossAfterhours)}</span>/year
                            </p>
                          )}
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Roughly 30% of home service calls fall outside 9–5. We estimate invisible after-hours volume as 43% of your daytime leads.</p>
                        </div>

                        {/* Recoverable */}
                        <div className="py-4 border-t border-emerald-500/20">
                          <p className="text-sm font-semibold text-emerald-400 mb-1">Recoverable amount (65%)</p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            <strong className="text-gray-300">{fmt(total)}</strong> total loss × <strong className="text-gray-300">65%</strong> realistic recovery = <span className="text-emerald-400 font-semibold">{fmt(recoverable)}</span>/year
                          </p>
                          <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Realistic ceiling for a speed-to-lead system. Theoretical max is 85–90%, but we stay at 65% because no system catches every lead.</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>



        {/* ─── FAQ ─── */}
        <section className="px-6 py-16 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 headline-style tracking-tight text-center">Common questions</h2>
            {[
              { q: 'Where do these numbers come from?', a: 'Every constant is sourced from public industry research — MIT Lead Response Study, National Sales Executive Association, and home service platform data. The math is fully visible in the audit.' },
              { q: 'Is this just a sales tool?', a: "It's a real audit you can use even if you never buy anything from us. Numbers are deliberately conservative." },
              { q: 'What if I already have a CRM or answering service?', a: "The audit shows you what's still leaking through. Most businesses with basic tools still lose 40–60% of what we measure here." },
              { q: 'How accurate is my number?', a: "Directional, not exact. The point is to size the problem so you can decide if it's worth fixing — not to predict your books to the dollar." },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-20 px-6 bg-transparent">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#064e3b]/80 via-[#022c22]/90 to-[#030405]/95 backdrop-blur-sm border border-white/5 p-12 md:p-20 text-center">
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}
              />
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-900/30 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight headline-style">
                  Fix the revenue leak
                </h2>
                <p className="text-[#a5a5a5] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  The audit is free. The math is transparent. The number might sting.
                </p>
                <a
                  href="https://cal.com/kiran-grownexai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00ffa3] hover:bg-[#00e692] text-black font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,255,163,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 inline-block"
                >
                  Book a call ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-12 px-6 bg-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#555] text-[15px] font-medium tracking-tight">
              ©2025 Grownexai right reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Audit;
