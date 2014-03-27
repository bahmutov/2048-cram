(function getQuestions() {
  'use strict';

  /* global multiline */
  if (typeof multiline !== 'function') {
    throw new Error('missing multiline function');
  }

  var questions = [{
    topic: 'exceptions',
    question: multiline(function () {
/*
What is the exact value of <em>a</em> after this code runs?
<pre>
var a = 1;
try {
  throw new Error(a);
  a = 2;
} catch (err) {
  a = err.message;
}</pre>
*/
    }),
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

  window.questions = questions;
}());
