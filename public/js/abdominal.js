window.onload = (ev) =>  {
    const liverSize = function() {
        let length = document.getElementById("liverlen");
        let width = document.getElementById("liverwidth");
        return {
            length: length.value + " cm",
            width : width.value + " cm"
        }
    }
    const spleenSize = async function() {
        let length = document.getElementById("spleenlen");
        let width = document.getElementById("spleenwidth");
        return {
            length: length.value + " cm",
            width : width.value + " cm"
        }
    }

    const getKidneySize = async function() {
        let rk= document.getElementById("rtkidneylen");
        let rkw = document.getElementById("rtkidneywidth");
        let lk = document.getElementById("ltkidneylen");
        let lkw = document.getElementById("ltkidneywidth");
        return  {
            left: {
                length : lk.value + " cm",
                width: lkw.value + " cm"
            },
            right:  {
                length: rk.value + " cm",
                width: rkw.value + " cm"
            }
        }
    }   

    let abdominalCavity = document.getElementById("cavity");
    let spleen = document.getElementById("spleen");
    let liver = document.getElementById("liver");
    let kidneys = document.getElementById("kidneys");
    let pancreas = document.getElementById("pancreas");
    let Ofindings = document.getElementById("ofindings");
    let impression = document.getElementById("impression");

    const postRequest = async function (url, method, data) {
        if (method === 'GET') {
          let api = await fetch(url)
          return api.json()
        } else {
          let api = await fetch(url, {
            method: method,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          })
    
          return api.json()
        }
      }

    let SCANDATA = async function () {
        return {
            abdominalCavity: abdominalCavity.value,
            spleen: spleen.value,
            liver: liver.value,
            kidneys : kidneys.value,
            pancreas : pancreas.value,
            ofindings : Ofindings.value,
            impression : impression.value
        }
    }


    const saveButton = document.getElementById("saveBtn");

    if(saveButton) {
        saveButton.addEventListener("click", (ev) => {
            
        })
    }

    
}