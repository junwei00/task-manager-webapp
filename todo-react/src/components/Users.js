import axios from 'axios'
import {useState} from 'react'

function Users({ userList, setCurrentUserId, setCurrentUsername, getUsers }) {
  const [showNewUser, setShowNewUser] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  const newUserInput = 
    <input 
      className='NewUserInput' 
      onChange={(e) => {setNewUsername(e.target.value)}}
      onKeyDown={handleKeyDown}>
    </input>

  function postUser() {
    axios
      .post("/api/users", {
        username: newUsername
      })
      .then((res) => {
        getUsers()
        
      })
      .catch((error) => console.log(error))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (newUsername.length > 30) {
        alert('Please use names with a maximum of 30 characters')
      } else {
        postUser()
      }
    }
  }

  return (
    <div className='Users'>
      <h3>Select user:</h3>
      <div className='UserList'>
        {
          userList.map((user, index) => {
            return (
              <li key={index}
                onClick={() => {
                  setCurrentUserId(user.id)
                  setCurrentUsername(user.username)}}>
                {user.username}
              </li>)})
        }
        <li className='NewUserButton' 
            onClick={() => setShowNewUser(!showNewUser)}>
          {showNewUser ? "Close" : "+ New User"}
        </li>
        {showNewUser && newUserInput}
      </div>
    </div>
  )
}

export default Users