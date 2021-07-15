
let favArtistsInfoJSON = localStorage.getItem("favArtistsInfo")
let favArtistsInfo = JSON.parse(favArtistsInfoJSON)


const row = document.querySelector(".row")
row.innerHTML = favArtistsInfo.map((artist) => {
    console.log(artist)
    return `<div class="col-sm-6">
    <div class="card" style="width: 18rem;">

    <a href="../artist/artist.html"> <img src="${artist.image}" class="card-img-top" alt="...">
        <div class="card-body">

        </div>
    </div>
</div>`
}) .join("")

