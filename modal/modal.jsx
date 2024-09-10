import { useForm } from 'react-hook-form';
function Modalch({ isOpen, toggleModal, editingTodo, onSubmit, register, handleSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={toggleModal}>
          &times;
        </span>
        <h2>{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            {...register("description", { required: true })}
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            {...register("name", { required: true })}
          />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" {...register("date")} />

          <label htmlFor="done">Status:</label>
          <select id="done" {...register("done")}>
            <option value="true">Done</option>
            <option value="false">Not Done</option>
          </select>

          <button type="submit" className="submit-button">
            {editingTodo ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modalch;