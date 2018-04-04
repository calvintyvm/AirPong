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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SVG_NS = exports.SVG_NS = 'http://www.w3.org/2000/svg';

var KEYS = exports.KEYS = {
    w: 'w', // player 1
    s: 's', // player 1
    a: 'a', // player 1
    d: 'd',
    up: 'ArrowUp', //player 2
    down: 'ArrowDown', // player 2 
    left: 'ArrowLeft',
    right: 'ArrowRight',
    spaceBar: ' ', //pause the game
    g: 'g',
    enter: 'Enter'

};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(radius, boardWidth, boardHeight) {
    _classCallCheck(this, Ball);

    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.ping = new Audio('public/sounds/pong-01.wav');
    this.goal1 = new Audio('public/sounds/goal.mp3');

    this.reset();
  }

  _createClass(Ball, [{
    key: 'reset',
    value: function reset() {
      this.x = this.boardWidth / 2;
      this.y = this.boardHeight / 2;

      this.vy = 0;
      while (this.vy === 0) {
        this.vy = Math.floor(Math.random() * 10 - 5);
      }

      this.vx = this.direction * (6 - Math.abs(this.vy));
    }
  }, {
    key: 'goal',
    value: function goal(player) {

      player.score++;

      this.reset();
    }
  }, {
    key: 'wallCollision',
    value: function wallCollision() {
      var hitLeft = this.x - this.radius <= 0;
      var hitRight = this.x + this.radius >= this.boardWidth;
      var hitTop = this.y - this.radius <= 0;
      var hitBottom = this.y + this.radius >= this.boardHeight;

      if (hitTop || hitBottom) {
        this.vy = -this.vy;
      } else if (hitLeft || hitRight) {
        //this.reset();
        this.vx = -this.vx;
      }
    }
  }, {
    key: 'paddleCollision',
    value: function paddleCollision(player1, player2) {
      if (this.vx > 0) {
        var paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);

        var _paddle = _slicedToArray(paddle, 4),
            leftX = _paddle[0],
            rightX = _paddle[1],
            topY = _paddle[2],
            bottomY = _paddle[3];

        if (this.x + this.radius >= leftX && this.x + this.radius <= rightX && this.y >= topY && this.y <= bottomY) {

          this.vx = -this.vx;
          this.ping.play();
        }
      } else {
        var _paddle2 = player1.coordinates(player1.x, player1.y, player1.width, player1.height);

        var _paddle3 = _slicedToArray(_paddle2, 4),
            _leftX = _paddle3[0],
            _rightX = _paddle3[1],
            _topY = _paddle3[2],
            _bottomY = _paddle3[3];

        if (this.x - this.radius <= _rightX && this.x - this.radius >= _leftX && this.y > _topY && this.y <= _bottomY) {

          this.vx = -this.vx;

          this.ping.play();
        }
      }
    }
  }, {
    key: 'render',
    value: function render(svg, player1, player2) {

      this.x += this.vx;
      this.y += this.vy;

      this.wallCollision();
      this.paddleCollision(player1, player2);

      var circle = document.createElementNS(_settings.SVG_NS, 'circle');
      circle.setAttributeNS(null, 'fill', 'black'), circle.setAttributeNS(null, 'r', this.radius), circle.setAttributeNS(null, 'cx', this.x), circle.setAttributeNS(null, 'cy', this.y);

      svg.appendChild(circle);

      var rightGoal = this.x + this.radius >= this.boardWidth;
      var leftGoal = this.x - this.radius <= 0;

      if (rightGoal) {

        this.goal(player1);
        this.direction = 1;
      } else if (leftGoal) {
        this.direction = -1;
        this.goal(player2);
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/slkscr-webfont.eot";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

var _Board = __webpack_require__(9);

var _Board2 = _interopRequireDefault(_Board);

var _Paddle = __webpack_require__(11);

var _Paddle2 = _interopRequireDefault(_Paddle);

var _Ball = __webpack_require__(1);

var _Ball2 = _interopRequireDefault(_Ball);

var _Score = __webpack_require__(12);

var _Score2 = _interopRequireDefault(_Score);

var _Net = __webpack_require__(10);

var _Net2 = _interopRequireDefault(_Net);

var _Win = __webpack_require__(13);

var _Win2 = _interopRequireDefault(_Win);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(element, width, height) {
		var _this = this;

		_classCallCheck(this, Game);

		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);

		this.extraBalls = [];
		this.extraBalls = [];
		this.board = new _Board2.default(this.width, this.height);
		this.paddleWidth = 8;
		this.paddleHeight = 50;
		this.boardGap = 10;
		this.netWidth = 0;
		this.netHeight = this.height;

		this.player1 = new _Paddle2.default(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, (this.height - this.paddleHeight) / 2, _settings.KEYS.w, _settings.KEYS.s, 'player1');

		this.player2 = new _Paddle2.default(this.height, this.paddleWidth, this.paddleHeight, this.width - this.paddleWidth - this.boardGap, (this.height - this.paddleHeight) / 2, _settings.KEYS.up, _settings.KEYS.down, 'player2');

		this.ball = new _Ball2.default(15, this.width, this.height);

		this.net1 = new _Net2.default(this.netWidth, this.netHeight);

		this.net2 = new _Net2.default(this.width, this.netHeight);

		document.addEventListener('keydown', function (event) {

			switch (event.key) {
				case _settings.KEYS.spaceBar:
					_this.pause = !_this.pause;
					break;
			}
		});

		document.addEventListener('keydown', function (event) {

			switch (event.key) {
				case _settings.KEYS.g:

					_this.extraBalls.push(new _Ball2.default(15, _this.width, _this.height));
					break;
			}
		});

		this.winScreen = new _Win2.default(this.width, this.height);

		this.score1 = new _Score2.default(this.width / 2 - 50, 30, 30);
		this.score2 = new _Score2.default(this.width / 2 + 25, 30, 30);
		this.winScreen = new _Win2.default(this.width, this.height);
	} // end of the constructor


	_createClass(Game, [{
		key: 'makeBall',
		value: function makeBall() {
			new _Ball2.default(15, 200, 200);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.pause) {
				return;
			}

			this.gameElement.innerHTML = '';
			var svg = document.createElementNS(_settings.SVG_NS, 'svg');
			svg.setAttributeNS(null, 'width', this.width);
			svg.setAttributeNS(null, 'height', this.height);
			svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.width + ' ' + this.height);

			this.board.render(svg);
			this.net1.render(svg);
			this.net2.render(svg);
			this.player1.render(svg);
			this.player2.render(svg);
			var myPlayer1 = this.player1;
			var myPlayer2 = this.player2;
			this.extraBalls.forEach(function (el) {
				el.render(svg, this.player1, this.player2);
			}, this);
			this.ball.render(svg, this.player1, this.player2);
			this.score1.render(svg, this.player1.score);
			this.score2.render(svg, this.player2.score);

			if (this.player1.score === 10 || this.player2.score === 10) {
				this.winScreen.render(svg);
				this.pause = true;
				this.ball.reset();

				document.addEventListener('keydown', function (event2) {
					switch (event2.key) {
						case _settings.KEYS.enter:
							_this2.player1.score = 0;
							_this2.player2.score = 0;
							_this2.pause = false;

					}
				});
			}

			// 

			this.gameElement.appendChild(svg);
		}
	}]);

	return Game;
}();

exports.default = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./game.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./game.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./reset.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./reset.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

__webpack_require__(6);

var _Game = __webpack_require__(5);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a game instance
var game = new _Game2.default('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board(width, height) {
        _classCallCheck(this, Board);

        this.width = width;
        this.height = height;
    }

    _createClass(Board, [{
        key: 'render',
        value: function render(svg) {
            var rect = document.createElementNS(_settings.SVG_NS, 'rect');
            rect.setAttributeNS(null, 'fill', 'white');
            rect.setAttributeNS(null, 'height', this.height);
            rect.setAttributeNS(null, 'width', this.width);
            rect.setAttributeNS(null, 'stroke', 'black');

            var line = document.createElementNS(_settings.SVG_NS, 'line');
            line.setAttributeNS(null, 'x1', this.width / 2);
            line.setAttributeNS(null, 'y1', 0);
            line.setAttributeNS(null, 'x2', this.width / 2);
            line.setAttributeNS(null, 'y2', this.height);
            line.setAttributeNS(null, 'stroke-width', '4');

            var circle = document.createElementNS(_settings.SVG_NS, 'circle');
            circle.setAttributeNS(null, 'r', 30), circle.setAttributeNS(null, 'cx', this.width / 2), circle.setAttributeNS(null, 'cy', this.height / 2);
            circle.setAttributeNS(null, 'fill', 'white');
            circle.setAttributeNS(null, 'stroke', 'blue');

            svg.appendChild(rect);
            svg.appendChild(line);
            svg.appendChild(circle);
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
  }

  _createClass(Board, [{
    key: 'render',
    value: function render(svg) {

      // let circle = document.createElementNS(SVG_NS, 'circle');
      // circle.setAttributeNS(null,'r',40),
      // circle.setAttributeNS(null,'cx', '0'),
      // circle.setAttributeNS(null,'cy',this.height/2);
      // circle.setAttributeNS(null,'fill','skyblue');
      // circle.setAttributeNS(null,'stroke', 'red');

      var circle = document.createElementNS(_settings.SVG_NS, 'circle');
      circle.setAttributeNS(null, 'r', 125), circle.setAttributeNS(null, 'cx', this.width);
      circle.setAttributeNS(null, 'cy', this.height / 2);
      circle.setAttributeNS(null, 'fill', 'skyblue');
      circle.setAttributeNS(null, 'stroke', 'red');

      svg.appendChild(circle);
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

var _Ball = __webpack_require__(1);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = function () {
  function Paddle(boardHeight, width, height, x, y, up, down, player) {
    var _this = this;

    _classCallCheck(this, Paddle);

    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    // document.addEventListener('keydown', event => {
    //         switch (event.key) {
    //           case up:
    //             this.up();
    //             break;
    //           case down:
    //             this.down();
    //             break;
    //         }
    //       });
    this.player = player;
    this.keyState = {};
    document.addEventListener('keydown', function (event) {
      _this.keyState[event.key || event.which] = true;
    }, true);
    document.addEventListener('keyup', function (event) {
      _this.keyState[event.key || event.which] = false;
    }, true);
  } // constructor


  _createClass(Paddle, [{
    key: 'up',
    value: function up() {
      // this.y = this.y - this.speed;
      this.y = Math.max(0, this.y - this.speed);
    }
  }, {
    key: 'down',
    value: function down() {
      // this.y = this.y + this.speed;
      this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }
  }, {
    key: 'left',
    value: function left() {
      // this.y = this.y - this.speed;
      this.x = Math.max(0, this.x - this.speed);
    }
  }, {
    key: 'right',
    value: function right() {
      // this.y = this.y + this.speed;
      this.x = Math.min(this.x + this.speed, this.boardHeight - this.height);
    }
  }, {
    key: 'right1',
    value: function right1() {
      // this.y = this.y - this.speed;

      this.x = Math.min(this.x + this.speed, 500);
    }
  }, {
    key: 'left1',
    value: function left1() {
      // this.y = this.y + this.speed;
      this.x = Math.max(this.boardHeight + 23, this.x - this.speed);
    }
  }, {
    key: 'coordinates',
    value: function coordinates(x, y, width, height) {
      var leftX = x;
      var rightX = x + width;
      var topY = y;
      var bottomY = y + height;
      return [leftX, rightX, topY, bottomY];
    }

    //Render SVG images

  }, {
    key: 'render',
    value: function render(svg) {
      var rect = document.createElementNS(_settings.SVG_NS, 'rect');
      rect.setAttributeNS(null, 'fill', 'red'), rect.setAttributeNS(null, 'height', this.height), rect.setAttributeNS(null, 'width', this.width), rect.setAttributeNS(null, 'x', this.x), rect.setAttributeNS(null, 'y', this.y);

      // Player movement
      if (this.keyState['w'] && this.player === 'player1') {
        this.up();
      }
      if (this.keyState['s'] && this.player === 'player1') {
        this.down();
      }
      if (this.keyState['a'] && this.player === 'player1') {
        this.left();
      }
      if (this.keyState['d'] && this.player === 'player1') {
        this.right();
      }
      if (this.keyState['ArrowUp'] && this.player === 'player2') {
        this.up();
      }
      if (this.keyState['ArrowDown'] && this.player === 'player2') {
        this.down();
      }

      if (this.keyState['ArrowRight'] && this.player === 'player2') {
        this.right1();
      }
      if (this.keyState['ArrowLeft'] && this.player === 'player2') {
        this.left1();
      }

      svg.appendChild(rect);
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

var _Ball = __webpack_require__(1);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
  function Score(x, y, size) {
    _classCallCheck(this, Score);

    this.x = x;
    this.y = y;
    this.size = size;
  }

  _createClass(Score, [{
    key: 'render',
    value: function render(svg, score) {

      var text = document.createElementNS(_settings.SVG_NS, 'text');
      text.setAttributeNS(null, 'x', this.x);
      text.setAttributeNS(null, 'y', this.y);
      text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
      text.setAttributeNS(null, 'font-size', this.size);
      text.setAttributeNS(null, 'fill', 'black');
      text.textContent = score;

      svg.appendChild(text);
    }
  }]);

  return Score;
}();

exports.default = Score;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Win = function () {
  function Win(width, height) {
    _classCallCheck(this, Win);

    this.boardWidth = width;
    this.boardHeight = height;
  }

  _createClass(Win, [{
    key: 'render',
    value: function render(svg) {
      var text = document.createElementNS(_settings.SVG_NS, 'text');
      text.setAttributeNS(null, 'x', this.boardWidth / 2 - 125);
      text.setAttributeNS(null, 'y', this.boardHeight / 2);
      text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
      text.setAttributeNS(null, 'font-size', 50);
      text.setAttributeNS(null, 'fill', 'black');
      text.textContent = 'YOU WIN!';

      var text2 = document.createElementNS(_settings.SVG_NS, 'text');
      text2.setAttributeNS(null, 'x', this.boardWidth / 2 - 150);
      text2.setAttributeNS(null, 'y', this.boardHeight / 2 + 25);
      text2.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
      text2.setAttributeNS(null, 'font-size', 20);
      text2.setAttributeNS(null, 'fill', 'red');
      text2.textContent = 'Press ENTER to play again';

      svg.appendChild(text);
      svg.appendChild(text2);
    }
  }]);

  return Win;
}();

exports.default = Win;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/**\n * FONTS\n */\n\n@font-face {\n  font-family: 'Silkscreen Web';\n  src: url(" + __webpack_require__(3) + ");\n  src: url(" + __webpack_require__(3) + "?#iefix) format('embedded-opentype'),\n    url(" + __webpack_require__(18) + ") format('woff'),\n    url(" + __webpack_require__(17) + ") format('truetype'),\n    url(" + __webpack_require__(16) + "#silkscreennormal) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n/**\n * GAME\n */\n\nhtml {\n  font-size: 16px;\n}\n\nbody {\n  align-items: center;\n  display: flex;\n  font-family: 'Silkscreen Web', monotype;\n  height: 100vh;\n  justify-content: center;\n  width: 100%;\n\n}\n\nh1 {\n  font-size: 2.5rem;\n  margin-bottom: 1rem; \n  text-align: center;\n  \n}\n\n\nline{\n  stroke: black;\n  stroke-width: 4;\n}\n\nh3{\n  text-align:center;\n}\n\n.text{\n  line-height:25px;\n\n}\n\n\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/slkscr-webfont.svg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/slkscr-webfont.ttf";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fonts/slkscr-webfont.woff";

/***/ })
/******/ ]);