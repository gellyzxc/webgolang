import React, {useRef, useState} from 'react';
import "./Modal.css"
import axios from "axios";

const Modal = ({active, setActive, noteid}) => {

    const editInfo = useRef(null);
    const editTitle = useRef(null);


    const EditNote = (id) => {
        console.log(id)
        axios.put('http://localhost:9090/api/notes/edit', {
            id: id,
            created_at: "2022-05-16 23:54:53",
            title: editTitle.current.value,
            info: editInfo.current.value
        }, {
            withCredentials: false
        })
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <input ref={editInfo} placeholder={"Загловок заметки"} type="text" className={"input"}/>
                <input ref={editTitle} placeholder={"pepe"} type="text" className={"input"} />
                <button onClick={() => EditNote(noteid)} className={"input_btn"}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default Modal;


