import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import UseOnlineStatus from './utils/useOnlineStatus';

function Header() {
  const[login, setLogin] = useState('Login');
  const onlineStatus = UseOnlineStatus();
  return (<>
<div className="navbar flex justify-between items-center mb-6 p-4 border-black
 bg-amber-200 text-xl font-light">
        <div className="logo w-[30px] ml-8">
            <img src='./src/assets/swigy.png' alt="logo_img" />
        </div>
        <div className=" mr-8 flex justify-center items-center list-none gap-x-8
">
           <li>Online: {onlineStatus ? '🟢': '🔴'}</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <Link to="/login">
            <button className='login_btn' onClick={()=>{
              login === 'Login'? setLogin('Logout'): setLogin('Login');
            }}>{login}</button>
            </Link>

        </div>
    </div>
  </>
  )
}

export default Header;