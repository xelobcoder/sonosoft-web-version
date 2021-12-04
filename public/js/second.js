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
  const impression = document.getElementById("impression");

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

  




}
