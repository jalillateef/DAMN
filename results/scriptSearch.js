document.addEventListener("DOMContentLoaded", function(){    
    let artistIDSJSON = localStorage.getItem("artistIDS")
    let artistIDS = JSON.parse(artistIDSJSON)
    console.log('test')
    console.log(artistIDS)
})