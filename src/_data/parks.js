// Javascript from assigment 2 to fetch all the parks from the NPS API
require('dotenv').config();
const eleventyFetch = require("@11ty/eleventy-fetch");
const cacheDuration = '1d';
const limit = 50;

module.exports = async function() {
   
    let baseUrl = "https://developer.nps.gov/api/v1/parks";  
    // use the userAgent to let know the request comes from the browser
    let userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0';

    // Definie park params to fetch specific query
    let parksParams = {
        limit: limit,
        start: 0
    };

    let parks = {data:[]};
    // Keep track of the next link and the total to be fetched.
    let nextLink = '';
    let total = '';
    // Fetching the api until all data is fetched, using do/while structure
    do {
        let params = new URLSearchParams(parksParams);
        let queryString = params.toString();
        let url = baseUrl + "?" + queryString;
        try {
            // fetch API
            let responseData = await eleventyFetch(url, {
                duration: cacheDuration,
                fetchOptions: {
                    headers: {
                        "User-agent": userAgent,
                        "x-api-key": process.env.NPS_API_KEY
                    },
                },
                type: "json"
            });
            console.log(responseData);
            responseData.data.forEach( (p) => {
                getPlacesFromParks(p.parkCode)
                .then((jsonResult) => {
                    // store the place data into _places to display it later
                    p._places = jsonResult; 
                    return jsonResult;
                });
            });
            // keep track of total objects to be fetched
            total = responseData.total;
            // store data into the parks object
            parks.data.push(...responseData.data);
            nextLink = responseData.start;
            // offset the start of next fetch
            parksParams.start += limit;
            
            } catch (err) {
                console.log("something wrong with api\n");
                console.log(err);
        }
    } while ( nextLink <= total)
    return(parks);
};

// Call the place API with the parkCode then return the data
async function getPlacesFromParks(parkCode) {
    let userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0';
    let placeUrl = `https://developer.nps.gov/api/v1/places?parkCode=${parkCode}`
    try {
        let responseData = await eleventyFetch(placeUrl, {
            duration: cacheDuration,
            fetchOptions: {
                headers: {
                    "User-agent": userAgent,
                    "x-api-key": process.env.NPS_API_KEY
                },
            },
            type: "json"
        });
        return(responseData.data);
    } catch(err) {
        console.error("something wrong with places api");
        console.log(err);
    }
}