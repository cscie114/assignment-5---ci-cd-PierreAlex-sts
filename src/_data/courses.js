require('dotenv').config();
const fetch = require("node-fetch");

// API graphql link and query to fetch the data
const graphqlCanvas = "https://canvas.harvard.edu/api/graphql";
const graphQL = {
  query: `query {
    __typename
    course(id: "112559") {
      _id
      name
      modulesConnection {
        nodes {
          name
        }
      }
      assignmentsConnection {
        nodes {
          name
          dueAt
        }
      }
    }
  }`
  
};

// fetch option, with token store into .env
const fetchOptions = {
    "method": "POST",
    "body": JSON.stringify(graphQL),
    "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CANVAS_TOKEN}`
    }
}

// Fetching data from the query then storing into courses object
module.exports = async function() {

    let courses= {};
    try {
        let responseData = await fetch(graphqlCanvas, fetchOptions)
        courses= await responseData.json();
    } catch (err) {
        console.log("ERROR with graphql" + err);
    };
    return courses;
}