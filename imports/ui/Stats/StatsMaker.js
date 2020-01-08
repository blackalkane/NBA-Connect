import React from "react";
import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    whatever: Math.floor(Math.random() * 30),
    fg2PtAtt: Math.floor(Math.random() * 30),
    fg2PtAttPerGame: Math.floor(Math.random() * 30),
    fg2PtMade: Math.floor(Math.random() * 30),
    fg2PtMadePerGame: Math.floor(Math.random() * 30),
    fg2PtPct: Math.floor(Math.random() * 30),
    fg3PtAtt: Math.floor(Math.random() * 30),
    fg3PtAttPerGame: Math.floor(Math.random() * 30),
    fg3PtMade: Math.floor(Math.random() * 30),
    fg3PtMadePerGame: Math.floor(Math.random() * 30),
    fg3PtPct: Math.floor(Math.random() * 30),
    fgAtt: Math.floor(Math.random() * 30),
    fgAttPerGame: Math.floor(Math.random() * 30),
    fgMade: Math.floor(Math.random() * 30),
    fgMadePerGame: Math.floor(Math.random() * 30),
    fgPct: Math.floor(Math.random() * 30),
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson()
    };
  });
}
