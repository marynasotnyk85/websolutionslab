function scrollToElement(id) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

const btn = document.getElementById('menu-btn');
const menu= document.getElementById('menu');
btn.addEventListener('click', navToggle);

// toggle Mobile Menu
function navToggle(){
btn.classList.toggle('open');
menu.classList.toggle('hidden');
menu.classList.toggle('flex');

}

const cookieStorage = {
getItem: (item) => {
    const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies[item];
},
setItem: (item, value) => {
    document.cookie = `${item}=${value};` 
}
}


const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {

const acceptFn = event => {
    saveToStorage(storageType);
    consentPopup.classList.add('hidden');
}
const  rejectFn = event => {
    consentPopup.classList.add('hidden');
}
const consentPopup = document.getElementById('cookie');
const acceptBtn = document.getElementById('accept');
acceptBtn.addEventListener('click', acceptFn);

const rejectBtn = document.getElementById('reject');
rejectBtn.addEventListener('click', rejectFn);


if (shouldShowPopup(storageType)) {
    setTimeout(() => {
        consentPopup.classList.remove('hidden');
    }, 2000);
}

};

  document.getElementById('sendEmailButton').addEventListener('click', function() {
var email = document.getElementById('emailInput').value;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
new AWN().alert('Per favore, inserisci un indirizzo email valido', {durations: {alert: 4000}})
return; // Stop further execution
}
else {
fetch('/send-email', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ email: email }), // Send the email as JSON
})
.then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // or response.json() if the response is JSON
        })
        .then(data => {
            console.log('Success:', data); 
           // new AWN().success('Grazie per averci contattati!', {durations: {alert: 0}});
           
notifier.confirm(
'Grazie per averci contattati!',
onOk,
false,
{
  labels: {
    confirm: ''
  }
}
)
            document.getElementById('emailInput').value="";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending email');
        });
}
});



let notifier = new AWN();
