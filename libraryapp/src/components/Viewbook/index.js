/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Viewbook.module.css";

const Viewbook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    let result = await fetch("http://localhost:4500/books");
    result = await result.json();
    setBooks(result);
  };

  const deleteBook = async (id) => {
    let result = await fetch(`http://localhost:4500/book/delete/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getBooks();
    }
  };

  const searchBook = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4500/search/${key}`);
      result = await result.json();
      if (result) {
        setBooks(result);
      }
    } else {
      getBooks();
    }
  };

  return (
    <div className={styles.booklist}>
      <h3>
        <u>View Books</u>
      </h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchBook}
      />
      <br />
      <br />
      <ul>
        <b>
          <li>S.No.</li>
          <li>Name</li>
          <li>Category</li>
          <li>Description</li>
          <li>Price</li>
          <li>Operation</li>
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
            <li>
              <button onClick={() => deleteBook(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Books in database</h1>
      )}
    </div>
  );
};

export default Viewbook;
