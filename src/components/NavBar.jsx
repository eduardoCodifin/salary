import Image from 'next/image';
import React from 'react';
import logo from "../assets/codifin_logo.png"
import Link from 'next/link';


const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="https://www.codifin.com/"  target="_blank">
         <Image src={logo} alt="Logo" width={140} height={30} className='logo'/>
        </Link>
      </div>
      <div className="cta-button">
         <Link href="https://api.whatsapp.com/send?phone=5215541817644&text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios." target="_blank" rel="noopener noreferrer">
          <button className="cta-btn">Contáctanos</button>
        </Link>      
      </div>
    </nav>
  );
}

export default NavBar;
