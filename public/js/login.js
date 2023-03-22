const loginHandler = async (e) => {
  e.preventDefault();
  
  const name = document.querySelector(`#user-login`).value.trim();
  const password = document.querySelector("#password-login").value.trim();


  if (name && password) {
    const response = await fetch('/api/user/login', {
        method: 'POST', 
        body: JSON.stringify({ name, password }), 
        headers: { 'Content-Type': 'application/json'}
    });
    if(response.ok) {
        document.location.replace('/');
    } 
    alert(response.statusText);
  }
}
document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler);