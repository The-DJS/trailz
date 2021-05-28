const axios = require('axios');
const { Park, User } = require('../database');
const { wrapAsync } = require('../helpers');
const GOOGLE_MAPS_API_KEY = require('../google-maps/API');

const getFavoriteParks = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { favoriteParks } = await User.findOne({ _id: userId });
  const mappedParks = await Promise.all(
    favoriteParks.map(async (park) => {
      const mappedPark = await Park.findOne({ _id: park._id });
      return mappedPark;
    })
  );
  return mappedParks;
});

const addFavoritePark = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { parkId, name, address, lat, long, icon, imageUrl, anchorTag } =
    req.body;
  const user = await User.findOne({ _id: userId });
  const newPark = await new Park({
    parkId,
    name,
    address,
    location: { lat, long },
    icon,
    imageUrl,
    anchorTag,
  }).save();
  user.favoriteParks.push(newPark);
  await user.save();
  res.send(newPark);
});

const searchParks = wrapAsync(async (req, res) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&location=29.977000,-90.101570&radius=160934&type=park`
  );
  const { results } = response.data;
  const mappedResults = results.map((result) => ({
    parkId: result.place_id,
    name: result.name,
    address: result.vicinity,
    location: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    },
    icon: result.icon,
    imageUrl: result.photos[0].photo_reference || null,
    anchorTag: result.photos[0].html_attributions || null,
  }));
  console.log(mappedResults);
  res.send(mappedResults);
});

module.exports = {
  getFavoriteParks,
  addFavoritePark,
  searchParks,
};
