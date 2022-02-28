

// LEAFLET JAVASCRIPT

// initalize the map
const map = L.map('map').setView([51.51289135, -0.13994767], 15);

//create baselayer - tiles
const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
maxZoom: 19
}
);

// add background map
backgroundMap.addTo(map);

// add markers
let hamleysmarker = L.marker([51.51289135, -0.13994767]).addTo(map);
let waterstonesmarker = L.marker([51.50899445, -0.13587761]).addTo(map);
let picadillymarker = L.marker([51.510091, -0.1346461]).addTo(map);
let oxfordmarker = L.marker([51.5152681, -0.1420078]).addTo(map);        

// add pop-ups with text
let popup = "Hamleys is a popular toy shop in London";
hamleysmarker.bindPopup(popup);
let popup2 = "Waterstones is a bookstore with English origins that sell thousands of books in all categories";
waterstonesmarker.bindPopup(popup2);
let popup3 = "Picadilly Circus is ...";
picadillymarker.bindPopup(popup3);
let popup4 = "Oxford Circus is ...";
oxfordmarker.bindPopup(popup4); 

// add circle
let circle =  L.circle([51.51289135, -0.13994767], 550, {
color: 'blue',
fillColor: 'rgb(0,0,255)',
fillOpacity: 0.5
}).addTo(map);

// add polygon
let polygon = L.polygon(
[[
[51.51289135, -0.13994767], 
[51.50899445, -0.13587761], 
[51.510091, -0.1346461], 
[51.5152681, -0.1420078], 
]]).addTo(map);

// Hash in URL (hoeft niet aan map worden gekoppeld want het gaat in de URL)

const hash = new L.Hash(map);

// dutch tiling scheme 
const RDnew = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
{
transformation: L.Transformation(-1, -1, 0, 0),
resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
origin: [-285401.920, 903401.920],
bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
}
);

const rdnew= L.map('rdnew', {
crs: RDnew,
zoom: 6, //Zoom scale RD new
center: [52.3507849, 5.2647016] //Coördinaten van Almere
});

// pdok
const pdokachtergrondkaart = new L.TileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png', {
minZoom: 0,
maxZoom: 13,
attribution: 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
});
pdokachtergrondkaart.addTo(rdnew);

// ADD a WMS layer to the map
const cbs = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/ahn3/wms', {
'layers': 'ahn3_5m_dtm',
'styles': 'ahn3:ahn3_5m_detail',
'srs': 'EPSG:28992',
'format': 'image/png',
'opacity': '0.5',
'transparent': true
}).addTo(rdnew);


//GeoJSON Coördinaten toevoegen om een polygoon te maken
                    
const myGeojson = {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Polygon",
"coordinates": [[[
5.230436325073242,
52.3701494343597
],
[5.207176208496094,52.36517071668903 ],
[5.216875076293945,52.35437283281734],
[5.229063034057617,52.35720360124792],  
[5.236015319824219,52.350545765028656],
[5.246658325195312,52.35306223047324],
[5.230436325073242,52.3701494343597]]]}}]}
L.geoJSON(myGeojson).addTo(rdnew);

//Maak een lege GeoJSON laag aan, eerst de opmaak.
const geojsonMarkerOptions = {
radius: 8,
fillColor: "#ff7800",
color: "#000",
weight: 1,
opacity: 1,
fillOpacity: 0.8};
const geojson = L.geoJson(null,{
pointToLayer: function (feature, latlng) {
return L.circleMarker(latlng, geojsonMarkerOptions);}})
geojson.addTo(rdnew);

//Je laadt de GeoJSON file in van een server. Kan gewoon een bestand uploaden naar Github en daarvandaan inladen zodat hij overal beschikbaar is.
fetch("https://raw.githubusercontent.com/myrmaidx/hsfm/master/data/campingalmere.geojson")
.then(response => response.json())
.then(data => {
geojson.addData(data);})
.catch( error => alert(error))