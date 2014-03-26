/* global $, alertify */
(function initRiddle(window) {
  'use strict';

  var question = {
    topic: 'exceptions',
    body: 'What is the recommended way for throwin an exception?',
    choices: [
      'throw new Exception("Bad things happened");',
      'throw Error("Houston, we have a problem")',
      'throw "A problem"',
      'throw new Error("A problem")'
    ],
    correct: {
      3: true
    }
  };

  var questionProbability = 0.25;

  window.ask = function ask() {
    console.log('asking question');
    if (Math.random() > questionProbability) {
      return $.when();
    }

    var d = $.Deferred();
    var node = $('<p>' + question.body + '</p>');
    question.choices.forEach(function (choice, k) {

      var checkbox = $('<div class="checkbox">');
      var label = $('<label>');
      var inputNode = $('<input type="checkbox" value="' + k + '">' + choice + '</input>');
      label.append(inputNode);
      checkbox.append(label);
      node.append(checkbox);
    });

    var boxOptions = {
      title: question.topic,
      message: node,
      closeButton: false,
      buttons: {
        Submit: function () {
          var checkboxes = $('input', node);
          console.assert(checkboxes.length === question.choices.length, 'invalid checkbox number');
          var wrong = question.choices.some(function (choice, k) {
            var isCorrect = question.correct[k];
            var answered = $(checkboxes[k]).is(':checked');
            return Boolean(isCorrect) !== answered;
          });
          if (wrong) {
            alertify.error('Wrong answer :(');
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
    var box = bootbox.dialog(boxOptions);
    return d.promise();
  };
}(window));
