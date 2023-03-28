const deletePost = async (postId) => {
    // deletes the post by the postId, Post id is getting passed into the function from dashboard.handlebars
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success' 
            )
        location.reload();
    } else {
        Swal.fire(
            'there was an error',
            'try again'
            )
    }
}
