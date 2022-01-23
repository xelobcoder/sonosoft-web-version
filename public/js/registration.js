window.onload = (ev) => {
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
  const history = document.getElementById('history');

  var vu = undefined;

  // form reset function;

  let resetFunction = function (formid) {
    document.getElementById(formid).reset()
  }

  let cancelButton = document.getElementById('cancelButton')

  // reset form using cancel button

  cancelButton.onclick = function () {
    resetFunction('registration-form')
    let inputs = document.querySelectorAll('input')
    Array.from(inputs).map(function (element) {
      element.setAttribute('placeholder', '')
      BlackenInput(element)
    })
  }

  let reddifyInput = function (element) {
    element.style.border = '1px solid red'
    element.style.color = 'red'
  }

  let BlackenInput = function (element) {
    element.style.border = '1px solid lightgray'
    element.style.color = 'black'
  }

  let changePlaceholder = function (element) {
    element.setAttribute('placeholder', 'Required')
  }

  // make inputs red when emwpty and darken if a value is inserted
  let emptyInputs = function (event) {
    const inputs = document.querySelectorAll('input')
    Array.from(inputs).map(function (element) {
      element.onblur = function () {
        if (element.hasAttribute('required') && element.value == '') {
          reddifyInput(element)
          changePlaceholder(element)
        }
      }
      element.onfocus = function () {
        if (element.hasAttribute('required')) {
          BlackenInput(element)
        }
      }
    })
  }
  emptyInputs();
  // This return html into the datalist
  let htmlrender = function (p, a, name) {
    let parentElement = document.getElementById(p)
    const isArray = Array.isArray(a) ? true : false
    if (isArray) {
      let html = function (v) {
        return `<option  value = "${v[name]}">${v[name]}</option>`
      }
      let insertion = a
        .map(function (t) {
          return html(t)
        })
        .join('')
      parentElement.innerHTML = insertion
    }
  }

  // function to get api
  let apiDeliverer = async function (api) {
    return await fetch(api)
  }

  // deliver options into institution
  const renderInstituition = function (a) {
    let promise = apiDeliverer('http://localhost:8000/institutions')
    promise
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        htmlrender('institutionlist', response, 'INSTITUTION')
      })
      .catch((err) => {
        if (err) throw err
      })
  }

  renderInstituition()

  const renderClinician = function () {
    let promise = apiDeliverer('http://localhost:8000/referers')
    promise
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        htmlrender('refererlist', response, 'REFERER')
      })
      .catch((err) => {
        if (err) throw err
      })
  }

  renderClinician()

  let defualtCost = async function (response,scan,cost) {
      if(scan) {
        scan.addEventListener("change",(ev) => {
          let SCANTYPE = ev.target.value;
          let filtered = response.filter( (t) => SCANTYPE == t["SCANS"]);
          if(filtered.length === 1) {
             let scancost = filtered[0]["COST"];
             cost.value = scancost;
             if(cost.value != "" || cost.value != undefined || cost.value != null) {
                cost.disabled = true;
             } else return
          }
       })
    }
  }

  const discountedValue = (a,d,c) => {
    av = c - d;
    return a == av ?  true : false;
  }

  const renderScan = function (t,c) {
    let promise = apiDeliverer('http://localhost:8000/scanpanel')
    promise
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        let html = function (v) {
          return `<option id="scanlist-child"  value = "${v['SCANS']}" cost = ${v['COST']}>${v['SCANS']}</option>`
        }
        let insertion = response
          .map(function (t) {
            return html(t)
          })
          .join('')
        let parent = document.getElementById('scanlist')
         parent.innerHTML = insertion;
         defualtCost(response,t,c)
      })
      .catch((err) => {
        if (err) throw err
      })
  }

  renderScan(scan,cost)

  const saveButton = document.getElementById('saveButton')

  const check = function () {
    const inputs = document.forms['registration-form'].getElementsByTagName(
      'input',
    )
    const selects = document.forms['registration-form'].getElementsByTagName(
      'select',
    )
    Array.from(inputs).map(function (item) {
      if (
        (item.value === 0 && item.hasAttribute('required')) ||
        (item.value === '' && item.hasAttribute('required'))
      ) {
        item.style.border = '2px solid red'
        item.setAttribute('placeholder', 'Required')
        item.style.color = 'red'
      }
    })
  }

  saveButton.onclick = function (event) {
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
    }

    if (
      fullname.value === '' ||
      scan.value === '' ||
      age.value === 0 ||
      referer.value === ''
    ) {
      event.preventDefault()
      check()
    } else {
      if(discountedValue(customer.amountpaid, customer.discount,customer.cost) == true) {
        deliverPost('http://localhost:8000/registration', customer, 'POST')
        .then(function (res) {
          return res.json()
        })
        .then(function (res) {
          console.log(res);
          document.getElementById("registration-form").reset();
        })
        .catch((err) => {
          if (err) throw err
        })
      } else {
        let p = "accessMessage";
        let m = "check discounted amount and amount paid in relation to cost";
        message.staging(p,m,"alert-warning");
      }
    }
  }

  let deliverPost = async function (api, data, methodtype) {
    return await fetch(api, {
      method: methodtype,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // message 
  var message = {
    staging : function(p,m,s){
      let v = document.getElementById(p);
      let isV = v.style.display == "none" ? true : false;
      if(isV){
        v.style.display = "block";
        v.classList.add(s);
        v.innerHTML = m;
        setTimeout((ev)=>{ v.classList.remove(s); v.style.display = "none";;},10000)
      }
   },
   validateMembership : function() {
      const d = document.getElementById("searchref");
      const s = document.getElementById("sb");  
      s.addEventListener("click",
      function(ev) {
        deliverPost("/v1/api/registration/activation",{ref: d.value},"POST")
        .then ( (t) => { return t.json()}).
        then ( (u) => {const {REFID} = u[0]; document.getElementById("ac-d").innerHTML =  REFID; message.display("activation-list")})
        .catch ( (er) => { throw er;})
      });
   },
   onActivation: function() {
    this.display("activation-continue");
    this.hide("#activation-search-area");
    let refered = document.getElementById("flexRadioDefault2");
    let walkin = document.getElementById("flexRadioDefault1");
    let grs = document.querySelectorAll("#grs");
    if(walkin.checked) {
      grs.forEach( (i) => { i.style.display = "none"})
    }
    refered.addEventListener("click", (ev) => {
      grs.forEach( (i) => { i.style.display = "block"});
    })
    walkin.addEventListener("click", (ev) => {
      grs.forEach( (i) => { i.style.display = "none"}) 
    })

    let s = document.getElementById("scan");
    let c = document.getElementById("cc");
    renderScan(s,c)
    

 },
   activation : function (b) {
    var v = null; 
    const t = document.getElementById("acbtn");
     t.addEventListener("click", function(ev){
       if(document.getElementById("ac-d").innerHTML.trim() == "") {
         document.getElementById(b).autofocus(); 
       } else {
        let v = document.getElementById("ac-d").innerHTML.trim();
        deliverPost("/v1/api/registration/activation/user",{refupdate: v},"POST")
        .then ( (u) => {return u.json()})
        .then ( (w) => { 
          if(w) {
            message.onActivation();
            for(key in w[0]) {
              window.sessionStorage.setItem(key,w[0][key]);
            }
          } 
        }).
        catch ( (err) => {throw err;})
       }
     })
     return v;
   },
 

   display : function (a) {
      let d = document.getElementById(a);
      if(d.style.display == "none") {
         d.style.display = "block";
      } else {
        return false;
      }
   },
   hide : function (r) {
     let d = document.querySelector(r);
     if(d.style.display == "block") {
       return d.style.display = "none";
     }
   },
  //  change regchoices,registration input fills wrapper and activation area to none
   
  clearAllRegistrationPanel : function(a,b,c) {
      [a,b,c].forEach( (t) => {
       let item = document.querySelector(t);
         item.style.display = "none";
     })
   },
  //  select registration pattern, onetime customer or activate membership button
   registration : function () {
     let r = document.querySelectorAll("#rc")[0];
     let m = document.querySelectorAll("#rc")[1];
     r.addEventListener("click",
     function(ev){
       message.clearAllRegistrationPanel("#activation-search-area","#registration","#regchoice");
        message.display("registration");
     })
     m.addEventListener("click", 
     function(ev){
      message.clearAllRegistrationPanel("#activation-search-area","#registration","#regchoice");
      message.display("activation-search-area");
      message.validateMembership();
      console.log(message.activation());
     })
   },
   fowardData : function () {
     let s = document.getElementById("scan");
     let c = document.getElementById("cc");
     let p = document.getElementById("pd");
     let d = document.getElementById("d");
     let py = document.getElementById("pm");
     let st = document.getElementById("st");
     let r = document.getElementById("refid");
     let i = document.getElementById("instid");
     let h = document.getElementById("history");
     const o = window.sessionStorage;
     
     let activateNew = new Membership(null,c,d,p,s,r,i,o,h,st,py);

   }
   
  }

  class Membership {
    constructor(u,c,p,d,s,r,i,pi,h,st,m) {
      this.type = u;
      this.cost = c;
      this.discount = d;
      this.paid = p;
      this.scan = s;
      this.referer = r;
      this.inst = i;
      this.state = st;
      this.hsitory = h;
      this.mode = m;
      this.personalInformation = pi;
    }

    isPersonalInformation = function() {
       return typeof this.personalInformation === "object" ? true :  new Error("Type object required");
    }
    validcost = function () {
      return this.cost != null || this.cost != "" ? parseInt(this.cost) : false;
    }
    validpaid = function() {
      return this.paid != null || this.paid == null ? parseInt(this.paid) : false;
    }
    validreferer = function () {
      if(this.type === "referer") {
         return this.referer != " " ? this.referer : false;
      } else {
        return null;
      }
    }

    validDiscount = function() {
      let actualcost = this.cost - this.discount;
      let d = this.discount; let c = this.cost; let p = this.paid;
      if(c === d + p) {
        return;
      } else {
        if(Number.isNaN(actualcost) && Number.isInteger(actualcost) > 0) {
           
        } else {
          return `${d} `;
        }
      }
    }
  }


  message.registration();
}

