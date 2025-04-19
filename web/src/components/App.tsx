import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import JsonViewer from "./windows/json";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  }
]);

debugData([
  { 
    action: "json",
    data: [
      {
        invokingResource: "inventory",
        id: "1",
        data: [
          { id: 1, name: "Item 1", quantity: 10 },
          { id: 2, name: "Item 2", quantity: 5 },
          { id: 3, name: "Item 3", quantity: 2 },
          { id: 4, name: "Item 4", quantity: 8 },
          { id: 5, name: "Item 5", quantity: 1 },
        ],
      },
      {
        invokingResource: "inventory",
        id: "2",
        data: [
          { id: 1, name: "Item 1", quantity: 10 },
          { id: 2, name: "Item 2", quantity: 5 },
          { id: 3, name: "Item 3", quantity: 2 },
          { id: 4, name: "Item 4", quantity: 8 },
          { id: 5, name: "Item 5", quantity: 1 },
        ],
      },
      {
        invokingResource: "playerData",
        id: "playerData",
        data: [
          { id: 1, name: "Item 1", quantity: 10 },
          { id: 2, name: "Item 2", quantity: 5 },
          { id: 3, name: "Item 3", quantity: 2 },
          { id: 4, name: "Item 4", quantity: 8 },
          { id: 5, name: "Item 5", quantity: 1 },
        ],
      },
    ]
  }
])


const App: React.FC = () => {
  return (
    <div className="wrapper">
      <JsonViewer />
    </div>
  );
};

export default App;
