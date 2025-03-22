import resetAppImg from "../assets/reset-app.png"

export default function ResetOverlay({allowReset, cancelReset}){
    return(
        <div id="Overlay">
            <img src={resetAppImg} alt="" />
            <h2>Reset App</h2>
            <p>Are you sure?</p>
            <div id="confirm">
                <button id="allow" onClick={allowReset}>Yes, Reset</button>
                <button id="cancel"onClick={cancelReset}>Cancel</button>
            </div>
        </div>
    )
}