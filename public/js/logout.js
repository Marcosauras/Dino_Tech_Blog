const logout = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
});

if(response.ok) {
    document.location.replace('/login');
} else {
    alert('An error is present and we are working on fixing it.')
}
}

$('#logout').click(logout);