import React, { PureComponent } from "react";
import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Single from "./Single";
import List from "./List";

class App extends PureComponent {
  state = {
    isOptionsShown: true,
    currentVerb: null,
  };

  render() {
    return (
      <div className="container h-100 d-flex flex-column">
        <h1 className="display-1 my-2">Verb patterns</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to={`/`}>
              Quiz
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`/list`}>
              List
            </NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="*" element={<Single />} />
          <Route path="list" element={<List />} />
        </Routes>
      </div>
    );
  }
}

export default App;
