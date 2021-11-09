window.onload = (ev) => {
    let fullname = document.querySelector(".fullname");
    let transactionID = document.querySelector(".clientid");
    let location = document.querySelector("#pl");
    let yolk = document.querySelector("#ys");
    let ga = document.querySelector("#gsd");
    let weeks = document.querySelector("#weeks");
    let days = document.querySelector("#days");
    let edd = document.querySelector("#edd");
    let ovaries = document.querySelector("#ovaries");
    let adnexa = document.querySelector("#adnexa");
    let abnormalFindings = document.querySelector("#ab");
    let impression = document.querySelector("#impression");

    const submitButton = document.querySelector("#save");

    
    const lightRed = function (target) {
        target.classList.add("lightred");
        target.setAttribute("placeholder" ,"required");
        target.style.color = "red";
    }

    const normallize = function(target) {
        target.classList.remove("lightred");
        target.removeAttribute("placeholder");
        target.style.color = "black";
    }

    const textInputAction = function (target) {
        if(target.value === "" || target.value === undefined) {
            lightRed(target)
        } else {
           normallize(target)
        }
    }

   

    let  exceedMesssagebtn = document.querySelector(".sid-alert-message");


    const textareas = document.querySelectorAll("textarea");
    const inputs = document.querySelectorAll("input");
    
    const isEmpty = function () {
       if(textareas) {
           for(let i = 0; i < textareas.length;i++) {
               textareas[i].onblur = function () {
                  textInputAction(textareas[i])
               }
               textareas[i].onfocus = function() {
                   normallize(textareas[i])
               }
           }

           for (let i = 0; i < inputs.length; i++) {
               inputs[i].blur = function () {
                  textInputAction(inputs[i]);
               }
               inputs[i].onfocus = function() {
                normallize(inputs[i])
            }
           }
       }
    }

    isEmpty()


    const postRequest = async function (url,method,data) {
       let api = await fetch(url,{
            method : method,
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(data)
        })

        return api.json();
    }

    const resetform = function () {
        let form = document.querySelector("#msd-form");
       return form.reset();
    }

    const displayNotice = function (target,message){
       target.innerHTML = message;
        setTimeout( function() {
            target.innerHTML = "";
            target.parentElement.style.display ="none";
        },3000)
    }

    const workedCases = async function () {
        
    }
    submitButton.onclick = function (ev) {
        const clientInfo = {
            scan: "MSD",
            fullname: fullname.innerHTML.trim(),
            id: transactionID.innerHTML.trim(),
            location: location.value,
            yolksac: yolk.value,
            ga: ga.value,
            edd: edd.value,
            ovaries: ovaries.value,
            weeks: weeks.value,
            days: days.value,
            adnexa: adnexa.value,
            abnormals: abnormalFindings.value,
            impression: impression.value
        }
    
       postRequest("http://localhost:8000/scanpanels/scan","POST",clientInfo)
       .then ( (response) => {
           if(response.hasOwnProperty("message")){
               if(response["message"] === "insertion successful"){
                  resetform();  
                  displayNotice(exceedMesssagebtn,response["message"]);
               } 
           } else {
               return;
           }
       }).catch( (err) => {throw err});
    }

    
       

}