import React from "react";
import Toolbar from "./Toolbar";
import { ThemeContext } from "./contest";

let App = () => {
  let theme = "dark";
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
};

export default App;
