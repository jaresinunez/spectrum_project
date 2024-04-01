import ArcGISMap from "./components/arcgis/ArcGISMap"
import Navbar from "./components/navbar/Navbar";
import React, { useState } from 'react';


export const App = () => {
  const maps = [
    { id: "4e0dbe92091f481f99595bd3959ff841", title: "Covid in Texas"},
    { id: "d2750c960b2247d4b636ed252a5c0ba7", title: "San Antoio Map"},
    { id: "d88ff67b0c274db98256fc5f907eaa9b", title: "Hubs"}
  ]
  const defaultMapId = "4e0dbe92091f481f99595bd3959ff841";

  const [selectedMapId, setSelectedMapId] = useState(defaultMapId);


  const handleMapSelect = (mapId) => {
    setSelectedMapId(mapId);
  };

  return (
    <div className="app">
      <h1>ArcGIS Project</h1>
      <ArcGISMap mapId={selectedMapId}/>
      <Navbar maps={maps} onSelectMap={handleMapSelect} /> 
    </div>
  )
}

export default App;
