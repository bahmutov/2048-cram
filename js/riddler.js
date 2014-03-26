/* global $, alertify */
(function initRiddle(window) {
  'use strict';

  var questions = [{
    topic: 'exceptions',
    question: 'What is the <b>recommended</b> way for throwing an exception?',
    choices: [
      'throw new Exception("Bad things happened");',
      'throw Error("Houston, we have a problem")',
      'throw "A problem"',
      'throw new Error("A problem")'
    ],
    correct: [3]
  }, {
    topic: 'exceptions',
    question: 'Which Error types are part of the EcmaScript 5 standard?',
    choices: [
      'EvalError',
      'ReferenceError',
      'SyntaxError',
      'TypeError',
      'EventError',
      'StateError',
      'FunctionError'
    ],
    correct: [1, 2, 3]
  }, {
    topic: 'exceptions',
    question: 'How do you quickly pass additional information with the exception?',
    choices: [
      'throw new Error("Message", arg1, arg2)',
      'var e = new Error("Message"); e.one = arg1; throw e;',
      'throw new CustomError("Message", arg1, arg2)',
      'throw new Error("Message " + JSON.stringify(arg1))'
    ],
    correct: [3]
  }, {
    topic: 'exceptions',
    question: 'Which properties does Error instance typically have?',
    choices: [
      'type',
      'name',
      'message',
      'stack',
      'timestamp'
    ],
    correct: [2, 3]
  }, {
    topic: 'exceptions',
    question: 'What is the value of <em>a</em> after this code runs?\n' +
      '<pre>var a = 1;\n' +
      'try {\n' +
      '  throw new Error(a);\n' +
      '  a = 2;\n' +
      '} catch (err) {\n' +
      '  a = err.message;\n' +
      '}</pre>',
    choices: [
      'a = 1',
      'a = 2',
      'a = undefined',
      'a = "1"',
      'a = "2"',
      'a = "Error"'
    ],
    correct: [3]
  }, {
    topic: 'exceptions',
    question: 'What does this code throw? <pre>new Array(-1)</pre>',
    choices: [
      'RangeError', 'ReferenceError', 'SyntaxError', 'Error', 'InvalidArgumentError',
      'InvalidIndexError', 'Nothing, works just fine'
    ],
    correct: [0]
  }, {
    topic: 'exceptions',
    question: 'What does this code throw? <pre>var foo = bar + 1</pre>',
    choices: [
      'Error', 'ReferenceError', 'TypeError', 'SyntaxError', 'Nothing, works just fine'
    ],
    correct: [1]
  }, {
    topic: 'exceptions',
    question: 'What does this throw in a browser? <pre>console.assert(false, "bad value")</pre>',
    choices: [
      'Error', 'ReferenceError', 'TypeError', 'SyntaxError', 'Throws nothing'
    ],
    correct: [4]
  }];

  var questionProbability = 0.1;

  window.ask = function ask() {
    if (Math.random() > questionProbability) {
      return $.when();
    }

    var d = $.Deferred();

    var randomQuestionIndex = Math.floor(Math.random() * questions.length);
    console.assert(randomQuestionIndex >= 0 && randomQuestionIndex < questions.length,
      'invalid random question index ' + randomQuestionIndex);
    var question = questions[randomQuestionIndex];
    var node = $('<p></p>').append(question.question);
    var scrambledAnswers = question.choices.map(function (answer, k) {
      return {
        answer: answer,
        correct: question.correct.indexOf(k) !== -1
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
            d.resolve();
          }
        }
      }
    };
    ask.isAsking = true;
    window.bootbox.dialog(boxOptions);
    return d.promise();
  };
}(window));
