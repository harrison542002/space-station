import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

type DropdownProps = {
  options: DropdownOption[];
  selectedValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Dropdown({
  options,
  selectedValue,
  placeholder = "Select...",
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="relative inline-block w-64" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 text-black bg-primary border border-gray-300 rounded-full shadow-sm hover:border-gray-400 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="truncate font-semibold">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full  bg-primary border text-black border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
