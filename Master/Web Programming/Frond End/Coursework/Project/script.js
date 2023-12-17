function getAuthor() {
  var authorNameDefault = document.getElementById("authorName").value;
  var authorName = authorNameDefault.split(" ").join("_");
  var url =
    "https://dblp.org/search/publ/api?q=author:" + authorName + ":&format=json";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((authorList) => {
      var totalHits = authorList.result.hits["@total"];
      //   console.log(totalHits);
      if (totalHits == 0) {
        document
          .getElementById("searchInfo")
          .setAttribute("class", "warningMessages");
        document.getElementById("searchInfo").textContent =
          "No author found with the name: " + authorName + ", please try again";
      } else {
        document
          .getElementById("searchInfo")
          .setAttribute("class", "successMessages");
        document.getElementById("searchInfo").textContent = "Found";
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
