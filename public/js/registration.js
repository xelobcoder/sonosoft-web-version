window.onload = (ev) => {
    const  fullname = document.getElementById('fullname');
    const  scan = document.getElementById('scan');
    const  age = document.getElementById('age');
    const ageCategory = document.getElementById("years")
    const paymentMode = document.getElementById('paymentMode');
    const referer = document.getElementById("referer");
    const institution = document.getElementById("institution");
    const amountPaid = document.getElementById("amount-paid");
    const discount = document.getElementById("discount");
    const state = document.getElementById("state");
    const momoID = document.getElementById("transaction")
    const cost = document.getElementById("cost");
    const gender = document.getElementById("gender");
    const history = document.getElementById("history");

    // form reset function;

    let resetFunction = function(formid){
       document.getElementById(formid).reset();
    }

    let cancelButton = document.getElementById("cancelButton");

    // reset form using cancel button

    cancelButton.onclick = function(){
        resetFunction("registration-form");
        let inputs = document.querySelectorAll("input");
        Array.from(inputs).map( function(element){
            element.setAttribute("placeholder", "");
            BlackenInput(element);
        })
    }

    let reddifyInput = function(element){
        element.style.border = "1px solid red";
        element.style.color = "red";
    }

    let BlackenInput = function(element){
        element.style.border = "1px solid lightgray";
        element.style.color = "black";
    }

    let changePlaceholder = function(element){
        element.setAttribute("placeholder","Required");
    }

    // make inputs red when emwpty and darken if a value is inserted
    let emptyInputs = function(event) {
        const inputs = document.querySelectorAll("input");
        Array.from(inputs).map(
            function(element){
                element.onblur = function(){
                    if(element.hasAttribute("required") && element.value == ""){
                        reddifyInput(element);
                        changePlaceholder(element)
                    }
                }
                element.onfocus = function(){
                   if(element.hasAttribute("required")){
                     BlackenInput(element)
                   }  
                }
            }
        )
    }
    // This return html into the datalist 
    let htmlrender = function(p,a,name){
        let parentElement = document.getElementById(p);
        const isArray =  Array.isArray(a) ?  true : false;
        if(isArray){
           let html = function(v){
              return (`<option value = "${v[name]}">${v[name]}</option>`);
           }
           let insertion =  a.map( function(t){return html(t);}).join("");
           console.log(insertion)
           parentElement.innerHTML = insertion;
        }
    }

    // function to get api
    let apiDeliverer = async function(api){
        return await fetch(api) 
    }

    // deliver options into institution
    const renderInstituition = function(){
        let promise = apiDeliverer("http://localhost:8000/institutions")
        promise.then ( (response) => {return response.json()})
        .then ( (response) => { 
            htmlrender("institutionlist",response,"INSTITUTION");
        })
        .catch( (err) =>  { if(err) throw err});
    }

    renderInstituition()


    const renderClinician = function(){
       let promise = apiDeliverer("http://localhost:8000/referers")
       promise.then ( (response) => { return response.json()})
       .then( (response) => { 
           htmlrender("refererlist",response,"REFERER")
       })
       .catch( (err)  => {if(err) throw err;})
    }

    renderClinician();


    const renderScan = function(){
        let promise = apiDeliverer("http://localhost:8000/scanpanel")
        promise.then ( (response) => {return response.json()})
        .then ( (response) => { 
            htmlrender("scanlist",response,"SCANS");
        })
        .catch( (err) =>  { if(err) throw err});
    }
   
    renderScan();

    

    const saveButton = document.getElementById("saveButton");

    const check = function(){
        const inputs = document.forms["registration-form"].getElementsByTagName("input");
        const selects = document.forms["registration-form"].getElementsByTagName("select");
        Array.from(inputs).map(
            function(item){
                if(item.value === 0 && item.hasAttribute("required")
                || item.value === "" && item.hasAttribute("required")){
                    item.style.border = "2px solid red";
                    item.setAttribute("placeholder","Required");
                    item.style.color = "red";
                }
            }
        )    
    }

    saveButton.onclick = function(event){
        const customer = {
            fullname : fullname.value,
            scan : scan.value,
            age : age.value,
            ageCategory : ageCategory.value,
            paymentmode : paymentMode.value,
            referer : referer.value,
            institution : institution.value,
            amountpaid : amountPaid.value,
            discount : discount.value,
            state : state.value,
            momoID : momoID.value || null,
            history : history.value,
            cost : cost.value || 0,
            gender : gender.value
        }

        if(fullname.value === "" || scan.value === "" || age.value === 0   || referer.value === ""){
            event.preventDefault();
            check();
        }else{
            deliverPost("http://localhost:8000/registration",customer,"POST")
            .then ( function(res){
                return res.json();
            })
            .then ( function(res){
                console.log(res);
            }).catch( (err)=>{ if(err) throw err;})
        }
    }

    let deliverPost = async function(api,data,methodtype){
       return await fetch(api,{
           method : methodtype,
           headers : {
               "content-type" : "application/json"
           },
           body: JSON.stringify(data)
       })
    }
}