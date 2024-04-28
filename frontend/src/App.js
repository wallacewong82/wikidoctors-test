import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PageContext = createContext();

const App = () => {
  const [currentPage, setCurrentPage] = useState("");
  return (
    <>
      <PageContext.Provider value={{ currentPage, setCurrentPage }}>
        <Header />
        <main className="py-3 main-container"  >
          <Container  >
            <Outlet />
          </Container>
        </main>
        <Footer />
        <ToastContainer />
      </PageContext.Provider>
    </>
  );
};

export default App;
