import NewTask from "./NewTask";

function Topbar({ buttonState, onClickNewTask }) {
  return (
    <div className='Topbar'>
      <input 
        id="Searchbar"
        type='text'
        placeholder='Search tasks'/>
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

export default Topbar