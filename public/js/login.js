const loginHandler = async (e) => {
  e.preventDefault();
  
  const userName = document.querySelector(`#user-login`).value.trim();
  const password = document.querySelector("#password-login").value.trim();


  if (userName && password) {
    console.log("username and password")
    const response = await fetch('/api/login', {
        method: 'POST', 
        body: JSON.stringify({ userName, password }), 
        headers: { 'Content-Type': 'application/json'}
    });
    const data = await response.json(); 
    if(response.ok) {
        document.location.replace('/dashboard');
    } 
    alert(response.statusText);
  }
}
document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler);