import progressMascot from "../assets/progress-bar-mascot.png";

export default function CongratsOverlay({cancelCongrats}){
    return(
        <div id="congratsOverlay">
            <img src={progressMascot} alt=""/>
            <h1>Congratulations</h1>
            <p>You filled up your Progress Bar</p>
            <button onClick={cancelCongrats}>Thank You</button>
        </div>
    )
}