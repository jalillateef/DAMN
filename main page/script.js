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
        const allArtist = data.artists
        console.log(allArtist)    
        const artistsInfo = []
        localStorage.clear(artistsInfo);
        artistsInfo.push(allArtist)
        const artistsInfoJSON = JSON.stringify(artistsInfo)
        localStorage.setItem("artistsInfo", artistsInfoJSON)
        // ! this was the original mapping of the data, removed and moved to scriptSearch.js because it would be more convinient to hold all data in the sessions storage
        // allArtist.map((artist) => {
        //     const artistID = artist.id
        //     artistIDS.push(artistID)
        //     artistIDSJSON = JSON.stringify(artistIDS)
        //     localStorage.setItem("artistIDS", artistIDSJSON)
        // })
    })
    // window.location.href = ("../results/searchResult.html")
})