function Users({ userList, setCurrentUser }) {
  function selectUser(userId) {
    setCurrentUser(userId)
  }

  return (
    <div className='Users'>
      <h3>Select user:</h3>
      <div className='UserList'>
        {
          userList.map((user, index) => {
            return (
              <li key={index} onClick={() => setCurrentUser(user)}>
                {user.username}
              </li>)
          })
        }
      </div>
    </div>
  )
}

export default Users