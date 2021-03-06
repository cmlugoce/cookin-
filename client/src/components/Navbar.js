import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({session}) => (
 <nav>
     {session && session.getCurrentUser ? <NavbarAuth session={session}/> : <NavbarUnAuth />}

 </nav>
);
const NavbarAuth = ({session}) => (
    <Fragment>
    <ul>
        <li>
            <NavLink to='/'exact>Home</NavLink>
        </li>
        <li>
            <NavLink to='/search'>Search</NavLink>
        </li>
        <li>
            <NavLink to='/recipe/add'>Add a recipe</NavLink>
        </li>
        <li>
            <NavLink to='/profile'>Profile</NavLink>
        </li>

        <li>
            <Signout />
        </li>
        <h4>Hola, <strong>{session.getCurrentUser.username}</strong></h4>
    </ul>
    </Fragment>
)
const NavbarUnAuth = () => (
    <ul>
    
    <li>
        <NavLink to='/'exact>Home</NavLink>
    </li>
    <li>
        <NavLink to ='/search'>Search</NavLink>
    </li>
    <li>
    <NavLink to ='/signin'>Signin</NavLink>
    </li>
    <li>
    <NavLink to ='/signup'>Signup</NavLink>

    </li>

    </ul>

)

export default Navbar;