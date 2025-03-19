"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export default function TdeeExplanation() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              'Basal Metabolic Rate (BMR)',
              'Physical Activity',
              'Thermic Effect of Food (TEF)'
            ],
            datasets: [{
              data: [60, 30, 10], // Percentages of total TDEE
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.raw}% of TDEE`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-green-700">Components of TDEE</h3>
        <p className="mb-4">
          Total Daily Energy Expenditure (TDEE) is the number of calories you burn per day. 
          Understanding your TDEE is essential for managing your weight, as it helps you 
          determine how many calories you need to consume to maintain, lose, or gain weight.
        </p>
        <p className="mb-4">
          Your TDEE is calculated based on several factors:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Basal Metabolic Rate (BMR): The calories your body needs at complete rest</li>
          <li>Physical Activity: How active you are in your daily life</li>
          <li>Thermic Effect of Food: Calories burned during digestion</li>
          <li>Non-Exercise Activity Thermogenesis: Calories burned through fidgeting, standing, etc.</li>
        </ul>
        <p>
          By knowing your TDEE, you can make informed decisions about your nutrition and 
          fitness goals. For weight loss, eat fewer calories than your TDEE; for weight gain, 
          eat more; and for maintenance, eat roughly the same amount.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <canvas ref={chartRef} height="250"></canvas>
        </CardContent>
      </Card>
    </div>
  );
} 