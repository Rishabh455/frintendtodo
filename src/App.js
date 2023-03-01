import React from "react";
import Signup from "./Screens/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTable from "./Screens/EditTable";
import ListDisplay from "./Screens/ListDisplay";
const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListDisplay />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/edit/:id" element={<EditTable />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
