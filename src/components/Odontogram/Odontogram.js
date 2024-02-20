import React, { useEffect, useState } from 'react';
import './Odontogram.css';
import Teeth from './Teeth';

function Odontogram() {
  // State untuk menyimpan data odontogram
  const [odontogramState, setOdontogramState] = useState({});

//   const initialState = 
//   {
//     "11": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "12": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "13": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "14": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "15": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "16": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "17": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 2,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "18": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 2
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "21": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "22": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "23": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "24": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "25": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "26": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "27": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "28": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "31": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "32": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "33": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "34": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "35": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "36": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "37": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "38": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "41": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "42": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "43": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "44": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "45": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "46": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "47": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "48": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "51": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "52": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "53": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "54": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "55": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "61": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "62": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "63": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "64": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "65": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "71": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "72": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "73": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "74": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "75": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "81": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "82": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "83": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "84": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "85": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     }
// }

//   useEffect(() => {
//     setOdontogramState(prevState => ({
//       ...prevState,
//       "17": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 2,
//             "right": 0
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     "18": {
//         "Cavities": {
//             "center": 0,
//             "top": 0,
//             "bottom": 0,
//             "left": 0,
//             "right": 2
//         },
//         "Extract": 0,
//         "Crown": 0,
//         "Filter": 0,
//         "Fracture": 0
//     },
//     }))
//   }, [])


  // Fungsi untuk menangani perubahan pada gigi dan memperbarui state odontogram
  const handleToothUpdate = (id, toothState) => {
    // Menggunakan fungsi setOdontogramState untuk memperbarui state
    setOdontogramState(prevState => ({
      ...prevState,
      [id]: toothState,
    }));
  };

  // console.log(odontogramState)

  // console.log(initialState)

  return (
    <div className="Odontogram">
      <svg version="1.1" height="200%" width="100%" >
        <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
        <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />
        <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
        <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />
        <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
        <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />
        <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
        <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} />
      </svg>
    </div>
  );
}

export default Odontogram;
