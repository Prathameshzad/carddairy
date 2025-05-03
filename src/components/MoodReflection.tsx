'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from './ui/Button';

// List of predefined moods with styling and image info
const moods = [
  {
    label: 'ANGRY',
    color: 'text-red-500',
    borderColor: 'border-red-300',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    image: '/angry.png',
  },
  {
    label: 'STRESSED',
    color: 'text-pink-500',
    borderColor: 'border-pink-300',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600',
    image: '/stressed.png',
  },
  {
    label: 'GOOD',
    color: 'text-green-500',
    borderColor: 'border-green-300',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    image: '/good.png',
  },
  {
    label: 'CHILL',
    color: 'text-blue-400',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    image: '/chill.png',
  },
  {
    label: 'SHIED',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-300',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    image: '/shied.png',
  },
];

// Days of the week
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Main component
const MoodReflection: React.FC = () => {
  const [topMoodIndex, setTopMoodIndex] = useState(2); // default to "GOOD"
  const [selectedDay, setSelectedDay] = useState('Mon'); // default selected day
  const [savedMoods, setSavedMoods] = useState<Record<string, string>>({}); // stores mood image by day

  // Handle mood selection
  const handleMoodClick = (index: number) => {
    setTopMoodIndex(index);
  };

  // Save selected mood to the selected day and store in localStorage
  const handleSaveMood = () => {
    const currentMood = moods[topMoodIndex];
    const updatedMoods = {
      ...savedMoods,
      [selectedDay]: currentMood.image,
    };
    setSavedMoods(updatedMoods);
    localStorage.setItem('savedMoods', JSON.stringify(updatedMoods));
  };

  // Load saved moods from localStorage on initial render
  // useEffect(() => {
  //   const saved = localStorage.getItem('savedMoods');
  //   if (saved) {
  //     setSavedMoods(JSON.parse(saved));
  //   }
  // }, []);

  // Positions for other mood icons around the main one
  const moodPositions = [
    "absolute -left-20 top-1/4",
    "absolute -right-20 top-1/4",
    "absolute -left-12 -bottom-6",
    "absolute -bottom-6 -right-12",
  ];

  const topMood = moods[topMoodIndex];

  return (
    <div className="flex flex-col items-center justify-center p-10 shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold">What is your mood today?</h2>

      {/* Mood History Section */}
      <div className="mt-4 text-center">
        <div className="flex justify-center gap-3">
          {days.map((day) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${savedMoods[day] ? '' : 'bg-gray-100'}`}
              >
                {savedMoods[day] && (
                  <Image
                  src={savedMoods[day]}
                  alt={`${day} mood`}
                  width={40}
                  height={40}
                />
                )}
              </div>
              <span className="text-sm mt-1">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Mood Display Circle */}
      <div className={`relative mt-24 mb-10 w-56 h-56 rounded-full border-8 ${topMood.borderColor} flex items-center justify-center`}>
        {/* Top mood in center */}
        <div className={`absolute -top-24 left-1/2 transform -translate-x-1/2 ${topMood.color} flex flex-col items-center`}>
          <div className={`${topMood.bgColor} p-4 rounded-full`}>
          <Image src={topMood.image} alt={topMood.label} width={40} height={40} className="rounded-md" />
          </div>
        </div>

        {/* Other moods around the center */}
        {moods.map((mood, index) => {
          if (index === topMoodIndex) return null;
          const  positionIdx = index > topMoodIndex ? index - 1 : index;

          return (
            <button
              key={mood.label}
              onClick={() => handleMoodClick(index)}
              className={`${moodPositions[positionIdx]} flex flex-col items-center hover:scale-110 transition-transform cursor-pointer`}
            >
              <div className={`${mood.bgColor} p-4 rounded-full`}>
               <Image src={mood.image} alt={mood.label} width={32} height={32} className="rounded-md" />
              </div>
            </button>
          );
        })}

        {/* Center mood label */}
        <div className={`${topMood.bgColor} ${topMood.textColor} font-semibold rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-inner z-10`}>
          <div>Mood</div>
          <div className="text-sm">{topMood.label}</div>
        </div>
      </div>

      {/* Select day and save mood button */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <select
          id="day-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <Button onClick={handleSaveMood} />
      </div>
    </div>
  );
};

export default MoodReflection;
