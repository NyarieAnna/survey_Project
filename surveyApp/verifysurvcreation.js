var createsurvey = document.getElementById("continue-btn");
var decline=document.getElementsByClassName("close-btn");

if(createsurvey){
createsurvey.addEventListener('click', function(e){
    e.preventDefault();
    window.location.replace('addsurvey.html');
    console.log('addie');
});
}else{
    window.location.replace('addsurvey.html');
}