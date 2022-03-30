let questionsAnswers = [];
var responseObj;
let submitButton = document.querySelector(".submitting-answers");

submitButton.addEventListener("click", receivedAnswers);
//console.log(dummyQuestions);
function receivedAnswers() {
  dummyQuestions.forEach(({ questionId, type }) => {
    if (type == questionTypes.yesNo || type == questionTypes.radioGroup) {
      let answers = document.querySelectorAll(`[id='${questionId}']`);

      questionsAnswers.push({
        QuestionId: questionId,
        answer: [...answers].find((elmnt) => elmnt.checked == true).value,
      });
      return;
    } else if (type == questionTypes.multiCheckBox) {
      let answers = [...document.querySelectorAll(`[id='${questionId}']`)];

      answers = answers
        .filter((elmnt) => elmnt.checked)
        .map((elnt) => elnt.value);

      questionsAnswers.push({
        QuestionId: questionId,
        answer: answers,
      });
      return;
    }

    questionsAnswers.push({
      QuestionId: questionId,
      answer: document.querySelector(`[id='${questionId}']`).value,
    });
  });
  console.log("checking....", questionsAnswers);
  SubmitResponse();
  window.location.replace("Coverpage.html")
}

async function SubmitResponse() {
  let surveyid = sessionStorage.getItem("SurveyId");
  var user = localStorage.getItem("userid");
  console.log(user);
  var data = JSON.parse(user);

  let Response = {
    SurveyId: surveyid,
    UserId: data,
  };

  responseObj = await postResponseData(Response);
  console.log(responseObj);
  getAnswers();
}

async function SubmitAnswers(answers) {
  let answer = [];
  answer = await postAnswerData(answers);
  console.log("answers to be posted", answers);
  // await Swal.fire(
  //   '',
  //   'Successful, Thank you for taking the survey',
  //   'success'
  // )
  //location.href = 'landingpage.html'
  // console.log(answer)
}
function getAnswers() {
  // let surveyid = sessionStorage.getItem('SurveyId');
  let ResponseId = responseObj.Id;

  //let myArr = [];

  questionsAnswers.forEach((answers) => {
    Answers = {
      ResponseId,
      text: answers.answer,
      QuestionId: answers.QuestionId,
    };

    SubmitAnswers(Answers);

  });
}
