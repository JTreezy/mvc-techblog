document.querySelector("#editBlog").addEventListener("submit",e=>{
    e.preventDefault()
    const blogObj = {
        title:document.querySelector("#title").value,
        body:document.querySelector("#body").value,
    }
    fetch(`/api/blogs/${document.querySelector("#id").value}`,{
        method:"PUT",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#delete").addEventListener("click",e=>{
    e.preventDefault()
    fetch(`/api/blogs/${document.querySelector("#id").value}`,{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
           location.href='/profile'
        } else {
            alert("trumpet sound")
        }
    })
})


