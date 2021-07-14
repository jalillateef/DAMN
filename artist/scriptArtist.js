// console.log('anything')
const container = document.getElementById('artistContent')
const events = document.querySelector('.events')

const query = new URLSearchParams(window.location.search)
const artistID = (query.get('artist'))
const urlEncodedSearchString = encodeURIComponent(artistID)
fetch(`https://musicbrainz.org/ws/2/artist/${artistID}?inc=url-rels+releases+works&fmt=json`)
    .then((res) => {
        return res.json()
    })
    .then((mbdata) => {
        const artistName = mbdata.name
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
                    <p class= 'eventtime' >${artistEvent.venue.name}</p>
                    <p class= 'eventtime' >${artistEvent.datetime}</p>
                    <p class= 'eventtime' >${artistEvent.venue.location}</p>
                    <div class= 'tickets'>
                        <a href='${artistEvent.url}'><button class= 'ticketbutton rounded-3'>Tickets Here</button></a>
                    </div>`)
                        }).join('')

                        fetch (`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${urlEncodedArtist}`)
                            .then ((res) => {
                                return res.json()
                            })
                            .then ((adb) => {
                                const adbdata = adb.artists[0]
                                // console.log(adbdata)
                                // Artist html //
                                container.innerHTML = `<img src="${bitdata.image_url}" alt="..." class="img-thumbnail">
                                <h1 class='header1'><b>Artist Name:</b> ${mbdata.name} </h1>
                                ${mbdata['begin-area'] ? `<h1 class="header1"><b>Artist Hometown:</b> ${mbdata['begin-area']['sort-name']}</h1>` : ""}
                                <h1 class='header1'><b>Artist Birth:</b> ${mbdata['life-span'].begin} </h1>
                                <div>
                                    <p>${adbdata.strBiographyEN}</p>
                                </div>
                                <div class="card-body">
                                        <div class="events"> 
                            <div class="card">
                                <div class="card-body">
                                ${eventhtml}
                                </div>
                                </div>
                            </div>
                                    </div>
                                `
                            })


                            })
                    })
            })
