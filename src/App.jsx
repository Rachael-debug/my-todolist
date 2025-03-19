import { useState, useEffect } from "react";
import Header from "./components/Header";
import CheckList from "./components/Checklist";
import TaskOverlay from "./components/TaskOverlay";
import Progressbar from "./components/ProgressBar";
import DeleteOverlay from "./components/DeleteOverlay";
import CongratsOverlay from "./components/CongratsOverlay";


import progressMascot from "../src/assets/progress-bar-mascot.png";
import strawerryMilk from "../src/assets/strawberry-milk.png"
import chaseGoals from "../src/assets/chase-goals.png"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("This Month");
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

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  useEffect(() => {
    const today = new Date();
    const filteredTasks = sortedTodos.filter(task => {
      const taskDate = new Date(task.taskDueDate);
      
      switch (filter) {
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

  setFilteredTodos(filteredTasks);
  }, [filter, todoList]);

  useEffect(() => {
    console.log(filteredTodos);
  }, [filteredTodos]);

  function handleDelete() {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== taskToDelete));
    setTaskToDelete(null); // Close the overlay
  }

  const completedTasks = filteredTodos.filter(todo => todo.completed);
  useEffect(() => {
    const uncompletedTasks = todoList.filter(todo => !todo.completed);
    saveTasks(uncompletedTasks);
    if (completedTasks.length !== filteredTodos.length) {
      setCongratsDismissed(false); // Reset if tasks are added/unchecked
    }
    if (completedTasks.length === filteredTodos.length && filteredTodos.length > 0 && !congratsDismissed) {
      setCongratsOverlay(true);
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
  

  
  return (
    <>
    <div className="headerandprogressWrapper">
      <Header onFilterChange={handleFilterChange} handleOverlay={handleOverlay}/>
      <Progressbar max={filteredTodos.length} value={completedTasks.length} onChange={()=> handleCongrats(completedTasks.length)}/>
    </div>
    <div id="journalImages">
      <img src={progressMascot} alt="" id="mascot"/>
      <img src={strawerryMilk} alt="" id="strawberryMilk"/>
      <img src={chaseGoals} alt="" id="chaseGoals"/>
    </div>
    <div className="TotalCheckList">
      <button id="addTaskButton" onClick={handleOverlay}><i className="fa-solid fa-plus" alt="Add Task"></i>   Click to Add a Task</button>
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
   
     
    </>
  );
}

export default App;
