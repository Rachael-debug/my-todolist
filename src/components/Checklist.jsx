import { useState } from "react";

export default function CheckList({taskAdded, checked, id, onChange,taskPriority, taskDue, handleDelete, onChangeName}){
    const [editMode, setEditMode] = useState(null);
    const [editText, setEditText] = useState(taskAdded);
    const [editDate, setEditDate] = useState(taskDue)

    function handleEditClick(){
       
        setEditMode((editing)=>!editing);
        // setEditText(currentTitle);

        if (editMode){
            onChangeName(id, editText, editDate);
        }
        
    }

    function handleChange(event){
        setEditText(event.target.value);
    }
    function handleDateChange(event){
        setEditDate(event.target.value);
    }

    // let editableTask = <label htmlFor={editText}>{editText}</label>;
    // if(editMode){
    //     editableTask = <input type="text" required value={editText} onChange={handleChange}/>
    // }
    return(
        <li className="eachTask">
            <div className="taskAdded">
                <input type="checkbox" name={taskAdded} checked={checked} onChange={onChange}/>
                {editMode ? (
                <input type="text" required value={editText} onChange={handleChange} id="changeTitle" />
                ) : (
                <label>{editText}</label>
                )}
            </div>
            <div className="taskInfo">
                <p className="priorityAdded">{taskPriority}</p> 
                
                {editMode ? (
                <input type="date" required value={editDate} onChange={handleDateChange} id="changeDate"/>
                ) : (
                <p className="dateAdded"><i className="fa-regular fa-calendar"></i>
                <label>{editDate}</label>
                </p>
                )}
                
                <button onClick={handleEditClick}>{editMode ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-pen-to-square"></i>}</button>
                <button id="deleteButton" onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}