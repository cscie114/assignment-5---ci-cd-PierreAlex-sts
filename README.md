# Assignment 05 for CSCI E-114

Website page: https://64481b6c40544000721906d3--lambent-alpaca-4589ca.netlify.app/all-parks/

The CI pipepline for local gitHub is at ci.yml and the netlify CI pipeline is at netlifydemo.xml

The website is from assigment 3 minus the canvas part, it fetches the API from the NPS and show the parks and their places. 
The index page of the website is not currently working, this is due to the serverless function not working I presume.
I couldn't figure out how to make function works with 11ty. There is very little documentation I could find that help my issue. I did connect the project with netlify cli!

The weird part is that the website home page works in a localhost but doesn't when it published on netlify. 

For the serverless function, I could make it interact with the website but it did remove the whole CSS from the website. Also in the netlify/functions/alerts there is a file alerts.js which was my  first idea to fetch the API from NPS nation park to get the Alerts from the parks and display them on the home page. 