window.onload = (ev) => {
    let fullname = document.querySelector("#fullname");
    let transactionID = document.querySelector("#clientid");
    let location = document.querySelector("#pl");
    let yolk = document.querySelector("#ys");
    let ga = document.querySelector("#gsd");
    let edd = document.querySelector("#edd");
    let ovaries = document.querySelector("#ovaries");
    let adnexa = document.querySelector("#adnexa");
    let abnormalFindings = document.querySelector("#ab");
    let impression = document.querySelector("#impression");

    const submitButton = document.querySelector("#save");

    submitButton.onclick = function(ev){
        const clientInfo = {
            scan: "MSD",
            fullname: fullname.value,
            transactionid: transactionID.value,
            location : location.value,
            yolksac: yolk.value,
            ga: ga.value,
            edd: edd.value,
            ovaries : ovaries.value,
            adnexa : adnexa.value,
            abnormals: abnormalFindings.value,
            impression : impression.value
        }

        let response = function(){
            for(let i in clientInfo){
                if(clientInfo[i] === "" ){
                    return false;
                }
            }
            return true;
        }

        
        if(response) {
            fetch("http://localhost:8000/scanpanels/scan",{
               method: "POST",
               headers: {"content-type" : "application/json"},
               body: JSON.stringify(clientInfo)   
            })
            .then ( (res) => { return res.json()})
            .then ( (res) => {
                console.log(res);
            })
            .catch ( (err) => { if(err) throw err;})
        }
    }

}