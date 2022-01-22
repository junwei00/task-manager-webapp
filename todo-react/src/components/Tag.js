import axios from "axios"
import { useState } from "react"

function Tag({ index, tag, refreshDeletedTaskTag, task }) {
  const [isHover, setIsHover] = useState(false)

  function deleteTagFromTask() {
    axios
      .put(`/api/tags/${tag.id}`, {
        do: "delete",
        task: task.id
      })
      .then((res) => {
        refreshDeletedTaskTag(index)
      })
      .catch((error) => console.log(error))
  }

  return (
    <h3 className="TagName" onMouseEnter={() => setIsHover(true)} 
      onMouseLeave={() => setIsHover(false)} onClick={deleteTagFromTask}>
      {isHover && "✕ "}
      {tag.name}
    </h3>)
}

export default Tag