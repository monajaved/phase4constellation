Welcome!

To git clone this repository, fork and clone using git@github.com:monajaved/phase4constellation.git.
The backend and frontend folders are both set up here.
CD into the backend and make sure to 
-bundle install
-rails db:migrate
-rails db:seed (since I am seeding my constellations through seeds.rb)

CD into frontend and type open index.html to get to the webpage that renders the application.
There are three backend APIs being used here:
- localhost:3000/constellations
- localhost:3000/users
- localhost:3000/favorites
There is a many to many relationship between our users and constellations through favorites.

Feel free to suggest changes and add functionality.
