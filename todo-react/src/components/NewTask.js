import axios from "axios";
import { useState } from "react";

function NewTask({ setShowNewTask, getTasks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [formValid, setFormValid] = useState(false)

  function handleSubmit (e) {
    if (title == '' || description == '' || deadline == '') {
      alert("Fields cannot be empty")
      return;
    } else {
      postTask()
    }
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
        setShowNewTask(false)
        getTasks()
      })
      .catch((error) => console.log(error))
  }

  function validateForm() {
    if (title == '' || description == '' || deadline == '') {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }

  return (
    <form className="NewTask" onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            validateForm()
            setTitle(e.target.value)}}
        />
      </div>
      <div>
        <input
          className="Description"
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => {
            validateForm()
            setDescription(e.target.value)}}
        />
      </div>
      <div>
        <input
          type='date'
          placeholder='Deadline'
          value={deadline}
          onChange={(e) => {
            validateForm()
            setDeadline(e.target.value)}}
        />
      </div>
      <input disabled={!formValid} className="Submit" type='submit' value='Save Task'/>
    </form>
  );
}

export default NewTask