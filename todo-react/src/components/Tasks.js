import Task from './Task'

function Tasks({ taskList }) {
  return (
    <div>
      <h2>My Tasks</h2>
      {taskList.map((task) => (
        <Task task = { task }/>
      ))}
    </div>
  );
}

export default Tasks