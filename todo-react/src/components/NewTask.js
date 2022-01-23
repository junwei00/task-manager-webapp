import axios from "axios";
import { useState } from "react";

function NewTask({ currentUserId, setShowNewTask, getUserTasks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [formValid, setFormValid] = useState(false)

  function handleSubmit (e) {
    if (title.length > 50 || description.length > 500) {
      alert('Please keep the title below 50 characters and the description below 500 characters')
    } else {
      e.preventDefault()
      postTaskUser()
    }
  }

  function postTaskUser() {
    axios
      .post(`/api/${currentUserId}/tasks`, {
        title: title,
        description: description,
        deadline: deadline
      })
      .then((res) => {
        setTitle('')
        setDescription('')
        setDeadline('')
        setShowNewTask(false)
        getUserTasks()
      })
      .catch((error) => console.log(error))
  }

  function validateForm() {
    if (title == '') {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }

  return (
    <form className="NewTask" onSubmit={handleSubmit}>
      <h3>New Task:</h3>
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
        <textarea
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