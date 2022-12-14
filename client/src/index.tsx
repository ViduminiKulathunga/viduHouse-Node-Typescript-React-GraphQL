import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import reportWebVitals from "./reportWebVitals";
import {
  AppHeader,
  Listings,
  Home,
  Host,
  Listing,
  NotFound,
  User,
  Login,
} from "./sections";
import { Viewer } from "./lib/types";
import { Layout, Affix } from "antd";
import "./styles/index.css";
import Avatar from "antd/es/avatar/avatar";

const root = document.getElementById("root");

const client = new ApolloClient({
  uri: "/api",
});

const initalViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initalViewer);

  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app_affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer}/>
        </Affix>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings/:location?" element={<Listings />} />
          <Route path="/user/:id" element={<User />} />
          <Route
            path="/login"
            element={<Login setViewer={(e) => setViewer(e)} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
