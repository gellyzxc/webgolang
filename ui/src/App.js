import './App.css';
import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import Modal from "./Modal/Modal";

function App() {
    let noteid
  const [modalActive, setModalActive] = useState(false)

  const [notes, setNotes] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

  const inputInfo = useRef(null);
  const inputTitle = useRef(null);

  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }

    ).then(response => {
      // console.log(response.data);
      setNotes(response.data);
    });

  }, [isUpdate]);

    const addNote = () => {
        axios.post('http://localhost:9090/api/notes/add', {
            title: inputTitle.current.value,
            info: inputInfo.current.value
        }, {
            withCredentials: false
        }).then(() => {
            setIsUpdate(!isUpdate)
        })
    }

    const openModalEdit = (id) => {
        setModalActive(true);
        const noteid = id;
    }


    const DelNote = (id) => {
        axios.delete('http://localhost:9090/api/notes/' + id).then(() => {
            setIsUpdate(!isUpdate)
        })
    }

  return (
<div className="App">
   <div className="notes_display_block">
      <div className="tile">
         {!!notes && notes.map((note, index) => (
         <div className="note_block" key={index}>
             <div className="note_main">
                 <strong>{note.id}.</strong>
                 <div className="note_text">{note.title} - {note.info}</div>
             </div>
             <div className={"buttons_container"}>
                 <button className="text_btn" onClick={() => DelNote(note.id)}>Удалить</button>
                 <button className="text_btn_second" onClick={() => openModalEdit(note.id)}>Редактировать</button>
             </div>
      </div>
         ))}
      </div>
       <div className="buttons">
           <input ref={inputInfo} placeholder={"Загловок заметки"} type="text" className={"input"}/>
           <input ref={inputTitle} placeholder={"pepe"} type="text" className={"input"} />
           <button onClick={() => addNote()} className={"input_btn"}>
               Add
           </button>
       </div>
   </div>
    {!!notes && notes.map((note, index) => (
    <Modal key={index} isUpdate={() => setIsUpdate(!isUpdate)} active={modalActive} setActive={setModalActive} noteid={note.id}>
    </Modal>))}
</div>
  );
}

export default App;

//