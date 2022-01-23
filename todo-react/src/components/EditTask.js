import axios from "axios";
import { useState } from "react";

function EditTask({ task, refreshTaskNew, setShowEditTask }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [deadline, setDeadline] = useState(task.deadline)
  const [formValid, setFormValid] = useState(false)

  function handleSubmit (e) {
    if (title.length > 50 || description.length > 500) {
      alert('Please keep the title below 50 characters and the description below 500 characters')
    } else {
      e.preventDefault()
      patchTask()
    }
  }

  function patchTask() {
    axios
      .put(`/api/tasks/${task.id}`, {
        title: title,
        description: description,
        deadline: deadline
      })
      .then((res) => {
        refreshTaskNew(res.data)
        setShowEditTask(false)
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
    <form className="EditTask" onSubmit={handleSubmit}>
      <h3>Edit Task:</h3>
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
          value={deadline === null ? '' : deadline}
          onChange={(e) => {
            validateForm()
            setDeadline(e.target.value)}}
        />
      </div>
      <input disabled={!formValid} className="Submit" type='submit' value='Save Task'/>
    </form>
  );
}

export default EditTask