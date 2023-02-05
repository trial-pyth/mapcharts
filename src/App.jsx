import Registration from "./components/Registration";
import Login from "./components/Login";
import Layout from "./components/Layout";
import ProtectAuth from "./components/ProtectAuth";
import Error from "./components/Error";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" component={<Layout />}>
        {/* public  */}
        <Route
          path="login"
          element={
            <div className="App">
              <Login />
            </div>
          }
        />
        <Route
          path="registration"
          element={
            <div className="App">
              <Registration className="App" />
            </div>
          }
        />
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* private */}
        <Route element={<ProtectAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* rest */}
        <Route
          path="*"
          element={
            <div className="App">
              <Error />
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
