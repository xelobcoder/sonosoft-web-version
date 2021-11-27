window.onload = (ev) =>  {
    const liverSize = function() {
        let length = document.getElementById("liverlen");
        let width = document.getElementById("liverwidth");
        return {
            length: length.value + " cm",
            width : width.value + " cm"
        }
    }
    const spleenSize = function() {
        let length = document.getElementById("spleenlen");
        let width = document.getElementById("spleenwidth");
        return {
            length: length.value + " cm",
            width : width.value + " cm"
        }
    }

    const getKidneySize = function() {
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
    const transactionalID = document.getElementById("clientid").value;

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

    let SCANDATA = function () {
        return {
            transactionalID,
            scan: "ABDOMINAL",
            abdominalCavity: abdominalCavity.value,
            spleen: spleen.value,
            liver: liver.value,
            kidneys : kidneys.value,
            pancreas : pancreas.value,
            ofindings : Ofindings.value,
            impression : impression.value,
            right_kidney:  getKidneySize().right.length + "x" + getKidneySize().right.width,
            left_kidney: getKidneySize().left.length + "x" + getKidneySize().left.width,
            spleen_size: spleenSize().length + " x " + spleenSize().width,
            liver_size : liverSize().length + " x " + liverSize().width
        }
    }
    // redify all empty textarea
    const allTextarea = document.querySelectorAll("textarea");

    const redify = async function() {
        for(let i = 0; i < allTextarea.length; i++) {
            console.log(allTextarea[i])
            if(allTextarea[i].value == " "){
                allTextarea[i].classList.add("border-primary");
                allTextarea[i].style.placeholder = "Required";
                allTextarea[i].style.color = "red";
            }
        }
    }

    // save button
    const saveButton = document.getElementById("saveBtn");

    // onclick event

    saveButton.onclick = function (ev) {
       let results = SCANDATA();
       console.log(results)
       for (const [key,value] of Object.entries(results)) {
           if(value == " ") {
               console.log(key + ":" + value);
               redify()
           } else {
               postRequest("http://localhost:8000/scanpanels/scan","POST",results)
               .then(response =>  {
                   console.log(response);
               }).catch ( err => {throw err;})
           }
       }

    }
 
}