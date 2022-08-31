import React from "react";
import Create from "./Create";
import EmojiPedias from "../emojipedia";


function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {EmojiPedias.map(Create)}
      </dl>
    </div>
  );
}

export default App;
