import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '@/data/electionProcess';

interface KPICardProps {
  label: string;
  value: string;
  subLabel: string;
  idx: number;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, subLabel, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: idx * 0.05 }}
      className="ds-card p-5 border-l-4 border-l-primary-container"
      role="status"
      aria-labelledby={`kpi-label-${idx}`}
    >
      <span 
        id={`kpi-label-${idx}`}
        className="text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant block mb-1"
      >
        {label}
      </span>
      <div className="text-[28px] font-bold text-on-surface leading-tight mb-1" aria-live="polite">
        {value}
      </div>
      <span className="text-[12px] text-on-surface-variant font-medium">
        {subLabel}
      </span>
    </motion.div>
  );
};
