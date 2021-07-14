console.log('anything')
const container = document.getElementById('artistContent')

    const query=new URLSearchParams(window.location.search)
    const artistID = (query.get('artist'))
    const urlEncodedSearchString = encodeURIComponent(artistID)
    fetch (`https://musicbrainz.org/ws/2/artist/${artistID}?inc=url-rels+releases+works&fmt=json`)
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
            console.log(mbdata)
            // console.log(bitdata)
            // console.log(container)
            container.innerHTML =
                ( `<img src="${bitdata.image_url}" alt="..." class="img-thumbnail">
                <h1 class='header1'><b>Artist Name:</b> ${mbdata.name} </h1>
                <h1 class='header1'><b>Artist Hometown:</b> ${mbdata['begin-area'].name} </h1>
                <h1 class='header1'><b>Artist Birth:</b> ${mbdata['life-span'].begin} </h1>
                <h1 class='header1'><b>Artist Genre:</b> Genre Here </h1>
                <h2 class= 'header2'>More general information.</h2>`)
        })
        // console.log(data.name)
        // console.log(container)
        // container.innerHTML =
        //     ( `<img src="./pictures/record.gif" alt="..." class="img-thumbnail">
        //     <h1 class='header1'><b>Artist Name:</b> ${data.name} </h1>
        //     <h1 class='header1'><b>Artist Hometown:</b> ${data.begin_area.name} </h1>
        //     <h1 class='header1'><b>Artist Birth:</b> ${data['life-span'].begin} </h1>
        //     <h1 class='header1'><b>Artist Genre:</b> Genre Here </h1>
        //     <h2 class= 'header2'>More general information.</h2>`)
    })