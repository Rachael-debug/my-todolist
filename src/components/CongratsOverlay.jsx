export default function CongratsOverlay({cancelCongrats}){
    return(
        <div id="congratsOverlay">
            <img src="..\src\assets\progress bar mascot.png" alt=""/>
            <h1>Congratulations</h1>
            <p>You filled up your Progress Bar</p>
            <button onClick={cancelCongrats}>Thank You</button>
        </div>
    )
}