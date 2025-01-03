import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isauthenticated } from '../auth/helper/index.js';

const currentTab = (history, path) => {
    return history.location.pathname === path ? { color: '#2ecc72' } : { color: '#ffffff' };
};

const Menu = ({ history }) => {
    const renderAuthenticatedLinks = () => {
        if (isauthenticated()) {
            const { role } = isauthenticated().user;
            return (
                <Fragment>
                    {role === 0 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                                DashBoard
                            </Link>
                        </li>
                    )}
                    {role === 1 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                                A.DashBoard
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <span
                            className="nav-link text-warning"
                            onClick={() => {
                                signout(() => {
                                    history.push("/");
                                });
                            }}
                        >
                            Signout
                        </span>
                    </li>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                            SignUp
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                            SignIn
                        </Link>
                    </li>
                </Fragment>
            );
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                {renderAuthenticatedLinks()}
            </ul>
        </div>
    );
};

export default withRouter(Menu);
