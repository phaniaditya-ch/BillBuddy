// import React, { useContext } from 'react'
// import { MyContext } from '../context/MyContext'

// function Net() {

//   const { globalState, setGlobalState } = useContext(MyContext)

//   let myMap = new Map()

//   const fetchPeople = async () => {
//     await globalState.history.forEach(element => {
//       cost += parseInt(element.amount1) - parseInt(element.amount2)
//       myMap[element.title] += cost
//     });

//     return myMap
//   }

//   let mapArray

//   fetchPeople().then(result => {
//     console.table([...myMap])
//     // setGlobalState({...globalState, netMap: Array.from(myMap)})
//   }).then(() => {
//     mapArray = Array.from(myMap);
//     console.log('netmap: ', myMap ,mapArray)
//   })

//   return (
//     <div>
      
//       {
      
//       mapArray.length === 0 ? 'nothing' :
//       mapArray.map(([key, value]) => (
//          <div className='net-flex' key={key}>
//           <h1>{key}</h1>
//           <p>{value}</p>
//         </div>
//       ))}

//     </div>
//   )
// }

// export default Net

















// import React, { useContext, useEffect, useState } from 'react';
// import { MyContext } from '../context/MyContext';

// function Net() {
//   const { globalState } = useContext(MyContext);
//   const [mapArray, setMapArray] = useState([]);

//   useEffect(() => {
//     const fetchPeople = async () => {
//       let myMap = new Map();
//       let cost = 0;
//       console.log('gS.history: ', globalState.history)
//       await Promise.all(globalState.history.map(async (element) => {
//         cost += parseInt(element.amount1) - parseInt(element.amount2);
//         myMap[element.title] = (myMap[element.title] || 0) + cost;
//       }));

//       console.log('myMap: ', Array.from(myMap))

//       setMapArray(Array.from(myMap));
//     };

//     fetchPeople().then(() => console.log('mapArray: ', mapArray));
//   }, [globalState.history]);

//   return (
//     <div>
//       {mapArray.length === 0
//         ? 'nothing'
//         : mapArray.map(([key, value]) => (
//             <div className='net-flex' key={key}>
//               <h1>{key}</h1>
//               <p>{value}</p>
//             </div>
//           ))}
//     </div>
//   );
// }

// export default Net;





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
    <div>
      {mapArray.length === 0
        ? 'nothing'
        : mapArray.map(([key, value]) => (
            <div className='net-flex' key={key}>
              <h1>{key}</h1>
              <p>{value > 0 ? `+${value}` : value}</p>
            </div>
          ))}
    </div>
  );
}

export default Net;
