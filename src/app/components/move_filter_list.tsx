import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MoveData from "./moves";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Move } from "../features/moves";
import { Trie } from "../src/prefix";

interface MoveFilterListProps { };




const MoveFilterList: React.FC<MoveFilterListProps> = ({ }) => {
  const data: Move[] = useSelector((state: RootState) => state.moveData.value);

  const [moveTrie] = useState(new Trie());
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([]);
  const [moveList, setLocalMoveList] = useState<Move[]>([]);
  const [searchTermMoves, setSearchTermMoves] = useState('');

  useEffect(() => {
    setLocalMoveList(data); // Dispatch the list to Redux
    data.forEach((move) => {
      moveTrie.insert(move.name.toLowerCase())
    })
  });

  useEffect(() => {
    console.log("searchTerm? ", searchTermMoves)
    if (searchTermMoves === '') {
      console.log("using full list")
      setFilteredMoves(moveList); // If input is empty, show all creatures
    } else {
      const matchedMoveNames = moveTrie.getAllWordsWithPrefix(searchTermMoves.toLowerCase());
      const filtered = moveList.filter(move =>
        matchedMoveNames.includes(move.name.toLowerCase())
      );
      setFilteredMoves(filtered);

      console.log("filtered Moves: ", filtered)

    }

  }, [searchTermMoves, moveTrie]);


  return (
    <div>
      <input
        type="text"
        placeholder="Search moves..."
        value={searchTermMoves}
        onChange={(m) => setSearchTermMoves(m.target.value)}
      />
      {filteredMoves.map((m, _) => (
        <MoveData moveID={m.id} />
      ))}
    </div>
  );
};

export default MoveFilterList;
