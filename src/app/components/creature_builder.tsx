'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Creature } from '../features/creature';
import CreatureData from './creature';
import MoveFilterList from './move_filter_list';
import { Move } from '../features/moves';



interface CreatureIDProps {
  creatureID: number; // Tile index passed in as a prop
}


const CreatureBuilder: React.FC<CreatureIDProps> = ({ creatureID }) => {

  const data: Creature[] = useSelector((state: RootState) => state.creatureData.value);
  const [localMoveList, setlocalMoveList] = useState<Move[]>([]);

  useEffect(() => {
    console.log(data[creatureID].moveList, creatureID);
    setlocalMoveList(data[creatureID].moveList);
  }, []);

  return (
    <div>
      <CreatureData creatureID={creatureID} />
      {localMoveList.length > 0 && <MoveFilterList availableMoves={localMoveList} />}
    </div>

  );
};


export default CreatureBuilder;
