import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState, useEffect } from 'react'
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./Components/About";

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {

    const res = await fetch(
      'http://18.191.249.225:5000/tasks'
    )
    const data = res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {

    const res = await fetch(
      `http://18.191.249.225:5000/tasks/${id}`
    )
    const data = res.json()

    return data
  }

  //Delete Task
  const deleteTask = async (id) => {

    await fetch(`http://18.191.249.225:5000/tasks/${id}`,
      {
        method: 'Delete',
      })

    setTasks(tasks.filter((task) =>
      task.id !== id

    ))
  }

  //Add Task
  const addTask = async (task) => {

    const res = await fetch('http://18.191.249.225:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()

    console.log("Added tasks: " + data)
    setTasks([...tasks, data])


    // const id = Math.floor( Math.random() * 10000 ) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //toggleReminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)

    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://18.191.249.225:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask)
      })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, reminder: data.reminder } : task))
  }

  return (

    <Router basename={'/taskapp'}>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route path='/' exact render={(props) => 
          (
            <> 
              {showAddTask && <AddTask onAdd=
                {addTask} />}

              {tasks.length > 0 ? (<Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} />) : (' No Task Left')}

            </>
          )
        
        }
        />
        
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
