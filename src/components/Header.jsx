import { useState } from "react";

function Header({ onFilterChange, handleOverlay }) {
    const [filter, setFilter] = useState("This Month");

    function handleFilterChange(event) {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        onFilterChange(selectedFilter); // Notify parent about the filter change
    }

    return (
        <header>
           <h1>My<br/>TodoList</h1>
           <div className="filterandadd">
           <select name="filterDate" id="filterDate" onChange={handleFilterChange} value={filter}>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
            </select>
            <button className="addButton" onClick={handleOverlay}><i className="fa-solid fa-plus" alt="Add Task"></i></button>
           </div>
        </header>
    );
}

export default Header;
