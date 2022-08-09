import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";

const options = [
  {
    label: "Select",
    value: "Select",
  },
  {
    label: "Old",
    value: "old",
  },
  {
    label: "New",
    value: "new",
  },
];
const Main = () => {
  const [role, setRole] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    let result = await fetch("http://localhost:4500/books");
    result = await result.json();
    setBooks(result);
  };

  const newDatas = async () => {
    let result = await fetch(`http://localhost:4500/books/${role}`);
    result = await result.json();
    console.log(result);
    console.log(`http://localhost:4500/books/${role}`);
    setBooks(result);
  };

  return (
    <>
      <div className="mb-3">
        <h1 style={{ textAlign: "center", margin: "15px" }}>
          Are you willing to see old datas
        </h1>
      </div>
      <div className="row">
        <div class="col"></div>
        <div class="col">
          <label style={{ textAlign: "center", margin: "15px" }}>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            style={{ float: "right" }}
            onClick={newDatas}
            className="btn btn-primary mt-2"
          >
            View
          </button>
        </div>
        <div class="col"></div>
      </div>
      <div className={styles.booklist}>
        <ul>
          <b>
            <li>S.No.</li>
            <li>Name</li>
            <li>Category</li>
            <li>Description</li>
            <li>Price</li>
          </b>
        </ul>
        {books.length > 0 ? (
          books.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.category}</li>
              <li>{item.description}</li>
              <li>$ {item.price}</li>
            </ul>
          ))
        ) : (
          <h1>No Books in database</h1>
        )}
      </div>
    </>
  );
};

export default Main;
