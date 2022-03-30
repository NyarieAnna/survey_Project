var form = document.querySelector(".submitbtn");
var username = document.getElementById("username");
var password = document.getElementById("password");
var fullname = document.getElementById("fname");
var uname = document.getElementById("uname");
var email = document.getElementById("email");
var number = document.getElementById("number");
var password1 = document.getElementById("password1");
var cpassword = document.getElementById("cpassword");

var isadmin;

//Signingup
var signup = document.getElementById("signup");
if (signup) {
  signup.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("working");
    let userObject = {
      FullName: fullname.value,
      UserName: uname.value,
      Email: email.value,
      PhoneNumber: number.value,
      Password: password1.value,
      IsAdmin: isadmin,
    };
    console.log(userObject);
    if (userObject.Password === cpassword.value) {
      let SigningUp = [];
      SigningUp = await postData(userObject);
      window.location.replace("Loginform.html");
      console.log(SigningUp);
    } else {
      alert("passwords are not the same");
    }
  });
}

//Validating the login form
const lgForm = document.querySelector("#submitbn");
if (lgForm) {
  lgForm.addEventListener("click", async (e) => {
    e.preventDefault();
    let returnedValues = [];
    let userCredentials = {
      UserName: document.querySelector("#username").value,
      Password: document.querySelector("#password").value,
    };

    returnedValues = await postDatalogin(userCredentials);
    let userCred = "";
    let users = await getUsersData();
    console.log(users);
    userCred = users.find((user) => user.UserName === userCredentials.UserName);
    console.log(userCred);
    var respondent = document.getElementById("respondent").value;
    var admin = document.getElementById("admin").value;

    if (document.getElementById("admin").checked) {
      var admin = document.getElementById("admin").value;
      if (
        returnedValues.IsAdmin === admin &&
        returnedValues.UserName === userCredentials.UserName &&
        returnedValues !== false
      ) {
        var json = JSON.stringify(userCred.Id);
        localStorage.setItem("userid", json);
        console.log(userCred);
        location.href = "adminsurveylist.html";
      } else {
        alert("wrong username or password");
      }
    } else if (document.getElementById("respondent").checked) {
      var respondent = document.getElementById("respondent").value;
      if (
        returnedValues.IsAdmin === respondent &&
        returnedValues.UserName === userCredentials.UserName &&
        returnedValues !== false
      ) {
        var json = JSON.stringify(userCred.Id);
        localStorage.setItem("userid", json);
        console.log(json);
        location.href = "Respondentsurveylist.html";
      } else {
        alert("wrong username or password");
      }
    } else {
      alert("wrong username or password");
    }
  });
}

//Posting the questions
let qsnArry = [];
var saveQsn = document.querySelector(".addqsn");
if (saveQsn) {
  saveQsn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    var question = document.querySelector(".txtquestion");
    var surv = sessionStorage.getItem("survey");
    var myId = JSON.parse(surv);

    var type;
    if (document.querySelector("#qsntype").value === "Input-field") {
      type = 0;
    } else if (document.querySelector("#qsntype").value === "Yes/No") {
      type = 1;
    } else if (document.querySelector("#qsntype").value === "Range") {
      type = 2;
    }

    // var SurId = surveyArr.SurveyId;

    let newQuestion = {
      SurveyId: myId.Id,
      Text: question.value,
      QuestionType: type,
    };
    qsnArry = await postQuestionData(newQuestion);
    console.log(qsnArry);
    location.replace("createqsn.html");
  });
}
//completing the survey
var survcomplete = document.querySelector("#submitqsn");
if (survcomplete) {
  survcomplete.addEventListener("click", (e) => {
    window.location.replace("adminsurveylist.html");
  });
}
