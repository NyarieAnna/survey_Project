var listadd=document.querySelector(".surveyadd")
if(listadd){
listadd.addEventListener('click', function(e){
    e.preventDefault();
    window.location.replace('verifysurvcreation.html');
})
}else{
    console.log('I cant do this')
};

