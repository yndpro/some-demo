import React from "react";
import ThemedButton from "./ThemedButton";
import { ThemeContext } from "./contest";

let Toolbar = props => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div>
          <ThemedButton test={theme}/>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Toolbar;
