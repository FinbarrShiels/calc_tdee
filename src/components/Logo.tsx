import React from 'react';

export default function Logo() {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-2 rounded-md mr-2 shadow-md relative overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        {/* Calculator base with rounded corners */}
        <rect 
          x="3" 
          y="3" 
          width="14" 
          height="18" 
          rx="2" 
          stroke="white" 
          strokeWidth="1.5" 
          className="transition-all duration-300 group-hover:stroke-opacity-100"
          strokeOpacity="0.9"
        />
        
        {/* Calculator screen with subtle glow */}
        <rect 
          x="5" 
          y="5" 
          width="10" 
          height="3" 
          rx="1" 
          fill="white" 
          opacity="0.9"
          className="transition-all duration-300 group-hover:opacity-100" 
        />
        <text 
          x="10" 
          y="7.3" 
          fill="#006400" 
          fontSize="1.8" 
          fontWeight="bold" 
          textAnchor="middle"
          className="transition-all duration-300 group-hover:fill-opacity-100"
          fillOpacity="0.8"
        >
          TDEE
        </text>
        
        {/* Calculator buttons - 2x3 grid */}
        <circle cx="7" cy="11" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        <circle cx="11" cy="11" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        <circle cx="7" cy="14" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        <circle cx="11" cy="14" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        <circle cx="7" cy="17" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        <circle cx="11" cy="17" r="1" fill="white" className="transition-all duration-300 group-hover:r-1.1" />
        
        {/* Muscular arm coming from the calculator side */}
        <g className="transition-all duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.2">
          {/* Bicep and forearm */}
          <path 
            d="M14 9C16 7 18 6.5 21 9" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-width-2.2" 
          />
          <path 
            d="M14 9C14 11 15 13 18 12.5" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className="transition-all duration-300 group-hover:stroke-width-2.2"
          />
          <path 
            d="M18 12.5C20 12 22 9 21 9" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-width-2.2" 
          />
          
          {/* Bicep highlight/definition */}
          <path 
            d="M16.5 10C17.5 9.3 18.5 9.3 19.5 10" 
            stroke="white" 
            strokeWidth="0.75" 
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-width-1" 
          />
          
          {/* Hand/fist */}
          <circle 
            cx="21" 
            cy="9" 
            r="1.5" 
            fill="white" 
            opacity="0.9"
            className="transition-all duration-300 group-hover:r-1.6 group-hover:opacity-100" 
          />
        </g>
      </svg>
      
      {/* Subtle shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
  );
} 