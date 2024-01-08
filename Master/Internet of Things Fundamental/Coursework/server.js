const { Client } = require("@notionhq/client");
require("dotenv").config();

// Initialize the Notion client with your Notion API token
// Replace 'your_notion_api_token' with your actual Notion API token
const notion = new Client({
  auth: "your_notion_api_token",
});
const api_key = process.env.api_key;

// Function to add an item to a Notion database
// Parameters:
//   databaseId - The ID of the database where you want to add the item
//   text - The text content you want to add to the database
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

// Replace with your actual database ID
const databaseId = "your_database_id";
// Example text input, replace this with actual data from speech-to-text output
const inputText = "Sample text from speech recognition";

// Call the function to add the text to the Notion database
addItemToDatabase(databaseId, inputText);
