const createPost = async (e) => {
  e.preventDefault(); 
// grabs the title and description
  const title = document.querySelector("#post-title").value.trim();
  const description = document.querySelector("#post-description").value.trim();

 if  (title && description) {
  const response = await fetch("/api/post/", {
      method: "POST", 
      body: JSON.stringify({ title, description }), 
      headers: { "Content-Type": "application/json" }
  });


  if (response.ok) {
      console.log(response)
      document.location.replace("/dashboard");
  } else {
      console.log("there was an error");
  }
 }
};

document
  .querySelector("#create-post")
  .addEventListener("click", createPost);