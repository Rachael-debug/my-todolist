export default function Progressbar({max, value, onChange}){
    return(
      <div className="taskProgress">
        <label htmlFor="progress-bar">Total Progress</label>
        <progress id="progress-bar" max={max} value={value} onChange={onChange}></progress>
        <div id="progressPercent">
            <p>0%</p>
            <p>100%</p>
        </div>
      </div>
    )
}