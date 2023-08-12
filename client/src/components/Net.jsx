import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/MyContext';

function Net() {
  const { globalState } = useContext(MyContext);
  const [mapArray, setMapArray] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      let myMap = new Map();
      let cost = 0;

      for (const element of globalState.history) {
        if(element.resolved) continue
        cost = parseInt(element.amount1) - parseInt(element.amount2);
        myMap.set(element.title, (myMap.get(element.title) || 0) + cost);
      }

      setMapArray(Array.from(myMap));
    };

    fetchPeople();
  }, [globalState.history]);

  return (
    <div className='net-div'>
      {mapArray.length === 0
        ? 'nothing'
        : mapArray.map(([key, value]) => (
            <div className='net-flex' key={key}>
              <h1>{key}</h1>
              <p>&#8377; {value > 0 ? `+${value}` : value}</p>
            </div>
          ))}
    </div>
  );
}

export default Net;