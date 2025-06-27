import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Upload from "./pages/Upload";


function App() {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/channel/:channelId" element={<Channel />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
