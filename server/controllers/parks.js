const axios = require('axios');
const { Park, User } = require('../database');
const { wrapAsync } = require('../helpers');
const GOOGLE_MAPS_API_KEY = require('../google-maps/API');

const getFavoriteParks = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { favoriteParks } = await User.findOne({ _id: userId });
  const mappedParks = await Promise.all(
    favoriteParks.map(async (parkId) => {
      const mappedPark = await Park.findOne({ _id: parkId });
      return mappedPark;
    })
  );
  res.send(mappedParks);
});

const addFavoritePark = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { parkId, name, address, lat, lng } = req.body;
  const user = await User.findOne({ _id: userId });
  const newPark = await new Park({
    parkId,
    name,
    address,
    location: { lat, lng },
  }).save();
  user.favoriteParks.push(newPark);
  await user.save();
  res.send(newPark);
});

const removeFavoritePark = wrapAsync(async (req, res) => {
  const { userId, parkId } = req.params;
  const user = await User.findById(userId);
  user.favoriteParks = [...user.favoriteParks].filter(
    (id) => id.toString() !== parkId
  );
  await user.save();
  res.send();
});

const defaultSearch = wrapAsync(async (req, res) => {
  const { data: results } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&location=29.977000,-90.101570&radius=160934&keyword=trails&type=park`
  );
  res.send(
    results.results.map((result) => ({
      parkId: result.place_id,
      name: result.name,
      address: result.vicinity,
      location: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      icon: result.icon,
      // imageUrl: result.photos[0].photo_reference || null,
      // anchorTag: result.photos[0].html_attributions || null,
    }))
  );
});

const searchParks = wrapAsync(async (req, res) => {
  const { lat, lng, keyword } = req.params;
  const { data: results } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=160934&type=park&key=${GOOGLE_MAPS_API_KEY}&keyword=${keyword}`
  );
  const mappedResults = results.results.map((result) => ({
    parkId: result.place_id,
    name: result.name,
    address: result.vicinity,
    location: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    },
    icon: result.icon,
    // imageUrl: result.photos[0].photo_reference || null,
    // anchorTag: result.photos[0].html_attributions || null,
  }));
  const locations = mappedResults.reduce(
    (center, result) => ({
      minLat:
        result.location.lat < center.minLat
          ? result.location.lat
          : center.minLat,
      maxLat:
        result.location.lat > center.maxLat
          ? result.location.lat
          : center.maxLat,
      minLng:
        result.location.lng < center.minLng
          ? result.location.lng
          : center.minLng,
      maxLng:
        result.location.lng > center.maxLng
          ? result.location.lng
          : center.maxLng,
    }),
    {
      minLat: Infinity,
      maxLat: -Infinity,
      minLng: Infinity,
      maxLng: -Infinity,
    }
  );
  const { minLat, maxLat, minLng, maxLng } = locations;
  res.send({
    mappedResults,
    position: {
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2,
    },
  });
});

module.exports = {
  getFavoriteParks,
  addFavoritePark,
  removeFavoritePark,
  defaultSearch,
  searchParks,
};
