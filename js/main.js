// javascript document 

    // no1 = LEAFLET JAVASCRIPT

        // initalize the map
        const map = L.map('map').setView([51.51289135, -0.13994767], 15);

        //create baselayer - tiles
        const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
        attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 19
        }
        );

        // add background to the leaflet map
        backgroundMap.addTo(map);

        // add markers
        let hamleysmarker = L.marker([51.51289135, -0.13994767]).addTo(map);
        let waterstonesmarker = L.marker([51.50899445, -0.13587761]).addTo(map);
        let picadillymarker = L.marker([51.510091, -0.1346461]).addTo(map);
        let oxfordmarker = L.marker([51.5152681, -0.1420078]).addTo(map);        

        // add pop-ups with text to the leaflet map
        let popup = "Hamleys is a popular toy shop in London";
        hamleysmarker.bindPopup(popup);
        let popup2 = "Waterstones is a bookstore with English origins that sell thousands of books in all categories";
        waterstonesmarker.bindPopup(popup2);
        let popup3 = "Picadilly Circus is ...";
        picadillymarker.bindPopup(popup3);
        let popup4 = "Oxford Circus is ...";
        oxfordmarker.bindPopup(popup4); 

        // add circle to the leaflet map
        let circle =  L.circle([51.51289135, -0.13994767], 550, {
        color: 'blue',
        fillColor: 'rgb(0,0,255)',
        fillOpacity: 0.5
        }).addTo(map);

        // add polygons to the leaflet map
        let polygon = L.polygon(
        [[
        [51.51289135, -0.13994767], 
        [51.50899445, -0.13587761], 
        [51.510091, -0.1346461], 
        [51.5152681, -0.1420078], 
        ]]).addTo(map);

    // END LEAFLET MAP

        // no2 = RDNEW MAP

        // dutch tiling scheme for rdnew map
        const RDnew = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
        {
        transformation: L.Transformation(-1, -1, 0, 0),
        resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
        origin: [-285401.920, 903401.920],
        bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
        }
        );

        const RDNewMap= L.map('RDNewMap', {
        crs: RDnew,
        zoom: 6, //Zoom scale RD new
        center: [52.3507849, 5.2647016] //Coördinaten van Almere
        });

        // pdok kaart voor rdnew map
        const pdokachtergrondkaart = new L.TileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 13,
        attribution: 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
        });
        pdokachtergrondkaart.addTo(RDNewMap);

        // END RDNEWMAP

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
            destination : Cesium.Cartesian3.fromDegrees(4.895167899999933, 52.3702157, 400),
            orientation : {
                heading : Cesium.Math.toRadians(0.0),
                pitch : Cesium.Math.toRadians(-15.0),
            }
            });

            // END MAP CESIUM

        // BUTTON, CORRELATION WITH RDNEWMAP NO2

        const geoJsonlayerHHW = L.geoJSON().addTo(RDNewMap);

        function zoom(){
        RDNewMap.setView( [52.658365, 4.832966], 14)


        // data ophalen
        fetch('https://geodata.nationaalgeoregister.nl/locatieserver/lookup?fl=*&id=weg-c6061bb0982decff98ddd381a893a0e7')
        .then(response => response.json())
        .then(data => {
            const wkt = data.response.docs[0].geometrie_ll
            // wkt omzetten naar geojson
            const geojson = Terraformer.wktToGeoJSON(wkt)
            console.log(geojson)
            geoJsonlayerHHW.addData(geojson);

        // Naam woonplaats

        const woonplaatsnaam = data.response.docs[0].woonplaatsnaam;

        // interactive title
        const titel = document.getElementById('interactiveTitle');
        titel.style.color = 'red'
        titel.append(woonplaatsnaam)
        })

        }