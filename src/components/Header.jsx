import { useState, useEffect } from "react";

function Header({onDateFilterChange, handleOverlay }) {
    const [filter, setFilter] = useState("This Month");
    const [isScrolled, setIsScrolled] = useState(false);

    function handleFilterChange(event) {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        onDateFilterChange(selectedFilter); // Notify parent about the filter change
    }

    useEffect(() => {
        function handleScroll() {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <header className= {isScrolled ? 'scrolled' : undefined}>
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
