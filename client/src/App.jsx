import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Blogs from "./components/pages/Blogs";
import Home from "./components/pages/Home";
import CreateBlog from "./components/pages/CreateBlog";
import SingleBlog from "./components/pages/SingleBlog";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Header from "./components/utils/Header";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Footer from "./components/utils/Footer";
import Cookies from "js-cookie";
import UserProfile from "./components/pages/UserProfile";

function App() {
  const [token, setToken] = useState("");
  let jwt = Cookies.get("jwt");
  console.log(token, "=> App");
  useEffect(() => {
    const authenticate = () => {
      setToken(jwt);
    };
    authenticate();
  }, [jwt]);
  return (
    <>
      <Header jwt={token} setToken={setToken} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/blogs/:id" component={SingleBlog} />
        <Route
          exact
          path="/createblog"
          component={() => <CreateBlog jwt={token} />}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          component={() => <Login setToken={setToken} />}
        />
        <Route exact path="/user" component={() => <UserProfile jwt={jwt} />} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
