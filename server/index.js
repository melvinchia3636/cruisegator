const express = require('express');
const cors = require('cors');

const CabinsData = require('./api/cabins');
const { DatabaseList, DatabaseSearch} = require('./api/database');
const GalleryData = require('./api/gallery');
const ItinerariesData = require('./api/itineraries');
const SpecificationsData = require('./api/spec');

const app = express()
app.use(cors({
  origin: '*'
}));

app.get('/database/list/:page', DatabaseList);
app.get("/database/search", DatabaseSearch)
app.get('/ship/cabins/:id', CabinsData);
app.get('/ship/gallery/index/:id', GalleryData.getIndexData);
app.get('/ship/gallery/image/:id/:album_id/:image_id', GalleryData.getImageData);
app.get('/ship/itineraries/:id', ItinerariesData);
app.get('/ship/specifications/:id', SpecificationsData);

app.listen(3001, () => console.log('Hell yeah'));