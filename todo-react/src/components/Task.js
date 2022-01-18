function Task({ task }) {
  return (
    <div>
      <h3>{task.title} </h3>
      <div>{task.description}</div>
        <div>
          <button onClick = {() => console.log('Edit')}>
          Edit
          </button>
          <button onClick = {() => console.log('Delete')}>
          Delete
          </button>
      </div>
    </div>
  );
}

export default Task