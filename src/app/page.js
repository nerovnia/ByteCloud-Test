"use client";

import Image from "next/image";
import useFetch from "./useFetch.js";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddBlock from "./components/AddBlock.js";
import ManagementBlock from "./components/ManagementBlock";

export default function Home() {
  return (
    <BrowserRouter>
      <div className="bg-body-tertiary h-100">
        <nav className="navbar navbar-expand-lg bg-body-secondary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Medicine Application
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Records
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/appointments">
                    Appointments
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container-xl text-center mt-4 mb-4">
          <div className="">
            <Routes>
              <Route path="/" element={<AddBlock />}></Route>
              <Route path="/appointments" element={<ManagementBlock />}></Route>
            </Routes>
          </div>

          <div className="fixed-bottom bg-dark-subtle  pt-4 pb-4">
            Medicine Application &copy; 2023 by Volodymyr Nerovnia
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
