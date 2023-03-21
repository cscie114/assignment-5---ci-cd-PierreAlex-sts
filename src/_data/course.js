require('dotenv').config();
const fetch = require("@11ty/eleventy-fetch");


const graphqlCanvas = "https://canvas.harvard.edu/api/graphql";
const graphQL = JSON.stringify({
    query: ` MyQuery {
        __typename
        course(id: "112559") {
          _id
          name
          modulesConnection {
            nodes {
              id
              name
              createdAt
            }
          }
          assignmentsConnection {
            nodes {
              description
              dueAt
              name
            }
          }
        }
      }`

});


const fetchOptions = {
    "method": "POST",
    "body": graphQL,
    "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CANVAS_TOKEN}`
    }
}

module.exports = async function() {

    let coursesData = {};
    try {
        let reponseData = await fetch(graphqlCanvas, fetchOptions)
        coursesData = await reponseData.json();
    } catch (err) {
        console.log("ERROR with graphql" + err);
    };

    console.log(coursesData);
    return coursesData;
}