'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '@/data/electionProcess';
import { Info, Box } from 'lucide-react';

interface Candidate {
  id: string;
  name: { en: string; hi: string };
  symbol: string;
  party: { en: string; hi: string };
}

const mockCandidates: Candidate[] = [
  { id: '1', name: { en: 'Aarav Sharma', hi: 'आरव शर्मा' }, symbol: '🌸', party: { en: 'Vikas Party', hi: 'विकास पार्टी' } },
  { id: '2', name: { en: 'Priya Patel', hi: 'प्रिया पटेल' }, symbol: '🚲', party: { en: 'Janata Dal', hi: 'जनता दल' } },
  { id: '3', name: { en: 'Rahul Singh', hi: 'राहुल सिंह' }, symbol: '🐘', party: { en: 'Bahujan Samaj', hi: 'बहुजन समाज' } },
  { id: '4', name: { en: 'NOTA', hi: 'इनमें से कोई नहीं (NOTA)' }, symbol: '❌', party: { en: 'None of the Above', hi: 'इनमें से कोई नहीं' } },
];

export default function EVMSimulator({ lang }: { lang: Language }) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [showVVPAT, setShowVVPAT] = useState(false);

  const t = {
    en: {
      title: 'EVM & VVPAT Simulator',
      subtitle: 'Experience how casting a vote works in India. Click a blue button to cast your vote.',
      ballotUnit: 'Balloting Unit (EVM)',
      readyLight: 'Ready',
      votedLight: 'Voted',
      vvpat: 'VVPAT Machine',
      vvpatDesc: 'Your vote receipt will appear here for 7 seconds.',
      reset: 'Reset Simulator',
      beep: 'BEEEEEP! (Vote Recorded)',
      instructions: '1. Wait for the green "Ready" light.  2. Press the blue button next to your chosen candidate.  3. Hear the beep.  4. Verify your vote on the VVPAT screen.',
    },
    hi: {
      title: 'EVM और VVPAT सिम्युलेटर',
      subtitle: 'अनुभव करें कि भारत में वोट कैसे डाला जाता है। अपना वोट डालने के लिए नीले बटन पर क्लिक करें।',
      ballotUnit: 'बैलेटिंग यूनिट (EVM)',
      readyLight: 'तैयार',
      votedLight: 'मतदान हुआ',
      vvpat: 'VVPAT मशीन',
      vvpatDesc: 'आपके वोट की रसीद यहाँ 7 सेकंड के लिए दिखाई देगी।',
      reset: 'सिम्युलेटर रीसेट करें',
      beep: 'बीप! (वोट दर्ज हो गया)',
      instructions: '1. हरी "तैयार" बत्ती की प्रतीक्षा करें।  2. अपने चुने हुए उम्मीदवार के आगे नीला बटन दबाएं।  3. बीप की आवाज सुनें।  4. VVPAT स्क्रीन पर अपना वोट सत्यापित करें।',
    }
  }[lang];

  const handleVote = (candidate: Candidate) => {
    if (isVoted) return;
    setSelectedCandidate(candidate);
    setIsVoted(true);
    setShowVVPAT(true);
  };

  useEffect(() => {
    if (showVVPAT) {
      const timer = setTimeout(() => setShowVVPAT(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [showVVPAT]);

  const handleReset = () => {
    setIsVoted(false);
    setSelectedCandidate(null);
    setShowVVPAT(false);
  };

  return (
    <div className="bg-white border border-outline-variant rounded p-6 max-w-4xl mx-auto" style={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Box className="text-primary-container" size={22} />
          <h3 className="text-[24px] font-medium text-on-surface">{t.title}</h3>
        </div>
        <p className="text-[14px] text-on-surface-variant max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Instructions */}
      <div className="bg-primary-fixed border border-primary-fixed-dim rounded p-4 mb-6 flex items-start gap-3">
        <Info className="text-primary shrink-0 mt-[2px]" size={18} />
        <p className="text-[13px] leading-[1.5] text-primary">{t.instructions}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">

        {/* EVM Balloting Unit */}
        <div className="bg-surface-container-high p-5 rounded w-full md:w-1/2 border border-outline-variant relative">
          <div className="flex justify-between items-center mb-5 bg-on-surface p-3 rounded text-white text-[13px] font-medium">
            <span>{t.ballotUnit}</span>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${!isVoted ? 'bg-green animate-pulse shadow-[0_0_8px_#34A853]' : 'bg-green/20'}`} />
                <span className="text-[9px] uppercase tracking-wider">{t.readyLight}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${isVoted ? 'bg-secondary-container shadow-[0_0_8px_#d9372b]' : 'bg-secondary-container/20'}`} />
                <span className="text-[9px] uppercase tracking-wider">{t.votedLight}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {mockCandidates.map((candidate, idx) => (
              <div key={candidate.id} className="flex items-center bg-white border border-outline-variant rounded p-2">
                <div className="w-8 text-center font-semibold text-on-surface-variant border-r border-outline-variant pr-2 text-[14px]">
                  {idx + 1}
                </div>
                <div className="flex-1 px-3 flex justify-between items-center">
                  <span className="font-medium text-on-surface text-[14px]">{candidate.name[lang]}</span>
                  <span className="text-2xl">{candidate.symbol}</span>
                </div>
                <div className="flex items-center gap-3 pl-3 border-l border-outline-variant">
                  <div className={`w-3 h-3 rounded-full ${isVoted && selectedCandidate?.id === candidate.id ? 'bg-secondary-container shadow-[0_0_6px_#d9372b]' : 'bg-outline-variant'}`} />
                  <button
                    onClick={() => handleVote(candidate)}
                    disabled={isVoted}
                    className={`w-12 h-7 rounded-full border-2 border-[#004493] transition-all shadow-inner
                      ${isVoted ? 'bg-primary-fixed-dim cursor-not-allowed opacity-60' : 'bg-primary-container hover:bg-primary active:scale-95 cursor-pointer'}
                    `}
                  />
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {isVoted && showVVPAT && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-secondary-container font-semibold text-[14px] animate-pulse"
              >
                {t.beep}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* VVPAT Unit */}
        <div className="bg-surface-container-high p-5 rounded w-full md:w-56 border border-outline-variant flex flex-col">
          <div className="bg-on-surface p-2 rounded text-white text-center text-[13px] font-medium mb-4">
            {t.vvpat}
          </div>
          <div className="flex-1 bg-on-surface rounded border-[6px] border-outline p-2 flex flex-col items-center justify-center relative overflow-hidden h-44">
            {!showVVPAT ? (
              <span className="text-outline text-[11px] text-center px-4">{t.vvpatDesc}</span>
            ) : (
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-[90%] py-4 px-2 border border-outline-variant flex flex-col items-center"
              >
                <span className="text-[12px] font-semibold text-on-surface border-b border-on-surface w-full text-center pb-1 mb-2">SL No: 8294</span>
                <span className="text-3xl mb-2">{selectedCandidate?.symbol}</span>
                <span className="text-[16px] font-semibold text-on-surface text-center leading-tight">{selectedCandidate?.name[lang]}</span>
                <span className="text-[11px] text-outline mt-1">{selectedCandidate?.party[lang]}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {isVoted && (
        <div className="mt-14 text-center">
          <button
            onClick={handleReset}
            className="px-5 py-2 border border-outline-variant text-on-surface-variant rounded-full hover:bg-surface-container transition-colors text-[13px] font-medium"
          >
            {t.reset}
          </button>
        </div>
      )}
    </div>
  );
}
