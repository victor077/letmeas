import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./Pages/Home";
import { NewRoom } from "./Pages/NewRoom";
import { AuthContextProvider } from "./Context/AuthContext";
import { Room } from "./Pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/room" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
