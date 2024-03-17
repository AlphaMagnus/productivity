import React from 'react';
import './landing.css'; 

const Landing = () => {
    return ( 
        <>
            <div className="navbar">
                <ul>
                    <li>Home</li>
                    <li>Eizenhower</li>
                    <li>Eat that frog!</li>
                    <li>Zen mode</li>
                </ul>
            </div>
            <div className="logo">
                <img src="Screenshot 2024-03-17 220546.png" alt="Logo" width="300px" height="300px" />
            </div>
            <div className="textbox">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit amet est placerat in egestas. Iaculis eu non diam phasellus vestibulum. Ante in nibh mauris cursus mattis molestie a iaculis at. Aliquet sagittis id consectetur purus ut faucibus.
            </div>
            <div className="getstart">
                <button type="button" onClick={Start}>Get Started!</button>
            </div>
        </>
    );
}

export default Landing;
