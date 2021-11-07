window.onload = (ev) => {
  const blur = function (target) {
    target.style.border = '1px solid red'
    target.setAttribute('placeholder', 'required')
    target.style.color = 'red'
  }

  const normalize = function (target) {
    target.style.border = '1px solid lightgray'
    target.style.color = 'black'
    target.removeAttribute('placeholder')
  }

  const targetchange = (target) => {
    if (target.type == 'text') {
      if (target.value == null || target.value == '') {
        blur(target)
      }
    } else {
      if (target.value == 0 || target.value == '') {
        blur(target)
      }
    }
  }
  const inputs = document.querySelectorAll('input')

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].onblur = (ev) => {
      targetchange(ev.target)
    }
    inputs[i].addEventListener('focusin', (ev) => {
      normalize(ev.target)
    })
  }

  const postRequest = async (url, data) => {
    let link = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: data,
    })
    return link
  }

  const ErrorMessage = (error, element) => {
    let div = document.createElement('div')
    div.innerHTML = error
    element.appendChild(div)
  }

  const submitbutton = document.querySelector('#authenticateBtn')

  if (submitbutton) {
    submitbutton.addEventListener('click', function () {
      let username = document.getElementById('username').value
      let password = document.getElementById('password').value
      if (username == '' || password == '') {
        console.log(username.value, password.value, 'X')
      } else {
        let data = JSON.stringify({ username, password })
        postRequest('http://localhost:8000/authenticateUser', data)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            window.location.href = `http://localhost:8000${response["landingpage"]}`
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const addUserButton = document.getElementById('addUserBtn')

  if (addUserButton) {
    addUserButton.onclick = (ev) => {
      let username = document.querySelector('#username').value
      let password = document.getElementById('password').value
      let edit = document.getElementById('edit').value
      let role = document.getElementById('role').value
      let register = document.getElementById('register').value
      let deleteitem = document.getElementById('delete').value
      let contact = document.getElementById('contact').value
      let fullaccess = document.getElementById('access').value
      if (username.value == '' || contact.value == '' || password.value == '') {
        ev.preventDefault()
      } else {
        let data = JSON.stringify({
          username,
          fullaccess,
          role,
          password,
          edit,
          register,
          deleteitem,
          contact,
        })
        postRequest('http://localhost:8000/newusers', data)
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
