"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var benchmark_1 = require("benchmark");
var outputFn = typeof document === 'undefined'
    ? // eslint-disable-next-line no-console
        console.log
    : function (text) {
        queueMicrotask(function () {
            document.body.innerHTML += "".concat(text.replace('\n', '<br/>'), "<br/>");
        });
    };
function run(testData, libraries) {
    testData.forEach(function (test) {
        var suite = new benchmark_1.Suite(test.name, {
            onStart: function () {
                outputFn("\n# ".concat(test.name));
            },
            onCycle: function (ev) {
                outputFn("  ".concat(String(ev.target)));
            },
            onComplete: function (ev) {
                outputFn(" Fastest is ".concat(ev.currentTarget.filter('fastest').map('name')));
            },
        });
        Object.entries(libraries).forEach(function (_a) {
            var name = _a[0], fn = _a[1];
            suite.add(name, function () { return fn(test.data); });
        });
        suite.run();
    });
}
exports.run = run;
