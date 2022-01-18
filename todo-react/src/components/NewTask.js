import axios from "axios";
import { useState } from "react";

function NewTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (e) => {
    postTask()
  }

  function postTask() {
    axios
      .post("/api/tasks", {
        title: title,
        description: description,
        deadline: deadline
      })
      .then((res) => {
        setTitle('')
        setDescription('')
        setDeadline(new Date())
      })
      .catch((error) => console.log(error))
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <input type='submit' value='Save Task'/>
    </form>
  );
}

export default NewTask