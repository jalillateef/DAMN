//variable 
const search = document.querySelector("#searchbar")
const body = document.querySelector('body')

// * an event listener for a submit within the main page
body.addEventListener('submit', function(e) {
    e.preventDefault()
    const searchString = search.value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    fetch (`http://musicbrainz.org/ws/2/artist/?fmt=json&query=artist:${urlEncodedSearchString}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        // console.log('script', data)
        const allArtist = data.artists
        // console.log(allArtist)    
        localStorage.removeItem('artistsInfo');
        const artistsInfoJSON = JSON.stringify(allArtist)
        localStorage.setItem("artistsInfo", artistsInfoJSON)
    })
    .then(() => {
        window.location.href = ("../results/searchResult.html")
    })
})
