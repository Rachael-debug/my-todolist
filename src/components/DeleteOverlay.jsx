export default function DeleteOverlay({handleDelete, cancelDelete}){
    return(
        <div id="deleteOverlay">
            <i className="fa-solid fa-heart-crack"></i>
            <h2>Delete Task</h2>
            <p>Are you sure?</p>
            <div id="confirmDelete">
                <button id="allowDelete" onClick={handleDelete}>Yes, Delete</button>
                <button id="cancelDelete"onClick={cancelDelete}>Cancel</button>
            </div>
        </div>
    )
}