# trailz

# DESCRIPTION
Are you looking for parks nearby, places to hike, and what events are happening near you. This is the app for you! Our app allows users to search for local parks in our search tab which has features that will allow users to save their favorite parks and create events. 

# Interaction 
1. First sign in, which creates the user account for you using google oauth
2. Next you would go to the search tab and search for parks nearby or parks you are interested in
3. If you see a park you are interested in going to, click on the icon and click 'Add to favs'
4. Now that is saved to database and you can see all your favorite parks when you click on the Favorite Trails tab
5. If you want to create an event yoi would go to the search tab, click anywhere on the map, then select 'Create an event'
6. A modal will pop, which allows you to write the name of the event, what type of activity it is, date, description, and if the event is public
7. Once that is done you click on submit and the event will show when you click on the Events tab.
8. You can unregister from an event and you can delete a event that you created

# Requirements

# Tech Stack
1. MongoDB/Mongoose (/5.10.15)
2. Express Server (4.17.1)
3. React (17.0.1)
4. NodeJS (8.17.0)
5. Passport/Google OAuth (0.4.1 / 2.0.0)

# API's
1. Google Maps

# .env
1. Make sure to go to the Google Developers Console and generate a CLIENT ID and CLIENT SECRET.
2. Create an account at (https://www.mongodb.com/cloud/atlas) to access a secure passowrd for your cluster. 

# scripts
1. npm install -- to install all dependencies
2. npm run start -- to start up the server
3. npm run build -- to run the webpack






