import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { MembersProvider } from "./context/MembersContext";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Register from "./pages/Register";
import ManageMembers from "./pages/ManageMembers";

function App() {
  return (
    <MembersProvider>
      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manage" element={<ManageMembers />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </MembersProvider>
  );
}

export default App;