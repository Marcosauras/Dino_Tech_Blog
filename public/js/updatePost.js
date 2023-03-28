const updatePost = async (e) => {
    e.preventDefault(); 
    const title = document.querySelector("#post-title").value.trim();
    const description = document.querySelector("#post-description").value.trim();
    
    const updateButton = document.querySelector("#update-post-button")
    const postId = updateButton.dataset.id;

    const response = await fetch(`/api/post/${postId}`, {
        method: "PUT", 
        body: JSON.stringify({ title, description }), 
        headers: { "Content-Type": "application/json" }
    });
  
    if (response.ok) {
        console.log(response)
        document.location.replace(`/post/${postId}`);
    } else {
        alert("there was an error");
    }
    
  };
  
  document
    .querySelector("#update-post-button")
    .addEventListener("click", updatePost);