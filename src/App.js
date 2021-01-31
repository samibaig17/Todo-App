import Header from'./components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'

function App() {

  const[showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTask()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])

  //FETCH TASK
  const fetchTask = async () => {
      const res = await fetch('https://localhost:3001/tasks')
      const data = await res.json()

      return data
    }

  //ADD TASK
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', 
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(task),
      })
    //const id = Math.floor(Math.random() * 1000) + 1
    //const newTask = {id, ...task}
    //setTasks([...tasks, newTask])


  const data = res.json()
  setTasks([...tasks, data])

  //DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //TOGGLE REMINDER
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? 
      {...task, reminder: !task.reminder} :  task
      )
    )
    
  }


  return (
    <div className='container'>

      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} 
                  onDelete={deleteTask} 
                  onToggle={toggleReminder}/>) 
      : 
      ('No Tasks to Show'

      )}
    
    </div>

  );
}


export default App;
