'use client'
import React from 'react';
import TileImage from './creature_sprite';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Creature } from '../features/creature';



interface CreatureIDProps {
  creatureID: number; // Tile index passed in as a prop
}

const headers = [
  "Sprite", "ID", "Name", "Type 1", "Type 2", "Eve Level", "Attack",
  "Defense", "Sp. Attack", "Sp. Defense", "HP", "Speed"
];

const CreatureData: React.FC<CreatureIDProps> = ({ creatureID }) => {
  const data: Creature[] = useSelector((state: RootState) => state.creatureData.value);

  if (data.length == 0) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <div className="table-container">
      </div>

      <div className="table-container">
        <div className="container">
          <div className="basic-info">
            <table className="info-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={header}>{header}</th> // Render each string as a <th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><TileImage tileIndex={creatureID} /></td>
                  <td>{data[creatureID].id}</td>
                  <td>{data[creatureID].name}</td>
                  <td>{data[creatureID].type1}</td>
                  <td>{data[creatureID].type2}</td>
                  <td>{data[creatureID].evelevel}</td>
                  <td>{data[creatureID].atk}</td>
                  <td>{data[creatureID].deff}</td>
                  <td>{data[creatureID].spcatk}</td>
                  <td>{data[creatureID].spcdef}</td>
                  <td>{data[creatureID].hp}</td>
                  <td>{data[creatureID].spd}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatureData;
