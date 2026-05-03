import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface ProcessCardProps {
  id: string;
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  learnMoreText: string;
  electionType: string;
  colorClass: string;
  bgClass: string;
  onClick: () => void;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  index,
  icon: Icon,
  title,
  description,
  learnMoreText,
  electionType,
  colorClass,
  bgClass,
  onClick
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded-lg"
      role="button"
      tabIndex={0}
      aria-label={`Step ${index + 1}: ${title}. ${description}. Click to learn more.`}
    >
      <div className="ds-card p-6 h-full flex flex-col">
        {/* Step Number Chip */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center`} aria-hidden="true">
            <Icon size={20} className={colorClass} />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest mb-1">{electionType}</span>
            <span className="text-[12px] font-bold text-on-surface-variant tracking-[0.08em]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <h3 className="text-[16px] font-medium text-on-surface mb-2 group-hover:text-primary-container transition-colors">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.5] text-on-surface-variant mb-5 flex-1">
          {description}
        </p>

        <div className="flex items-center text-[13px] font-medium text-primary-container group-hover:gap-2 transition-all" aria-hidden="true">
          {learnMoreText}
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
