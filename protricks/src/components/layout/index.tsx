import React from 'react';
import Navbar from '../nav'
import { Outlet } from "react-router-dom";
import Footer from '../footer';
import { items } from '../../routes'

const Layout: React.FC = () => {
    return (
      <React.Fragment>
        <Navbar items={items} />
        <Outlet/>
        <Footer />
      </React.Fragment>
    );
  }
  
  export default Layout;