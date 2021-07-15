let artistsInfoJSON = localStorage.getItem("artistsInfo")
let artistsInfo = JSON.parse(artistsInfoJSON)
const container = document.querySelector(".all-artist")

artistNameArray = []
artistsInfo.forEach((artist) => {
    // console.log(artist)
    const artistName = artist.name
    artistNameArray.push(artistName)
    const artistNameJSON = JSON.stringify(artistNameArray)
    localStorage.setItem('artistName', artistNameJSON)
    const urlEncodedArtistName = encodeURIComponent(artistName)
    fetch (`https://rest.bandsintown.com/artists/${urlEncodedArtistName}?app_id=0c3d7989425512a2b6dea2004f6cdd51`)
        .then((res) => {
            return res.json()
        }) 
        .then((data) => {
            // console.log(data)
            // const artistPic = data['thumb_url']
            // console.log(artistPic)
            // ? if empty or error, it stops/returns
            if (data.error) {
                return  
            } 
            const beginLife = artist['life-span'].begin
            console.log(beginLife)
            let birthday = new Date(beginLife)
            const year = birthday.getFullYear()
            const day = birthday.getDay()
            const month = birthday.getMonth()
            console.log(month, day, year)
            container.innerHTML += `<div class='artist-container'>
                            <div class='artist-picture me-3'>
                                ${data.image_url !== 'https://photos.bandsintown.com/artistLarge.jpg' ? `
                                <img src="${data['image_url']}" alt="record.gif" class="img-thumbnail">`: 
                                `<img src="./pictures/record.gif" alt="record.gif" class="img-thumbnail">`}
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h1 class='artist-text'>${artist.name}</h1>
                                    <div class='artist-life'>
                                    <div>
                                    ${artist['life-span'].begin ?`<h6 class="header6">${month}~${day}~${year}</h6>` :""}
                                    </div>
                                    <div>
                                    ${artist['begin-area'] ?`<h6 class="header6">${artist['begin-area']['sort-name']}</h6>` :""}
                                    </div>
                                    </div>
                                    <div class='button'>
                                        <button type="button" class="favorites-button btn btn-outline-danger" data-id = "${artist.id}" data-name = "${artist.name}" data-img = "${data.image_url}" >Add To Favorites</button>
                                        ${artist.id ? `
                                        <a href='../artist/artist.html?artist=${artist.id}'  class="moreinfo-button btn btn-outline-danger">More Info</a>
                                        `: ''}
                                    </div>
                                </div>
                            </div>
                        </div>`
    // ! this is an inline IF statement, it'll check if (left of the question mark) exist, to the right of the question mark its a true and false, if the statement return true, it'll do the true part (between the semicolon and question mark), if false it'll do false part (after the semicolon)
        })
})
favArtistInfoArray = []
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("favorites-button")){
        if(e.target.innerHTML == "Add To Favorites") {
            e.target.innerHTML="Added";
            const id = e.target.dataset.id
            const name = e.target.dataset.name
            const image = e.target.dataset.img
            console.log(id, name, image)
            // favArtistInfoArray = []
            favArtistInfoArray.push({id, name, image})
            const favArtistsInfoJSON = JSON.stringify(favArtistInfoArray)
            localStorage.setItem("favArtistsInfo", favArtistsInfoJSON)
        }else {
            e.target.innerHTML = "Add To Favorites";
        }
    }
    }
)   


