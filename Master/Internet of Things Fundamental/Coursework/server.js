//load requirements
const { Client } = require("@notionhq/client");
require("dotenv").config();

//get .env variables
const apiKey = process.env.NOTION_API_TOKEN;
const databaseId = process.env.TO_DO_DATABASE_ID;

//Here will be setup the first section where we get an input from the raspberry microphone,
//convert the input to string and store it to inputText variable
const inputText = "Transcribed Text from Mic";

//Initialize the Notion client
const notion = new Client({
  auth: apiKey,
});

// Create function to add db item to Notion
async function addItemToDatabase(databaseId, text) {
  try {
    // Using Notion API to create a new page (item) in the database
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          // "Name" should be replaced with the title of your database's title property
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        // Add more properties here if your database has more fields
      },
    });
    console.log("Success! Entry added:", response);
  } catch (error) {
    // Error handling
    console.error("Error adding entry to Notion:", error.body);
  }
}

addItemToDatabase(databaseId, inputText);
