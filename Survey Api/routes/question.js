class Question {
  constructor(Id, SurveyId,Text) {
    this.Id = Id;
    this.SurveyId = SurveyId;
    this.Text = Text;
    this.QuestionType = QuestionType;
  }
}

module.exports = Question;

