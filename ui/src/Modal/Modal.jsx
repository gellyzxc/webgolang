import React, { useRef, useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";
import tickbox from "../tick-svgrepo-com.svg";

const Modal = ({ isUpdate, active, setActive, noteid }) => {
  const editInfo = useRef(null);
  const editTitle = useRef(null);

  console.log("from modal id:" + noteid);

  const EditNote = (id) => {
    console.log(id);
    axios
      .put(
        "http://localhost:9090/api/notes/edit",
        {
          id: id,
          created_at: "2022-05-16 23:54:53",
          title: editTitle.current.value,
          info: editInfo.current.value,
        },
        {
          withCredentials: false,
        }
      )
      .then(() => {
        isUpdate();
        setActive(false);
      });
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="inputs_">
          <input
            ref={editTitle}
            placeholder={"Note's Title"}
            type="text"
            className={"input_t"}
          />
          <input
            ref={editInfo}
            placeholder={"Note's Content"}
            type="text"
            className={"input_t"}
          />
        </div>
        <div onClick={() => EditNote(noteid)} className={"input_btn"}>
          <img className={"tick"} src={tickbox}></img>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// import React, {useRef} from 'react';
// import "./Modal.css"
// import axios from "axios";

// const Modal = ({isUpdate, active, setActive, noteid}) => {

//     const editInfo = useRef(null);
//     const editTitle = useRef(null);
// //     const [note, setNote] = useState(null);

// //   useEffect(() => {
// //     axios.get(
// //       `http://localhost:9090/api/notes/${noteid}`,
// //       {
// //         withCredentials: false
// //       }

// //     ).then(response => {
// //       // console.log(response.data);
// //       setNote(response.data);
// //     });

// //     return () => {
// //         setNote(null);
// //     }

// //   }, [noteid]);

// const EditNote = (id) => {
//     console.log(id)
//     axios.put('http://localhost:9090/api/notes/edit', {
//         id: id,
//         created_at: "2022-05-16 23:54:53",
//         title: editTitle.current.value,
//         info: editInfo.current.value
//     }, {
//         withCredentials: false
//     }).then(() => {
//         isUpdate();
//         setActive(false);
//     });
// }

//     return (
//         <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
//             <div className="modal_content" onClick={e => e.stopPropagation()}>
//                 <div className="inputs_">
//                     <input ref={editTitle} placeholder={"Note's Title"} type="text" className={"input_t"}/>
//                     <input ref={editInfo} placeholder={"Note's Content"} type="text" className={"input_t"} />
//                 </div>
//                 <button onClick={() => EditNote(noteid)} className={"input_btn"}>
//                     Add
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Modal;
