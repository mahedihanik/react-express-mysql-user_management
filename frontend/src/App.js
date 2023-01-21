import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/NavigationBar";
import CreateUser from "./components/user/UserCreate";


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/dashboard" element={ <><Navbar/><Dashboard/></>} />
            <Route path="/create" element={<><Navbar/><CreateUser/></>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;