import { useState, useCallback, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
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

  // Use iOS-style sheet on mobile
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={`w-full flex justify-between items-center p-2 text-left text-sm h-9 compact-input ${!hasValue && showValidation ? 'border-red-500' : ''}`}
          type="button"
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </SheetTrigger>
      <style jsx global>{`
        /* iOS-style sheet animation and styling */
        .ios-sheet {
          animation: ios-slide-up 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          border-top-left-radius: 14px !important;
          border-top-right-radius: 14px !important;
          box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.12) !important;
        }
        
        @keyframes ios-slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .ios-pill {
          width: 36px;
          height: 5px;
          border-radius: 3px;
          background-color: #e0e0e0;
          margin: 6px auto;
        }
        
        .ios-option {
          transition: background-color 0.2s ease;
        }
        
        .ios-option:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <SheetContent 
        side="bottom" 
        className="p-0 rounded-t-xl h-auto max-h-[85vh] overflow-hidden border-t-0 ios-sheet"
      >
        <div className="ios-pill" />
        <SheetHeader className="px-4 py-3 border-b sticky top-0 bg-white z-10">
          <SheetTitle className="text-center">{title}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(85vh-6rem)] py-1 bg-gray-50">
          {options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "w-full flex items-center justify-between text-left px-5 py-4 transition-colors ios-option bg-white border-b border-gray-100 focus:outline-none",
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
        <div className="p-4 bg-white border-t sticky bottom-0 z-10">
          <Button
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium rounded-full h-12"
            onClick={() => handleOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
} 