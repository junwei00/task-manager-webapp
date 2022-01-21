import Task from './Task'

function Tasks({ setTaskList, setFilteredTaskList, filteredTaskList, tagList, getTags}) {
  return (
    <div className="Tasks">
      <h2>My Tasks</h2>
      {filteredTaskList.map((task, index) => {
        let thisTask = <Task key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
                        filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
                        tagList={tagList} getTags={getTags}/>
        if (!(task.status == "done")) {
          return thisTask
        }
      })}
      {filteredTaskList.map((task, index) => {
        let thisTask = <Task key={task.id} index={index} setFilteredTaskList={setFilteredTaskList} 
                        filteredTaskList={filteredTaskList} task={task} setTaskList={setTaskList}
                        tagList={tagList} getTags={getTags}/>
        if (task.status == "done") {
          return thisTask
        }
      })}
    </div>
  );
}

export default Tasks