import { useState, useEffect } from "react";
import Header from "./components/Header";
import CheckList from "./components/Checklist";
import TaskOverlay from "./components/TaskOverlay";
import Progressbar from "./components/ProgressBar";
import DeleteOverlay from "./components/DeleteOverlay";
import CongratsOverlay from "./components/CongratsOverlay";
import TaskFilter from "./components/TaskFilter";
import ClearandReset from "./components/ClearandReset";
import ResetOverlay from "./components/ResetOverlay";
import ClearCompletedOverlay from "./components/ClearCompletedOverlay";

import progressMascot from "../src/assets/progress-bar-mascot.png";
import strawerryMilk from "../src/assets/strawberry-milk.png"
import chaseGoals from "../src/assets/chase-goals.png"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [dateFilter, setDateFilter] = useState("This Month"); // Filters by date
  const [statusFilter, setStatusFilter] = useState("All"); // Filters by status
  const [allTasksForDateFilter, setAllTasksForDateFilter] = useState([]);
  const [clearOverlay, setClearOverlay] = useState(false);
  const [resetOverlay, setResetOverlay]= useState(false)
  const [createTask, setCreateTask] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [congratsOverlay, setCongratsOverlay] = useState(false);
  const [congratsDismissed, setCongratsDismissed] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("myTasks");
    if (storedTasks) {
      setTodoList(JSON.parse(storedTasks));
    }
  }, [])

  const saveTasks = (tasks) => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  };

  function handleSubmit(event) {
      event.preventDefault();
      
      let taskTitle = event.target[0].value;
      let taskPriority = event.target[1].value;
      let taskDueDate = event.target[2].value;

      if(taskPriority==="P1 - Urgent & Important"){
        taskPriority = "P1"
      }
      if(taskPriority==="P2 - Not Urgent but Important"){
        taskPriority = "P2"
      }
      if(taskPriority==="P3 - Urgent but Not Important"){
        taskPriority = "P3"
      }
      if(taskPriority==="P4 - Neither Urgent nor Important"){
        taskPriority = "P4"
      }

      setTodoList((prevTodos) => [
          { 
            taskTitle, 
            taskPriority, 
            taskDueDate,
            completed: false,
            id: self.crypto.randomUUID(),
          },
          ...prevTodos
      ]);

      setCreateTask(false);
     
      event.target.reset();
  }

  const sortedTodos = [...todoList].sort((a, b) => a.completed - b.completed);

  function toggleComplete(id) {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDateFilterChange(selectedDateFilter) {
    setDateFilter(selectedDateFilter);
  }
  
  function handleStatusFilterChange(selectedStatusFilter) {
    setStatusFilter(selectedStatusFilter);
  }

  useEffect(() => {
    const today = new Date();
    let filteredByDate = sortedTodos.filter(task => {
      const taskDate = new Date(task.taskDueDate);
      
      switch (dateFilter) {
          case "Today":
              return taskDate.toDateString() === today.toDateString();
          case "Tomorrow":
              const tomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              return taskDate.toDateString() === tomorrow.toDateString();
          case "This Week":
              const weekStart = new Date(today);
              weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6); // End of the week (Saturday)
              return taskDate >= weekStart && taskDate <= weekEnd;
          case "This Month":
              return taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear();
          case "This Year":
              return taskDate.getFullYear() === today.getFullYear();
          default:
              return true;
      }
    });

    setAllTasksForDateFilter(filteredByDate);

    let finalFiltered = filteredByDate.filter(task => {
      switch (statusFilter) {
        case "All":
          return true; // Show all tasks in selected date range
        case "Pending":
          return !task.completed; // Show only uncompleted tasks
        case "Completed":
          return task.completed; // Show only completed tasks
        default:
          return true;
      }
    });

    setFilteredTodos(finalFiltered);
  }, [dateFilter, statusFilter, todoList]);

  useEffect(() => {
    console.log(filteredTodos);
  }, [filteredTodos]);

  function handleDelete() {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== taskToDelete));
    setTaskToDelete(null); // Close the overlay
  }

  const completedTasks = allTasksForDateFilter.filter(todo => todo.completed);
  useEffect(() => {
    // const uncompletedTasks = todoList.filter(todo => !todo.completed);
    saveTasks(todoList);
   if (statusFilter === 'All'){
    if (completedTasks.length !== allTasksForDateFilter.length) {
      setCongratsDismissed(false); // Reset if tasks are added/unchecked
    }
    if (completedTasks.length === allTasksForDateFilter.length && allTasksForDateFilter.length > 0 && !congratsDismissed) {
      setCongratsOverlay(true);
    } 
   }
  })
  

  function handleCloseCongrats() {
    setCongratsOverlay(false);
    setCongratsDismissed(true); // Prevent it from reopening immediately
  }

  function handleOverlay(){
    setCreateTask(true);
  }

  function handleCongrats(value){
    if(value === "100"){
      setCongratsOverlay(true)
    }
  }

  function handleTaskChange(id, newTitle, newDate) {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, taskTitle: newTitle, taskDueDate: newDate } : todo
      )
    );
  }
  
  function handleReset(){
    setTodoList([]);
    setResetOverlay(false)
  }

  function handleClear(){
    const remainingTasks = todoList.filter(task => !task.completed); // Keep only pending tasks
    setTodoList(remainingTasks); 
    setClearOverlay(false)
  }

  
  return (
    <>
    <Header onDateFilterChange={handleDateFilterChange} handleOverlay={handleOverlay}/>
    <div id="siteBody">
      <Progressbar max={allTasksForDateFilter.length} value={completedTasks.length} onChange={()=> handleCongrats(completedTasks.length)}/>
      <div id="journalImages">
        <img src={progressMascot} alt="" id="mascot"/>
        <img src={strawerryMilk} alt="" id="strawberryMilk"/>
        <img src={chaseGoals} alt="" id="chaseGoals"/>
      </div>
      <div className="TotalCheckList">
        <button id="addTaskButton" onClick={handleOverlay}><i className="fa-solid fa-plus" alt="Add Task"></i>   Click to Add a Task</button>
        <TaskFilter onStatusFilterChange={handleStatusFilterChange} isSelected={statusFilter}/>
        <ol className="taskCheckList">
            {filteredTodos && filteredTodos.length > 0 ? (
                filteredTodos?.map((item) => (
                <CheckList 
                  key={item.id} 
                  checked={item.completed} 
                  taskAdded={item.taskTitle} 
                  taskPriority={item.taskPriority} 
                  taskDue={item.taskDueDate} 
                  handleDelete={()=>setTaskToDelete(item.id)}
                  onChange={() => toggleComplete(item.id)}
                  id={item.id}
                  onChangeName={handleTaskChange}
                />
                ))
            ) : (
                <p id="altText">Seems lonely in here, what are you up to?</p>
            )}
        </ol>
        {createTask !== false &&(
        <TaskOverlay handleSubmit={handleSubmit} cancelCreateTask={()=>setCreateTask(false)}/>
        )}
        {taskToDelete !== null && (
          <DeleteOverlay handleDelete={handleDelete} cancelDelete={() => setTaskToDelete(null)}/>
        )}
      </div>
      {congratsOverlay !== false && (
        <CongratsOverlay cancelCongrats={handleCloseCongrats}/>
      )}

      {resetOverlay !== false && (
        <ResetOverlay allowReset={handleReset} cancelReset={()=> setResetOverlay(false)}/>
      )}

      {clearOverlay !== false && (
        <ClearCompletedOverlay allowClear={handleClear} cancelClear={()=> setClearOverlay(false)}/>
      )}

      <ClearandReset Clear={()=> setClearOverlay(true)} Reset={()=> setResetOverlay(true)}/>
   
    </div>
     
    </>
  );
}

export default App;
