function Sidebar({ tagList }) {

  return (
    <div className='Sidebar'>
      {tagList.map((tag, index) => {
        return <a href="#" key={index}>
          {tag.name}
        </a>
      })}
    </div>
  );
}

export default Sidebar