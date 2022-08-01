/* DOM References
================================================================ */

// Alert Notifications
const alertBanner = document.querySelector('.alert')
const bellDot = document.getElementById('notifications')
const bell = document.getElementById('header__bell')

// Charts
const trafficCanvas = document.getElementById('traffic-chart')

// Messaging
const user = document.getElementById('userField')
const message = document.getElementById('messageField')
const send = document.getElementById('send')
const res = document.getElementById('results')

// Settings
const save = document.getElementById('save')
const cancel = document.getElementById('cancel')
const zone = document.getElementById('timezone')
const notifications = document.getElementById('email-setting')
const profile = document.getElementById('profile-setting')

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

/* Chart Widgets
=============================================================== */

const trafficData = {
  labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1
    }
  ]
}

const trafficOptions = {
  backgroundColor: 'rgba(112, 104, 201, .5)',
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

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

/* Settings
======================================================================== */

// localStorage
save.addEventListener('click', () => {
  localStorage.setItem('email-setting', notifications.checked)
  localStorage.setItem('profile-setting', profile.checked)
  localStorage.setItem('timezone', zone.value)
  Swal.fire({
    title: 'Your settings have been successfully saved!',
    icon: 'success'
  })
})

cancel.addEventListener('click', () => {
  localStorage.clear()
  loadSettings()
  zone.selectedIndex = 0
  localStorage.setItem('timezone', zone.value)
  Swal.fire({
    title: 'Your settings have gone back to default values!',
    icon: 'warning'
  })
})

function loadSettings() {
  notifications.checked = JSON.parse(localStorage.getItem('email-setting'))
  profile.checked = JSON.parse(localStorage.getItem('profile-setting'))
  zone.value = localStorage.getItem('timezone')
}

loadSettings()
