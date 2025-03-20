"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DialogSelect } from "@/components/DialogSelect";
import { SheetSelect } from "@/components/SheetSelect";

// Define the form schema with validation for both unit systems
const formSchema = z.object({
  unitSystem: z.enum(["metric", "imperial"]),
  age: z.coerce.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  gender: z.enum(["male", "female"]),
  // Height fields
  heightCm: z.coerce.number().min(100, "Height must be at least 100cm").max(250, "Height must be less than 250cm").optional(),
  heightFeet: z.coerce.number().min(3, "Height must be at least 3ft").max(8, "Height must be less than 8ft").optional(),
  heightInches: z.coerce.number().min(0, "Inches must be between 0-11").max(11, "Inches must be between 0-11").optional(),
  // Weight fields
  weightKg: z.coerce.number().min(30, "Weight must be at least 30kg").max(300, "Weight must be less than 300kg").optional(),
  weightLbs: z.coerce.number().min(66, "Weight must be at least 66lbs").max(660, "Weight must be less than 660lbs").optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  // Body fat percentage - optional
  bodyFatPercentage: z.coerce.number().min(3, "Body fat must be at least 3%").max(70, "Body fat must be less than 70%").optional(),
}).refine((data) => {
  if (data.unitSystem === "metric") {
    return data.heightCm !== undefined && data.weightKg !== undefined;
  } else {
    return data.heightFeet !== undefined && data.weightLbs !== undefined;
  }
}, {
  message: "Please provide measurements in the selected unit system",
  path: ["unitSystem"]
});

// Activity level descriptions
const activityLevels = [
  { value: "sedentary", label: "Sedentary", description: "Little or no exercise" },
  { value: "light", label: "Light Exercise", description: "1-3 days/week" },
  { value: "moderate", label: "Moderate Exercise", description: "3-5 days/week" },
  { value: "active", label: "Heavy Exercise", description: "6-7 days/week" },
  { value: "very_active", label: "Athlete", description: "2x training per day" },
];

// Gender options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function TdeeCalculatorForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [showValidation, setShowValidation] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitSystem: "metric",
    },
    mode: "onSubmit", // Only validate on submit
  });

  // Handle unit system change
  const handleUnitSystemChange = (value: "metric" | "imperial") => {
    setUnitSystem(value);
    form.setValue("unitSystem", value);
  };

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Convert to metric if using imperial for calculations
    const processedValues = {
      ...values,
      // Always include metric values for consistent calculation
      heightCm: values.unitSystem === "metric" 
        ? values.heightCm 
        : Math.round((values.heightFeet || 0) * 30.48 + (values.heightInches || 0) * 2.54),
      weightKg: values.unitSystem === "metric" 
        ? values.weightKg 
        : Math.round((values.weightLbs || 0) * 0.453592),
      // Include body fat percentage if provided
      bodyFatPercentage: values.bodyFatPercentage
    };
    
    // Encode data for URL
    const dataString = encodeURIComponent(JSON.stringify(processedValues));
    router.push(`/results?data=${dataString}`);
  }
  
  // Handle form submission attempts with errors
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setShowValidation(true);
    try {
      const result = await form.handleSubmit(onSubmit)(e);
      return result;
    } catch (error) {
      console.error("Form submission error:", error);
      // Prevent unhandled promise rejection
      return false;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-4 form-container">
        {/* Add CSS at the top of the component to prevent mobile movement */}
        <style jsx global>{`
          .form-container {
            contain: paint;
          }
          
          /* Prevent iOS zoom */
          input[type="number"], 
          input[type="text"],
          select {
            font-size: 16px !important; /* Prevents iOS zoom */
          }
          
          /* Set consistent heights and spacing for form items */
          .form-item-container {
            min-height: 70px;
            display: flex;
            flex-direction: column;
          }
          
          /* Imperial units height container */
          .imperial-height-container {
            min-height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          
          /* Apply consistent form field positioning */
          .form-item-container .small-label,
          .imperial-height-container .small-label {
            margin-bottom: 4px;
          }
          
          /* Ensure grid wrapper has consistent alignment */
          .imperial-height-container .grid {
            margin-top: 4px;
          }
          
          /* Make inputs smaller */
          .compact-input {
            height: 36px;
            min-height: 36px;
            padding-top: 0;
            padding-bottom: 0;
          }
          
          /* Make form labels smaller and add consistent spacing */
          .small-label {
            font-size: 0.85rem;
            margin-bottom: 4px;
          }
          
          /* Ensure consistent spacing for form controls */
          .form-control-wrapper {
            margin-top: 4px;
          }
          
          /* Full-screen select on mobile */
          .select-content-fullscreen {
            width: 100vw;
            max-height: 60vh !important;
            position: fixed;
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            border-radius: 12px 12px 0 0 !important;
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1) !important;
            animation-name: slideUpFade !important;
            animation-duration: 0.3s !important;
            z-index: 100;
          }
          
          @media (min-width: 640px) {
            .select-content-fullscreen {
              width: auto;
              max-height: var(--radix-select-content-available-height) !important;
              position: relative;
              border-radius: var(--radius) !important;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
            }
          }
          
          @keyframes slideUpFade {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
        
        {/* Form Error Message */}
        {showValidation && Object.keys(form.formState.errors).length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
            <p className="text-red-600 text-sm font-medium">Please complete all required fields to calculate your TDEE.</p>
          </div>
        )}
        
        {/* Unit System Toggle */}
        <FormField
          control={form.control}
          name="unitSystem"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="small-label">Unit System</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div
                    className={`flex items-center justify-center p-2 rounded-md border cursor-pointer transition-colors text-sm ${
                      field.value === "metric" 
                        ? "bg-green-100 border-green-500 text-green-700" 
                        : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleUnitSystemChange("metric")}
                  >
                    Metric (cm/kg)
                  </div>
                  <div
                    className={`flex items-center justify-center p-2 rounded-md border cursor-pointer transition-colors text-sm ${
                      field.value === "imperial" 
                        ? "bg-green-100 border-green-500 text-green-700" 
                        : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleUnitSystemChange("imperial")}
                  >
                    Imperial (ft/lbs)
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* 2x2 Grid for all form fields on both mobile and desktop */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="imperial-height-container">
                <FormLabel className="small-label">Age</FormLabel>
                <div className="mt-1">
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Age" 
                      className={cn(
                        "compact-input",
                        showValidation && !field.value && "border-red-500"
                      )}
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="imperial-height-container">
                <FormLabel className="small-label">Gender</FormLabel>
                <div className="mt-1">
                  <FormControl>
                    <SheetSelect
                      options={genderOptions}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Select gender"
                      title="Select Gender"
                      showValidation={showValidation}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          {/* Conditional Height Fields Based on Unit System */}
          {unitSystem === "metric" ? (
            <FormField
              control={form.control}
              name="heightCm"
              render={({ field }) => (
                <FormItem className="imperial-height-container">
                  <FormLabel className="small-label">Height (cm)</FormLabel>
                  <div className="mt-1">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Height" 
                        className={cn(
                          "compact-input",
                          showValidation && !field.value && "border-red-500"
                        )}
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="heightFeet"
              render={({ field: feetField }) => (
                <FormItem className="imperial-height-container">
                  <FormLabel className="small-label">Height (ft & in)</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <FormItem className="space-y-0">
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Feet" 
                          className={cn(
                            "compact-input",
                            showValidation && !feetField.value && "border-red-500"
                          )}
                          {...feetField} 
                          value={feetField.value || ''} 
                        />
                      </FormControl>
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="heightInches"
                      render={({ field: inchesField }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Inches" 
                              className="compact-input"
                              {...inchesField} 
                              value={inchesField.value || ''} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
          )}

          {/* Conditional Weight Fields Based on Unit System */}
          {unitSystem === "metric" ? (
            <FormField
              control={form.control}
              name="weightKg"
              render={({ field }) => (
                <FormItem className="imperial-height-container">
                  <FormLabel className="small-label">Weight (kg)</FormLabel>
                  <div className="mt-1">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Weight" 
                        className={cn(
                          "compact-input",
                          showValidation && !field.value && "border-red-500"
                        )}
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="weightLbs"
              render={({ field }) => (
                <FormItem className="imperial-height-container">
                  <FormLabel className="small-label">Weight (lbs)</FormLabel>
                  <div className="mt-1">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Weight" 
                        className={cn(
                          "compact-input",
                          showValidation && !field.value && "border-red-500"
                        )}
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem className="imperial-height-container">
                <FormLabel className="small-label">Activity Level</FormLabel>
                <div className="mt-1">
                  <FormControl>
                    <SheetSelect
                      options={activityLevels}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Select activity"
                      title="Select Activity Level"
                      showValidation={showValidation}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          {/* Body Fat Percentage - Optional */}
          <FormField
            control={form.control}
            name="bodyFatPercentage"
            render={({ field }) => (
              <FormItem className="imperial-height-container">
                <FormLabel className="small-label">Body Fat % (optional)</FormLabel>
                <div className="mt-1">
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Body fat %" 
                      className="compact-input"
                      {...field} 
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-green-700 hover:bg-green-800 transition-all duration-300 hover:scale-102 hover:shadow-md active:scale-98 active:shadow-inner mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Calculating..." : "Calculate TDEE"}
        </Button>
      </form>
    </Form>
  );
} 