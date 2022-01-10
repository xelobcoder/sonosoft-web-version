window.onload = (ev) =>  {
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


      
    const title = document.getElementById("title");
    const liver = document.getElementById("liver");
    const kidneys = document.getElementById("kidneys");
    const pancreas = document.getElementById("pancreas");
    const gallbladder = document.getElementById("gallbladder");
    const spleen = document.getElementById("spleen");
    const abdominalCavity = document.getElementById("cavity");
    const impression = document.getElementById("impression");
    const form = document.getElementById("form");

    const FILL = () => {
        let presetTop = document.getElementById("titles-preset");
        if(presetTop.innerHTML != null) {
        let items = document.querySelectorAll(".list-group-item");
        let populateData = function (r) {
            const valid = Array.isArray(r) ? true : false;
            if(valid) {
                const {
                ABDOMINAL_CAVITY,
                GALLBLADDER,
                ID,
                IMPRESSION,
                KIDNEY,
                LIVER,
                PANCREAS,
                SPLEEN,
                TITLE } = r[0];
                title.value = TITLE;
                gallbladder.value = GALLBLADDER;
                liver.value = LIVER;
                pancreas.value = PANCREAS;
                spleen.value = SPLEEN;
                abdominalCavity.value = ABDOMINAL_CAVITY;
                impression.value = IMPRESSION;
            }
        }

        const removeActive = function( ) {
            items.forEach( (o) => {
                if(o.classList.contains("active")){
                    o.classList.remove("active")
                }
            })
        }
        for(let i = 0; i < items.length; i++) {
            let selected = items[i];
            selected.addEventListener("click", (ev) => {
                removeActive();
                selected.classList.add("active");
                let dataid = selected.getAttribute("data-di");
                postRequest('/api/v1/presetspecific',"POST",{id: dataid,preset : "abdomen_preset"})
                .then ( (res) =>  {
                    populateData(res)
                }).catch ( (err) => { throw err;})
            })
        }
       }
    }

    const search = document.getElementById("search-preset");

    const displaySingle = function(p) {
        const html = 
        `<div class="list-group-item text-black text-capitalize" data-di= "${p.ID}" id="preset-list">
                ${p["TITLE"].toLowerCase()}
          </div>
         `;
      return html;
    } 

    const displayBulk = function(array) {
        let titles = array.map( (item) =>  {
          return displaySingle(item);    
      }).join("");

      let html = document.getElementById("titles-preset");
       html.innerHTML = titles;
     }

     const DISPLAY_SEARCHED = () => {
        const data = {scan: "abdominalscan"}
        postRequest("/api/v1/presetTitles","POST",data)
        .then ( (res)=> {
            displayBulk(res);
            DELETE()
        }).catch ( (err) => { throw err; })
    }

    DISPLAY_SEARCHED();

    const DELETE = () => {
        const items = document.querySelectorAll("#preset-list");
        let deletebutton = document.getElementById("deletebutton");
        deletebutton.addEventListener('click', (ev) => {
            const active = document.querySelector(".active");
            if(active) {
                let id = active.getAttribute("data-di");
                let tablename = "abdomen_preset";
                postRequest("/v1/api/deletepreset","POST",{id,tablename})
                .then ( (res) => {
                   if(res["message"] == "preset deleted successfully"){
                       DISPLAY_SEARCHED()
                   }
                }).catch(  (err) => {throw err; })
            }  
        } )
    }




    const SEARCH = () => {
      const data = {scan: "abdominalscan"}
      const REAL_DISPLAY = function() {
        postRequest("/api/v1/presetTitles","POST",data)
        .then( (res) =>  {
            let titles = res;
            if(titles.length != 0) {
                displayBulk(titles);
                search.addEventListener("keypress", (ev) => {
                    let keyed = ev.target.value;
                  if(keyed == " ") {
                      displayBulk(titles);
                      FILL()
                  } else {
                    let filtered = titles.filter ( (item) => {
                        return item.TITLE.toLowerCase().includes(keyed.toLowerCase())
                      })
                     if(filtered) {
                        displayBulk(filtered);
                        FILL()
                     }
                  }
                })
                FILL()
            } else {
                return;
            }
        }).catch( (err) =>  {
            throw err;
        })
      }

      REAL_DISPLAY()

    }

    SEARCH();


    

    
    

    const EDIT =  () =>  {

    }

    const New = () => {

    }


    const Invalid = (ev) => {
        const textarea = document.querySelectorAll("textarea");
        for (let i = 0; i < textarea.length; i++) {
            if(textarea[i].value == " ") {
                textarea[i].classList.add("border-danger");
                // ev.preventDefault();
            } else {
                return true;
            }
        }
    }


    const SAVE_BTN = () =>  {
        const save = document.getElementById("save");
        save.onclick = (ev) => {
           if(title.value == " " || liver.value == " " || spleen.value == " " ||
           impression.value == " ") {
               Invalid()
           } else {
               const data =  {
                   title: title.value,
                   liver: liver.value,
                   spleen : spleen.value,
                   kidneys : kidneys.value,
                   pancreas: pancreas.value,
                   gallbladder : gallbladder.value,
                   abdominalCavity : abdominalCavity.value,
               }
               postRequest("/abdomopelvicpreset","POST",data)
               .then ( (res) =>  {
                   console.log(res);
                   DISPLAY_SEARCHED();
                   form.reset();
                   window.location.reload();
               }).catch ( (err) => { throw err;})
           }

          
        }
    }

    SAVE_BTN();

    const newbutton = document.getElementById("newbutton");

    newbutton.addEventListener("click", (ev) => {
        form.reset();
        let items = document.querySelectorAll(".list-group-item");
        let firstChild = items[0];

        const removeActive = function( ) {
            items.forEach( (o) => {
                if(o.classList.contains("active")){
                    o.classList.remove("active")
                }
            })
        }
        removeActive()

        firstChild.classList.add("active");
    })
}