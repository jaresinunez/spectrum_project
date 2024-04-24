import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';

const ArcGISMap = ({mapId}) => {
  useEffect(() => {
    if (!mapId) {
        console.error('No map ID provided.');
        return;
      }
    // Load the required ArcGIS modules
    loadModules(['esri/config', 'esri/WebMap', 'esri/views/MapView',"esri/widgets/ScaleBar",
    "esri/widgets/Legend", 'esri/widgets/Popup'], {
      css: true
    }).then(([esriConfig, WebMap, MapView, ScaleBar, Legend, Popup]) => {
      // Set the API key
      esriConfig.apiKey = "AAPK32a231c18ed44d50b0f931ed8d5011f1zG33j1CemrBRSDy7TVvG24fHKjOz1asq5srJjJKYEaFuV6uvHyXf";

      // getting the webmap
      const webmap = new WebMap({
        portalItem: {
            id: mapId
        }
      });

      // Create a new map view
      const view = new MapView({
        map: webmap,
        container: "viewDiv" 
      });

      // Add scale bar widget
      const scaleBar = new ScaleBar({
        view: view,
        unit: "dual" // both metric and non-metric units
      });
      view.ui.add(scaleBar, "bottom-right");

      // Add legend widget
      const legend = new Legend({
        view: view
      });
      view.ui.add(legend, "bottom-left");

      const popupTemplate = {
        title: "{Name}", 
        content: [{
          type: "fields",
          fieldInfos: [
            { fieldName: "f1", label: "Attribute 1" },
            { fieldName: "f2", label: "Attribute 2" },
          ]
        }]
      };

      const popup = new Popup({
        view: view,
        content: popupTemplate
      });
      view.popup = popup;

      view.on("click", (event) => {
        view.hitTest(event.screenPoint).then((response) => {
          const feature = response.results[0].graphic;
          if (feature) {
            view.popup.open({
              location: event.mapPoint,
              features: [feature]
            });
          }
        });
      });
    });
  }, [mapId]);

  return <div id="viewDiv" style={{ height: '100vh', width: '100vw' }}></div>;
};

export default ArcGISMap;
