# Trailz

# DESCRIPTION
Are you looking for parks nearby, places to hike, and what events are happening near you. This is the app for you! Our app allows users to search for local parks in our search tab which has features that will allow users to save their favorite parks and create events. You can also drop custom pins to create events there.

# Interaction
1. First sign in, which creates the user account for you using google oauth.
2. Next you would go to the search tab. If location is enabled on your browser and location the map will center based on that location.
3. To make a custom search you can use the search bar to search for a city or park name.
4. If you see a park you are interested in going to, click on the marker and click "Add to favs".
5. Now that is saved to database and you can see all your favorite parks when you click on the Favorite Trails tab.
6. You can remove parks from your favorites from the favorites tab when you click on the marker and click the "remove from favs" button.
7. You can create an event in the search or favorite tab by clicking on the "create an event" button on any location.
8. A modal will pop, which allows you to write the name of the event, what type of activity it is, date, description, and if the event is public.
9. Once that is done you click on submit and the event will show when you click on the Events tab.
10. You can register and unregister from other users' events and can delete an event that you created.
11. You can use custom location by single clicking anywhere on the map. If you need to move the pin just click in a new location. You can save this custom location to your favorites or create an events at it.
12. When creating an event or adding this custom pin to your favorites you will be asked to name this location in the event creation modal or an add to favs modal that will ask you to name the location before you can save it to the database.

# Requirements
1. git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
2. npm https://www.npmjs.com/get-npm
3. Mongo https://www.mongodb.com/try/download/community or https://www.mongodb.com/cloud/atlas

# Tech Stack
1. MongoDB/Mongoose (5.10.15)
2. Express Server (4.17.1)
3. React (17.0.1)
4. NodeJS (8.17.0)
5. Passport/Google OAuth (0.4.1 / 2.0.0)

# API's
1. Google Maps
2. Google OAuth

# .env
1. Make sure to go to the Google Developers Console and generate a CLIENT ID and CLIENT SECRET.
2. Create an account at (https://www.mongodb.com/cloud/atlas) to access a secure passowrd for your cluster.

# Google Maps API
1. Make a directory in the server folder and name it "google-maps"
2. Then create a file and name it "API.js"
3. Create a variable and name it "GOOGLE_MAPS_API_KEY" with your Google Maps API key.
4. Export it the variable from that file.

# scripts
1. npm install -- to install all dependencies
2. npm run build -- to run the webpack
3. npm run start -- to start up the server

# What are in the folders
1. Server -- in the server folder you will have the controllers, database, helper functions, middleware and routers
2. Client -- in the scr folder you will have a folder for Forms, Modals, Navbar, Pages, and Styles

# How to start the app
0. Clone the app from Github and install `npm`. Prepare the app for deployment in the `.env` section and added your `Google Maps API key`.
1. `npm install`
2. `npm run build`
3. `npm run start`