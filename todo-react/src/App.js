import { useState, useEffect } from 'react'
import './App.css';
import Tasks from './components/Tasks'
import TopBar from './components/TopBar'
import NewTask from './components/NewTask';

function App() {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      date: '1 Jan'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      date: '2 Jan'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      date: '3 Jan'
    }
  ])
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="App">
      <TopBar buttonState={showNewTask} onClickNewTask={() => setShowNewTask(!showNewTask)} />
      {showNewTask && <NewTask /> }
      <Tasks taskList={ taskList } />
    </div>
  );
}

export default App;
