//variable 
const search = document.querySelector("#searchbar")
const body = document.querySelector('body')
// console.log(search)

// * an event listener for a submit within the main page
body.addEventListener('submit', function(e) {
    e.preventDefault()
    // window.location.href("../results/searchResult.html")
    window.open("../results/searchResult.html")
    // console.log('test')
    const searchString = search.value
    export {searchString}
    const urlEncodedSearchString = encodeURIComponent(searchString)
    // console.log(`http://musicbrainz.org/ws/2/artist/?query=artist:${urlEncodedSearchString}`)
    fetch (`http://musicbrainz.org/ws/2/artist/?fmt=json&query=artist:${urlEncodedSearchString}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        const allArtist = data.artists
        // console.log(allArtist)
        // this map allows me to get a specification for all artist that return
        // can use this map to grab all artist id, basic info
        allArtist.map((artist) => {
            const artistID = artist.id
            // console.log(artistID)
        })
    })
})