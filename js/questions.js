(function getQuestions() {
  'use strict';

  /* global multiline */
  if (typeof multiline !== 'function') {
    throw new Error('missing multiline function');
  }

  var builtinTypes = [];
  builtinTypes.push({
    topic: 'built-in types',
    question: 'How do you cast <strong>foo</strong> to Boolean true/false?',
    choices: [
      '(Boolean)foo',
      'Boolean(foo)',
      '!!foo',
      '~foo',
      'foo || foo'
    ],
    correct: [1, 2]
  });
  builtinTypes.push({
    topic: 'built-in types',
    question: 'How do you cast <strong>foo</strong> to Number?',
    choices: [
      '+foo',
      'Number(foo)',
      'parseInt(foo, 10)',
      '1 + foo'
    ],
    correct: [0, 1, 2]
  });
  builtinTypes.push({
    topic: 'built-in types',
    question: 'How do you check if <strong>foo</strong> is a Number?',
    choices: [
      'typeof foo === "number"',
      'foo instanceof Number',
      'isNumber(foo)',
      '!isNaN(foo)',
      'foo === +foo'
    ],
    correct: [0, 4]
  });
  builtinTypes.push({
    topic: 'built-in',
    question: 'What is the value returned by <pre>[1, undefined, null].length</pre>',
    choices: ['0', '1', '2', '3', '4', 'undefined', 'throws RangeError'],
    correct: 3
  });

  var exceptionsQuestions = [{
    topic: 'exceptions',
    question: multiline(function () {
/*
What is the exact value of <strong>a</strong> after this code runs?
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
    correct: 3
  }, {
    topic: 'exceptions',
    question: 'What is the <b>recommended</b> way for throwing an exception?',
    choices: [
      'throw new Exception("Bad things happened");',
      'throw Error("Houston, we have a problem")',
      'throw "A problem"',
      'throw new Error("A problem")'
    ],
    correct: 3
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
    correct: 3
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
    correct: 0
  }, {
    topic: 'exceptions',
    question: 'What does this code throw? <pre>var foo = bar + 1</pre>',
    choices: [
      'Error', 'ReferenceError', 'TypeError', 'SyntaxError', 'Nothing, works just fine'
    ],
    correct: 1
  }, {
    topic: 'exceptions',
    question: 'What does this throw in a browser? <pre>console.assert(false, "bad value")</pre>',
    choices: [
      'Error', 'ReferenceError', 'TypeError', 'SyntaxError', 'Throws nothing'
    ],
    correct: 4
  }];

  var miscQuestions = [];
  miscQuestions.push({
    topic: 'misc',
    question: 'What is returned when you enter <pre>typeof typeof null</pre>',
    choices: [
      'null', 'undefined', '""', 'false', 'true', '0', 'string', 'number', 'throws an error', 'nothing'
    ],
    correct: 6
  });
  miscQuestions.push({
    topic: 'misc',
    question: multiline(function () {/*
Why do we see this code sometimes?
<pre>
(function (undefined) {
  ...
}());
</pre>
*/
    }),
    choices: [
      'people have nothing better to do',
      'undefined is null',
      'undefined should be null',
      'undefined could be redefined in EcmaScript 3',
      'undefined should not be used as argument',
      'this throws SyntaxError',
      'this throws TypeError',
      'this throws Error'
    ],
    correct: 3
  });
  miscQuestions.push({
    topic: 'misc',
    question: multiline(function () {/*
Why do we see library code starting with semi-colon sometimes?
<pre>
;(function () {
  ...
}());
</pre>
*/
    }),
    choices: [
      '; are free, no harm',
      'this prevents concatenation errors',
      'this is EcmaScript 3 standard',
      'Douglas Crockford said so',
      'JIT compiler needs boundaries',
      'to allow JSON-P calls',
      'to prevent infinite loops'
    ],
    correct: 1
  });
  miscQuestions.push({
    topic: 'misc',
    question: '<strong>"use strict";</strong> is used to (select all)',
    choices: [
      'prevent exceptions and be strict and silent',
      'cause exceptions and be strict failures',
      'support older browsers to some degree',
      'avoid evil eval',
      'Douglas Crockford said so'
    ],
    correct: [1, 2, 3]
  });
  miscQuestions.push({
    topic: 'misc',
    question: 'What is the <strong>preferred</strong> way of checking ' +
      'if variable <strong>foo</strong> is not a number and cannot be converted into one?',
    choices: [
      'isNaN(foo)',
      'foo !== +foo',
      'foo !== Number(foo)',
      '!isNumber(foo)',
      'foo != +foo',
      '!isFinite(foo)',
      'typeof foo !== "number"',
      'Number(foo) === Math.Infinity'
    ],
    correct: 0
  });
  miscQuestions.push({
    topic: 'misc',
    question: 'JavaScript is (select all that apply)',
    choices: [
      'statically typed',
      'statically checked',
      'dynamically typed',
      'block-scoped',
      'lexically scoped',
      'functionally scoped',
      'without built-in types',
      'without type support'
    ],
    correct: [2, 4, 5]
  });
  miscQuestions.push({
    topic: 'misc',
    question: 'JavaScript hoists:',
    choices: [
      'variable declarations',
      'functions',
      'functional expressions',
      'variable assignments',
      'variable blocks',
      'nothing',
      'depends on run-time or browser'
    ],
    correct: [0, 1]
  });
  miscQuestions.push({
    topic: 'misc',
    question: '<strong>console.trace()</strong>',
    choices: [
      'prints current stack trace',
      'profiles execution time',
      'starts debugging session',
      'measures how long a function takes to execute'
    ],
    correct: 0
  });

  window.questions = miscQuestions.concat(exceptionsQuestions, builtinTypes);
}());
