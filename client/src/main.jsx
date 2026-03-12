// //import { StrictMode } from "react";
// //import { createRoot } from "react-dom/client";
// import "./index.css";
// import ReactDOM from "react-dom/client";
// //import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import React from "react";
// import "react-toastify/ReactToastify.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "react-toastify/dist/ReactToastify.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import "react-toastify/ReactToastify.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "../redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
