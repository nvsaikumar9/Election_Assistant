'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  FileText,
  Megaphone,
  Vote,
  TrendingUp,
  ChevronRight,
  X,
  Info,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Map as MapIcon,
  Globe,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { electionProcess, ProcessStep, ElectionType, Language, electionKPIs } from '@/data/electionProcess';
import { electionWatchData } from '@/data/electionWatch';
import { ElectionMap, ElectionTree } from '@/components/ElectionWatch';
import EligibilityWizard from '@/components/EligibilityWizard';
import EVMSimulator from '@/components/EVMSimulator';
import { KPICard } from '@/components/KPICard';
import { ProcessCard } from '@/components/ProcessCard';
import { LocationSearch } from '@/components/LocationSearch';
import { SkipLink } from '@/components/SkipLink';
import FocusTrap from 'focus-trap-react';

const iconMap = {
  UserPlus: UserPlus,
  FileText: FileText,
  Megaphone: Megaphone,
  Vote: Vote,
  TrendingUp: TrendingUp,
};

const uiStrings = {
  en: {
    title: "India's Election Pathways",
    subtitle: "Demystifying the world's largest democratic exercise. Explore the lifecycle of Indian elections from registration to results.",
    electionType: "Election",
    learnMore: "Learn More",
    activePhase: "Active Phase",
    theDeepDive: "The Deep Dive",
    keyPhases: "Key Phases",
    context: "Context",
    takeaways: "What you must know",
    footer: "© 2026 Election Assistant • Powered by Google Gemini & ECI Guidelines",
    electionWatch: "Election Watch",
    watchSubtitle: "Tracking ongoing polls and upcoming democratic milestones across India.",
    ongoingTitle: "Live Ongoing Map",
    upcomingTitle: "Upcoming Timeline",
    processTitle: "Election Process Deep Dive",
    processSubtitle: "Understand every step of the democratic process. Click on any phase to learn more.",
  },
  hi: {
    title: "भारत का निर्वाचन पथ",
    subtitle: "दुनिया के सबसे बड़े लोकतांत्रिक अभ्यास को समझना। पंजीकरण से लेकर परिणाम तक भारतीय चुनावों के जीवनचक्र का अन्वेषण करें।",
    electionType: "चुनाव",
    learnMore: "और जानें",
    activePhase: "सक्रिय चरण",
    theDeepDive: "विस्तृत जानकारी",
    keyPhases: "प्रमुख चरण",
    context: "संदर्भ",
    takeaways: "आपको क्या जानना चाहिए",
    footer: "© 2026 चुनाव सहायक • गूगल जेमिनी और ECI दिशानिर्देशों द्वारा संचालित",
    electionWatch: "चुनाव निगरानी",
    watchSubtitle: "भारत भर में जारी मतदान और आगामी लोकतांत्रिक मील के पत्थर पर नज़र रखना।",
    ongoingTitle: "लाइव चल रहा नक्शा",
    upcomingTitle: "आगामी समयरेखा",
    processTitle: "चुनाव प्रक्रिया विस्तृत जानकारी",
    processSubtitle: "लोकतांत्रिक प्रक्रिया के हर कदम को समझें। अधिक जानने के लिए किसी भी चरण पर क्लिक करें।",
  }
};

const stepColorMap: Record<number, string> = {
  0: 'text-primary-container',
  1: 'text-secondary-container',
  2: 'text-yellow',
  3: 'text-primary-container',
  4: 'text-tertiary-container',
};

const stepBgMap: Record<number, string> = {
  0: 'bg-primary-fixed',
  1: 'bg-secondary-fixed',
  2: 'bg-[#fff3cd]',
  3: 'bg-primary-fixed',
  4: 'bg-tertiary-fixed',
};

export default function ElectionAssistant() {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [electionType, setElectionType] = useState<ElectionType>('General');
  const [lang, setLang] = useState<Language>('en');

  const t = uiStrings[lang];

  return (
    <div className="min-h-screen bg-surface text-on-surface relative">
      <SkipLink />

      {/* ━━━ HEADER / HERO ━━━ */}
      <header className="bg-white border-b border-outline-variant" role="banner">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <Globe className="text-white" size={22} />
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-on-surface">
              {lang === 'en' ? 'Election Pathways' : 'निर्वाचन पथ'}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center border border-outline-variant rounded-full overflow-hidden" role="group" aria-label="Language selection">
              <button
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-4 py-[6px] text-[13px] font-medium transition-colors ${lang === 'en' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
                className={`px-4 py-[6px] text-[13px] font-medium transition-colors ${lang === 'hi' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Election Type Selector */}
            <div className="hidden md:flex items-center gap-2" role="group" aria-label="Election type selection">
              {(['General', 'State', 'Local'] as ElectionType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setElectionType(type)}
                  aria-pressed={electionType === type}
                  className={`px-4 py-[6px] rounded-full text-[13px] font-medium border transition-all ${
                    electionType === type
                      ? 'bg-primary-container text-white border-primary-container'
                      : 'bg-white text-on-surface-variant border-outline-variant hover:border-outline'
                  }`}
                >
                  {type} {t.electionType}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] text-on-surface mb-6">
              {lang === 'en' ? (
                <>India&#39;s <span className="text-primary-container">Election</span> <span className="text-tertiary-container">Pathways</span></>
              ) : (
                <>भारत का <span className="text-primary-container">निर्वाचन</span> <span className="text-tertiary-container">पथ</span></>
              )}
            </h1>
            <p className="text-[18px] leading-[1.6] text-on-surface-variant max-w-2xl">
              {t.subtitle}
            </p>

            {/* KPI Cards for Selected Election Type */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <AnimatePresence mode="wait">
                {electionKPIs[electionType].map((kpi, idx) => (
                  <KPICard
                    key={`${electionType}-${idx}`}
                    label={kpi.label[lang]}
                    value={kpi.value}
                    subLabel={kpi.subLabel[lang]}
                    idx={idx}
                  />
                ))}
              </AnimatePresence>
            </div>

            <LocationSearch lang={lang} />
          </motion.div>

          {/* Mobile Election Type Selector */}
          <div className="flex md:hidden items-center gap-2 mt-8 flex-wrap">
            {(['General', 'State', 'Local'] as ElectionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setElectionType(type)}
                className={`px-4 py-[6px] rounded-full text-[13px] font-medium border transition-all ${
                  electionType === type
                    ? 'bg-primary-container text-white border-primary-container'
                    : 'bg-white text-on-surface-variant border-outline-variant hover:border-outline'
                }`}
              >
                {type} {t.electionType}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 1: ELECTION WATCH ━━━ */}
      <section className="ds-section-alt border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6 py-[64px]">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center">
                <Calendar className="text-white" size={18} />
              </div>
              <h2 className="text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-on-surface">
                {t.electionWatch}
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl">
              {t.watchSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapIcon size={16} className="text-on-surface-variant" />
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                  {t.ongoingTitle}
                </span>
              </div>
              <ElectionMap ongoing={electionWatchData.filter(e => e.isOngoing)} lang={lang} />
            </div>

            {/* Timeline Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-on-surface-variant" />
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                  {t.upcomingTitle}
                </span>
              </div>
              <ElectionTree upcoming={electionWatchData.filter(e => !e.isOngoing)} lang={lang} />
            </div>
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 2: ELECTION PROCESS DEEP DIVE ━━━ */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-[64px]">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <BookOpen className="text-white" size={18} />
              </div>
              <h2 className="text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-on-surface">
                {electionType} {t.processTitle}
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl">
              {t.processSubtitle}
            </p>
          </div>

          {/* Process Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {electionProcess.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              const content = {
                ...step.content[lang],
                ...(step.typeSpecificContent?.[electionType]?.[lang] || {})
              };
              
              return (
                <ProcessCard
                  key={step.id}
                  id={step.id}
                  index={index}
                  icon={Icon}
                  title={content.title}
                  description={content.shortDescription}
                  learnMoreText={t.learnMore}
                  electionType={electionType}
                  colorClass={stepColorMap[index]}
                  bgClass={stepBgMap[index]}
                  onClick={() => setSelectedStep(step)}
                />
              );
            })}
          </div>
        </div>
      </section>



      {/* ━━━ DETAIL OVERLAY ━━━ */}
      <AnimatePresence mode="wait">
        {selectedStep && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="fixed inset-0 bg-on-surface/40 z-40"
            />

            {/* Panel */}
            <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-4 md:inset-10 lg:inset-16 z-50 overflow-hidden flex items-center justify-center"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <div className="bg-white border border-outline-variant rounded-lg w-full max-w-5xl max-h-full overflow-y-auto shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative scrollbar-hide">
                  {/* Close */}
                  <button
                    onClick={() => setSelectedStep(null)}
                    aria-label="Close details"
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container transition-colors z-10 text-on-surface-variant"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col md:flex-row">
                    {/* Left Sidebar */}
                    <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-low">
                      <div className={`mb-6 w-14 h-14 rounded-lg ${stepBgMap[electionProcess.indexOf(selectedStep)]} flex items-center justify-center`}>
                        {React.createElement(iconMap[selectedStep.icon as keyof typeof iconMap], {
                          size: 28,
                          className: stepColorMap[electionProcess.indexOf(selectedStep)]
                        })}
                      </div>
                      <h2 id="modal-title" className="text-[32px] font-medium leading-[1.3] text-on-surface mb-4">
                        {({
                          ...selectedStep.content[lang],
                          ...(selectedStep.typeSpecificContent?.[electionType]?.[lang] || {})
                        }).title}
                      </h2>
                    <p className="text-[14px] leading-[1.5] text-on-surface-variant italic">
                      &ldquo;{({
                        ...selectedStep.content[lang],
                        ...(selectedStep.typeSpecificContent?.[electionType]?.[lang] || {})
                      }).shortDescription}&rdquo;
                    </p>
                  </div>

                  {/* Right Content */}
                  <div className="md:w-2/3 p-8 space-y-6">
                    {/* Deep Dive */}
                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <Info size={16} className="text-primary-container" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                          {t.theDeepDive}
                        </span>
                      </div>
                      <p className="text-[16px] leading-[1.6] text-on-surface-variant">
                        {({
                          ...selectedStep.content[lang],
                          ...(selectedStep.typeSpecificContent?.[electionType]?.[lang] || {})
                        }).detailedDescription}
                      </p>
                    </section>

                    {/* Eligibility for Registration */}
                    {selectedStep.id === 'registration' && (
                      <section>
                        <EligibilityWizard lang={lang} />
                      </section>
                    )}

                    {/* EVM Simulator for Polling */}
                    {selectedStep.id === 'polling' && (
                      <section>
                        <EVMSimulator lang={lang} />
                      </section>
                    )}

                    {/* Key Phases */}
                    <section>
                      <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant block mb-4">
                        {t.keyPhases}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(selectedStep.typeSpecificPhases?.[electionType]?.[lang] || selectedStep.phases[lang]).map((phase, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded bg-surface-container-low border border-outline-variant">
                            <div className="w-7 h-7 rounded bg-primary-fixed flex items-center justify-center text-[12px] font-semibold text-primary shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-[14px] font-medium text-on-surface">{phase}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Nuance */}
                    {selectedStep.nuances?.[electionType]?.[lang] && (
                      <section className="p-5 rounded bg-[#fff3cd] border border-[#ffe082]">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle size={16} className="text-[#7a5800]" />
                          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#7a5800]">
                            {electionType} {t.context}
                          </span>
                        </div>
                        <p className="text-[14px] leading-[1.5] text-[#5c4200]">
                          {selectedStep.nuances[electionType]![lang]}
                        </p>
                      </section>
                    )}

                    {/* Key Takeaways */}
                    <section>
                      <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant block mb-4">
                        {t.takeaways}
                      </span>
                      <ul className="space-y-3">
                        {({
                          ...selectedStep.content[lang],
                          ...(selectedStep.typeSpecificContent?.[electionType]?.[lang] || {})
                        }).keyTakeaways.map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-tertiary-container mt-[2px] shrink-0" />
                            <span className="text-[14px] leading-[1.5] text-on-surface-variant">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </FocusTrap>
        </>
      )}
    </AnimatePresence>

      </main>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-surface-container-low border-t border-outline-variant py-12 px-6" role="contentinfo">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Vote className="text-primary-container" size={24} />
            <span className="text-[18px] font-semibold text-on-surface">Election Pathways</span>
          </div>
          <p className="text-[14px] text-on-surface-variant">
            &copy; {new Date().getFullYear()} Election Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
