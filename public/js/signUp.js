const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector("#username-sign-up").value.trim();
    const password = document.querySelector("#password-sign-up").value.trim();
  
    if (userName && password) {
      const response = await fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector("#sign-up-form")
  .addEventListener("click", signupFormHandler);