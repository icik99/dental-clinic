// import React, { useEffect, useState } from 'react'
// import Odontogram from '../../components/Odontogram/Odontogram';

// export default function CobaOdontogram() {
    

//     const [initialOdontogramState, setInitialOdontogramState] = useState({});

//     useEffect(() => {
//         // Fetch initial state from an API or define it statically
//         const fetchInitialState = async () => {
//             // Example static data
           
//             const dataOdontogram = {
//                 "11": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "12": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "13": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "14": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "15": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "16": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "17": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "18": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "21": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "22": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "23": {
//                     "Cavities": {
//                         "center": 1,
//                         "top": 1,
//                         "bottom": 1,
//                         "left": 1,
//                         "right": 1
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "24": {
//                     "Cavities": {
//                         "center": 1,
//                         "top": 1,
//                         "bottom": 1,
//                         "left": 1,
//                         "right": 1
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "25": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "26": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "27": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "28": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "31": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "32": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "33": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "34": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "35": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "36": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "37": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "38": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "41": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "42": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "43": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "44": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "45": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "46": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "47": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "48": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "51": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "52": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "53": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "54": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "55": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "61": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "62": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "63": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "64": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "65": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "71": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "72": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "73": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "74": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "75": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "81": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "82": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "83": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "84": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 },
//                 "85": {
//                     "Cavities": {
//                         "center": 0,
//                         "top": 0,
//                         "bottom": 0,
//                         "left": 0,
//                         "right": 0
//                     },
//                     "Extract": 0,
//                     "Crown": 0,
//                     "Filter": 0,
//                     "Fracture": 0
//                 }
//             }
//             setInitialOdontogramState(dataOdontogram);

//             // If fetching from an API, it would look something like this:
//             // const response = await fetch('/api/odontogram');
//             // const data = await response.json();
//             // setInitialOdontogramState(data);
//         };

//         fetchInitialState();
//     }, []);
//   return (
//     <div className='h-screen flex items-center justify-center px-40'>

//         <div className='w-full'>
//             TES ODONTOGRAM
//             <Odontogram initialOdontogramState={initialOdontogramState} />
//         </div>
//     </div>
//   )
// }
