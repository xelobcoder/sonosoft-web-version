window.onload = (ev) => {
    const  fullname = document.getElementById('fullname');
    const  scan = document.getElementById('scan');
    const  age = document.getElementById('age');
    const paymentMode = document.getElementById('paymentMode');
    const referer = document.getElementById("referer");
    const institution = document.getElementById("institution");
    const amountPaid = document.getElementById("amountPaid");
    const discount = document.getElementById("discount");
    const state = document.getElementById("state");
    const momoID = document.getElementById("transaction")

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

}