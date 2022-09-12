import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import ReactDOMClient, {createRoot} from 'react-dom/client';
import CreateJob from "./CreateJob";
import ShowJobs from "./ShowJobs";
import ReactDOM from "react-dom/client";

function Index() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Elogbook</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Jobs</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create-job" className="nav-link">Create Job</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <br/>
                <Routes>
                    <Route path="/" exact element={<ShowJobs/>}/>
                    <Route path="/create-job" element={<CreateJob/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default Index;

if (document.getElementById('root')) {

    const container = document.getElementById('root');

    // Create a root.
    const root = ReactDOM.createRoot(container);

    root.render(<Index/>);
}
