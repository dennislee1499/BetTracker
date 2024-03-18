import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EditBetForm from "./components/EditBetForm";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={ <Home /> }
            />
            <Route 
              path="/edit/:id"
              element={ <EditBetForm /> }
            />
            <Route 
              path="/login"
              element={ <Login /> }
            />
            <Route 
              path="/signup"
              element={ <SignUp /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
