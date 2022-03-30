var  surveyListArray = [];
//Loading all surveys on a page
//populating table
const SurveyTable = document.querySelector('.myTable');
class UI {
  static displaySurveys() {
    surveyListArray.forEach(survey => UI.addBookToList(survey));
  }


  static addSurveyToList(survey) {
    const list = document.querySelector('#sur-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${survey.Name}</td>
      <td><button class="${survey.Id} survey">Take Survey</button></td>
    `;

   // console.log(survey.SurveyId);
    if (list != null) {
      list.appendChild(row);
    }
    // console.log(row);
  }

 

  static showQuestions(el) {   
      if (el.classList.contains("survey")) {
        let myId = el.classList[0];
        sessionStorage.setItem("SurveyId", myId)
        console.log(myId)
        window.location.href = "answerqsn.html"
    }
  }

  
}

document.addEventListener('DOMContentLoaded', async () => {
  surveyListArray = await getSurveys();
 // console.log(surveyListArray);
  surveyListArray.forEach((survey) => {
    UI.addSurveyToList(survey)

  });

});


 const surList = document.querySelector('#sur-list')
 if(surList){
    surList.addEventListener("click", (e)=>{
        e.preventDefault();
        UI.showQuestions(e.target)
    })
 }
 
