import { NavLink } from 'react-router-dom';

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    News
                </NavLink>
            </div>
        </nav>
    );
};

export default Toolbar;
