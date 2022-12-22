import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="text-center mt-3">
        This website was coded by Lúcia Reis, and is
        <a
          href="https://github.com/larevolucia/react-weather"
          target="_blank"
          title="Github Repository"
        >
          {" "}
          open-sourced
        </a>
      </div>
    </footer>
  );
}
