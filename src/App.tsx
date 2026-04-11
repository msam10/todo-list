import Home from "./componentes/Home";
import Profile from "./componentes/profile";
import Usuario from "./componentes/Usuario";
import { BrowserRouter, Routes,Route, Link } from "react-router";

function App() {
return (
   
    <BrowserRouter>
       
            <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            </nav>
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/usuario/:nombreUsuario" element={<Usuario/>} />
        </Routes>
    </BrowserRouter>
);

  
}
export default App
