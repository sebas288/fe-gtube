import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Nav = ({filter = false}) => {
    return (
        <Fragment>
            <header className="header navbar">
                <Link className="nav-link" to="/">
                    <img src="logo.png" alt="YouTube Logo" className="youtube-logo" />
                </Link>
                <form className="search-bar">
                    {filter ? 
                    <input className="search-input" type="search" placeholder="Search" aria-label="Search" onChange={(e) => filter(e)}  />   
                    : ''}
                </form>
                <div className="menu-icons">
                    <Link className="nav-link" to="/subir">
                        <img src="video-plus.svg" alt="Upload Video" />
                    </Link>
                    <Link className="nav-link" to="">
                        <img src="apps.svg" alt="Apps" />
                    </Link>
                    <Link className="nav-link" to="">
                        <img src="bell.svg" alt="Notifications" />
                    </Link>
                    <Link className="nav-link" to="/">
                        <img className="menu-channel-icon" src="http:///unsplash.it/36/36?gravity=center" alt="Your Channel" />
                    </Link>
                </div>
            </header>
        </Fragment>
    );
}

export default withRouter(Nav);

