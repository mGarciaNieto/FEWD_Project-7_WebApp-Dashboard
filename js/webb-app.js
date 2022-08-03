/* DOM References
================================================================ */

// Alert Notifications
const alertBanner = document.querySelector('.alert')
const bellDot = document.getElementById('notifications')
const bell = document.getElementById('header__bell')

// Charts
const trafficCanvas = document.getElementById('traffic-chart')
const trafficSelected = document.querySelector('.traffic-nav')
const dailyCanvas = document.getElementById('daily-chart')
const mobileCanvas = document.getElementById('mobile-chart')

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

// Web traffic
const monthlyWebTraffic = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 15250, 11850, 2250, 1500, 2500, 8000],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1
    }
  ]
}

const weeklyWebTraffic = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  datasets: [
    {
      data: [1250, 1900, 1950, 800, 1200, 2500, 2000],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1
    }
  ]
}

const dailyWebTraffic = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [500, 550, 700, 1600, 1100, 1500, 1100],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1
    }
  ]
}

const hourlyWebTraffic = {
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

const trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: hourlyWebTraffic,
  options: trafficOptions
})

trafficSelected.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' && !e.target.classList.contains('active')) {
    const options = trafficSelected.children
    for (let i = 0; i < options.length; i++) {
      let option = options[i]
      if (option.classList.contains('active')) {
        option.classList.remove('active')
      }
    }
    e.target.classList.add('active')
  }
  if (e.target.textContent === 'Hourly') {
    trafficChart.data = hourlyWebTraffic
    trafficChart.update()
  } else if (e.target.textContent === 'Daily') {
    trafficChart.data = dailyWebTraffic
    trafficChart.update()
  } else if (e.target.textContent === 'Weekly') {
    trafficChart.data = weeklyWebTraffic
    trafficChart.update()
  } else if (e.target.textContent === 'Monthly') {
    trafficChart.data = monthlyWebTraffic
    trafficChart.update()
  }
})

// Daily traffic
const dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [
    {
      label: '# of Hits',
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: '#7477BF',
      borderWidth: 1
    }
  ]
}
const dailyOptions = {
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

const dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
})

// Mobile traffic
const mobileData = {
  labels: ['Desktop', 'Tablet', 'Phones'],
  datasets: [
    {
      label: '# of Users',
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ['#7477BF', '#78CF82', '#51B6C8']
    }
  ]
}

const mobileOptions = {
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    }
  }
}

const mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
})

/* Messaging
============================================================== */

send.addEventListener('click', (e) => {
  e.preventDefault()
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
