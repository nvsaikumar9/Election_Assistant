'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, UserCheck, ExternalLink } from 'lucide-react';
import { Language } from '@/data/electionProcess';
import { electionWatchData } from '@/data/electionWatch';

export default function EligibilityWizard({ lang }: { lang: Language }) {
  const [showElections, setShowElections] = useState(false);

  const ongoingElections = electionWatchData.filter(e => e.isOngoing);

  const t = {
    en: {
      title: "Voter Eligibility",
      subtitle: "Review the criteria below to check if you can vote.",
      crit1: "You must be an Indian Citizen.",
      crit2: "You must be 18 years of age or older.",
      crit3: "Your name must be on the Electoral Roll (Voter List).",
      readyBtn: "I meet these criteria — View Ongoing Elections",
      electionsTitle: "Ongoing Elections",
      noElections: "There are currently no ongoing elections.",
      backBtn: "Back to Criteria"
    },
    hi: {
      title: "मतदाता पात्रता",
      subtitle: "यह देखने के लिए नीचे दिए गए मानदंडों की समीक्षा करें कि क्या आप मतदान कर सकते हैं।",
      crit1: "आपको एक भारतीय नागरिक होना चाहिए।",
      crit2: "आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए।",
      crit3: "आपका नाम मतदाता सूची में होना चाहिए।",
      readyBtn: "मैं इन मानदंडों को पूरा करता हूँ — चल रहे चुनाव देखें",
      electionsTitle: "चल रहे चुनाव",
      noElections: "वर्तमान में कोई चुनाव नहीं चल रहा है।",
      backBtn: "मानदंड पर वापस जाएं"
    }
  }[lang];

  return (
    <div className="bg-white border border-outline-variant rounded p-6 max-w-2xl mx-auto" style={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <UserCheck className="text-primary-container" size={22} />
          <h3 className="text-[24px] font-medium text-on-surface">
            {!showElections ? t.title : t.electionsTitle}
          </h3>
        </div>
        {!showElections && (
          <p className="text-[14px] text-on-surface-variant">{t.subtitle}</p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showElections ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
          >
            <ul className="space-y-3 mb-6">
              {[t.crit1, t.crit2, t.crit3].map((crit, idx) => (
                <li key={idx} className="flex items-center gap-3 p-4 rounded bg-surface-container-low border border-outline-variant">
                  <CheckCircle2 size={20} className="text-tertiary-container shrink-0" />
                  <span className="text-[14px] font-medium text-on-surface">{crit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowElections(true)}
              className="w-full py-3 rounded-full bg-primary-container text-white font-medium text-[14px] hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              {t.readyBtn} <ArrowRight size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="elections"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
          >
            {ongoingElections.length > 0 ? (
              <div className="space-y-4 mb-6">
                {ongoingElections.map(election => (
                  <div key={election.id} className="bg-surface-container-low border border-outline-variant rounded p-4">
                    <h4 className="text-[16px] font-medium text-on-surface mb-1">{election.title[lang]}</h4>
                    <p className="text-[13px] font-semibold text-secondary-container mb-3">{election.date[lang]}</p>

                    {election.externalLinks && election.externalLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {election.externalLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ds-chip ds-chip-blue flex items-center gap-1 hover:bg-primary-fixed-dim transition-colors"
                          >
                            {link.label[lang]} <ExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-[14px] text-outline">{t.noElections}</p>
              </div>
            )}

            <button
              onClick={() => setShowElections(false)}
              className="text-[14px] text-on-surface-variant hover:text-primary-container flex items-center gap-2 transition-colors justify-center w-full font-medium"
            >
              <ArrowLeft size={16} /> {t.backBtn}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
