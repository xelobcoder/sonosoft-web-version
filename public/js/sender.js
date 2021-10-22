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

    const html  = function(element){
        return (`
        <tr tabindex= "${element.ID}" uuid = "${element.UUID}" client = "${element.FULLNAME}"">
            <td>${element.UUID} </td>
            <td>${element.ID}</td>
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
                FULLNAME: parent.getAttribute("client"),
                SCAN : "MSD"
            }
        }

        Array.from(enterButton).forEach(
            function(elem){
               elem.addEventListener("click",function(ev){
                  let data = getinfo(ev);
                  window.location.href = `http://localhost:8000/abdominal/${data.UUID}`;
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
        if(hxpanel.style.display = "none"){
            hxpanel.style.display = "block";
            panelBody.innerHTML = text;
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
                       let history = res[0]["HISTORY"];
                       togglePanel.showed();
                       showPanel(history);
                   })
                   .catch ( (err) =>  {if(err){ throw err}});
                }
            }
        )
    }

    // display history section


  

  



}