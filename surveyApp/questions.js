var ListModal = document.querySelector(".modal");

const SurveyTable = document.querySelector(".myTable");
class UI {
  static displaySurveys() {
    surveyListArray.forEach((survey) => UI.addBookToList(survey));
  }

  static addSurveyToList(survey) {
    const list = document.querySelector("#sur-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${survey.Name}</td>
      <td><button class="${survey.Id} survey">View Questions</button></td>
    `;

    // console.log(survey.SurveyId);
    if (list != null) {
      list.appendChild(row);
    }
    // console.log(row);
  }

  static showQuestions(el) {
    if (el.classList.contains("survey")) {
     let id = el.classList[0];
      document.cookie = id + ";path=/";
      ListModal.style.visibility = "visible";
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  surveyListArray = await getSurveys();
  console.log(surveyListArray);
  surveyListArray.forEach((survey) => {
    UI.addSurveyToList(survey);
  });
});

let questions = [];
let filteredQuestions = [];
let dummyQuestions = [];

let Questions = [];
const surList = document.querySelector("#sur-list");
if (surList) {
  surList.addEventListener("click", async (e) => {
    e.preventDefault();
    UI.showQuestions(e.target);
  

Questions = await getQuestions();
console.log(Questions);
let filArr = [];
filArr = Questions.filter((question) => question.SurveyId ===  document.cookie);
console.log(filArr);
filArr.forEach((ques) => UI.showQuestions(ques));

const Done = document.querySelector(".Done");
if(Done){
Done.addEventListener("click", () => {
  ListModal.style.visibility = "hidden";
});
function showQuestions(question) {
  let myPage = document.querySelector(".list");
  if (myPage != null) {
    console.log("im working");
    const row = document.createElement("ol");
    row.innerHTML = `
    <li>${question.text}</li>
    `;
    myPage.appendChild(row);
  }
}
}
});
}
