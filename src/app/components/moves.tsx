'use client'
import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Move } from '../features/moves';


interface MoveIDProps {
  moveID: number; // Tile index passed in as a prop
}

const MoveData: React.FC<MoveIDProps> = ({ moveID }) => {
  const data: Move[] = useSelector((state: RootState) => state.moveData.value);

  if (data.length == 0) {
    return <p>No data available.</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      {JSON.stringify(data[moveID], null, 2)}
    </div>
  );
};

export default MoveData;

