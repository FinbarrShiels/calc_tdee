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
          Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day. 
          It consists of several components:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-medium">Basal Metabolic Rate (BMR):</span> The energy needed to maintain 
            basic bodily functions at rest (60-70% of TDEE).
          </li>
          <li>
            <span className="font-medium">Physical Activity:</span> Energy burned during exercise and 
            daily movement (15-30% of TDEE).
          </li>
          <li>
            <span className="font-medium">Thermic Effect of Food (TEF):</span> Energy used to digest, 
            absorb, and process food (10% of TDEE).
          </li>
        </ul>
        <p className="mt-4">
          Our calculator uses the Mifflin-St Jeor equation to estimate BMR, then applies an activity 
          multiplier based on your activity level to determine your TDEE.
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