'use client'
import MoveFilterList from "./components/move_filter_list"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCreatureList, Creature } from './features/creature';
import { setMoveList, Move } from "./features/moves";
import { AppDispatch } from './store'; // Import the dispatch type
import CreatureFilterList from "./components/creature_filter_list";

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






  return (
    <div>
      <main className="flex-col ">
        <CreatureFilterList />
        <MoveFilterList />
      </main>
    </div>
  );
};

export default App;

