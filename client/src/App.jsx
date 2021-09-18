import React from "react";
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

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/blogs/:id" component={SingleBlog} />
        <Route exact path="/createblog" component={CreateBlog} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
