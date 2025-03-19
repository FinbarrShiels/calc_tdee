import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface DialogSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  title: string;
}

export function DialogSelect({ options, value, onChange, placeholder, title }: DialogSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  return (
    <>
      <Button
        variant="outline"
        className="w-full flex justify-between items-center p-2 text-left text-sm h-9 compact-input"
        onClick={() => setOpen(true)}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md px-0 bottom-0 top-auto translate-y-0 translate-x-[-50%] rounded-t-xl rounded-b-none md:rounded-xl max-h-[70vh] md:max-h-[90vh] md:top-[50%] md:translate-y-[-50%]">
          <div className="p-4 border-b">
            <DialogTitle className="text-center">{title}</DialogTitle>
          </div>
          <div className="overflow-y-auto max-h-[60vh] py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-3 hover:bg-green-50 focus:bg-green-50 outline-none transition-colors ${value === option.value ? 'bg-green-100 text-green-800' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-zinc-500">{option.description}</div>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 