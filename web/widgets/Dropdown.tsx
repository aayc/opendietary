import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import useOnClickOutside from "use-onclickoutside";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  className?: string;
  value?: any;
  options?: DropdownOption[];
  onChange?: (v: any) => void;
  placeholder?: string;
};

export default function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  // Use ref for dropdown window
  const dropdownWindowRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownWindowRef, () => setOpen(false));

  const toggle = () => {
    setOpen(!open);
  };

  const select = (option: DropdownOption) => {
    setOpen(false);
    if (props.onChange) {
      props.onChange(option);
    }
  };

  return (
    <div className={props.className}>
      <div className="text-input-gray inline rounded-lg" ref={dropdownWindowRef} onClick={toggle}>
        <span>{props.value?.label ?? (props.placeholder ?? "Select from list")}</span>
        <ChevronDown className={`transition duration-150 ml-2 mb-1 ease-in-out inline ${open ? 'rotate-180' : ''}`} size={16}></ChevronDown>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-white border shadow-lg rounded-lg mt-2"
            >
              {props.options?.map((option, index) => (
                <p
                  key={option.label}
                  className={`py-2 px-4 cursor-pointer hover:bg-gray-200 ${index == 0 ? "rounded-t-lg" : index == props.options!.length - 1 ? "rounded-b-lg" : ""}`}
                  onClick={() => select(option)}
                >
                  {option.label}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export type { DropdownOption }