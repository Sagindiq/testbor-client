import "../styles/main.scss";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Router } from "next/router";
import AlertProvider from "../context/alert.context";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from 'dotenv'

export default function App({ Component, pageProps }: AppProps) {
  
    dotenv.config()

  const [cname, setCName] = useState("");

  Router.events.on("routeChangeStart", (url: string): void => {
    if (url !== "/exam") {
      setCName("loading--active");
    }
  });

  Router.events.on("routeChangeComplete", (url: string): void => {
    if (url !== "/exam") {
      setCName("");
    }
  });

  return (
    <>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <ToastContainer />

      <div className={`loading ${cname}`}>
        <div className="loader">Loading...</div>
      </div>
    </>
  );
}
