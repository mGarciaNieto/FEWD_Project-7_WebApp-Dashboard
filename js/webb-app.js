/* DOM References
================================================================ */

const alertBanner = document.querySelector('.alert')
const bellDot = document.getElementById('notifications')
const bell = document.getElementById('header__bell')

const user = document.getElementById('userField')
const message = document.getElementById('messageField')
const send = document.getElementById('send')
const res = document.getElementById('results')

/* Alert Notifications
=============================================================== */

const html = `<div class="alert-banner"> 
                <p class="alert-text"><span class="alert-text--bold">Alert:</span> You have unread messages</p> 
                <p class="alert-banner--close">X</p>
              </div>`
alertBanner.insertAdjacentHTML('afterbegin', html)

alertBanner.addEventListener('click', (e) => {
  if (e.target.classList.contains('alert-banner--close')) {
    alertBanner.classList.add('alert-banner--fading')
    // alertBanner.style.visibility = 'hidden'
  }
})

bell.addEventListener('click', (e) => {
  //   alert(`
  // -------------------------------------------------------|
  //           You have 4 new messages.

  //           You have 6 overdue tasks to complete.
  // -------------------------------------------------------|

  //   `)

  Swal.fire({
    title: 'You have <b>4</b> new messages! <br><br> and <br><br> You have <b>6</b> overdue tasks to complete!',
    icon: 'warning'
  })

  bellDot.classList.add('header__bell-notifications--hidden')
})

/* Messaging
============================================================== */

send.addEventListener('click', () => {
  if (user.value === '' && message.value === '') {
    Swal.fire({
      title: 'Please fill out user and message fields before sending',
      icon: 'warning'
    })
  } else if (user.value === '') {
    alert('Please fill out user field before sending')
    Swal.fire({
      title: 'Please fill out user field before sending',
      icon: 'warning'
    })
  } else if (message.value === '') {
    Swal.fire({
      title: 'Please fill out message field before sending',
      icon: 'warning'
    })
  } else {
    Swal.fire({
      title: `Message successfully sent to: ${user.value}`,
      icon: 'success'
    })
  }
})

// Autocomplete

const searchItems = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver']

function autocompleteMatch(input) {
  if (input === '') {
    return []
  }
  const regEx = new RegExp(input)
  return searchItems.filter(function (term) {
    if (term.match(regEx)) {
      return term
    }
  })
}

function showResults(val) {
  res.innerHTML = ''
  let list = ''
  const terms = autocompleteMatch(val)
  for (i = 0; i < terms.length; i++) {
    list += '<li>' + terms[i] + '</li>'
  }
  res.innerHTML = '<ul class="message__results-ul">' + list + '</ul>'
}

results.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'LI') {
    user.value = e.target.innerHTML
  }
  res.innerHTML = ''
})
