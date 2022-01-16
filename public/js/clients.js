window.onload = (ev) => {
    const deliverPost = async (api,methods = "GET",data = null) => {
        if(methods == "GET"){
            return await fetch(api);
        }else{
            return await fetch(api,{
                method: methods,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
        }
    }

    // socket io connection
    const socket = io.connect("http://localhost:8000");

    console.log(socket)

    const renderHtml = function(array){
       let isArray = Array.isArray(array) ? true : false;
       
       const singleItem = function(item){
           return (` 
           <tr dbid=${item.ID}>
                <td>${item.ID}</td>
                <td>${item.TRANSACTIONID}</td>
                <td>${item.FULLNAME}</td>
                <td id="gender">${item.GENDER}</td>
                <td>${item.AGE}</td>
                <td>${item.REFERER}</td>
                <td id="insti">${item.INSTITUTION}</td>
                <td id="scan">${item.SCAN}</td>
                <td>${item.COST}</td>
                <td >${item.AMOUNT_PAID}</td>
                <td>${item.DISCOUNT}</td>
                <td>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="40" style="color: lightseagreen;" height="25" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path id="edit" dataid="${item.ID}" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" style="color: red;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                    <path id="delete" dataid="${item.ID}"  d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                    </svg>
                </td>
         </tr>
           `);
       }
       
       const displaydata= function(){
            let tbody = document.querySelector("tbody");
            let clients =  array.map((item)=>{
                return singleItem(item);
            }).join("");
         return tbody.innerHTML = clients;
       }

       if(isArray){
        if(array.length > 0) {
            displaydata();
            deleteFxn();
            editFxn();
        } else {
            let tbody = document.querySelector("tbody");
            tbody.innerHTML = "No data available";   
        }
       }
    }

    const filterList = function () {
        const search = document.querySelector("#sharp-search");
        const searchButton = document.getElementById("sButton");
        const ReactFxn = function(r,u){
            deliverPost("/v1/api/registration/filterlist","POST",{search:r,filter: u})
            .then ( (res) => {
                return res.json();
            }).then ( (t) => {
            if(t.length == 0) {
                let tbody = document.querySelector("tbody");
                tbody.innerHTML = "No data Available";
            } else {
                renderHtml(t)
            }
            }).catch (  (err) =>  {
                throw err;
            })
        }
        searchButton.addEventListener("click", (ev) => {
            let filtered = search.value;
            let column = document.querySelector("#filterer").value;
            ReactFxn(filtered,column);
        })
    }

    const render_ClientList =  function(){
        deliverPost("http://localhost:8000/registration")
        .then ( (response) => {
            return response.json();
        })
        .then( (response) => {
            renderHtml(response);
            filterList();
        })
        .catch( (err) => {throw err;})
    }

    render_ClientList();


   

    var deleteFxn = () => {
        const deleteServer = function(e) {
            console.log(e)
            const id = e.getAttribute("dataid");
            deliverPost("/v1/api/delete/client","POST",{id})
            .then ( (res) => {
                console.log(res)
            }).catch( (err) => { if(err) throw err;})
          }
        const da = document.querySelectorAll("#delete");
        da.forEach( (i) => {
            i.addEventListener("click", function(ev){
                let element = ev.target;
                deleteServer(element);
                render_ClientList();
            })
        })
    }


    const openReg = function() {
       const section = document.querySelector(".edit-section");
       const isVisible = section.style.display == "none" ? true : false;
       if(isVisible == true ) {
            section.style.display = "block";
            document.querySelector(".list-section").style.display = "none";
       }
     }

     const closeReg = function() {
        const section = document.querySelector(".edit-section");
        section.style.display = "none";
        const list = document.querySelector(".list-section");
        const isVisible = list.style.display == "none" ? true : false;
        if(isVisible == true ) {
             list.style.display = "block";
        }
     }
     const search = document.querySelector("#sharp-search");
     const fullname = document.getElementById('fullname')
     const scan = document.getElementById('scan')
     const age = document.getElementById('age')
     const ageCategory = document.getElementById('years')
     const paymentMode = document.getElementById('paymentMode')
     const referer = document.getElementById('referer')
     const institution = document.getElementById('institution')
     const amountPaid = document.getElementById('amount-paid')
     const discount = document.getElementById('discount')
     const state = document.getElementById('state')
     const momoID = document.getElementById('transaction')
     const cost = document.getElementById('cost')
     const gender = document.getElementById('gender')
     const history = document.getElementById('history')
    const populateSearch = (array) => {
       

        if(Array.isArray(array)){
            const d = array[0];
            fullname.value = d["FULLNAME"];
            scan.value = d["SCAN"];
            age.value = d["AGE"];
            ageCategory.value = d["AGE_CATEGORY"];
            paymentMode.value = d["PAYMENT_MODE"];
            referer.value = d["REFERER"];
            institution.value = d["INSTITUTION"];
            amountPaid.value = d["AMOUNT_PAID"];
            discount.value = d["DISCOUNT"];
            state.value = d["STATE"];
            cost.value = d["COST"];
            gender.value = d["GENDER"];
            history.value = d["HISTORY"];
            search.value = d["TRANSACTIONID"];
        }
    }

    const saveEditFxn = function () { 
        const saveButton = document.getElementById("saveButton");
        
        saveButton.addEventListener("click", function(ev){
            const customer = {
                fullname: fullname.value,
                scan: scan.value,
                age: age.value,
                ageCategory: ageCategory.value,
                paymentmode: paymentMode.value,
                referer: referer.value,
                institution: institution.value,
                amountpaid: amountPaid.value,
                discount: discount.value,
                state: state.value,
                momoID: momoID.value || null,
                history: history.value,
                cost: cost.value || 0,
                gender: gender.value,
                transactionid: search.value
              }
            if(customer.fullname != '' && customer.scan!= "" && customer.amountpaid != ""){
              deliverPost("/registration","PUT",customer)
              .then  ( (t) => {
                  return t.json();
              })
              .then ( (t) => {
                  console.log(t);
                  document.getElementById("editform").reset();
                  closeReg();
                  render_ClientList();
                }).catch (  (e) => { throw e;})
          } else {
              return;
          }
        })
    }

    const searchInfo = function (id){
        deliverPost("/v1/api/registration/edit","POST",{id})
        .then ( (res) => {
            return res.json();
        }).then ( (res) => {
            populateSearch(res);
            saveEditFxn()
        })
        .catch( (err)=> {throw err; })
    }

    const editFxn = function() {
        const el = document.querySelectorAll("#edit");
        for(let i = 0; i < el.length; i++) {
            let selected = el[i];
            let id = selected.getAttribute("dataid");
            selected.addEventListener("click", function(){
                openReg();
                searchInfo(id);
            })
        }
    }

   

   

    

}