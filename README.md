# FilmAppCA2

This is an application about Disney Princess films. A user can register and login.
When logged, the user is able to create, edit and delete film, character and group.
If a user is not logged in, they can only view a list of the films, characters and groups.
In addition, the user can view each film, character and group.
A film can have many characters and a character can belong to many films (many-to-many relationship).
A character can belong to one group and a group can have many characters (one-to-many relationship).

## How to run the front end

Run the command 'npm start' on the front end folder. Open http://localhost:3000 in the browser.

## How to run the backend

Run the command 'npm run watch' on the backend folder. This runs the backendd server.

### Note*
When you log in or out, refresh the page to change the navbar.
When you create a film/character/group, they do not automatically get added to the existing films/characters/groups in the Show pages.
