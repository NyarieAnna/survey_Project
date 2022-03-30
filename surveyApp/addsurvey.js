//Submitting the survey name
var surveyname = document.getElementById("txtanswer");
var box; 

var submit = document.getElementById("submit");
if (submit) {
  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    
    var user = localStorage.getItem("userid");
    console.log(user)
    var data = JSON.parse(user);
    let survey = {
      Name: surveyname.value,
      UserId: data,
    };
    let sub = [];
    //post survey
    sub = await postDatasurveys(survey);
    let anna=await sub
    // var json=JSON.stringify(anna)
    sessionStorage.setItem('sur', anna.Id)
    box=sessionStorage.sur;
    console.log(box)
    
    //window.location.replace("createqsn.html");
  });
}
