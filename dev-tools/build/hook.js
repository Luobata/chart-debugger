/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hookName", function() { return hookName; });
var hookName = '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__';
var installHook = function installHook(window, hookName) {
    if (window[hookName]) {
        return;
    }
    var listeners = {};
    var hook = {
        installed: false,
        refresh: function refresh() {},
        on: function on(event, fn) {
            event = '$' + event;
            (listeners[event] || (listeners[event] = [])).push(fn);
        },
        once: function once(event, fn) {
            var eventAlias = event;
            event = '$' + event;
            function on() {
                this.off(eventAlias, on);
                fn.apply(this, arguments);
            }
            (listeners[event] || (listeners[event] = [])).push(on);
        },
        off: function off(event, fn) {
            event = '$' + event;
            if (!arguments.length) {
                listeners = {};
            } else {
                var cbs = listeners[event];
                if (cbs) {
                    if (!fn) {
                        listeners[event] = null;
                    } else {
                        for (var i = 0, l = cbs.length; i < l; i++) {
                            var cb = cbs[i];
                            if (cb === fn || cb.fn === fn) {
                                cbs.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        },
        emit: function emit(event) {
            event = '$' + event;
            var cbs = listeners[event];
            if (cbs) {
                var args = [].slice.call(arguments, 1);
                cbs = cbs.slice();
                for (var i = 0, l = cbs.length; i < l; i++) {
                    cbs[i].apply(this, args);
                }
            }
        }
    };
    hook.once('install', function () {
        hook.installed = true;
    });

    Object.defineProperty(window, hookName, {
        get: function get() {
            return hook;
        }
    });
};

var script = document.createElement('script');
script.textContent = ';(' + installHook.toString() + ')(window, "' + hookName + '")';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

/***/ })
/******/ ]);