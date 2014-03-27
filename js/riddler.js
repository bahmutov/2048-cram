/* global $, alertify */
(function initRiddle(window) {
  'use strict';

  var questions = window.questions;
  if (!Array.isArray(questions)) {
    throw new Error('missing questions array');
  }
  if (!questions.length) {
    throw new Error('Zero questions!');
  }

  window.___askInterval = 20 * 1000; // seconds * ms
  var lastAskTime = (new Date()).getTime();

  window.ask = function ask() {
    if ((new Date()).getTime() - lastAskTime < window.___askInterval) {
      return $.when();
    }

    var d = $.Deferred();

    var randomQuestionIndex = Math.floor(Math.random() * questions.length);
    console.assert(randomQuestionIndex >= 0 && randomQuestionIndex < questions.length,
      'invalid random question index ' + randomQuestionIndex);
    var question = questions[randomQuestionIndex];
    var node = $('<p></p>').append(question.question);
    var correctAnswers = Array.isArray(question.correct) ? question.correct : [question.correct];
    var scrambledAnswers = question.choices.map(function (answer, k) {
      return {
        answer: answer,
        correct: correctAnswers.indexOf(k) !== -1
      };
    });
    function randomly() { return 0.5 - Math.random(); }
    scrambledAnswers.sort(randomly);

    var answers = $('<div id="answers">');
    scrambledAnswers.forEach(function (choice, k) {
      var checkbox = $('<div class="checkbox"><label>' +
        '<input type="checkbox" value="' + k + '">' + choice.answer + '</input>' +
        '</label></div>');
      answers.append(checkbox);
    });
    node.append(answers);

    var boxOptions = {
      title: question.topic,
      message: node,
      closeButton: false,
      buttons: {
        Submit: function () {
          lastAskTime = (new Date()).getTime();
          var checkboxes = $('input', node);
          console.assert(checkboxes.length === scrambledAnswers.length, 'invalid checkbox number');
          var wrong = scrambledAnswers.some(function (choice, k) {
            var isCorrect = Boolean(choice.correct);
            var answered = $(checkboxes[k]).is(':checked');
            return isCorrect !== answered;
          });
          if (wrong) {
            alertify.error('Wrong answer :(');
          } else {
            alertify.success('Correct answer!');
          }

          ask.isAsking = false;
          if (wrong) {
            d.reject();
          } else {
            d.resolve(true);
          }
        }
      }
    };
    ask.isAsking = true;
    window.bootbox.dialog(boxOptions);
    return d.promise();
  };
}(window));
