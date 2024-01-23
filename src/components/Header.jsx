import React from 'react';
import { Link } from "react-router-dom";

export default function Header({ isPushed, togglePush }) {

    return (
        <header>

            <div className="header-bg">
                <img src="../../src/assets/img/Triangle.svg" alt="" />
            </div>

            <div className="container header-container">
                <div className="header-top">

                    <Link to={'/'}><img src="../../src/assets/devjobs.svg" alt="" /></Link>

                    <div className="light-dark-page">
                        <img src="../../src/assets/img/icons/LightMode.svg" alt="" />
                        <button className="light-dark-btn" onClick={togglePush}>
                            <div className={`push-light-dark ${isPushed ? 'pushed' : ''}`}></div>
                        </button>
                        <img src="../../src/assets/img/icons/DarkMode.svg" alt="" />
                    </div>

                </div>

            </div>
        </header>
    )
}