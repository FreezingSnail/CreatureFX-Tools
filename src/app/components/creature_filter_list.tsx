import React, { useState, useEffect } from 'react';
import CreatureData from "./creature";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Creature } from "../features/creature";
import { Trie } from "../src/prefix";

interface MoveFilterListProps { };




const CreatureFilterList: React.FC<MoveFilterListProps> = ({ }) => {
  const data: Creature[] = useSelector((state: RootState) => state.creatureData.value);

  const [creatureList, setLocalCreatureList] = useState<Creature[]>([]);
  const [creatureTrie] = useState(new Trie());
  useEffect(() => {
    setLocalCreatureList(data);
    console.log("building Trie ", searchTerm);
    data.forEach((creature) => {
      creatureTrie.insert(creature.name.toLowerCase());
    });
  });

  const [filteredCreatures, setFilteredCreatures] = useState<Creature[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log("searchTerm? ", searchTerm)
    if (searchTerm === '') {
      setFilteredCreatures(creatureList); // If input is empty, show all creatures
    } else {
      const matchedCreatureNames = creatureTrie.getAllWordsWithPrefix(searchTerm.toLowerCase());
      const filtered = creatureList.filter(creature =>
        matchedCreatureNames.includes(creature.name.toLowerCase())
      );
      setFilteredCreatures(filtered);

      console.log("filtered Creatures: ", filtered)

    }

  }, [searchTerm, creatureTrie]);


  return (
    <div>
      <input
        type="text"
        placeholder="Search creatures..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCreatures.map((c, _) => (
        <CreatureData creatureID={c.id} />
      ))}
    </div>
  );
};

export default CreatureFilterList;
