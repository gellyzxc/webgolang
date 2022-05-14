import './App.css';
import axios from "axios";
import React, {useState, useEffect, useRef} from "react";

function App() {
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
      console.log(response.data);
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
         <div className="note_block" key={index}>{note.title} - {note.info} <button className="delete_btn" onClick={() => DelNote(note.id)}>Удалить</button></div>
         ))}
      </div>
      <div className="buttons">
      <div className="first"><label>ZZAGOGLOVOK</label>
         <input ref={inputInfo} type="text"/>
      </div>
      <div className="second">
         <label>Opisanie</label>
         <input ref={inputTitle} type="text"/>
         <button onClick={() => addNote()}>
         Add
         </button>
      </div>
   </div>
   </div>

</div>
  );
}

export default App;
