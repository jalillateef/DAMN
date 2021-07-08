//variable 
const search = document.querySelector("#searchbar")
const body = document.querySelector('body')
// console.log(search)

// * an event listener for a submit within the main page
body.addEventListener('submit', function(e) {
    e.preventDefault()
    // console.log('test')
    const input = search.value
    // console.log(input)
})