/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dank-do-while";
exports.ids = ["vendor-chunks/dank-do-while"];
exports.modules = {

/***/ "(rsc)/./node_modules/dank-do-while/index.js":
/*!*********************************************!*\
  !*** ./node_modules/dank-do-while/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("// usage:\n//\n// doWhile(function (next) {\n//   doAsyncThing(function (err, result) {\n//     //passing truthy to next() will call this anonymous function again\n//     //passing falsy to next() will call the done function (if exists)\n//     return next(result !== 'done');  \n//   });\n// }\n// , function () {\n//   return cb()\n// }, 3) //concurrency\n//\n\nmodule.exports = function doWhile (fn, done, concurrent) {\n  var pending = 0;\n  var end = false;\n  concurrent = concurrent || 1;\n\n  for (var x = 0; x < concurrent; x++) {\n    run(fn)\n  }\n  \n  function run (fn) {\n    setImmediate(function() {\n      pending += 1;\n      fn(function (cont) {\n        pending -= 1;\n\n        if (!cont) {\n          end = true;\n        }\n\n        if (!end) {\n          run(fn)\n        }\n        else if (end && pending === 0) {\n          done();\n        }\n      })\n    })\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZGFuay1kby13aGlsZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXJlbGlhLW9zLy4vbm9kZV9tb2R1bGVzL2RhbmstZG8td2hpbGUvaW5kZXguanM/M2E5ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2FnZTpcbi8vXG4vLyBkb1doaWxlKGZ1bmN0aW9uIChuZXh0KSB7XG4vLyAgIGRvQXN5bmNUaGluZyhmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbi8vICAgICAvL3Bhc3NpbmcgdHJ1dGh5IHRvIG5leHQoKSB3aWxsIGNhbGwgdGhpcyBhbm9ueW1vdXMgZnVuY3Rpb24gYWdhaW5cbi8vICAgICAvL3Bhc3NpbmcgZmFsc3kgdG8gbmV4dCgpIHdpbGwgY2FsbCB0aGUgZG9uZSBmdW5jdGlvbiAoaWYgZXhpc3RzKVxuLy8gICAgIHJldHVybiBuZXh0KHJlc3VsdCAhPT0gJ2RvbmUnKTsgIFxuLy8gICB9KTtcbi8vIH1cbi8vICwgZnVuY3Rpb24gKCkge1xuLy8gICByZXR1cm4gY2IoKVxuLy8gfSwgMykgLy9jb25jdXJyZW5jeVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkb1doaWxlIChmbiwgZG9uZSwgY29uY3VycmVudCkge1xuICB2YXIgcGVuZGluZyA9IDA7XG4gIHZhciBlbmQgPSBmYWxzZTtcbiAgY29uY3VycmVudCA9IGNvbmN1cnJlbnQgfHwgMTtcblxuICBmb3IgKHZhciB4ID0gMDsgeCA8IGNvbmN1cnJlbnQ7IHgrKykge1xuICAgIHJ1bihmbilcbiAgfVxuICBcbiAgZnVuY3Rpb24gcnVuIChmbikge1xuICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgIHBlbmRpbmcgKz0gMTtcbiAgICAgIGZuKGZ1bmN0aW9uIChjb250KSB7XG4gICAgICAgIHBlbmRpbmcgLT0gMTtcblxuICAgICAgICBpZiAoIWNvbnQpIHtcbiAgICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICBydW4oZm4pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZW5kICYmIHBlbmRpbmcgPT09IDApIHtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/dank-do-while/index.js\n");

/***/ })

};
;