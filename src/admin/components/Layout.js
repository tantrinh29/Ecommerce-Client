import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    
  return (
    <div className="wrapper">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content-wrapper">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
