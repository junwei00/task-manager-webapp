import NewTask from "./NewTask";

function TopBar({ buttonState, onClickNewTask }) {
  return (
    <div>
      <form>
        <input 
          type='text'
          placeholder='Search tasks'/>
      </form>
      <select>
        <option>Deadline</option>
        <option>Created at</option>
        <option>Alphabetical</option>
      </select>
      <button onClick={onClickNewTask}>
        {buttonState ? 'Close' : 'New Task'}    
      </button>
    </div>
  );
}

export default TopBar