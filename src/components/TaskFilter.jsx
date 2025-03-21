export default function TaskFilter({isSelected, onStatusFilterChange}){
    return(
        <div className="task-filter">
            <button className= {isSelected==='All' ? 'active' : undefined} onClick={() => onStatusFilterChange("All")}>All</button>
            <button className= {isSelected === "Pending" ? 'active' : undefined} onClick={() => onStatusFilterChange("Pending")}>Pending</button>
            <button className= {isSelected=== "Completed" ? 'active' : undefined} onClick={() => onStatusFilterChange("Completed")}>Completed</button>
        </div>
    )
}