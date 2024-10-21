import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import MoveData from "./moves";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Move } from "../features/moves";
import { Trie } from "../src/prefix";
import './components.css';
import HoverDiv from './hover_div';

interface MoveFilterListProps {
  availableMoves: Move[];
};




const MoveFilterList: React.FC<MoveFilterListProps> = ({ availableMoves }) => {

  const [moveTrie] = useState(new Trie());
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([]);
  const [searchTermMoves, setSearchTermMoves] = useState('');
  const [localMoveList, setlocalMoveList] = useState<Move[]>([]);

  // First useEffect: Initialize localMoveList and moveTrie only once on page load
  useEffect(() => {
    setlocalMoveList(availableMoves); // Assuming availableMoves is a global or passed prop
    availableMoves.forEach((move) => {
      moveTrie.insert(move.name.toLowerCase()); // Insert move names into the moveTrie
    });
    setFilteredMoves(availableMoves); // Set initial moves to display the full list
  }, []);

  useEffect(() => {

    if (localMoveList.length > 0) {
      if (searchTermMoves == '') {
        setFilteredMoves(localMoveList); // If input is empty, show all creatures
      } else {
        const matchedMoveNames = moveTrie.getAllWordsWithPrefix(searchTermMoves.toLowerCase());
        const filtered = localMoveList.filter(move =>
          matchedMoveNames.includes(move.name.toLowerCase())
        );
        setFilteredMoves(filtered);
      }

    }

  }, [searchTermMoves, moveTrie]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermMoves(event.target.value);
  };

  const [hovered, setHovered] = useState(false);


  return (
    <div>
      <input
        type="text"
        placeholder="Search moves..."
        value={searchTermMoves}
        onChange={handleInputChange}
      />

      {filteredMoves.length > 0 && filteredMoves.map((m, _) => (
        <HoverDiv key={m.id}>
          <MoveData moveID={m.id} key={m.id} />
        </HoverDiv>

      ))}
    </div>
  );
};

export default MoveFilterList;
