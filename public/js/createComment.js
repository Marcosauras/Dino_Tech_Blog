const createComment = async (e) => {
    e.preventDefault(); 
  // grabs the comment to be sent to the database
    const comment = document.querySelector("#comment").value.trim();

    const commentButton = document.querySelector("#commentButton")
    const postId = commentButton.dataset.id;
   if  (comment && postId) {
    const response = await fetch(`/api/comment/${postId}`, {
        method: "POST", 
        body: JSON.stringify({ comment }), 
        headers: { "Content-Type": "application/json" }
    });
  
  
    if (response.ok) {
        console.log(response)
        location.reload();
    } else {
        console.log("there was an error");
    }
   }
  };
  
  document
    .querySelector("#commentButton")
    .addEventListener("click", createComment);