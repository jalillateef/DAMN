//variable 
const search = document.querySelector("#searchbar")
const body = document.querySelector('body')
// console.log(search)

// * an event listener for a submit within the main page
body.addEventListener('submit', function(e) {
    e.preventDefault()
    // console.log('test')
    const searchString = search.value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    // console.log(`http://musicbrainz.org/ws/2/artist/?query=artist:${urlEncodedSearchString}`)
    fetch (`http://musicbrainz.org/ws/2/artist/?query=artist:${urlEncodedSearchString}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        const artistName = data
        console.log(artistName)
    })
})