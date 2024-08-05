import React from 'react';

interface AvatarProps {
  firstName: string;
}

function Avatar({ firstName }: AvatarProps) {
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full">
      <span className="text-xl font-semibold">{initial}</span>
    </div>
  );
}

export default Avatar;
