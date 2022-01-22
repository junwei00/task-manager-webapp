import NewTask from "./NewTask";

function Topbar({ handleSearch, handleSort, buttonState, onClickNewTask }) {
  return (
    <div className='Topbar'>
      <input 
        onChange={e => handleSearch(e)}
        id="Searchbar"
        type='text'
        placeholder='Search...'/>
      <select onChange={e => handleSort(e.target.value)}>
        <option>Created</option>
        <option>Edited</option>
        <option>Deadline</option>
        <option>Alphanumeric</option>
      </select>
      <button onClick={onClickNewTask}>
        {buttonState ? 'Close' : 'New Task'}    
      </button>
    </div>
  );
}

export default Topbar