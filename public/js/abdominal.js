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
            right_kidney:  getKidneySize().right.length + " x " + getKidneySize().right.width,
            left_kidney: getKidneySize().left.length + " x " + getKidneySize().left.width,
            spleen_size: spleenSize().length + " x " + spleenSize().width,
            liver_size : liverSize().length + " x " + liverSize().width
        }
    }
    // redify all empty textarea
    const allTextarea = document.querySelectorAll("textarea");

    const redify = async function() {
        for(let i = 0; i < allTextarea.length; i++) {
            if(allTextarea[i].value == " "){
                allTextarea[i].classList.add("border-primary");
                allTextarea[i].style.placeholder = "Required";
                allTextarea[i].style.color = "red";
            }
        }
    }

    // reset any form 

    const resetForm  = function (t) {
        let form= document.querySelector(t);
        form.reset();
    }

    // success message after saving

    const successMessage = async (m) => {
        const valid = m != " " ? true: new Error(`${m} is invalid message`);
        let t = document.querySelector("#m-a-top");
        let s = document.querySelector("#m-a-show");
        t.classList.remove("d-none");
        t.classList.add("d-block");
        s.classList.add("alert-success");
        s.innerHTML = m;
        setTimeout( () => {
            t.classList.remove("d-block");
            t.classList.add("d-none");
        },4000)
    }

    // save button
    const saveButton = document.getElementById("saveBtn");

    // onclick event

    saveButton.onclick = function (ev) {
       let results = SCANDATA();
       if(impression.value == " " || liver.value == " " || spleen.value == " " || kidneys.value == " " || abdominalCavity.value == " "|| pancreas.value == " ") {
           redify()
       } else {
           let form = document.getElementById("abdominalform");
           let state = form.getAttribute("state");
           if(state == "new") {
            postRequest("http://localhost:8000/scanpanels/scan","POST",results)
            .then(response =>  {
                if(response) {
                    if(response.hasOwnProperty("message") && response["action"] == "page refresh") {
                        resetForm("#abdominalform");
                        successMessage(response["message"])
                    }
                }
            }).catch ( err => {throw err;})
         } else {
              postRequest(
                'http://localhost:8000/scanpanels/scan',
                'PUT',
                SCANDATA(),
              ).then((response) => {
                if (response) {
                  console.log(response)
                }
              })
         }
       }

    }

      //  display notice
  const displayNotice = function (target, message) {
    let search = document.querySelector('.search')
    let list = document.querySelector('.group-list')
    let parent = target.parentElement
    let css = target.parentElement.getAttribute('class')
    if (css) {
      if (css.includes('d-none')) {
        parent.classList.remove('d-none')
        parent.classList.add('d-block')
        list.style.display = 'none'
        search.style.display = 'none'
      }
    }
    target.innerHTML += message
    setTimeout(function () {
      target.innerHTML = ''
      parent.classList.remove('d-block')
      parent.classList.add('d-none')
      list.style.display = 'block'
      search.style.display = 'block'
    }, 6000)
  }

  let liverLength = document.getElementById("liverlen");
  let liverwidth = document.getElementById("liverwidth");

  let spleenLength = document.getElementById("spleenlen");
  let spleenWidth = document.getElementById("spleenwidth");

  let right_kidney_len = document.getElementById("rtkidneylen");
  let right_kidney_width = document.getElementById("rtkidneywidth");

  let left_kidney_len = document.getElementById("ltkidneylen");
  let left_kidney_width = document.getElementById("ltkidneywidth");
  // populate input field on clicked transactionid response data
  const inputFill = async function (data) {
    
    const {
        ABDOMINAL_CAVITY,
        IMPRESSION,
        KIDNEYS,
        LIVER,
        LIVER_SIZE,
        LT_KIDNEY_SIZE,
        OTHERFINDINGS,
        PANCREAS,
        RT_KIDNEY_SIZE,
        SPLEEN,
        SPLEEN_SIZE,
        TRANSACTIONID,
        ID
    } = data
 
    transactionalID.value = TRANSACTIONID;
    spleen.value = SPLEEN,
    liver.value = LIVER;
    kidneys.value = LIVER;
    Ofindings.value = OTHERFINDINGS;
    impression.value = IMPRESSION;
    pancreas.value = PANCREAS;
    abdominalCavity.value = ABDOMINAL_CAVITY;
    liverLength.value = parseFloat(LIVER_SIZE.slice(0,2));
    liverwidth.value = parseFloat(LIVER_SIZE.slice(9,12).trim());
    left_kidney_len.value = parseFloat(LT_KIDNEY_SIZE.split("cm x ")[0].trim());
    left_kidney_width.value = parseFloat(LT_KIDNEY_SIZE.split("cm x ")[1].split("cm")[0]);
    right_kidney_len.value = parseFloat(RT_KIDNEY_SIZE.split("cm x ")[0].trim());
    right_kidney_width.value = parseFloat(RT_KIDNEY_SIZE.split("cm x ")[1].split("cm")[0]);
    spleenLength.value = parseFloat(SPLEEN_SIZE.split("cm x ")[0].trim());
    spleenWidth.value = parseFloat(SPLEEN_SIZE.split("cm x ")[1].split("cm")[0].trim());
  }

  //  INSERT TRANSACTIONAL IDS OF WPRKED CASES
  const insertID = (response) => {
    let parent = document.getElementById('look');
    let html = response
      .map((p) => {
        return `<li id="lookbae" uuid = ${p['TRANSACTIONID']}>${p['TRANSACTIONID']}</li>`
      })
      .join('')

    return (parent.innerHTML = html)
  }

    var TransactionIDevent = async function () {
        let li = document.querySelectorAll('#lookbae')
        if (li) {
          for (let i = 0; i < li.length; i++) {
            li[i].onclick = function (ev) {
              const requestData = {
                scan: 'abdominalscan',
                transactionID: ev.target.getAttribute('uuid'),
              }
              postRequest('http://localhost:8000/prefill', 'POST', requestData)
                .then((response) => {
                    console.log(response)
                  inputFill(response[0])
                  //  set the state of form to update
                  let form = document.getElementById("abdominalform");
                  form.setAttribute('state', 'update')
                })
                .catch((err) => {
                  throw err
                })
            }
          }
        }
      }

      const autoSizeTextarea = async () => {
        const al = document.querySelectorAll("textarea");
        
        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
        al.forEach(element => {
           element.addEventListener("input",autoResize)
        });
      }

      autoSizeTextarea();

      // filter transactionID

  

    const workedCases = async function () {
        postRequest('http://localhost:8000/workedcases/:abdominal', 'GET')
          .then((response) => {
              console.log(response)
            insertID(response)
            TransactionIDevent()
          })
          .catch((err) => {
            throw err
          })
      }
    
      workedCases()

       const searchID = document.querySelector('#searchid')
  if (searchID) {
    const filterTransactionID = function (data) {
      postRequest('http://localhost:8000/api/filterid', 'POST', data)
        .then((response) => {
          if (response.length === 0) {
            return
          } else {
            insertID(response)
          }
        })
        .catch((err) => {
          throw err
        })
    }

    searchID.addEventListener('keyup', function (ev) {
      let parent = document.getElementById('look')
      parent.innerHTML = ''
      const transactionID = ev.target.value
      if (transactionID != '') {
        const table = 'abdominalscan'
        const data = { transactionID, tablename: table }
        filterTransactionID(data)
      } else {
        //  called if search field is empty;
        // poplulate area with worked cases ID
        workedCases()
      }
    })
  }


  // preset

const presetButton = document.querySelector('#presetbtn');


 const displayPreset = async () => {
    const html = function(p) {
      return (
        `
        <div class="list-group-item"  style="display: grid; grid-template-columns: 90% 10%;">
          <div class="title" style="font-size: 13px;" dataid = ${p['ID']}}>
            ${p["TITLE"]}
          </div>
          <div class="view-btn">
            <button type="button" id="p-fill" style="padding: 3px 6px;" class="btn btn-primary">fill</button>
          </div> 
        </div> 
      `
      )
    };

    const dataInsertion = async  (t) => {
      let i = t.map( (v) => {
        return html(v)
      }).join("");

      let parent = document.querySelector("#presetUL");
       parent.innerHTML = i;
    }
  //  display titles if search is null or display searched titles
    const searchShake = async  (res) =>{
       let search = document.querySelector("#preset_search");
       if(search.value == "") {
         dataInsertion(res);
       } 

       search.addEventListener("keypress" , (ev) => {
          let filter = ev.target.value;
          console.log(res)
          let filtered = res.filter( (v) => {
             return v["TITLE"].toLowerCase().startsWith(filter.toLowerCase())
          })
          dataInsertion(filtered);
       })

      search.addEventListener("focusout", (ev)=> {
        if(ev.target.value == "") {
          dataInsertion(res);
        }
      })
    }

    
    //  fill data into input fields
    
    const populateData = async function (data) {
     
    }
    
    // fill collect data for filing
    const prefillData = async function() {
       const button = document.querySelectorAll("#p-fill");
       const sendData = async (id,preset) =>  {
         postRequest("http://localhost:8000/api/v1/presetspecific","POST",{id :id,preset:preset})
         .then ( (res) => {
             if(res) {
               populateData(res);
             }
         }).catch ( (err) => {
            throw err;
         })
       }

       button.forEach ( (t) => {
         t.addEventListener("click", (ev)=> {
           let element = ev.target;
           let parent = element.parentElement;
           let sibling = parent.previousElementSibling;
           let id = sibling.getAttribute("dataid");
           sendData(id,"msd_preset");
         })
       })
    }

    postRequest("http://localhost:8000/api/v1/presetTitles","POST",{scan:"abdominalscan"})
    .then ( (res) => {
       searchShake(res);
      //  prefillData()
    }).catch ( (err) =>{
      console.log(err)
    })
  }

  displayPreset()

  
 
}