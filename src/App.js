import logo from './logo.svg';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {Home} from "./component/Home";
import {Edit} from "./component/Edit";
import {Add} from "./component/Add";
function App() {
    return (
        <>
            <NavLink className="button" to='/'>Home</NavLink>
            <NavLink className="button" to='/add'>Add</NavLink>
            <Routes>
                <Route path='/' element={<Home/>}>Home</Route>
                <Route path='/add' element={<Add/>}>Add</Route>
                <Route path='/edit/:id' element={<Edit/>}>Edit</Route>
            </Routes>
        </>
    );
}

export default App;
