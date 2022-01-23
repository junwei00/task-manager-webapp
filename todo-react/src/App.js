import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import Tasks from './components/Tasks'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import NewTask from './components/NewTask'
import Users from './components/Users'
import EditUser from './components/EditUser'

function App() {
  const [showNewTask, setShowNewTask] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [taggedTaskList, setTaggedTaskList] = useState([])
  const [filteredTaskList, setFilteredTaskList] = useState([])
  const [tagList, setTagList] = useState([])
  const [currentSort, setCurrentSort] = useState('Created')
  const [userList, setUserList] = useState([])
  const [currentUserId, setCurrentUserId] = useState(-1)
  const [currentUsername, setCurrentUsername] = useState('')
  const [showEditUser, setShowEditUser] = useState(false)

  function getUserTasks() {
    axios
      .get(`/api/${currentUserId}/tasks`)
      .then((res) => {
        setTaskList(res.data)
        setTaggedTaskList(res.data)
        setFilteredTaskList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function getUserTags() {
    axios
      .get(`/api/${currentUserId}/tags`)
      .then((res) => {
        setTagList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function getUsers() {
    axios
      .get("/api/users")
      .then((res) => {
        setUserList(res.data)
      })
      .catch((error) => console.log(error))
  }

  function filterTasksByTag(id) {
    let result = taskList.filter((task) => {
      let tags = task.tags.map((tag) => {return tag.id})
      return tags.includes(id)
    })
    result = sortTasks('Current', result)
    setTaggedTaskList(result)
    setFilteredTaskList(result)
  }

  function resetTagFilter() {
    const resetList = sortTasks('Current', taskList);
    setTaggedTaskList(resetList)
    setFilteredTaskList(resetList)
  }

  function handleSearch(e) {
    let searchTerm = e.target.value.toLowerCase()
    let result = []
    result = taggedTaskList.filter((task) =>
      task.title.toLowerCase().search(searchTerm) != -1
    )
    setFilteredTaskList(result)
  }

  function handleSort(sortBy) {
    setFilteredTaskList(sortTasks(sortBy, filteredTaskList))
  }

  function sortTasks(sortBy, list) {
    if (sortBy === 'Current') {
      sortBy = currentSort
    } else {
      setCurrentSort(sortBy)
    }
    let result = [...list]
    if (sortBy == "Created") {
      result.sort((task1, task2) => 
        {if (task1.created_at > task2.created_at) return -1
         if (task2.created_at > task1.created_at) return 1
         return 0})
    } else if (sortBy == "Edited") {
      result.sort((task1, task2) => 
        {if (task1.updated_at > task2.updated_at) return -1
         if (task2.updated_at > task1.updated_at) return 1
         return 0})
    } else if (sortBy == "Deadline") {
      result.sort((task1, task2) => 
        {if (task1.deadline === null) return 1
         if (task2.deadline === null) return -1
         if (task1.deadline > task2.deadline) return 1
         if (task2.deadline > task1.deadline) return -1
         return 0})
    } else if (sortBy == "Alphanumeric") {
      result.sort((task1, task2) => 
        task1.title.localeCompare(task2.title))
    } else {
      console.log("Error: Unknown sorting case:" + sortBy)
    }
    return result
  }

  function refreshTask(updatedTask) {
    function newList(oldList) {
      return oldList.map((task) => {
        return (
          (task.id === updatedTask.id)
          ? updatedTask
          : task)})
    }
    setFilteredTaskList(newList(filteredTaskList))
    setTaggedTaskList(newList(taggedTaskList))
    setTaskList(newList(taskList))
  }

  function refreshDeletedTask(deletedTask) {
    function newList(oldList) {
      return oldList.filter((task) => {
        return (task.id !== deletedTask.id)})
    }
    setFilteredTaskList(newList(filteredTaskList))
    setTaggedTaskList(newList(taggedTaskList))
    setTaskList(newList(taskList))
  }

  const mainPage = 
    <div>
      <Sidebar 
        currentUserId={currentUserId}
        currentUsername={currentUsername} 
        tagList={tagList} 
        getUserTags={getUserTags} 
        filterTasksByTag={filterTasksByTag}
        resetTagFilter={resetTagFilter}
        taskList={taskList} 
        setShowEditUser={setShowEditUser}/>
      <div className='Main'>
        <Topbar 
          handleSearch={handleSearch} 
          handleSort={handleSort}
          buttonState={showNewTask} 
          onClickNewTask={() => setShowNewTask(!showNewTask)} />
        {showNewTask && 
          <NewTask 
            currentUserId={currentUserId}
            setShowNewTask={setShowNewTask} 
            getUserTasks={getUserTasks} />}
        <Tasks 
          tagList={tagList} 
          filteredTaskList={filteredTaskList} 
          getUserTags={() => getUserTags()}
          refreshTask={refreshTask} 
          refreshDeletedTask={refreshDeletedTask} />
      </div>
    </div>

  useEffect(() => {
    getUsers()
    if (currentUserId !== -1) {
      getUserTasks()
      getUserTags()
    }
  }, [currentUserId])

  return (
    <div className="App">
      {
        (currentUserId === -1)
        ? <Users 
            userList={userList} 
            setCurrentUserId={setCurrentUserId}
            setCurrentUsername={setCurrentUsername}
            getUsers={getUsers}/>
        : mainPage
      }
      {
        (showEditUser)
        && <EditUser 
              currentUserId={currentUserId}
              currentUsername={currentUsername}
              userList={userList}
              setCurrentUsername={setCurrentUsername}
              setShowEditUser={setShowEditUser}/>
      }
    </div>
  );
}

export default App;
