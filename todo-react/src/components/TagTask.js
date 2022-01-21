import axios from "axios";

function TagTask({ task, tagList, refreshTask }) {
  function addTaskToTag(tag) {
    axios
      .put(`/api/tags/${tag.id}`, {
        do: "add",
        task: task.id
      })
      .then((res) => {
        refreshTask()
      })
      .catch((error) => console.log(error))
  }

  return (<div className="TaskTagList">
    {tagList.map((tag, index) => {
      return (
        <h3 key={index} onClick={()=>{addTaskToTag(tag)}}>
          {tag.name}
        </h3>)
    })}
  </div>)
}

export default TagTask