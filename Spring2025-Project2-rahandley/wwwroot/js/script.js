$(document).ready(function () {
    $("#searchBtn").click(function () {
        let query = $("#query").val();
        let encoded = encodeURIComponent(query);
        
        fetch(`https://google.serper.dev/search?q=${encoded}&apiKey=6a9fca4a83390c2cdd4c17d585e91cfefd3bab9e`)
            .then(response => response.json())
            .then(data => {
                
                $("#searchResults").show();
                $("#searchResults").html("");
                
                if (data.knowledgeGraph) {
                    $("#searchResults").append(`
                    <h2>Knowledge Graph</h2>
                    <p><strong>${data.knowledgeGraph.title}</strong></p>
                    <p>${data.knowledgeGraph.description || ""}</p>
                    `);
                }

                $("#searchResults").append("<h2>Results</h2>");
                
                data.organic.forEach(result => {
                    $("#searchResults").append(`
                    <p>
                    <a href="${result.link}" target="_blank">
                    ${result.title}
                    </a><br>
                    ${result.snippet}
                    </p>`
                    );
                });
                
                if (data.peopleAlsoAsk) {
                    $("#searchResults").append("<h2>People Also Ask</h2>");
                    
                    data.peopleAlsoAsk.forEach(question => {
                        $("#searchResults").append(`
                        <p><strong>${question.question}</strong></p>`);
                    });
                }
                
                if (data.relatedSearches) {
                    $("#searchResults").append("<h2>Related Searches</h2>");
                    
                    data.relatedSearches.forEach(search => {
                        $("#searchResults").append(`<p>${search.query}</p>`);
                    });
                }
            });
    });

    $("#luckyBtn").click(function () {

        let query = $("#query").val();
        let encoded = encodeURIComponent(query);

        fetch(`https://google.serper.dev/search?q=${encoded}&apiKey=6a9fca4a83390c2cdd4c17d585e91cfefd3bab9e`)
            .then(response => response.json())
            .then(data => {

                if (data.organic && data.organic.length > 0) {
                    for (let result of data.organic) {
                        if (result.link) {
                            window.location.href = result.link;
                            return;
                        }
                    }
                }

                alert("Invalid result.");

            });

    });

    let images = [
        "images/bg1.jpg",
        "images/bg2.jpg",
        "images/bg3.jpg"
    ];

    let index = 0;

    $("#title").click(function () {
        index = (index + 1) % images.length;
        $("body").css("background-image", `url(${images[index]})`);
    });

    $("#timeBtn").click(function () {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let time = hours + ":" + minutes;

        $("#time").text(time);
        $("#time").show();
        $("#time").dialog();
    });

    $("#query").keypress(function(e) {
        if (e.which === 13) {
            $("#searchBtn").click();
        }
    });
});