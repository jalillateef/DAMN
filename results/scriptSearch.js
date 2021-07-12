document.addEventListener("DOMContentLoaded", function(){    
    let artistsInfoJSON = localStorage.getItem("artistsInfo")
    let artistsInfo = JSON.parse(artistsInfoJSON)
    console.log(artistsInfo)
    const container = document.querySelector(".all-artist")
    artistsInfo.map((data) => {
        container.innerHTML = data.map((artist) => {
            const artistID = artist.id
            console.log(artistID)
            return `<div class='artist-container'>
                        <div class='artist-picture me-3'>
                        <img src="pictures/damn-placeholder.png" alt="..." class="img-thumbnail">
                    </div>
                    <div class="card">
                        <div class="card-body">
                        <h1 class='artist-text'>${artist.name}</h1>
                        <p class='artist-info'>Information</p>
                    </div>
                </div>
            </div>`
        }).join("")
    })
})