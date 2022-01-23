import { useState } from 'react'
import axios from "axios"

function Sidebar({ 
  currentUserId, tagList, getUserTags, filterTasksByTag, resetTagFilter, 
  taskList, currentUsername, setShowEditUser }) {

  const [showNewtag, setShowNewtag] = useState(false)
  const [showEdittag, setShowEdittag] = useState(false)
  const [newtagName, setNewtagName] = useState("")
  const [currentTag, setCurrentTag] = useState(-1)

  function Newtag() {
    if (showEdittag && !showNewtag) {
      setShowEdittag(false)
    }
    setShowNewtag(!showNewtag)  
  }

  function Edittag() {
    if (!showEdittag && showNewtag) {
      setShowNewtag(false)
    }
    setShowEdittag(!showEdittag)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (newtagName.length > 10) {
        alert('Please use tags with a maximum of 10 characters')
      } else {
        postTagUser()
      }
    }
  }

  function postTagUser() {
    axios
      .post(`/api/${currentUserId}/tags`, {
        name: newtagName
      })
      .then((res) => {
        setShowNewtag(false)
        getUserTags()
      })
      .catch((error) => console.log(error))
  }

  function deleteTag(id) {
    axios
      .delete(`/api/tags/${id}`)
      .then((res) => {
        getUserTags()
      })
      .catch((error) => console.log(error))
  }

  const newtagInput = 
    <input 
      className="NewtagInput" 
      onKeyDown={handleKeyDown}
      onChange={(e) => setNewtagName(e.target.value)}
    />

  const sidebarTags =
    tagList.map((tag, index) => {
      let className="Tag"
      if (tag.id === currentTag) {
        className+=" Tag-selected"
      } 
      if (showEdittag) {
        className="Tag-editing"
      }
      return (
        <div key={index} className={className} onClick={() => {
          filterTasksByTag(tag.id)
          setCurrentTag(tag.id)
          }}>
          <li>
            {tag.name}
          </li>
          {showEdittag 
            ? <li className="Cross" onClick={() => deleteTag(tag.id)}>
                X
              </li> 
            : <li className="Number">{tag.tasks.length}</li>}
        </div>)
    })

  const allTag =
    <div className={currentTag === -1 ? "Tag Tag-selected" : "Tag"} onClick={() => {
        resetTagFilter()
        setCurrentTag(-1)
        }}>
      <li>
        All
      </li>
      <li className='Number'>
        {taskList.length}
      </li>
    </div>

  return (
    <div className='Sidebar'>
      <div 
        className='UserProfile' 
        onClick={() => setShowEditUser(true)}>
        {<h2>{currentUsername}</h2>}
      </div>
      {allTag}
      {sidebarTags}
      <div className="NewEdit">
      <li className="Newtag" onClick={Newtag} >
        {showNewtag ? "Close" : "New"}
      </li>
      <li className="Edittag" onClick={Edittag} >
        {showEdittag ? "Close" : "Edit"}
      </li>
      </div>
      {showNewtag ? newtagInput : null}
    </div>
  );
}

export default Sidebar