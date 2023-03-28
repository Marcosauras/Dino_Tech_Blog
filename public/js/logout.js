const logout = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
});

if(response.ok) {
    document.location.replace('/dashboard');
} else {
    console.log('An error is present and we are working on fixing it.')
}
}

document.querySelector('#logout').addEventListener('click', logout);