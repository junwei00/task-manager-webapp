import axios from 'axios'
import {useState} from 'react'

function Users({ userList, setCurrentUserId, setCurrentUsername, getUsers }) {
  const [showNewUser, setShowNewUser] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  function postUser() {
    axios
      .post("/api/users", {
        username: newUsername
      })
      .then((res) => {
        setCurrentUserId(res.data.id)
        setCurrentUsername(res.data.username)
      })
      .catch((error) => console.log(error))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (newUsername.length > 30 || newUsername.length < 5) {
        alert('Please use names between 5 and 30 characters in length')
      } else if (userList.find((user) => user.username === newUsername) !== undefined) {
        alert('Name has already been taken')
      } else {
        postUser()
      }
    }
  }

  const newUserInput = 
    <input 
      className='NewUserInput' 
      onChange={(e) => {setNewUsername(e.target.value)}}
      onKeyDown={handleKeyDown}>
    </input>

  return (
    <div className='Users'>
      <h3>Select user:</h3>
      <div className='UserList'>
        {
          userList.map((user, index) => {
            return (
              <li 
                key={index}
                onClick={() => {
                  setCurrentUserId(user.id)
                  setCurrentUsername(user.username)}}>
                {user.username}
              </li>)})
        }
      </div>
      <li className='NewUserButton' 
          onClick={() => setShowNewUser(!showNewUser)}>
        {showNewUser ? "Close" : "+ New User"}
      </li>
      {showNewUser && newUserInput}
    </div>
  )
}

export default Users