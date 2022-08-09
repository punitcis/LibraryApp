import React, { useState } from "react";
import styles from "./Addbook.module.css";
import { useNavigate } from "react-router-dom";

const Addbook = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [UserId, setUserId] = useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addbook = async () => {
    if (!name || !description || !category || !price || !UserId) {
      setError(true);
      return false;
    }
    await fetch("http://localhost:4500/books", {
      method: "post",
      body: JSON.stringify({ name, description, category, price, UserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Books data added Successfully");
    navigate("/Viewbook");
  };

  return (
    <div>
      <div className="contentWrapper">
        <h1 style={{ textAlign: "center", margin: "25px" }}>Add Books</h1>
        <div className="container">
          <div className={styles.authWrapper}>
            <div className={styles.authInner}>
              <form>
                <h3>Books Details</h3>
                <div className="d-grid mb-2">
                  <input
                    type="name"
                    className={styles.formControl}
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && !name && (
                    <span className="invalidInput">Enter Valid Name</span>
                  )}
                </div>
                <div className="d-grid mb-2">
                  <input
                    type="string"
                    className={styles.formControl}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {error && !description && (
                    <span className="invalidInput">
                      Enter Valid Description
                    </span>
                  )}
                </div>
                <div className="d-grid mb-2">
                  <input
                    type="number"
                    className={styles.formControl}
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {error && !price && (
                    <span className="invalidInput">Enter Valid Price</span>
                  )}
                </div>
                <div className="d-grid mb-2">
                  <input
                    type="string"
                    className={styles.formControl}
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {error && !category && (
                    <span className="invalidInput">Enter Valid Category</span>
                  )}
                </div>
                <div className="d-grid mb-2">
                  <input
                    type="string"
                    className={styles.formControl}
                    placeholder="Enter UserId"
                    value={UserId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  {error && !UserId && (
                    <span className="invalidInput">Enter Valid UserId</span>
                  )}
                </div>
                <div className="d-grid">
                  <button
                    onClick={addbook}
                    type="button"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbook;
