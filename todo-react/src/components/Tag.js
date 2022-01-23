import axios from "axios"
import { useState } from "react"

function Tag({ tag, getUserTags, refreshTaskNew, task }) {
  const [isHover, setIsHover] = useState(false)

  function deleteTagFromTask() {
    axios
      .put(`/api/tags/${tag.id}`, {
        do: "delete",
        task: task.id
      })
      .then((res) => {
        refreshTaskNew(res.data)
        getUserTags()
      })
      .catch((error) => console.log(error))
  }

  return (
    <h3 
      className="TagName" 
      onMouseEnter={() => setIsHover(true)} 
      onMouseLeave={() => setIsHover(false)} 
      onClick={deleteTagFromTask}>
      {isHover && "✕ "}
      {tag.name}
    </h3>)
}

export default Tag