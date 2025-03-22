export default function ClearandReset({Clear, Reset}){
    return(
        <div id="clearandResetButtons">
            <button id="clearCompletedButton" onClick={Clear}>Clear Completed Tasks</button>
            <button id="resetAppButton" onClick={Reset}>Reset App</button>
        </div>
    )
}