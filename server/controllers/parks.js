const axios = require('axios');
const { Park, User } = require('../database');
const { wrapAsync } = require('../helpers');
const GOOGLE_MAPS_API_KEY = require('../google-maps/API');

/**
 * returns an array of favorite parks based on a user id. maps
 * over favorite parks so return array includes park objects
 * instead of object ids. promise all is used because the callback
 * function passed into map requires a subsequent database query.
 */
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

/**
 * is invoked when user clicks add to favorite buttons. takes
 * data from google server regarding park, saves park to database,
 * adds park to favorite park array of user mapped to user id, and
 * saves updated user.
 */
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

/**
 * finds user associated with user id. filters favorite parks
 * array and removes park associated with park id is of type
 * object id and parkId is of type string. convert object id
 * to a string else the strict comparison won't work. this took
 * like an hour to figure out, learn from my mistake.
 */
const removeFavoritePark = wrapAsync(async (req, res) => {
  const { userId, parkId } = req.params;
  const user = await User.findById(userId);
  user.favoriteParks = [...user.favoriteParks].filter(
    (id) => id.toString() !== parkId
  );
  await user.save();
  res.send();
});

/**
 * queries google server for nearby parks. maps over the query results
 * and creates object client is able to iterate over. google query requires
 * key which comes from .env folder, location which has a default location
 * of mid city, new orleans. i recommend making this dynamic. check out
 * the use effect in app.jsx to see how to extract browser location. radius is
 * in meters, equals 100 miles. type is park so it will only return locations
 * of type park and keyword is trails so it will specifically look for
 * trails.
 */
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

/**
 * this callback accepts a latitude, longitude, and keyword from the params.
 * it queries the google server for parks within 100 miles (160934 meters =
 * 100 miles) including the supplied keyword (this comes from a form). the
 * results are mapped so the client can iterate over them. a reduce method
 * is used to find the minimum and maximum latitude and longitudes. using these
 * values, the center of the queried data is calculated. an object is returned
 * that contains both the mapped results and an object that contains the center
 * of the search results.
 */
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
