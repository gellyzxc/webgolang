import React, {useRef, useState, useEffect} from 'react';
import "./Modal.css"
import axios from "axios";

const AddModal = ({isUpdate, active, setActive}) => {

    const editInfo = useRef(null);
    const editTitle = useRef(null);

    const AddNote = (id) => {
        console.log(id)
        axios.post('http://localhost:9090/api/notes/add', {
            id: id,
            created_at: "2022-05-16 23:54:53",
            title: editTitle.current.value,
            info: editInfo.current.value
        }, {
            withCredentials: false
        }).then(() => {
            isUpdate();
            setActive(false);
        });
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="inputs_">
                    <input ref={editTitle} placeholder={"Загловок заметки"} type="text" className={"input_t"}/>
                    <input ref={editInfo} placeholder={"pepe"} type="text" className={"input_t"} />
                </div>
                <button onClick={() => AddNote()} className={"input_btn"}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddModal;

