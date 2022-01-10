window.onload = (ev) => {
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

  const transactionalID = document.getElementById('clientid')
  const fullname = document.getElementById('fullname')
  const method = document.getElementById('method')
  const frequency = document.getElementById('frequency')
  const cardiacActivity = document.getElementById("ca");
  const number = document.getElementById('foestus')
  const placenta = document.getElementById('placenta')
  const placentaAppearance = document.getElementById('pa')
  const placentaGrade = document.getElementById('grade')
  const amnioticAssessment = document.getElementById('am')
  const volume = document.getElementById('am-v')
  const flag = document.getElementById('flag')
  const FLM = document.getElementById('fl-v')
  const FLW = document.getElementById('fl-w')
  const FLD = document.getElementById('fl-d')
  const HLM = document.getElementById('hc-v')
  const HLW = document.getElementById('hc-w')
  const HLD = document.getElementById('hc-d')
  const ALM = document.getElementById('ac-v')
  const ALW = document.getElementById('ac-w')
  const ALD = document.getElementById('ac-d')
  const BLM = document.getElementById('bpd-v')
  const BLW = document.getElementById('bpd-w')
  const BLD = document.getElementById('bpd-d')
  const edd = document.getElementById('edd')
  const efw = document.getElementById('efw')
  const presentation = document.getElementById('presentation')
  const cervix = document.getElementById("clo");
  const cervicalLength = document.getElementById("cl");
  const otherfindings = document.getElementById("of");
  const impression = document.getElementById("imp");
  const fhr = document.getElementById("fhr");

  volume.addEventListener("focusout",(ev) => {
    let value = ev.target.value;
    let ammniotic = amnioticAssessment.value;
    flag.innerHTML = "Flag: ";
    const MAXAFI = 25;
    const MINAFI = 5;
    const MAXDVP = 8;
    const MINDVP = 2;
    if(value === "") {
      volume.focus();
    }

    if(value != "" && ammniotic == "AFI"){
      if(parseInt(value)> MAXAFI) {
        flag.innerHTML += " Polyhydraminous"
      } else if (parseInt(value) < MINAFI) {
        flag.innerHTML += " OLigohydramnous"
      } else {
        flag.innerHTML += " Normal"
      }
    } else if(value !="" && ammniotic == "DVP"){
      if(parseInt(value) > MAXDVP) {
        flag.innerHTML += " Polyhydraminous"
      } else if (parseInt(value) < MINDVP) {
        flag.innerHTML += " OLigohydramnous"
      } else {
        flag.innerHTML += " Normal"
      }
    } else {
      if(value != "" && ammniotic == "Subjective") {
        flag.innerHTML += value;
      }
    }
  })


  const insertResults = function () {
    return {
      scan: "SECOND",
      transactionalID: transactionalID.value,
      method: method.value,
      frequency: frequency.value,
      number: number.value,
      placenta: placenta.value,
      placentaAppearance: placentaAppearance.value,
      placentaGrade: placentaGrade.value,
      cardiacActivity: cardiacActivity.value,
      ammniotic : amnioticAssessment.value,
      volume : volume.value,
      FLM :FLM.value,
      FLW: FLW.value,
      FLD: FLD.value,
      ACM :ALM.value,
      ACW: ALW.value,
      ACD: ALD.value,
      BPDM :BLM.value,
      BPDW: BLW.value,
      BPDD: BLD.value,
      HCM :HLM.value,
      HCW: HLW.value,
      HCD: HLD.value,
      presentation : presentation.value,
      cervix : cervix.length,
      cervicalLength : cervicalLength.value,
      otherfindings :  otherfindings.value,
      impression : impression.value,
      edd: edd.value,
      efw : efw.value,
      fhr : fhr.value
    }
  }

  // FHR stay in focus if value is null or ""

  fhr.addEventListener("focusout", (ev) => {
    const BRADY = 110;
    const TACHY = 160;
    let flag = document.getElementById("flag-h");
    flag.innerHTML ="Flag: ";
    flag.style.color ="black";
    if(ev.target.value == "") {
      ev.target.focus();
    }
    let value = ev.target.value;
    if(value > TACHY){
        flag.innerHTML += "Fetal Tachycardia";
        flag.style.color ="red";
    } else if (value < BRADY) {
      flag.innerHTML += "Fetal Bradycardia";
      flag.style.color ="red";
    } else {
      flag.innerHTML += "Normal fetal heart rate";
      flag.style.color ="blue";
    }

  })

  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", function(ev) {
     let results = insertResults();
     let form = document.getElementById("second_trimester");
     let state = form.getAttribute("state");
     console.log(state)
     if(state === "new") {
       postRequest("http://localhost:8000/scanpanels/scan","POST",results)
       .then( (res) => {
          console.log(res);
       }).catch ((err) => { console.log(err)})
     } else {
        postRequest("http://localhost:8000/scanpanels/scan","PUT",results)
        .then ( (res) =>  {
           console.log(res);
        }).catch ( (err) => {
          console.log(err)
        })
     }
  })


  // list of worked cases

  // var TransactionIDevent = async function () {
  //   let li = document.querySelectorAll('#lookbae')
  //   if (li) {
  //     for (let i = 0; i < li.length; i++) {
  //       li[i].onclick = function (ev) {
  //         const requestData = {
  //           scan: 'MSD',
  //           transactionID: ev.target.getAttribute('uuid'),
  //         }
  //         console.log(requestData.transactionID)
  //         postRequest('http://localhost:8000/prefill', 'POST', requestData)
  //           .then((response) => {
  //             inputFill(response[0])
  //             //  set the state of form to update
  //             form.setAttribute('state', 'update')
  //           })
  //           .catch((err) => {
  //             throw err
  //           })
  //       }
  //     }
  //   }
  // }

  // const workedCases = async function () {
  //   postRequest('http://localhost:8000/workedcases/:second', 'GET')
  //     .then((response) => {
  //       insertID(response)
  //       TransactionIDevent()
  //     })
  //     .catch((err) => {
  //       throw err
  //     })
  // }

  // workedCases()


  

}
