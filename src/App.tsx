import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/dashboard";
import { SharedBrain } from "./pages/SharedBrain"; 
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 2. Add the dynamic route for shared links */}
        <Route path="/share/:hash" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;