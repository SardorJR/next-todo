import { useReducer, useState } from "react";
import Todos from "../components/todos";
import { useForm } from "react-hook-form";
import Modalch from "../modal/modal";
const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload.todo : todo
        ),
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null)
  const { register, handleSubmit, reset, setValue } = useForm()

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (data) => {
    if (editingTodo) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { id: editingTodo.id, todo: { ...data, id: editingTodo.id } },
      });
      setEditingTodo(null);
    } else {
      const newTodo = {
        ...data,
        id: String(Math.random()),
        date: new Date().toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
    }
    reset();
    setIsOpen(false)
  }
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    Object.keys(todo).forEach((key) => {
      setValue(key, todo[key]);
    });
    toggleModal()
  }

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  }

  return (
    <>
      <div className="wrap">
        <div className="neon">Todo List</div>
        <div className="inp_box">
          <button onClick={toggleModal} className="todo">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add
          </button>
        </div>
        <div className="flex">
          {state.todos.map((todo) => (
            <Todos
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <Modalch
          isOpen={isOpen}
          editingTodo={editingTodo}
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          toggleModal={toggleModal}
          setValue={setValue}
        />
      )}
    </>
  );
}
