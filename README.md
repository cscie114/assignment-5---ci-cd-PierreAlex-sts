# Assignment 03 for CSCI E-114

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
