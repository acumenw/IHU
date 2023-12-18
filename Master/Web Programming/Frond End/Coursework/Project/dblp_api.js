var authorNameDefault;
var authorName;
var totalHits;
var url;

function startSearch() {
  authorNameDefault = document.getElementById("authorName").value;
  authorName = authorNameDefault.split(" ").join("_");
  getAuthor(authorName);
}
function authorNotFound() {
  document
    .getElementById("searchInfo")
    .setAttribute("class", "warningMessages");
  document.getElementById("searchInfo").textContent =
    "No author found with the name: " + authorName + ", please try again";
}

function setTable(authorList) {
  //create table
  var table = document.createElement("table");

  //create header row
  var headerRow = document.createElement("tr");

  //create title header and append to row
  var title = document.createElement("th");
  var titleContent = document.createTextNode("Title");
  title.append(titleContent);

  //create venue header and append to row
  var venue = document.createElement("th");
  var venueContent = document.createTextNode("Venue");
  venue.append(venueContent);

  //create year header and append to row
  var year = document.createElement("th");
  var yearContent = document.createTextNode("Year");
  year.append(yearContent);

  //create type header and append to row
  var type = document.createElement("th");
  var typeContent = document.createTextNode("Type");
  type.append(typeContent);

  //append cells to the header row
  headerRow.append(title, venue, year, type);

  //append header row to the table
  table.append(headerRow);

  //add data to table
  for (var i = 0; i < totalHits; i++) {
    //create new row
    var newRow = document.createElement("tr");

    //add title header to the row
    var newRowTitle = document.createElement("td");
    var newRowTitleContent = document.createTextNode(
      authorList.result.hits.hit[i].info.title
    );
    newRowTitle.append(newRowTitleContent);

    //add venue header to the row
    var newRowVenue = document.createElement("td");
    var newRowVenueContent = document.createTextNode(
      authorList.result.hits.hit[i].info.venue
    );
    newRowVenue.append(newRowVenueContent);

    //append title to the new row
    newRow.append(newRowTitle, newRowVenue);

    //append title to the table
    table.append(newRow);
  }

  //apend table to the body
  document.body.append(table);

  //set table attributes
  table.setAttribute("id", "publData");
}

function getAuthor(name) {
  url = "https://dblp.org/search/publ/api?q=author:" + name + ":&format=json";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((authorList) => {
      totalHits = authorList.result.hits["@total"];
      if (totalHits <= 0) {
        authorNotFound();
      } else {
        setTable(authorList);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
