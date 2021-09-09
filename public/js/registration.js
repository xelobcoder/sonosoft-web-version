window.onload = (ev) => {
    let fullname = document.getElementById('fullname');
    let scan = document.getElementById('scan');
    let age = document.getElementById('age');
    let paymentMode = document.getElementById('paymentMode');
    let referer = document.getElementById("referer");
    let institution = document.getElementById("institution");
    let amountPaid = document.getElementById("amountPaid");
    let discount = document.getElementById("discount");
    let state = document.getElementById("state");
    let momoID = document.getElementById("transaction")

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

    let amound_To_be_paid = function(discount,cost){
        if(discount === 0 ){
            return cost;
        }
      return cost - discount;
    }

    let validatePayment = function(n,p){
        let message = document.querySelector("messageDx");
        if(p > n || n > p){
           return message.innerHTML = n + "Expected." + "kindly check on payment";            
        }
        return true;
    }
    
       
   paymentMode.onchange = function(){
        let transacParent = document.querySelector("#transac-parent");
        let selected = paymentMode.options[paymentMode.selectedIndex].value;
        if(selected === "momo"){
            transacParent.style.display ="block !important";
        }else{
            transacParent.style.display = "none";
        }
    }

    // tooglePaymentMode()

    emptyInputs()

    
}