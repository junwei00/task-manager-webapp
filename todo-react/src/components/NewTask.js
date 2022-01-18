function NewTask() {
  return (
    <form>
      <div>
        <input
          type='text'
          placeholder='Title'
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Description'
        />
      </div>
      <div>
        <input
          type='date'
          placeholder='Deadline'
        />
      </div>
      <input type='submit' value='Save Task'/>
    </form>
  );
}

export default NewTask