let username = "rupankar";
let password = "1234" ;
document.getElementById("Login").onclick = () => {
    let inputUsername = document.getElementById("username").value ;
    let inputPassword = document.getElementById("password").value ;
    if ( inputUsername === username && inputPassword === password ) {
        window.location.href = "index.html";
     }
    else{
      alert("Invalid credential!!")
    }
     
}