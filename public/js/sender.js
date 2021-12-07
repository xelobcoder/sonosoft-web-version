window.onload = (ev) => {
    const getAllClients = async function (api){
        let url = await fetch(api)
        return url.json();
    }

    /**
     * 
     * @param {string} api api endpoint for delivering post 
     * @param {object} data data to be delivered to endpoint
     * @returns A promise 
     */
    const postClients = async (api,data) => {
       let url = await fetch(api, {method : "POST", headers : {"content-type" : "application/json"},body : JSON.stringify(data)})
       return url.json();
    }

    // hide scan selections

    const hideScanSelection = function() {
        const selection = document.querySelector(".template-list-section");
        return selection.style.display ="none";
    }

    // shoe scan selections

    const showScanSelection = () =>  {
        const selection = document.querySelector(".template-list-section");
        return selection.style.display = "block";
    }

    const html  = function(element){
        return (`
        <tr tabindex= "${element.ID}" uuid = "${element.TRANSACTIONID}" client = "${element.FULLNAME}"">
            <td>${element.ID} </td>
            <td>${element.TRANSACTIONID}</td>
            <td >${element.FULLNAME}</td>
            <td>${element.GENDER}</td>
            <td>${element.SCAN}</td>
            <td>${element.TIME}</td>
            <td>${element.STATE}</td>
            <td> ${element.REFERER} </td>
            <td historyid = "${element.ID}"><button class="btn btn-info" id="viewHistory">history</button></td>
            <td><button class="btn btn-danger" id="enter-result-btn">result</button></td>
         </tr>
        `)
    }

    const handleAllresult = () => {
        let enterButton = document.querySelectorAll("#enter-result-btn");
        let getinfo = function(element){
            let parent = (element.target.parentElement).parentElement;
            return {
                UUID: parent.getAttribute("uuid"),
                FULLNAME: parent.getAttribute("client")
            }
        }

        Array.from(enterButton).forEach(
            function(elem){
               elem.addEventListener("click",function(ev){
                  let data = getinfo(ev);
                  openHistoryModal();
                  hidePanel();
                  showScanSelection();
                  selectScan(data);
               });
            }
        )
    }

    
    const display = function(res){
        if(Array.isArray(res)){
          let display = res.map( (element) => {
              return html(element);
          }).join('\n');
          const queue = document.querySelector("#queuebody");
          queue.innerHTML = display;
        }
        return;
    }
    getAllClients("http://localhost:8000/registration").then ( (res) => {
        display(res);
        handleAllresult();
        historyView();
    })
    .catch ( (err) => {if(err) throw err})


    // monitoring all viewHistory button click;

    const showPanel = (text) => {
        const panelBody = document.getElementById("panel-body");
        const hxpanel = document.querySelector(".panel");
        
        const spliText = function(){
            let splitted = text.split("\n");
            let items =  splitted.map( (item) => {
               return `<li>${item}</li>`;
            });
            return items;
        }
        if(hxpanel.style.display = "none"){
            hxpanel.style.display = "block";
            panelBody.innerHTML = `<ul>${spliText()}</ul>`;
        } 
    }
    //  hide history panel
    
    const hidePanel = () => {
        const panelBody = document.getElementById("panel-body");
        const hxpanel = document.querySelector(".panel");
        if(hxpanel.style.display = "block"){
             hxpanel.style.display ="none";
             panelBody.innerHTML = "";
        }
    }

    // preview history function

    const historyView = () => {
        const getid =  function(ev){
            let id =  ev.parentElement.getAttribute(
                "historyid"
            );
            return id;   
        }
        const viewHistoryBtn = document.querySelectorAll("#viewHistory");
        // received history of client using the transactional id
        const sendID = async function(id){
            let url = await fetch(`http://localhost:8000/viewhistory/${id}`);
            return url.json();
        }


        Array.from(viewHistoryBtn).forEach(
            function(item){
                item.onclick = () => {
                   let id = getid(item);
                   sendID(id).then ( (res) => { 
                     if(res.length != 0) {
                        let history = res[0]["HISTORY"];
                        openHistoryModal();
                        showPanel(history);
                        hideScanSelection();
                     } else {
                         openHistoryModal();
                     }
                   })
                   .catch ( (err) =>  {if(err){ throw err}});
                }
            }
        )
    }


const openHistoryModal = function() {
    const modal = document.getElementById("modal-sonoqueue-view");
    modal.style.display ="block"
}

const closeHistoryModal = () => {
    const modal = document.getElementById("modal-sonoqueue-view");
    return modal.style.display = "none";
}

// close the modal

// close tag

const times = document.querySelector("#close-wrapper");

times.onclick = function() {
    closeHistoryModal();
}


const reloadPage =  (data,scan) => {
    const {UUID,FULLNAME} = data;
    console.log(scan)
    switch(scan) {
        case "MSD": 
            window.location.href= `http://localhost:8000/msd/${UUID}`;
        break;
        case "SECOND":
            window.location.href = `http://localhost:8000/second&&third/${UUID}`;
            break;
        case "ABDOMINAL":
            window.location.href = `http://localhost:8000/abdominal/${UUID}`;
        break;
        case "ABDOMINAL_PELVIC":
            window.location.href = `http://localhost:8000/abdominal_pelvic/${UUID}`;
        break;
        case "CRL":
            window.location.href = `http://localhost:8000/crl/${UUID}`;
        break;
        case "UROLOGY":
            window.location.href = `http://localhost:8000/urology/${UUID}`;
        break;
        default: 
            return;
    }
}
    

const selectScan = (data) => {
    const errorMesage = () =>  {
        return new Error("objects required");
    }

    const isObject = typeof data === "object" ?  true : errorMesage;
   
    const items = document.querySelectorAll(".items > .name");
    for(var i = 0; i < items.length; i++){
        let item = items[i];
        item.onclick = () => {
            let selectedScan = item.getAttribute("log");
            if(selectedScan != null && isObject ){
               return  reloadPage(data,selectedScan);
            } else {
                return null;
            }

        }
    }
}



  

  



}