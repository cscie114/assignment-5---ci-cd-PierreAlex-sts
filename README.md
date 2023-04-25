# Assignment 05 for CSCI E-114

What was the GraphQL mutation you used to create a discussion post?

mutation MyMutation {
  __typename
  createDiscussionEntry(input: {
    discussionTopicId: "883725", 
    message: "Hello from Graphiql, I am a little late!"
   }) 
  {
    discussionEntry {
      previewMessage
    }
  }
}

## Installation
After cloning the repository, installation consists of three steps:

1. Adding and populating a `.env` file with an API key for the NPS as well as your Canvas Token.

2. Installing the appropriate npm packages.

3. Running the 11ty server on your local machine.


### Install the appropriate npm packages
In the root directory of the cloned repository, install all the npm packages you need with the following command:

    npm install

### Build and run the website with 11ty
In the root directory of the cloned repository, build the website and serve it up with:

    npm start
