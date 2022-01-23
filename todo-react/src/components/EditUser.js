import axios from 'axios'
import {useState} from 'react'

function EditUser({ currentUserId, currentUsername, userList, setShowEditUser, setCurrentUsername }) {
  const [editedUsername, setEditedUsername] = useState(currentUsername)

  function deleteUser() {
    if (window.confirm('Are you sure? All Tasks and Tags for this user will be wiped.')) {
      axios
        .delete(`/api/users/${currentUserId}`)
        .then(
          window.location.reload(true)
        )
        .catch((error) => console.log(error))
    }
  }

  function patchUser() {
    if (editedUsername.length > 30) {
      alert('Please use names between 5 and 30 characters in length')
    } else if (userList.find((user) => user.username === editedUsername) !== undefined) {
      alert('Name has already been taken')
    } else {
      axios
        .put(`/api/users/${currentUserId}`, {
          username: editedUsername
        })
        .then(
          setCurrentUsername(editedUsername),
          setShowEditUser(false)
        )
        .catch((error) => console.log(error))
    }
  }

  return (
    <div className="EditUser">
      <button 
        className='CloseButton'
        onClick={() => setShowEditUser(false)}>
        X
      </button>
      <h3>Edit User:</h3>
      <div>
        <input 
          className="EditUserInput"
          defaultValue={currentUsername}
          onChange={(e) => setEditedUsername(e.target.value)}>
        </input>
        <button 
          className='SaveButton'
          onClick={() => patchUser()}>
          Save
        </button>
      </div>
      <div>
        <button 
          className='SwitchButton'
          onClick={() => window.location.reload(true)}>
          Switch User
        </button>
        <button 
          className='DeleteButton'
          onClick={() => deleteUser()}>
          Delete User
        </button>
      </div>
    </div>
  )
}

export default EditUser