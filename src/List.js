import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ lists, listClear, listCheck, editeTodo }) => {
  return (
    <div className="grocery-list">
      {lists.map((list) => {
        const { id, title, isComplated } = list;

        return (
          <article className={`grocery-item ${isComplated && "ok"}`} key={id}>
            <input
              className="checkbox"
              type="checkbox"
              onChange={() => listCheck(id)}
              checked={isComplated}
            />
            <p className={`title ${isComplated && "ok-text"}`}>{title}</p>

            <div className="btn-container">
              <button
                className="edit-btn"
                type="submit"
                onClick={() => editeTodo(id)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                type="submit"
                onClick={() => listClear(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
