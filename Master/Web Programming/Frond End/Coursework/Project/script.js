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
      if (totalHits <= 0) {
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
        var table = document.createElement("table");
        document.body.append(table);
        table.setAttribute("id", "pubs");

        // var title = authorList.result.hits.hit[0].info["title"];
        // var venue = authorList.result.hits.hit[0].info["venue"];
        // var year = authorList.result.hits.hit[0].info["year"];
        // var type = authorList.result.hits.hit[0].info["type"];
        // document.getElementById("pubs").innerHTML +=
        //   "<tr><td>" +
        //   title +
        //   "</td><td>" +
        //   venue +
        //   "</td><td>" +
        //   year +
        //   "</td><td>" +
        //   type +
        //   "</td></tr>";

        for (var i = 0; i < totalHits; i++) {
          var title = authorList.result.hits.hit[i].info["title"];
          var venue = authorList.result.hits.hit[i].info["venue"];
          var year = authorList.result.hits.hit[i].info["year"];
          var type = authorList.result.hits.hit[i].info["type"];
          document.getElementById("pubs").innerHTML +=
            "<tr><td>" +
            title +
            "</td><td>" +
            venue +
            "</td><td>" +
            year +
            "</td><td>" +
            type +
            "</td></tr>";
        }
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
