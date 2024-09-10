import { useEffect, useState } from "react";

function Todos({ todo, onEdit, onDelete }) {
  const handleDoubleClick = () => {
    onEdit(todo);
  };
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);

    setTimeout(() => {
      onDelete(todo.id);
    }, 1000);
  };
  const name = todo.name;
  useEffect(() => {
    if (name) {
      localStorage.setItem("todoName", name);
    }
  }, [name])
  return (
    <div
      className={`box ${isRemoving ? "fade-out" : ""}`}
      onDoubleClick={handleDoubleClick}
    >
      <span></span>
      <div className="title-box">
        <h3>{todo.description}</h3>
        <img
          onClick={handleRemove}
          src="/3994424_cancel_close_delete_reject_remove_icon.png"
          alt=""
        />
      </div>
      <div className="date">
        <p>{todo.date}</p>
        <h3>Status: {todo.done === "true" ? "Done" : "Not Done"}</h3>
      </div>
    </div>
  );
}

export default Todos;
