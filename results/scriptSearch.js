
let artistsInfoJSON = localStorage.getItem("artistsInfo")
let artistsInfo = JSON.parse(artistsInfoJSON)
// console.log(artistsInfo)
const container = document.querySelector(".all-artist")

container.innerHTML = artistsInfo.map((artist) => {
    const artistID = artist.id
    // ! this is an inline IF statement, it'll check if (left of the question mark) exist, to the right of the question mark its a true and false, if the statement return true, it'll do the true part (between the semicolon and question mark), if false it'll do false part (after the semicolon)
    return `<div class='artist-container'>
                    <div class='artist-picture me-3'>
                        <img src="pictures/damn-placeholder.png" alt="..." class="img-thumbnail">
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h1 class='artist-text'>${artist.name}</h1>
                            <div class='artist-life'>
                            ${artist['life-span'].begin ?`<h6>${artist['life-span'].begin}</h6>` :""}
                            ${artist['begin-area'] ?`<h6>${artist['begin-area']['sort-name']}</h6>` :""}
                            </div>
                            <p class='artist-info'>Information</p>
                        </div>
                    </div>
                </div>`
}).join("")

