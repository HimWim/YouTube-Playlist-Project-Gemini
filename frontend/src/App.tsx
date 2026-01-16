// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Header from "./components/Header";
import Myprofile from "./pages/Myprofile";
import TrackYourProgress from "./pages/TrackYourProgress";
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/track-progress" element={<TrackYourProgress />} />
        <Route path="/main" element={<Main/>} />

        {/* Layout route with Header */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
