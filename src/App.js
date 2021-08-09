import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [lists, setLists] = useState(
    window.localStorage.getItem("todo")
      ? JSON.parse(window.localStorage.getItem("todo"))
      : []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      showAlert(true, "Iltimos todo kirgazin !", "danger");
      document.querySelector(".grocery").focus();
    } else if (name && isEditing) {
      setLists(
        lists.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "Todo o'zgardi", "success");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        isComplated: false,
      };
      setLists([...lists, newItem]);
      setName("");
      showAlert(true, "todo qo'shildi", "success");
    }
  };

  const showAlert = (show = true, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const tozalashBtn = () => {
    setLists([]);
    showAlert(true, "hamma todolar o'chdi !", "danger");
  };
  const listClear = (id) => {
    const newLists = lists.filter((list) => list.id !== id);
    setLists(newLists);
    showAlert(true, "todo o'chdi !", "danger");
  };
  const listCheck = (id) => {
    const check = lists.map((list) => {
      if (list.id === id) {
        list.isComplated = !list.isComplated;
      }
      return list;
    });
    setLists(check);
  };
  const editeTodo = (id) => {
    const findTodo = lists.find((todo) => todo.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(findTodo.title);
    document.querySelector(".grocery").focus();
  };
  useEffect(() => {
    window.localStorage.setItem("todo", JSON.stringify(lists));
  }, [lists]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} lists={lists} />}
        <h3>Todolar Ro'yhati !</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="Todo kirgazin...!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "O'zgartirish" : "Qo'shish"}
          </button>
        </div>
      </form>

      {lists.length > 0 && (
        <div className="grocery-container">
          <List
            lists={lists}
            listClear={listClear}
            listCheck={listCheck}
            editeTodo={editeTodo}
          />
          <button className="clear-btn" onClick={tozalashBtn}>
            Tozalash
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
