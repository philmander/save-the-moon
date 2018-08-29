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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var has = Object.prototype.hasOwnProperty, prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() { }
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__)
        prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
    else
        emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
        emitter._events = new Events();
    else
        delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
        return names;
    for (name in (events = this._events)) {
        if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
        return [];
    if (handlers.fn)
        return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
    }
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
        return 0;
    if (listeners.fn)
        return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
        return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once)
            this.removeListener(event, listeners.fn, undefined, true);
        switch (len) {
            case 1: return listeners.fn.call(listeners.context), true;
            case 2: return listeners.fn.call(listeners.context, a1), true;
            case 3: return listeners.fn.call(listeners.context, a1, a2), true;
            case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
    }
    else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
            if (listeners[i].once)
                this.removeListener(event, listeners[i].fn, undefined, true);
            switch (len) {
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args)
                        for (j = 1, args = new Array(len - 1); j < len; j++) {
                            args[j - 1] = arguments[j];
                        }
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
        return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn &&
            (!once || listeners.once) &&
            (!context || listeners.context === context)) {
            clearEvent(this, evt);
        }
    }
    else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn ||
                (once && !listeners[i].once) ||
                (context && listeners[i].context !== context)) {
                events.push(listeners[i]);
            }
        }
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
        else
            clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
            clearEvent(this, evt);
    }
    else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
//
// Expose the module.
//
if (true) {
    module.exports = EventEmitter;
}


/***/ }),

/***/ "./src/core/BaseSprite.ts":
/*!********************************!*\
  !*** ./src/core/BaseSprite.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseSprite; });
class BaseSprite {
    constructor() {
        this._dx = 0;
        this._dy = 0;
        this._scoreModifier = 0;
    }
    play(sfx) {
        const audio = new Audio(sfx);
        audio.play();
    }
    get spriteImage() {
        return this._spriteImage;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get strength() {
        return this._strength;
    }
    get scoreModifier() {
        return this._scoreModifier;
    }
    move(dx = this._dx, dy = this._dy) {
        this._x += dx;
        this._y += dy;
    }
    hit() {
        this._strength--;
    }
    isAlive() {
        return this._strength > 0;
    }
}


/***/ }),

/***/ "./src/core/Game.ts":
/*!**************************!*\
  !*** ./src/core/Game.ts ***!
  \**************************/
/*! exports provided: GameStage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameStage", function() { return GameStage; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ "./src/core/Sprite.ts");
/* harmony import */ var _sprites_ShelterBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sprites/ShelterBlock */ "./src/sprites/ShelterBlock.ts");
/* harmony import */ var _sprites_Invader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sprites/Invader */ "./src/sprites/Invader.ts");
/* harmony import */ var _sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sprites/Explosion */ "./src/sprites/Explosion.ts");
/* harmony import */ var _sprites_Gun__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sprites/Gun */ "./src/sprites/Gun.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
/* harmony import */ var _sounds_game_over_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sounds/game-over.mp3 */ "./src/sounds/game-over.mp3");
/* harmony import */ var _sounds_game_over_mp3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_sounds_game_over_mp3__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _sounds_pause_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sounds/pause.mp3 */ "./src/sounds/pause.mp3");
/* harmony import */ var _sounds_pause_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_sounds_pause_mp3__WEBPACK_IMPORTED_MODULE_8__);









var GameStage;
(function (GameStage) {
    GameStage[GameStage["READY"] = 0] = "READY";
    GameStage[GameStage["RUNNING"] = 1] = "RUNNING";
    GameStage[GameStage["FINISHED"] = 2] = "FINISHED";
})(GameStage || (GameStage = {}));
/* harmony default export */ __webpack_exports__["default"] = (function () {
    return new Game();
});
class Game {
    constructor() {
        this.invaderInterval = 60 * 2;
        this.invaderIncrement = 0;
        this._score = 0;
        this.paused = false;
        this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.handleKeyboard();
    }
    get stage() {
        return this._stage;
    }
    get score() {
        return this._score;
    }
    init() {
        // set up the rendering context
        this.canvas = document.getElementById('canvas');
        this.canvas.width = parseInt(this.canvas.style.width);
        this.canvas.height = parseInt(this.canvas.style.height);
        this.ctx = this.canvas.getContext('2d');
        // set up a rendering buffer 
        this.buffer = document.createElement('canvas');
        this.buffer.width = this.canvas.width;
        this.buffer.height = this.canvas.height;
        this.bufferCtx = this.buffer.getContext('2d');
        // create sets for holding sprites
        this.invaderSet = new Set();
        this.bombSet = new Set();
        this.missileSet = new Set();
        this.shelterSet = new Set();
        this.explosionSet = new Set();
        this.gun = Object(_sprites_Gun__WEBPACK_IMPORTED_MODULE_5__["default"])(100, 430);
        // setup the shelter blocks
        for (let y = 370; y < 394; y += 8) {
            for (let x = 65; x < 145; x += 10) {
                this.shelterSet.add(Object(_sprites_ShelterBlock__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y));
            }
            for (let x = 210; x < 290; x += 10) {
                this.shelterSet.add(Object(_sprites_ShelterBlock__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y));
            }
            for (let x = 355; x < 435; x += 10) {
                this.shelterSet.add(Object(_sprites_ShelterBlock__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y));
            }
        }
        // reinit game state
        this.updateGameStage(GameStage.READY);
        this.paused = false;
        this._score = 0;
    }
    handleKeyboard() {
        document.addEventListener('keydown', ev => {
            if (this.stage === GameStage.RUNNING) {
                switch (ev.key) {
                    case 'p':
                        const audio = new Audio(_sounds_pause_mp3__WEBPACK_IMPORTED_MODULE_8___default.a);
                        audio.play();
                        this.paused = !this.paused;
                        this.events.emit('paused', {
                            paused: this.paused,
                        });
                        break;
                    case 'ArrowLeft':
                        this.gun.control = _Sprite__WEBPACK_IMPORTED_MODULE_1__["SpriteControl"].MOVE_LEFT;
                        break;
                    case 'ArrowRight':
                        this.gun.control = _Sprite__WEBPACK_IMPORTED_MODULE_1__["SpriteControl"].MOVE_RIGHT;
                        break;
                    case ' ': // Spacebar
                        this.gun.control = _Sprite__WEBPACK_IMPORTED_MODULE_1__["SpriteControl"].FIRE;
                        break;
                    default:
                        this.gun.control = _Sprite__WEBPACK_IMPORTED_MODULE_1__["SpriteControl"].NONE;
                }
            }
        });
    }
    start() {
        this.updateGameStage(GameStage.RUNNING);
        this.run();
    }
    run() {
        if (!this.paused) {
            this.runFrame();
            this.events.emit('frame-done', {
                score: this._score,
                lives: this.gun.strength,
            });
        }
        requestAnimationFrame(() => {
            this.paint();
            if (this._stage === GameStage.RUNNING) {
                this.run();
            }
            else if (this._stage === GameStage.FINISHED) {
                const audio = new Audio(_sounds_game_over_mp3__WEBPACK_IMPORTED_MODULE_7___default.a);
                audio.volume = 0.75;
                setTimeout(() => {
                    audio.play();
                }, 1000);
            }
        });
    }
    paint() {
        const ctx = this.bufferCtx;
        ctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
        if (this.stage === GameStage.RUNNING) {
            const allSprites = new Set([
                ...this.shelterSet,
                ...this.bombSet,
                ...this.missileSet,
                ...this.invaderSet,
                ...this.explosionSet,
                this.gun,
            ]);
            for (let sprite of allSprites) {
                sprite.draw(ctx);
            }
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.buffer, 0, 0);
    }
    runFrame() {
        // introduce new invaders
        this.invaderIncrement++;
        if (this.invaderIncrement === this.invaderInterval) {
            this.invaderSet.add(Object(_sprites_Invader__WEBPACK_IMPORTED_MODULE_3__["default"])());
            this.invaderIncrement = 0;
        }
        // invaders
        for (let invader of this.invaderSet) {
            const bomb = invader.fire();
            if (bomb) {
                this.bombSet.add(bomb);
            }
            Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(invader, this.invaderSet);
        }
        // bombs
        for (let bomb of this.bombSet) {
            if (Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["detectCollision"])(bomb, this.gun)) {
                this.gun.hit();
                bomb.hit();
                this._score += this.gun.scoreModifier;
                this.explosionSet.add(Object(_sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["default"])(bomb.x, bomb.y, _sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["ExplosionSize"].LARGE));
            }
            for (let shelterBlock of this.shelterSet) {
                if (Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["detectCollision"])(bomb, shelterBlock)) {
                    bomb.hit();
                    shelterBlock.hit();
                    this._score += shelterBlock.scoreModifier;
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(shelterBlock, this.shelterSet);
                    this.explosionSet.add(Object(_sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["default"])(bomb.x, bomb.y, _sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["ExplosionSize"].SMALL));
                    // if there is one collision, there can't be any more
                    break;
                }
            }
            Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(bomb, this.bombSet);
        }
        // gun
        if (this.gun.isAlive()) {
            this.gun.move();
            if (this.gun.isFiring() && this.missileSet.size < 2) {
                this.missileSet.add(this.gun.fire());
            }
            this.gun.control = _Sprite__WEBPACK_IMPORTED_MODULE_1__["SpriteControl"].NONE;
        }
        else {
            this.updateGameStage(GameStage.FINISHED);
        }
        // missiles
        for (let missile of this.missileSet) {
            for (let invader of this.invaderSet) {
                if (Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["detectCollision"])(missile, invader)) {
                    missile.hit();
                    invader.hit();
                    this._score += invader.scoreModifier;
                    this.explosionSet.add(Object(_sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["default"])(invader.x, invader.y, _sprites_Explosion__WEBPACK_IMPORTED_MODULE_4__["ExplosionSize"].LARGE));
                    break;
                }
            }
            for (let shelterBlock of this.shelterSet) {
                if (Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["detectCollision"])(missile, shelterBlock)) {
                    missile.hit();
                    shelterBlock.hit();
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(shelterBlock, this.shelterSet);
                    break;
                }
            }
            Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(missile, this.missileSet);
        }
        // explosions
        for (let explosion of this.explosionSet) {
            Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["moveOrRemove"])(explosion, this.explosionSet);
        }
    }
    updateGameStage(stage) {
        this._stage = stage;
        this.events.emit('stage-changed', {
            stage,
        });
    }
}


/***/ }),

/***/ "./src/core/Sprite.ts":
/*!****************************!*\
  !*** ./src/core/Sprite.ts ***!
  \****************************/
/*! exports provided: SpriteControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpriteControl", function() { return SpriteControl; });
var SpriteControl;
(function (SpriteControl) {
    SpriteControl[SpriteControl["NONE"] = 0] = "NONE";
    SpriteControl[SpriteControl["MOVE_LEFT"] = 1] = "MOVE_LEFT";
    SpriteControl[SpriteControl["MOVE_RIGHT"] = 2] = "MOVE_RIGHT";
    SpriteControl[SpriteControl["FIRE"] = 3] = "FIRE";
})(SpriteControl || (SpriteControl = {}));


/***/ }),

/***/ "./src/core/helpers.ts":
/*!*****************************!*\
  !*** ./src/core/helpers.ts ***!
  \*****************************/
/*! exports provided: detectCollision, moveOrRemove, randInRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectCollision", function() { return detectCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveOrRemove", function() { return moveOrRemove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randInRange", function() { return randInRange; });
function detectCollision(sprite1, sprite2) {
    const collision = (sprite1.x + sprite1.width > sprite2.x && sprite1.x < sprite2.x + sprite2.width) && (sprite1.y + sprite1.height > sprite2.y && sprite1.y < sprite2.y + sprite2.height);
    return collision;
}
function moveOrRemove(sprite, containingSet, ifAliveCallback) {
    if (sprite.isAlive()) {
        sprite.move();
        if (typeof ifAliveCallback === 'function') {
            ifAliveCallback();
        }
    }
    else {
        containingSet.delete(sprite);
    }
}
function randInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),

/***/ "./src/images/gun.png":
/*!****************************!*\
  !*** ./src/images/gun.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "gun.png";

/***/ }),

/***/ "./src/images/invader.png":
/*!********************************!*\
  !*** ./src/images/invader.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "invader.png";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Game */ "./src/core/Game.ts");
/* harmony import */ var _info_GameInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info/GameInfo */ "./src/info/GameInfo.ts");


const gameInfo = Object(_info_GameInfo__WEBPACK_IMPORTED_MODULE_1__["default"])();
const game = Object(_core_Game__WEBPACK_IMPORTED_MODULE_0__["default"])();
game.events.on('paused', data => {
    gameInfo.paused(data.paused);
});
game.events.on('frame-done', data => {
    gameInfo.updateScore(data.score);
    gameInfo.updateLives(data.lives);
});
game.events.on('stage-changed', data => {
    if (data.stage === _core_Game__WEBPACK_IMPORTED_MODULE_0__["GameStage"].READY) {
        gameInfo.ready();
    }
    else if (data.stage === _core_Game__WEBPACK_IMPORTED_MODULE_0__["GameStage"].RUNNING) {
        gameInfo.running();
    }
    else if (data.stage === _core_Game__WEBPACK_IMPORTED_MODULE_0__["GameStage"].FINISHED) {
        let highScore = parseInt(localStorage.getItem('high-score'));
        if (isNaN(highScore) || (!isNaN(highScore) && game.score > highScore)) {
            highScore = game.score;
            localStorage.setItem('high-score', highScore + '');
        }
        gameInfo.finished(highScore, game.score);
    }
});
game.init();
document.addEventListener('keydown', ev => {
    if (ev.key === 'F2' && game.stage !== _core_Game__WEBPACK_IMPORTED_MODULE_0__["GameStage"].RUNNING) {
        game.init();
        game.start();
    }
});


/***/ }),

/***/ "./src/info/GameInfo.ts":
/*!******************************!*\
  !*** ./src/info/GameInfo.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getGameInfo; });
function hide(el) {
    el.classList.remove('show');
}
function show(el) {
    el.classList.add('show');
}
class GameInfoImpl {
    constructor() {
        this.el = {
            ready: document.getElementById('ready'),
            running: document.getElementById('running'),
            finished: document.getElementById('finished'),
        };
        this.text = {
            lives: document.getElementById('lives'),
            score: document.getElementById('score'),
            finalScore: document.getElementById('final-score'),
            highScore: document.getElementById('high-score'),
        };
    }
    updateScore(score) {
        this.text.score.textContent = score + '';
    }
    updateLives(lives) {
        this.text.lives.textContent = lives + '';
    }
    paused(paused) {
    }
    ready() {
        this.hideAll();
        show(this.el.ready);
    }
    running() {
        this.hideAll();
        show(this.el.running);
    }
    finished(highScore, finalScore) {
        this.text.finalScore.textContent = finalScore + '';
        this.text.highScore.textContent = highScore + '';
        this.hideAll();
        show(this.el.finished);
    }
    hideAll() {
        hide(this.el.ready);
        hide(this.el.running);
        hide(this.el.finished);
    }
}
const gameInfo = new GameInfoImpl();
function getGameInfo() {
    return gameInfo;
}
;
;


/***/ }),

/***/ "./src/sounds/explosion-large.mp3":
/*!****************************************!*\
  !*** ./src/sounds/explosion-large.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "explosion-large.mp3";

/***/ }),

/***/ "./src/sounds/explosion-small.mp3":
/*!****************************************!*\
  !*** ./src/sounds/explosion-small.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "explosion-small.mp3";

/***/ }),

/***/ "./src/sounds/game-over.mp3":
/*!**********************************!*\
  !*** ./src/sounds/game-over.mp3 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "game-over.mp3";

/***/ }),

/***/ "./src/sounds/invader.mp3":
/*!********************************!*\
  !*** ./src/sounds/invader.mp3 ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "invader.mp3";

/***/ }),

/***/ "./src/sounds/pause.mp3":
/*!******************************!*\
  !*** ./src/sounds/pause.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pause.mp3";

/***/ }),

/***/ "./src/sounds/shot.mp3":
/*!*****************************!*\
  !*** ./src/sounds/shot.mp3 ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shot.mp3";

/***/ }),

/***/ "./src/sprites/Bomb.ts":
/*!*****************************!*\
  !*** ./src/sprites/Bomb.ts ***!
  \*****************************/
/*! exports provided: default, Bomb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bomb", function() { return Bomb; });
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");

/* harmony default export */ __webpack_exports__["default"] = (function (x, y) {
    return new Bomb(x, y);
});
const colors = [
    'yellow',
    'lime',
    'purple',
];
class Bomb extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y) {
        super();
        this.color = colors[Math.floor(Math.random() * (2 - 0 + 1))];
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 5;
        this._width = 10;
        this._height = 10;
        this._strength = 1;
    }
    isAlive() {
        return super.isAlive() && this.y < 500;
    }
    move() {
        if (this.y > 480) {
            this._dy = 0;
            setTimeout(() => {
                this.hit();
            }, 1000);
        }
        super.move();
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


/***/ }),

/***/ "./src/sprites/Explosion.ts":
/*!**********************************!*\
  !*** ./src/sprites/Explosion.ts ***!
  \**********************************/
/*! exports provided: default, ExplosionSize, Explosion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExplosionSize", function() { return ExplosionSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explosion", function() { return Explosion; });
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");
/* harmony import */ var _sounds_explosion_large_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sounds/explosion-large.mp3 */ "./src/sounds/explosion-large.mp3");
/* harmony import */ var _sounds_explosion_large_mp3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sounds_explosion_large_mp3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sounds_explosion_small_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sounds/explosion-small.mp3 */ "./src/sounds/explosion-small.mp3");
/* harmony import */ var _sounds_explosion_small_mp3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sounds_explosion_small_mp3__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (x, y, size) {
    return new Explosion(x, y, size);
});
var ExplosionSize;
(function (ExplosionSize) {
    ExplosionSize[ExplosionSize["SMALL"] = 35] = "SMALL";
    ExplosionSize[ExplosionSize["LARGE"] = 80] = "LARGE";
})(ExplosionSize || (ExplosionSize = {}));
var ExplosionColor;
(function (ExplosionColor) {
    ExplosionColor["ORANGE"] = "rgb(255, 220, 0)";
    ExplosionColor["YELLOW"] = "rgb(255, 50, 0)";
})(ExplosionColor || (ExplosionColor = {}));
class Explosion extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, size) {
        super();
        this.frame = 0;
        this.color = ExplosionColor.ORANGE;
        this.points = [];
        this.variance = 1;
        this.drawCount = 0;
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 10;
        this._width = 10;
        this._height = 10;
        this.variance = 0;
        // strength for an explosion simulates 20 frames
        this._strength = 20;
        this.size = size;
        if (this.size === ExplosionSize.LARGE) {
            this.play(_sounds_explosion_large_mp3__WEBPACK_IMPORTED_MODULE_1___default.a);
        }
        else {
            this.play(_sounds_explosion_small_mp3__WEBPACK_IMPORTED_MODULE_2___default.a);
        }
    }
    move() {
        if (this.drawCount % 4 === 0) {
            this.color = this.color === ExplosionColor.ORANGE ?
                ExplosionColor.YELLOW : ExplosionColor.ORANGE;
        }
        if (this.drawCount % 2 === 0) {
            this.variance = 20 + Math.floor(Math.random() * (this.size - 1));
        }
        const v = this.variance;
        const dx1 = Math.round(Math.sin(toRadians(72)) * v);
        const dy1 = Math.round(Math.cos(toRadians(72)) * v);
        const dx2 = Math.round(Math.sin(toRadians(36)) * v);
        const dy2 = Math.round(Math.cos(toRadians(36)) * v);
        this.points[0] = [this.x, this.y - v];
        this.points[1] = [this.x + dx2, this.y + dy2];
        this.points[2] = [this.x - dx1, this.y - dy1];
        this.points[3] = [this.x + dx1, this.y - dy1];
        this.points[4] = [this.x - dx2, this.y + dy2];
        this.hit();
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.drawCount++;
    }
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}


/***/ }),

/***/ "./src/sprites/Gun.ts":
/*!****************************!*\
  !*** ./src/sprites/Gun.ts ***!
  \****************************/
/*! exports provided: default, Gun */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gun", function() { return Gun; });
/* harmony import */ var _core_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Sprite */ "./src/core/Sprite.ts");
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");
/* harmony import */ var _Missile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Missile */ "./src/sprites/Missile.ts");
/* harmony import */ var _images_gun_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/gun.png */ "./src/images/gun.png");
/* harmony import */ var _images_gun_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_gun_png__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/* harmony default export */ __webpack_exports__["default"] = (function (x, y) {
    return new Gun(x, y);
});
// could loading an image be any more convoluted?
let bitmap = null;
let image = new Image();
image.onload = function loadImage() {
    return __awaiter(this, void 0, void 0, function* () {
        bitmap = yield createImageBitmap(image, 0, 0, 50, 38);
    });
};
image.src = _images_gun_png__WEBPACK_IMPORTED_MODULE_3___default.a;
class Gun extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(x, y) {
        super();
        this.control = _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].NONE;
        this._x = x;
        this._y = y;
        this._width = 50;
        this._height = 38;
        this._dx = 15;
        this._dy = 0;
        this._strength = 3;
        this._scoreModifier = -500;
    }
    isMoving() {
        return (this.control === _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].MOVE_LEFT ||
            this.control === _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].MOVE_RIGHT);
    }
    isFiring() {
        return this.control === _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].FIRE;
    }
    move() {
        if (!this.isMoving()) {
            return;
        }
        if (this.x > 0 && this.control === _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].MOVE_LEFT) {
            this._x -= this._dx;
        }
        else if (this.x + this.width <= 500 && this.control === _core_Sprite__WEBPACK_IMPORTED_MODULE_0__["SpriteControl"].MOVE_RIGHT) {
            this._x += this._dx;
        }
    }
    fire() {
        return Object(_Missile__WEBPACK_IMPORTED_MODULE_2__["default"])(this.x + (this.width / 2), this.y);
    }
    draw(ctx) {
        if (bitmap) {
            ctx.drawImage(bitmap, this.x, this.y);
        }
    }
}


/***/ }),

/***/ "./src/sprites/Invader.ts":
/*!********************************!*\
  !*** ./src/sprites/Invader.ts ***!
  \********************************/
/*! exports provided: default, Invader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invader", function() { return Invader; });
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");
/* harmony import */ var _Bomb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bomb */ "./src/sprites/Bomb.ts");
/* harmony import */ var _core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/helpers */ "./src/core/helpers.ts");
/* harmony import */ var _sounds_invader_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sounds/invader.mp3 */ "./src/sounds/invader.mp3");
/* harmony import */ var _sounds_invader_mp3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sounds_invader_mp3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _images_invader_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/invader.png */ "./src/images/invader.png");
/* harmony import */ var _images_invader_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_invader_png__WEBPACK_IMPORTED_MODULE_4__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





/* harmony default export */ __webpack_exports__["default"] = (function () {
    return new Invader();
});
// could loading an image be any more convoluted?
let bitmap = null;
let image = new Image();
image.onload = function loadImage() {
    return __awaiter(this, void 0, void 0, function* () {
        bitmap = yield createImageBitmap(image, 0, 0, 45, 19);
    });
};
image.src = _images_invader_png__WEBPACK_IMPORTED_MODULE_4___default.a;
class Invader extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._width = 45;
        this._height = 19;
        this._dx = Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__["randInRange"])(4, 8);
        this._dy = Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__["randInRange"])(1, 2);
        if (Math.random() >= 0.5) {
            this._x = 0;
        }
        else {
            this._x = 500 - this.width;
            this._dx *= -1;
        }
        this._y = 0;
        this._strength = 1;
        this._scoreModifier = 500;
        this._aggressiveness = Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__["randInRange"])(93, 98);
        this.play(_sounds_invader_mp3__WEBPACK_IMPORTED_MODULE_3___default.a);
    }
    isAlive() {
        return super.isAlive() && this.y >= 0;
    }
    move() {
        if (this.x + this.width > 500 || this.x < 0) {
            this._dx *= -1;
        }
        else if (this.y + this.height > 320 || this.y < 0) {
            this._dy *= -1;
        }
        super.move();
    }
    fire() {
        return this.isFiring() ?
            Object(_Bomb__WEBPACK_IMPORTED_MODULE_1__["default"])(this.x + (this.width / 2), this.y) :
            null;
    }
    isFiring() {
        return Math.random() >= (this._aggressiveness / 100);
    }
    draw(ctx) {
        if (bitmap) {
            ctx.drawImage(bitmap, this.x, this.y);
        }
    }
}


/***/ }),

/***/ "./src/sprites/Missile.ts":
/*!********************************!*\
  !*** ./src/sprites/Missile.ts ***!
  \********************************/
/*! exports provided: default, Missile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Missile", function() { return Missile; });
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");
/* harmony import */ var _sounds_shot_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sounds/shot.mp3 */ "./src/sounds/shot.mp3");
/* harmony import */ var _sounds_shot_mp3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sounds_shot_mp3__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (x, y) {
    return new Missile(x, y);
});
class Missile extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y) {
        super();
        this.points = [];
        this._x = x;
        this._y = y;
        this._width = 5;
        this._height = 14;
        this._dx = 0;
        this._dy = -15;
        this._strength = 1;
        this.points[0] = [x + 0, y + 6];
        this.points[1] = [x + 0, y + 13];
        this.points[2] = [x + 4, y + 13];
        this.points[3] = [x + 4, y + 6];
        this.points[4] = [x + 2, y + 0];
        this.play(_sounds_shot_mp3__WEBPACK_IMPORTED_MODULE_1___default.a);
    }
    isAlive() {
        return super.isAlive() && this.y > 0;
    }
    move() {
        super.move();
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][0] += this._dx;
            this.points[i][1] += this._dy;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fill();
    }
}


/***/ }),

/***/ "./src/sprites/ShelterBlock.ts":
/*!*************************************!*\
  !*** ./src/sprites/ShelterBlock.ts ***!
  \*************************************/
/*! exports provided: default, ShelterBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShelterBlock", function() { return ShelterBlock; });
/* harmony import */ var _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/BaseSprite */ "./src/core/BaseSprite.ts");

/* harmony default export */ __webpack_exports__["default"] = (function (x, y) {
    return new ShelterBlock(x, y);
});
class ShelterBlock extends _core_BaseSprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y) {
        super();
        this._x = x;
        this._y = y;
        this._width = 8;
        this._height = 6;
        this._strength = 2;
        this._scoreModifier = -10;
    }
    draw(ctx) {
        ctx.fillStyle = 'rgb(141, 178, 201)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvQmFzZVNwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9oZWxwZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvZ3VuLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2ludmFkZXIucG5nIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5mby9HYW1lSW5mby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc291bmRzL2V4cGxvc2lvbi1sYXJnZS5tcDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvdW5kcy9leHBsb3Npb24tc21hbGwubXAzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZHMvZ2FtZS1vdmVyLm1wMyIsIndlYnBhY2s6Ly8vLi9zcmMvc291bmRzL2ludmFkZXIubXAzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZHMvcGF1c2UubXAzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZHMvc2hvdC5tcDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZXMvQm9tYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ByaXRlcy9FeHBsb3Npb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZXMvR3VuLnRzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGVzL0ludmFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZXMvTWlzc2lsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ByaXRlcy9TaGVsdGVyQmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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LENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV4QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXBELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMs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QUNKOzs7Ozs7Ozs7Ozs7O0FDM0REO0FBQUE7QUFBQTtBQUE0QztBQUU3Qix5RUFBUyxDQUFTLEVBQUUsQ0FBUztJQUN4QyxPQUFPLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRU0sTUFBTSxZQUFhLFNBQVEsd0RBQVU7SUFFeEMsWUFBWSxDQUFTLEVBQUUsQ0FBUztRQUM1QixLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBNkI7UUFDckMsR0FBRyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztRQUNyQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0oiLCJmaWxlIjoiYnVuZGxlLTAzOWUyZTlhMGRlMDgzZDM2N2NiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlU3ByaXRlIHtcbiAgICBwcm90ZWN0ZWQgX3Nwcml0ZUltYWdlOiBJbWFnZUJpdG1hcDtcbiAgICBwcm90ZWN0ZWQgX3dpZHRoOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9oZWlnaHQ6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCBfeDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfeTogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfZHg6IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIF9keTogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCBfc3RyZW5ndGg6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX3Njb3JlTW9kaWZpZXIgPSAwO1xuXG4gICAgcHJvdGVjdGVkIHBsYXkoc2Z4OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oc2Z4KTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3ByaXRlSW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVJbWFnZTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCB3aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0cmVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzY29yZU1vZGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmVNb2RpZmllcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZShkeCA9IHRoaXMuX2R4LCBkeSA9IHRoaXMuX2R5KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ggKz0gZHg7XG4gICAgICAgIHRoaXMuX3kgKz0gZHk7XG4gICAgfVxuXG4gICAgcHVibGljIGhpdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3RyZW5ndGgtLTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVuZ3RoID4gMDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgeyBTcHJpdGUsIEZpcmluZ1Nwcml0ZSwgQ29udHJvbGxhYmxlU3ByaXRlLCBTcHJpdGVDb250cm9sIH0gZnJvbSAnLi9TcHJpdGUnO1xuaW1wb3J0IGNyZWF0ZVNoZWx0ZXJCbG9jayBmcm9tICcuLi9zcHJpdGVzL1NoZWx0ZXJCbG9jayc7XG5pbXBvcnQgY3JlYXRlSW52YWRlciBmcm9tICcuLi9zcHJpdGVzL0ludmFkZXInO1xuaW1wb3J0IGNyZWF0ZUV4cGxvc2lvbiwgeyBFeHBsb3Npb25TaXplIH0gZnJvbSAnLi4vc3ByaXRlcy9FeHBsb3Npb24nO1xuaW1wb3J0IGNyZWF0ZUd1biBmcm9tICcuLi9zcHJpdGVzL0d1bic7XG5pbXBvcnQgeyBtb3ZlT3JSZW1vdmUsIGRldGVjdENvbGxpc2lvbiB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgZ2FtZU92ZXJGeCBmcm9tICcuLi9zb3VuZHMvZ2FtZS1vdmVyLm1wMyc7XG5pbXBvcnQgcGF1c2VGeCBmcm9tICcuLi9zb3VuZHMvcGF1c2UubXAzJztcblxuZXhwb3J0IGVudW0gR2FtZVN0YWdlIHtcbiAgICBSRUFEWSxcbiAgICBSVU5OSU5HLFxuICAgIEZJTklTSEVELFxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBHYW1lKCk7XG59XG5cbmNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgcHJpdmF0ZSBidWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgYnVmZmVyQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICAvLyBzZXRzIHdoaWNoIGhvbGQgZ3JvdXBzIG9mIG9uLXNjcmVlbiBzcHJpdGVzXG4gICAgcHJpdmF0ZSBpbnZhZGVyU2V0OiBTZXQ8RmlyaW5nU3ByaXRlPjtcbiAgICBwcml2YXRlIGJvbWJTZXQ6IFNldDxTcHJpdGU+O1xuICAgIHByaXZhdGUgbWlzc2lsZVNldDogU2V0PFNwcml0ZT47XG4gICAgcHJpdmF0ZSBzaGVsdGVyU2V0OiBTZXQ8U3ByaXRlPlxuICAgIHByaXZhdGUgZXhwbG9zaW9uU2V0OiBTZXQ8U3ByaXRlPlxuXG4gICAgcHJpdmF0ZSBndW46IEZpcmluZ1Nwcml0ZSAmIENvbnRyb2xsYWJsZVNwcml0ZTtcblxuICAgIHByaXZhdGUgaW52YWRlckludGVydmFsID0gNjAgKiAyO1xuICAgIHByaXZhdGUgaW52YWRlckluY3JlbWVudCA9IDA7ICAgIFxuICAgIHByaXZhdGUgX3Njb3JlOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIHByaXZhdGUgX3N0YWdlOiBHYW1lU3RhZ2U7XG4gICAgcHJpdmF0ZSBwYXVzZWQgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgZ2V0IHN0YWdlKCk6IEdhbWVTdGFnZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNjb3JlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlib2FyZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICAvLyBzZXQgdXAgdGhlIHJlbmRlcmluZyBjb250ZXh0XG4gICAgICAgIHRoaXMuY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHBhcnNlSW50KHRoaXMuY2FudmFzLnN0eWxlLndpZHRoKTtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIC8vIHNldCB1cCBhIHJlbmRlcmluZyBidWZmZXIgXG4gICAgICAgIHRoaXMuYnVmZmVyID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLmJ1ZmZlci5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYnVmZmVyQ3R4ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dCgnMmQnKTsgIFxuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHNldHMgZm9yIGhvbGRpbmcgc3ByaXRlc1xuICAgICAgICB0aGlzLmludmFkZXJTZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuYm9tYlNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5taXNzaWxlU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnNoZWx0ZXJTZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uU2V0ID0gbmV3IFNldCgpO1xuXG4gICAgICAgIHRoaXMuZ3VuID0gY3JlYXRlR3VuKDEwMCwgNDMwKTsgICAgXG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIHNoZWx0ZXIgYmxvY2tzXG4gICAgICAgIGZvcihsZXQgeSA9IDM3MDsgeSA8IDM5NDsgeSArPSA4KSB7XG4gICAgICAgICAgICBmb3IobGV0IHggPSA2NTsgeCA8IDE0NTsgeCArPSAxMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hlbHRlclNldC5hZGQoY3JlYXRlU2hlbHRlckJsb2NrKHgsIHkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMjEwOyB4IDwgMjkwOyB4ICs9IDEwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGVsdGVyU2V0LmFkZChjcmVhdGVTaGVsdGVyQmxvY2soeCwgeSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IobGV0IHggPSAzNTU7IHggPCA0MzU7IHggKz0gMTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoZWx0ZXJTZXQuYWRkKGNyZWF0ZVNoZWx0ZXJCbG9jayh4LCB5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHJlaW5pdCBnYW1lIHN0YXRlXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YWdlKEdhbWVTdGFnZS5SRUFEWSk7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gMDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlib2FyZCgpIHsgICAgICAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXYgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5zdGFnZSA9PT0gR2FtZVN0YWdlLlJVTk5JTkcpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXYua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8ocGF1c2VGeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDsgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5lbWl0KCdwYXVzZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2VkOiB0aGlzLnBhdXNlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VuLmNvbnRyb2wgPSBTcHJpdGVDb250cm9sLk1PVkVfTEVGVDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VuLmNvbnRyb2wgPSBTcHJpdGVDb250cm9sLk1PVkVfUklHSFQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnICc6IC8vIFNwYWNlYmFyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1bi5jb250cm9sID0gU3ByaXRlQ29udHJvbC5GSVJFO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1bi5jb250cm9sID0gU3ByaXRlQ29udHJvbC5OT05FOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHsgICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGFnZShHYW1lU3RhZ2UuUlVOTklORyk7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuXG4gICAgcnVuKCkgeyAgICBcbiAgICAgICAgaWYoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bkZyYW1lKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5lbWl0KCdmcmFtZS1kb25lJywge1xuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLl9zY29yZSxcbiAgICAgICAgICAgICAgICBsaXZlczogdGhpcy5ndW4uc3RyZW5ndGgsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhaW50KCk7XG4gICAgICAgICAgICBpZih0aGlzLl9zdGFnZSA9PT0gR2FtZVN0YWdlLlJVTk5JTkcpIHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9zdGFnZSA9PT0gR2FtZVN0YWdlLkZJTklTSEVEKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oZ2FtZU92ZXJGeCk7XG4gICAgICAgICAgICAgICAgYXVkaW8udm9sdW1lID0gMC43NTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYWludCgpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5idWZmZXJDdHg7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5idWZmZXIud2lkdGgsIHRoaXMuYnVmZmVyLmhlaWdodCk7XG5cbiAgICAgICAgaWYodGhpcy5zdGFnZSA9PT0gR2FtZVN0YWdlLlJVTk5JTkcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFNwcml0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLnNoZWx0ZXJTZXQsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5ib21iU2V0LFxuICAgICAgICAgICAgICAgIC4uLnRoaXMubWlzc2lsZVNldCxcbiAgICAgICAgICAgICAgICAuLi50aGlzLmludmFkZXJTZXQsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5leHBsb3Npb25TZXQsXG4gICAgICAgICAgICAgICAgdGhpcy5ndW4sXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgZm9yKGxldCBzcHJpdGUgb2YgYWxsU3ByaXRlcykge1xuICAgICAgICAgICAgICAgIHNwcml0ZS5kcmF3KGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlciwgMCwgMCk7XG4gICAgfVxuXG4gICAgcnVuRnJhbWUoKSB7ICAgICAgXG4gICAgICAgIC8vIGludHJvZHVjZSBuZXcgaW52YWRlcnNcbiAgICAgICAgdGhpcy5pbnZhZGVySW5jcmVtZW50Kys7XG4gICAgICAgIGlmKHRoaXMuaW52YWRlckluY3JlbWVudCA9PT0gdGhpcy5pbnZhZGVySW50ZXJ2YWwpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW52YWRlclNldC5hZGQoY3JlYXRlSW52YWRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuaW52YWRlckluY3JlbWVudCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbnZhZGVyc1xuICAgICAgICBmb3IobGV0IGludmFkZXIgb2YgdGhpcy5pbnZhZGVyU2V0KSB7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IGludmFkZXIuZmlyZSgpOyAgICAgICAgXG4gICAgICAgICAgICBpZihib21iKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib21iU2V0LmFkZChib21iKTtcbiAgICAgICAgICAgIH1cbiAgIFxuICAgICAgICAgICAgbW92ZU9yUmVtb3ZlKGludmFkZXIsIHRoaXMuaW52YWRlclNldCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBib21ic1xuICAgICAgICBmb3IobGV0IGJvbWIgb2YgdGhpcy5ib21iU2V0KSB7XG4gICAgICAgICAgICBpZihkZXRlY3RDb2xsaXNpb24oYm9tYiwgdGhpcy5ndW4pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ndW4uaGl0KCk7XG4gICAgICAgICAgICAgICAgYm9tYi5oaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZSArPSB0aGlzLmd1bi5zY29yZU1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwbG9zaW9uU2V0LmFkZChjcmVhdGVFeHBsb3Npb24oYm9tYi54LCBib21iLnksIEV4cGxvc2lvblNpemUuTEFSR0UpKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihsZXQgc2hlbHRlckJsb2NrIG9mIHRoaXMuc2hlbHRlclNldCkge1xuICAgICAgICAgICAgICAgIGlmKGRldGVjdENvbGxpc2lvbihib21iLCBzaGVsdGVyQmxvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvbWIuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNoZWx0ZXJCbG9jay5oaXQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlICs9IHNoZWx0ZXJCbG9jay5zY29yZU1vZGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlT3JSZW1vdmUoc2hlbHRlckJsb2NrLCB0aGlzLnNoZWx0ZXJTZXQpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwbG9zaW9uU2V0LmFkZChjcmVhdGVFeHBsb3Npb24oYm9tYi54LCBib21iLnksIEV4cGxvc2lvblNpemUuU01BTEwpKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG9uZSBjb2xsaXNpb24sIHRoZXJlIGNhbid0IGJlIGFueSBtb3JlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbW92ZU9yUmVtb3ZlKGJvbWIsIHRoaXMuYm9tYlNldCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBndW5cbiAgICAgICAgaWYodGhpcy5ndW4uaXNBbGl2ZSgpKSB7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ndW4ubW92ZSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ndW4uaXNGaXJpbmcoKSAmJiB0aGlzLm1pc3NpbGVTZXQuc2l6ZSA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pc3NpbGVTZXQuYWRkKHRoaXMuZ3VuLmZpcmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmd1bi5jb250cm9sID0gU3ByaXRlQ29udHJvbC5OT05FOyAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhZ2UoR2FtZVN0YWdlLkZJTklTSEVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1pc3NpbGVzXG4gICAgICAgIGZvcihsZXQgbWlzc2lsZSBvZiB0aGlzLm1pc3NpbGVTZXQpIHsgICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBpbnZhZGVyIG9mIHRoaXMuaW52YWRlclNldCkge1xuICAgICAgICAgICAgICAgIGlmKGRldGVjdENvbGxpc2lvbihtaXNzaWxlLCBpbnZhZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBtaXNzaWxlLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICBpbnZhZGVyLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY29yZSArPSBpbnZhZGVyLnNjb3JlTW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwbG9zaW9uU2V0LmFkZChjcmVhdGVFeHBsb3Npb24oaW52YWRlci54LCBpbnZhZGVyLnksIEV4cGxvc2lvblNpemUuTEFSR0UpKTsgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihsZXQgc2hlbHRlckJsb2NrIG9mIHRoaXMuc2hlbHRlclNldCkge1xuICAgICAgICAgICAgICAgIGlmKGRldGVjdENvbGxpc2lvbihtaXNzaWxlLCBzaGVsdGVyQmxvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pc3NpbGUuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNoZWx0ZXJCbG9jay5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZU9yUmVtb3ZlKHNoZWx0ZXJCbG9jaywgdGhpcy5zaGVsdGVyU2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3ZlT3JSZW1vdmUobWlzc2lsZSwgdGhpcy5taXNzaWxlU2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxvc2lvbnNcbiAgICAgICAgZm9yKGxldCBleHBsb3Npb24gb2YgdGhpcy5leHBsb3Npb25TZXQpIHtcbiAgICAgICAgICAgIG1vdmVPclJlbW92ZShleHBsb3Npb24sIHRoaXMuZXhwbG9zaW9uU2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUdhbWVTdGFnZShzdGFnZTogR2FtZVN0YWdlKSB7XG4gICAgICAgIHRoaXMuX3N0YWdlID0gc3RhZ2U7XG4gICAgICAgIHRoaXMuZXZlbnRzLmVtaXQoJ3N0YWdlLWNoYW5nZWQnLCB7XG4gICAgICAgICAgICBzdGFnZSxcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3ByaXRlIGZyb20gJy4vQmFzZVNwcml0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3ByaXRlIGV4dGVuZHMgQmFzZVNwcml0ZSB7XG4gICAgZHJhdyhyZW5kZXJpbmdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpcmluZ1Nwcml0ZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgZmlyZSgpOiBTcHJpdGU7XG4gICAgaXNGaXJpbmcoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sbGFibGVTcHJpdGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnRyb2w6IFNwcml0ZUNvbnRyb2w7XG59XG5cbmV4cG9ydCBlbnVtIFNwcml0ZUNvbnRyb2wge1xuICAgIE5PTkUsXG4gICAgTU9WRV9MRUZULFxuICAgIE1PVkVfUklHSFQsXG4gICAgRklSRSxcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuL1Nwcml0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDb2xsaXNpb24oc3ByaXRlMTogU3ByaXRlLCBzcHJpdGUyOiBTcHJpdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb2xsaXNpb24gPSAoXG4gICAgICAgIHNwcml0ZTEueCArIHNwcml0ZTEud2lkdGggPiBzcHJpdGUyLnggJiYgc3ByaXRlMS54IDwgc3ByaXRlMi54ICsgc3ByaXRlMi53aWR0aFxuICAgICkgJiYgKFxuICAgICAgICBzcHJpdGUxLnkgKyBzcHJpdGUxLmhlaWdodCA+IHNwcml0ZTIueSAmJiBzcHJpdGUxLnkgPCBzcHJpdGUyLnkgKyBzcHJpdGUyLmhlaWdodFxuICAgICkgXG4gICAgcmV0dXJuIGNvbGxpc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVPclJlbW92ZShzcHJpdGU6IFNwcml0ZSwgY29udGFpbmluZ1NldDogU2V0PFNwcml0ZT4sIGlmQWxpdmVDYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7ICAgIFxuICAgIGlmKHNwcml0ZS5pc0FsaXZlKCkpIHtcbiAgICAgICAgc3ByaXRlLm1vdmUoKTtcbiAgICAgICAgaWYodHlwZW9mIGlmQWxpdmVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWZBbGl2ZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluaW5nU2V0LmRlbGV0ZShzcHJpdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRJblJhbmdlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImd1bi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbnZhZGVyLnBuZ1wiOyIsImltcG9ydCBjcmVhdGVHYW1lLCB7IEdhbWVTdGFnZSB9IGZyb20gJy4vY29yZS9HYW1lJztcbmltcG9ydCBnZXRHYW1lSW5mbyBmcm9tICcuL2luZm8vR2FtZUluZm8nO1xuXG5jb25zdCBnYW1lSW5mbyA9IGdldEdhbWVJbmZvKCk7XG5cbmNvbnN0IGdhbWUgPSBjcmVhdGVHYW1lKCk7XG5cbmdhbWUuZXZlbnRzLm9uKCdwYXVzZWQnLCBkYXRhID0+IHtcbiAgICBnYW1lSW5mby5wYXVzZWQoZGF0YS5wYXVzZWQpO1xufSk7XG5nYW1lLmV2ZW50cy5vbignZnJhbWUtZG9uZScsIGRhdGEgPT4ge1xuICAgIGdhbWVJbmZvLnVwZGF0ZVNjb3JlKGRhdGEuc2NvcmUpO1xuICAgIGdhbWVJbmZvLnVwZGF0ZUxpdmVzKGRhdGEubGl2ZXMpO1xufSk7XG5nYW1lLmV2ZW50cy5vbignc3RhZ2UtY2hhbmdlZCcsIGRhdGEgPT4ge1xuICAgIGlmKGRhdGEuc3RhZ2UgPT09IEdhbWVTdGFnZS5SRUFEWSkge1xuICAgICAgICBnYW1lSW5mby5yZWFkeSgpO1xuICAgIH0gZWxzZSBpZihkYXRhLnN0YWdlID09PSBHYW1lU3RhZ2UuUlVOTklORykge1xuICAgICAgICBnYW1lSW5mby5ydW5uaW5nKCk7XG4gICAgfSBlbHNlIGlmKGRhdGEuc3RhZ2UgPT09IEdhbWVTdGFnZS5GSU5JU0hFRCkge1xuICAgICAgICBsZXQgaGlnaFNjb3JlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZ2gtc2NvcmUnKSk7XG4gICAgICAgIGlmKGlzTmFOKGhpZ2hTY29yZSkgfHwgKCFpc05hTihoaWdoU2NvcmUpICYmIGdhbWUuc2NvcmUgPiBoaWdoU2NvcmUpKSB7XG4gICAgICAgICAgICBoaWdoU2NvcmUgPSBnYW1lLnNjb3JlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZ2gtc2NvcmUnLCBoaWdoU2NvcmUgKyAnJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZ2FtZUluZm8uZmluaXNoZWQoaGlnaFNjb3JlLCBnYW1lLnNjb3JlKTtcbiAgICB9XG59KTtcblxuZ2FtZS5pbml0KCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldiA9PiB7XG4gICAgaWYoZXYua2V5ID09PSAnRjInICYmIGdhbWUuc3RhZ2UgIT09IEdhbWVTdGFnZS5SVU5OSU5HKSB7ICAgICAgICBcbiAgICAgICAgZ2FtZS5pbml0KCk7XG4gICAgICAgIGdhbWUuc3RhcnQoKTtcbiAgICB9XG59KTsiLCJmdW5jdGlvbiBoaWRlKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbn1cblxuZnVuY3Rpb24gc2hvdyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59XG5cbmNsYXNzIEdhbWVJbmZvSW1wbCB7XG4gICAgZWw6IHtcbiAgICAgICAgcmVhZHk6IEhUTUxFbGVtZW50LFxuICAgICAgICBydW5uaW5nOiBIVE1MRWxlbWVudCxcbiAgICAgICAgZmluaXNoZWQ6IEhUTUxFbGVtZW50LFxuICAgIH0gPSB7XG4gICAgICAgIHJlYWR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZHknKSxcbiAgICAgICAgcnVubmluZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bm5pbmcnKSxcbiAgICAgICAgZmluaXNoZWQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5pc2hlZCcpLFxuICAgIH1cblxuICAgIHRleHQgPSB7XG4gICAgICAgIGxpdmVzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZXMnKSBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgc2NvcmU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICBmaW5hbFNjb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWwtc2NvcmUnKSBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgaGlnaFNjb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaC1zY29yZScpIGFzIEhUTUxFbGVtZW50LFxuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50ZXh0LnNjb3JlLnRleHRDb250ZW50ID0gc2NvcmUgKyAnJztcbiAgICB9XG5cbiAgICB1cGRhdGVMaXZlcyhsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGV4dC5saXZlcy50ZXh0Q29udGVudCA9IGxpdmVzICsgJyc7XG4gICAgfVxuXG4gICAgcGF1c2VkKHBhdXNlZDogYm9vbGVhbikge1xuICAgICAgICBcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgICAgIHNob3codGhpcy5lbC5yZWFkeSk7XG4gICAgfVxuXG4gICAgcnVubmluZygpIHtcbiAgICAgICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgICAgIHNob3codGhpcy5lbC5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBmaW5pc2hlZChoaWdoU2NvcmU6IG51bWJlciwgZmluYWxTY29yZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGV4dC5maW5hbFNjb3JlLnRleHRDb250ZW50ID0gZmluYWxTY29yZSArICcnO1xuICAgICAgICB0aGlzLnRleHQuaGlnaFNjb3JlLnRleHRDb250ZW50ID0gaGlnaFNjb3JlICsgJyc7XG4gICAgICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgICAgICBzaG93KHRoaXMuZWwuZmluaXNoZWQpO1xuICAgIH1cblxuICAgIGhpZGVBbGwoKSB7XG4gICAgICAgIGhpZGUodGhpcy5lbC5yZWFkeSk7XG4gICAgICAgIGhpZGUodGhpcy5lbC5ydW5uaW5nKTtcbiAgICAgICAgaGlkZSh0aGlzLmVsLmZpbmlzaGVkKTsgICAgICAgXG4gICAgfVxufVxuXG5jb25zdCBnYW1lSW5mbyA9IG5ldyBHYW1lSW5mb0ltcGwoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0R2FtZUluZm8oKSB7XG4gICAgcmV0dXJuIGdhbWVJbmZvO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBHYW1lSW5mbyBleHRlbmRzIEdhbWVJbmZvSW1wbCB7fTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJleHBsb3Npb24tbGFyZ2UubXAzXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZXhwbG9zaW9uLXNtYWxsLm1wM1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImdhbWUtb3Zlci5tcDNcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbnZhZGVyLm1wM1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBhdXNlLm1wM1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNob3QubXAzXCI7IiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi4vY29yZS9TcHJpdGUnO1xuaW1wb3J0IEJhc2VTcHJpdGUgZnJvbSAnLi4vY29yZS9CYXNlU3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJvbWIoeCwgeSk7XG59XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgICAneWVsbG93JyxcbiAgICAnbGltZScsXG4gICAgJ3B1cnBsZScsXG5dO1xuXG5leHBvcnQgY2xhc3MgQm9tYiBleHRlbmRzIEJhc2VTcHJpdGUgaW1wbGVtZW50cyBTcHJpdGUge1xuXG4gICAgcHJpdmF0ZSBjb2xvcjogc3RyaW5nID0gY29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyIC0gMCArIDEpKV07XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcblxuICAgICAgICB0aGlzLl9keCA9IDA7XG4gICAgICAgIHRoaXMuX2R5ID0gNTtcblxuICAgICAgICB0aGlzLl93aWR0aCA9IDEwO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAxMDtcblxuICAgICAgICB0aGlzLl9zdHJlbmd0aCA9IDE7ICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBpc0FsaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3VwZXIuaXNBbGl2ZSgpICYmIHRoaXMueSA8IDUwMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy55ID4gNDgwKSB7XG4gICAgICAgICAgICB0aGlzLl9keSA9IDA7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5tb3ZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCArICh0aGlzLndpZHRoIC8gMiksIHRoaXMueSArICh0aGlzLmhlaWdodCAvIDIpLCB0aGlzLndpZHRoIC8gMiwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uL2NvcmUvU3ByaXRlJztcbmltcG9ydCBCYXNlU3ByaXRlIGZyb20gJy4uL2NvcmUvQmFzZVNwcml0ZSc7XG5pbXBvcnQgc291bmRMYXJnZSBmcm9tICcuLi9zb3VuZHMvZXhwbG9zaW9uLWxhcmdlLm1wMyc7XG5pbXBvcnQgc291bmRTbWFsbCBmcm9tICcuLi9zb3VuZHMvZXhwbG9zaW9uLXNtYWxsLm1wMyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBFeHBsb3Npb25TaXplKSB7XG4gICAgcmV0dXJuIG5ldyBFeHBsb3Npb24oeCwgeSwgc2l6ZSk7XG59XG5cbmV4cG9ydCBlbnVtIEV4cGxvc2lvblNpemUge1xuICAgIFNNQUxMID0gMzUsXG4gICAgTEFSR0UgPSA4MCxcbn1cblxuZW51bSBFeHBsb3Npb25Db2xvciB7XG4gICAgT1JBTkdFID0gJ3JnYigyNTUsIDIyMCwgMCknLFxuICAgIFlFTExPVyA9ICdyZ2IoMjU1LCA1MCwgMCknLFxufVxuXG5leHBvcnQgY2xhc3MgRXhwbG9zaW9uIGV4dGVuZHMgQmFzZVNwcml0ZSBpbXBsZW1lbnRzIFNwcml0ZSB7XG5cbiAgICBzaXplOiBFeHBsb3Npb25TaXplO1xuICAgIGZyYW1lOiBudW1iZXIgPSAwO1xuICAgIGNvbG9yOiBFeHBsb3Npb25Db2xvciA9IEV4cGxvc2lvbkNvbG9yLk9SQU5HRTtcbiAgICBwb2ludHM6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XG4gICAgdmFyaWFuY2U6IG51bWJlciA9IDE7XG4gICAgZHJhd0NvdW50ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBFeHBsb3Npb25TaXplKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIHRoaXMuX2R4ID0gMDtcbiAgICAgICAgdGhpcy5fZHkgPSAxMDtcblxuICAgICAgICB0aGlzLl93aWR0aCA9IDEwO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAxMDtcblxuICAgICAgICB0aGlzLnZhcmlhbmNlID0gMDtcblxuICAgICAgICAvLyBzdHJlbmd0aCBmb3IgYW4gZXhwbG9zaW9uIHNpbXVsYXRlcyAyMCBmcmFtZXNcbiAgICAgICAgdGhpcy5fc3RyZW5ndGggPSAyMDtcblxuICAgICAgICB0aGlzLnNpemUgPSBzaXplOyAgICAgICAgICAgICAgICBcblxuICAgICAgICBpZih0aGlzLnNpemUgPT09IEV4cGxvc2lvblNpemUuTEFSR0UpIHtcbiAgICAgICAgICAgIHRoaXMucGxheShzb3VuZExhcmdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheShzb3VuZFNtYWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmRyYXdDb3VudCAlIDQgPT09IDApIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yID09PSBFeHBsb3Npb25Db2xvci5PUkFOR0UgPyBcbiAgICAgICAgICAgICAgICBFeHBsb3Npb25Db2xvci5ZRUxMT1cgOiBFeHBsb3Npb25Db2xvci5PUkFOR0U7ICAgIFxuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgaWYodGhpcy5kcmF3Q291bnQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnZhcmlhbmNlID0gMjAgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5zaXplIC0xKSk7ICAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLnZhcmlhbmNlO1xuXG4gICAgICAgIGNvbnN0IGR4MSA9IE1hdGgucm91bmQoTWF0aC5zaW4odG9SYWRpYW5zKDcyKSkgKiB2KTtcbiAgICAgICAgY29uc3QgZHkxID0gTWF0aC5yb3VuZChNYXRoLmNvcyh0b1JhZGlhbnMoNzIpKSAqIHYpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZHgyID0gTWF0aC5yb3VuZChNYXRoLnNpbih0b1JhZGlhbnMoMzYpKSAqIHYpO1xuICAgICAgICBjb25zdCBkeTIgPSBNYXRoLnJvdW5kKE1hdGguY29zKHRvUmFkaWFucygzNikpICogdik7XG5cbiAgICAgICAgdGhpcy5wb2ludHNbMF0gPSBbIHRoaXMueCwgdGhpcy55IC0gdiBdO1xuICAgICAgICB0aGlzLnBvaW50c1sxXSA9IFsgdGhpcy54ICsgZHgyLCB0aGlzLnkgKyBkeTIgXTtcbiAgICAgICAgdGhpcy5wb2ludHNbMl0gPSBbIHRoaXMueCAtIGR4MSwgdGhpcy55IC0gZHkxIF07XG4gICAgICAgIHRoaXMucG9pbnRzWzNdID0gWyB0aGlzLnggKyBkeDEsIHRoaXMueSAtIGR5MSBdO1xuICAgICAgICB0aGlzLnBvaW50c1s0XSA9IFsgdGhpcy54IC0gZHgyLCB0aGlzLnkgKyBkeTIgXTsgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHsgICAgICAgICBcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHRoaXMucG9pbnRzWzBdWzBdLCB0aGlzLnBvaW50c1swXVsxXSk7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnBvaW50c1tpXVswXSwgdGhpcy5wb2ludHNbaV1bMV0pO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICB0aGlzLmRyYXdDb3VudCsrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9SYWRpYW5zIChhbmdsZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGFuZ2xlICogKE1hdGguUEkgLyAxODApO1xuICB9IiwiaW1wb3J0IHsgU3ByaXRlLCBGaXJpbmdTcHJpdGUsIENvbnRyb2xsYWJsZVNwcml0ZSwgU3ByaXRlQ29udHJvbCB9IGZyb20gJy4uL2NvcmUvU3ByaXRlJztcbmltcG9ydCBCYXNlU3ByaXRlIGZyb20gJy4uL2NvcmUvQmFzZVNwcml0ZSc7XG5pbXBvcnQgY3JlYXRlTWlzc2lsZSBmcm9tICcuL01pc3NpbGUnO1xuaW1wb3J0IGd1bkltYWdlIGZyb20gJy4uL2ltYWdlcy9ndW4ucG5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEd1bih4LCB5KTtcbn1cblxuLy8gY291bGQgbG9hZGluZyBhbiBpbWFnZSBiZSBhbnkgbW9yZSBjb252b2x1dGVkP1xubGV0IGJpdG1hcDogSW1hZ2VCaXRtYXAgPSBudWxsO1xubGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG5pbWFnZS5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbiBsb2FkSW1hZ2UoKSB7XG4gICAgYml0bWFwID0gYXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAoaW1hZ2UsIDAsIDAsIDUwLCAzOCk7XG59XG5pbWFnZS5zcmMgPSBndW5JbWFnZTtcblxuZXhwb3J0IGNsYXNzIEd1biBleHRlbmRzIEJhc2VTcHJpdGUgaW1wbGVtZW50cyBGaXJpbmdTcHJpdGUsIENvbnRyb2xsYWJsZVNwcml0ZSB7XG5cbiAgICBwdWJsaWMgY29udHJvbDogU3ByaXRlQ29udHJvbCA9IFNwcml0ZUNvbnRyb2wuTk9ORTtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIHRoaXMuX3dpZHRoID0gNTA7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDM4O1xuXG4gICAgICAgIHRoaXMuX2R4ID0gMTU7XG4gICAgICAgIHRoaXMuX2R5ID0gMDtcblxuICAgICAgICB0aGlzLl9zdHJlbmd0aCA9IDM7XG4gICAgICAgIHRoaXMuX3Njb3JlTW9kaWZpZXIgPSAtNTAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNNb3ZpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPT09IFNwcml0ZUNvbnRyb2wuTU9WRV9MRUZUIHx8IFxuICAgICAgICAgICAgdGhpcy5jb250cm9sID09PSBTcHJpdGVDb250cm9sLk1PVkVfUklHSFRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNGaXJpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wgPT09IFNwcml0ZUNvbnRyb2wuRklSRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYoIXRoaXMuaXNNb3ZpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy54ID4gMCAmJiB0aGlzLmNvbnRyb2wgPT09IFNwcml0ZUNvbnRyb2wuTU9WRV9MRUZUKSB7XG4gICAgICAgICAgICB0aGlzLl94IC09IHRoaXMuX2R4O1xuICAgICAgICB9IGVsc2UgaWYodGhpcy54ICsgdGhpcy53aWR0aCA8PSA1MDAgJiYgdGhpcy5jb250cm9sID09PSBTcHJpdGVDb250cm9sLk1PVkVfUklHSFQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ggKz0gdGhpcy5fZHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZSgpOiBTcHJpdGUge1xuICAgICAgICByZXR1cm4gY3JlYXRlTWlzc2lsZSh0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpLCB0aGlzLnkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgICAgIGlmKGJpdG1hcCkge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBCYXNlU3ByaXRlIGZyb20gJy4uL2NvcmUvQmFzZVNwcml0ZSc7XG5pbXBvcnQgY3JlYXRlQm9tYiwgeyBCb21iIH0gZnJvbSAnLi9Cb21iJztcbmltcG9ydCB7IFNwcml0ZSwgRmlyaW5nU3ByaXRlIH0gZnJvbSAnLi4vY29yZS9TcHJpdGUnO1xuaW1wb3J0IHsgcmFuZEluUmFuZ2UgfSBmcm9tICcuLi9jb3JlL2hlbHBlcnMnO1xuaW1wb3J0IHNvdW5kIGZyb20gJy4uL3NvdW5kcy9pbnZhZGVyLm1wMyc7XG5pbXBvcnQgZ3VuSW1hZ2UgZnJvbSAnLi4vaW1hZ2VzL2ludmFkZXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnZhZGVyKCk7XG59XG5cbi8vIGNvdWxkIGxvYWRpbmcgYW4gaW1hZ2UgYmUgYW55IG1vcmUgY29udm9sdXRlZD9cbmxldCBiaXRtYXA6IEltYWdlQml0bWFwID0gbnVsbDtcbmxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuaW1hZ2Uub25sb2FkID0gYXN5bmMgZnVuY3Rpb24gbG9hZEltYWdlKCkge1xuICAgIGJpdG1hcCA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKGltYWdlLCAwLCAwLCA0NSwgMTkpO1xufVxuaW1hZ2Uuc3JjID0gZ3VuSW1hZ2U7XG5cbmV4cG9ydCBjbGFzcyBJbnZhZGVyIGV4dGVuZHMgQmFzZVNwcml0ZSBpbXBsZW1lbnRzIEZpcmluZ1Nwcml0ZSB7XG5cbiAgICBwcml2YXRlIF9hZ2dyZXNzaXZlbmVzczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fd2lkdGggPSA0NTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMTk7XG5cbiAgICAgICAgdGhpcy5fZHggPSByYW5kSW5SYW5nZSg0LCA4KTtcbiAgICAgICAgdGhpcy5fZHkgPSByYW5kSW5SYW5nZSgxLCAyKTtcblxuICAgICAgICBpZihNYXRoLnJhbmRvbSgpID49IDAuNSkge1xuICAgICAgICAgICAgdGhpcy5feCA9IDAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gNTAwIC0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2R4ICo9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuXG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoID0gMTtcbiAgICAgICAgdGhpcy5fc2NvcmVNb2RpZmllciA9IDUwMDtcbiAgICAgICAgdGhpcy5fYWdncmVzc2l2ZW5lc3MgPSByYW5kSW5SYW5nZSg5MywgOTgpO1xuXG4gICAgICAgIHRoaXMucGxheShzb3VuZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQWxpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBzdXBlci5pc0FsaXZlKCkgJiYgdGhpcy55ID49IDA7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoKTogdm9pZCB7ICAgICAgICBcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IDUwMCB8fCB0aGlzLnggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9keCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gMzIwIHx8IHRoaXMueSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2R5ICo9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIubW92ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlKCk6IFNwcml0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRmlyaW5nKCkgP1xuICAgICAgICAgICAgY3JlYXRlQm9tYih0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpLCB0aGlzLnkpIDpcbiAgICAgICAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRmlyaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+PSAodGhpcy5fYWdncmVzc2l2ZW5lc3MgLyAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgICAgIGlmKGJpdG1hcCkge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfSAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuLi9jb3JlL1Nwcml0ZSc7XG5pbXBvcnQgQmFzZVNwcml0ZSBmcm9tICcuLi9jb3JlL0Jhc2VTcHJpdGUnO1xuaW1wb3J0IHNob3QgZnJvbSAnLi4vc291bmRzL3Nob3QubXAzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IE1pc3NpbGUoeCwgeSk7XG59XG5cbmV4cG9ydCBjbGFzcyBNaXNzaWxlIGV4dGVuZHMgQmFzZVNwcml0ZSBpbXBsZW1lbnRzIFNwcml0ZSB7XG5cbiAgICBwcml2YXRlIHBvaW50czogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIHRoaXMuX3dpZHRoID0gNTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMTQ7XG5cbiAgICAgICAgdGhpcy5fZHggPSAwO1xuICAgICAgICB0aGlzLl9keSA9IC0xNTtcblxuICAgICAgICB0aGlzLl9zdHJlbmd0aCA9IDE7ICAgICAgICBcblxuICAgICAgICB0aGlzLnBvaW50c1swXSA9IFsgeCArIDAsIHkgKyA2IF07XG4gICAgICAgIHRoaXMucG9pbnRzWzFdID0gWyB4ICsgMCwgeSArIDEzIF07XG4gICAgICAgIHRoaXMucG9pbnRzWzJdID0gWyB4ICsgNCwgeSArIDEzIF07XG4gICAgICAgIHRoaXMucG9pbnRzWzNdID0gWyB4ICsgNCwgeSArIDYgXTtcbiAgICAgICAgdGhpcy5wb2ludHNbNF0gPSBbIHggKyAyLCB5ICsgMCBdO1xuXG4gICAgICAgIHRoaXMucGxheShzaG90KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmlzQWxpdmUoKSAmJiB0aGlzLnkgPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5tb3ZlKCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50c1tpXVswXSArPSB0aGlzLl9keDtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzW2ldWzFdICs9IHRoaXMuX2R5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy5wb2ludHNbMF1bMF0sIHRoaXMucG9pbnRzWzBdWzFdKTtcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMucG9pbnRzW2ldWzBdLCB0aGlzLnBvaW50c1tpXVsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAgJ3JnYigyMDAsIDIwMCwgMjAwKSc7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uL2NvcmUvU3ByaXRlJztcbmltcG9ydCBCYXNlU3ByaXRlIGZyb20gJy4uL2NvcmUvQmFzZVNwcml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBTaGVsdGVyQmxvY2soeCwgeSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTaGVsdGVyQmxvY2sgZXh0ZW5kcyBCYXNlU3ByaXRlIGltcGxlbWVudHMgU3ByaXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIHRoaXMuX3dpZHRoID0gODtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gNjtcblxuICAgICAgICB0aGlzLl9zdHJlbmd0aCA9IDI7XG4gICAgICAgIHRoaXMuX3Njb3JlTW9kaWZpZXIgPSAtMTA7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMTQxLCAxNzgsIDIwMSknO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==