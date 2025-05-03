'use client';

import React, { useEffect, useState } from 'react';

const HealthTips: React.FC = () => {
  // State to store the health tips
  const [tips, setTips] = useState<string[]>([]);

  // State to indicate whether data is loading
  const [loading, setLoading] = useState<boolean>(true);

  // Background colors for tip cards (cycled through)
  const bgColors = [
    'bg-green-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-red-100',
    'bg-pink-100',
    'bg-orange-100',
    'bg-indigo-100',
  ];

  // Fetch health tips when component mounts
  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const response = await fetch('/api/health-tips'); // Call backend API
        const data = await response.json(); // Parse JSON data
        setTips(data.tips); // Store tips in state
      } catch (error) {
        console.error('Error fetching health tips:', error); // Log error if request fails
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchHealthTips(); // Trigger API call
  }, []);

  return (
    <div className="p-6 rounded-3xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Health Tips</h2>

      {/* Show loading text while data is being fetched */}
      {loading ? (
        <p className="text-center text-gray-500">Loading tips...</p>
      ) : (
        // Show all health tips after data is fetched
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`p-4 rounded-md shadow-sm ${bgColors[index % bgColors.length]}`}
            >
              <p className="text-gray-800">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthTips;
