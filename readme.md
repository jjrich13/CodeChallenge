# ITM21st Code Challenge

## Overview

The app represents an online poll for candidates initially chosen from Puppies, Kittens and Gerbils. A user can view voting results, cast votes for a candidate, or add/remove candidates from the race.

## What I implemented

### Base

*   Display the percentage of the vote that each candidate has in the Live Results section. For example, if there are 2 candidates and Candidate A has 10 votes and Candidate B has 30 votes, then Candidate A would have 25% of the vote and Candidate B would have 75% of the vote.
*   Order the Live Results by the vote count descending.
*   When a vote is cast in the Cast Your Vote section, the Live Results should be updated.
*   Ensure that a new candidate cannot be added without entering a name
*   Ensure that a new candidate with the same name cannot be added.
*   Implement the Add New Candidate action
*   Implement the Remove Candidate action

### Bonus

*   Added ImgUrl input to display photos of candiates
*   Implemented AngularJS material Styling
*   A Card system to display the leaders with image, title and percentage of total vote.

## To Run the app

1.  Download and install [Node.js](https://nodejs.org). Install a version >= 8.0.0. Along with Node.js, NPM will be installed which you need for step 4.
2.  Clone the app from GitHub
3.  Run `npm install` to install express.js which is used to run the demo server
4.  Run the app in the IDE or run `npm start` manually. This will start the server which serves up the static files in the /public directory.
5.  Navigate to http://localhost:3000 to see the app running.

### Notes

*   For the sake of easy testing, I did not make the image url need to be unique. Just re-use the same url
*   Here is a url of an image of a kangaroo than you can use to copy and paste when testing https://s3.amazonaws.com/wildambienceassets/wp-content/uploads/2018/03/02141133/nsw_02246.jpg
*   I left in the console logs that were already there in case you preferred them
*   There are comments in some areas of the code to explain my thought processes