import { FETCH_Data_BEGIN, FETCH_Data_SUCCESS, FETCH_Data_FAILURE } from '../actions';
import namor from "namor";
import React from "react";

var makeData = function(len) {
  var arr = [];
  for (i=0; i<len; i++){
    arr[i] = newPerson();
  };
  return arr;
}

const newPerson = () => {
  return {
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

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const initialState = {
  playersData: makeData(100),
  fetching: false,
  error: null,
};

export default function data(state = initialState, action) {
      return state;
  }
