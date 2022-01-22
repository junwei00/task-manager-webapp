import { useState, useEffect } from 'react'
import axios from "axios"

function Sidebar({ tagList, getTags, filterTasksByTag, setFilteredTaskList, taskList, handleSort }) {

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
        postTag()
      }
    }
  }

  function postTag() {
    axios
      .post("/api/tags", {
        name: newtagName
      })
      .then((res) => {
        setShowNewtag(false)
        getTags()
      })
      .catch((error) => console.log(error))
  }

  function deleteTag(id) {
    axios
      .delete(`/api/tags/${id}`)
      .then((res) => {
        getTags()
      })
      .catch((error) => console.log(error))
  }

  const newtagInput = 
    <input 
      className="NewtagInput" 
      onKeyDown={handleKeyDown}
      onChange={(e) => setNewtagName(e.target.value)}
    />

  return (
    <div className='Sidebar'>
      <div className={currentTag == -1 ? "Tag Tag-selected" : "Tag"} onClick={() => {
          setFilteredTaskList(taskList)
          setCurrentTag(-1)
          }}>
        <li>
          All
        </li>
        <li className='Number'>
          {taskList.length}
        </li>
      </div>
      {tagList.map((tag, index) => {
        let className="Tag"
        if (tag.id == currentTag) {
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
      })}
      <div className="NewEdit">
      <li className="Newtag" onClick={Newtag} >
        {showNewtag ? "Close" : "New"}
      </li>
      <li className="Edittag" onClick={Edittag} >
        {showEdittag ? "Close" : "Edit"}
      </li>
      </div>
      {showNewtag ? newtagInput : ""}
    </div>
  );
}

export default Sidebar