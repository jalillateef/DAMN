console.log('anything')

    const query=new URLSearchParams(window.location.search)
    // console.log(query.get('artist'))
    const artistID = query.get('artist')
    fetch (`https://musicbrainz.org/ws/2/artist/${artistID}?inc=url-rels+releases+works&fmt=json`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })