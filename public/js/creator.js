const saveI = document.getElementById("save-institution");
saveI.onclick = function(ev){
    const input = document.getElementById("institution");
    if(input.value === ""){
        ev.preventDefault();
    }
    fetch("http://localhost:8000/INSTITUTIONS",{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            institution : input.value
        })
    })
    .then( (response) => {
        let received = response.json();
        return received;
    })
    .then( (response)=>{
        console.log(response)
    })
    .catch( (err)=> {
        if(err) throw err;
    })
}
