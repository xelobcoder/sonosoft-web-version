window.onload = (ev) => {
  let fullname = document.querySelector('.fullname')
  let transactionID = document.querySelector('.clientid')
  let location = document.querySelector('#pl')
  let yolk = document.querySelector('#ys')
  let ga = document.querySelector('#gsd')
  let weeks = document.querySelector('#weeks')
  let days = document.querySelector('#days')
  let edd = document.querySelector('#edd')
  let ovaries = document.querySelector('#ovaries')
  let adnexa = document.querySelector('#adnexa')
  let abnormalFindings = document.querySelector('#ab')
  let impression = document.querySelector('#impression')

  let form = document.querySelector("#msd-form");
  //  INSERT TRANSACTIONAL IDS OF WPRKED CASES
  const insertID = (response) => {
    let parent = document.getElementById('look')
    let html = response
      .map((p) => {
        return `<li id="lookbae" uuid = ${p['TRANSACTIONID']}>${p['TRANSACTIONID']}</li>`
      })
      .join('')

    return (parent.innerHTML = html)
  }


  const submitButton = document.querySelector('#save')

  const lightRed = function (target) {
    target.classList.add('lightred')
    target.setAttribute('placeholder', 'required')
    target.style.color = 'red'
  }

  const normallize = function (target) {
    target.classList.remove('lightred')
    target.removeAttribute('placeholder')
    target.style.color = 'black'
  }

  const textInputAction = function (target) {
    if (target.value === '' || target.value === undefined) {
      lightRed(target)
    } else {
      normallize(target)
    }
  }

  let exceedMesssagebtn = document.querySelector('.sid-alert-message')

  const textareas = document.querySelectorAll('textarea')
  const inputs = document.querySelectorAll('input')

  const isEmpty = function () {
    if (textareas) {
      for (let i = 0; i < textareas.length; i++) {
        textareas[i].onblur = function () {
          textInputAction(textareas[i])
        }
        textareas[i].onfocus = function () {
          normallize(textareas[i])
        }
      }
      if(inputs){
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].blur = function () {
            textInputAction(inputs[i])
          }
          inputs[i].onfocus = function () {
            normallize(inputs[i])
          }
        }
      }
    }
  }

  isEmpty()
  
 
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
  // clear all fields of form
  const resetform = function () {
    let form = document.querySelector('#msd-form')
    return form.reset()
  }
  //  display notice 
  const displayNotice = function (target, message) {
    let search  = document.querySelector(".search");
    let list = document.querySelector(".group-list");
    let parent = target.parentElement;
    let css = target.parentElement.getAttribute("class");
    if(css) {
      if(css.includes("d-none")) {
        parent.classList.remove("d-none");
        parent.classList.add("d-block");
        list.style.display = "none";
        search.style.display = "none";
      } 
    }
    target.innerHTML += message;
    setTimeout(function () {
      target.innerHTML = '';
       parent.classList.remove("d-block");
        parent.classList.add("d-none");
        list.style.display = "block";
        search.style.display = "block";

    }, 6000)
  }
  
  // populate input field on clicked transactionid response data
  const inputFill = async function (data) {
    const {
      TRANSACTIONID,
      PROGRESSREF,
      OVARIES,
      ABNORMAL_FINDINGS,
      GA,
      GSD,
      EDD,
      DATE,
      WEEKS,
      DAYS,
      LOCATION,
      ADNEXA,
      YOLKSAC,
      ID,
      IMPRESSION
    } = data;

    transactionID.innerHTML = TRANSACTIONID;
    location.value = LOCATION;
    weeks.value = WEEKS;
    days.value = DAYS;
    edd.value = EDD;
    ovaries.value = OVARIES;
    adnexa.value = ADNEXA;
    abnormalFindings.value = ABNORMAL_FINDINGS;
    impression.value = IMPRESSION;
    yolk.value = YOLKSAC;
    ga.value = GA;

  }
  // listen to click event of transaction ids and return data from database table
  // click event for each li of userid to fetch data and populate input field
  var TransactionIDevent = async function () {
    let li = document.querySelectorAll("#lookbae");
    if(li) {
      for(let i = 0; i < li.length; i++) {
        li[i].onclick = function(ev) {
          const requestData = {
            scan: "MSD",
            transactionID : ev.target.getAttribute("uuid")
          }
          console.log(requestData.transactionID)
           postRequest("http://localhost:8000/prefill","POST",requestData)
           .then ( (response) => {
               inputFill(response[0]);
              //  set the state of form to update
              form.setAttribute("state","update");
           }).catch ((err) => {throw err});
        }
      }
    }

  }


 

  const workedCases = async function () {
 
    postRequest('http://localhost:8000/workedcases/:msd', 'GET')
      .then((response) => {
        insertID(response);
        TransactionIDevent();
      })
      .catch((err) => {
        throw err
      })
  }

  workedCases()

   // this would hide the transactional ids momentarily and display alert log usind display function;

  const  alertActionlog = async function( data) {
    let danger = document.querySelectorAll(".sid-alert-message")[0];
    let info = document.querySelectorAll(".sid-alert-message")[1];

    const {message,action} = data;

    console.log(data)

     displayNotice(danger,message);
     displayNotice(info,action);
  }
    
    // filter transactionID 

    const searchID = document.querySelector("#searchid");
      if(searchID) {
        const filterTransactionID = function(data) {
          postRequest("http://localhost:8000/api/filterid","POST",data)
          .then( (response) => {
             if(response.length === 0) {
               return ;
             } else {
                insertID(response)
             }
          }).catch ((err) =>  {
             throw err;
          })
       }
   
       searchID.addEventListener("keyup" ,function(ev) {
        let parent = document.getElementById('look');
        parent.innerHTML = "" ;
         const transactionID = ev.target.value;
         if(transactionID != "") {
          const table = "MSD";
          const data = {transactionID,tablename: table};
          filterTransactionID(data);
         } else {
          //  called if search field is empty;
          // poplulate area with worked cases ID
           workedCases()
         }
       })
      }
  //  end

  submitButton.onclick = function (ev) {
    
  let STATE = form.getAttribute("state");

    const clientInfo = {
      scan: 'MSD',
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
      impression: impression.value,
      state: "newEntry"
    }
    
    if(STATE === "new") {
       postRequest('http://localhost:8000/scanpanels/scan', 'POST', clientInfo)
      .then((response) => {
        if(response) {
           if(response.hasOwnProperty("message")) {
             if (response['message'] === 'insertion successful') {
            resetform();
            displayNotice(exceedMesssagebtn, response['message']);
            workedCases();
          } else {
            alertActionlog(response);
          }
           }
        }
      })
      .catch((err) => {
        throw err
      })
    } else {
      clientInfo["state"] = "update";
      postRequest("http://localhost:8000/scanpanels/scan","PUT",clientInfo)
      .then( (response) => {
        if(response) {
           console.log(response)
        }
      })
    }
  }

  const presetButton = document.querySelector("#presetbtn");
  const deleteButton = document.querySelector("#deletebtn");
  if(presetButton) {
    const title = document.querySelector("#title-preset");
    const location = document.querySelector("#location-preset");
    const yolksac = document.querySelector("#yolk-preset");
    const ovaries = document.querySelector("#ovaries-preset");
    const adnexa = document.querySelector("#adnexa-preset");
    const abnormals = document.querySelector("#abnormal-preset");
    const impression = document.querySelector("#impression-preset");
    const save = document.querySelector("#savepreset");
    presetButton.onclick = (ev) => {
       const presetFields = document.querySelector("#msd-preset");
       const preseted = document.querySelector(".sid-wrapper > .list-group");
       let parent = presetFields.parentElement;
       parent.classList.toggle("d-none");
       preseted.classList.toggle("d-none");
       const presetInfo = async function(object) {
         let m = document.querySelector("#pm");
         let t = document.querySelector("#pt");
         let area = document.querySelector("#preset-message");
            if(object.hasOwnProperty("message")){
              area.classList.remove("d-none");
               let message = object["message"];
               let tip = object["tip"];
               m.innerHTML += message;
               t.innerHTML += tip;
               setTimeout( () =>{
                area.classList.add("d-none");
                m.innerHTML = "message: ";
                t.innerHTML = "tip: ";
              },4000)
            
            }
       }
       if(save) {
          save.onclick = (ev) => {
            const data = {
              scantype: "MSD",
              title: title.value,
              location : location.value,
              yolksac : yolksac.value,
              ovaries : ovaries.value,
              adnexa : adnexa.value,
              abnormals : abnormals.value,
              impression : impression.value
            }

            postRequest("http://localhost:8000/api/preset","POST",data)
            .then( (res) =>  {
              console.log(res)
               presetInfo(res); 
            }).catch ( (e) => {console.log(e)})
           
           }

       }
    }
  }
}

