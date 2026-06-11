import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  options: (Option | string)[];
  icon?: React.ReactNode;
  className?: string;
}

export default function CustomDropdown({
  id,
  value,
  onChange,
  options,
  icon,
  className = ""
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Normalize options array to uniform Option shapes
  const normalizedOptions: Option[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find(o => o.value === value) || normalizedOptions[0];

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} id={id}>
      {/* Header Selector Box */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm font-semibold tracking-tight text-slate-700 outline-none transition-all hover:bg-slate-50 cursor-pointer"
      >
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          <span className="font-sans leading-none">{selectedOption?.label}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-slate-400 shrink-0"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      {/* Floating Options Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for safe dismiss on background taps */}
            <div 
              className="fixed inset-0 z-30 cursor-default" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Options List Box */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-slate-150 bg-white p-1.5 shadow-xl z-40"
            >
              <div className="space-y-0.5">
                {normalizedOptions.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={`${opt.value}-${idx}`}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-xs sm:text-xs font-semibold font-sans tracking-tight cursor-pointer transition-all ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
