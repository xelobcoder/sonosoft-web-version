window.onload = (ev) => {
    let fullname = document.querySelector(".fullname");
    let transactionID = document.querySelector(".clientid");
    let location = document.querySelector("#pl");
    let yolk = document.querySelector("#ys");
    let ga = document.querySelector("#gsd");
    let edd = document.querySelector("#edd");
    let ovaries = document.querySelector("#ovaries");
    let adnexa = document.querySelector("#adnexa");
    let abnormalFindings = document.querySelector("#ab");
    let impression = document.querySelector("#impression");

    const submitButton = document.querySelector("#save");

    const clientInfo = {
        scan: "MSD",
        fullname: fullname.innerHTML.trim(),
        transactionid: transactionID.innerHTML.trim(),
        location: location.value,
        yolksac: yolk.value,
        ga: ga.value,
        edd: edd.value,
        ovaries: ovaries.value,
        adnexa: adnexa.value,
        abnormals: abnormalFindings.value,
        impression: impression.value
    }

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

    const exceedMark = function (log,target,message,exceed){
        if(typeof exceed === "number") {
            return parseInt(exceed);
        }

        target.onblur = function (ev) {
            console.log("eht")
            if(parseInt(ev.target.value )> exceed) {
              return log.innerHTML = message;
            }
        }
        console.log(target)
    }

    let  exceedMesssagebtn = document.querySelector(".sid-alert-message");
    let exceedMessage = "kindly not Gsd Exceeds normal value";
    
    exceedMark(exceedMesssagebtn,ga,exceedMessage,29);

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

    submitButton.onclick = function (ev) {
      

        console.log(clientInfo)
    }

    
       

}