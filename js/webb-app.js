/* DOM References
================================================================ */

const alertBanner = document.querySelector('.alert')
const bellDot = document.getElementById('notifications')
const bell = document.getElementById('header__bell')

const user = document.getElementById('userField')
const message = document.getElementById('messageField')
const send = document.getElementById('send')

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
