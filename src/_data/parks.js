// Javascript from assigment 2 to fetch all the parks from the NPS API
require('dotenv').config();
const eleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
   
    let baseUrl = "https://developer.nps.gov/api/v1/parks";  
    // use the userAgent to let know the request comes from the browser
    let userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0';

    // params for specifi queries value 
    let limit = 100;

    // Definie park params to fetch specific query
    let parksParams = {
        limit: limit
    };
    

    // fetch the API by constructing the url via params
    try {
        let params = new URLSearchParams(parksParams);
        let queryString = params.toString();
        let url = baseUrl + "?" + queryString;
        let parkData = await eleventyFetch(url, {
            directory: ".cache",
            fetchOptions: {
                headers: {
                    "User-agent": userAgent,
                    "x-api-key": process.env.NPS_API_KEY
                },
            },
            duration: "1d",
            type: "json"
        }).then((jsonData) => {
            return jsonData;
        });
        return(parkData);

    } catch(err) {
        console.error("something wrong with the api");
        console.log(err);
    }
};