import React, {useState, useEffect}  from 'react'
import Project from './components/Project'
import { Outlet, Link } from "react-router-dom"
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import {RefreshProjectContext} from './components/RefreshProjectContext'

const App = (props) => {

    const [projects, setProjects] = useState([]);
    // TODO: This is a bandaid solution
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => {
        setRefresh(!refresh);
    }

    // https://github.com/babel/babel/issues/9849
    useEffect(async () => {
        const resp = await axios.get(`${process.env.REACT_APP_ENDPOINT}/projects`);
        setProjects(resp.data);
    },[refresh]);

    return(
        <div className="grid gap-4 md:grid-cols-2">
            <div>
                <h1 className="text-xl">/testcases</h1>
                <nav><Link to="/project/add" data-testid="add-project-button-from-home" className="btn border border-gray-900 bg-yellow-300">Add project</Link><a className="btn border border-gray-900 bg-yellow-300" onClick={()=>setRefresh(true)}>Refresh</a></nav>
                <h2 className="text-base font-bold">My projects</h2>
                {
                    projects.map(project => (
                        <Project key={project.id} {...project} />
                    ))
                }
            </div>
            <aside>
                <RefreshProjectContext.Provider value={triggerRefresh}>
                    <Outlet/>
                </RefreshProjectContext.Provider>
            </aside>
        </div>
    )
}

export default App;