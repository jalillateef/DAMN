
let artistsInfoJSON = localStorage.getItem("artistsInfo")
let artistsInfo = JSON.parse(artistsInfoJSON)
// console.log(artistsInfo)
const container = document.querySelector(".all-artist")

artistNameArray = []
container.innerHTML = artistsInfo.map((artist) => {
    // console.log(artist)
    const artistName = artist.name
    artistNameArray.push(artistName)
    const artistNameJSON = JSON.stringify(artistNameArray)
    localStorage.setItem('artistName', artistNameJSON)
    const urlEncodedArtistName = encodeURIComponent(artistName)
    // console.log(urlEncodedArtistName)
    fetch (`https://rest.bandsintown.com/artists/${urlEncodedArtistName}?app_id=0c3d7989425512a2b6dea2004f6cdd51`)
        .then((res) => {
            return res.json()
        }) 
        .then((data) => {
            // console.log(data)
        })
    // ! this is an inline IF statement, it'll check if (left of the question mark) exist, to the right of the question mark its a true and false, if the statement return true, it'll do the true part (between the semicolon and question mark), if false it'll do false part (after the semicolon)
    return `<div class='artist-container'>
                    <div class='artist-picture me-3'>
                        <img src="pictures/damn-placeholder.png" alt="..." class="img-thumbnail">
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h1 class='artist-text'>${artist.name}</h1>
                            <div class='artist-life'>
                            ${artist['life-span'].begin ?`<h6 class="header6">${artist['life-span'].begin}</h6>` :""}
                            ${artist['begin-area'] ?`<h6 class="header6">${artist['begin-area']['sort-name']}</h6>` :""}
                            </div>
                            <div class='button'>
                                <button type="button" class="favorites-button btn btn-outline-danger">Favorites</button>
                                ${artist.id ? `
                                <a href='../artist/artist.html?artist=${artist.id}' class="moreinfo-button btn btn-outline-danger">More Info</a>
                                `: ''}
                            </div>
                        </div>
                    </div>
                </div>`
}).join("")

