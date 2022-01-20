import axios from "axios";
import { useState } from "react";

function EditTask({ task, refreshTask, setShowEditTask }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [deadline, setDeadline] = useState(task.deadline)

  const handleSubmit = (e) => {
    patchTask()
  }

  function patchTask() {
    axios
      .put(`/api/tasks/${task.id}`, {
        title: title,
        description: description,
        deadline: deadline
      })
      .then((res) => {
        refreshTask()
        setShowEditTask(false)
      })
      .catch((error) => console.log(error))
  }

  return (
    <form className="EditTask" onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          className="Description"
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type='date'
          placeholder='Deadline'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <input className="Submit" type='submit' value='Save Task'/>
    </form>
  );
}

export default EditTask