// import MainPage from "./pages/MainPage";
// import Login from "./pages/Login";
import "./App.css";
import Login from "./pages/Login";

import { ApiClient } from "./api/client";
import { ApiContext } from "./contexts/ApiContext";

function App() {
  const apiClient = new ApiClient();
  return (
    <ApiContext.Provider value={apiClient}>
      <Login />
    </ApiContext.Provider>
  );
}

export default App;
