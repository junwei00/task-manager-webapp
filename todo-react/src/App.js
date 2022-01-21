import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import Tasks from './components/Tasks'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import NewTask from './components/NewTask'

function App() {
  const [showNewTask, setShowNewTask] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [filteredTaskList, setFilteredTaskList] = useState([])
  const [tagList, setTagList] = useState([])

  function getTasks() {
    axios
      .get("/api/tasks")
      .then((res) => {
        setTaskList(res.data)
        setFilteredTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function getTasksByTag(id) {
    axios
      .get(`/api/tags/${id}/tasks`)
      .then((res) => {
        setFilteredTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function filterTasksByTag(id) {
    let result = []
    result = taskList.filter((task) => {
      let tags = task.tags.map((tag) => {return tag.id})
      return tags.includes(id)
    })
    setFilteredTaskList(result)
  }

  function getTags() {
    axios
      .get("/api/tags")
      .then((res) => {
        setTagList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function handleSearch(e) {
    let searchTerm = e.target.value.toLowerCase()
    let result = []
    result = taskList.filter((task) =>
      task.title.toLowerCase().search(searchTerm) != -1
    )
    setFilteredTaskList(result)
  }

  function handleSort(e) {
    let sortBy = e.target.value
    let result = [...filteredTaskList]
    if (sortBy == "Created") {
      result.sort((task1, task2) => 
        {if (task1.created_at > task2.created_at) return -1
         if (task2.created_at > task1.created_at) return 1
         return 0})
    } else if (sortBy == "Deadline") {
      result.sort((task1, task2) => 
        {if (task1.deadline > task2.deadline) return 1
         if (task2.deadline > task1.deadline) return -1
         return 0})
    } else if (sortBy == "Alphanumeric") {
      result.sort((task1, task2) => 
        task1.title.localeCompare(task2.title))
    } else {
      console.log("Error: Unknown sorting case")
    }
    setFilteredTaskList(result)
  }

  useEffect(() => {
    getTasks()
    getTags()
  }, [])

  return (
    <div className="App">
      <Sidebar tagList={tagList} getTags={getTags} filterTasksByTag={filterTasksByTag}
        setFilteredTaskList={setFilteredTaskList} taskList={taskList}/>
      <div className='Main'>
        <Topbar handleSearch={handleSearch} handleSort={handleSort} 
          buttonState={showNewTask} onClickNewTask={() => setShowNewTask(!showNewTask)} />
        {showNewTask && <NewTask setShowNewTask={setShowNewTask} getTasks={getTasks}/> }
        <Tasks setTaskList={setTaskList} setFilteredTaskList={setFilteredTaskList} 
          tagList={tagList} filteredTaskList={filteredTaskList} getTags={() => getTags()}/>
      </div>
    </div>
  );
}

export default App;
