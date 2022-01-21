import { useState, useEffect } from 'react'
import axios from "axios"

function Sidebar({ tagList, getTags }) {

  const [showNewtag, setShowNewtag] = useState(false)
  const [showEdittag, setShowEdittag] = useState(false)
  const [newtagName, setNewtagName] = useState("")

  function Newtag() {
    setShowNewtag(!showNewtag)  
  }

  function Edittag() {
    setShowEdittag(!showEdittag)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      postTag()
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
      {tagList.map((tag, index) => {
        return (
        <div key={index} className="Tag">
          <a href="#" >
            {tag.name}
          </a>
          {showEdittag 
            ? <a href = "#" className="Cross" onClick={() => deleteTag(tag.id)}>
                X
              </a> 
            : ""}
        </div>)
      })}
      <div className="NewEdit">
      <a className="Newtag" onClick={Newtag} href="#">
        {showNewtag ? "Close" : "New"}
      </a>
      <a className="Edittag" onClick={Edittag} href="#">
        {showEdittag ? "Close" : "Edit"}
      </a>
      </div>
      {showNewtag ? newtagInput : ""}
    </div>
  );
}

export default Sidebar