// console.log('anything')
const container = document.getElementById('artistContent')
const events = document.querySelector('.events')

const query = new URLSearchParams(window.location.search)
const artistID = (query.get('artist'))
const urlEncodedSearchString = encodeURIComponent(artistID)

let artistName = ''

fetch(`https://musicbrainz.org/ws/2/artist/${artistID}?inc=url-rels+releases+works&fmt=json`)
.then((res) => {
    return res.json()
})
.then((mbdata) => {
    artistName = mbdata.name
    const urlEncodedArtist = encodeURIComponent(artistName)
    fetch(`https://rest.bandsintown.com/artists/${urlEncodedArtist}?app_id=0c3d7989425512a2b6dea2004f6cdd51`)
    .then((res) => {
        return res.json()
    })
    .then((bitdata) => {
        const urlEncodedEvents = encodeURIComponent(artistName)
        fetch(`https://rest.bandsintown.com/artists/${urlEncodedEvents}/events?app_id=0c3d7989425512a2b6dea2004f6cdd51`)
        .then((res) => {
            return res.json()
        })
        .then((mbedata) => {
            // console.log(mbdata)
            // console.log(bitdata)
            // console.log(mbedata)
            // console.log(container)
            // Event html 
            const eventhtml = mbedata.map((artistEvent) => {
                // console.log(artistEvent.title)
                return (`
        <div>
            <h1 class = 'ticketinfo'>Ticket Info</h1>
        </div>
            <p class= 'eventtime' >${artistEvent.venue.name}</p>
            <p class= 'eventtime' >${artistEvent.datetime}</p>
            <p class= 'eventtime' >${artistEvent.venue.location}</p>
            <div class= 'tickets'>
                <a href='${artistEvent.url}'><button class= 'ticketbutton rounded-3'>Tickets Here</button></a>
        </div>`)
            }).join('');

            fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${urlEncodedArtist}`)
                .then ((res) => {
                    return res.json()
                })
                .then ((adb) => {

                    fetch(`https://cors--bypass.herokuapp.com/https://api.deezer.com/search/artist?q=${artistName}`)
                    .then((res) => {
                        return res.json()
                    })
                    .then((deezerArtistData) => {
                        const adbdata = adb.artists[0]
                        const artistId = deezerArtistData.data[0].id

                        console.log(deezerArtistData.data)

                        fetch(`https://cors--bypass.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`)
                        .then((res) => {
                            return res.json()
                        })
                        .then((deezerAlbumData) => {
                            console.log("deezerAlbumData: ", deezerAlbumData);

                            let albums = deezerAlbumData.data.map((album) => {
                                // console.log(artistEvent.title)
                                return (`
                                    <div class='albumcontent outline'>
                                        <p class = 'eventtime'>${album.title}</p>
                                        <img src=${album.cover_small} class='eventtime'>
                                    </div>
                                `)
                            }).join('')
                            // Artist html //
                            container.innerHTML = `
                            <div class='row'>
                                <div class ='col-4'>
                                    <img src="${bitdata.image_url}" alt="..." class="img-thumbnail">
                                    <h1 class='header1'><b>Artist Name:</b> ${mbdata.name} </h1>
                                    ${mbdata['begin-area'] ? `<h1 class="header1"><b>Artist Hometown:</b> ${mbdata['begin-area']['sort-name']}</h1>` : ""}
                                    <h1 class='header1'><b>Artist Birth:</b> ${mbdata['life-span'].begin} </h1>
                                    <div class="card">
                                    <div class="card-body">
                                    ${eventhtml}
                                    </div>
                                    </div>
                                </div>
                                <div class="col-7 mt-0 mb-auto">
                                    <p class = 'biography outline rounded'>${adbdata.strBiographyEN}</p>
                                    <div>
                                        <h1 class='albumtitle'>Albums</h1>
                                    </div>
                                    ${albums}
                                </div>
                            </div>
                            <div class= 'artist-bio'>
                            </div>
                            <div class="card-body">
                                    <div class="events"> 
                        </div>
                                </div>
                            `
                            // console.log(deezerdata.data)
                        })
                    })
                })
            })
        })
    })