'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setCreatureList, Creature } from './features/creature';
import { setMoveList, Move } from "./features/moves";
import { AppDispatch } from './store'; // Import the dispatch type
import CreatureBuilder from './components/creature_builder';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch

  useEffect(() => {
    // Fetch or load the list data
    const fetchCreatureData = async () => {
      const response = await fetch('/creatures.json'); // Replace with your API
      const creatureData: Creature[] = await response.json();
      dispatch(setCreatureList(creatureData)); // Dispatch the list to Redux
    };

    const fetchMoveData = async () => {
      const response = await fetch('/movedata.json'); // Replace with your API
      const moveData: Move[] = await response.json();
      dispatch(setMoveList(moveData))
    };



    fetchCreatureData(); // Fetch data on startup
    console.log("loaded creature data")
    fetchMoveData();
    console.log("loaded move data")
  }, [dispatch]);




  const [id, setID] = useState('');
  // Function to handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  // Function to validate if the input is between 1 and 31
  const isValidInput = (value: string): boolean => {
    const num = Number(value);
    return num >= 1 && num <= 31;
  };


  return (
    <div>
      <input
        type="number"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter a number" />
      <main className="flex-col ">
        {isValidInput(id) && <CreatureBuilder creatureID={Number(id)} />}
      </main>
    </div>
  );
};

export default App;

