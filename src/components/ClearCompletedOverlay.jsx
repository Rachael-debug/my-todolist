import clearImg from "../assets/clear-completed.png"

export default function ClearCompletedOverlay({allowClear, cancelClear}){
    return(
        <div id="Overlay">
            <img src={clearImg} alt="" />
            <h2>Clear All Completed Tasks</h2>
            <p>Are you sure?</p>
            <div id="confirm">
                <button id="allow" onClick={allowClear}>Yes, Clear</button>
                <button id="cancel"onClick={cancelClear}>Cancel</button>
            </div>
        </div>
    )
}