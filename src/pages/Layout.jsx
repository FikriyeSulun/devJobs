import { Outlet } from "react-router-dom";
import Header from '../components/Header'
import React, { useEffect, useState } from 'react';

import '../assets/css/reset.css'
import '../assets/css/main.css'
import '../assets/css/header.css'

export default function Layout() {
  const [isPushed, setIsPushed] = useState(false);

  isPushed ? document.body.classList.add("dark") : document.body.classList.remove("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme) {
      setIsPushed(savedTheme === "dark");
    }
  }, []);

  const togglePush = () => {
    const newIsPushed = !isPushed;
    setIsPushed(newIsPushed);
    localStorage.theme = newIsPushed ? "dark" : "light";
  };


  return (
    <div>
      <Header isPushed={isPushed} togglePush={togglePush}/>
      <main><Outlet/></main>
    </div>
  )
}

