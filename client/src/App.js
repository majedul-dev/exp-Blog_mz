import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PostsScreen from "./screens/PostsScreen";
import PrivateRoute from "./components/PrivateRoute";
import RegisterScreen from "./screens/RegisterScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import SinglePostViewScreen from "./screens/SinglePostViewScreen";
import EditPostScreen from "./screens/EditPostScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import AuthorProfileScreen from "./screens/AuthorProfileScreen";

const App = () => {
  const container = React.useRef();
  return (
    <>
      <Router>
        <Header />
        <main>
          <Route path="/author/:userId" exact component={AuthorProfileScreen} />
          <PrivateRoute path="/dashboard" component={DashboardScreen} />
          <Container className="py-5">
            <Route
              path="/"
              exact
              component={HomeScreen}
              container={container}
            />
            <Switch>
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/register" exact component={RegisterScreen} />

              <PrivateRoute
                path="/create-profile"
                component={CreateProfileScreen}
              />
              <PrivateRoute
                path="/edit-profile"
                component={EditProfileScreen}
              />
              <PrivateRoute exact path="/posts" component={PostsScreen} />
              <PrivateRoute
                path="/posts/create-post"
                component={CreatePostScreen}
              />
              <PrivateRoute path="/posts/:id/edit" component={EditPostScreen} />
              <Route path="/post/:id" exact component={SinglePostViewScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
