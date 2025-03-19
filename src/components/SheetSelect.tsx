import { useState, useCallback, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface SheetSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  title: string;
  name?: string;
  showValidation?: boolean;
}

export function SheetSelect({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  title,
  name,
  showValidation = false
}: SheetSelectProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const selectedOption = options.find(option => option.value === value);
  const hasValue = Boolean(selectedOption);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Use useCallback to prevent recreation of functions on each render
  const handleValueChange = useCallback((newValue: string) => {
    try {
      onChange(newValue);
      setOpen(false);
    } catch (error) {
      console.error("Error changing value:", error);
    }
  }, [onChange]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    try {
      setOpen(newOpen);
    } catch (error) {
      console.error("Error changing open state:", error);
    }
  }, []);

  // Use standard select on desktop
  if (!isMobile) {
    return (
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger 
          className={`compact-input ${!hasValue && showValidation ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-gray-500">{option.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Use centered dialog on mobile (Material Design style)
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-full flex justify-between items-center p-2 text-left text-sm h-9 compact-input ${!hasValue && showValidation ? 'border-red-500' : ''}`}
          type="button"
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <style jsx global>{`
        /* Material Design style dialog animation and styling */
        .material-dialog {
          animation: scale-fade-in 0.25s ease-out forwards;
          max-width: 90% !important;
          width: 90% !important;
          border-radius: 8px !important;
          box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 
                      0 24px 38px 3px rgba(0, 0, 0, 0.14), 
                      0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
        }
        
        @keyframes scale-fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .material-option {
          transition: background-color 0.2s ease;
        }
        
        .material-option:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <DialogContent className="p-0 overflow-hidden material-dialog border-0">
        <DialogHeader className="px-4 py-3 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh] py-1">
          {options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "w-full flex items-center justify-between text-left px-5 py-3 transition-colors material-option focus:outline-none",
                option.value === value ? "bg-green-50" : ""
              )}
              onClick={() => handleValueChange(option.value)}
              type="button"
            >
              <div>
                <div className={cn(
                  "font-medium",
                  option.value === value ? "text-green-700" : "text-gray-900"
                )}>
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                )}
              </div>
              {option.value === value && (
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <Button
            className="bg-green-700 hover:bg-green-800 text-white font-medium px-6"
            onClick={() => handleOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 