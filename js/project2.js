// NO3 = MAP CESIUM !!!
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMjM4YWQ0YS1jNDIzLTQ0ZGUtYmRlOS00ZGQwOGIzOWU5ZTkiLCJpZCI6ODUwODIsImlhdCI6MTY0Njc2ODE4OH0.qiGlaAkcSKH_l7gK5WL0-uC1D7ID5CZwDs93syqGc3M';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
terrainProvider: Cesium.createWorldTerrain()
});    
// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
destination : Cesium.Cartesian3.fromDegrees(-0.13994767,51.51289135, 400),
orientation : {
    heading : Cesium.Math.toRadians(0.0),
    pitch : Cesium.Math.toRadians(-15.0),
}
});

// END MAP CESIUM