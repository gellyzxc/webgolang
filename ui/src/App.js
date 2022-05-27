import './App.css';
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal/Modal";
import AddModal from "./Modal/AddModal";
import AddButton from '../src/add-svgrepo-com.svg'
import EditButton from '../src/edit-3-svgrepo-com.svg'
import DelButton from '../src/close-svgrepo-com.svg'

function App() {
  let noteid
  const [modalActive, setModalActive] = useState(false)
  const [modalAddActive, setAddModalActive] = useState(false)
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

  const openAddModal = () => {
    setAddModalActive(true);
  }


  const DelNote = (id) => {
    axios.delete('http://localhost:9090/api/notes/' + id).then(() => {
      setIsUpdate(!isUpdate)
    })
  }

  return (
    <div className="App">
      <div className="notes_display_block">
        <div className='header'>
          <div className='header_text'>gellyzxc's notes</div>
          <div className='header_buttons'>
            <button className='add_btn' onClick={() => openAddModal()}><img className='add_button' src={AddButton}></img></button>
          </div>
        </div>
        {/* TILES START */}
        <div className="tile">
          {!!notes && notes.map((note, index) => (
            <div className="note_block" key={index}>
              <div className="note_main">
                <strong>{note.id}.</strong>
                <div className="note_text">{note.title} - {note.info}</div>
              </div>
              <div className={"buttons_container"}>
                <button className="text_btn" onClick={() => DelNote(note.id)}><img className='add_button' src={DelButton}></img></button>
                <button className="text_btn_second" onClick={() => openModalEdit(note.id)}><img className='add_button' src={EditButton}></img></button>
              </div>
            </div>
          ))}
        </div>
        {/* TILES END */}
        {/* <div className="buttons">
           <input ref={inputInfo} placeholder={"Загловок заметки"} type="text" className={"input"}/>
           <input ref={inputTitle} placeholder={"pepe"} type="text" className={"input"} />
           <button onClick={() => addNote()} className={"input_btn"}>
               Add
           </button>
       </div> */}
      </div>
      <AddModal isUpdate={() => setIsUpdate(!isUpdate)} active={modalAddActive} setActive={setAddModalActive}></AddModal>
      {!!notes && notes.map((note, index) => (
        <Modal key={index} isUpdate={() => setIsUpdate(!isUpdate)} active={modalActive} setActive={setModalActive} noteid={note.id}>
        </Modal>))}
    </div>
  );
}

export default App;

//