// OtpInput.tsx

import React from 'react';

const OtpInput = () => {
  // Handle key press events to move focus
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.currentTarget.value.length === 1) {
      const nextInput = document.querySelectorAll<HTMLInputElement>('input')[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
          inputMode="numeric"
          pattern="\d*"
          onKeyUp={(e) => handleKeyUp(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
