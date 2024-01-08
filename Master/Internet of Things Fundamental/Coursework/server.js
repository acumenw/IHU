//load requirements
const { Client } = require("@notionhq/client");
require("dotenv").config();

//get .env variables
const api_key = process.env.NOTION_API_TOKEN;
const database_id = process.env.TO_DO_DATABASE_ID;

//Here will be setup the first section where we get an input from the raspberry microphone,
//convert the input to string and store it to inputText variable
const inputText = "Transcribed Text from Mic";

//Initialize the Notion client
const notion = new Client({
  auth: api_key,
});

// Create function to add database item to Notion
async function addItemToDatabase(dbid, text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: dbid },
      properties: {
        Name: {
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

addItemToDatabase(database_id, inputText);
