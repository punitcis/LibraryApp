import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Nav from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";
import Addbook from "./components/Addbook";
import Viewbook from "./components/Viewbook";
import Updatebook from "./components/Updatebook";
import ViewbookUser from "./components/ViewbookUser";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<MainComponent />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/Addbook" element={<Addbook />}></Route>
          <Route path="/Viewbook" element={<Viewbook />}></Route>
          <Route path="/ViewbookUser" element={<ViewbookUser />}></Route>
          <Route path="/update/:id" element={<Updatebook />}></Route>
          <Route path="/logout"></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
