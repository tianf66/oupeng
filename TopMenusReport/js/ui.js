/*! 2018 Baidu Inc. All Rights Reserved */
define('esui/validator/Validity', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    function Validity() {
        this.states = [];
        this.stateIndex = {};
        this.customMessage = '';
        this.customValidState = null;
    }
    Validity.prototype.addState = function (name, state) {
        if (this.stateIndex[name]) {
            if (this.stateIndex[name] === state) {
                return;
            }
            for (var i = 0; i < this.states.length; i++) {
                if (this.states[i] === this.stateIndex[name]) {
                    this.states.splice(i, 1);
                    break;
                }
            }
        }
        this.states.push(state);
        this.stateIndex[name] = state;
    };
    Validity.prototype.getState = function (name) {
        return this.stateIndex[name] || null;
    };
    Validity.prototype.getStates = function () {
        return this.states.slice();
    };
    Validity.prototype.getCustomMessage = function () {
        return this.customMessage;
    };
    Validity.prototype.setCustomMessage = function (message) {
        this.customMessage = message;
    };
    Validity.prototype.setCustomValidState = function (validState) {
        this.customValidState = validState;
    };
    Validity.prototype.isValid = function () {
        return u.all(this.getStates(), function (state) {
            return state.getState();
        });
    };
    Validity.prototype.getValidState = function () {
        return this.customValidState || (this.isValid() ? 'valid' : 'invalid');
    };
    return Validity;
});

define('esui/validator/RequiredRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function RequiredRule() {
        Rule.apply(this, arguments);
    }
    RequiredRule.prototype.type = 'required';
    RequiredRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u4E3A\u7A7A';
    RequiredRule.prototype.check = function (value, control) {
        return new ValidityState(!!value, this.getErrorMessage(control));
    };
    require('../lib').inherits(RequiredRule, Rule);
    require('../main').registerRule(RequiredRule, 0);
    return RequiredRule;
});

define('esui/validator/PatternRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function PatternRule() {
        Rule.apply(this, arguments);
    }
    PatternRule.prototype.type = 'pattern';
    PatternRule.prototype.errorMessage = '${title}\u683C\u5F0F\u4E0D\u7B26\u5408\u8981\u6C42';
    PatternRule.prototype.check = function (value, control) {
        var regex = new RegExp(this.getLimitCondition(control));
        return new ValidityState(!value || regex.test(value), this.getErrorMessage(control));
    };
    require('../lib').inherits(PatternRule, Rule);
    require('../main').registerRule(PatternRule, 200);
    return PatternRule;
});

define('esui/validator/MinRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MinRule() {
        Rule.apply(this, arguments);
    }
    MinRule.prototype.type = 'min';
    MinRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u5C0F\u4E8E${min}';
    MinRule.prototype.check = function (value, control) {
        var valueOfNumber = +value;
        var isValidNumber = !isNaN(valueOfNumber) && valueOfNumber >= this.getLimitCondition(control);
        return new ValidityState(!value || isValidNumber, this.getErrorMessage(control));
    };
    require('../lib').inherits(MinRule, Rule);
    require('../main').registerRule(MinRule, 300);
    return MinRule;
});

define('esui/validator/MinLengthRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MinLengthRule() {
        Rule.apply(this, arguments);
    }
    MinLengthRule.prototype.type = 'minLength';
    MinLengthRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u5C0F\u4E8E${minLength}\u4E2A\u5B57\u7B26';
    MinLengthRule.prototype.check = function (value, control) {
        return new ValidityState(value.length >= this.getLimitCondition(control), this.getErrorMessage(control));
    };
    require('../lib').inherits(MinLengthRule, Rule);
    require('../main').registerRule(MinLengthRule, 100);
    return MinLengthRule;
});

define('esui/validator/MinByteLengthRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MinByteLengthRule() {
        Rule.apply(this, arguments);
    }
    MinByteLengthRule.prototype.type = 'minByteLength';
    MinByteLengthRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u5C0F\u4E8E${minByteLength}\u4E2A\u5B57\u7B26';
    MinByteLengthRule.prototype.check = function (value, control) {
        var byteLength = value.replace(/[^\x00-\xff]/g, 'xx').length;
        return new ValidityState(byteLength >= this.getLimitCondition(control), this.getErrorMessage(control));
    };
    require('../lib').inherits(MinByteLengthRule, Rule);
    require('../main').registerRule(MinByteLengthRule, 100);
    return MinByteLengthRule;
});

define('esui/validator/MaxRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MaxRule() {
        Rule.apply(this, arguments);
    }
    MaxRule.prototype.type = 'max';
    MaxRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u5927\u4E8E${max}';
    MaxRule.prototype.check = function (value, control) {
        var valueOfNumber = +value;
        var isValidNumber = !isNaN(valueOfNumber) && valueOfNumber <= this.getLimitCondition(control);
        return new ValidityState(!value || isValidNumber, this.getErrorMessage(control));
    };
    require('../lib').inherits(MaxRule, Rule);
    require('../main').registerRule(MaxRule, 301);
    return MaxRule;
});

define('esui/validator/MaxByteLengthRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MaxByteLengthRule() {
        Rule.apply(this, arguments);
    }
    MaxByteLengthRule.prototype.type = 'maxByteLength';
    MaxByteLengthRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u8D85\u8FC7${maxByteLength}\u4E2A\u5B57\u7B26';
    MaxByteLengthRule.prototype.check = function (value, control) {
        var byteLength = value.replace(/[^\x00-\xff]/g, 'xx').length;
        return new ValidityState(byteLength <= this.getLimitCondition(control), this.getErrorMessage(control));
    };
    require('../lib').inherits(MaxByteLengthRule, Rule);
    require('../main').registerRule(MaxByteLengthRule, 100);
    return MaxByteLengthRule;
});

define('esui/lib/lang', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    var lib = {};
    var counter = 8785925;
    lib.getGUID = function (prefix) {
        prefix = prefix || 'esui';
        return prefix + counter++;
    };
    lib.inherits = function (subClass, superClass) {
        var Empty = function () {
        };
        Empty.prototype = superClass.prototype;
        var selfPrototype = subClass.prototype;
        var proto = subClass.prototype = new Empty();
        for (var key in selfPrototype) {
            proto[key] = selfPrototype[key];
        }
        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;
        return subClass;
    };
    lib.clone = function (source) {
        if (!source || typeof source !== 'object') {
            return source;
        }
        var result = source;
        if (u.isArray(source)) {
            result = u.clone(source);
        } else if ({}.toString.call(source) === '[object Object]' && 'isPrototypeOf' in source) {
            result = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = lib.deepClone(source[key]);
                }
            }
        }
        return result;
    };
    lib.deepClone = lib.clone;
    lib.toDictionary = function (array) {
        var dictionary = {};
        u.each(array, function (value) {
            dictionary[value] = true;
        });
        return dictionary;
    };
    lib.isArray = u.isArray;
    lib.toArray = u.toArray;
    lib.extend = u.extend;
    lib.bind = u.bind;
    lib.curry = u.partial;
    lib.indexOf = u.indexOf;
    lib.decodeHTML = u.unescape;
    lib.encodeHTML = u.escape;
    return lib;
});

define('esui/lib/page', ['require'], function (require) {
    var documentElement = document.documentElement;
    var body = document.body;
    var viewRoot = document.compatMode === 'BackCompat' ? body : documentElement;
    var page = {};
    page.getWidth = function () {
        return Math.max(documentElement ? documentElement.scrollWidth : 0, body ? body.scrollWidth : 0, viewRoot ? viewRoot.clientWidth : 0, 0);
    };
    page.getHeight = function () {
        return Math.max(documentElement ? documentElement.scrollHeight : 0, body ? body.scrollHeight : 0, viewRoot ? viewRoot.clientHeight : 0, 0);
    };
    page.getViewWidth = function () {
        return viewRoot ? viewRoot.clientWidth : 0;
    };
    page.getViewHeight = function () {
        return viewRoot ? viewRoot.clientHeight : 0;
    };
    page.getScrollTop = function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };
    page.getScrollLeft = function () {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    };
    page.getClientTop = function () {
        return document.documentElement.clientTop || document.body.clientTop || 0;
    };
    page.getClientLeft = function () {
        return document.documentElement.clientLeft || document.body.clientLeft || 0;
    };
    return { page: page };
});

define('esui/lib/event', [
    'require',
    './dom',
    './page'
], function (require) {
    var dom = require('./dom');
    var page = require('./page').page;
    var event = {};
    event.preventDefault = function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
    event.stopPropagation = function (event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };
    event.getMousePosition = function (event) {
        event = event || window.event;
        if (typeof event.pageX !== 'number') {
            event.pageX = event.clientX + page.getScrollLeft() - page.getClientLeft();
        }
        if (typeof event.pageY !== 'number') {
            event.pageY = event.clientY + page.getScrollTop() - page.getClientTop();
        }
        return event;
    };
    event.getTarget = function (event) {
        event = event || window.event;
        return event.target || event.srcElement;
    };
    return {
        on: function (element, type, listener) {
            element = dom.g(element);
            if (element.addEventListener) {
                element.addEventListener(type, listener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, listener);
            }
        },
        un: function (element, type, listener) {
            element = dom.g(element);
            if (element.addEventListener) {
                element.removeEventListener(type, listener, false);
            } else if (element.attachEvent) {
                element.detachEvent('on' + type, listener);
            }
        },
        event: event
    };
});

define('esui/lib/date', [
    'require',
    'moment'
], function (require) {
    var moment = require('moment');
    var date = {};
    date.dateFormats = [
        'YYYYMMDDHHmmss',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY/MM/DD HH:mm:ss',
        'YYYY-MM-DDTHH:mm:ss.SSSZ'
    ];
    date.format = function (source, pattern) {
        return moment(source).format(pattern);
    };
    date.parse = function (source, format) {
        var dateTime = moment(source, format || date.dateFormats);
        return dateTime.toDate();
    };
    return { date: date };
});

define('esui/lib/class', [
    'require',
    'underscore',
    './dom'
], function (require) {
    var u = require('underscore');
    var dom = require('./dom');
    var lib = {};
    lib.getClassList = function (element) {
        return element.className ? element.className.split(/\s+/) : [];
    };
    lib.hasClass = function (element, className) {
        element = dom.g(element);
        if (className === '') {
            throw new Error('className must not be empty');
        }
        if (!element || !className) {
            return false;
        }
        if (element.classList) {
            return element.classList.contains(className);
        }
        var classes = this.getClassList(element);
        return u.contains(classes, className);
    };
    lib.addClass = function (element, className) {
        element = dom.g(element);
        if (className === '') {
            throw new Error('className must not be empty');
        }
        if (!element || !className) {
            return element;
        }
        if (element.classList) {
            element.classList.add(className);
            return element;
        }
        var classes = this.getClassList(element);
        if (u.contains(classes, className)) {
            return element;
        }
        classes.push(className);
        element.className = classes.join(' ');
        return element;
    };
    lib.addClasses = function (element, classes) {
        element = dom.g(element);
        if (!element || !classes) {
            return element;
        }
        if (element.classList) {
            u.each(classes, function (className) {
                element.classList.add(className);
            });
            return element;
        }
        var originalClasses = this.getClassList(element);
        var newClasses = u.union(originalClasses, classes);
        if (newClasses.length > originalClasses.length) {
            element.className = newClasses.join(' ');
        }
        return element;
    };
    lib.removeClass = function (element, className) {
        element = dom.g(element);
        if (className === '') {
            throw new Error('className must not be empty');
        }
        if (!element || !className) {
            return element;
        }
        if (element.classList) {
            element.classList.remove(className);
            return element;
        }
        var classes = this.getClassList(element);
        var changed = false;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                i--;
                changed = true;
            }
        }
        if (changed) {
            element.className = classes.join(' ');
        }
        return element;
    };
    lib.removeClasses = function (element, classes) {
        element = dom.g(element);
        if (!element || !classes) {
            return element;
        }
        if (element.classList) {
            u.each(classes, function (className) {
                element.classList.remove(className);
            });
            return element;
        }
        var originalClasses = this.getClassList(element);
        var newClasses = u.difference(originalClasses, classes);
        if (newClasses.length < originalClasses.length) {
            element.className = newClasses.join(' ');
        }
        return element;
    };
    lib.toggleClass = function (element, className) {
        element = dom.g(element);
        if (className === '') {
            throw new Error('className must not be empty');
        }
        if (!element || !className) {
            return element;
        }
        if (element.classList) {
            element.classList.toggle(className);
            return element;
        }
        var classes = this.getClassList(element);
        var containsClass = false;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                containsClass = true;
                i--;
            }
        }
        if (!containsClass) {
            classes.push(className);
        }
        element.className = classes.join(' ');
        return element;
    };
    return lib;
});

define('esui/helper/template', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    var FILTERS = {
        'id': function (part, instance) {
            return instance.helper.getId(part);
        },
        'class': function (part, instance) {
            return instance.helper.getPartClassName(part);
        },
        'part': function (part, nodeName, instance) {
            return instance.helper.getPartHTML(part, nodeName);
        }
    };
    var helper = {};
    helper.setTemplateEngine = function (engine) {
        this.templateEngine = engine;
        if (!engine.esui) {
            this.initializeTemplateEngineExtension();
        }
    };
    helper.initializeTemplateEngineExtension = function () {
        u.each(FILTERS, function (filter, name) {
            this.addFilter(name, filter);
        }, this.templateEngine);
    };
    helper.renderTemplate = function (target, data) {
        var helper = this;
        data = data || {};
        var templateData = {
            get: function (name) {
                if (name === 'instance') {
                    return helper.control;
                }
                if (typeof data.get === 'function') {
                    return data.get(name);
                }
                var propertyName = name;
                var filter = null;
                var indexOfDot = name.lastIndexOf('.');
                if (indexOfDot > 0) {
                    propertyName = name.substring(0, indexOfDot);
                    var filterName = name.substring(indexOfDot + 1);
                    if (filterName && FILTERS.hasOwnProperty(filterName)) {
                        filter = FILTERS[filterName];
                    }
                }
                var value = data.hasOwnProperty(propertyName) ? data[propertyName] : propertyName;
                if (filter) {
                    value = filter(value, helper.control);
                }
                return value;
            }
        };
        if (!this.templateEngine) {
            throw new Error('No template engine attached to this control');
        }
        return this.templateEngine.render(target, templateData);
    };
    return helper;
});

define('esui/helper/life', [
    'require',
    'underscore',
    '../main'
], function (require) {
    var LifeCycle = {
        NEW: 0,
        INITED: 1,
        RENDERED: 2,
        DISPOSED: 4
    };
    var u = require('underscore');
    var ui = require('../main');
    var helper = {};
    helper.initViewContext = function () {
        var viewContext = this.control.viewContext || ui.getViewContext();
        this.control.viewContext = null;
        this.control.setViewContext(viewContext);
    };
    helper.initExtensions = function () {
        var extensions = this.control.extensions;
        if (!u.isArray(extensions)) {
            extensions = this.control.extensions = [];
        }
        Array.prototype.push.apply(extensions, ui.createGlobalExtensions());
        var registeredExtensions = {};
        for (var i = 0; i < extensions.length; i++) {
            var extension = extensions[i];
            if (!registeredExtensions[extension.type]) {
                extension.attachTo(this.control);
                registeredExtensions[extension.type] = true;
            }
        }
    };
    helper.isInStage = function (stage) {
        if (LifeCycle[stage] == null) {
            throw new Error('Invalid life cycle stage: ' + stage);
        }
        return this.control.stage === LifeCycle[stage];
    };
    helper.changeStage = function (stage) {
        if (LifeCycle[stage] == null) {
            throw new Error('Invalid life cycle stage: ' + stage);
        }
        this.control.stage = LifeCycle[stage];
    };
    helper.dispose = function () {
        this.control.disposeChildren();
        this.control.children = null;
        this.control.childrenIndex = null;
        this.clearDOMEvents();
        u.invoke(this.control.extensions, 'dispose');
        this.control.extensions = null;
        if (this.control.parent) {
            this.control.parent.removeChild(this.control);
        }
        if (this.control.viewContext) {
            this.control.viewContext.remove(this.control);
        }
        this.control.renderOptions = null;
    };
    helper.beforeDispose = function () {
        this.control.fire('beforedispose');
    };
    helper.afterDispose = function () {
        this.changeStage('DISPOSED');
        this.control.fire('afterdispose');
        this.control.destroyEvents();
    };
    return helper;
});

define('esui/helper/html', ['require'], function (require) {
    var helper = {};
    var SELF_CLOSING_TAGS = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };
    helper.getPartBeginTag = function (part, nodeName) {
        var html = '<' + nodeName + ' id="' + this.getId(part) + '" ' + 'class="' + this.getPartClassName(part) + '">';
        return html;
    };
    helper.getPartEndTag = function (part, nodeName) {
        var html = SELF_CLOSING_TAGS.hasOwnProperty(nodeName) ? ' />' : '</' + nodeName + '>';
        return html;
    };
    helper.getPartHTML = function (part, nodeName) {
        return this.getPartBeginTag(part, nodeName) + this.getPartEndTag(part, nodeName);
    };
    return helper;
});

define('esui/helper/event', [
    'require',
    'underscore',
    'mini-event/EventQueue',
    '../lib',
    'mini-event'
], function (require) {
    var DOM_EVENTS_KEY = '_esuiDOMEvent';
    var globalEvents = {
        window: {},
        document: {},
        documentElement: {},
        body: {}
    };
    var u = require('underscore');
    var EventQueue = require('mini-event/EventQueue');
    var lib = require('../lib');
    var helper = {};
    function getGlobalEventPool(element) {
        if (element === window) {
            return globalEvents.window;
        }
        if (element === document) {
            return globalEvents.document;
        }
        if (element === document.documentElement) {
            return globalEvents.documentElement;
        }
        if (element === document.body) {
            return globalEvents.body;
        }
        return null;
    }
    function triggerGlobalDOMEvent(element, e) {
        var pool = getGlobalEventPool(element);
        if (!pool) {
            return;
        }
        var queue = pool[e.type];
        if (!queue) {
            return;
        }
        u.each(queue, function (control) {
            if (control) {
                triggerDOMEvent(control, element, e);
            }
        });
    }
    function debounce(fn, interval) {
        interval = interval || 150;
        var timer = 0;
        return function (e) {
            clearTimeout(timer);
            var self = this;
            e = e || window.event;
            e = {
                type: e.type,
                srcElement: e.srcElement,
                target: e.target,
                currentTarget: e.currentTarget
            };
            timer = setTimeout(function () {
                fn.call(self, e);
            }, interval);
        };
    }
    function addGlobalDOMEvent(control, type, element) {
        var pool = getGlobalEventPool(element);
        if (!pool) {
            return false;
        }
        var controls = pool[type];
        if (!controls) {
            controls = pool[type] = [];
            var handler = u.partial(triggerGlobalDOMEvent, element);
            if (type === 'resize' || type === 'scroll') {
                handler = debounce(handler);
            }
            controls.handler = handler;
            lib.on(element, type, controls.handler);
        }
        if (u.indexOf(controls, control) >= 0) {
            return;
        }
        controls.push(control);
        return true;
    }
    function removeGlobalDOMEvent(control, type, element) {
        var pool = getGlobalEventPool(element);
        if (!pool) {
            return false;
        }
        if (!pool[type]) {
            return true;
        }
        var controls = pool[type];
        for (var i = 0; i < controls.length; i++) {
            if (controls[i] === control) {
                controls[i] = null;
                break;
            }
        }
        var isQueueEmpty = u.all(controls, function (control) {
            return control == null;
        });
        if (isQueueEmpty) {
            var handler = controls.handler;
            lib.un(element, type, handler);
            pool[type] = null;
        }
        return true;
    }
    function triggerDOMEvent(control, element, e) {
        e = e || window.event;
        var isInIgnoringState = u.any(control.ignoreStates, function (state) {
            return control.hasState(state);
        });
        if (isInIgnoringState) {
            return;
        }
        if (!e.target) {
            e.target = e.srcElement;
        }
        if (!e.currentTarget) {
            e.currentTarget = element;
        }
        if (!e.preventDefault) {
            e.preventDefault = function () {
                e.returnValue = false;
            };
        }
        if (!e.stopPropagation) {
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };
        }
        var queue = control.domEvents[e.currentTarget[DOM_EVENTS_KEY]][e.type];
        if (!queue) {
            return;
        }
        queue.execute(e, control);
    }
    helper.addDOMEvent = function (element, type, handler) {
        if (typeof element === 'string') {
            element = this.getPart(element);
        }
        if (!this.control.domEvents) {
            this.control.domEvents = {};
        }
        var guid = element[DOM_EVENTS_KEY];
        if (!guid) {
            guid = element[DOM_EVENTS_KEY] = lib.getGUID();
        }
        var events = this.control.domEvents[guid];
        if (!events) {
            events = this.control.domEvents[guid] = { element: element };
        }
        var isGlobal = addGlobalDOMEvent(this.control, type, element);
        var queue = events[type];
        if (!queue) {
            queue = events[type] = new EventQueue();
            if (!isGlobal) {
                queue.handler = u.partial(triggerDOMEvent, this.control, element);
                lib.on(element, type, queue.handler);
            }
        }
        queue.add(handler);
    };
    helper.delegateDOMEvent = function (element, type, newType) {
        var handler = function (e) {
            var event = require('mini-event').fromDOMEvent(e);
            this.fire(newType || e.type, event);
            if (event.isDefaultPrevented()) {
                lib.event.preventDefault(e);
            }
            if (event.isPropagationStopped()) {
                lib.event.stopPropagation(e);
            }
        };
        this.addDOMEvent(element, type, handler);
    };
    helper.removeDOMEvent = function (element, type, handler) {
        if (typeof element === 'string') {
            element = this.getPart(element);
        }
        if (!this.control.domEvents) {
            return;
        }
        var guid = element[DOM_EVENTS_KEY];
        var events = this.control.domEvents[guid];
        if (!events || !events[type]) {
            return;
        }
        if (!handler) {
            events[type].clear();
        } else {
            var queue = events[type];
            queue.remove(handler);
            if (!queue.getLength()) {
                removeGlobalDOMEvent(this.control, type, element);
            }
        }
    };
    helper.clearDOMEvents = function (element) {
        if (typeof element === 'string') {
            element = this.getPart(element);
        }
        if (!this.control.domEvents) {
            return;
        }
        if (!element) {
            u.each(u.pluck(this.control.domEvents, 'element'), this.clearDOMEvents, this);
            this.control.domEvents = null;
            return;
        }
        var guid = element[DOM_EVENTS_KEY];
        var events = this.control.domEvents[guid];
        delete events.element;
        u.each(events, function (queue, type) {
            var isGlobal = removeGlobalDOMEvent(this.control, type, element);
            if (!isGlobal) {
                var handler = queue.handler;
                queue.dispose();
                queue.handler = null;
                lib.un(element, type, handler);
            }
        }, this);
        delete this.control.domEvents[guid];
    };
    return helper;
});

define('esui/helper/dom', [
    'require',
    'underscore',
    '../lib',
    '../main'
], function (require) {
    function getControlClassType(control) {
        var type = control.styleType || control.type;
        return type.toLowerCase();
    }
    function joinByStrike() {
        return [].slice.call(arguments, 0).join('-');
    }
    var u = require('underscore');
    var lib = require('../lib');
    var ui = require('../main');
    var helper = {};
    helper.getPartClasses = function (part) {
        if (part && this.partClassCache && this.partClassCache.hasOwnProperty(part)) {
            return this.partClassCache[part].slice();
        }
        var type = getControlClassType(this.control);
        var skin = this.control.skin;
        var prefix = ui.getConfig('uiClassPrefix');
        var skinPrefix = ui.getConfig('skinClassPrefix');
        var classes = [];
        if (part) {
            classes.push(joinByStrike(prefix, type, part));
            if (skin) {
                classes.push(joinByStrike(skinPrefix, skin, type, part));
            }
            if (!this.partClassCache) {
                this.partClassCache = {};
                this.partClassCache[part] = classes.slice();
            }
        } else {
            classes.push(joinByStrike(prefix, 'ctrl'));
            classes.push(joinByStrike(prefix, type));
            if (skin) {
                classes.push(joinByStrike(skinPrefix, skin), joinByStrike(skinPrefix, skin, type));
            }
        }
        return classes;
    };
    helper.getPartClassName = function (part) {
        return this.getPartClasses(part).join(' ');
    };
    helper.getPrimaryClassName = function (part) {
        var type = getControlClassType(this.control);
        if (part) {
            return joinByStrike(ui.getConfig('uiClassPrefix'), type, part);
        } else {
            return joinByStrike(ui.getConfig('uiClassPrefix'), type);
        }
    };
    helper.addPartClasses = function (part, element) {
        if (typeof element === 'string') {
            element = this.getPart(element);
        }
        element = element || this.control.main;
        if (element) {
            lib.addClasses(element, this.getPartClasses(part));
        }
    };
    helper.removePartClasses = function (part, element) {
        if (typeof element === 'string') {
            element = this.getPart(element);
        }
        element = element || this.control.main;
        if (element) {
            lib.removeClasses(element, this.getPartClasses(part));
        }
    };
    helper.getStateClasses = function (state) {
        if (this.stateClassCache && this.stateClassCache.hasOwnProperty(state)) {
            return this.stateClassCache[state].slice();
        }
        var type = getControlClassType(this.control);
        var getConf = ui.getConfig;
        var classes = [
            joinByStrike(getConf('uiClassPrefix'), type, state),
            joinByStrike(getConf('stateClassPrefix'), state)
        ];
        var skin = this.control.skin;
        if (skin) {
            var skinPrefix = getConf('skinClassPrefix');
            classes.push(joinByStrike(skinPrefix, skin, state), joinByStrike(skinPrefix, skin, type, state));
        }
        if (!this.stateClassCache) {
            this.stateClassCache = {};
            this.stateClassCache[state] = classes.slice();
        }
        return classes;
    };
    helper.addStateClasses = function (state) {
        var element = this.control.main;
        if (element) {
            lib.addClasses(element, this.getStateClasses(state));
        }
    };
    helper.removeStateClasses = function (state) {
        var element = this.control.main;
        if (element) {
            lib.removeClasses(element, this.getStateClasses(state));
        }
    };
    helper.getId = function (part) {
        part = part ? '-' + part : '';
        if (!this.control.domIDPrefix) {
            this.control.domIDPrefix = this.control.viewContext && this.control.viewContext.id;
        }
        var prefix = this.control.domIDPrefix ? this.control.domIDPrefix + '-' : '';
        return 'ctrl-' + prefix + this.control.id + part;
    };
    helper.createPart = function (part, nodeName) {
        nodeName = nodeName || 'div';
        var element = document.createElement(nodeName);
        element.id = this.getId(part);
        this.addPartClasses(part, element);
        return element;
    };
    helper.getPart = function (part) {
        return lib.g(this.getId(part));
    };
    helper.isPart = function (element, part) {
        var className = this.getPartClasses(part)[0];
        return lib.hasClass(element, className);
    };
    var INPUT_SPECIFIED_ATTRIBUTES = {
        type: true,
        name: true,
        alt: true,
        autocomplete: true,
        autofocus: true,
        checked: true,
        dirname: true,
        disabled: true,
        form: true,
        formaction: true,
        formenctype: true,
        formmethod: true,
        formnovalidate: true,
        formtarget: true,
        width: true,
        height: true,
        inputmode: true,
        list: true,
        max: true,
        maxlength: true,
        min: true,
        minlength: true,
        multiple: true,
        pattern: true,
        placeholder: true,
        readonly: true,
        required: true,
        size: true,
        src: true,
        step: true,
        value: true
    };
    helper.replaceMain = function (main) {
        main = main || this.control.createMain();
        var initialMain = this.control.main;
        initialMain.setAttribute(ui.getConfig('instanceAttr'), lib.getGUID());
        var attributes = initialMain.attributes;
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var name = attribute.name;
            if (lib.hasAttribute(initialMain, name) && !INPUT_SPECIFIED_ATTRIBUTES.hasOwnProperty(name)) {
                lib.setAttribute(main, name, attribute.value);
                if (name.indexOf(ui.getConfig('uiPrefix')) === 0) {
                    initialMain.removeAttribute(name);
                    i--;
                }
            }
        }
        lib.insertBefore(main, initialMain);
        initialMain.parentNode.removeChild(initialMain);
        this.control.main = main;
        return initialMain;
    };
    var INPUT_PROPERTY_MAPPING = {
        name: { name: 'name' },
        maxlength: {
            name: 'maxLength',
            type: 'number'
        },
        required: {
            name: 'required',
            type: 'boolean'
        },
        pattern: { name: 'pattern' },
        min: {
            name: 'min',
            type: 'number'
        },
        max: {
            name: 'max',
            type: 'number'
        },
        autofocus: {
            name: 'autoFocus',
            type: 'boolean'
        },
        disabled: {
            name: 'disabled',
            type: 'boolean'
        },
        readonly: {
            name: 'readOnly',
            type: 'boolean'
        }
    };
    helper.extractOptionsFromInput = function (input, options) {
        var result = {};
        u.each(INPUT_PROPERTY_MAPPING, function (config, attributeName) {
            var specified = lib.hasAttribute(input, attributeName);
            if (specified) {
                var value = lib.getAttribute(input, attributeName);
                switch (config.type) {
                case 'boolean':
                    value = specified;
                    break;
                case 'number':
                    value = parseInt(value, 10);
                    break;
                }
                result[config.name] = value;
            }
        });
        if (lib.hasAttribute(input, 'value') || input.nodeName.toLowerCase() !== 'select' && input.value) {
            result.value = input.value;
        }
        return u.defaults(options || {}, result);
    };
    return helper;
});

define('esui/extension/TableSubrow', [
    'require',
    '../Extension',
    '../lib',
    '../controlHelper',
    '../main',
    '../Table'
], function (require) {
    var Extension = require('../Extension');
    var lib = require('../lib');
    var helper = require('../controlHelper');
    var main = require('../main');
    var Table = require('../Table');
    function getId(table, name) {
        return helper.getId(table, name);
    }
    function getClass(table, name) {
        return helper.getPartClasses(table, name).join(' ');
    }
    function getAttr(element, key) {
        return lib.getAttribute(element, 'data-' + key);
    }
    function setAttr(element, key, value) {
        lib.setAttribute(element, 'data-' + key, value);
    }
    function hasValue(obj) {
        return !(typeof obj === 'undefined' || obj === null);
    }
    function getSubrowId(table, index) {
        return getId(table, 'subrow') + index;
    }
    function getSubentryId(table, index) {
        return getId(table, 'subentry') + index;
    }
    function getSubrowArgs(table, rowIndex) {
        return { subrow: table.subrow && table.subrow !== 'false' };
    }
    function entryOverHandler(element, e) {
        entryOver(this, element);
    }
    function entryOver(table, element) {
        var opened = /subentry-opened/.test(element.className);
        var classBase = 'subentry-hover';
        if (opened) {
            classBase = 'subentry-opened-hover';
        }
        helper.addPartClasses(table, classBase, element);
    }
    function entryOutHandler(element, e) {
        entryOut(this, element);
    }
    function entryOut(table, element) {
        helper.removePartClasses(table, 'subentry-hover', element);
        helper.removePartClasses(table, 'subentry-opened-hover', element);
    }
    function fireSubrow(el, e) {
        var table = this;
        var index = getAttr(el, 'index');
        var datasource = table.datasource;
        var dataLen = datasource instanceof Array && datasource.length;
        if (!dataLen || index >= dataLen) {
            return;
        }
        if (!getAttr(el, 'subrowopened')) {
            var dataItem = datasource[index];
            var eventArgs = {
                index: index,
                item: dataItem
            };
            eventArgs = table.fire('subrowopen', eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                openSubrow(table, index, el);
            }
        } else {
            closeSubrow(table, index, el);
        }
        entryOver(table, el);
    }
    function closeSubrow(table, index, entry) {
        var eventArgs = {
            index: index,
            item: table.datasource[index]
        };
        eventArgs = table.fire('subrowclose', eventArgs);
        if (!eventArgs.isDefaultPrevented()) {
            entryOut(table, entry);
            table.subrowIndex = null;
            helper.removePartClasses(table, 'subentry-opened', entry);
            helper.removePartClasses(table, 'row-unfolded', table.getRow(index));
            setAttr(entry, 'title', table.subEntryOpenTip);
            setAttr(entry, 'subrowopened', '');
            lib.g(getSubrowId(table, index)).style.display = 'none';
            return true;
        }
        return false;
    }
    function openSubrow(table, index, entry) {
        var currentIndex = table.subrowIndex;
        var closeSuccess = 1;
        if (hasValue(currentIndex)) {
            closeSuccess = closeSubrow(table, currentIndex, lib.g(getSubentryId(table, currentIndex)));
        }
        if (!closeSuccess) {
            return;
        }
        helper.addPartClasses(table, 'subentry-opened', entry);
        helper.addPartClasses(table, 'row-unfolded', table.getRow(index));
        setAttr(entry, 'title', table.subEntryCloseTip);
        setAttr(entry, 'subrowopened', '1');
        lib.g(getSubrowId(table, index)).style.display = '';
        table.subrowMutex && (table.subrowIndex = index);
    }
    var tplSubEntry = '<div ' + 'class="${className}" ' + 'id="${id}" ' + 'title="${title}" ' + 'data-index="${index}">' + '</div>';
    var tplSubPanel = '<div ' + 'data-ui="type:Panel;id:${id}" ' + 'data-index="${index}">' + '</div>';
    function getSubEntryHtml(table, data, field, rowIndex, fieldIndex, extraArgs) {
        var subrow = extraArgs.subrow;
        var subentry = subrow && field.subEntry;
        var result = {
            notInText: true,
            width: table.subEntryWidth,
            align: 'right'
        };
        if (subentry) {
            var isSubEntryShown = typeof field.isSubEntryShow === 'function' ? field.isSubEntryShow.call(table, data, rowIndex, fieldIndex) : true;
            if (isSubEntryShown !== false) {
                result.html = lib.format(tplSubEntry, {
                    className: getClass(table, 'subentry'),
                    id: getSubentryId(table, rowIndex),
                    title: table.subEntryOpenTip,
                    index: rowIndex
                });
            }
            result.colClass = getClass(table, 'subentryfield');
        }
        return result;
    }
    function getSubrowHtml(table, index, extraArgs) {
        var dataLen = table.datasource ? table.datasource.length : 0;
        return extraArgs.subrow ? '<div id="' + getSubrowId(table, index) + '" class="' + getClass(table, 'subrow') + ' ' + (dataLen === index + 1 ? getClass(table, 'subrow-last') : '') + '"' + ' style="display:none"></div>' : '';
    }
    function getSubrow(table, index) {
        return lib.g(getSubrowId(table, index));
    }
    function getSubrowContainer(table, index) {
        var subrowWrapper = getSubrow(table, index);
        var subrowPanelId = getId(table, 'subrow-panel-' + index);
        var subrowPanel = table.viewContext.get(subrowPanelId);
        if (!subrowPanel) {
            subrowWrapper.innerHTML = lib.format(tplSubPanel, {
                id: subrowPanelId,
                index: index
            });
            table.initChildren(subrowWrapper);
            subrowPanel = table.viewContext.get(subrowPanelId);
            table.addChild(subrowPanel);
        }
        return subrowPanel;
    }
    function TableSubrow() {
        Extension.apply(this, arguments);
    }
    TableSubrow.prototype.type = 'TableSubrow';
    TableSubrow.prototype.activate = function () {
        var target = this.target;
        if (!(target instanceof Table)) {
            return;
        }
        var getPartClasses = helper.getPartClasses;
        var subentryClass = getPartClasses(target, 'subentry')[0];
        target.addRowBuilders([{
                index: 0,
                getRowArgs: getSubrowArgs,
                getColHtml: getSubEntryHtml,
                getSubrowHtml: getSubrowHtml
            }]);
        target.addHandlers('click', {
            handler: fireSubrow,
            matchFn: subentryClass
        });
        target.addHandlers('mouseover', {
            handler: entryOverHandler,
            matchFn: subentryClass
        });
        target.addHandlers('mouseout', {
            handler: entryOutHandler,
            matchFn: subentryClass
        });
        target.getSubrow = function (index) {
            return getSubrow(this, index);
        };
        target.setSubrowContent = function (content, index) {
            var subrowPanel = getSubrowContainer(this, index);
            if (subrowPanel) {
                subrowPanel.set('content', content);
            }
        };
        target.getSubrowContainer = function (index) {
            return getSubrowContainer(this, index);
        };
        Extension.prototype.activate.apply(this, arguments);
    };
    TableSubrow.prototype.inactivate = function () {
        var target = this.target;
        if (!(target instanceof Table)) {
            return;
        }
        delete target.getSubrow;
        Extension.prototype.inactivate.apply(this, arguments);
    };
    lib.inherits(TableSubrow, Extension);
    main.registerExtension(TableSubrow);
    return TableSubrow;
});

define('esui/validator/ValidityState', [], function () {
    function ValidityState(state, message) {
        this.state = state;
        this.message = message || '';
    }
    ValidityState.prototype.getMessage = function () {
        return this.message;
    };
    ValidityState.prototype.getState = function () {
        return this.state;
    };
    ValidityState.prototype.setMessage = function (message) {
        this.message = message;
    };
    ValidityState.prototype.setState = function (state) {
        this.state = state;
    };
    return ValidityState;
});

define('esui/validator/Rule', [
    'require',
    './ValidityState',
    '../lib'
], function (require) {
    function Rule() {
    }
    Rule.prototype.type = null;
    Rule.prototype.errorMessage = '${title}\u9A8C\u8BC1\u5931\u8D25';
    Rule.prototype.check = function (value, control) {
        var ValidityState = require('./ValidityState');
        return new ValidityState(true, '');
    };
    Rule.prototype.getErrorMessage = function (control) {
        var lib = require('../lib');
        var errorMessage = control.get(this.type + 'ErrorMessage') || this.errorMessage;
        return lib.format(errorMessage, control);
    };
    Rule.prototype.getLimitCondition = function (control) {
        return control.get(this.type);
    };
    Rule.prototype.getName = function () {
        return this.type;
    };
    return Rule;
});

define('esui/validator/MaxLengthRule', [
    'require',
    './Rule',
    './ValidityState',
    '../lib',
    '../main'
], function (require) {
    var Rule = require('./Rule');
    var ValidityState = require('./ValidityState');
    function MaxLengthRule() {
        Rule.apply(this, arguments);
    }
    MaxLengthRule.prototype.type = 'maxLength';
    MaxLengthRule.prototype.errorMessage = '${title}\u4E0D\u80FD\u8D85\u8FC7${maxLength}\u4E2A\u5B57\u7B26';
    MaxLengthRule.prototype.check = function (value, control) {
        return new ValidityState(value.length <= this.getLimitCondition(control), this.getErrorMessage(control));
    };
    MaxLengthRule.prototype.getErrorMessage = function (control) {
        var lib = require('../lib');
        var errorMessage = control.get(this.type + 'ErrorMessage') || this.errorMessage;
        var maxLength = this.getLimitCondition(control);
        var data = {
            title: control.get('title'),
            maxLength: maxLength,
            length: maxLength
        };
        return lib.format(errorMessage, data);
    };
    MaxLengthRule.prototype.getLimitCondition = function (control) {
        return control.get('length') || control.get('maxLength');
    };
    require('../lib').inherits(MaxLengthRule, Rule);
    require('../main').registerRule(MaxLengthRule, 100);
    return MaxLengthRule;
});

define('esui/extension/TableEdit', [
    'require',
    '../validator/MaxLengthRule',
    '../validator/MaxRule',
    '../validator/MinRule',
    '../validator/RequiredRule',
    '../validator/PatternRule',
    '../Extension',
    '../lib',
    '../controlHelper',
    '../main',
    '../Table',
    '../validator/ValidityState',
    '../validator/Validity'
], function (require) {
    require('../validator/MaxLengthRule');
    require('../validator/MaxRule');
    require('../validator/MinRule');
    require('../validator/RequiredRule');
    require('../validator/PatternRule');
    var Extension = require('../Extension');
    var lib = require('../lib');
    var helper = require('../controlHelper');
    var main = require('../main');
    var Table = require('../Table');
    var ValidityState = require('../validator/ValidityState');
    var Validity = require('../validator/Validity');
    var layContentTpl = [
        '<div class="${optClass}">',
        '<div id="${inputFieldId}"></div>',
        '<div data-ui="id:${okId};type:Button;">${okText}</div>',
        '<div data-ui="id:${cancelId};type:Button;">',
        '${cancelText}',
        '</div>',
        '</div>',
        '<div class="${errorClass}" id="${errorId}"></div>'
    ].join('');
    var inputFieldId = 'ctrl-table-editor-inputField';
    var inputId = 'ctrl-table-editorInput';
    var validId = 'ctrl-table-editor-validityLabel';
    var okId = 'ctrl-table-editor-ok';
    var cancelId = 'ctrl-table-editor-cancel';
    var errorId = 'ctrl-table-editor-error';
    var okText = '\u786E\u5B9A';
    var cancelText = '\u53D6\u6D88';
    var inputTpl = '<input data-ui="type:TextBox;id:${inputId}"/>';
    var validTpl = '<label data-ui="type:Validity;id:${validId}"></label>';
    var currentRowIndex = -1;
    var currentColIndex = -1;
    var currentState = 0;
    var layer = null;
    var inputCtrl = null;
    var okButton = null;
    var cancelButton = null;
    var currentTable = null;
    var currentField = null;
    var guid = 1;
    function init(table, options) {
        currentTable = table;
        currentRowIndex = options.rowIndex;
        currentColIndex = options.columnIndex;
        if (!layer) {
            layer = helper.layer.create();
            document.body.appendChild(layer);
            layer.className = table.helper.getPartClassName('editor');
            initLayer();
        }
        layer.style.zIndex = table.zIndex || '';
        initInputControl(options);
    }
    function initLayer() {
        fillLayer();
        initButtonControl();
    }
    function initButtonControl() {
        var controlMap = main.init(layer);
        okButton = getControlFromMap(controlMap, okId);
        cancelButton = getControlFromMap(controlMap, cancelId);
        okButton.on('click', getOkHandler());
        cancelButton.on('click', getCancelHandler());
        setButtonDisabled(1);
    }
    function initInputControl(options) {
        if (options.field && currentField !== options.field) {
            inputCtrl && inputCtrl.dispose();
            inputCtrl = null;
            var newInputId = inputId + guid++;
            var newValidId = validId + guid;
            var inputField = lib.g(inputFieldId);
            var errorField = lib.g(errorId);
            inputField.innerHTML = lib.format(inputTpl, { inputId: newInputId });
            errorField.innerHTML = lib.format(validTpl, { validId: newValidId });
            var inputCtrlOptions = { properties: {} };
            inputCtrlOptions.properties[newInputId] = lib.extend({
                id: newInputId,
                width: 145,
                height: 20,
                validityLabel: validId + guid
            }, options.field.editRules);
            inputCtrl = main.init(inputField, inputCtrlOptions)[0];
            main.init(errorField);
            inputCtrl.on('enter', getOkHandler());
            currentField = options.field;
        }
    }
    function disposeEditorControl(table) {
        if (table === currentTable) {
            hideLayer();
            inputCtrl.dispose();
            okButton.dispose();
            cancelButton.dispose();
            try {
                layer && document.body.removeChild(layer);
            } catch (ex) {
            }
            layer = null;
            inputCtrl = null;
            okButton = null;
            cancelButton = null;
            currentTable = null;
            currentField = null;
        }
    }
    function fillLayer() {
        layer.innerHTML = lib.format(layContentTpl, {
            inputFieldId: inputFieldId,
            okId: okId,
            cancelId: cancelId,
            okText: okText,
            cancelText: cancelText,
            optClass: currentTable.helper.getPartClassName('editor-opt'),
            errorClass: currentTable.helper.getPartClassName('editor-error'),
            errorId: errorId
        });
    }
    function getControlFromMap(controlMap, id) {
        for (var i = controlMap.length - 1; i >= 0; i--) {
            var control = controlMap[i];
            if (control.id === id) {
                return control;
            }
        }
    }
    function hideLayer(argument) {
        layer && (layer.style.display = 'none');
    }
    function showLayer(argument) {
        layer && (layer.style.display = '');
    }
    function showErrorMsg(error) {
        if (error) {
            var validity = new Validity();
            validity.addState('TableEditCustomRule', new ValidityState(false, error));
            inputCtrl.showValidity(validity);
        }
    }
    function clearErrorMsg(error) {
        var validity = new Validity();
        validity.addState('TableEditCustomRule', new ValidityState(true));
        inputCtrl.showValidity(validity);
    }
    function getOkHandler() {
        return function () {
            saveEdit();
        };
    }
    function saveEdit() {
        if (inputCtrl.validate()) {
            var eventArgs = {
                value: getValue(),
                rowIndex: currentRowIndex,
                columnIndex: currentColIndex,
                field: currentTable.realFields[currentColIndex]
            };
            eventArgs = currentTable.fire('saveedit', eventArgs);
            fieldHanlder(currentTable, 'saveedit', eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                saveSuccessHandler.call(currentTable, eventArgs);
            } else {
                saveFailedHandler.call(currentTable, eventArgs);
            }
        }
    }
    function saveSuccessHandler(eventArgs) {
        if (this === currentTable) {
            hideLayer();
            currentState = 0;
        }
    }
    function saveFailedHandler(eventArgs) {
        if (this === currentTable && eventArgs.errorMsg) {
            showErrorMsg(eventArgs.errorMsg);
        }
    }
    function getCancelHandler() {
        return function () {
            stop();
        };
    }
    function tableEndDragHandler() {
        if (this === currentTable) {
            layerFollow(this);
        }
    }
    function tableResizeHandler() {
        if (this === currentTable) {
            layerFollow(this);
        }
    }
    function layerFollow(table) {
        if (layer) {
            var entrance = lib.g(table.getBodyCellId(currentRowIndex, currentColIndex));
            if (entrance) {
                helper.layer.attachTo(layer, entrance);
            }
        }
    }
    function stop() {
        currentState = 0;
        hideLayer();
        setButtonDisabled(1);
        var eventArgs = {
            rowIndex: currentRowIndex,
            columnIndex: currentColIndex,
            field: currentTable.realFields[currentColIndex]
        };
        eventArgs = currentTable.fire('canceledit', eventArgs);
        fieldHanlder(currentTable, 'canceledit', eventArgs);
    }
    function start(table, options) {
        if (currentState && currentTable) {
            stop();
        }
        currentState = 1;
        init(table, options);
        setButtonDisabled(0);
        showLayer();
        var entrance = lib.g(table.getBodyCellId(options.rowIndex, options.columnIndex));
        helper.layer.attachTo(layer, entrance);
        setValue(options.value);
        clearErrorMsg();
    }
    function setButtonDisabled(disabled) {
        okButton.setDisabled(disabled);
        cancelButton.setDisabled(disabled);
    }
    function setValue(value) {
        inputCtrl.setValue(value);
    }
    function getValue() {
        return inputCtrl.getValue();
    }
    function entranceClickHandler(element, e) {
        var table = this;
        if (table.startEdit) {
            var rowIndex = lib.getAttribute(element, 'data-row');
            var columnIndex = lib.getAttribute(element, 'data-col');
            table.startEdit(rowIndex, columnIndex, element);
        }
    }
    function startEdit(rowIndex, columnIndex, element) {
        if (this.editable) {
            var field = this.realFields[columnIndex];
            var eventArgs = {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                field: field
            };
            eventArgs = this.fire('startedit', eventArgs);
            fieldHanlder(this, 'startedit', eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                var data = this.datasource[rowIndex];
                var content = field.editContent;
                var value = 'function' === typeof content ? content.call(this, data, rowIndex, columnIndex) : data[field.field];
                start(this, {
                    field: field,
                    rowIndex: rowIndex,
                    columnIndex: columnIndex,
                    element: element,
                    value: value
                });
            }
        }
    }
    function cancelEdit() {
        if (this === currentTable) {
            stop();
        }
    }
    function hideEditLayer() {
        if (this === currentTable) {
            hideLayer();
        }
    }
    function showEditError() {
        if (this === currentTable) {
            showLayer();
        }
    }
    var editentryTpl = '<div class="${className}" ' + 'data-row="${row}" data-col="${col}"></div>';
    function getColHtml(table, data, field, rowIndex, fieldIndex, extraArgs) {
        var fieldEditable = field.editable;
        if ('function' == typeof fieldEditable) {
            fieldEditable = fieldEditable.call(table, data, rowIndex, fieldIndex, extraArgs);
        }
        if (table.editable && fieldEditable) {
            return {
                textClass: table.getClass('cell-editable'),
                html: lib.format(editentryTpl, {
                    className: table.getClass('cell-editentry'),
                    row: rowIndex,
                    col: fieldIndex
                })
            };
        }
    }
    function fieldHanlder(table, eventType, args) {
        var handler = args.field['on' + eventType];
        if (handler && '[object Function]' === Object.prototype.toString.call(handler)) {
            handler.call(table, args);
        }
    }
    function TableEdit() {
        Extension.apply(this, arguments);
    }
    TableEdit.prototype.type = 'TableEdit';
    TableEdit.prototype.activate = function () {
        var target = this.target;
        if (!(target instanceof Table)) {
            return;
        }
        target.startEdit = startEdit;
        target.cancelEdit = cancelEdit;
        target.hideEditLayer = hideEditLayer;
        target.showEditError = showEditError;
        target.addRowBuilders([{
                index: 3,
                getColHtml: getColHtml
            }]);
        target.addHandlers('click', {
            handler: entranceClickHandler,
            matchFn: helper.getPartClasses(target, 'cell-editentry')[0]
        });
        target.on('enddrag', tableEndDragHandler);
        target.on('resize', tableResizeHandler);
        Extension.prototype.activate.apply(this, arguments);
    };
    TableEdit.prototype.inactivate = function () {
        var target = this.target;
        if (!(target instanceof Table)) {
            return;
        }
        delete target.startEdit;
        delete target.cancelEdit;
        target.un('enddrag', tableEndDragHandler);
        target.un('resize', tableResizeHandler);
        disposeEditorControl(target);
        Extension.prototype.inactivate.apply(this, arguments);
    };
    lib.inherits(TableEdit, Extension);
    main.registerExtension(TableEdit);
    return TableEdit;
});

define('esui/extension/CustomData', [
    'require',
    '../Extension',
    '../main',
    '../lib'
], function (require) {
    var Extension = require('../Extension');
    function CustomData() {
        Extension.apply(this, arguments);
    }
    CustomData.prototype.type = 'CustomData';
    var dataProperty = /^data[A-Z0-9]/;
    CustomData.prototype.activate = function () {
        Extension.prototype.activate.apply(this, arguments);
        var data = this.target.data;
        if (typeof data !== 'object') {
            data = require('../main').parseAttribute(this.target.data);
        }
        for (var key in this.target) {
            if (this.target.hasOwnProperty(key) && dataProperty.test(key)) {
                var dataKey = key.charAt(4).toLowerCase() + key.slice(5);
                data[dataKey] = this.target[key];
            }
        }
        this.target.getData = function (key) {
            return data[key];
        };
        this.target.setData = function (key, value) {
            data[key] = value;
        };
    };
    CustomData.prototype.inactivate = function () {
        Extension.prototype.inactivate.apply(this, arguments);
        delete this.target.getData;
        delete this.target.setData;
    };
    require('../lib').inherits(CustomData, Extension);
    require('../main').registerExtension(CustomData);
    return CustomData;
});

define('esui/extension/Command', [
    'require',
    'underscore',
    '../lib',
    '../Extension',
    'mini-event',
    '../main'
], function (require) {
    var u = require('underscore');
    var lib = require('../lib');
    var Extension = require('../Extension');
    function Command(options) {
        options = options || {};
        if (!options.events) {
            options.events = ['click'];
        } else {
            options.events = lib.splitTokenList(options.events);
        }
        Extension.apply(this, arguments);
    }
    Command.prototype.type = 'Command';
    Command.prototype.handleCommand = function (e) {
        var target = e.target;
        var endpoint = this.main && this.main.parentNode;
        while (target && target !== endpoint) {
            if (target.nodeType === 1 && (target.disabled !== true || e.type !== 'click')) {
                var commandName = target.getAttribute('data-command');
                if (commandName) {
                    var args = target.getAttribute('data-command-args');
                    var event = require('mini-event').fromDOMEvent(e, 'command', {
                        name: commandName,
                        triggerType: e.type,
                        args: args
                    });
                    event = this.fire('command', event);
                    if (event.isPropagationStopped()) {
                        return;
                    }
                }
            }
            target = target.parentNode;
        }
    };
    Command.prototype.activate = function () {
        for (var i = 0; i < this.events.length; i++) {
            this.target.helper.addDOMEvent(this.target.main, this.events[i], this.handleCommand);
        }
        Extension.prototype.activate.apply(this, arguments);
    };
    Command.prototype.inactivate = function () {
        for (var i = 0; i < this.events.length; i++) {
            this.target.helper.removeDOMEvent(this.target.main, this.events[i], this.handleCommand);
        }
        Extension.prototype.inactivate.apply(this, arguments);
    };
    Command.createDispatcher = function (config) {
        var map = config;
        if (u.isArray(config)) {
            map = {};
            for (var i = 0; i < config.length; i++) {
                var item = config[i];
                var name = item.triggerType ? item.triggerType + ':' + item.name : item.name;
                map[name] = item.handler;
            }
        }
        return function (e) {
            var handler = map[e.triggerType + ':' + e.name];
            if (!handler) {
                handler = map[e.name];
            }
            if (!handler) {
                var method = 'execute' + lib.pascalize(e.name) + lib.pascalize(e.triggerType);
                handler = this[method];
            }
            if (typeof handler !== 'function') {
                var method = 'execute' + lib.pascalize(e.name);
                handler = this[method];
            }
            if (typeof handler !== 'function') {
                handler = map[e.triggerType + ':*'];
            }
            if (!handler) {
                handler = map['*'];
            }
            if (typeof handler === 'function') {
                handler.apply(this, arguments);
            }
        };
    };
    lib.inherits(Command, Extension);
    require('../main').registerExtension(Command);
    return Command;
});

define('esui/extension/AutoSort', [
    'require',
    'underscore',
    '../Table',
    '../Extension',
    '../lib',
    '../main'
], function (require) {
    var u = require('underscore');
    var Table = require('../Table');
    var Extension = require('../Extension');
    function AutoSort() {
        Extension.apply(this, arguments);
    }
    AutoSort.prototype.type = 'AutoSort';
    function sort(e) {
        var computeDiff = e.field.comparer;
        if (!computeDiff) {
            var fieldName = e.field.field;
            computeDiff = function (x, y) {
                if (fieldName) {
                    x = x[fieldName];
                    y = y[fieldName];
                }
                return u.isString(x) && u.isString(y) ? x.localeCompare(y) : x - y;
            };
        }
        function compare(x, y) {
            var diff = computeDiff(x, y);
            return e.order === 'asc' ? diff : -diff;
        }
        var datasource = this.datasource;
        datasource.sort(compare);
        this.setDatasource(datasource);
    }
    AutoSort.prototype.activate = function () {
        if (!(this.target instanceof Table)) {
            return;
        }
        this.target.on('sort', sort);
        Extension.prototype.activate.apply(this, arguments);
    };
    AutoSort.prototype.inactivate = function () {
        if (!(this.target instanceof Table)) {
            return;
        }
        this.target.un('sort', sort);
        Extension.prototype.inactivate.apply(this, arguments);
    };
    require('../lib').inherits(AutoSort, Extension);
    require('../main').registerExtension(AutoSort);
    return AutoSort;
});

define('esui/Wizard', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    function Wizard() {
        Control.apply(this, arguments);
    }
    Wizard.prototype.type = 'Wizard';
    Wizard.prototype.createMain = function () {
        return document.createElement('ol');
    };
    Wizard.prototype.initOptions = function (options) {
        var properties = {
            steps: [],
            activeIndex: 0
        };
        var children = lib.getChildren(this.main);
        if (!options.steps && children.length) {
            properties.steps = u.map(children, function (node) {
                var config = { text: lib.getText(node) };
                var panel = node.getAttribute('data-for');
                if (panel) {
                    config.panel = panel;
                }
                return config;
            });
        }
        u.extend(properties, options);
        if (typeof properties.activeIndex === 'string') {
            properties.activeIndex = +properties.activeIndex;
        }
        this.setProperties(properties);
    };
    function togglePanel(wizard, config, isActive) {
        var panel = config && config.panel && lib.g(config.panel);
        if (!panel) {
            return;
        }
        var method = isActive ? 'removePartClasses' : 'addPartClasses';
        wizard.helper[method]('panel-hidden', panel);
    }
    Wizard.prototype.nodeTemplate = '<span>${text}</span>';
    Wizard.prototype.getNodeHTML = function (node) {
        return lib.format(this.nodeTemplate, { text: lib.encodeHTML(node.text) });
    };
    function getHTML(wizard) {
        var html = '';
        for (var i = 0; i < wizard.steps.length; i++) {
            var node = wizard.steps[i];
            var classes = wizard.helper.getPartClasses('node');
            if (i === 0) {
                classes.push.apply(classes, wizard.helper.getPartClasses('node-first'));
            }
            if (i === wizard.steps.length - 1 && !wizard.finishText) {
                classes.push.apply(classes, wizard.helper.getPartClasses('node-last'));
            }
            if (i === wizard.activeIndex - 1) {
                classes.push.apply(classes, wizard.helper.getPartClasses('node-active-prev'));
            }
            if (i <= wizard.activeIndex - 1) {
                classes.push.apply(classes, wizard.helper.getPartClasses('node-done'));
            }
            var isActive = i === wizard.activeIndex;
            togglePanel(wizard, node, isActive);
            if (isActive) {
                classes.push.apply(classes, wizard.helper.getPartClasses('node-active'));
                if (i === wizard.steps.length - 1) {
                    classes.push.apply(classes, wizard.helper.getPartClasses('node-last-active'));
                }
            }
            html += '<li class="' + classes.join(' ') + '">';
            html += wizard.getNodeHTML(node);
            html += '</li>';
        }
        if (wizard.finishText) {
            var classes = [].concat(wizard.helper.getPartClasses('node'), wizard.helper.getPartClasses('node-last'), wizard.helper.getPartClasses('node-finish'), wizard.activeIndex === wizard.steps.length ? wizard.helper.getPartClasses('node-active') : []);
            html += '<li class="' + classes.join(' ') + '">';
            html += '<span>' + wizard.finishText + '</span>';
            html += '</li>';
        }
        return html;
    }
    var paint = require('./painters');
    Wizard.prototype.repaint = paint.createRepaint(Control.prototype.repaint, {
        name: [
            'steps',
            'finishText'
        ],
        paint: function (wizard) {
            wizard.main.innerHTML = getHTML(wizard);
        }
    }, {
        name: 'activeIndex',
        paint: function (wizard, value) {
            if (!wizard.helper.isInStage('RENDERED')) {
                return;
            }
            var nodes = wizard.main.getElementsByTagName('li');
            for (var i = nodes.length - 1; i >= 0; i--) {
                var isActive = i === wizard.activeIndex;
                togglePanel(wizard, wizard.steps[i], isActive);
                var node = nodes[i];
                var method = isActive ? 'addPartClasses' : 'removePartClasses';
                wizard.helper[method]('node-active', node);
                if (i === wizard.steps.length - 1) {
                    wizard.helper[method]('node-last-active', node);
                }
                var isDone = i <= wizard.activeIndex - 1;
                var method = isDone ? 'addPartClasses' : 'removePartClasses';
                wizard.helper[method]('node-done', node);
                var isCurPrev = i === wizard.activeIndex - 1;
                var method = isCurPrev ? 'addPartClasses' : 'removePartClasses';
                wizard.helper[method]('node-active-prev', node);
            }
        }
    });
    Wizard.prototype.setProperties = function (properties) {
        if (properties.hasOwnProperty('steps')) {
            if (properties.hasOwnProperty('activeIndex')) {
                this.activeIndex = properties.activeIndex;
                delete properties.activeIndex;
            } else {
                this.activeIndex = 0;
            }
            if (properties.hasOwnProperty('finishText')) {
                this.finishText = properties.finishText;
                delete properties.finishText;
            }
        }
        var changes = Control.prototype.setProperties.apply(this, arguments);
        if (changes.hasOwnProperty('steps') || changes.hasOwnProperty('activeIndex')) {
            this.fire('enter');
        }
    };
    Wizard.prototype.getActiveStep = function () {
        return this.get('steps')[this.get('activeIndex')];
    };
    Wizard.prototype.stepNext = function () {
        var maxStep = this.finishText ? this.steps.length : this.steps.length - 1;
        if (this.activeIndex < maxStep) {
            this.set('activeIndex', this.activeIndex + 1);
        }
    };
    Wizard.prototype.stepPrevious = function () {
        if (this.activeIndex > 0) {
            this.set('activeIndex', this.activeIndex - 1);
        }
    };
    require('./main').register(Wizard);
    lib.inherits(Wizard, Control);
    return Wizard;
});

define('esui/Validity', [
    'require',
    'underscore',
    './lib',
    './Control',
    './Helper',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    var Helper = require('./Helper');
    function Validity() {
        Control.apply(this, arguments);
    }
    Validity.prototype.type = 'Validity';
    Validity.prototype.createMain = function () {
        return document.createElement('label');
    };
    Validity.prototype.initOptions = function (options) {
        var properties = u.extend({}, Validity.defaultProperties, options);
        Control.prototype.initOptions.call(this, properties);
    };
    function getClasses(label, state) {
        var target = label.target;
        var targetHelper = null;
        if (target || label.targetType) {
            var targetContext = {
                type: label.targetType || target.type,
                skin: target && target.skin
            };
            targetHelper = new Helper(targetContext);
        }
        var classes = label.helper.getPartClasses();
        if (targetHelper) {
            classes.push.apply(classes, targetHelper.getPartClasses('validity-label'));
        }
        if (state) {
            classes.push.apply(classes, label.helper.getPartClasses(state));
            if (targetHelper) {
                classes.push.apply(classes, targetHelper.getPartClasses('validity-label-' + state));
            }
        }
        if (target && target.isHidden() || label.isHidden()) {
            classes.push.apply(classes, label.helper.getStateClasses('hidden'));
            if (target) {
                classes.push.apply(classes, target.helper.getPartClasses('validity-label-hidden'));
            }
        }
        return classes;
    }
    Validity.prototype.display = function (validState, message, validity) {
        this.main.innerHTML = message;
    };
    Validity.prototype.repaint = require('./painters').createRepaint(Control.prototype.repaint, {
        name: [
            'target',
            'targetType'
        ],
        paint: function (label) {
            var validState = label.validity ? label.validity.getValidState() : '';
            var classes = getClasses(label, validState);
            label.main.className = classes.join(' ');
        }
    }, {
        name: 'focusTarget',
        paint: function (label, focusTarget) {
            if (label.main.nodeName.toLowerCase() === 'label') {
                if (focusTarget && focusTarget.id) {
                    lib.setAttribute(label.main, 'for', focusTarget.id);
                } else {
                    lib.removeAttribute(label.main, 'for');
                }
            }
        }
    }, {
        name: 'validity',
        paint: function (label, validity) {
            var validState = validity && validity.getValidState();
            var classes = getClasses(label, validState);
            label.main.className = classes.join(' ');
            label.disposeChildren();
            if (validity) {
                var message = validity.getCustomMessage();
                if (!message) {
                    var invalidState = u.find(validity.getStates(), function (state) {
                        return !state.getState();
                    });
                    message = invalidState && invalidState.getMessage();
                }
                label.display(validState, message || '', validity);
                label.helper.initChildren();
                if (message) {
                    label.show();
                } else {
                    label.hide();
                }
            } else {
                label.main.innerHTML = '';
                label.hide();
            }
        }
    });
    Validity.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        if (this.target) {
            this.target.validityLabel = null;
            this.target = null;
        }
        this.focusTarget = null;
        if (this.main.parentNode) {
            this.main.parentNode.removeChild(this.main);
        }
        Control.prototype.dispose.apply(this, arguments);
    };
    lib.inherits(Validity, Control);
    require('./main').register(Validity);
    return Validity;
});

define('esui/TreeStrategy', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    function TreeStrategy(options) {
        var defaults = { defaultExpand: false };
        u.extend(this, defaults, options);
    }
    TreeStrategy.prototype.isLeafNode = function (node) {
        return !node.children || !node.children.length;
    };
    TreeStrategy.prototype.shouldExpand = function (node) {
        return this.defaultExpand;
    };
    TreeStrategy.prototype.attachTo = function (tree) {
        this.enableToggleStrategy(tree);
        this.enableSelectStrategy(tree);
    };
    TreeStrategy.prototype.enableToggleStrategy = function (tree) {
        tree.on('expand', function (e) {
            this.expandNode(e.node.id);
        });
        tree.on('collapse', function (e) {
            this.collapseNode(e.node.id, false);
        });
    };
    TreeStrategy.prototype.enableSelectStrategy = function (tree) {
        tree.on('select', function (e) {
            this.selectNode(e.node.id);
        });
        tree.on('unselect', function (e) {
            if (tree.get('allowUnselectNode')) {
                tree.unselectNode(e.node.id);
            }
        });
    };
    return TreeStrategy;
});

define('esui/Tree', [
    'require',
    './Control',
    './lib',
    './controlHelper',
    'underscore',
    './TreeStrategy',
    './main'
], function (require) {
    var Control = require('./Control');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var u = require('underscore');
    var TreeStrategy = require('./TreeStrategy');
    function NullTreeStrategy() {
        TreeStrategy.apply(this, arguments);
    }
    NullTreeStrategy.prototype.attachTo = function () {
    };
    lib.inherits(NullTreeStrategy, TreeStrategy);
    function Tree() {
        Control.apply(this, arguments);
    }
    Tree.prototype.type = 'Tree';
    Tree.defaultProperties = {
        selectMode: 'single',
        hideRoot: false
    };
    Tree.prototype.initOptions = function (options) {
        var defaults = {
            datasource: {},
            strategy: new NullTreeStrategy(),
            selectedNodes: [],
            selectedNodeIndex: {}
        };
        var properties = lib.extend(defaults, Tree.defaultProperties, options);
        if (properties.allowUnselectNode == null) {
            properties.allowUnselectNode = properties.selectMode !== 'single';
        }
        this.setProperties(properties);
    };
    Tree.prototype.itemTemplate = '<span>${text}</span>';
    Tree.prototype.getItemHTML = function (node) {
        var data = {
            id: lib.encodeHTML(node.id),
            text: lib.encodeHTML(node.text)
        };
        return lib.format(this.itemTemplate, data);
    };
    var INDICATOR_TEXT_MAPPING = {
        'collapsed': '\u5C55\u5F00',
        'expanded': '\u6536\u8D77',
        'busy': '\u52A0\u8F7D\u4E2D',
        'empty': '\u65E0\u5185\u5BB9'
    };
    function getIndicatorHTML(tree, node, type, currentLevel, sourceLevel) {
        var diff = sourceLevel - currentLevel;
        var diffType = diff === 0 ? 'current' : diff === 1 ? 'previous' : 'far-previous';
        var classes = [].concat(helper.getPartClasses(tree, 'node-indicator'), helper.getPartClasses(tree, 'node-indicator-' + type), helper.getPartClasses(tree, 'node-indicator-level-' + currentLevel), helper.getPartClasses(tree, 'node-indicator-' + diffType));
        var text = diff === 0 ? INDICATOR_TEXT_MAPPING[type || 'collapsed'] : '\u7B2C' + currentLevel + '\u7EA7';
        var html = '<span ';
        if (diff === 0) {
            html += 'id="' + helper.getId(tree, 'indicator-' + node.id) + '" ';
        }
        html += 'class="' + classes.join(' ') + '">' + text + '</span>';
        return html;
    }
    function getNodeContentHTML(tree, node, level, expanded) {
        var wrapperClasses = helper.getPartClasses(tree, 'content-wrapper');
        if (tree.selectedNodeIndex[node.id]) {
            wrapperClasses = wrapperClasses.concat(helper.getPartClasses(tree, 'content-wrapper-selected'));
        }
        wrapperClasses = wrapperClasses.join(' ');
        var wrapperId = helper.getId(tree, 'content-wrapper-' + node.id);
        var html = '<div id="' + wrapperId + '" class="' + wrapperClasses + '">';
        var indicatorType = tree.strategy.isLeafNode(node) ? 'empty' : expanded ? 'expanded' : 'collapsed';
        for (var i = 0; i <= level; i++) {
            html += getIndicatorHTML(tree, node, indicatorType, i, level);
        }
        var itemWrapperClasses = helper.getPartClasses(tree, 'item-content');
        html += '<div class="' + itemWrapperClasses.join(' ') + '">' + tree.getItemHTML(node) + '</div>';
        html += '</div>';
        if (expanded && !tree.strategy.isLeafNode(node)) {
            var classes = [].concat(helper.getPartClasses(tree, 'sub-root'), helper.getPartClasses(tree, 'sub-root-' + indicatorType));
            html += '<ul class="' + classes.join(' ') + '">';
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                html += getNodeHTML(tree, child, level + 1, tree.strategy.shouldExpand(child));
            }
            html += '</ul>';
        }
        return html;
    }
    function getNodeClasses(tree, node, level, expanded) {
        var state = tree.strategy.isLeafNode(node) ? 'empty' : expanded ? 'expanded' : 'collapsed';
        var classes = [].concat(helper.getPartClasses(tree, 'node'), helper.getPartClasses(tree, 'node-' + state), helper.getPartClasses(tree, 'node-level-' + level));
        if (node === tree.datasource) {
            classes = [].concat(helper.getPartClasses(tree, 'root'), helper.getPartClasses(tree, 'root-' + state), classes);
        }
        return classes;
    }
    function getNodeHTML(tree, node, level, expanded, nodeName) {
        nodeName = nodeName || 'li';
        var classes = getNodeClasses(tree, node, level, expanded);
        var html = '<' + nodeName + ' class="' + classes.join(' ') + '" ' + 'id="' + helper.getId(tree, 'node-' + node.id) + '" ' + 'data-id="' + node.id + '" data-level="' + level + '">';
        html += getNodeContentHTML(tree, node, level, expanded);
        html += '</' + nodeName + '>';
        return html;
    }
    function toggleAndSelectNode(e) {
        var target = e.target;
        var indicatorClass = helper.getPartClasses(this, 'node-indicator')[0];
        var isValidToggleEvent = lib.hasClass(target, indicatorClass);
        var isValidSelectEvent = !isValidToggleEvent;
        if (!isValidToggleEvent) {
            var wrapperClass = helper.getPartClasses(this, 'content-wrapper')[0];
            while (target && target !== this.main && !lib.hasClass(target, wrapperClass)) {
                target = target.parentNode;
            }
            if (lib.hasClass(target, wrapperClass)) {
                isValidToggleEvent = this.wideToggleArea;
                isValidSelectEvent = isValidSelectEvent && true;
            }
        }
        if (!isValidToggleEvent && !isValidSelectEvent) {
            return;
        }
        while (target && target !== this.main && !lib.hasAttribute(target, 'data-id')) {
            target = target.parentNode;
        }
        var id = target.getAttribute('data-id');
        if (isValidToggleEvent) {
            this.triggerToggleStrategy(id);
        }
        if (isValidSelectEvent) {
            this.triggerSelectStrategy(id);
        }
    }
    Tree.prototype.clickNode = function (e) {
        toggleAndSelectNode.apply(this, arguments);
    };
    Tree.prototype.initStructure = function () {
        this.strategy.attachTo(this);
    };
    Tree.prototype.initEvents = function () {
        helper.addDOMEvent(this, this.main, 'click', this.clickNode);
    };
    function buildNodeIndex(node, index) {
        index = index || {};
        index[node.id] = node;
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                buildNodeIndex(node.children[i], index);
            }
        }
        return index;
    }
    Tree.prototype.removeNodeFromIndex = function (id) {
        var node = this.nodeIndex[id];
        if (!node) {
            return;
        }
        this.nodeIndex[id] = undefined;
        if (!node.children) {
            return;
        }
        u.each(node.children, this.removeNodeFromIndex, this);
    };
    Tree.prototype.repaint = helper.createRepaint(Control.prototype.repaint, {
        name: 'datasource',
        paint: function (tree, datasource) {
            tree.selectedNodes = [];
            tree.selectedNodeIndex = {};
            tree.nodeIndex = buildNodeIndex(datasource);
            tree.main.innerHTML = getNodeHTML(tree, datasource, 0, true, 'div');
        }
    }, {
        name: 'hideRoot',
        paint: function (tree, hideRoot) {
            var method = hideRoot ? 'addState' : 'removeState';
            tree[method]('hide-root');
        }
    });
    Tree.prototype.triggerSelectStrategy = function (id) {
        var node = this.nodeIndex[id];
        if (!node) {
            return;
        }
        if (this.selectedNodeIndex[id]) {
            this.fire('unselect', { node: node });
        } else {
            this.fire('select', { node: node });
        }
    };
    Tree.prototype.getSelectedNodes = function () {
        return this.selectedNodes.slice();
    };
    function addSelectedNode(tree, node) {
        if (tree.selectedNodeIndex[node.id]) {
            return false;
        }
        tree.selectedNodes.push(node);
        tree.selectedNodeIndex[node.id] = node;
        return true;
    }
    function removeSelectedNode(tree, node) {
        if (tree.selectedNodeIndex[node.id]) {
            delete tree.selectedNodeIndex[node.id];
            for (var i = 0; i < tree.selectedNodes.length; i++) {
                if (tree.selectedNodes[i] === node) {
                    tree.selectedNodes.splice(i, 1);
                }
            }
            return true;
        }
        return false;
    }
    Tree.prototype.toggleNodeSelection = function (id) {
        var method = this.selectedNodeIndex[id] ? 'unselectNode' : 'selectNode';
        this[method](id);
    };
    function unselectNode(tree, id, options) {
        if (!options.force && !tree.allowUnselectNode) {
            return;
        }
        var node = tree.nodeIndex[id];
        if (!node) {
            return;
        }
        var removed = removeSelectedNode(tree, node);
        if (removed) {
            if (options.modifyDOM) {
                var nodeElement = lib.g(helper.getId(tree, 'content-wrapper-' + id));
                helper.removePartClasses(tree, 'content-wrapper-selected', nodeElement);
            }
            if (!options.silent) {
                tree.fire('unselectnode', { node: node });
                tree.fire('selectionchange');
            }
        }
    }
    Tree.prototype.selectNode = function (id, silent) {
        var node = this.nodeIndex[id];
        if (!node) {
            return;
        }
        var added = addSelectedNode(this, node);
        if (!added) {
            return;
        }
        if (this.selectMode === 'single' && this.selectedNodes.length > 1) {
            unselectNode(this, this.selectedNodes[0].id, {
                force: true,
                silent: true,
                modifyDOM: true
            });
        }
        var nodeElement = lib.g(helper.getId(this, 'content-wrapper-' + id));
        helper.addPartClasses(this, 'content-wrapper-selected', nodeElement);
        if (!silent) {
            this.fire('selectnode', { node: node });
            this.fire('selectionchange');
        }
    };
    Tree.prototype.unselectNode = function (id, silent) {
        unselectNode(this, id, {
            force: true,
            silent: silent,
            modifyDOM: true
        });
    };
    Tree.prototype.expandNode = function (id, children) {
        var nodeElement = lib.g(helper.getId(this, 'node-' + id));
        if (!nodeElement) {
            return;
        }
        var level = +lib.getAttribute(nodeElement, 'data-level');
        if (children || nodeElement.lastChild.nodeName.toLowerCase() !== 'ul') {
            var node = this.nodeIndex[id];
            if (!node) {
                return;
            }
            if (children) {
                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        unselectNode(this, node.children[i].id, {
                            force: true,
                            silent: true,
                            modifyDOM: false
                        });
                        this.removeNodeFromIndex(node.children[i].id);
                    }
                }
                node.children = children;
                buildNodeIndex(node, this.nodeIndex);
            }
            nodeElement.innerHTML = getNodeContentHTML(this, node, level, true);
        } else {
            var indicator = lib.g(helper.getId(this, 'indicator-' + id));
            indicator.innerHTML = INDICATOR_TEXT_MAPPING.expanded;
            var indicatorClasses = [].concat(helper.getPartClasses(this, 'node-indicator'), helper.getPartClasses(this, 'node-indicator-level-' + level), helper.getPartClasses(this, 'node-indicator-current'), helper.getPartClasses(this, 'node-indicator-expanded'));
            indicator.className = indicatorClasses.join(' ');
            var rootClasses = [].concat(helper.getPartClasses(this, 'sub-root'), helper.getPartClasses(this, 'sub-root-expanded'));
            nodeElement.lastChild.className = rootClasses.join(' ');
        }
        var node = this.nodeIndex[id];
        var nodeClasses = getNodeClasses(this, node, level, true);
        nodeElement.className = nodeClasses.join(' ');
    };
    Tree.prototype.collapseNode = function (id, removeChild) {
        var nodeElement = lib.g(helper.getId(this, 'node-' + id));
        if (!nodeElement) {
            return;
        }
        var node = this.nodeIndex[id];
        var childRoot = nodeElement.getElementsByTagName('ul')[0];
        if (childRoot) {
            if (removeChild) {
                childRoot.parentNode.removeChild(childRoot);
                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        unselectNode(this, node.children[i].id, {
                            force: true,
                            silent: false,
                            modifyDOM: false
                        });
                    }
                }
            } else {
                var rootClasses = [].concat(helper.getPartClasses(this, 'sub-root'), helper.getPartClasses(this, 'sub-root-collapsed'));
                childRoot.className = rootClasses.join(' ');
            }
        }
        var level = +lib.getAttribute(nodeElement, 'data-level');
        var nodeClasses = getNodeClasses(this, node, level, false);
        nodeElement.className = nodeClasses.join(' ');
        var indicator = lib.g(helper.getId(this, 'indicator-' + id));
        var indicatorClasses = [].concat(helper.getPartClasses(this, 'node-indicator'), helper.getPartClasses(this, 'node-indicator-level-' + level), helper.getPartClasses(this, 'node-indicator-current'), helper.getPartClasses(this, 'node-indicator-collapsed'));
        indicator.className = indicatorClasses.join(' ');
        indicator.innerHTML = INDICATOR_TEXT_MAPPING.collapsed;
    };
    function isEmpty(tree, nodeElement) {
        var className = helper.getPartClasses(tree, 'node-empty')[0];
        return lib.hasClass(nodeElement, className);
    }
    function isExpanded(tree, nodeElement) {
        var className = helper.getPartClasses(tree, 'node-expanded')[0];
        return lib.hasClass(nodeElement, className);
    }
    Tree.prototype.toggleNode = function (id, children, removeChild) {
        if (!this.nodeIndex[id]) {
            return;
        }
        var nodeElement = lib.g(helper.getId(this, 'node-' + id));
        if (!nodeElement) {
            return;
        }
        if (isEmpty(this, nodeElement)) {
            return;
        }
        if (isExpanded(this, nodeElement)) {
            this.collapseNode(id, removeChild);
        } else {
            this.expandNode(id, children);
        }
    };
    Tree.prototype.triggerToggleStrategy = function (id) {
        var node = this.nodeIndex[id];
        if (!node) {
            return;
        }
        var nodeElement = lib.g(helper.getId(this, 'node-' + id));
        if (!nodeElement) {
            return;
        }
        if (isEmpty(this, nodeElement)) {
            return;
        }
        if (isExpanded(this, nodeElement)) {
            this.fire('collapse', { node: node });
        } else {
            this.fire('expand', { node: node });
        }
    };
    Tree.prototype.indicateNodeLoading = function (id) {
        var nodeElement = lib.g(helper.getId(this, 'node-' + id));
        if (!nodeElement) {
            return;
        }
        var children = lib.getChildren(nodeElement);
        var level = 0;
        while (!this.helper.isPart(children[level], 'item-content')) {
            level++;
        }
        var indicator = children[level];
        indicator.innerHTML = INDICATOR_TEXT_MAPPING.busy;
        var classes = [].concat(helper.getPartClasses(this, 'node-indicator'), helper.getPartClasses(this, 'node-indicator-level-' + level), helper.getPartClasses(this, 'node-indicator-current'), helper.getPartClasses(this, 'node-indicator-busy'));
        indicator.className = classes.join(' ');
    };
    Tree.prototype.dispose = function () {
        Control.prototype.dispose.apply(this, arguments);
        this.nodeIndex = null;
        this.selectedNodes = null;
        this.selectedNodeIndex = null;
    };
    require('./main').register(Tree);
    lib.inherits(Tree, Control);
    return Tree;
});

define('esui/Toast', [
    'require',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var lib = require('./lib');
    var Control = require('./Control');
    function Toast(options) {
        Control.apply(this, arguments);
    }
    Toast.defaultProperties = {
        duration: 3000,
        messageType: 'normal',
        disposeOnHide: true,
        autoShow: false
    };
    Toast.prototype.type = 'Toast';
    Toast.prototype.initOptions = function (options) {
        var properties = {};
        lib.extend(properties, Toast.defaultProperties, options);
        if (properties.content == null) {
            properties.content = this.main.innerHTML;
        }
        this.setProperties(properties);
    };
    Toast.prototype.initStructure = function () {
        this.main.innerHTML = this.helper.getPartHTML('content', 'p');
        this.addState('hidden');
    };
    Toast.prototype.repaint = require('./painters').createRepaint(Control.prototype.repaint, {
        name: 'content',
        paint: function (toast, content) {
            var container = toast.main.firstChild;
            container.innerHTML = content;
            if (toast.autoShow && toast.helper.isInStage('INITED')) {
                toast.show();
            }
        }
    }, {
        name: 'messageType',
        paint: function (toast, messageType) {
            toast.helper.addPartClasses(toast.messageType);
        }
    });
    Toast.prototype.show = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        if (!this.main.parentElement && !this.main.parentNode) {
            this.appendTo(getContainer.call(this));
        }
        if (!this.isHidden()) {
            return;
        }
        Control.prototype.show.apply(this, arguments);
        this.fire('show');
        clearTimeout(this.timer);
        if (!isNaN(this.duration) && this.duration !== Infinity) {
            this.timer = setTimeout(lib.bind(this.hide, this), this.duration);
        }
    };
    Toast.prototype.hide = function () {
        if (this.isHidden()) {
            return;
        }
        Control.prototype.hide.apply(this, arguments);
        clearTimeout(this.timer);
        this.fire('hide');
        if (this.disposeOnHide) {
            this.dispose();
        }
    };
    Toast.prototype.dispose = function () {
        clearTimeout(this.timer);
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        lib.removeNode(this.main);
        Control.prototype.dispose.apply(this, arguments);
    };
    function getContainer() {
        var prefix = require('./main').getConfig('uiClassPrefix');
        var containerId = prefix + '-toast-collection-area';
        var element = document.getElementById(containerId);
        if (!element) {
            element = document.createElement('div');
            element.id = containerId;
            this.helper.addPartClasses('collection-area', element);
            document.body.appendChild(element);
        }
        return element;
    }
    function createHandler(messageType) {
        return function (content, options) {
            if (messageType === 'show') {
                messageType = 'normal';
            }
            options = lib.extend({ content: content }, options);
            options.messageType = options.messageType || messageType;
            var toast = new Toast(options);
            Control.prototype.hide.apply(toast);
            toast.appendTo(getContainer.call(toast));
            return toast;
        };
    }
    var allType = [
        'show',
        'info',
        'alert',
        'error',
        'success'
    ];
    for (var key in allType) {
        if (allType.hasOwnProperty(key)) {
            var messageType = allType[key];
            Toast[messageType] = createHandler(messageType);
        }
    }
    lib.inherits(Toast, Control);
    require('./main').register(Toast);
    return Toast;
});

define('esui/TipLayer', [
    'require',
    './Button',
    './Label',
    './Panel',
    './lib',
    './controlHelper',
    './Control',
    './main',
    './painters'
], function (require) {
    require('./Button');
    require('./Label');
    require('./Panel');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var Control = require('./Control');
    var ui = require('./main');
    var paint = require('./painters');
    function TipLayer(options) {
        Control.apply(this, arguments);
    }
    function parseMain(options) {
        var main = options.main;
        if (!main) {
            return;
        }
        var els = lib.getChildren(main);
        var len = els.length;
        var roleName;
        var roles = {};
        while (len--) {
            roleName = els[len].getAttribute('data-role');
            if (roleName) {
                roles[roleName] = els[len];
            }
        }
        options.roles = roles;
    }
    function createHead(control, mainDOM) {
        if (mainDOM) {
            control.title = mainDOM.innerHTML;
        } else {
            mainDOM = document.createElement('h3');
            if (control.main.firstChild) {
                lib.insertBefore(mainDOM, control.main.firstChild);
            } else {
                control.main.appendChild(mainDOM);
            }
        }
        var headClasses = [].concat(helper.getPartClasses(control, 'title'));
        lib.addClasses(mainDOM, headClasses);
        var properties = {
            main: mainDOM,
            childName: 'title'
        };
        var label = ui.create('Label', properties);
        label.render();
        control.addChild(label);
        return label;
    }
    function createBF(control, type, mainDOM) {
        if (mainDOM) {
            control.content = mainDOM.innerHTML;
        } else {
            mainDOM = document.createElement('div');
            if (type === 'body') {
                var head = control.getChild('title');
                if (head) {
                    lib.insertAfter(mainDOM, head.main);
                } else if (control.main.firstChild) {
                    lib.insertBefore(mainDOM, head, control.main.firstChild);
                } else {
                    control.main.appendChild(mainDOM);
                }
            } else {
                control.main.appendChild(mainDOM);
            }
        }
        lib.addClasses(mainDOM, helper.getPartClasses(control, type + '-panel'));
        var properties = {
            main: mainDOM,
            renderOptions: control.renderOptions
        };
        var panel = ui.create('Panel', properties);
        panel.render();
        control.addChild(panel, type);
        return panel;
    }
    function resizeHandler(tipLayer, targetElement, options) {
        if (!tipLayer.isShow) {
            return;
        }
        tipLayer.autoPosition(targetElement, options);
    }
    function delayShow(tipLayer, delayTime, targetElement, options) {
        if (delayTime) {
            clearTimeout(tipLayer.showTimeout);
            clearTimeout(tipLayer.hideTimeout);
            tipLayer.showTimeout = setTimeout(lib.bind(tipLayer.show, tipLayer, targetElement, options), delayTime);
        } else {
            tipLayer.show(targetElement, options);
        }
    }
    function delayHide(tipLayer, delayTime) {
        clearTimeout(tipLayer.showTimeout);
        clearTimeout(tipLayer.hideTimeout);
        tipLayer.hideTimeout = setTimeout(lib.bind(tipLayer.hide, tipLayer), delayTime);
    }
    function getElementByControl(tipLayer, control) {
        if (typeof control === 'string') {
            control = tipLayer.viewContext.get(control);
        }
        return control.main;
    }
    TipLayer.prototype = {
        type: 'TipLayer',
        initOptions: function (options) {
            parseMain(options);
            var properties = { roles: {} };
            lib.extend(properties, options);
            this.setProperties(properties);
        },
        initStructure: function () {
            var main = this.main;
            if (main.parentNode && main.parentNode.nodeName.toLowerCase() !== 'body') {
                document.body.appendChild(main);
            }
            this.main.style.left = '-10000px';
            if (this.title || this.roles.title) {
                createHead(this, this.roles.title);
            }
            createBF(this, 'body', this.roles.content);
            if (this.foot || this.roles.foot) {
                createBF(this, 'foot', this.roles.foot);
            }
            if (this.arrow) {
                var arrow = document.createElement('div');
                arrow.id = helper.getId(this, 'arrow');
                arrow.className = helper.getPartClasses(this, 'arrow').join(' ');
                this.main.appendChild(arrow);
            }
        },
        repaint: helper.createRepaint(Control.prototype.repaint, paint.style('width'), {
            name: 'title',
            paint: function (tipLayer, value) {
                var head = tipLayer.getHead();
                if (value == null) {
                    if (head) {
                        tipLayer.removeChild(head);
                    }
                } else {
                    if (!head) {
                        head = createHead(tipLayer);
                    }
                    head.setText(value);
                }
            }
        }, {
            name: 'content',
            paint: function (tipLayer, value) {
                var bfTpl = '' + '<div class="${class}" id="${id}">' + '${content}' + '</div>';
                var body = tipLayer.getBody();
                var bodyId = helper.getId(tipLayer, 'body');
                var bodyClass = helper.getPartClasses(tipLayer, 'body');
                var data = {
                    'class': bodyClass.join(' '),
                    'id': bodyId,
                    'content': value
                };
                body.setContent(lib.format(bfTpl, data));
            }
        }, {
            name: 'foot',
            paint: function (tipLayer, value) {
                var bfTpl = '' + '<div class="${class}" id="${id}">' + '${content}' + '</div>';
                var footId = helper.getId(tipLayer, 'foot');
                var footClass = helper.getPartClasses(tipLayer, 'foot');
                var foot = tipLayer.getFoot();
                if (value == null) {
                    if (foot) {
                        tipLayer.removeChild(foot);
                    }
                } else {
                    var data = {
                        'class': footClass.join(' '),
                        'id': footId,
                        'content': value
                    };
                    if (!foot) {
                        foot = createBF(tipLayer, 'foot');
                    }
                    foot.setContent(lib.format(bfTpl, data));
                }
            }
        }, {
            name: [
                'targetDOM',
                'targetControl',
                'showMode',
                'positionOpt',
                'delayTime'
            ],
            paint: function (tipLayer, targetDOM, targetControl, showMode, positionOpt, delayTime) {
                var options = {
                    targetDOM: targetDOM,
                    targetControl: targetControl,
                    showMode: showMode,
                    delayTime: delayTime
                };
                if (positionOpt) {
                    positionOpt = positionOpt.split('|');
                    options.positionOpt = {
                        top: positionOpt[0] || 'top',
                        right: positionOpt[1] || 'left'
                    };
                }
                tipLayer.attachTo(options);
            }
        }),
        autoPosition: function (target, options) {
            var tipLayer = this;
            var element = this.main;
            options = options || {
                left: 'right',
                top: 'top'
            };
            var rect = target.getBoundingClientRect();
            var offset = lib.getOffset(target);
            var targetPosition = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            };
            var previousDisplayValue = element.style.display;
            element.style.display = 'block';
            var elementHeight = element.offsetHeight;
            var elementWidth = element.offsetWidth;
            element.style.display = 'none';
            var config = lib.clone(options);
            var viewWidth = lib.page.getViewWidth();
            var viewHeight = lib.page.getViewHeight();
            var gapLR = targetPosition.left - elementWidth;
            var gapRL = viewWidth - targetPosition.right - elementWidth;
            var gapTT = viewHeight - targetPosition.top - elementHeight;
            var gapBB = targetPosition.bottom - elementHeight;
            if (gapLR >= 0) {
                if (gapRL >= 0) {
                    if (!config.right && !config.left) {
                        if (gapRL < gapLR) {
                            config.left = 'right';
                            config.right = null;
                        } else {
                            config.right = 'left';
                            config.left = null;
                        }
                    }
                } else {
                    config.left = 'right';
                    config.right = null;
                }
            } else {
                config.right = 'left';
                config.left = null;
            }
            if (gapTT >= 0) {
                if (gapBB >= 0) {
                    if (!config.bottom && !config.top) {
                        if (gapBB < gapTT) {
                            config.top = 'top';
                            config.bottom = null;
                        } else {
                            config.bottom = 'bottom';
                            config.top = null;
                        }
                    }
                } else {
                    config.top = 'top';
                    config.bottom = null;
                }
            } else {
                config.bottom = 'bottom';
                config.top = null;
            }
            var properties = {};
            var arrowClass;
            if (config.right) {
                properties.left = offset.right;
                if (config.top) {
                    arrowClass = 'lt';
                } else {
                    arrowClass = 'lb';
                }
            } else if (config.left) {
                properties.left = offset.left - elementWidth;
                if (config.top) {
                    arrowClass = 'rt';
                } else {
                    arrowClass = 'rb';
                }
            }
            if (config.top) {
                properties.top = offset.top;
            } else if (config.bottom) {
                properties.top = offset.bottom - elementHeight;
            }
            element.style.display = previousDisplayValue;
            element.className = '' + helper.getPartClasses(tipLayer).join(' ') + ' ' + helper.getPartClasses(tipLayer, arrowClass).join(' ');
            var arrow = lib.g(helper.getId(tipLayer, 'arrow'));
            if (arrow) {
                arrow.className = '' + helper.getPartClasses(tipLayer, 'arrow').join(' ') + ' ' + helper.getPartClasses(tipLayer, 'arrow' + '-' + arrowClass).join(' ');
            }
            tipLayer.renderLayer(element, properties);
        },
        renderLayer: function (element, options) {
            var properties = lib.clone(options || {});
            if (properties.hasOwnProperty('top') && properties.hasOwnProperty('bottom')) {
                properties.height = properties.bottom - properties.top;
                delete properties.bottom;
            }
            if (properties.hasOwnProperty('left') && properties.hasOwnProperty('right')) {
                properties.width = properties.right - properties.left;
                delete properties.right;
            }
            if (properties.hasOwnProperty('top') || properties.hasOwnProperty('bottom')) {
                element.style.top = '';
                element.style.bottom = '';
            }
            if (properties.hasOwnProperty('left') || properties.hasOwnProperty('right')) {
                element.style.left = '';
                element.style.right = '';
            }
            for (var name in properties) {
                if (properties.hasOwnProperty(name)) {
                    element.style[name] = properties[name] + 'px';
                }
            }
        },
        attachTo: function (options) {
            var showMode = options.showMode || 'over';
            var showEvent;
            var hideEvent;
            if (showMode === 'over') {
                showEvent = 'mouseover';
                hideEvent = 'mouseout';
            } else if (showMode === 'click') {
                showEvent = 'click';
                hideEvent = 'click';
            }
            var targetElement;
            if (options.targetDOM) {
                targetElement = lib.g(options.targetDOM);
            } else if (options.targetControl) {
                targetElement = getElementByControl(this, options.targetControl);
            }
            if (!targetElement) {
                return;
            }
            if (showMode === 'auto') {
                this.show(targetElement, options);
            } else {
                helper.addDOMEvent(this, targetElement, showEvent, lib.curry(delayShow, this, options.delayTime, targetElement, options.positionOpt));
                helper.addDOMEvent(this, this.main, 'mouseover', lib.bind(this.show, this, targetElement, options.positionOpt));
                helper.addDOMEvent(this, this.main, 'mouseout', lib.curry(delayHide, this, 150));
            }
            if (hideEvent === 'mouseout') {
                helper.addDOMEvent(this, targetElement, hideEvent, lib.curry(delayHide, this, 150));
            }
        },
        getHead: function () {
            return this.getChild('title');
        },
        getBody: function () {
            return this.getChild('body');
        },
        getFoot: function () {
            return this.getChild('foot');
        },
        show: function (targetElement, options) {
            if (helper.isInStage(this, 'INITED')) {
                this.render();
            } else if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            clearTimeout(this.hideTimeout);
            helper.addDOMEvent(this, window, 'resize', lib.curry(resizeHandler, this, targetElement, options));
            this.main.style.zIndex = helper.layer.getZIndex(targetElement);
            this.removeState('hidden');
            this.autoPosition(targetElement, options);
            if (this.isShow) {
                return;
            }
            this.isShow = true;
            this.fire('show');
        },
        hide: function () {
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            this.addState('hidden');
            this.fire('hide');
        },
        setTitle: function (html) {
            this.setProperties({ 'title': html });
        },
        setContent: function (content) {
            this.setProperties({ 'content': content });
        },
        setFoot: function (foot) {
            this.setProperties({ 'foot': foot });
        },
        dispose: function () {
            if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            this.hide();
            var domId = this.main.id;
            lib.removeNode(domId);
            Control.prototype.dispose.apply(this, arguments);
        }
    };
    TipLayer.onceNotice = function (args) {
        var tipLayerPrefix = 'tipLayer-once-notice';
        var okPrefix = 'tipLayer-notice-ok';
        function btnClickHandler(tipLayer) {
            var handler = tipLayer.onok;
            var isFunc = typeof handler === 'function';
            if (isFunc) {
                handler(tipLayer);
            }
            tipLayer.fire('ok');
            tipLayer.dispose();
        }
        var content = lib.encodeHTML(args.content) || '';
        var properties = {
            type: 'onceNotice',
            skin: 'onceNotice',
            arrow: true
        };
        lib.extend(properties, args);
        var main = document.createElement('div');
        document.body.appendChild(main);
        var tipLayerId = helper.getGUID(tipLayerPrefix);
        properties.id = tipLayerId;
        properties.main = main;
        properties.type = null;
        var tipLayer = ui.create('TipLayer', properties);
        tipLayer.setContent(content);
        var okText = args.okText || '\u77E5\u9053\u4E86';
        tipLayer.setFoot('' + '<div data-ui="type:Button;childName:okBtn;id:' + tipLayerId + '-' + okPrefix + ';width:50;"' + 'class="' + helper.getPartClasses(tipLayer, 'once-notice') + '">' + okText + '</div>');
        tipLayer.render();
        var okBtn = tipLayer.getFoot().getChild('okBtn');
        okBtn.on('click', lib.curry(btnClickHandler, tipLayer, 'ok'));
        tipLayer.attachTo({
            targetDOM: args.targetDOM,
            targetControl: args.targetControl,
            showMode: 'auto',
            positionOpt: {
                top: 'top',
                right: 'left'
            }
        });
        return tipLayer;
    };
    lib.inherits(TipLayer, Control);
    ui.register(TipLayer);
    return TipLayer;
});

define('esui/Tip', [
    'require',
    'underscore',
    './Control',
    './main',
    './TipLayer',
    './painters',
    './lib'
], function (require) {
    var u = require('underscore');
    var Control = require('./Control');
    var ui = require('./main');
    require('./TipLayer');
    function Tip(options) {
        Control.apply(this, arguments);
    }
    Tip.prototype.type = 'Tip';
    Tip.prototype.initOptions = function (options) {
        var properties = {
            title: '',
            content: '',
            arrow: true,
            showMode: 'over',
            delayTime: 500
        };
        u.extend(properties, options);
        if (options.arrow === 'false') {
            properties.arrow = false;
        }
        extractDOMProperties(this.main, properties);
        this.setProperties(properties);
    };
    function extractDOMProperties(main, options) {
        options.title = options.title || main.getAttribute('title');
        main.removeAttribute('title');
        options.content = options.content || main.innerHTML;
        main.innerHTML = '';
    }
    Tip.prototype.initStructure = function () {
        var main = document.createElement('div');
        document.body.appendChild(main);
        var tipLayer = ui.create('TipLayer', {
            main: main,
            childName: 'layer',
            content: this.content,
            title: this.title,
            arrow: this.arrow,
            width: this.layerWidth || 200,
            viewContext: this.viewContext
        });
        this.addChild(tipLayer);
        tipLayer.render();
        var attachOptions = {
            showMode: this.mode,
            delayTime: this.delayTime,
            targetControl: this,
            positionOpt: {
                top: 'top',
                right: 'left'
            }
        };
        tipLayer.attachTo(attachOptions);
    };
    Tip.prototype.repaint = require('./painters').createRepaint(Control.prototype.repaint, {
        name: 'title',
        paint: function (tip, value) {
            var layer = tip.getChild('layer');
            if (layer) {
                layer.setTitle(value);
            }
        }
    }, {
        name: 'content',
        paint: function (tip, value) {
            var layer = tip.getChild('layer');
            if (layer) {
                layer.setContent(value);
            }
        }
    });
    require('./lib').inherits(Tip, Control);
    ui.register(Tip);
    return Tip;
});

define('esui/TextLine', [
    'require',
    'underscore',
    './lib',
    './InputControl',
    './main',
    './TextBox',
    './painters'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    var ui = require('./main');
    require('./TextBox');
    function TextLine(options) {
        InputControl.apply(this, arguments);
    }
    function getMainHTML(textLine) {
        var textareaHTML = '' + '<textarea wrap="off" ' + 'id="' + textLine.helper.getId('text') + '"' + '</textarea>';
        var html = [
            textLine.helper.getPartBeginTag('num-line', 'div'),
            '1',
            textLine.helper.getPartEndTag('num-line', 'div'),
            textLine.helper.getPartBeginTag('text-container', 'div'),
            textareaHTML,
            textLine.helper.getPartEndTag('text-container', 'div')
        ];
        return html.join('');
    }
    function refreshOnInput(e) {
        if (e.type === 'input' || e.propertyName === 'value') {
            refreshLineNum.call(this);
        }
    }
    function refreshLineNum() {
        var num = this.helper.getPart('text').value.split('\n').length;
        if (num !== this.number) {
            this.number = num;
            var numLine = this.helper.getPart('num-line');
            numLine.innerHTML = u.range(1, num + 1).join('<br />');
        }
        this.resetScroll();
        this.fire('change');
    }
    TextLine.prototype = {
        type: 'TextLine',
        initOptions: function (options) {
            var properties = {
                width: 300,
                height: 200,
                value: ''
            };
            if (lib.isInput(this.main)) {
                this.helper.extractOptionsFromInput(this.main, properties);
            }
            u.extend(properties, options);
            if (!properties.hasOwnProperty('title') && this.main.title) {
                properties.title = this.main.title;
            }
            this.setProperties(properties);
        },
        initStructure: function () {
            if (lib.isInput(this.main)) {
                this.helper.replaceMain();
            }
            this.main.innerHTML = getMainHTML(this);
            this.helper.initChildren();
        },
        initEvents: function () {
            var textArea = this.helper.getPart('text');
            var inputEvent = 'oninput' in textArea ? 'input' : 'propertychange';
            this.helper.addDOMEvent(textArea, inputEvent, refreshOnInput);
            this.helper.addDOMEvent(textArea, 'scroll', this.resetScroll);
        },
        repaint: require('./painters').createRepaint(InputControl.prototype.repaint, {
            name: 'height',
            paint: function (textLine, height) {
                height = height || 300;
                var lineNumDiv = textLine.helper.getPart('num-line');
                lineNumDiv.style.height = height + 'px';
                textLine.main.style.height = height + 'px';
            }
        }, {
            name: 'width',
            paint: function (textLine, width) {
                width = width || 300;
                textLine.main.style.width = width + 'px';
            }
        }, {
            name: 'rawValue',
            paint: function (textLine, value) {
                var textArea = textLine.helper.getPart('text');
                if (value) {
                    if (u.isArray(value)) {
                        textLine.value = u.unescape(value.join('\n'));
                    } else if (typeof value === 'string') {
                        textLine.value = u.unescape(value);
                    }
                    var inputEvent = 'oninput' in textArea ? 'input' : 'propertychange';
                    textLine.helper.removeDOMEvent(textArea, inputEvent, refreshOnInput);
                    textArea.value = textLine.value;
                    textLine.helper.addDOMEvent(textArea, inputEvent, refreshOnInput);
                    refreshLineNum.call(textLine);
                }
            }
        }, {
            name: [
                'disabled',
                'readOnly'
            ],
            paint: function (textLine, disabled, readOnly) {
                var textArea = textLine.helper.getPart('text');
                textArea.disabled = !!disabled;
                textArea.readOnly = !!readOnly;
            }
        }),
        resetScroll: function () {
            var textArea = this.helper.getPart('text');
            var lineNumber = this.helper.getPart('num-line');
            lineNumber.style.height = textArea.clientHeight + 'px';
            lineNumber.scrollTop = textArea.scrollTop;
        },
        stringifyValue: function (rawValue) {
            return rawValue.join('\n');
        },
        parseValue: function (value) {
            return lib.trim(value.replace(/\n{2,}/g, '\n')).split('\n');
        },
        getRawValue: function () {
            return u.unique(this.getValueRepeatableItems());
        },
        getValueRepeatableItems: function () {
            var text = this.helper.getPart('text').value;
            var items = text.split('\n');
            return u.chain(items).map(lib.trim).compact().value();
        },
        getRowsNumber: function () {
            var items = this.getValue().split('\n');
            return items.length;
        },
        addLines: function (lines) {
            var content = lines.join('\n');
            var value = this.getValue();
            if (value.length > 0) {
                content = value + '\n' + content;
            }
            this.setRawValue(content);
        }
    };
    lib.inherits(TextLine, InputControl);
    ui.register(TextLine);
    return TextLine;
});

define('esui/Table', [
    'require',
    './lib',
    'underscore',
    './controlHelper',
    './Control',
    './main'
], function (require) {
    var lib = require('./lib');
    var u = require('underscore');
    var helper = require('./controlHelper');
    var Control = require('./Control');
    function Table(options) {
        var protectedProperties = {
            followHeightArr: [
                0,
                0
            ],
            followWidthArr: [],
            handlers: []
        };
        Control.call(this, u.extend({}, options, protectedProperties));
    }
    Table.defaultProperties = {
        noDataHtml: '\u6CA1\u6709\u6570\u636E',
        noFollowHeadCache: false,
        followHead: false,
        sortable: false,
        encode: false,
        columnResizable: false,
        rowWidthOffset: -1,
        select: '',
        selectMode: 'box',
        subrowMutex: 1,
        subEntryOpenTip: '\u70B9\u51FB\u5C55\u5F00',
        subEntryCloseTip: '\u70B9\u51FB\u6536\u8D77',
        subEntryWidth: 18,
        breakLine: false,
        hasTip: false,
        hasSubrow: false,
        tipWidth: 18,
        sortWidth: 9,
        fontSize: 13,
        colPadding: 8,
        zIndex: 0,
        overflowX: 'hidden'
    };
    function hasValue(obj) {
        return !(typeof obj === 'undefined' || obj === null);
    }
    function isNullOrEmpty(obj) {
        return !hasValue(obj) || !obj.toString().length;
    }
    function setAttr(element, key, value) {
        lib.setAttribute(element, 'data-' + key, value);
    }
    function getAttr(element, key) {
        return lib.getAttribute(element, 'data-' + key);
    }
    function getStyleNum(dom, styleName) {
        var result = lib.getStyle(dom, styleName);
        return result === '' ? 0 : parseInt(result, 10) || 0;
    }
    function getId(table, name) {
        return helper.getId(table, name);
    }
    function getClass(table, name) {
        return helper.getPartClasses(table, name).join(' ');
    }
    function getHead(table) {
        return lib.g(getId(table, 'head'));
    }
    function getBody(table) {
        return lib.g(getId(table, 'body'));
    }
    function getFoot(table) {
        return lib.g(getId(table, 'foot'));
    }
    function getRow(table, index) {
        return lib.g(getId(table, 'row') + index);
    }
    function getHeadCheckbox(table) {
        return lib.g(getId(table, 'select-all'));
    }
    function setSelectedIndex(table, selectedIndex) {
        table.selectedIndex = selectedIndex;
        var selectedIndexMap = {};
        for (var i = selectedIndex.length - 1; i >= 0; i--) {
            selectedIndexMap[selectedIndex[i]] = 1;
        }
        table.selectedIndexMap = selectedIndexMap;
    }
    function isRowSelected(table, index) {
        if (table.selectedIndexMap) {
            return !!table.selectedIndexMap[index];
        }
        return false;
    }
    function getBodyWidth(table) {
        var bodyWidth = 0;
        var fields = table.realFields;
        var minColsWidth = table.minColsWidth;
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            bodyWidth += field.width || minColsWidth[i];
        }
        return bodyWidth;
    }
    function getWidth(table) {
        if (table.width) {
            return table.width;
        }
        var rulerDiv = document.createElement('div');
        var parent = table.main.parentNode;
        parent.appendChild(rulerDiv);
        var width = rulerDiv.offsetWidth;
        rulerDiv.parentNode.removeChild(rulerDiv);
        return width;
    }
    function initFields(table) {
        if (!table.fields) {
            return;
        }
        var fields = table.fields;
        var realFields = fields.slice(0);
        var len = realFields.length;
        while (len--) {
            if (!realFields[len]) {
                realFields.splice(len, 1);
            }
        }
        table.realFields = realFields;
        if (!table.select) {
            return;
        }
        switch (table.select.toLowerCase()) {
        case 'multi':
            realFields.unshift(getMultiSelectField(table));
            break;
        case 'single':
            realFields.unshift(getSingleSelectField(table));
            break;
        }
    }
    var tplTablePrefix = '<table ' + 'cellpadding="0" ' + 'cellspacing="0" ' + 'width="${width}" ' + 'data-control-table="${controlTableId}">';
    function initFollowHead(table) {
        if (table.followHead) {
            cachingFollowDoms(table);
            if (!table.noFollowHeadCache) {
                resetFollowOffset(table);
            }
        }
    }
    function resetFollowHead(table) {
        if (table.followHead) {
            cachingFollowDoms(table);
            resetFollowOffset(table);
        }
    }
    function cachingFollowDoms(table) {
        if (!table.followHead) {
            return;
        }
        var followDoms = table.followDoms = [];
        var walker = table.main.parentNode.firstChild;
        var tableId = table.id;
        while (walker) {
            if (walker.nodeType === 1 && getAttr(walker, 'follow-thead') === tableId) {
                followDoms.push(walker);
            }
            walker = walker.nextSibling;
        }
        resetFollowDomsWidth(table);
        resetFollowHeight(table);
    }
    function resetFollowHeight(table) {
        var followDoms = table.followDoms;
        var followHeights = table.followHeightArr;
        followHeights[0] = 0;
        var i = 0;
        for (var len = followDoms.length; i < len; i++) {
            var dom = followDoms[i];
            followHeights[i + 1] = followHeights[i] + dom.offsetHeight;
        }
        followHeights[i + 1] = followHeights[i];
        followHeights.lenght = i + 2;
    }
    function resetFollowDomsWidth(table) {
        var followDoms = table.followDoms;
        var followWidths = table.followWidthArr;
        for (var i = 0, len = followDoms.length; i < len; i++) {
            var dom = followDoms[i];
            var followWidth = getStyleNum(dom, 'padding-left') + getStyleNum(dom, 'padding-right') + getStyleNum(dom, 'border-left-width') + getStyleNum(dom, 'border-right-width');
            followWidths[i] = followWidth;
            followDoms[i].style.width = table.realWidth - followWidth + 'px';
        }
    }
    function resetFollowOffset(table) {
        var followDoms = table.followDoms;
        var followOffest = lib.getOffset(followDoms[0] || table.main);
        table.followTop = followOffest.top;
        table.followLeft = followOffest.left;
    }
    function initMinColsWidth(table) {
        var fields = table.realFields;
        var result = [];
        var fontSize = table.fontSize;
        var extraWidth = table.colPadding * 2 + 5;
        if (!table.noHead) {
            for (var i = 0, len = fields.length; i < len; i++) {
                var field = fields[i];
                var width = field.minWidth;
                if (!width && !field.breakLine) {
                    width = field.title.length * fontSize + extraWidth + (table.sortable && field.sortable ? table.sortWidth : 0) + (field.tip ? table.tipWidth : 0);
                }
                result[i] = width;
            }
        } else {
            var minWidth = fontSize + extraWidth;
            for (var i = 0, len = fields.length; i < len; i++) {
                result[i] = minWidth;
            }
        }
        table.minColsWidth = result;
    }
    function initColsWidth(table) {
        var fields = table.realFields;
        var canExpand = [];
        table.colsWidth = [];
        var bodyWidth = table.overflowX === 'auto' ? getBodyWidth(table) : table.realWidth;
        bodyWidth = Math.max(bodyWidth, table.realWidth);
        table.bodyWidth = bodyWidth;
        var leftWidth = bodyWidth - 1;
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            var width = field.width;
            width = width ? parseInt(width, 10) : 0;
            table.colsWidth.push(width);
            leftWidth -= width;
            if (!field.stable) {
                canExpand.push(i);
            }
        }
        var len = canExpand.length;
        var leaveAverage = Math.round(leftWidth / len);
        for (var i = 0; i < len; i++) {
            var index = canExpand[i];
            var offset = Math.abs(leftWidth) < Math.abs(leaveAverage) ? leftWidth : leaveAverage;
            leftWidth -= offset;
            table.colsWidth[index] += offset;
            var minWidth = table.minColsWidth[index];
            if (minWidth > table.colsWidth[index]) {
                leftWidth += table.colsWidth[index] - minWidth;
                table.colsWidth[index] = minWidth;
            }
        }
        if (leftWidth < 0) {
            var i = 0;
            while (i < len && leftWidth !== 0) {
                var index = canExpand[i];
                var minWidth = table.minColsWidth[index];
                if (minWidth < table.colsWidth[index]) {
                    var offset = table.colsWidth[canExpand[i]] - minWidth;
                    offset = offset > Math.abs(leftWidth) ? leftWidth : -offset;
                    leftWidth += Math.abs(offset);
                    table.colsWidth[index] += offset;
                }
                i++;
            }
        } else if (leftWidth > 0) {
            table.colsWidth[canExpand[0]] += leftWidth;
        }
    }
    function renderFoot(table) {
        var foot = getFoot(table);
        if (!(table.foot instanceof Array)) {
            foot && (foot.style.display = 'none');
        } else {
            if (!foot) {
                foot = document.createElement('div');
                foot.id = getId(table, 'foot');
                foot.className = getClass(table, 'foot');
                setAttr(foot, 'control-table', table.id);
                table.main.appendChild(foot);
            }
            foot.style.display = '';
            if (table.realWidth) {
                foot.style.width = table.realWidth + 'px';
            }
            foot.innerHTML = getFootHtml(table);
        }
    }
    function getFootHtml(table) {
        var html = [];
        var footArray = table.foot;
        var fieldIndex = 0;
        var colsWidth = table.colsWidth;
        var thCellClass = getClass(table, 'fcell');
        var thTextClass = getClass(table, 'fcell-text');
        var rowWidthOffset = table.rowWidthOffset;
        html.push(lib.format(tplTablePrefix, {
            width: '100%',
            controlTableId: table.id
        }), '<tr>');
        for (var i = 0, len = footArray.length; i < len; i++) {
            var footInfo = footArray[i];
            var colWidth = colsWidth[fieldIndex];
            var colspan = footInfo.colspan || 1;
            var thClass = [thCellClass];
            var contentHtml = footInfo.content;
            if ('function' === typeof contentHtml) {
                contentHtml = contentHtml.call(table);
            }
            if (isNullOrEmpty(contentHtml)) {
                contentHtml = '&nbsp;';
            }
            for (var j = 1; j < colspan; j++) {
                colWidth += colsWidth[fieldIndex + j];
            }
            fieldIndex += colspan;
            if (footInfo.align) {
                thClass.push(getClass(table, 'cell-align-' + footInfo.align));
            }
            colWidth += rowWidthOffset;
            colWidth < 0 && (colWidth = 0);
            html.push('<th id="' + getFootCellId(table, i) + '" ' + 'class="' + thClass.join(' ') + '"', ' style="width:' + colWidth + 'px;', (colWidth ? '' : 'display:none;') + '">', '<div class="' + thTextClass + '">', contentHtml, '</div></th>');
        }
        html.push('</tr></table>');
        return html.join('');
    }
    function renderHead(table) {
        var head = getHead(table);
        var headPanelId = getId(table, 'head-panel');
        if (!head) {
            head = document.createElement('div');
            head.id = getId(table, 'head');
            head.className = getClass(table, 'head');
            setAttr(head, 'control-table', table.id);
            table.main.appendChild(head);
            head.innerHTML = lib.format('<div id="${id}" data-ui="type:Panel;id:${id};"></div>', { id: headPanelId });
            table.initChildren(head);
            table.headPanel = table.viewContext.get(headPanelId);
            helper.addDOMEvent(table, head, 'mousemove', u.bind(headMoveHandler, head, table));
            helper.addDOMEvent(table, head, 'mousedown', u.bind(dragStartHandler, head, table));
        }
        if (table.noHead) {
            head.style.display = 'none';
            return;
        }
        head.style.display = '';
        if (table.bodyWidth) {
            head.style.width = table.bodyWidth + 'px';
        }
        lib.g(headPanelId).innerHTML = getHeadHtml(table);
        initHeadChildren(table, table.viewContext.get(headPanelId));
    }
    function initHeadChildren(table, headPanel) {
        if (headPanel.children) {
            headPanel.disposeChildren();
        }
        if (table.hasTip) {
            headPanel.initChildren();
        }
    }
    var tplSortIcon = '<div class="${className}"></div>';
    var tplTitleTip = '<div id="${id}" ' + 'class="${className}" ' + 'data-ui="type:Tip;id:${id};content:${content}">' + '</div>';
    function getHeadHtml(table) {
        var fields = table.realFields;
        var thCellClass = getClass(table, 'hcell');
        var thTextClass = getClass(table, 'hcell-text');
        var breakClass = getClass(table, 'cell-break');
        var sortClass = getClass(table, 'hsort');
        var selClass = getClass(table, 'hcell-sel');
        var canDragBegin = -1;
        var canDragEnd = -1;
        var rowWidthOffset = table.rowWidthOffset;
        if (!table.disabled) {
            for (var i = 0, len = fields.length; i < len; i++) {
                if (!fields[i].stable) {
                    canDragBegin = i;
                    break;
                }
            }
            for (var i = len - 1; i >= 0; i--) {
                if (!fields[i].stable) {
                    canDragEnd = i;
                    break;
                }
            }
        }
        var html = [];
        html.push(lib.format(tplTablePrefix, {
            width: '100%',
            controlTableId: table.id
        }), '<tr>');
        for (var i = 0, len = fields.length; i < len; i++) {
            var thClass = [thCellClass];
            var field = fields[i];
            var title = field.title;
            var sortable = table.sortable && field.sortable;
            var currentSort = sortable && field.field && field.field === table.orderBy;
            var realThTextClass = thTextClass;
            if (i === 0) {
                realThTextClass += ' ' + getClass(table, 'hcell-text-first');
            }
            if (i === len - 1) {
                realThTextClass += ' ' + getClass(table, 'hcell-text-last');
            }
            var sortIconHtml = '';
            if (sortable) {
                thClass.push(getClass(table, 'hcell-sort'));
                if (currentSort) {
                    thClass.push(getClass(table, 'hcell-' + table.order));
                }
                sortIconHtml = lib.format(tplSortIcon, { className: sortClass });
            }
            if (field.align) {
                thClass.push(getClass(table, 'cell-align-' + field.align));
            }
            if (table.breakLine || field.breakLine) {
                thClass.push(breakClass);
            }
            var titleTipHtml = '';
            var titleTipContent = '';
            var tip = field.tip;
            if (typeof tip === 'function') {
                titleTipContent = tip.call(table);
            } else {
                titleTipContent = tip;
            }
            if (titleTipContent) {
                titleTipHtml = lib.format(tplTitleTip, {
                    id: getId(table, 'htip' + i),
                    className: getClass(table, 'htip'),
                    content: titleTipContent
                });
                table.hasTip = true;
            }
            var contentHtml;
            if (typeof title === 'function') {
                contentHtml = title.call(table);
            } else {
                contentHtml = title;
            }
            if (isNullOrEmpty(contentHtml)) {
                contentHtml = '&nbsp;';
            }
            html.push('<th id="' + getTitleCellId(table, i) + '"', ' data-index="' + i + '"', ' class="' + thClass.join(' ') + '"', sortable ? ' data-sortable="1"' : '', i >= canDragBegin && i < canDragEnd ? ' data-dragright="1"' : '', i <= canDragEnd && i > canDragBegin ? ' data-dragleft="1"' : '', ' style="', 'width:' + (table.colsWidth[i] + rowWidthOffset) + 'px;', (table.colsWidth[i] ? '' : 'display:none') + '">', '<div class="' + realThTextClass + (field.select ? ' ' + selClass : '') + '">', titleTipHtml, contentHtml, sortIconHtml, '</div></th>');
        }
        html.push('</tr></table>');
        return html.join('');
    }
    function getTitleCellId(table, index) {
        return getId(table, 'title-cell') + index;
    }
    function getFootCellId(table, index) {
        return getId(table, 'foot-cell') + index;
    }
    function titleOverHandler(element, e) {
        titleOver(this, element);
    }
    function titleOver(table, element) {
        if (table.isDraging || table.dragReady) {
            return;
        }
        helper.addPartClasses(table, 'hcell-hover', element);
        if (table.sortable) {
            table.sortReady = 1;
            var index = getAttr(element, 'index');
            var field = table.realFields[index];
            if (field && field.sortable) {
                helper.addPartClasses(table, 'hcell-sort-hover', element);
            }
        }
    }
    function titleOutHandler(element, e) {
        titleOut(this, element);
    }
    function titleOut(table, element) {
        helper.removePartClasses(table, 'hcell-hover', element);
        if (table.sortable) {
            table.sortReady = 0;
            helper.removePartClasses(table, 'hcell-sort-hover', element);
        }
    }
    function titleClickHandler(element, e) {
        var table = this;
        if (table.sortable && table.sortReady) {
            var index = getAttr(element, 'index');
            var field = table.realFields[index];
            if (field.sortable) {
                var orderBy = table.orderBy;
                var order = table.order;
                if (orderBy === field.field) {
                    order = !order || order === 'asc' ? 'desc' : 'asc';
                } else {
                    order = 'desc';
                }
                table.setProperties({
                    order: order,
                    orderBy: field.field
                });
                table.fire('sort', {
                    field: field,
                    order: order
                });
            }
        }
    }
    function headMoveHandler(table, e) {
        if (!table.columnResizable) {
            return;
        }
        var dragClass = 'startdrag';
        var range = 8;
        if (table.isDraging) {
            return;
        }
        var tar = e.target;
        tar = findDragCell(table, tar);
        if (!tar) {
            return;
        }
        var el = this;
        var pageX = e.pageX || e.clientX + lib.page.getScrollLeft();
        var pos = lib.getOffset(tar);
        var sortable = getAttr(tar, 'sortable');
        if (getAttr(tar, 'dragleft') && pageX - pos.left < range) {
            sortable && titleOut(table, tar);
            helper.addPartClasses(table, dragClass, el);
            table.dragPoint = 'left';
            table.dragReady = 1;
        } else if (getAttr(tar, 'dragright') && pos.left + tar.offsetWidth - pageX < range) {
            sortable && titleOut(table, tar);
            helper.addPartClasses(table, dragClass, el);
            table.dragPoint = 'right';
            table.dragReady = 1;
        } else {
            helper.removePartClasses(table, dragClass, el);
            sortable && titleOver(table, tar);
            table.dragPoint = '';
            table.dragReady = 0;
        }
    }
    function findDragCell(taable, target) {
        while (target.nodeType === 1) {
            if (target.nodeName === 'TH') {
                return target;
            }
            target = target.parentNode;
        }
        return null;
    }
    function dragStartHandler(table, e) {
        if (!table.columnResizable) {
            return;
        }
        table.fire('startdrag');
        table.fire('dragstart');
        var dragClass = getClass(table, 'startdrag');
        var tar = e.target;
        tar = findDragCell(table, tar);
        if (!tar) {
            return;
        }
        if (lib.g(getId(table, 'head')).className.indexOf(dragClass) < 0) {
            return;
        }
        table.htmlHeight = document.documentElement.clientHeight;
        table.isDraging = true;
        table.dragIndex = getAttr(tar, 'index');
        table.dragStart = e.pageX || e.clientX + lib.page.getScrollLeft();
        initTableOffset(table);
        var realDragingHandler = u.partial(dragingHandler, table);
        var realDragEndHandler = function (e) {
            var retrunResult = true;
            try {
                retrunResult = u.partial(dragEndHandler, table)(e);
            } catch (er) {
            }
            lib.un(document, 'mousemove', realDragingHandler);
            lib.un(document, 'mouseup', realDragEndHandler);
            return retrunResult;
        };
        lib.on(document, 'mousemove', realDragingHandler);
        lib.on(document, 'mouseup', realDragEndHandler);
        showDragMark(table, table.dragStart);
        lib.event.preventDefault(e);
        return false;
    }
    function initTableOffset(table) {
        var tableOffset = lib.getOffset(table.main);
        table.top = tableOffset.top;
        table.left = tableOffset.left;
    }
    function dragingHandler(table, evt) {
        var e = evt || window.event;
        showDragMark(table, e.pageX || e.clientX + lib.page.getScrollLeft());
        lib.event.preventDefault(e);
        return false;
    }
    function showDragMark(table, left) {
        var mark = getDragMark(table);
        var right = table.left + table.realWidth;
        var rangeLeft = table.left + 1;
        var rangeRight = right - 1;
        left = left < rangeLeft ? rangeLeft : left;
        left = left > rangeRight ? rangeRight : left;
        if (!mark) {
            mark = createDragMark(table);
        }
        mark.style.top = table.top + 'px';
        mark.style.left = left + 'px';
        mark.style.zIndex = table.zIndex || '';
        var height = table.htmlHeight - table.top + lib.page.getScrollTop();
        var mainHeight = table.main.offsetHeight;
        height = mainHeight > height ? height : mainHeight;
        mark.style.height = height + 'px';
    }
    function hideDragMark(table) {
        var mark = getDragMark(table);
        mark.style.left = '-10000px';
        mark.style.top = '-10000px';
    }
    function createDragMark(table) {
        var mark = document.createElement('div');
        mark.id = getId(table, 'drag-mark');
        mark.className = getClass(table, 'mark ');
        mark.style.top = '-10000px';
        mark.style.left = '-10000px';
        document.body.appendChild(mark);
        return mark;
    }
    function getDragMark(table) {
        return lib.g(getId(table, 'drag-mark'));
    }
    function dragEndHandler(table, evt) {
        var e = evt || window.event;
        var index = parseInt(table.dragIndex, 10);
        var pageX = e.pageX || e.clientX + lib.page.getScrollLeft();
        var fields = table.realFields;
        var fieldLen = fields.length;
        var alterSum = 0;
        var colsWidth = table.colsWidth;
        var revise = 0;
        if (table.dragPoint === 'left') {
            index--;
        }
        var minWidth = table.minColsWidth[index];
        var offsetX = pageX - table.dragStart;
        var currentWidth = colsWidth[index] + offsetX;
        if (currentWidth < minWidth) {
            offsetX += minWidth - currentWidth;
            currentWidth = minWidth;
        }
        var alters = [];
        var alterWidths = [];
        for (var i = index + 1; i < fieldLen; i++) {
            if (!fields[i].stable && colsWidth[i] > 0) {
                alters.push(i);
                alterWidth = colsWidth[i];
                alterWidths.push(alterWidth);
                alterSum += alterWidth;
            }
        }
        var leave = offsetX;
        var alterLen = alters.length;
        for (var i = 0; i < alterLen; i++) {
            var alter = alters[i];
            var alterWidth = alterWidths[i];
            var roughWidth = offsetX * alterWidth / alterSum;
            var offsetWidth = leave > 0 ? Math.ceil(roughWidth) : Math.floor(roughWidth);
            offsetWidth = Math.abs(offsetWidth) < Math.abs(leave) ? offsetWidth : leave;
            alterWidth -= offsetWidth;
            leave -= offsetWidth;
            minWidth = table.minColsWidth[alter];
            if (alterWidth < minWidth) {
                revise += minWidth - alterWidth;
                alterWidth = minWidth;
            }
            colsWidth[alter] = alterWidth;
        }
        currentWidth -= revise;
        colsWidth[index] = currentWidth;
        resetColumns(table);
        table.isDraging = false;
        hideDragMark(table);
        table.fire('enddrag');
        table.fire('dragend');
        lib.event.preventDefault(e);
        return false;
    }
    function renderBody(table) {
        var tBody = getBody(table);
        var tBodyPanelId = getId(table, 'body-panel');
        if (!tBody) {
            var type = 'body';
            var id = getId(table, type);
            tBody = document.createElement('div');
            tBody.id = id;
            tBody.className = getClass(table, type);
            table.main.appendChild(tBody);
            tBody.innerHTML = lib.format('<div id="${id}" data-ui="type:Panel;id:${id}"></div>', { id: tBodyPanelId });
            table.initChildren(tBody);
            table.bodyPanel = table.viewContext.get(tBodyPanelId);
        }
        var style = tBody.style;
        style.overflowX = 'auto';
        style.overflowY = 'auto';
        if (table.bodyWidth) {
            style.width = table.bodyWidth + 'px';
        }
        table.bodyPanel.disposeChildren();
        lib.g(tBodyPanelId).innerHTML = getBodyHtml(table);
        table.fire('bodyChange');
    }
    function updateBodyMaxHeight(table) {
        var tBody = getBody(table);
        var style = tBody.style;
        var dataLen = table.datasource.length;
        var bodyMaxHeight = table.bodyMaxHeight;
        if (bodyMaxHeight > 0 && dataLen > 0) {
            var totalHeight = bodyMaxHeight;
            var bodyContainer = lib.g(getId(table, 'body-panel'));
            if (bodyContainer) {
                totalHeight = bodyContainer.offsetHeight;
            }
            if (totalHeight >= bodyMaxHeight) {
                style.height = bodyMaxHeight + 'px';
                return;
            }
        }
        style.height = 'auto';
    }
    var noDataHtmlTpl = '<div class="${className}">${html}</div>';
    function getBodyHtml(table) {
        var data = table.datasource || [];
        var dataLen = data.length;
        var html = [];
        if (!dataLen) {
            return lib.format(noDataHtmlTpl, {
                className: getClass(table, 'body-nodata'),
                html: table.noDataHtml
            });
        }
        var rowBuilderList = table.rowBuilderList;
        for (var i = 0; i < dataLen; i++) {
            var item = data[i];
            html.push(getRowHtml(table, item, i, rowBuilderList));
        }
        return html.join('');
    }
    function getBodyCellId(table, rowIndex, fieldIndex) {
        return getId(table, 'cell') + rowIndex + '-' + fieldIndex;
    }
    var tplRowPrefix = '<div ' + 'id="${id}" ' + 'class="${className}" ' + 'data-index="${index}" ${attr}>';
    function addRowBuilderList(table, builderList) {
        var rowBuilderList = table.rowBuilderList || [];
        for (var i = 0, l = builderList.length; i < l; i++) {
            var builder = builderList[i];
            if (!builder.getColHtml) {
                continue;
            }
            if (builder.getSubrowHtml) {
                table.hasSubrow = true;
            }
            if (!hasValue(builder.index)) {
                builder.index = 1000;
            }
            rowBuilderList.push(builder);
        }
        rowBuilderList.sort(function (a, b) {
            return a.index - b.index;
        });
        table.rowBuilderList = rowBuilderList;
    }
    function initBaseBuilderList(table) {
        addRowBuilderList(table, [{
                index: 1,
                getRowArgs: getRowBaseArgs,
                getColHtml: getColBaseHtml
            }]);
    }
    function getRowHtml(table, data, index, builderList) {
        var html = [];
        var fields = table.realFields;
        var rowWidthOffset = table.rowWidthOffset;
        var extraArgsList = [];
        var rowClass = [];
        var rowAttr = [];
        for (var i = 0, l = builderList.length; i < l; i++) {
            var builder = builderList[i];
            var rowArgs = builder.getRowArgs ? builder.getRowArgs(table, index) || {} : {};
            extraArgsList.push(rowArgs);
            rowArgs.rowClass && rowClass.push(rowArgs.rowClass);
            rowArgs.rowAttr && rowAttr.push(rowArgs.rowAttr);
        }
        function sortByIndex(a, b) {
            return a.index - b.index;
        }
        for (var i = 0, l = fields.length; i < l; i++) {
            var field = fields[i];
            var colWidth = table.colsWidth[i];
            var colClass = [];
            var textClass = [];
            var colAttr = [];
            var textAttr = [];
            var textHtml = [];
            var allHtml = [];
            var textStartIndex = -1;
            for (var s = 0, t = builderList.length; s < t; s++) {
                var colResult = builderList[s].getColHtml(table, data, field, index, i, extraArgsList[s]);
                if (!colResult) {
                    continue;
                }
                var colHtml = colResult.html;
                if (colResult.colClass) {
                    colClass.push(colResult.colClass);
                }
                if (colResult.textClass) {
                    textClass.push(colResult.textClass);
                }
                if (colResult.colAttr) {
                    colAttr.push(colResult.colAttr);
                }
                if (colResult.textAttr) {
                    textAttr.push(colResult.textAttr);
                }
                if (hasValue(colHtml)) {
                    if (colResult.notInText) {
                        colResult.index = s;
                        allHtml.push(colResult);
                    } else {
                        textHtml.push(colHtml);
                        textStartIndex < 0 && (textStartIndex = s);
                    }
                }
            }
            var contentHtml = '';
            textHtml = [
                '<div class="' + textClass.join(' ') + '" ',
                textAttr.join(' ') + '>',
                textHtml.join(''),
                '</div>'
            ].join('');
            allHtml.push({
                html: textHtml,
                index: textStartIndex
            });
            allHtml.sort(sortByIndex);
            if (allHtml.length > 1) {
                var contentHtml = [
                    '<table width="100%" cellpadding="0" cellspacing="0">',
                    '<tr>'
                ];
                for (var s = 0, t = allHtml.length; s < t; s++) {
                    var aHtml = allHtml[s];
                    contentHtml.push('<td ', hasValue(aHtml.width) ? ' width="' + aHtml.width + '" ' : '', aHtml.align ? ' align="' + aHtml.align + '">' : '>', aHtml.html, '</td>');
                }
                contentHtml.push('</tr></table>');
                contentHtml = contentHtml.join('');
            } else {
                contentHtml = textHtml;
            }
            html.push('<td id="' + getBodyCellId(table, index, i) + '" ', 'class="' + colClass.join(' ') + '" ', colAttr.join(' ') + ' ', 'style="width:' + (colWidth + rowWidthOffset) + 'px;', (colWidth ? '' : 'display:none') + '" ', 'data-control-table="' + table.id + '" ', 'data-row="' + index + '" data-col="' + i + '">', contentHtml, '</td>');
        }
        html.unshift(lib.format(tplRowPrefix, {
            id: getId(table, 'row') + index,
            className: rowClass.join(' '),
            attr: rowAttr.join(' '),
            index: index
        }), lib.format(tplTablePrefix, {
            width: '100%',
            controlTableId: table.id
        }));
        html.push('</tr></table></div>');
        if (table.hasSubrow) {
            for (var i = 0, l = builderList.length; i < l; i++) {
                var subrowBuilder = builderList[i].getSubrowHtml;
                if (subrowBuilder) {
                    html.push(subrowBuilder(table, index, extraArgsList[i]));
                }
            }
        }
        return html.join('');
    }
    function getRowBaseArgs(table, rowIndex) {
        var datasource = table.datasource || [];
        var dataLen = datasource.length;
        return {
            tdCellClass: getClass(table, 'cell'),
            tdBreakClass: getClass(table, 'cell-break'),
            tdTextClass: getClass(table, 'cell-text'),
            fieldLen: table.realFields.length,
            rowClass: [
                getClass(table, 'row'),
                getClass(table, 'row-' + (rowIndex % 2 ? 'odd' : 'even')),
                isRowSelected(table, rowIndex) ? getClass(table, 'row-selected') : '',
                dataLen - 1 === rowIndex ? getClass(table, 'row-last') : ''
            ].join(' ')
        };
    }
    var baseColTextTpl = '<span id="${colTextId}">${content}</span>';
    function getColBaseHtml(table, data, field, rowIndex, fieldIndex, extraArgs) {
        var tdCellClass = extraArgs.tdCellClass;
        var tdBreakClass = extraArgs.tdBreakClass;
        var tdTextClass = extraArgs.tdTextClass;
        var tdClass = [tdCellClass];
        var textClass = [tdTextClass];
        var content = field.content;
        if (fieldIndex === 0) {
            textClass.push(getClass(table, 'cell-text-first'));
        }
        if (fieldIndex === extraArgs.fieldLen - 1) {
            textClass.push(getClass(table, 'cell-text-last'));
        }
        if (table.breakLine || field.breakLine) {
            tdClass.push(tdBreakClass);
        }
        if (field.select) {
            textClass.push(getClass(table, 'cell-sel'));
        }
        if (field.align) {
            tdClass.push(getClass(table, 'cell-align-' + field.align));
        }
        if (field.field && field.field === table.orderBy) {
            tdClass.push(getClass(table, 'cell-sorted'));
        }
        var contentHtml = 'function' === typeof content ? content.call(table, data, rowIndex, fieldIndex) : table.encode ? lib.encodeHTML(data[content]) : data[content];
        if (isNullOrEmpty(contentHtml)) {
            contentHtml = '&nbsp;';
        }
        return {
            colClass: tdClass.join(' '),
            textClass: textClass.join(' '),
            html: lib.format(baseColTextTpl, {
                colTextId: getId(table, 'cell-textfield-' + rowIndex + '-' + fieldIndex),
                content: contentHtml
            })
        };
    }
    function rowOverHandler(element, e) {
        if (this.isDraging) {
            return;
        }
        helper.addPartClasses(this, 'row-hover', element);
    }
    function rowOutHandler(element, e) {
        helper.removePartClasses(this, 'row-hover', element);
    }
    function rowClickHandler(element, e) {
        var table = this;
        var rowClassName = helper.getPartClasses(table, 'cell-text')[0];
        if (table.selectMode === 'line' && lib.hasClass(e.target, rowClassName)) {
            if (table.dontSelectLine) {
                table.dontSelectLine = false;
                return;
            }
            var index = getAttr(element, 'index');
            switch (table.select) {
            case 'multi':
                var input = lib.g(getId(table, 'multi-select') + index);
                selectMulti(table, index, !input.checked);
                resetMutilSelectedStatus(table);
                break;
            case 'single':
                selectSingle(table, index, true);
                break;
            }
        }
    }
    function initResizeHandler(table) {
        table.viewWidth = lib.page.getViewWidth();
        table.viewHeight = lib.page.getViewHeight();
        var resizeHandler = function () {
            var viewWidth = lib.page.getViewWidth();
            var viewHeight = lib.page.getViewHeight();
            if (viewWidth === table.viewWidth && viewHeight === table.viewHeight) {
                return;
            }
            table.viewWidth = viewWidth;
            table.viewHeight = viewHeight;
            handleResize(table);
        };
        helper.addDOMEvent(table, window, 'resize', resizeHandler);
    }
    function handleResize(table) {
        var head = getHead(table);
        var foot = getFoot(table);
        table.realWidth = getWidth(table);
        var widthStr = table.realWidth + 'px';
        if (table.realWidth) {
            table.main.style.width = widthStr;
        }
        initColsWidth(table);
        resetColumns(table);
        var bodyWidthStr = table.bodyWidth + 'px';
        if (table.realWidth) {
            getBody(table).style.width = bodyWidthStr;
            head && (head.style.width = bodyWidthStr);
            foot && (foot.style.width = widthStr);
        }
        if (table.followHead) {
            resetFollowDomsWidth(table);
            resetFollowHeight(table);
        }
        initTableOffset(table);
        table.fire('resize');
        table.topReseter && table.topReseter();
    }
    function setPos(dom, pos, top, left) {
        if (dom) {
            dom.style.top = top + 'px';
            dom.style.left = left + 'px';
            dom.style.position = pos;
        }
    }
    function initTopResetHandler(table) {
        if (!table.followHead || table.topReseter) {
            return;
        }
        var domHead = getHead(table);
        var placeHolderId = getId(table, 'top-placeholder');
        var domPlaceholder = document.createElement('div');
        domPlaceholder.id = placeHolderId;
        domPlaceholder.style.width = '100%';
        domPlaceholder.style.display = 'none';
        lib.insertBefore(domPlaceholder, table.main);
        domPlaceholder = null;
        table.topReseter = function () {
            if (!table.followHead) {
                return;
            }
            var scrollTop = lib.page.getScrollTop();
            var posStyle = lib.ie && lib.ie < 7 ? 'absolute' : 'fixed';
            var mainHeight = table.main.offsetHeight;
            var absolutePosition = posStyle === 'absolute';
            var placeHolder = lib.g(placeHolderId);
            var followDoms = table.followDoms;
            if (table.noFollowHeadCache) {
                var position = domHead.style.position;
                if (position !== 'fixed' && position !== 'absolute') {
                    resetFollowOffset(table);
                }
            }
            if (scrollTop > table.followTop && (absolutePosition || scrollTop - table.followTop < mainHeight)) {
                var scrollLeft = lib.page.getScrollLeft();
                var fhArr = table.followHeightArr;
                var fhLen = fhArr.length;
                initTableOffset(table);
                var curLeft = absolutePosition ? table.left : table.left - scrollLeft;
                placeHolder.style.height = fhArr[fhLen - 1] + domHead.offsetHeight + 'px';
                placeHolder.style.display = '';
                if (lib.ie && lib.ie < 8) {
                    domHead.style.zIndex = table.zIndex + 1;
                }
                if (absolutePosition) {
                    for (var i = 0, len = followDoms.length; i < len; i++) {
                        setPos(followDoms[i], posStyle, fhArr[i] + scrollTop, curLeft);
                    }
                    setPos(domHead, posStyle, fhArr[fhLen - 1] + scrollTop, curLeft);
                } else {
                    for (var i = 0, len = followDoms.length; i < len; i++) {
                        setPos(followDoms[i], posStyle, fhArr[i], curLeft);
                    }
                    setPos(domHead, posStyle, fhArr[fhLen - 1], curLeft);
                }
            } else {
                placeHolder.style.height = 0;
                placeHolder.style.display = 'none';
                posStyle = '';
                for (var i = 0, len = followDoms.length; i < len; i++) {
                    setPos(followDoms[i], posStyle, 0, 0);
                }
                setPos(domHead, posStyle, 0, 0);
                domHead.style.zIndex = '';
            }
        };
        helper.addDOMEvent(table, window, 'scroll', table.topReseter);
    }
    function resetColumns(table) {
        var colsWidth = table.colsWidth;
        var foot = table.foot;
        var id = table.id;
        var len = foot instanceof Array && foot.length;
        var tds = getBody(table).getElementsByTagName('td');
        var tdsLen = tds.length;
        var rowWidthOffset = table.rowWidthOffset;
        if (len) {
            var colIndex = 0;
            for (var i = 0; i < len; i++) {
                var item = foot[i];
                var width = colsWidth[colIndex];
                var colspan = item.colspan || 1;
                for (var j = 1; j < colspan; j++) {
                    width += colsWidth[colIndex + j];
                }
                colIndex += colspan;
                var td = lib.g(getFootCellId(table, i));
                width = Math.max(width + rowWidthOffset, 0);
                td.style.width = width + 'px';
                td.style.display = width ? '' : 'none';
            }
        }
        len = colsWidth.length;
        if (!table.noHead) {
            for (var i = 0; i < len; i++) {
                var width = Math.max(colsWidth[i] + rowWidthOffset, 0);
                var td = lib.g(getTitleCellId(table, i));
                td.style.width = width + 'px';
                td.style.display = width ? '' : 'none';
            }
        }
        var j = 0;
        for (var i = 0; i < tdsLen; i++) {
            var td = tds[i];
            if (getAttr(td, 'control-table') === id) {
                var width = Math.max(colsWidth[j % len] + rowWidthOffset, 0);
                td.style.width = width + 'px';
                td.style.display = width ? '' : 'none';
                j++;
            }
        }
    }
    var mutilSelectAllTpl = '<input ' + 'type="checkbox" ' + 'id="${id}" ' + 'class="${className}" ' + 'data-index="${index}" ' + '${disabled}/>';
    var mutilSelectTpl = '<input ' + 'type="checkbox" ' + 'id="${id}" ' + 'class="${className}" ' + 'data-index="${index}" ' + '${disabled} ' + '${checked} />';
    function getMultiSelectField(table) {
        return {
            width: 30,
            stable: true,
            select: true,
            title: function (item, index) {
                var data = {
                    id: getId(table, 'select-all'),
                    className: getClass(table, 'select-all'),
                    disabled: table.disabled ? 'disabled="disabled"' : '',
                    index: index
                };
                return lib.format(mutilSelectAllTpl, data);
            },
            content: function (item, index) {
                var data = {
                    id: getId(table, 'multi-select') + index,
                    className: getClass(table, 'multi-select'),
                    disabled: table.disabled ? 'disabled="disabled"' : '',
                    index: index,
                    checked: isRowSelected(table, index) ? 'checked="checked"' : ''
                };
                return lib.format(mutilSelectTpl, data);
            }
        };
    }
    var singleSelectTpl = '<input ' + 'type="radio" ' + 'id="${id}" ' + 'name="${name}" ' + 'class="${className}" ' + 'data-index="${index}" ' + '${disabled} ' + '${checked} />';
    function getSingleSelectField(table) {
        return {
            width: 30,
            stable: true,
            title: '&nbsp;',
            select: true,
            content: function (item, index) {
                var id = getId(table, 'single-select');
                var data = {
                    id: id + index,
                    name: id,
                    className: getClass(table, 'single-select'),
                    index: index,
                    disabled: table.disabled ? 'disabled="disabled"' : '',
                    checked: isRowSelected(table, index) ? 'checked="checked"' : ''
                };
                return lib.format(singleSelectTpl, data);
            }
        };
    }
    function rowCheckboxClick(element, e) {
        var index = getAttr(element, 'index');
        selectMulti(this, index);
        resetMutilSelectedStatus(this);
    }
    function selectMulti(table, index, isSelected) {
        var selectedClass = 'row-selected';
        if (index >= 0) {
            var input = lib.g(getId(table, 'multi-select') + index);
            if (input) {
                hasValue(isSelected) && (input.checked = isSelected);
                var row = getRow(table, index);
                if (input.checked) {
                    helper.addPartClasses(table, selectedClass, row);
                } else {
                    helper.removePartClasses(table, selectedClass, row);
                }
            }
        } else if (hasValue(isSelected)) {
            var inputs = findSelectBox(table, 'checkbox');
            for (var i = 0, len = inputs.length; i < len; i++) {
                var input = inputs[i];
                input.checked = isSelected;
                var inputIndex = getAttr(input, 'index');
                var row = getRow(table, inputIndex);
                if (isSelected) {
                    helper.addPartClasses(table, selectedClass, row);
                } else {
                    helper.removePartClasses(table, selectedClass, row);
                }
            }
        }
    }
    function resetMutilSelectedStatus(table) {
        var selectAll = getHeadCheckbox(table);
        var inputs = findSelectBox(table, 'checkbox');
        var allChecked = true;
        var selected = [];
        var cbIdPrefix = getId(table, 'multi-select');
        for (var i = 0, len = inputs.length; i < len; i++) {
            var input = inputs[i];
            if (input.id.indexOf(cbIdPrefix) >= 0) {
                var inputIndex = getAttr(input, 'index');
                if (!input.checked) {
                    allChecked = false;
                } else {
                    selected.push(inputIndex);
                }
            }
        }
        setSelectedIndex(table, selected);
        table.fire('select', { selectedIndex: selected });
        selectAll.checked = allChecked;
    }
    function toggleSelectAll(arg) {
        selectAll(this, getHeadCheckbox(this).checked);
    }
    function findSelectBox(table, type) {
        var inputs = getBody(table).getElementsByTagName('input');
        var result = [];
        for (var i = 0, len = inputs.length; i < len; i++) {
            var input = inputs[i];
            var inputId = input.id;
            if (input.getAttribute('type') === type && inputId) {
                result.push(input);
            }
        }
        return result;
    }
    function selectAll(table, checked) {
        selectMulti(table, -1, checked);
        resetMutilSelectedStatus(table);
    }
    function selectSingleHandler(element, e) {
        selectSingle(this, getAttr(element, 'index'));
    }
    function selectSingle(table, index, isSelected) {
        var selectedIndex = table.selectedIndex;
        var input = lib.g(getId(table, 'single-select') + index);
        if (input) {
            hasValue(isSelected) && (input.checked = isSelected);
            table.fire('select', { selectedIndex: index });
            if (selectedIndex && selectedIndex.length) {
                helper.removePartClasses(table, 'row-selected', getRow(table, selectedIndex[0]));
            }
            setSelectedIndex(table, [index]);
            helper.addPartClasses(table, 'row-selected', getRow(table, index));
        }
    }
    function resetMainZIndex(table) {
        table.main.style.zIndex = table.zIndex || '';
    }
    function setDisabledStyle(table) {
        var inputs = findSelectBox(table, table.select === 'multi' ? 'checkbox' : 'radio');
        for (var i = inputs.length - 1; i >= 0; i--) {
            if (table.disabled) {
                inputs[i].setAttribute('disabled', 'disabled');
            } else {
                inputs[i].removeAttribute('disabled');
            }
        }
        if (table.select === 'multi') {
            var selectAll = getHeadCheckbox(table);
            if (selectAll) {
                if (table.disabled) {
                    selectAll.setAttribute('disabled', 'disabled');
                } else {
                    selectAll.removeAttribute('disabled');
                }
            }
        }
        if (table.children && table.children.length) {
            var children = table.children;
            for (var i = children.length - 1; i >= 0; i--) {
                children[i].setDisabled(table.disabled);
            }
        }
    }
    var rclass = /[\t\r\n]/g;
    function getClassMatch(className) {
        var cssClass = ' ' + className + ' ';
        return function (element) {
            var elClassName = ' ' + element.className + ' ';
            return elClassName.replace(rclass, ' ').indexOf(cssClass) >= 0;
        };
    }
    function createHandlerItem(handler, matchFn) {
        var fn = null;
        if (matchFn) {
            fn = 'function' === typeof matchFn ? matchFn : getClassMatch(matchFn);
        }
        return {
            handler: handler,
            matchFn: fn
        };
    }
    function getHandlers(table, el, eventType) {
        var realId = el.id;
        var handlers = table.handlers[realId];
        if (!handlers) {
            handlers = table.handlers[realId] = {};
        }
        if (eventType) {
            handlers = table.handlers[eventType];
            if (!handlers) {
                handlers = table.handlers[eventType] = [];
            }
        }
        return handlers;
    }
    function addHandlers(table, el, eventType, handlers) {
        var handlerQueue = getHandlers(table, el, eventType);
        var addedHandlers = [];
        if (!handlerQueue.length) {
            addDelegate(table, el, eventType);
        }
        for (var i = 0, l = handlers.length; i < l; i++) {
            var item = handlers[i];
            var hanlderItem = createHandlerItem(item.handler, item.matchFn);
            handlerQueue.push(hanlderItem);
            addedHandlers.push(hanlderItem);
        }
        return addedHandlers;
    }
    function removeHandlers(table, el, eventType, handlers) {
        var handlerQueue = getHandlers(table, el, eventType);
        for (var i = 0, len = handlers.length; i < len; i++) {
            var handler = handlers[i];
            for (var j = 0, l = handlerQueue.length; j < l; j++) {
                if (handlerQueue[j] === handler) {
                    handlerQueue.splice(j, 1);
                    j--;
                }
            }
        }
        if (!handlerQueue.length) {
            removeDelegate(table, el, eventType);
        }
    }
    function getDelegateHandler(element, handlerQueue, scrope) {
        return function (e) {
            var e = e || window.event;
            var cur = e.target;
            while (cur) {
                if (cur.nodeType === 1) {
                    for (var i = handlerQueue.length - 1; i >= 0; i--) {
                        var handlerItem = handlerQueue[i];
                        if (!handlerItem.matchFn || handlerItem.matchFn(cur)) {
                            handlerItem.handler.call(scrope, cur, e);
                        }
                    }
                }
                if (cur === element) {
                    break;
                }
                cur = cur.parentNode;
            }
        };
    }
    function addDelegate(control, element, eventType) {
        var handlerQueue = getHandlers(control, element, eventType);
        helper.addDOMEvent(control, element, eventType, getDelegateHandler(element, handlerQueue, control));
    }
    function removeDelegate(control, element, eventType) {
        helper.removeDOMEvent(control, element, eventType);
    }
    function initMainEventhandler(table) {
        var getPartClasses = helper.getPartClasses;
        var rowClass = getPartClasses(table, 'row')[0];
        var titleClass = getPartClasses(table, 'hcell')[0];
        var selectAllClass = getPartClasses(table, 'select-all')[0];
        var multiSelectClass = getPartClasses(table, 'multi-select')[0];
        var singleSelectClass = getPartClasses(table, 'single-select')[0];
        addHandlers(table, table.main, 'mouseover', [
            {
                handler: rowOverHandler,
                matchFn: rowClass
            },
            {
                handler: titleOverHandler,
                matchFn: titleClass
            }
        ]);
        addHandlers(table, table.main, 'mouseout', [
            {
                handler: rowOutHandler,
                matchFn: rowClass
            },
            {
                handler: titleOutHandler,
                matchFn: titleClass
            }
        ]);
        addHandlers(table, table.main, 'click', [
            {
                handler: rowClickHandler,
                matchFn: rowClass
            },
            {
                handler: titleClickHandler,
                matchFn: titleClass
            },
            {
                handler: toggleSelectAll,
                matchFn: selectAllClass
            },
            {
                handler: rowCheckboxClick,
                matchFn: multiSelectClass
            },
            {
                handler: selectSingleHandler,
                matchFn: singleSelectClass
            }
        ]);
    }
    Table.prototype = {
        type: 'Table',
        initOptions: function (options) {
            var properties = {};
            u.extend(properties, Table.defaultProperties, options);
            this.setProperties(properties);
        },
        initStructure: function () {
            this.realWidth = getWidth(this);
            if (this.realWidth) {
                this.main.style.width = this.realWidth + 'px';
            }
            resetMainZIndex(this);
            initBaseBuilderList(this);
            initResizeHandler(this);
            initMainEventhandler(this);
        },
        repaint: function (changes, changesIndex) {
            Control.prototype.repaint.apply(this, arguments);
            var table = this;
            if (!table.realWidth) {
                table.realWidth = getWidth(table);
                if (table.realWidth) {
                    table.main.style.width = table.realWidth + 'px';
                }
            }
            var defaultProperties = Table.defaultProperties;
            var allProperities = {};
            if (!changes) {
                for (var property in defaultProperties) {
                    if (defaultProperties.hasOwnProperty(property)) {
                        allProperities[property] = true;
                    }
                }
            } else {
                for (var i = 0; i < changes.length; i++) {
                    var record = changes[i];
                    allProperities[record.name] = true;
                }
            }
            var fieldsChanged = false;
            var colsWidthChanged = false;
            var tbodyChange = false;
            if (allProperities.fields || allProperities.select || allProperities.selectMode || allProperities.sortable) {
                initFields(table);
                fieldsChanged = true;
            }
            if (fieldsChanged || allProperities.breakLine || allProperities.colPadding || allProperities.fontSize) {
                initMinColsWidth(table);
                initColsWidth(table);
                colsWidthChanged = true;
            }
            if (fieldsChanged || colsWidthChanged || allProperities.noHead || allProperities.order || allProperities.orderBy || allProperities.selectedIndex) {
                renderHead(table);
            }
            if (allProperities.followHead || allProperities.noFollowHeadCache) {
                initFollowHead(table);
                initTopResetHandler(table);
            }
            if (fieldsChanged || colsWidthChanged || allProperities.encode || allProperities.noDataHtml || allProperities.datasource || allProperities.selectedIndex) {
                renderBody(table);
                tbodyChange = true;
            }
            if (tbodyChange || allProperities.bodyMaxHeight) {
                updateBodyMaxHeight(table);
            }
            if (fieldsChanged || colsWidthChanged || allProperities.foot) {
                renderFoot(table);
            }
            table.extraRepaint = helper.createRepaint([
                {
                    name: 'disabled',
                    paint: setDisabledStyle
                },
                {
                    name: 'width',
                    paint: handleResize
                },
                {
                    name: 'zIndex',
                    paint: resetMainZIndex
                }
            ]);
            table.extraRepaint(changes, changesIndex);
            if (tbodyChange && helper.isInStage(table, 'RENDERED')) {
                switch (table.select) {
                case 'multi':
                    setSelectedIndex(table, []);
                    table.fire('select', { selectedIndex: table.selectedIndex });
                    break;
                }
            }
            if (table.realWidth !== getWidth(table)) {
                handleResize(table);
            }
        },
        getId: function (id) {
            return getId(this, id);
        },
        getBodyCellId: function (rowIndex, fieldIndex) {
            return getBodyCellId(this, rowIndex, fieldIndex);
        },
        setCellText: function (text, rowIndex, columnIndex, isEncodeHtml) {
            if (isEncodeHtml) {
                text = lib.encodeHTML(text);
            }
            text = isNullOrEmpty(text) ? '&nbsp' : text;
            lib.g(getId(this, 'cell-textfield-' + rowIndex + '-' + columnIndex)).innerHTML = text;
        },
        getClass: function (name) {
            return getClass(this, name);
        },
        getRow: function (index) {
            return getRow(this, index);
        },
        addRowBuilders: function (builders) {
            addRowBuilderList(this, builders);
        },
        addHandlers: function (eventType, handlers) {
            if (!handlers.length) {
                handlers = [handlers];
            }
            return addHandlers(this, this.main, eventType, handlers);
        },
        removeHandlers: function (eventType, handlers) {
            if (!handlers.length) {
                handlers = [handlers];
            }
            removeHandlers(this, this.main, eventType, handlers);
        },
        adjustWidth: function () {
            handleResize(this);
        },
        setDatasource: function (datasource) {
            this.datasource = datasource;
            setSelectedIndex(this, []);
            var record = { name: 'datasource' };
            var record2 = { name: 'selectedIndex' };
            this.repaint([
                record,
                record2
            ], {
                datasource: record,
                selectedIndex: record2
            });
        },
        updateRowAt: function (index, data) {
            data && (this.datasource[index] = data);
            var dataItem = this.datasource[index];
            var rowEl = getRow(this, index);
            if (dataItem && rowEl) {
                this.fire('beforerowupdate', {
                    index: index,
                    data: dataItem
                });
                var container = document.createElement('div');
                container.innerHTML = getRowHtml(this, data, index, this.rowBuilderList);
                var newRowEl = container.children[0];
                rowEl.parentNode.replaceChild(newRowEl, rowEl);
                this.fire('afterrowupdate', {
                    index: index,
                    data: dataItem
                });
            }
        },
        getSelectedItems: function () {
            var selectedIndex = this.selectedIndex;
            var result = [];
            if (selectedIndex) {
                var datasource = this.datasource;
                if (datasource) {
                    for (var i = 0; i < selectedIndex.length; i++) {
                        result.push(datasource[selectedIndex[i]]);
                    }
                }
            }
            return result;
        },
        setRowSelected: function (index, isSelected) {
            var table = this;
            var isMutil = table.select === 'multi';
            var selectedHandler = isMutil ? selectMulti : selectSingle;
            if (u.isArray(index)) {
                if (isMutil) {
                    u.each(index, function (value) {
                        selectedHandler(table, value, isSelected);
                    });
                } else {
                    selectedHandler(table, index[0], isSelected);
                }
            } else {
                selectedHandler(table, index, isSelected);
            }
            if (isMutil) {
                resetMutilSelectedStatus(table);
            }
        },
        setAllRowSelected: function (isSelected) {
            this.setRowSelected(-1, isSelected);
        },
        resetFollowHead: function () {
            resetFollowHead(this);
        },
        dispose: function () {
            if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            helper.beforeDispose(this);
            var main = this.main;
            if (main) {
                this.followDoms = null;
                var mark = lib.g(getId(this, 'drag-mark'));
                if (mark) {
                    document.body.removeChild(mark);
                }
            }
            this.rowBuilderList = null;
            this.headPanel.disposeChildren();
            this.bodyPanel.disposeChildren();
            this.headPanel = null;
            this.bodyPanel = null;
            helper.dispose(this);
            helper.afterDispose(this);
        }
    };
    lib.inherits(Table, Control);
    require('./main').register(Table);
    return Table;
});

define('esui/Tab', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    function Tab() {
        Control.apply(this, arguments);
    }
    Tab.prototype.type = 'Tab';
    function extractTabsFromNavigatorElement(element) {
        var tabs = [];
        var children = lib.getChildren(element);
        for (var i = 0; i < children.length; i++) {
            var tab = children[i];
            var config = {
                title: lib.getText(tab),
                panel: tab.getAttribute('data-for')
            };
            if (tab.className) {
                config.classes = tab.className.split(/\s+/);
            }
            tabs.push(config);
        }
        return tabs;
    }
    Tab.prototype.initOptions = function (options) {
        var properties = {
            tabs: [],
            activeIndex: 0,
            allowClose: false,
            orientation: 'horizontal'
        };
        u.extend(properties, options);
        var children = lib.getChildren(this.main);
        if (children.length) {
            var tabs = [];
            for (var i = 0; i < children.length; i++) {
                var element = children[i];
                if (element.getAttribute('data-role') === 'navigator') {
                    this.navigatorElement = element;
                    properties.tabs = extractTabsFromNavigatorElement(element);
                    break;
                } else {
                    var config = {
                        title: element.getAttribute('title'),
                        panel: element.id
                    };
                    tabs.push(config);
                }
            }
            if (!properties.tabs.length) {
                properties.tabs = tabs;
            }
        }
        if (typeof properties.activeIndex === 'string') {
            properties.activeIndex = +properties.activeIndex;
        }
        this.setProperties(properties);
    };
    function clickTab(e) {
        var target = e.target;
        var tabElement = target;
        while (tabElement && tabElement.nodeName.toLowerCase() !== 'li') {
            tabElement = tabElement.parentNode;
        }
        if (tabElement && tabElement.nodeName.toLowerCase() === 'li') {
            var parent = tabElement.parentNode;
            var children = lib.getChildren(parent);
            for (var i = 0; i < children.length; i++) {
                if (children[i] === tabElement) {
                    if (this.helper.isPart(target, 'close')) {
                        this.removeAt(i);
                    } else {
                        this.set('activeIndex', i);
                    }
                    return;
                }
            }
        }
    }
    Tab.prototype.initStructure = function () {
        var navigator = this.navigatorElement;
        this.navigatorElement = null;
        if (!navigator) {
            navigator = document.createElement('ul');
            this.main.insertBefore(navigator, this.main.firstChild || null);
        }
        navigator.id = this.helper.getId('navigator');
        this.helper.addPartClasses('navigator', navigator);
    };
    Tab.prototype.initEvents = function () {
        this.helper.addDOMEvent('navigator', 'click', clickTab);
    };
    Tab.prototype.contentTemplate = '<span>${title}</span>';
    Tab.prototype.getContentHTML = function (config, allowClose) {
        var html = lib.format(this.contentTemplate, { title: u.escape(config.title) });
        if (allowClose) {
            html += '<span class="' + this.helper.getPartClassName('close') + '">\u5173\u95ED</span>';
        }
        return html;
    };
    function createTabElement(tab, config, isActive, allowClose) {
        var element = document.createElement('li');
        tab.helper.addPartClasses('item', element);
        if (config.classes) {
            lib.addClasses(element, config.classes);
        }
        if (isActive) {
            tab.helper.addPartClasses('item-active', element);
        }
        element.innerHTML = tab.getContentHTML(config, allowClose);
        return element;
    }
    function fillNavigator(tab) {
        var navigator = tab.helper.getPart('navigator');
        var parentNode = navigator.parentNode;
        var placeholder = navigator.nextSibling;
        navigator.innerHTML = '';
        navigator.parentNode.removeChild(navigator);
        for (var i = 0; i < tab.tabs.length; i++) {
            var config = tab.tabs[i];
            var isActive = tab.activeIndex === i;
            var tabElement = createTabElement(tab, config, isActive, tab.allowClose);
            navigator.appendChild(tabElement);
        }
        parentNode.insertBefore(navigator, placeholder);
    }
    Tab.prototype.setProperties = function (properties) {
        if (properties.tabs) {
            if (properties.activeIndex == null) {
                var currentActiveTab = this.tabs[this.activeIndex];
                var activeIndex = -1;
                for (var i = 0; i < properties.tabs.length; i++) {
                    if (properties.tabs[i] === currentActiveTab) {
                        activeIndex = i;
                        break;
                    }
                }
                if (activeIndex === -1) {
                    this.activeIndex = -1;
                    properties.activeIndex = 0;
                } else {
                    this.activeIndex = activeIndex;
                }
            }
            if (properties.allowClose != null) {
                this.allowClose = properties.allowClose;
                delete properties.allowClose;
            }
        }
        Control.prototype.setProperties.apply(this, arguments);
    };
    function activateTab(tab, index) {
        for (var i = 0; i < tab.tabs.length; i++) {
            var config = tab.tabs[i];
            if (config.panel) {
                var panel = lib.g(config.panel);
                if (panel) {
                    panel.style.display = i === index ? '' : 'none';
                }
            }
            var navigator = tab.helper.getPart('navigator');
            var children = lib.getChildren(navigator);
            var tabElement = children[i];
            var methodName = i === index ? 'addPartClasses' : 'removePartClasses';
            tab.helper[methodName]('item-active', tabElement);
        }
        var event = {
            activeIndex: index,
            tab: tab.tabs[index]
        };
        tab.fire('activate', event);
    }
    Tab.prototype.repaint = require('./painters').createRepaint(Control.prototype.repaint, {
        name: [
            'tabs',
            'allowClose'
        ],
        paint: fillNavigator
    }, {
        name: 'activeIndex',
        paint: activateTab
    }, {
        name: 'orientation',
        paint: function (tab, orientation) {
            tab.removeState('vertical');
            tab.removeState('horizontal');
            tab.addState(orientation);
        }
    });
    Tab.prototype.activate = function (config) {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] === config) {
                this.set('activeIndex', i);
            }
        }
    };
    Tab.prototype.add = function (config) {
        this.insert(config, this.tabs.length);
    };
    Tab.prototype.insert = function (config, index) {
        index = Math.min(index, this.tabs.length);
        index = Math.max(index, 0);
        this.tabs.splice(index, 0, config);
        var tabElement = createTabElement(this, config, false, this.allowClose);
        var navigator = this.helper.getPart('navigator');
        var children = lib.getChildren(navigator);
        navigator.insertBefore(tabElement, children[index] || null);
        if (this.tabs.length === 1) {
            this.activeIndex = 0;
            activateTab(this, 0);
        } else {
            if (index <= this.activeIndex) {
                this.activeIndex++;
            }
            if (config.panel) {
                var panel = lib.g(config.panel);
                if (panel) {
                    panel.style.display = 'none';
                }
            }
        }
        this.fire('add', {
            tab: config,
            index: index
        });
    };
    Tab.prototype.remove = function (config) {
        var index = 0;
        while ((index = u.indexOf(this.tabs, config, index)) >= 0) {
            this.removeAt(index);
        }
    };
    Tab.prototype.removeAt = function (index) {
        var removed = this.tabs.splice(index, 1)[0];
        var navigator = this.helper.getPart('navigator');
        if (removed) {
            var children = lib.getChildren(navigator);
            var tabElement = children[index];
            tabElement.parentNode.removeChild(tabElement);
            if (index < this.activeIndex) {
                this.activeIndex--;
            } else if (index === this.activeIndex) {
                this.activeIndex = Math.min(this.activeIndex, this.tabs.length - 1);
                activateTab(this, this.activeIndex);
            }
            if (removed.panel) {
                var panel = lib.g(removed.panel);
                if (panel) {
                    panel.style.display = 'none';
                }
            }
            this.fire('remove', {
                tab: removed,
                index: index
            });
        }
    };
    Tab.prototype.getActiveTab = function () {
        return this.get('tabs')[this.get('activeIndex')];
    };
    lib.inherits(Tab, Control);
    require('./main').register(Tab);
    return Tab;
});

define('esui/SearchBox', [
    'require',
    './lib',
    'esui',
    './Control',
    './TextBox',
    './Button',
    'mini-event',
    './painters'
], function (require) {
    var lib = require('./lib');
    var ui = require('esui');
    var Control = require('./Control');
    require('./TextBox');
    require('./Button');
    function SearchBox(options) {
        Control.apply(this, arguments);
    }
    SearchBox.prototype.type = 'SearchBox';
    SearchBox.prototype.initOptions = function (options) {
        var properties = {};
        lib.extend(properties, options);
        if (properties.disabled === 'false') {
            properties.disabled = false;
        }
        if (lib.isInput(this.main)) {
            if (!properties.placeholder) {
                properties.placeholder = lib.getAttribute(this.main, 'placeholder');
            }
            if (!properties.text) {
                properties.text = this.main.value;
            }
            if (!properties.maxLength && (lib.hasAttribute(this.main, 'maxlength') || this.main.maxLength > 0)) {
                properties.maxLength = this.main.maxLength;
            }
        } else {
            if (!properties.text) {
                properties.text = lib.getText(this.main);
            }
        }
        if (!properties.title) {
            properties.title = this.main.title;
        }
        Control.prototype.initOptions.call(this, properties);
    };
    SearchBox.prototype.initStructure = function () {
        var textboxOptions = {
            mode: 'text',
            childName: 'text',
            height: this.height,
            viewContext: this.viewContext,
            placeholder: this.placeholder
        };
        if (lib.isInput(this.main)) {
            this.helper.replaceMain();
        }
        var textbox = ui.create('TextBox', textboxOptions);
        textbox.appendTo(this.main);
        this.addChild(textbox);
        var buttonOptions = {
            main: document.createElement('span'),
            childName: 'button',
            content: '\u641C\u7D22',
            viewContext: this.viewContext
        };
        var button = ui.create('Button', buttonOptions);
        button.appendTo(this.main);
        this.addChild(button);
    };
    SearchBox.prototype.initEvents = function () {
        var textbox = this.getChild('text');
        var delegate = require('mini-event').delegate;
        delegate(textbox, this, 'input');
        delegate(textbox, 'enter', this, 'search');
        textbox.on('keypress', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        });
        textbox.on('focus', focus, this);
        textbox.on('blur', lib.bind(this.removeState, this, 'focus'));
        var button = this.getChild('button');
        button.on('click', click, this);
    };
    function focus() {
        this.removeState('clear');
        this.addState('focus');
    }
    function click() {
        if (this.hasState('clear')) {
            this.getChild('text').setValue('');
            this.removeState('clear');
        }
        this.fire('search');
    }
    SearchBox.prototype.getValue = function () {
        var text = this.getChild('text');
        return text.getValue();
    };
    var paint = require('./painters');
    SearchBox.prototype.repaint = paint.createRepaint(Control.prototype.repaint, paint.attribute('title'), {
        name: [
            'maxLength',
            'placeholder',
            'text',
            'width',
            'disabled',
            'readOnly'
        ],
        paint: function (box, maxLength, placeholder, text, width, disabled, readOnly) {
            var properties = {
                maxLength: maxLength,
                placeholder: placeholder,
                value: text,
                width: width,
                disabled: disabled,
                readOnly: readOnly
            };
            box.getChild('text').setProperties(properties);
        }
    }, {
        name: 'disabled',
        paint: function (box, disabled) {
            if (disabled === 'false') {
                disabled = false;
            }
            var button = box.getChild('button');
            button.set('disabled', disabled);
        }
    }, {
        name: 'fitWidth',
        paint: function (box, fitWidth) {
            var method = fitWidth ? 'addState' : 'removeState';
            box[method]('fit-width');
        }
    });
    SearchBox.prototype.getTextProperty = function () {
        var textbox = this.getChild('text');
        return textbox ? textbox.getValue() : this.text;
    };
    lib.inherits(SearchBox, Control);
    ui.register(SearchBox);
    return SearchBox;
});

define('esui/Schedule', [
    'require',
    './lib',
    './InputControl',
    './controlHelper',
    './main'
], function (require) {
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    var helper = require('./controlHelper');
    function Schedule(options) {
        InputControl.apply(this, arguments);
    }
    Schedule.defaultProperties = {
        helpSelectedText: '\u6295\u653E\u65F6\u95F4\u6BB5',
        helpText: '\u6682\u505C\u65F6\u95F4\u6BB5',
        dayTexts: [
            '\u661F\u671F\u4E00',
            '\u661F\u671F\u4E8C',
            '\u661F\u671F\u4E09',
            '\u661F\u671F\u56DB',
            '\u661F\u671F\u4E94',
            '\u661F\u671F\u516D',
            '\u661F\u671F\u65E5'
        ],
        shortcut: shortcut()
    };
    function shortcut() {
        function selectByDayStates(dayStates) {
            var value = [];
            for (var i = 0; i < 7 && i < dayStates.length; i++) {
                value[i] = [];
                for (var j = 0; j < 24; j++) {
                    value[i][j] = dayStates[i];
                }
            }
            return value;
        }
        return [
            {
                text: '\u5168\u5468\u6295\u653E',
                tip: '\u5468\u4E00\u5230\u5468\u65E5\u5168\u5929\u6295\u653E',
                getValue: function () {
                    return selectByDayStates([
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1
                    ]);
                }
            },
            {
                text: '\u5468\u4E00\u5230\u5468\u4E94\u6295\u653E',
                tip: '\u5468\u4E00\u5230\u5468\u4E94\u5168\u5929\u6295\u653E',
                getValue: function () {
                    return selectByDayStates([
                        1,
                        1,
                        1,
                        1,
                        1,
                        0,
                        0
                    ]);
                }
            },
            {
                text: '\u5468\u672B\u6295\u653E',
                tip: '\u5468\u516D\u3001\u5468\u65E5\u5168\u5929\u6295\u653E',
                getValue: function () {
                    return selectByDayStates([
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1
                    ]);
                }
            }
        ];
    }
    function initValue() {
        var value = [];
        for (var i = 0; i < 7; i++) {
            var lineValue = [];
            value.push(lineValue);
            for (var j = 0; j < 24; j++) {
                lineValue.push(0);
            }
        }
        return value;
    }
    function getClass(schedule, part) {
        return helper.getPartClasses(schedule, part).join(' ');
    }
    function getId(schedule, part) {
        return helper.getId(schedule, part);
    }
    function getShortcutHtml(schedule) {
        var me = schedule;
        var html = [];
        var tpl = '' + '<span class="${clazz}" data-item="${index}"' + ' >${text}</span>';
        var textClass = getClass(me, 'shortcut-text-item');
        html.push('<span class="' + textClass + '">\u5FEB\u901F\u8BBE\u5B9A\uFF1A</span>');
        var shortcuts = me.shortcut;
        var clazz = getClass(me, 'shortcut-item');
        for (var i = 0, len = shortcuts.length; i < len; i++) {
            var shortcut = shortcuts[i];
            html.push(lib.format(tpl, {
                clazz: clazz,
                text: shortcut.text,
                index: i
            }));
        }
        return html.join('');
    }
    function initBody(schedule) {
        lib.g(getId(schedule, 'body')).innerHTML = '' + getBodyTimeHtml(schedule) + getBodyDayHtml(schedule) + getBodyItemHtml(schedule);
    }
    function getBodyTimeHtml(schedule) {
        var me = schedule;
        var html = [];
        var timelineClass = getClass(me, 'time-line');
        var bodyHeadId = getId('body-head');
        html.push('<div class="', timelineClass, '" id="', bodyHeadId + '">');
        var timeHClass = getClass(me, 'time-head');
        for (var i = 0; i <= 24; i = i + 2) {
            html.push('<div class="', timeHClass, '" data-time="', i, '" ', 'id="', getId(me, 'time-head' + i), '">', i, '</div>');
        }
        html.push('</div>');
        return html.join('');
    }
    function getBodyDayHtml(schedule) {
        var me = schedule;
        var html = [];
        var dayHClass = getClass(me, 'day-head');
        var dayHId = getId(me, 'day-head');
        html.push('<div id="', dayHId, '" class="', dayHClass, '">');
        var dayClass = getClass(me, 'day');
        var dayTpl = '' + '<div class="' + dayClass + '">' + '<input type="checkbox" id="${dayId}" value="${value}">' + '&nbsp;<label for="${dayId}">${dayWord}</label>' + '</div>';
        var dayTexts = me.dayTexts;
        for (var i = 0; i < 7; i++) {
            html.push(lib.format(dayTpl, {
                dayWord: dayTexts[i],
                dayId: getId(me, 'line-state' + i),
                value: i
            }));
        }
        html.push('</div>');
        return html.join('');
    }
    function getBodyItemHtml(schedule) {
        var me = schedule;
        var html = [];
        var timeTpl = '' + '<div class="${timeClass}"' + ' id="${itemId}"' + ' data-day="${dayIndex}"' + ' data-time-item="1"' + ' data-time="${timeIndex}">' + '</div>';
        var timeBClass = getClass(me, 'time-body');
        var timeBId = getId(me, 'time-body');
        html.push('<div id="', timeBId, '" class="', timeBClass, '">');
        var lineClass = getClass(me, 'line');
        for (var i = 0; i < 7; i++) {
            var lineId = getId(me, 'line' + i);
            html.push('<div class="', lineClass, '" id="', lineId, '">');
            for (var j = 0; j < 24; j++) {
                var itemId = getId(me, 'time_' + i + '_' + j);
                html.push(lib.format(timeTpl, {
                    itemId: itemId,
                    timeClass: getClass(me, 'time'),
                    dayIndex: i,
                    timeIndex: j
                }));
            }
            html.push('</div>');
        }
        html.push('</div>');
        return html.join('');
    }
    function repaintView(schedule, value) {
        var me = schedule;
        var selectedClass = helper.getPartClasses(me, 'time-selected');
        var hoverClass = helper.getPartClasses(me, 'time-hover');
        for (var i = 0; i < 7; i++) {
            var statusArr = [];
            var lineEl = lib.g(getId(me, 'line' + i));
            removeSelectedLineCoverTip(schedule, lineEl);
            for (var j = 0; j < 24; j++) {
                var item = lib.g(getId(me, 'time_' + i + '_' + j));
                var val = value[i][j];
                if (val) {
                    lib.addClasses(item, selectedClass);
                } else {
                    lib.removeClasses(item, selectedClass);
                }
                lib.removeClasses(item, hoverClass);
                statusArr.push(val);
            }
            createSelectedLineCoverTip(me, statusArr, lineEl, i);
        }
    }
    function createSelectedLineCoverTip(schedule, arr, parent, index) {
        var me = schedule;
        var i = index;
        var checkInput = lib.g(getId(me, 'line-state' + i));
        checkInput.checked = false;
        var patt = /1{3,}/g;
        var statusStr = arr.join('');
        var result;
        var coverClass = getClass(me, 'continue-covertimes');
        var coverTpl = '' + '<div class="${coverClass}">' + '<strong>${text}</strong>' + '</div>';
        while ((result = patt.exec(statusStr)) != null) {
            var length = result[0].length;
            var start = result.index;
            var end = start + length;
            var coverDiv = document.createElement('aside');
            var cssStyle = ';width:' + length * 25 + 'px;top:0;left:' + start * 25 + 'px;';
            checkInput.checked = length === 24 ? true : false;
            coverDiv.setAttribute('data-start-time', start);
            coverDiv.setAttribute('data-end-time', end);
            coverDiv.setAttribute('data-day', i);
            coverDiv.className = coverClass;
            coverDiv.style.cssText += cssStyle;
            coverDiv.innerHTML = lib.format(coverTpl, {
                start: start,
                end: end,
                text: length === 24 ? '\u5168\u5929\u6295\u653E' : start + ':00-' + end + ':00',
                coverClass: getClass(me, 'covertimes-tip')
            });
            parent.appendChild(coverDiv);
            helper.addDOMEvent(me, coverDiv, 'mouseover', lib.curry(coverTipOverHandler, coverDiv));
        }
    }
    function coverTipOverHandler(element) {
        element.style.display = 'none';
    }
    function removeSelectedLineCoverTip(schedule, parent) {
        var removeDiv = parent.getElementsByTagName('aside');
        var len = removeDiv.length;
        while (len) {
            var item = removeDiv[0];
            if (item.getAttribute('data-day') != null) {
                helper.clearDOMEvents(schedule, item);
                parent.removeChild(item);
            }
            len--;
        }
    }
    function showPromptTip(schedule, tipId, mousepos, tipText) {
        var me = schedule;
        tipId = tipId || getId(me, 'tip');
        var tipElement = lib.g(tipId);
        if (tipElement) {
            tipElement.style.top = mousepos.y + 'px';
            tipElement.style.left = mousepos.x + 'px';
            tipElement.innerHTML = tipText;
        } else {
            var cssStyle = '' + ';position:absolute;z-index:5000;background:#fff6bd;top:' + mousepos.y + 'px;left:' + mousepos.x + 'px;display:none;';
            var tipClass = getClass(me, 'shortcut-item-tip');
            tipElement = document.createElement('div');
            tipElement.style.cssText = cssStyle;
            tipElement.id = tipId;
            tipElement.className = tipClass;
            tipElement.innerHTML = tipText;
            document.body.appendChild(tipElement);
            me.followTip[tipId] = tipElement;
        }
        me.tipElementTime = setTimeout(function () {
            tipElement.style.display = 'block';
        }, 100);
        return tipElement;
    }
    function hidePromptTip(schedule, tipId) {
        clearTimeout(schedule.tipElementTime);
        var tip = lib.g(tipId);
        tip && (tip.style.display = 'none');
    }
    function dayClickHandler(e) {
        var target = lib.event.getTarget(e);
        if (target.nodeName.toLowerCase() !== 'input') {
            return;
        }
        var me = this;
        var dom = target;
        var dayIndex = parseInt(dom.value, 10);
        var dayState = dom.checked;
        var rawValueCopy = rawValueClone(me.rawValue);
        var timeValue = rawValueCopy[dayIndex];
        for (var i = 0, len = timeValue.length; i < len; i++) {
            timeValue[i] = dayState ? 1 : 0;
        }
        me.setRawValue(rawValueCopy);
    }
    function shortcutClickHandler(e) {
        var target = lib.event.getTarget(e);
        if (!target || !lib.hasAttribute(target, 'data-item')) {
            return;
        }
        var index = target.getAttribute('data-item');
        var func = this.shortcut[index].getValue;
        typeof func === 'function' && func.call(this);
        var rawValue;
        if (typeof func === 'function') {
            rawValue = func.call(this);
        } else {
            rawValue = func;
        }
        this.setRawValue(rawValue);
    }
    function shortcutMoveHandler(e) {
        var target = lib.event.getTarget(e);
        if (!target || !target.getAttribute('data-item')) {
            return;
        }
        var element = target;
        var me = this;
        lib.event.getMousePosition(e);
        var mousepos = {};
        mousepos.y = e.pageY + 20;
        mousepos.x = e.pageX + 10;
        var dom = element;
        var index = dom.getAttribute('data-item');
        var tipId = getId(me, 'shortcut-item') + index;
        setTimeout(function () {
            var tipElement = lib.g(tipId);
            if (tipElement) {
                tipElement.style.top = mousepos.y + 'px';
                tipElement.style.left = mousepos.x + 'px';
            }
        }, 0);
    }
    function shortcutOverOutHandler(isOver, e) {
        var target = lib.event.getTarget(e);
        if (!target || !target.getAttribute('data-item')) {
            return;
        }
        var element = target;
        lib.event.getMousePosition(e);
        var mousepos = {};
        mousepos.y = e.pageY + 20;
        mousepos.x = e.pageX + 10;
        var me = this;
        var dom = element;
        var index = dom.getAttribute('data-item');
        var tipId = getId(me, 'shortcut-item') + index;
        var clazz = helper.getPartClasses(me, 'shortcut-item-hover');
        if (isOver) {
            lib.addClasses(dom, clazz);
            var tipText = me.shortcut[index].tip;
            showPromptTip(me, tipId, mousepos, tipText);
        } else {
            lib.removeClasses(dom, clazz);
            hidePromptTip(me, tipId);
        }
    }
    var timeTipTpl = '' + '<div id="${timeId}" class="${timeClass}">${time}</div>' + '<div id="${textId}" class="${textClass}">${text}</div>';
    function timeOverHandler(e) {
        var target = lib.event.getTarget(e);
        if (!target || !target.getAttribute('data-time-item')) {
            return;
        }
        var element = target;
        lib.addClasses(element, helper.getPartClasses(this, 'time-hover'));
        lib.event.getMousePosition(e);
        var mousepos = {};
        mousepos.y = e.pageY + 20;
        mousepos.x = e.pageX + 10;
        var me = this;
        var time = parseInt(element.getAttribute('data-time'), 10);
        var day = parseInt(element.getAttribute('data-day'), 10);
        var tipText = lib.format(timeTipTpl, {
            time: '<strong>' + time + ':00</strong>&nbsp;\u2014&nbsp;<strong>' + (time + 1) + ':00</strong>',
            text: '\u70B9\u51FB/\u62D6\u52A8\u9F20\u6807\u9009\u62E9',
            timeId: getId(me, 'timeitem-tip-head'),
            textId: getId(me, 'timeitem-tip-body'),
            timeClass: getClass(me, 'timeitem-tip-head'),
            textClass: getClass(me, 'timeitem-tip-body')
        });
        var tipId = getId(me, 'timeitem-tip');
        showPromptTip(me, tipId, mousepos, tipText);
        var timebody = lib.g(getId(me, 'time-body'));
        var timeCovers = timebody.getElementsByTagName('aside');
        for (var i = 0, len = timeCovers.length; i < len; i++) {
            var item = timeCovers[i];
            var startCT = parseInt(item.getAttribute('data-start-time'), 10);
            var endCT = parseInt(item.getAttribute('data-end-time'), 10);
            var coverDay = parseInt(item.getAttribute('data-day'), 10);
            if (time >= startCT && time < endCT && day === coverDay) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        }
    }
    function timeOutHandler(e) {
        var target = lib.event.getTarget(e);
        if (!target || !target.getAttribute('data-time-item')) {
            return;
        }
        lib.removeClasses(target, helper.getPartClasses(this, 'time-hover'));
        hidePromptTip(this, getId(this, 'timeitem-tip'));
    }
    var getTimeBodyMoveHandler;
    var getTimeBodyUpHandler;
    function timeBodyDownHandler(e) {
        var me = this;
        var doc = document;
        getTimeBodyMoveHandler = lib.bind(timeBodyMoveHandler, me);
        getTimeBodyUpHandler = lib.bind(timeBodyUpHandler, me);
        lib.on(doc, 'mousemove', getTimeBodyMoveHandler);
        lib.on(doc, 'mouseup', getTimeBodyUpHandler);
        lib.event.getMousePosition(e);
        this.dragStartPos = {
            x: e.pageX,
            y: e.pageY
        };
        var timebody = lib.g(getId(me, 'time-body'));
        me.dragRange = [];
        var timebodyTop = lib.getOffset(timebody).top;
        var timebodyLeft = lib.getOffset(timebody).left;
        me.dragRange.push(timebodyTop);
        me.dragRange.push(timebodyLeft + timebody.offsetWidth);
        me.dragRange.push(timebodyTop + timebody.offsetHeight);
        me.dragRange.push(timebodyLeft);
        ondragHuck(timebody);
        var cellPos = getTragTimeCellPos(this, {
            x: e.pageX,
            y: e.pageY
        });
        var tipId = getId(me, 'timeitem-tip');
        lib.g(tipId) && (lib.g(tipId).style.display = 'none');
        repaintFollowEle(this, cellPos);
    }
    function timeBodyMoveHandler(e) {
        lib.event.getMousePosition(e);
        var cellPos = getTragTimeCellPos(this, {
            x: e.pageX,
            y: e.pageY
        });
        repaintFollowEle(this, cellPos);
    }
    function timeBodyUpHandler(e) {
        var me = this;
        offDragHuck(lib.g(getId(me, 'time-body')));
        var followEle = lib.g(getId(me, 'follow-item'));
        followEle.style.display = 'none';
        lib.event.getMousePosition(e);
        var cellPos = getTragTimeCellPos(me, {
            x: e.pageX,
            y: e.pageY
        });
        setTimeout(function () {
            setSelectedAreaValue(me, cellPos);
        }, 10);
        var doc = document;
        lib.un(doc, 'mousemove', getTimeBodyMoveHandler);
        lib.un(doc, 'mouseup', getTimeBodyUpHandler);
    }
    function setSelectedAreaValue(schedule, cellPos) {
        var me = schedule;
        var startcell = cellPos.startcell;
        var endcell = cellPos.endcell;
        var minXCell = Math.min(startcell.x, endcell.x);
        var minYCell = Math.min(startcell.y, endcell.y);
        var maxXCell = Math.max(startcell.x, endcell.x);
        var maxYCell = Math.max(startcell.y, endcell.y);
        var rawValueCopy = rawValueClone(me.rawValue);
        for (var i = minYCell; i <= maxYCell; i++) {
            for (var j = minXCell; j <= maxXCell; j++) {
                if (rawValueCopy[i][j]) {
                    rawValueCopy[i][j] = 0;
                } else {
                    rawValueCopy[i][j] = 1;
                }
            }
        }
        me.setRawValue(rawValueCopy);
    }
    function getTragTimeCellPos(schedule, mousepos) {
        var me = schedule;
        var timeBodyPos = me.dragRange;
        var dragStartPos = me.dragStartPos;
        var rangePos = {};
        if (mousepos.x <= timeBodyPos[1] && mousepos.x >= timeBodyPos[3]) {
            rangePos.x = mousepos.x;
        } else {
            rangePos.x = mousepos.x - dragStartPos.x < 0 ? timeBodyPos[3] : timeBodyPos[1];
        }
        if (mousepos.y <= timeBodyPos[2] && mousepos.y >= timeBodyPos[0]) {
            rangePos.y = mousepos.y;
        } else {
            rangePos.y = mousepos.y - dragStartPos.y < 0 ? timeBodyPos[0] : timeBodyPos[2];
        }
        var cellrange = {
            startcell: {},
            endcell: {}
        };
        cellrange.startcell.x = Math.floor((dragStartPos.x - me.dragRange[3]) / 25);
        cellrange.startcell.y = Math.floor((dragStartPos.y - me.dragRange[0]) / 25);
        cellrange.endcell.x = Math.floor((rangePos.x - me.dragRange[3]) / 25);
        cellrange.endcell.y = Math.floor((rangePos.y - me.dragRange[0]) / 25);
        if (cellrange.endcell.x >= 23) {
            cellrange.endcell.x = 23;
        }
        if (cellrange.endcell.y >= 6) {
            cellrange.endcell.y = 6;
        }
        return cellrange;
    }
    function repaintFollowEle(schedule, cellPos) {
        var me = schedule;
        var followEleId = getId(schedule, 'follow-item');
        var followEle = lib.g(followEleId);
        if (!followEle) {
            followEle = document.createElement('div');
            followEle.className = getClass(me, 'follow-item');
            followEle.id = followEleId;
            lib.g(getId(me, 'time-body')).appendChild(followEle);
        }
        var startcell = cellPos.startcell;
        var endcell = cellPos.endcell;
        var startcellX = startcell.x;
        var startcellY = startcell.y;
        var endcellX = endcell.x;
        var endcellY = endcell.y;
        var divTop;
        var divLeft;
        var divHeight;
        var divWidth;
        if (endcellY >= startcellY) {
            divTop = startcellY * 25;
            divHeight = (endcellY - startcellY + 1) * 25 - 2;
        } else {
            divTop = endcellY * 25;
            divHeight = (startcellY - endcellY + 1) * 25 - 2;
        }
        if (endcellX >= startcellX) {
            divLeft = startcellX * 25;
            divWidth = (endcellX - startcellX + 1) * 25 - 2;
        } else {
            divLeft = endcellX * 25;
            divWidth = (startcellX - endcellX + 1) * 25 - 2;
        }
        var cssStyles = '' + ';display:block;' + ';width:' + divWidth + 'px' + ';height:' + divHeight + 'px' + ';top:' + divTop + 'px' + ';left:' + divLeft + 'px' + ';background:#faffbe';
        followEle.style.cssText += cssStyles;
    }
    function ondragHuck(target) {
        var doc = document;
        lib.on(doc, 'selectstart', dragUnSelect);
        if (target.setCapture) {
            target.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(window.Event.MOUSEMOVE | window.Event.MOUSEUP);
        }
        if (document.selection) {
            document.selection.empty && document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }
    function offDragHuck(target) {
        var doc = document;
        if (target.releaseCapture) {
            target.releaseCapture();
        } else if (window.releaseEvents) {
            window.releaseEvents(window.Event.MOUSEMOVE | window.Event.MOUSEUP);
        }
        lib.un(doc, 'selectstart', dragUnSelect);
    }
    function dragUnSelect(e) {
        lib.event.preventDefault(e);
    }
    function rawValueClone(rawValue) {
        var val = [];
        for (var i = 0, len = rawValue.length; i < len; i++) {
            val.push([].slice.call(rawValue[i], 0));
        }
        return val;
    }
    function setDayCheckboxState(schedule, state, value) {
        var dayHead = lib.g(getId(schedule, 'day-head'));
        var inputs = dayHead.getElementsByTagName('input');
        for (var i = 0, len = inputs.length; i < len; i++) {
            inputs[i][state] = value;
        }
    }
    function dealValueByCoord(schedule, isSelect, coord) {
        var rawValueCopy = rawValueClone(schedule.rawValue);
        for (var i = 0, len = coord.length; i < len; i++) {
            var item = coord[i];
            if (rawValueCopy[item[0]] != null && rawValueCopy[item[0]][item[1]] != null) {
                rawValueCopy[item[0]][item[1]] = isSelect ? 1 : 0;
            }
        }
        schedule.setRawValue(rawValueCopy);
    }
    Schedule.prototype = {
        constructor: Schedule,
        type: 'Schedule',
        createMain: function (options) {
            if (!options.tagName) {
                return InputControl.prototype.createMain.call(this);
            }
            return document.createElement(options.tagName);
        },
        initOptions: function (options) {
            var properties = {};
            lib.extend(properties, Schedule.defaultProperties, options);
            this.setProperties(properties);
            if (this.rawValue == null) {
                this.setRawValue(initValue());
            }
            this.followTip = {};
        },
        initStructure: function () {
            var me = this;
            this.main.tabIndex = 0;
            var tpl = '' + '<input type="hidden" name="${name}" id="${inputId}"/>' + '<div class="${bodyClass}" id="${bodyId}"></div>' + '<div class="${headClass}">' + '<div class="${helpClass}">' + '<div class="${helpSelectedClass}"></div>' + '<div class="${helpTextClass}">' + '${helpSelected}' + '</div>' + '<div class="${helpUnselectedClass}"></div>' + '<div class="${helpTextClass}">${help}</div>' + '</div>' + '<div class="${shortcutClass}" id="${shortcutId}">' + '${shortcutHtml}' + '</div>' + '</div>';
            this.main.innerHTML = lib.format(tpl, {
                name: this.name,
                inputId: getId(me, 'value-input'),
                headClass: getClass(me, 'head'),
                bodyClass: getClass(me, 'body'),
                helpClass: getClass(me, 'help'),
                helpSelectedClass: getClass(me, 'help-selected'),
                helpUnselectedClass: getClass(me, 'help-unselected'),
                helpTextClass: getClass(me, 'help-text'),
                shortcutClass: getClass(me, 'shortcut'),
                shortcutId: getId(me, 'shortcut'),
                bodyId: getId(me, 'body'),
                helpSelected: me.helpSelectedText,
                help: me.helpText,
                shortcutHtml: getShortcutHtml(me)
            });
            initBody(me);
        },
        initEvents: function () {
            var timebody = lib.g(getId(this, 'time-body'));
            this.helper.addDOMEvent(timebody, 'mousedown', timeBodyDownHandler);
            this.helper.addDOMEvent(timebody, 'mouseover', timeOverHandler);
            this.helper.addDOMEvent(timebody, 'mouseout', timeOutHandler);
            this.helper.addDOMEvent(lib.g(getId(this, 'day-head')), 'click', dayClickHandler);
            var shortcut = this.helper.getPart('shortcut');
            this.helper.addDOMEvent(shortcut, 'click', shortcutClickHandler);
            this.helper.addDOMEvent(shortcut, 'mouseover', lib.curry(shortcutOverOutHandler, true));
            this.helper.addDOMEvent(shortcut, 'mouseout', lib.curry(shortcutOverOutHandler, false));
            this.helper.addDOMEvent(shortcut, 'mousemove', shortcutMoveHandler);
        },
        setProperties: function (properties) {
            var changes = InputControl.prototype.setProperties.call(this, properties);
            var rawValueObj = changes.rawValue;
            if (rawValueObj && this.stringifyValue(rawValueObj.oldValue) !== this.stringifyValue(rawValueObj.newValue)) {
                this.fire('change', { rawValue: this.rawValue });
            }
        },
        repaint: helper.createRepaint(InputControl.prototype.repaint, {
            name: 'rawValue',
            paint: function (schedule, rawValue) {
                var value = schedule.stringifyValue(rawValue);
                lib.g(getId(schedule, 'value-input')).value = value == null ? '' : value;
                repaintView(schedule, rawValue);
            }
        }, {
            name: 'disabled',
            paint: function (schedule, value) {
                setDayCheckboxState(schedule, 'disabled', value);
            }
        }, {
            name: 'readonly',
            paint: function (schedule, value) {
                setDayCheckboxState(schedule, 'readonly', value);
            }
        }),
        parseValue: function (value) {
            var arr = [];
            var step = 24;
            for (var i = 0, len = value.length; i < len; i = i + step) {
                var inner = value.substring(i, i + step).split('');
                var innerOut = [];
                for (var j = 0; j < inner.length; j++) {
                    innerOut.push(inner[j] - 0);
                }
                arr.push(innerOut);
            }
            return arr;
        },
        stringifyValue: function (rawValue) {
            var arr = [];
            if (!rawValue) {
                return null;
            }
            for (var i = 0, len = rawValue.length; i < len; i++) {
                arr.push(rawValue[i].join(''));
            }
            return arr.join('');
        },
        setRawValue: function (rawValue) {
            this.setProperties({ rawValue: rawValue });
        },
        getRawValue: function () {
            return this.rawValue;
        },
        select: function (coord) {
            dealValueByCoord(this, 1, [].slice.call(arguments));
        },
        unselect: function (coord) {
            dealValueByCoord(this, 0, [].slice.call(arguments));
        },
        dispose: function () {
            helper.beforeDispose(this);
            var followTip = this.followTip;
            for (var key in followTip) {
                if (followTip[key]) {
                    document.body.removeChild(followTip[key]);
                }
            }
            helper.dispose(this);
            helper.afterDispose(this);
        }
    };
    lib.inherits(Schedule, InputControl);
    require('./main').register(Schedule);
    return Schedule;
});

define('esui/TextBox', [
    'require',
    'underscore',
    './lib',
    './main',
    './InputControl',
    'mini-event',
    './painters'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var ui = require('./main');
    var InputControl = require('./InputControl');
    var supportPlaceholder = 'placeholder' in document.createElement('input');
    function TextBox(options) {
        InputControl.apply(this, arguments);
    }
    TextBox.defaultProperties = { width: 200 };
    TextBox.prototype.type = 'TextBox';
    TextBox.prototype.initOptions = function (options) {
        var properties = {
            mode: 'text',
            placeholder: '',
            autoSelect: false
        };
        u.extend(properties, TextBox.defaultProperties);
        if (!properties.name) {
            properties.name = this.main.getAttribute('name');
        }
        if (lib.isInput(this.main)) {
            var nodeName = this.main.nodeName.toLowerCase();
            if (nodeName === 'textarea') {
                properties.mode = 'textarea';
            } else {
                var type = this.main.type;
                properties.mode = type === 'password' ? 'password' : 'text';
            }
            if (!properties.placeholder) {
                properties.placeholder = this.main.getAttribute('placeholder');
            }
            this.helper.extractOptionsFromInput(this.main, properties);
        }
        u.extend(properties, options);
        if (!properties.hasOwnProperty('title') && this.main.title) {
            properties.title = this.main.title;
        }
        this.setProperties(properties);
    };
    TextBox.prototype.getFocusTarget = function () {
        return lib.g(this.inputId);
    };
    function dispatchSpecialKey(e) {
        var keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            this.fire('enter');
        }
        var args = {
            keyCode: keyCode,
            key: String.fromCharCode(keyCode),
            ctrlKey: e.ctrlKey,
            altKey: e.altKey
        };
        var event = require('mini-event').fromDOMEvent(e, 'keypress', args);
        this.fire('keypress', event);
    }
    function togglePlaceholder(textbox, focused) {
        var input = lib.g(textbox.inputId);
        if (!supportPlaceholder) {
            var placeholder = textbox.helper.getPart('placeholder');
            if (typeof focused !== 'boolean') {
                focused = document.activeElement === input;
            }
            if (!focused && !textbox.getRawValue()) {
                textbox.helper.removePartClasses('placeholder-hidden', placeholder);
            } else {
                textbox.helper.addPartClasses('placeholder-hidden', placeholder);
            }
        }
    }
    function focus(e) {
        togglePlaceholder(this, true);
        if (this.autoSelect) {
            var input = lib.g(this.inputId);
            input.select();
        }
        this.fire('focus');
    }
    function blur(e) {
        togglePlaceholder(this, false);
        this.fire('blur');
    }
    function dispatchInputEvent(e) {
        if (e.type === 'input' || e.propertyName === 'value') {
            this.fire('input');
        }
    }
    TextBox.prototype.initStructure = function () {
        if (lib.isInput(this.main)) {
            var main = this.helper.replaceMain();
            lib.removeAttribute(this.main, 'tabindex');
            this.inputId = main.id || this.helper.getId('input');
            if (this.main.id) {
                this.main.id = this.helper.getId();
            }
            var input = main.cloneNode(false);
            lib.removeAttribute(input, ui.getConfig('instanceAttr'));
            input.id = this.inputId;
            this.main.appendChild(input);
        } else {
            this.inputId = this.helper.getId('input');
            var html = this.mode === 'textarea' ? '<textarea id="' + this.inputId + '"' : '<input type="' + this.mode + '" placeholder="' + this.placeholder + '" id="' + this.inputId + '"';
            if (this.name) {
                html += ' name="' + u.escape(this.name) + '"';
            }
            html += this.mode === 'textarea' ? '></textarea>' : ' />';
            this.main.innerHTML = html;
        }
        if (!supportPlaceholder) {
            var input = lib.g(this.inputId);
            var placeholder = document.createElement('label');
            placeholder.id = this.helper.getId('placeholder');
            lib.setAttribute(placeholder, 'for', input.id);
            this.helper.addPartClasses('placeholder', placeholder);
            lib.insertAfter(placeholder, input);
        }
    };
    TextBox.prototype.initEvents = function () {
        var input = lib.g(this.inputId);
        this.helper.addDOMEvent(input, 'keypress', dispatchSpecialKey);
        this.helper.addDOMEvent(input, 'focus', focus);
        this.helper.addDOMEvent(input, 'blur', blur);
        var inputEventName = 'oninput' in input ? 'input' : 'propertychange';
        this.helper.addDOMEvent(input, inputEventName, dispatchInputEvent);
        this.helper.delegateDOMEvent(input, 'change');
    };
    TextBox.prototype.repaint = require('./painters').createRepaint(InputControl.prototype.repaint, {
        name: 'rawValue',
        paint: function (textbox, rawValue) {
            var input = lib.g(textbox.inputId);
            var eventName = 'oninput' in input ? 'input' : 'propertychange';
            textbox.helper.removeDOMEvent(input, eventName);
            input.value = textbox.stringifyValue(rawValue);
            textbox.helper.addDOMEvent(input, eventName, dispatchInputEvent);
            togglePlaceholder(textbox);
        }
    }, {
        name: 'title',
        paint: function (textbox, title) {
            var input = lib.g(textbox.inputId);
            var placeholder = textbox.helper.getPart('placeholder');
            if (title) {
                lib.setAttribute(textbox.main, 'title', title);
                lib.setAttribute(input, 'title', title);
                if (placeholder) {
                    lib.setAttribute(placeholder, 'title', title);
                }
            } else {
                lib.removeAttribute(textbox.main, 'title');
                lib.removeAttribute(input, 'title');
                if (placeholder) {
                    lib.removeAttribute(placeholder, 'title');
                }
            }
        }
    }, {
        name: 'maxLength',
        paint: function (textbox, maxLength) {
            var input = lib.g(textbox.inputId);
            maxLength = parseInt(maxLength, 10);
            if (!maxLength || maxLength <= 0) {
                try {
                    input.maxLength = undefined;
                    delete input.maxLength;
                } catch (badErrorForIE) {
                }
                lib.removeAttribute(input, 'maxlength');
                lib.removeAttribute(input, 'maxLength');
            } else {
                input.maxLength = maxLength;
                lib.setAttribute(input, 'maxlength', maxLength);
            }
        }
    }, {
        name: [
            'disabled',
            'readOnly'
        ],
        paint: function (textbox, disabled, readOnly) {
            var input = lib.g(textbox.inputId);
            input.disabled = disabled;
            input.readOnly = readOnly;
        }
    }, {
        name: 'placeholder',
        paint: function (textbox, placeholder) {
            var input = lib.g(textbox.inputId);
            if (supportPlaceholder) {
                if (placeholder) {
                    lib.setAttribute(input, 'placeholder', placeholder);
                } else {
                    lib.removeAttribute(input, 'placeholder');
                }
            } else {
                var label = textbox.helper.getPart('placeholder');
                label.innerHTML = u.escape(placeholder || '');
            }
            togglePlaceholder(textbox);
        }
    }, {
        name: [
            'hint',
            'hintType'
        ],
        paint: function (textbox, hint, hintType) {
            var label = textbox.helper.getPart('hint');
            textbox.removeState('hint-prefix');
            textbox.removeState('hint-suffix');
            if (!hint && label) {
                lib.removeNode(label);
            }
            if (hint) {
                if (!label) {
                    label = document.createElement('label');
                    label.id = textbox.helper.getId('hint');
                    textbox.helper.addPartClasses('hint', label);
                    lib.setAttribute(label, 'for', textbox.inputId);
                }
                label.innerHTML = u.escape(hint);
                hintType = hintType === 'prefix' ? 'prefix' : 'suffix';
                var method = hintType === 'prefix' ? 'insertBefore' : 'insertAfter';
                var input = lib.g(textbox.inputId);
                lib[method](label, input);
                textbox.addState('hint-' + hintType);
            }
        }
    }, {
        name: [
            'width',
            'hint',
            'hidden'
        ],
        paint: function (textbox, width, hint, hidden) {
            if (hidden || isNaN(width)) {
                return;
            }
            if (hint) {
                var hintLabel = textbox.helper.getPart('hint');
                if (hintLabel) {
                    width -= hintLabel.offsetWidth;
                }
            }
            var input = lib.g(textbox.inputId);
            input.style.width = width + 'px';
            var placeholder = textbox.helper.getPart('placeholder');
            if (placeholder) {
                placeholder.style.maxWidth = width + 'px';
            }
        }
    }, {
        name: 'height',
        paint: function (textbox, height) {
            if (isNaN(height)) {
                return;
            }
            var hintLabel = textbox.helper.getPart('hint');
            var heightWithUnit = height + 'px';
            if (hintLabel) {
                hintLabel.style.height = heightWithUnit;
                hintLabel.style.lineHeight = heightWithUnit;
            }
            var input = lib.g(textbox.inputId);
            input.style.height = heightWithUnit;
            var placeholder = textbox.helper.getPart('placeholder');
            if (placeholder) {
                placeholder.style.height = heightWithUnit;
                placeholder.style.lineHeight = heightWithUnit;
            }
        }
    });
    TextBox.prototype.getValidityLabel = function () {
        var label = InputControl.prototype.getValidityLabel.apply(this, arguments);
        if (label) {
            label.set('targetType', this.mode === 'textarea' ? 'TextArea' : 'TextBox');
        }
        return label;
    };
    TextBox.prototype.getRawValue = function () {
        var input = lib.g(this.inputId);
        return input ? input.value : this.rawValue || this.value || '';
    };
    TextBox.prototype.getRawValueProperty = TextBox.prototype.getRawValue;
    lib.inherits(TextBox, InputControl);
    ui.register(TextBox);
    return TextBox;
});

define('esui/RichCalendar', [
    'require',
    './Button',
    './MonthView',
    './TextBox',
    './lib',
    './controlHelper',
    './InputControl',
    './Layer',
    './main',
    'moment',
    'underscore'
], function (require) {
    require('./Button');
    require('./MonthView');
    require('./TextBox');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var InputControl = require('./InputControl');
    var Layer = require('./Layer');
    var ui = require('./main');
    var moment = require('moment');
    var u = require('underscore');
    function RichCalendarLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(RichCalendarLayer, Layer);
    RichCalendarLayer.prototype.render = function (element) {
        document.body.appendChild(element);
        var calendar = this.control;
        element.innerHTML = getLayerHtml(calendar);
        calendar.helper.initChildren(element);
        paintCals(calendar, true);
    };
    function getLayerHtml(calendar) {
        var displayNum = calendar.displayNum;
        var monthViewContainerTpl = '' + '<div id="${id}" class="${className}">${monthView}</div>';
        var monthViews = [];
        for (var i = 0; i < displayNum; i++) {
            monthViews.push(lib.format(monthViewContainerTpl, {
                id: calendar.helper.getId('month-' + i),
                className: calendar.helper.getPartClassName('month-container'),
                monthView: getCalendarHtml(calendar, i)
            }));
        }
        return lib.format('<div id="${id}" class="${className}">${monthViews}</div>', {
            id: calendar.helper.getId('months'),
            className: calendar.helper.getPartClassName('months'),
            monthViews: monthViews.join('')
        });
    }
    function getCalendarHtml(calendar, index) {
        var tpl = '' + '<div' + ' data-ui-type="MonthView"' + ' data-ui-child-name="${calName}"' + ' data-ui-mode="multi">' + '</div>';
        return lib.format(tpl, { calName: 'monthView' + index });
    }
    RichCalendarLayer.prototype.toggle = function () {
        var element = this.getElement();
        if (!element || this.control.helper.isPart(element, 'layer-hidden')) {
            paintCals(this.control, true);
            this.show();
        } else {
            this.hide();
        }
    };
    function RichCalendar(options) {
        InputControl.apply(this, arguments);
        this.layer = new RichCalendarLayer(this);
    }
    function syncValueOfMonthViews(calendar, index) {
        var rawValue = this.getRawValue();
        var displayNum = calendar.displayNum;
        for (var i = 0; i < displayNum; i++) {
            if (i !== index) {
                var monthView = calendar.getChild('monthView' + i);
                monthView.setRawValueWithoutFireChange(rawValue);
            }
        }
        calendar.rawValue = rawValue;
        updateMain(calendar, rawValue);
    }
    function updateMonthOrYear(calendar, index) {
        var displayNum = calendar.displayNum;
        var syncDate = new Date(this.year, this.month, 1);
        for (var i = 0; i < displayNum; i++) {
            if (i !== index) {
                var monthView = calendar.getChild('monthView' + i);
                monthView.un('changemonth');
                monthView.un('changeyear');
                var scope = index - i;
                var newDate;
                if (scope > 0) {
                    newDate = moment(syncDate).subtract('month', scope);
                } else {
                    newDate = moment(syncDate).add('month', -scope);
                }
                monthView.setProperties({
                    month: newDate.month() + 1,
                    year: newDate.year()
                });
                monthView.on('changeyear', lib.curry(updateMonthOrYear, calendar, i));
                monthView.on('changemonth', lib.curry(updateMonthOrYear, calendar, i));
            }
        }
    }
    function paintCals(calendar, bindEvent) {
        var displayNum = calendar.displayNum;
        var startMonth = calendar.startMonth;
        var startYear = calendar.startYear;
        for (var i = 0; i < displayNum; i++) {
            var rangeBegin = calendar.range.begin;
            var rangeEnd = calendar.range.end;
            var rangeBeginYear = rangeBegin.getFullYear();
            var rangeBeginMonth = rangeBegin.getMonth();
            var rangeEndYear = rangeEnd.getFullYear();
            var rangeEndMonth = rangeEnd.getMonth();
            var trueRange;
            var realEnd;
            var realBegin;
            if (i === 0) {
                realEnd = new Date(rangeEndYear, rangeEndMonth - displayNum + 2, 0);
                trueRange = {
                    begin: calendar.range.begin,
                    end: realEnd
                };
            } else if (i === displayNum - 1) {
                realBegin = new Date(rangeBeginYear, rangeBeginMonth + displayNum - 1, 1);
                trueRange = {
                    begin: realBegin,
                    end: calendar.range.end
                };
            } else {
                realBegin = new Date(rangeBeginYear, rangeBeginMonth + i, 1);
                realEnd = new Date(rangeEndYear, rangeEndMonth - displayNum - i + 2, 0);
                trueRange = {
                    begin: realBegin,
                    end: realEnd
                };
            }
            var options = {
                year: startYear,
                month: startMonth + i,
                rawValue: calendar.rawValue,
                range: calendar.range,
                viewRange: trueRange
            };
            paintCal(calendar, options, i, bindEvent);
        }
    }
    function paintCal(calendar, options, index, bindEvent) {
        var monthView = calendar.getChild('monthView' + index);
        monthView.setProperties(options);
        if (bindEvent === true) {
            monthView.on('change', lib.curry(syncValueOfMonthViews, calendar, index));
            monthView.on('changeyear', lib.curry(updateMonthOrYear, calendar, index));
            monthView.on('changemonth', lib.curry(updateMonthOrYear, calendar, index));
        }
    }
    function updateMain(calendar, value) {
        var inputId = helper.getId(calendar, 'param-value');
        lib.g(inputId).value = calendar.stringifyValue(value);
        var textInput = calendar.getChild('textInput');
        var textValue = getValueText(calendar, value);
        textInput.setProperties({ rawValue: textValue });
        updateTotalInfo(calendar, value);
        calendar.fire('change');
    }
    function updateTotalInfo(calendar, rawValue) {
        var totalNum = lib.g(helper.getId(calendar, 'total-num'));
        totalNum.innerHTML = rawValue.length;
    }
    function deleteAll(calendar) {
        calendar.set('rawValue', []);
    }
    function convertToRaw(value) {
        var strDates = value.split(',');
        if (strDates.length === 1) {
            strDates.push('2046-11-04');
        } else if (strDates[0] === '') {
            strDates[0] = '1983-09-03';
        } else if (strDates[1] === '') {
            strDates[1] = '2046-11-04';
        }
        return {
            begin: parseToDate(strDates[0]),
            end: parseToDate(strDates[1])
        };
    }
    function parseToDate(dateStr) {
        function parse(source) {
            var dates = source.split('-');
            if (dates) {
                return new Date(parseInt(dates[0], 10), parseInt(dates[1], 10) - 1, parseInt(dates[2], 10));
            }
            return null;
        }
        if (!dateStr) {
            return null;
        }
        dateStr = dateStr + '';
        var dateAndHour = dateStr.split(' ');
        var date = parse(dateAndHour[0]);
        if (dateAndHour[1]) {
            var clock = dateAndHour[1].split(':');
            date.setHours(clock[0]);
            date.setMinutes(clock[1]);
            date.setSeconds(clock[2]);
        }
        return date;
    }
    function getValueText(calendar, rawValue) {
        var dateStrs = [];
        var tempDate = [];
        var tempIndex = 0;
        var oneDay = 86400000;
        for (var i = 0; i < rawValue.length; i++) {
            if (i === 0) {
                dateStrs.push(lib.date.format(rawValue[i], calendar.paramFormat));
                tempDate.push(rawValue[i]);
                tempIndex++;
            } else {
                if (rawValue[i] - rawValue[i - 1] > oneDay) {
                    if (rawValue[i - 1] - tempDate[tempIndex - 1] !== 0) {
                        dateStrs.push('\u81F3');
                        dateStrs.push(lib.date.format(rawValue[i - 1], calendar.paramFormat));
                        tempDate.push(rawValue[i - 1]);
                        tempIndex++;
                    }
                    dateStrs.push('\n');
                    dateStrs.push(lib.date.format(rawValue[i], calendar.paramFormat));
                    tempDate.push(rawValue[i]);
                    tempIndex++;
                } else if (i === rawValue.length - 1) {
                    dateStrs.push('\u81F3');
                    dateStrs.push(lib.date.format(rawValue[i], calendar.paramFormat));
                } else {
                    continue;
                }
            }
        }
        return dateStrs.join('');
    }
    function updateRawValueByTyping(calendar) {
        var textInputValue = this.getValue();
        var items = textInputValue.replace(/\n{2,}/g, '\n').split('\n');
        var result = [];
        var container = {};
        var invalid = false;
        for (var i = 0, len = items.length; i < len; i++) {
            var item = lib.trim(items[i]);
            if (item.length === 0 || container[item]) {
                continue;
            }
            container[item] = 1;
            var beginEnd = item.split('\u81F3');
            var begin = beginEnd[0];
            var end = begin;
            if (beginEnd.length > 1) {
                end = beginEnd[1];
            }
            if (isDate(begin) && isDate(end)) {
                result.push(begin);
                result.push(end);
            } else {
                invalid = true;
            }
        }
        var value = result.join(',');
        calendar.rawValue = calendar.parseValue(value);
        this.setProperties({ rawValue: getValueText(calendar, calendar.rawValue) });
        calendar.fire('change');
    }
    function isDate(date) {
        var reg = /^(\d{4})(-)(\d{2})\2(\d{2})$/;
        var r = date.match(reg);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        var newStr = '' + d.getFullYear() + r[2] + (d.getMonth() + 1) + r[2] + d.getDate();
        date = r[1] + r[2] + (r[3] - 1 + 1) + r[2] + (r[4] - 1 + 1);
        return newStr === date;
    }
    RichCalendar.prototype = {
        type: 'RichCalendar',
        initOptions: function (options) {
            var now = new Date();
            var properties = {
                now: now,
                range: {
                    begin: new Date(1983, 8, 3),
                    end: new Date(2046, 10, 4)
                },
                paramFormat: 'YYYY-MM-DD',
                rawValue: [],
                displayNum: 2,
                startYear: now.getFullYear(),
                startMonth: now.getMonth() + 1
            };
            helper.extractValueFromInput(this, options);
            lib.extend(properties, options);
            if (options.range && typeof options.range === 'string') {
                properties.range = convertToRaw(properties.range);
            }
            this.setProperties(properties);
        },
        setProperties: function (properties) {
            if (properties.rawValue == null || properties.rawValue.length === 0) {
                if (properties.value) {
                    properties.rawValue = this.parseValue(properties.value);
                }
            }
            if (properties.rawValue && properties.rawValue.length) {
                var startDate = properties.rawValue[0];
                properties.startYear = startDate.getFullYear();
                properties.startMonth = startDate.getMonth() + 1;
            }
            var changes = InputControl.prototype.setProperties.apply(this, arguments);
            return changes;
        },
        initStructure: function () {
            if (lib.isInput(this.main)) {
                helper.replaceMain(this);
            }
            var tpl = [
                '<div class="${className}" id="${id}">',
                '<textarea data-ui-type="TextBox"',
                ' data-ui-mode="textarea"',
                ' data-ui-width="${textBoxWidth}"',
                ' data-ui-height="${textBoxHeight}"',
                ' data-ui-child-name="textInput"></textarea>',
                '<div data-ui-type="Panel" class="${generalPanelClass}"',
                ' data-ui-child-name="generalPanel">',
                '\u5171<span id="${totalNumId}" ',
                'class="${totalNumClass}"></span>\u5929,',
                '<span data-ui-type="Button" data-ui-skin="link"',
                ' data-ui-child-name="deleteBtn">\u5168\u90E8\u5220\u9664</span>',
                '</div>',
                '<div data-ui-type="Button" data-ui-skin="calendar"',
                ' data-ui-child-name="modifyBtn">\u4FEE\u6539\u65F6\u95F4</div>',
                '</div>',
                '<input type="hidden" id="${inputId}" name="${name}"',
                ' value="" />'
            ];
            var getClass = helper.getPartClasses;
            this.main.innerHTML = lib.format(tpl.join('\n'), {
                className: getClass(this, 'text').join(' '),
                id: helper.getId(this, 'text'),
                textBoxWidth: this.textBoxWidth || 200,
                textBoxHeight: this.textBoxHeight || 100,
                name: this.name,
                inputId: helper.getId(this, 'param-value'),
                generalPanelClass: getClass(this, 'general-info').join(' '),
                totalNumId: helper.getId(this, 'total-num'),
                totalNumClass: getClass(this, 'total-num').join(' ')
            });
            this.initChildren(this.main);
        },
        initEvents: function () {
            var modifyBtn = this.getChild('modifyBtn');
            modifyBtn.on('click', u.bind(this.layer.toggle, this.layer));
            var deleteAllBtn = this.getChild('generalPanel').getChild('deleteBtn');
            deleteAllBtn.on('click', lib.curry(deleteAll, this));
            var textInput = this.getChild('textInput');
            textInput.on('blur', lib.curry(updateRawValueByTyping, this));
        },
        repaint: helper.createRepaint(InputControl.prototype.repaint, {
            name: [
                'rawValue',
                'range'
            ],
            paint: function (calendar, rawValue, range) {
                if (range) {
                    if (typeof range === 'string') {
                        range = convertToRaw(range);
                    }
                    if (!range.begin) {
                        range.begin = new Date(1983, 8, 3);
                    } else if (!range.end) {
                        range.end = new Date(2046, 10, 4);
                    }
                    calendar.range = range;
                }
                if (rawValue) {
                    updateMain(calendar, rawValue);
                }
                if (calendar.helper.getPart('months')) {
                    paintCals(calendar);
                }
            }
        }, {
            name: [
                'disabled',
                'hidden',
                'readOnly'
            ],
            paint: function (calendar, disabled, hidden, readOnly) {
                if (disabled || hidden || readOnly) {
                    calendar.layer.hide();
                }
            }
        }),
        setRawValue: function (date) {
            this.setProperties({ 'rawValue': date });
        },
        getRawValue: function () {
            return this.rawValue;
        },
        stringifyValue: function (rawValue) {
            var dateStrs = [];
            var oneDay = 86400000;
            for (var i = 0; i < rawValue.length; i++) {
                if (i === 0) {
                    dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                } else {
                    if (rawValue[i] - rawValue[i - 1] > oneDay) {
                        dateStrs.push(lib.date.format(rawValue[i - 1], this.paramFormat));
                        dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                    }
                }
                if (i === rawValue.length - 1) {
                    dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                }
            }
            return dateStrs.join(',');
        },
        getRanges: function () {
            var rawValue = this.rawValue;
            var dateStrs = this.stringifyValue(rawValue).split(',');
            var range = [];
            for (var i = 0; i < dateStrs.length - 1; i += 2) {
                var begin = parseToDate(dateStrs[i]);
                var end = parseToDate(dateStrs[i + 1]);
                range.push({
                    begin: begin,
                    end: end
                });
            }
            return range;
        },
        setRanges: function (rangeValue) {
            var dates = {};
            for (var i = 0; i < rangeValue.length; i++) {
                var begin = rangeValue[i].begin;
                var end = rangeValue[i].end;
                var temp;
                if (!begin || !end) {
                    continue;
                }
                if (begin - end === 0) {
                    dates[begin] = begin;
                } else {
                    temp = begin;
                    while (temp <= end) {
                        dates[temp] = temp;
                        temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1);
                    }
                }
            }
            var rawDates = [];
            for (var key in dates) {
                rawDates.push(dates[key]);
            }
            rawDates.sort(function (a, b) {
                return a - b;
            });
            this.set('rawValue', rawDates);
        },
        parseValue: function (value) {
            var dateStrs = value.split(',');
            var dates = {};
            for (var i = 0; i < dateStrs.length - 1; i += 2) {
                var begin = parseToDate(dateStrs[i]);
                var end = parseToDate(dateStrs[i + 1]);
                var temp;
                if (!begin || !end) {
                    continue;
                }
                if (begin - end === 0) {
                    dates[begin] = begin;
                } else {
                    temp = begin;
                    while (temp <= end) {
                        dates[temp] = temp;
                        temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1);
                    }
                }
            }
            var rawDates = [];
            for (var key in dates) {
                rawDates.push(dates[key]);
            }
            rawDates.sort(function (a, b) {
                return a - b;
            });
            return rawDates;
        },
        dispose: function () {
            if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            if (this.layer) {
                this.layer.dispose();
                this.layer = null;
            }
            InputControl.prototype.dispose.apply(this, arguments);
        },
        toggleCanlendarLayer: function () {
            this.layer.toggle();
        }
    };
    lib.inherits(RichCalendar, InputControl);
    ui.register(RichCalendar);
    return RichCalendar;
});

define('esui/Region', [
    'require',
    './Select',
    './lib',
    './controlHelper',
    './InputControl',
    './main',
    'underscore'
], function (require) {
    require('./Select');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var InputControl = require('./InputControl');
    var ui = require('./main');
    var u = require('underscore');
    function Region(options) {
        InputControl.apply(this, arguments);
    }
    function createMultiRegion(region) {
        var data = region.regionData;
        var len = data.length;
        var html = [];
        for (var i = 0; i < len; i++) {
            html.push(getLevelHtml(region, data[i], 1));
        }
        var tpl = '<input type="hidden" id="${inputId}" name="${name}" />';
        html.push(lib.format(tpl, {
            inputId: helper.getId(region, 'param-value'),
            name: region.name
        }));
        region.main.innerHTML = html.join('');
    }
    function walk(node, handler, context) {
        handler.call(context, node);
        u.each(node.children, function (child) {
            walk(child, handler, context);
        });
    }
    function selectMulti(region, values) {
        var regionDataIndex = region.regionDataIndex;
        var fullValues = [];
        u.each(values, function (value) {
            var node = regionDataIndex[value];
            if (node) {
                walk(node, function (node) {
                    fullValues.push(node.id);
                });
            }
        });
        var map = {};
        u.each(fullValues, function (value) {
            map[value] = 1;
        });
        u.each(region.regionDataIndex, function (item, key) {
            var checked = map.hasOwnProperty(key);
            var checkbox = getOptionDOM(region, key);
            if (checkbox) {
                checkbox.checked = checked;
            } else {
                item.isSelected = checked;
            }
        });
        updateMulti(region);
        updateParamValue(region);
    }
    function getOptionDOM(region, id) {
        return lib.g(helper.getId(region, 'item-' + id));
    }
    function updateMulti(region, data, dontResetValue, level) {
        var level = level || 0;
        data = data || { children: region.regionData };
        var indexData = region.regionDataIndex[data.id];
        if (!dontResetValue) {
            region.rawValue = [];
        }
        var isItemChecked;
        var selChildLength = 0;
        var checkbox = data.id && getOptionDOM(region, data.id);
        var children = data.children;
        var len = children instanceof Array && children.length;
        if (len) {
            var isChecked = true;
            for (var i = 0; i < len; i++) {
                isItemChecked = updateMulti(region, children[i], 1, level + 1);
                if (isItemChecked) {
                    selChildLength++;
                }
                isChecked = isChecked && isItemChecked;
            }
            if (checkbox) {
                checkbox.checked = isChecked;
                isChecked && region.rawValue.push(data.id);
                indexData.isSelected = isChecked;
            }
            if (level === 3) {
                if (!isChecked) {
                    updateSelectedTip(region, selChildLength, len, data.id);
                } else {
                    updateSelectedTip(region, 1, 1, data.id);
                }
            }
            return isChecked;
        } else {
            if (checkbox) {
                if (checkbox.checked) {
                    region.rawValue.push(data.id);
                }
                return checkbox.checked;
            } else if (indexData.isSelected) {
                region.rawValue.push(data.id);
            }
            return indexData.isSelected;
        }
    }
    function getHiddenClassName() {
        return ui.getConfig('stateClassPrefix') + '-hidden';
    }
    function updateSelectedTip(region, selCityIdsLength, cLength, id) {
        var infoTag = lib.g(helper.getId(region, 'info-' + id));
        if (selCityIdsLength !== 0 && selCityIdsLength !== cLength) {
            lib.removeClass(infoTag, getHiddenClassName());
            infoTag.innerHTML = selCityIdsLength + '/' + cLength + '';
        } else {
            lib.addClass(infoTag, getHiddenClassName());
            infoTag.innerHTML = '';
        }
    }
    var tplInputItem = [
        '<div class="${itemClasses}" id="${itemWrapperId}" >',
        '<input type="checkbox" value="${itemValue}" id="${itemId}"',
        ' data-optionId="${itemValue}" data-level="${level}">',
        '<label for="${itemId}">${text}</label>',
        '</div>'
    ].join('');
    var tplBoxWrapper = [
        '<div class="${boxClass}">',
        tplInputItem,
        '<div class="${contentClass}">${content}</div>',
        '</div>'
    ].join('');
    var tplPopLayer = [
        '<div class="${popLayerClass}">',
        '<div class="${hiddenClass} ${layerBoxClass}" id="${id}">',
        '${innerHTML}</div>',
        '<b class="${hiddenClass}" id="${infoId}"></b>',
        '</div>'
    ].join('');
    var tplProvinceWrapper = '<div class="${classes}">${content}</div>';
    var tempIdx = 0;
    function getLevelHtml(region, item, level) {
        item.level = level;
        var subItemHtml = [];
        var children = item.children;
        if (children != null) {
            item.isSelected = false;
            if (item.level === 3) {
                if (item.children && item.children.length > 0) {
                    region.cityCache[item.id] = formatItemChildren(region, item);
                }
            } else {
                var len = children instanceof Array && children.length;
                for (var i = 0; i < len; i++) {
                    subItemHtml.push(getLevelHtml(region, item.children[i], level + 1));
                }
            }
        }
        switch (level) {
        case 1:
            return lib.format(tplBoxWrapper, {
                boxClass: helper.getPartClasses(region, 'country-box').join(' '),
                itemClasses: helper.getPartClasses(region, 'country-check').join(' '),
                itemWrapperId: '',
                itemValue: item.id,
                itemId: helper.getId(region, 'item-' + item.id),
                level: item.level,
                text: item.text,
                contentClass: '',
                content: subItemHtml.join('')
            });
        case 2:
            return lib.format(tplBoxWrapper, {
                boxClass: helper.getPartClasses(region, 'region-box' + tempIdx++ % 2).join(' '),
                itemClasses: helper.getPartClasses(region, 'region-check').join(' '),
                itemWrapperId: '',
                itemValue: item.id,
                itemId: helper.getId(region, 'item-' + item.id),
                level: item.level,
                text: item.text,
                contentClass: helper.getPartClasses(region, 'province-box').join(' '),
                content: subItemHtml.join('')
            });
        case 3:
            var layer = lib.format(tplPopLayer, {
                popLayerClass: helper.getPartClasses(region, 'locator').join(' '),
                layerBoxClass: helper.getPartClasses(region, 'city-box').join(' '),
                hiddenClass: getHiddenClassName(),
                id: helper.getId(region, 'sub-' + item.id),
                infoId: helper.getId(region, 'info-' + item.id),
                innerHTML: subItemHtml.join('')
            });
            var text = lib.format(tplInputItem, {
                itemClasses: helper.getPartClasses(region, 'text').join(' '),
                itemWrapperId: helper.getId(region, 'wrapper-' + item.id),
                itemValue: item.id,
                itemId: helper.getId(region, 'item-' + item.id),
                level: item.level,
                text: item.text
            });
            return lib.format(tplProvinceWrapper, {
                classes: helper.getPartClasses(region, 'province-item').join(' '),
                content: layer + text
            });
        case 4:
            return lib.format(tplInputItem, {
                itemClasses: helper.getPartClasses(region, 'city').join(' '),
                itemWrapperId: '',
                itemValue: item.id,
                itemId: helper.getId(region, 'item-' + item.id),
                level: item.level,
                text: item.text
            });
        }
    }
    function formatItemChildren(region, item) {
        if (item.level === 3 && item.children != null) {
            var itemHtml = [];
            var leftLength = 0, rightLength = 0;
            for (var i = 0; i < item.children.length; i++) {
                item.children[i].parent = item;
                item.children[i].level = item.level + 1;
                itemHtml.push(getLevelHtml(region, item.children[i], item.level + 1));
                if (i % 2 === 0 && item.children[i].text.length > leftLength) {
                    leftLength = item.children[i].text.length;
                }
                if (i % 2 === 1 && item.children[i].text.length > rightLength) {
                    rightLength = item.children[i].text.length;
                }
            }
            if (itemHtml.length % 2 === 1) {
                itemHtml.push('');
            }
            var html = [
                '<table border="0" cellspacing="0" cellpadding="0"',
                ' width="',
                (leftLength + rightLength) * 14 + 66,
                '">'
            ].join('');
            var tpl = [
                '<tr>',
                '<td width="',
                leftLength * 14 + 33,
                '">${firstItem}',
                '</td>',
                '<td width="',
                rightLength * 14 + 33,
                '">${secondItem}',
                '</td>',
                '</tr>'
            ].join('');
            for (var j = 0; j < itemHtml.length; j += 2) {
                html += lib.format(tpl, {
                    firstItem: itemHtml[j],
                    secondItem: itemHtml[j + 1]
                });
            }
            return html + '</table>';
        }
        return '';
    }
    function initMultiData(region, properties) {
        var source = properties.regionData;
        properties.regionDataIndex = {};
        walker(source, { children: source });
        function walker(data, parent) {
            var len = data instanceof Array && data.length;
            var i;
            var item;
            if (!len) {
                return;
            }
            for (var i = 0; i < len; i++) {
                var item = lib.clone(data[i]);
                item.parent = parent;
                properties.regionDataIndex[item.id] = item;
                walker(item.children, item);
            }
        }
    }
    function mainClick(e) {
        if (this.disabled || this.readOnly) {
            return;
        }
        var tar = e.target;
        while (tar && tar !== document.body) {
            var hit = false;
            if (tar.nodeName.toLowerCase() === 'input') {
                hit = true;
            } else if (tar.nodeName.toLowerCase() === 'label') {
                var checkId = lib.getAttribute(tar, 'for');
                tar = lib.g(checkId);
                hit = true;
            }
            if (hit) {
                optionClick(this, tar);
                this.fire('change');
                return;
            }
            tar = tar.parentNode;
        }
    }
    function optionClick(region, dom, dontRefreshView) {
        var id = lib.getAttribute(dom, 'data-optionId');
        var isChecked = dom.checked;
        var data = region.regionDataIndex[id];
        data.isSelected = isChecked;
        var children = data.children;
        var len = children instanceof Array && children.length;
        if (len) {
            u.each(children, function (child) {
                var checkbox = getOptionDOM(region, child.id);
                if (checkbox) {
                    checkbox.checked = isChecked;
                    optionClick(region, checkbox, 1);
                } else {
                    region.regionDataIndex[child.id].isSelected = isChecked;
                }
            });
        } else if (len === 0) {
            if (lib.getAttribute(dom, 'level') === 3) {
                var selCityIdsLength = 0;
                var cityTotal = region.regionDataIndex[id].parent.children;
                u.each(cityTotal, function (city) {
                    if (getOptionDOM(city.id).checked === true) {
                        selCityIdsLength++;
                    }
                });
                updateSelectedTip(region, selCityIdsLength, cityTotal.length, region.regionDataIndex[id].parent.id);
            }
        }
        if (!dontRefreshView) {
            updateMulti(region);
            updateParamValue(region);
        }
    }
    function mainMouseHandler(type, e) {
        if (this.disabled || this.readOnly) {
            return;
        }
        var tar = e.target;
        var textClass = helper.getPartClasses(this, 'text');
        var layerClass = helper.getPartClasses(this, 'city-box');
        var handler = showSubCity;
        if (type === 'hide') {
            handler = hideSubCity;
        }
        var itemId;
        while (tar && tar !== document.body) {
            var optionChildLayer;
            if (lib.hasClass(tar, textClass[0])) {
                itemId = lib.getAttribute(tar.firstChild, 'value');
                optionChildLayer = tar.previousSibling.firstChild;
            } else if (lib.hasClass(tar, layerClass[0])) {
                optionChildLayer = tar;
            }
            if (optionChildLayer) {
                handler(this, optionChildLayer, itemId);
                return;
            }
            tar = tar.parentNode;
        }
    }
    function showSubCity(region, dom, itemId) {
        if (itemId) {
            var subCityHTML = region.cityCache[itemId];
            if (!subCityHTML) {
                return;
            }
            dom.innerHTML = subCityHTML;
            selectMulti(region, region.rawValue);
        }
        lib.removeClass(dom, getHiddenClassName());
        var wrapper = dom.parentNode.nextSibling;
        helper.addPartClasses(region, 'text-over', wrapper);
    }
    function hideSubCity(region, dom, itemId) {
        lib.addClass(dom, getHiddenClassName());
        var wrapper = dom.parentNode.nextSibling;
        helper.removePartClasses(region, 'text-over', wrapper);
    }
    function initSingleData(region, properties) {
        var result = [];
        walker({ children: properties.regionData });
        function walker(data) {
            var children = data.children;
            var hasChild = !!children;
            if (data.id) {
                result.push({
                    text: data.text,
                    value: data.id,
                    disabled: hasChild
                });
            }
            if (hasChild) {
                var len = children.length;
                for (var i = 0, len = children.length; i < len; i++) {
                    walker(children[i]);
                }
            }
        }
        properties.singleRegionData = result;
    }
    function createSingleRegion(region) {
        var tpl = '' + '<div data-ui="type:Select;childName:regionSel;' + 'id:regionSel;width:100;"></div>' + '<input type="hidden" id="${inputId}" name="${name}" />';
        region.main.innerHTML = lib.format(tpl, {
            inputId: helper.getId(region, 'param-value'),
            name: region.name
        });
        region.initChildren(region.main);
        var regionSel = region.getChild('regionSel');
        regionSel.setProperties({ datasource: region.singleRegionData });
        regionSel.on('change', lib.bind(changeSingleRegion, null, region, regionSel));
    }
    function changeSingleRegion(region, regionSel) {
        var regionId = parseInt(regionSel.getValue(), 10);
        region.rawValue = regionId;
        updateParamValue(region);
    }
    function changeToDisabled(region, disabled) {
        if (region.mode === 'multi') {
            var elements = region.main.getElementsByTagName('input');
            for (var i = 0, length = elements.length; i < length; i++) {
                var item = elements[i];
                item.disabled = disabled;
            }
        } else {
            var regionSel = region.getChild('regionSel');
            regionSel.setProperties({ disabled: disabled });
        }
    }
    function updateParamValue(region) {
        var input = lib.g(helper.getId(region, 'param-value'));
        var value = region.rawValue;
        if (lib.isArray(value)) {
            input.value = value.join(',');
        } else {
            input.value = value;
        }
    }
    function getPureSelected(region, node) {
        var dataIndex = region.regionDataIndex;
        var ids = [];
        if (dataIndex[node.id] && dataIndex[node.id].isSelected) {
            ids.push(node.id);
        } else {
            u.each(node.children, function (child) {
                var indexChild = dataIndex[child.id];
                ids.push.apply(ids, getPureSelected(region, indexChild));
            });
        }
        return ids;
    }
    Region.prototype = {
        type: 'Region',
        initOptions: function (options) {
            var properties = {
                regionData: lib.clone(Region.REGION_LIST),
                mode: 'multi',
                pureSelect: false,
                rawValue: []
            };
            helper.extractValueFromInput(this, options);
            lib.extend(properties, options);
            if (options.value) {
                properties.rawValue = properties.value.split(',');
            }
            if (options.pureSelect === 'false') {
                properties.pureSelect = false;
            }
            if (properties.mode === 'multi') {
                initMultiData(this, properties);
                this.cityCache = {};
            } else {
                properties.rawValue = '';
                initSingleData(this, properties);
            }
            this.setProperties(properties);
        },
        initStructure: function () {
            if (lib.isInput(this.main)) {
                helper.replaceMain(this);
            }
            if (this.mode === 'multi') {
                createMultiRegion(this);
            } else {
                createSingleRegion(this);
                lib.addClass(this.main, helper.getPartClasses(this, 'single').join(' '));
            }
        },
        initEvents: function () {
            if (this.mode === 'multi') {
                this.helper.addDOMEvent(this.main, 'click', mainClick);
                this.helper.addDOMEvent(this.main, 'mouseover', lib.curry(mainMouseHandler, 'show'));
                this.helper.addDOMEvent(this.main, 'mouseout', lib.curry(mainMouseHandler, 'hide'));
            } else {
                var regionSel = this.getChild('regionSel');
                regionSel.on('change', lib.bind(changeSingleRegion, null, this, regionSel));
            }
        },
        repaint: helper.createRepaint(InputControl.prototype.repaint, {
            name: 'rawValue',
            paint: function (region, value) {
                if (region.mode === 'multi') {
                    selectMulti(region, value);
                } else {
                    var regionSel = region.getChild('regionSel');
                    regionSel.setProperties({ value: value });
                }
            }
        }, {
            name: [
                'disabled',
                'readOnly'
            ],
            paint: function (region, disabled, readOnly) {
                var editable = true;
                if (disabled || readOnly) {
                    editable = false;
                }
                changeToDisabled(region, !editable);
                if (!disabled && readOnly) {
                    var input = lib.g(helper.getId(region, 'param-value'));
                    input.disabled = false;
                }
            }
        }),
        setRawValue: function (value) {
            this.setProperties({ 'rawValue': value });
        },
        getRawValue: function () {
            if (this.mode === 'single') {
                return this.getChild('regionSel').getValue();
            }
            if (this.pureSelect) {
                var node = {
                    id: '-100',
                    children: this.regionData
                };
                var ids = getPureSelected(this, node);
                return ids;
            }
            return this.rawValue;
        },
        stringifyValue: function (rawValue) {
            if (this.mode === 'multi') {
                return rawValue.join(',');
            } else {
                return rawValue;
            }
        },
        parseValue: function (value) {
            return value.split(',');
        },
        checkRegion: function (id) {
            var checkbox = getOptionDOM(this, id);
            if (checkbox) {
                checkbox.checked = true;
                optionClick(this, checkbox);
            } else {
                var item = this.regionDataIndex[id];
                if (item) {
                    item.isSelected = true;
                    updateMulti(this);
                    updateParamValue(this);
                }
            }
        }
    };
    Region.REGION_LIST = [
        {
            'id': '90',
            'text': '\u4E2D\u56FD',
            'children': [
                {
                    'id': '80',
                    'text': '\u534E\u5317\u5730\u533A',
                    'children': [
                        {
                            'id': '1',
                            'text': '\u5317\u4EAC',
                            'children': [
                                {
                                    'id': '742',
                                    'text': '\u660C\u5E73\u533A'
                                },
                                {
                                    'id': '743',
                                    'text': '\u671D\u9633\u533A'
                                },
                                {
                                    'id': '744',
                                    'text': '\u5D07\u6587\u533A'
                                },
                                {
                                    'id': '745',
                                    'text': '\u5927\u5174\u533A'
                                },
                                {
                                    'id': '746',
                                    'text': '\u4E1C\u57CE\u533A'
                                },
                                {
                                    'id': '747',
                                    'text': '\u623F\u5C71\u533A'
                                },
                                {
                                    'id': '748',
                                    'text': '\u4E30\u53F0\u533A'
                                },
                                {
                                    'id': '749',
                                    'text': '\u6D77\u6DC0\u533A'
                                },
                                {
                                    'id': '750',
                                    'text': '\u6000\u67D4\u533A'
                                },
                                {
                                    'id': '751',
                                    'text': '\u95E8\u5934\u6C9F\u533A'
                                },
                                {
                                    'id': '752',
                                    'text': '\u5BC6\u4E91\u53BF'
                                },
                                {
                                    'id': '753',
                                    'text': '\u5E73\u8C37\u533A'
                                },
                                {
                                    'id': '754',
                                    'text': '\u77F3\u666F\u5C71\u533A'
                                },
                                {
                                    'id': '755',
                                    'text': '\u987A\u4E49\u533A'
                                },
                                {
                                    'id': '756',
                                    'text': '\u901A\u5DDE\u533A'
                                },
                                {
                                    'id': '757',
                                    'text': '\u897F\u57CE\u533A'
                                },
                                {
                                    'id': '758',
                                    'text': '\u5BA3\u6B66\u533A'
                                },
                                {
                                    'id': '759',
                                    'text': '\u5EF6\u5E86\u53BF'
                                }
                            ]
                        },
                        {
                            'id': '3',
                            'text': '\u5929\u6D25',
                            'children': [
                                {
                                    'id': '760',
                                    'text': '\u5B9D\u577B\u533A'
                                },
                                {
                                    'id': '761',
                                    'text': '\u5317\u8FB0\u533A'
                                },
                                {
                                    'id': '763',
                                    'text': '\u4E1C\u4E3D\u533A'
                                },
                                {
                                    'id': '765',
                                    'text': '\u6CB3\u5317\u533A'
                                },
                                {
                                    'id': '766',
                                    'text': '\u6CB3\u4E1C\u533A'
                                },
                                {
                                    'id': '767',
                                    'text': '\u548C\u5E73\u533A'
                                },
                                {
                                    'id': '768',
                                    'text': '\u6CB3\u897F\u533A'
                                },
                                {
                                    'id': '769',
                                    'text': '\u7EA2\u6865\u533A'
                                },
                                {
                                    'id': '770',
                                    'text': '\u84DF\u53BF'
                                },
                                {
                                    'id': '771',
                                    'text': '\u6D25\u5357\u533A'
                                },
                                {
                                    'id': '772',
                                    'text': '\u9759\u6D77\u53BF'
                                },
                                {
                                    'id': '773',
                                    'text': '\u5357\u5F00\u533A'
                                },
                                {
                                    'id': '774',
                                    'text': '\u5B81\u6CB3\u53BF'
                                },
                                {
                                    'id': '776',
                                    'text': '\u6B66\u6E05\u533A'
                                },
                                {
                                    'id': '777',
                                    'text': '\u897F\u9752\u533A'
                                },
                                {
                                    'id': '900',
                                    'text': '\u6EE8\u6D77\u65B0\u533A'
                                }
                            ]
                        },
                        {
                            'id': '15',
                            'text': '\u6CB3\u5317',
                            'children': [
                                {
                                    'id': '226',
                                    'text': '\u4FDD\u5B9A\u5E02'
                                },
                                {
                                    'id': '228',
                                    'text': '\u6CA7\u5DDE\u5E02'
                                },
                                {
                                    'id': '229',
                                    'text': '\u627F\u5FB7\u5E02'
                                },
                                {
                                    'id': '230',
                                    'text': '\u90AF\u90F8\u5E02'
                                },
                                {
                                    'id': '231',
                                    'text': '\u8861\u6C34\u5E02'
                                },
                                {
                                    'id': '234',
                                    'text': '\u5ECA\u574A\u5E02'
                                },
                                {
                                    'id': '236',
                                    'text': '\u79E6\u7687\u5C9B\u5E02'
                                },
                                {
                                    'id': '239',
                                    'text': '\u77F3\u5BB6\u5E84\u5E02'
                                },
                                {
                                    'id': '240',
                                    'text': '\u5510\u5C71\u5E02'
                                },
                                {
                                    'id': '241',
                                    'text': '\u90A2\u53F0\u5E02'
                                },
                                {
                                    'id': '242',
                                    'text': '\u5F20\u5BB6\u53E3\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '24',
                            'text': '\u5185\u8499\u53E4',
                            'children': [
                                {
                                    'id': '428',
                                    'text': '\u963F\u62C9\u5584\u76DF'
                                },
                                {
                                    'id': '429',
                                    'text': '\u5DF4\u5F66\u6DD6\u5C14\u5E02'
                                },
                                {
                                    'id': '430',
                                    'text': '\u5305\u5934\u5E02'
                                },
                                {
                                    'id': '431',
                                    'text': '\u8D64\u5CF0\u5E02'
                                },
                                {
                                    'id': '432',
                                    'text': '\u9102\u5C14\u591A\u65AF\u5E02'
                                },
                                {
                                    'id': '434',
                                    'text': '\u547C\u548C\u6D69\u7279\u5E02'
                                },
                                {
                                    'id': '435',
                                    'text': '\u547C\u4F26\u8D1D\u5C14\u5E02'
                                },
                                {
                                    'id': '437',
                                    'text': '\u901A\u8FBD\u5E02'
                                },
                                {
                                    'id': '438',
                                    'text': '\u4E4C\u6D77\u5E02'
                                },
                                {
                                    'id': '439',
                                    'text': '\u4E4C\u5170\u5BDF\u5E03\u5E02'
                                },
                                {
                                    'id': '442',
                                    'text': '\u9521\u6797\u90ED\u52D2\u76DF'
                                },
                                {
                                    'id': '444',
                                    'text': '\u5174\u5B89\u76DF'
                                }
                            ]
                        },
                        {
                            'id': '28',
                            'text': '\u5C71\u897F',
                            'children': [
                                {
                                    'id': '486',
                                    'text': '\u5927\u540C\u5E02'
                                },
                                {
                                    'id': '491',
                                    'text': '\u664B\u57CE\u5E02'
                                },
                                {
                                    'id': '492',
                                    'text': '\u664B\u4E2D\u5E02'
                                },
                                {
                                    'id': '493',
                                    'text': '\u4E34\u6C7E\u5E02'
                                },
                                {
                                    'id': '494',
                                    'text': '\u5415\u6881\u5E02'
                                },
                                {
                                    'id': '495',
                                    'text': '\u6714\u5DDE\u5E02'
                                },
                                {
                                    'id': '496',
                                    'text': '\u592A\u539F\u5E02'
                                },
                                {
                                    'id': '497',
                                    'text': '\u5FFB\u5DDE\u5E02'
                                },
                                {
                                    'id': '498',
                                    'text': '\u9633\u6CC9\u5E02'
                                },
                                {
                                    'id': '501',
                                    'text': '\u8FD0\u57CE\u5E02'
                                },
                                {
                                    'id': '502',
                                    'text': '\u957F\u6CBB\u5E02'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '81',
                    'text': '\u4E1C\u5317\u5730\u533A',
                    'children': [
                        {
                            'id': '17',
                            'text': '\u9ED1\u9F99\u6C5F',
                            'children': [
                                {
                                    'id': '272',
                                    'text': '\u5927\u5E86\u5E02'
                                },
                                {
                                    'id': '273',
                                    'text': '\u5927\u5174\u5B89\u5CAD\u5730\u533A'
                                },
                                {
                                    'id': '276',
                                    'text': '\u54C8\u5C14\u6EE8\u5E02'
                                },
                                {
                                    'id': '278',
                                    'text': '\u9E64\u5C97\u5E02'
                                },
                                {
                                    'id': '279',
                                    'text': '\u9ED1\u6CB3\u5E02'
                                },
                                {
                                    'id': '282',
                                    'text': '\u9E21\u897F\u5E02'
                                },
                                {
                                    'id': '284',
                                    'text': '\u4F73\u6728\u65AF\u5E02'
                                },
                                {
                                    'id': '287',
                                    'text': '\u7261\u4E39\u6C5F\u5E02'
                                },
                                {
                                    'id': '289',
                                    'text': '\u4E03\u53F0\u6CB3\u5E02'
                                },
                                {
                                    'id': '290',
                                    'text': '\u9F50\u9F50\u54C8\u5C14\u5E02'
                                },
                                {
                                    'id': '291',
                                    'text': '\u53CC\u9E2D\u5C71\u5E02'
                                },
                                {
                                    'id': '293',
                                    'text': '\u7EE5\u5316\u5E02'
                                },
                                {
                                    'id': '298',
                                    'text': '\u4F0A\u6625\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '20',
                            'text': '\u5409\u6797',
                            'children': [
                                {
                                    'id': '345',
                                    'text': '\u767D\u57CE\u5E02'
                                },
                                {
                                    'id': '346',
                                    'text': '\u767D\u5C71\u5E02'
                                },
                                {
                                    'id': '351',
                                    'text': '\u5409\u6797\u5E02'
                                },
                                {
                                    'id': '352',
                                    'text': '\u8FBD\u6E90\u5E02'
                                },
                                {
                                    'id': '355',
                                    'text': '\u56DB\u5E73\u5E02'
                                },
                                {
                                    'id': '356',
                                    'text': '\u677E\u539F\u5E02'
                                },
                                {
                                    'id': '358',
                                    'text': '\u901A\u5316\u5E02'
                                },
                                {
                                    'id': '359',
                                    'text': '\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '361',
                                    'text': '\u957F\u6625\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '23',
                            'text': '\u8FBD\u5B81',
                            'children': [
                                {
                                    'id': '413',
                                    'text': '\u978D\u5C71\u5E02'
                                },
                                {
                                    'id': '414',
                                    'text': '\u672C\u6EAA\u5E02'
                                },
                                {
                                    'id': '415',
                                    'text': '\u671D\u9633\u5E02'
                                },
                                {
                                    'id': '416',
                                    'text': '\u5927\u8FDE\u5E02'
                                },
                                {
                                    'id': '417',
                                    'text': '\u4E39\u4E1C\u5E02'
                                },
                                {
                                    'id': '418',
                                    'text': '\u629A\u987A\u5E02'
                                },
                                {
                                    'id': '419',
                                    'text': '\u961C\u65B0\u5E02'
                                },
                                {
                                    'id': '421',
                                    'text': '\u846B\u82A6\u5C9B\u5E02'
                                },
                                {
                                    'id': '422',
                                    'text': '\u9526\u5DDE\u5E02'
                                },
                                {
                                    'id': '423',
                                    'text': '\u8FBD\u9633\u5E02'
                                },
                                {
                                    'id': '424',
                                    'text': '\u76D8\u9526\u5E02'
                                },
                                {
                                    'id': '425',
                                    'text': '\u6C88\u9633\u5E02'
                                },
                                {
                                    'id': '426',
                                    'text': '\u94C1\u5CAD\u5E02'
                                },
                                {
                                    'id': '427',
                                    'text': '\u8425\u53E3\u5E02'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '82',
                    'text': '\u534E\u4E1C\u5730\u533A',
                    'children': [
                        {
                            'id': '2',
                            'text': '\u4E0A\u6D77',
                            'children': [
                                {
                                    'id': '818',
                                    'text': '\u5B9D\u5C71\u533A'
                                },
                                {
                                    'id': '819',
                                    'text': '\u5D07\u660E\u53BF'
                                },
                                {
                                    'id': '820',
                                    'text': '\u5949\u8D24\u533A'
                                },
                                {
                                    'id': '821',
                                    'text': '\u8679\u53E3\u533A'
                                },
                                {
                                    'id': '822',
                                    'text': '\u9EC4\u6D66\u533A'
                                },
                                {
                                    'id': '823',
                                    'text': '\u5609\u5B9A\u533A'
                                },
                                {
                                    'id': '824',
                                    'text': '\u91D1\u5C71\u533A'
                                },
                                {
                                    'id': '825',
                                    'text': '\u9759\u5B89\u533A'
                                },
                                {
                                    'id': '826',
                                    'text': '\u5362\u6E7E\u533A'
                                },
                                {
                                    'id': '827',
                                    'text': '\u95F5\u884C\u533A'
                                },
                                {
                                    'id': '830',
                                    'text': '\u6D66\u4E1C\u65B0\u533A'
                                },
                                {
                                    'id': '831',
                                    'text': '\u666E\u9640\u533A'
                                },
                                {
                                    'id': '832',
                                    'text': '\u9752\u6D66\u533A'
                                },
                                {
                                    'id': '833',
                                    'text': '\u677E\u6C5F\u533A'
                                },
                                {
                                    'id': '834',
                                    'text': '\u5F90\u6C47\u533A'
                                },
                                {
                                    'id': '835',
                                    'text': '\u6768\u6D66\u533A'
                                },
                                {
                                    'id': '836',
                                    'text': '\u95F8\u5317\u533A'
                                },
                                {
                                    'id': '837',
                                    'text': '\u957F\u5B81\u533A'
                                }
                            ]
                        },
                        {
                            'id': '8',
                            'text': '\u5B89\u5FBD',
                            'children': [
                                {
                                    'id': '101',
                                    'text': '\u5B89\u5E86\u5E02'
                                },
                                {
                                    'id': '102',
                                    'text': '\u868C\u57E0\u5E02'
                                },
                                {
                                    'id': '103',
                                    'text': '\u4EB3\u5DDE\u5E02'
                                },
                                {
                                    'id': '104',
                                    'text': '\u5DE2\u6E56\u5E02'
                                },
                                {
                                    'id': '105',
                                    'text': '\u6C60\u5DDE\u5E02'
                                },
                                {
                                    'id': '106',
                                    'text': '\u6EC1\u5DDE\u5E02'
                                },
                                {
                                    'id': '107',
                                    'text': '\u961C\u9633\u5E02'
                                },
                                {
                                    'id': '110',
                                    'text': '\u5408\u80A5\u5E02'
                                },
                                {
                                    'id': '111',
                                    'text': '\u6DEE\u5317\u5E02'
                                },
                                {
                                    'id': '112',
                                    'text': '\u6DEE\u5357\u5E02'
                                },
                                {
                                    'id': '113',
                                    'text': '\u9EC4\u5C71\u5E02'
                                },
                                {
                                    'id': '115',
                                    'text': '\u516D\u5B89\u5E02'
                                },
                                {
                                    'id': '116',
                                    'text': '\u9A6C\u978D\u5C71\u5E02'
                                },
                                {
                                    'id': '118',
                                    'text': '\u94DC\u9675\u5E02'
                                },
                                {
                                    'id': '119',
                                    'text': '\u829C\u6E56\u5E02'
                                },
                                {
                                    'id': '120',
                                    'text': '\u5BBF\u5DDE\u5E02'
                                },
                                {
                                    'id': '121',
                                    'text': '\u5BA3\u57CE\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '9',
                            'text': '\u798F\u5EFA',
                            'children': [
                                {
                                    'id': '124',
                                    'text': '\u798F\u5DDE\u5E02'
                                },
                                {
                                    'id': '126',
                                    'text': '\u9F99\u5CA9\u5E02'
                                },
                                {
                                    'id': '127',
                                    'text': '\u5357\u5E73\u5E02'
                                },
                                {
                                    'id': '128',
                                    'text': '\u5B81\u5FB7\u5E02'
                                },
                                {
                                    'id': '129',
                                    'text': '\u8386\u7530\u5E02'
                                },
                                {
                                    'id': '130',
                                    'text': '\u6CC9\u5DDE\u5E02'
                                },
                                {
                                    'id': '131',
                                    'text': '\u4E09\u660E\u5E02'
                                },
                                {
                                    'id': '132',
                                    'text': '\u53A6\u95E8\u5E02'
                                },
                                {
                                    'id': '138',
                                    'text': '\u6F33\u5DDE\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '21',
                            'text': '\u6C5F\u82CF',
                            'children': [
                                {
                                    'id': '363',
                                    'text': '\u5E38\u5DDE\u5E02'
                                },
                                {
                                    'id': '367',
                                    'text': '\u6DEE\u5B89\u5E02'
                                },
                                {
                                    'id': '375',
                                    'text': '\u8FDE\u4E91\u6E2F\u5E02'
                                },
                                {
                                    'id': '376',
                                    'text': '\u5357\u4EAC\u5E02'
                                },
                                {
                                    'id': '377',
                                    'text': '\u5357\u901A\u5E02'
                                },
                                {
                                    'id': '381',
                                    'text': '\u82CF\u5DDE\u5E02'
                                },
                                {
                                    'id': '383',
                                    'text': '\u6CF0\u5DDE\u5E02'
                                },
                                {
                                    'id': '386',
                                    'text': '\u65E0\u9521\u5E02'
                                },
                                {
                                    'id': '391',
                                    'text': '\u5BBF\u8FC1\u5E02'
                                },
                                {
                                    'id': '392',
                                    'text': '\u5F90\u5DDE\u5E02'
                                },
                                {
                                    'id': '393',
                                    'text': '\u76D0\u57CE\u5E02'
                                },
                                {
                                    'id': '395',
                                    'text': '\u626C\u5DDE\u5E02'
                                },
                                {
                                    'id': '399',
                                    'text': '\u9547\u6C5F\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '22',
                            'text': '\u6C5F\u897F',
                            'children': [
                                {
                                    'id': '401',
                                    'text': '\u629A\u5DDE\u5E02'
                                },
                                {
                                    'id': '402',
                                    'text': '\u8D63\u5DDE\u5E02'
                                },
                                {
                                    'id': '403',
                                    'text': '\u5409\u5B89\u5E02'
                                },
                                {
                                    'id': '404',
                                    'text': '\u666F\u5FB7\u9547\u5E02'
                                },
                                {
                                    'id': '406',
                                    'text': '\u4E5D\u6C5F\u5E02'
                                },
                                {
                                    'id': '407',
                                    'text': '\u5357\u660C\u5E02'
                                },
                                {
                                    'id': '408',
                                    'text': '\u840D\u4E61\u5E02'
                                },
                                {
                                    'id': '409',
                                    'text': '\u4E0A\u9976\u5E02'
                                },
                                {
                                    'id': '410',
                                    'text': '\u65B0\u4F59\u5E02'
                                },
                                {
                                    'id': '411',
                                    'text': '\u5B9C\u6625\u5E02'
                                },
                                {
                                    'id': '412',
                                    'text': '\u9E70\u6F6D\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '27',
                            'text': '\u5C71\u4E1C',
                            'children': [
                                {
                                    'id': '461',
                                    'text': '\u6EE8\u5DDE\u5E02'
                                },
                                {
                                    'id': '462',
                                    'text': '\u5FB7\u5DDE\u5E02'
                                },
                                {
                                    'id': '463',
                                    'text': '\u4E1C\u8425\u5E02'
                                },
                                {
                                    'id': '466',
                                    'text': '\u83CF\u6CFD\u5E02'
                                },
                                {
                                    'id': '467',
                                    'text': '\u6D4E\u5357\u5E02'
                                },
                                {
                                    'id': '468',
                                    'text': '\u6D4E\u5B81\u5E02'
                                },
                                {
                                    'id': '470',
                                    'text': '\u83B1\u829C\u5E02'
                                },
                                {
                                    'id': '472',
                                    'text': '\u804A\u57CE\u5E02'
                                },
                                {
                                    'id': '473',
                                    'text': '\u4E34\u6C82\u5E02'
                                },
                                {
                                    'id': '474',
                                    'text': '\u9752\u5C9B\u5E02'
                                },
                                {
                                    'id': '476',
                                    'text': '\u65E5\u7167\u5E02'
                                },
                                {
                                    'id': '477',
                                    'text': '\u6CF0\u5B89\u5E02'
                                },
                                {
                                    'id': '479',
                                    'text': '\u5A01\u6D77\u5E02'
                                },
                                {
                                    'id': '480',
                                    'text': '\u6F4D\u574A\u5E02'
                                },
                                {
                                    'id': '481',
                                    'text': '\u70DF\u53F0\u5E02'
                                },
                                {
                                    'id': '482',
                                    'text': '\u67A3\u5E84\u5E02'
                                },
                                {
                                    'id': '485',
                                    'text': '\u6DC4\u535A\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '34',
                            'text': '\u6D59\u6C5F',
                            'children': [
                                {
                                    'id': '604',
                                    'text': '\u676D\u5DDE\u5E02'
                                },
                                {
                                    'id': '605',
                                    'text': '\u6E56\u5DDE\u5E02'
                                },
                                {
                                    'id': '606',
                                    'text': '\u5609\u5174\u5E02'
                                },
                                {
                                    'id': '608',
                                    'text': '\u91D1\u534E\u5E02'
                                },
                                {
                                    'id': '611',
                                    'text': '\u4E3D\u6C34\u5E02'
                                },
                                {
                                    'id': '615',
                                    'text': '\u5B81\u6CE2\u5E02'
                                },
                                {
                                    'id': '617',
                                    'text': '\u8862\u5DDE\u5E02'
                                },
                                {
                                    'id': '619',
                                    'text': '\u7ECD\u5174\u5E02'
                                },
                                {
                                    'id': '621',
                                    'text': '\u53F0\u5DDE\u5E02'
                                },
                                {
                                    'id': '624',
                                    'text': '\u6E29\u5DDE\u5E02'
                                },
                                {
                                    'id': '630',
                                    'text': '\u821F\u5C71\u5E02'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '83',
                    'text': '\u534E\u4E2D\u5730\u533A',
                    'children': [
                        {
                            'id': '16',
                            'text': '\u6CB3\u5357',
                            'children': [
                                {
                                    'id': '243',
                                    'text': '\u5B89\u9633\u5E02'
                                },
                                {
                                    'id': '246',
                                    'text': '\u9E64\u58C1\u5E02'
                                },
                                {
                                    'id': '249',
                                    'text': '\u7126\u4F5C\u5E02'
                                },
                                {
                                    'id': '250',
                                    'text': '\u5F00\u5C01\u5E02'
                                },
                                {
                                    'id': '252',
                                    'text': '\u6F2F\u6CB3\u5E02'
                                },
                                {
                                    'id': '253',
                                    'text': '\u6D1B\u9633\u5E02'
                                },
                                {
                                    'id': '254',
                                    'text': '\u5357\u9633\u5E02'
                                },
                                {
                                    'id': '255',
                                    'text': '\u5E73\u9876\u5C71\u5E02'
                                },
                                {
                                    'id': '256',
                                    'text': '\u6FEE\u9633\u5E02'
                                },
                                {
                                    'id': '257',
                                    'text': '\u4E09\u95E8\u5CE1\u5E02'
                                },
                                {
                                    'id': '258',
                                    'text': '\u5546\u4E18\u5E02'
                                },
                                {
                                    'id': '261',
                                    'text': '\u65B0\u4E61\u5E02'
                                },
                                {
                                    'id': '262',
                                    'text': '\u4FE1\u9633\u5E02'
                                },
                                {
                                    'id': '263',
                                    'text': '\u8BB8\u660C\u5E02'
                                },
                                {
                                    'id': '266',
                                    'text': '\u90D1\u5DDE\u5E02'
                                },
                                {
                                    'id': '267',
                                    'text': '\u5468\u53E3\u5E02'
                                },
                                {
                                    'id': '268',
                                    'text': '\u9A7B\u9A6C\u5E97\u5E02'
                                },
                                {
                                    'id': '901',
                                    'text': '\u6D4E\u6E90\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '18',
                            'text': '\u6E56\u5317',
                            'children': [
                                {
                                    'id': '304',
                                    'text': '\u9102\u5DDE\u5E02'
                                },
                                {
                                    'id': '305',
                                    'text': '\u6069\u65BD\u5E02'
                                },
                                {
                                    'id': '307',
                                    'text': '\u9EC4\u5188\u5E02'
                                },
                                {
                                    'id': '308',
                                    'text': '\u9EC4\u77F3\u5E02'
                                },
                                {
                                    'id': '309',
                                    'text': '\u8346\u95E8\u5E02'
                                },
                                {
                                    'id': '310',
                                    'text': '\u8346\u5DDE\u5E02'
                                },
                                {
                                    'id': '311',
                                    'text': '\u6F5C\u6C5F\u5E02'
                                },
                                {
                                    'id': '312',
                                    'text': '\u795E\u519C\u67B6\u6797\u533A'
                                },
                                {
                                    'id': '313',
                                    'text': '\u5341\u5830\u5E02'
                                },
                                {
                                    'id': '314',
                                    'text': '\u968F\u5DDE\u5E02'
                                },
                                {
                                    'id': '315',
                                    'text': '\u5929\u95E8\u5E02'
                                },
                                {
                                    'id': '317',
                                    'text': '\u6B66\u6C49'
                                },
                                {
                                    'id': '319',
                                    'text': '\u4ED9\u6843\u5E02'
                                },
                                {
                                    'id': '320',
                                    'text': '\u54B8\u5B81\u5E02'
                                },
                                {
                                    'id': '321',
                                    'text': '\u8944\u6A0A\u5E02'
                                },
                                {
                                    'id': '323',
                                    'text': '\u5B5D\u611F\u5E02'
                                },
                                {
                                    'id': '324',
                                    'text': '\u5B9C\u660C\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '19',
                            'text': '\u6E56\u5357',
                            'children': [
                                {
                                    'id': '328',
                                    'text': '\u5E38\u5FB7\u5E02'
                                },
                                {
                                    'id': '329',
                                    'text': '\u90F4\u5DDE\u5E02'
                                },
                                {
                                    'id': '330',
                                    'text': '\u8861\u9633\u5E02'
                                },
                                {
                                    'id': '331',
                                    'text': '\u6000\u5316\u5E02'
                                },
                                {
                                    'id': '334',
                                    'text': '\u5A04\u5E95\u5E02'
                                },
                                {
                                    'id': '335',
                                    'text': '\u90B5\u9633\u5E02'
                                },
                                {
                                    'id': '337',
                                    'text': '\u6E58\u6F6D\u5E02'
                                },
                                {
                                    'id': '338',
                                    'text': '\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '339',
                                    'text': '\u76CA\u9633\u5E02'
                                },
                                {
                                    'id': '340',
                                    'text': '\u6C38\u5DDE\u5E02'
                                },
                                {
                                    'id': '341',
                                    'text': '\u5CB3\u9633\u5E02'
                                },
                                {
                                    'id': '342',
                                    'text': '\u5F20\u5BB6\u754C\u5E02'
                                },
                                {
                                    'id': '343',
                                    'text': '\u957F\u6C99\u5E02'
                                },
                                {
                                    'id': '344',
                                    'text': '\u682A\u6D32\u5E02'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '84',
                    'text': '\u534E\u5357\u5730\u533A',
                    'children': [
                        {
                            'id': '11',
                            'text': '\u5E7F\u4E1C',
                            'children': [
                                {
                                    'id': '157',
                                    'text': '\u6F6E\u5DDE\u5E02'
                                },
                                {
                                    'id': '158',
                                    'text': '\u4E1C\u839E\u5E02'
                                },
                                {
                                    'id': '160',
                                    'text': '\u4F5B\u5C71\u5E02'
                                },
                                {
                                    'id': '162',
                                    'text': '\u5E7F\u5DDE\u5E02'
                                },
                                {
                                    'id': '163',
                                    'text': '\u6CB3\u6E90\u5E02'
                                },
                                {
                                    'id': '164',
                                    'text': '\u60E0\u5DDE\u5E02'
                                },
                                {
                                    'id': '166',
                                    'text': '\u6C5F\u95E8\u5E02'
                                },
                                {
                                    'id': '167',
                                    'text': '\u63ED\u9633\u5E02'
                                },
                                {
                                    'id': '169',
                                    'text': '\u8302\u540D\u5E02'
                                },
                                {
                                    'id': '170',
                                    'text': '\u6885\u5DDE\u5E02'
                                },
                                {
                                    'id': '172',
                                    'text': '\u6E05\u8FDC\u5E02'
                                },
                                {
                                    'id': '173',
                                    'text': '\u6C55\u5934\u5E02'
                                },
                                {
                                    'id': '174',
                                    'text': '\u6C55\u5C3E\u5E02'
                                },
                                {
                                    'id': '175',
                                    'text': '\u97F6\u5173\u5E02'
                                },
                                {
                                    'id': '176',
                                    'text': '\u6DF1\u5733\u5E02'
                                },
                                {
                                    'id': '180',
                                    'text': '\u9633\u6C5F\u5E02'
                                },
                                {
                                    'id': '182',
                                    'text': '\u4E91\u6D6E\u5E02'
                                },
                                {
                                    'id': '184',
                                    'text': '\u6E5B\u6C5F\u5E02'
                                },
                                {
                                    'id': '185',
                                    'text': '\u8087\u5E86\u5E02'
                                },
                                {
                                    'id': '186',
                                    'text': '\u4E2D\u5C71\u5E02'
                                },
                                {
                                    'id': '187',
                                    'text': '\u73E0\u6D77\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '12',
                            'text': '\u5E7F\u897F',
                            'children': [
                                {
                                    'id': '188',
                                    'text': '\u767E\u8272\u5E02'
                                },
                                {
                                    'id': '189',
                                    'text': '\u5317\u6D77\u5E02'
                                },
                                {
                                    'id': '191',
                                    'text': '\u9632\u57CE\u6E2F\u5E02'
                                },
                                {
                                    'id': '193',
                                    'text': '\u8D35\u6E2F\u5E02'
                                },
                                {
                                    'id': '194',
                                    'text': '\u6842\u6797\u5E02'
                                },
                                {
                                    'id': '195',
                                    'text': '\u6CB3\u6C60\u5E02'
                                },
                                {
                                    'id': '196',
                                    'text': '\u8D3A\u5DDE\u5E02'
                                },
                                {
                                    'id': '197',
                                    'text': '\u6765\u5BBE\u5E02'
                                },
                                {
                                    'id': '198',
                                    'text': '\u67F3\u5DDE\u5E02'
                                },
                                {
                                    'id': '199',
                                    'text': '\u5357\u5B81\u5E02'
                                },
                                {
                                    'id': '200',
                                    'text': '\u94A6\u5DDE\u5E02'
                                },
                                {
                                    'id': '201',
                                    'text': '\u68A7\u5DDE\u5E02'
                                },
                                {
                                    'id': '203',
                                    'text': '\u7389\u6797\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '14',
                            'text': '\u6D77\u5357',
                            'children': [
                                {
                                    'id': '218',
                                    'text': '\u510B\u5DDE\u5E02'
                                },
                                {
                                    'id': '219',
                                    'text': '\u4E1C\u65B9\u5E02'
                                },
                                {
                                    'id': '220',
                                    'text': '\u6D77\u53E3\u5E02'
                                },
                                {
                                    'id': '221',
                                    'text': '\u743C\u6D77\u5E02'
                                },
                                {
                                    'id': '223',
                                    'text': '\u4E09\u4E9A\u5E02'
                                },
                                {
                                    'id': '225',
                                    'text': '\u6587\u660C\u5E02'
                                },
                                {
                                    'id': '867',
                                    'text': '\u4E94\u6307\u5C71'
                                },
                                {
                                    'id': '868',
                                    'text': '\u4E07\u5B81'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '85',
                    'text': '\u897F\u5357\u5730\u533A',
                    'children': [
                        {
                            'id': '4',
                            'text': '\u91CD\u5E86',
                            'children': [
                                {
                                    'id': '778',
                                    'text': '\u5DF4\u5357\u533A'
                                },
                                {
                                    'id': '779',
                                    'text': '\u5317\u789A\u533A'
                                },
                                {
                                    'id': '780',
                                    'text': '\u74A7\u5C71\u53BF'
                                },
                                {
                                    'id': '781',
                                    'text': '\u57CE\u53E3\u53BF'
                                },
                                {
                                    'id': '782',
                                    'text': '\u5927\u6E21\u53E3\u533A'
                                },
                                {
                                    'id': '783',
                                    'text': '\u5927\u8DB3\u53BF'
                                },
                                {
                                    'id': '784',
                                    'text': '\u57AB\u6C5F\u53BF'
                                },
                                {
                                    'id': '785',
                                    'text': '\u4E30\u90FD\u53BF'
                                },
                                {
                                    'id': '786',
                                    'text': '\u5949\u8282\u53BF'
                                },
                                {
                                    'id': '787',
                                    'text': '\u6DAA\u9675\u533A'
                                },
                                {
                                    'id': '788',
                                    'text': '\u5408\u5DDD\u533A'
                                },
                                {
                                    'id': '789',
                                    'text': '\u6C5F\u5317\u533A'
                                },
                                {
                                    'id': '790',
                                    'text': '\u6C5F\u6D25\u533A'
                                },
                                {
                                    'id': '791',
                                    'text': '\u4E5D\u9F99\u5761\u533A'
                                },
                                {
                                    'id': '792',
                                    'text': '\u5F00\u53BF'
                                },
                                {
                                    'id': '793',
                                    'text': '\u6881\u5E73\u53BF'
                                },
                                {
                                    'id': '794',
                                    'text': '\u5357\u5CB8\u533A'
                                },
                                {
                                    'id': '795',
                                    'text': '\u5357\u5DDD\u533A'
                                },
                                {
                                    'id': '796',
                                    'text': '\u5F6D\u6C34\u53BF'
                                },
                                {
                                    'id': '797',
                                    'text': '\u7DA6\u6C5F\u53BF'
                                },
                                {
                                    'id': '798',
                                    'text': '\u9ED4\u6C5F\u533A'
                                },
                                {
                                    'id': '799',
                                    'text': '\u8363\u660C\u53BF'
                                },
                                {
                                    'id': '800',
                                    'text': '\u6C99\u576A\u575D\u533A'
                                },
                                {
                                    'id': '801',
                                    'text': '\u77F3\u67F1\u53BF'
                                },
                                {
                                    'id': '802',
                                    'text': '\u53CC\u6865\u533A'
                                },
                                {
                                    'id': '803',
                                    'text': '\u94DC\u6881\u53BF'
                                },
                                {
                                    'id': '804',
                                    'text': '\u6F7C\u5357\u53BF'
                                },
                                {
                                    'id': '805',
                                    'text': '\u4E07\u76DB\u533A'
                                },
                                {
                                    'id': '806',
                                    'text': '\u4E07\u5DDE\u533A'
                                },
                                {
                                    'id': '807',
                                    'text': '\u5DEB\u5C71\u53BF'
                                },
                                {
                                    'id': '808',
                                    'text': '\u5DEB\u6EAA\u53BF'
                                },
                                {
                                    'id': '809',
                                    'text': '\u6B66\u9686\u53BF'
                                },
                                {
                                    'id': '810',
                                    'text': '\u79C0\u5C71\u53BF'
                                },
                                {
                                    'id': '811',
                                    'text': '\u6C38\u5DDD\u533A'
                                },
                                {
                                    'id': '812',
                                    'text': '\u9149\u9633\u53BF'
                                },
                                {
                                    'id': '813',
                                    'text': '\u6E1D\u5317\u533A'
                                },
                                {
                                    'id': '814',
                                    'text': '\u6E1D\u4E2D\u533A'
                                },
                                {
                                    'id': '815',
                                    'text': '\u4E91\u9633\u53BF'
                                },
                                {
                                    'id': '816',
                                    'text': '\u957F\u5BFF\u533A'
                                },
                                {
                                    'id': '817',
                                    'text': '\u5FE0\u53BF'
                                }
                            ]
                        },
                        {
                            'id': '13',
                            'text': '\u8D35\u5DDE',
                            'children': [
                                {
                                    'id': '204',
                                    'text': '\u5B89\u987A\u5E02'
                                },
                                {
                                    'id': '205',
                                    'text': '\u6BD5\u8282\u5E02'
                                },
                                {
                                    'id': '208',
                                    'text': '\u8D35\u9633\u5E02'
                                },
                                {
                                    'id': '210',
                                    'text': '\u516D\u76D8\u6C34\u5E02'
                                },
                                {
                                    'id': '211',
                                    'text': '\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '212',
                                    'text': '\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '213',
                                    'text': '\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '215',
                                    'text': '\u94DC\u4EC1\u5E02'
                                },
                                {
                                    'id': '217',
                                    'text': '\u9075\u4E49\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '30',
                            'text': '\u56DB\u5DDD',
                            'children': [
                                {
                                    'id': '516',
                                    'text': '\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '517',
                                    'text': '\u5DF4\u4E2D\u5E02'
                                },
                                {
                                    'id': '518',
                                    'text': '\u6210\u90FD\u5E02'
                                },
                                {
                                    'id': '519',
                                    'text': '\u8FBE\u5DDE\u5E02'
                                },
                                {
                                    'id': '520',
                                    'text': '\u5FB7\u9633\u5E02'
                                },
                                {
                                    'id': '523',
                                    'text': '\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '524',
                                    'text': '\u5E7F\u5B89\u5E02'
                                },
                                {
                                    'id': '526',
                                    'text': '\u5E7F\u5143\u5E02'
                                },
                                {
                                    'id': '528',
                                    'text': '\u4E50\u5C71\u5E02'
                                },
                                {
                                    'id': '529',
                                    'text': '\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '530',
                                    'text': '\u6CF8\u5DDE\u5E02'
                                },
                                {
                                    'id': '531',
                                    'text': '\u7709\u5C71\u5E02'
                                },
                                {
                                    'id': '532',
                                    'text': '\u7EF5\u9633\u5E02'
                                },
                                {
                                    'id': '534',
                                    'text': '\u5357\u5145\u5E02'
                                },
                                {
                                    'id': '535',
                                    'text': '\u5185\u6C5F\u5E02'
                                },
                                {
                                    'id': '536',
                                    'text': '\u6500\u679D\u82B1\u5E02'
                                },
                                {
                                    'id': '538',
                                    'text': '\u9042\u5B81\u5E02'
                                },
                                {
                                    'id': '540',
                                    'text': '\u96C5\u5B89\u5E02'
                                },
                                {
                                    'id': '541',
                                    'text': '\u5B9C\u5BBE\u5E02'
                                },
                                {
                                    'id': '542',
                                    'text': '\u8D44\u9633\u5E02'
                                },
                                {
                                    'id': '543',
                                    'text': '\u81EA\u8D21\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '31',
                            'text': '\u897F\u85CF',
                            'children': [
                                {
                                    'id': '546',
                                    'text': '\u62C9\u8428\u5E02'
                                },
                                {
                                    'id': '547',
                                    'text': '\u6797\u829D\u5730\u533A'
                                },
                                {
                                    'id': '548',
                                    'text': '\u90A3\u66F2\u5730\u533A'
                                },
                                {
                                    'id': '549',
                                    'text': '\u65E5\u5580\u5219\u5730\u533A'
                                }
                            ]
                        },
                        {
                            'id': '33',
                            'text': '\u4E91\u5357',
                            'children': [
                                {
                                    'id': '578',
                                    'text': '\u4FDD\u5C71\u5E02'
                                },
                                {
                                    'id': '579',
                                    'text': '\u695A\u96C4\u5E02'
                                },
                                {
                                    'id': '580',
                                    'text': '\u5927\u7406\u5E02'
                                },
                                {
                                    'id': '581',
                                    'text': '\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '585',
                                    'text': '\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '587',
                                    'text': '\u6606\u660E\u5E02'
                                },
                                {
                                    'id': '589',
                                    'text': '\u4E3D\u6C5F\u5E02'
                                },
                                {
                                    'id': '590',
                                    'text': '\u4E34\u6CA7\u5E02'
                                },
                                {
                                    'id': '593',
                                    'text': '\u666E\u6D31\u5E02'
                                },
                                {
                                    'id': '594',
                                    'text': '\u66F2\u9756\u5E02'
                                },
                                {
                                    'id': '595',
                                    'text': '\u6587\u5C71\u5E02'
                                },
                                {
                                    'id': '597',
                                    'text': '\u7389\u6EAA\u5E02'
                                },
                                {
                                    'id': '598',
                                    'text': '\u662D\u901A\u5E02'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '86',
                    'text': '\u897F\u5317\u5730\u533A',
                    'children': [
                        {
                            'id': '10',
                            'text': '\u7518\u8083',
                            'children': [
                                {
                                    'id': '139',
                                    'text': '\u767D\u94F6\u5E02'
                                },
                                {
                                    'id': '140',
                                    'text': '\u5B9A\u897F\u5E02'
                                },
                                {
                                    'id': '144',
                                    'text': '\u5609\u5CEA\u5173\u5E02'
                                },
                                {
                                    'id': '145',
                                    'text': '\u91D1\u660C\u5E02'
                                },
                                {
                                    'id': '146',
                                    'text': '\u9152\u6CC9\u5E02'
                                },
                                {
                                    'id': '147',
                                    'text': '\u5170\u5DDE\u5E02'
                                },
                                {
                                    'id': '148',
                                    'text': '\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '150',
                                    'text': '\u9647\u5357\u5E02'
                                },
                                {
                                    'id': '151',
                                    'text': '\u5E73\u51C9\u5E02'
                                },
                                {
                                    'id': '152',
                                    'text': '\u5E86\u9633\u5E02'
                                },
                                {
                                    'id': '153',
                                    'text': '\u5929\u6C34\u5E02'
                                },
                                {
                                    'id': '154',
                                    'text': '\u6B66\u5A01\u5E02'
                                },
                                {
                                    'id': '156',
                                    'text': '\u5F20\u6396\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '25',
                            'text': '\u5B81\u590F',
                            'children': [
                                {
                                    'id': '446',
                                    'text': '\u56FA\u539F\u5E02'
                                },
                                {
                                    'id': '447',
                                    'text': '\u77F3\u5634\u5C71\u5E02'
                                },
                                {
                                    'id': '448',
                                    'text': '\u5434\u5FE0\u5E02'
                                },
                                {
                                    'id': '449',
                                    'text': '\u94F6\u5DDD\u5E02'
                                },
                                {
                                    'id': '450',
                                    'text': '\u4E2D\u536B\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '26',
                            'text': '\u9752\u6D77',
                            'children': [
                                {
                                    'id': '454',
                                    'text': '\u6D77\u4E1C\u5730\u533A'
                                },
                                {
                                    'id': '456',
                                    'text': '\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '458',
                                    'text': '\u897F\u5B81\u5E02'
                                },
                                {
                                    'id': '459',
                                    'text': '\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE'
                                }
                            ]
                        },
                        {
                            'id': '29',
                            'text': '\u9655\u897F',
                            'children': [
                                {
                                    'id': '503',
                                    'text': '\u5B89\u5EB7\u5E02'
                                },
                                {
                                    'id': '504',
                                    'text': '\u5B9D\u9E21\u5E02'
                                },
                                {
                                    'id': '506',
                                    'text': '\u6C49\u4E2D\u5E02'
                                },
                                {
                                    'id': '508',
                                    'text': '\u5546\u6D1B\u5E02'
                                },
                                {
                                    'id': '509',
                                    'text': '\u94DC\u5DDD\u5E02'
                                },
                                {
                                    'id': '510',
                                    'text': '\u6E2D\u5357\u5E02'
                                },
                                {
                                    'id': '511',
                                    'text': '\u897F\u5B89\u5E02'
                                },
                                {
                                    'id': '512',
                                    'text': '\u54B8\u9633\u5E02'
                                },
                                {
                                    'id': '513',
                                    'text': '\u5EF6\u5B89\u5E02'
                                },
                                {
                                    'id': '515',
                                    'text': '\u6986\u6797\u5E02'
                                }
                            ]
                        },
                        {
                            'id': '32',
                            'text': '\u65B0\u7586',
                            'children': [
                                {
                                    'id': '551',
                                    'text': '\u963F\u514B\u82CF\u5730\u533A'
                                },
                                {
                                    'id': '554',
                                    'text': '\u963F\u52D2\u6CF0\u5E02'
                                },
                                {
                                    'id': '556',
                                    'text': '\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '557',
                                    'text': '\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '560',
                                    'text': '\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE'
                                },
                                {
                                    'id': '563',
                                    'text': '\u54C8\u5BC6\u5E02'
                                },
                                {
                                    'id': '564',
                                    'text': '\u548C\u7530\u5E02'
                                },
                                {
                                    'id': '565',
                                    'text': '\u5580\u4EC0\u5E02'
                                },
                                {
                                    'id': '566',
                                    'text': '\u514B\u62C9\u739B\u4F9D\u5E02'
                                },
                                {
                                    'id': '570',
                                    'text': '\u77F3\u6CB3\u5B50\u5E02'
                                },
                                {
                                    'id': '571',
                                    'text': '\u5854\u57CE\u5E02'
                                },
                                {
                                    'id': '572',
                                    'text': '\u5410\u9C81\u756A\u5E02'
                                },
                                {
                                    'id': '573',
                                    'text': '\u4E4C\u9C81\u6728\u9F50\u5E02'
                                },
                                {
                                    'id': '576',
                                    'text': '\u4F0A\u7281\u5E02'
                                },
                                {
                                    'id': '869',
                                    'text': '\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C'
                                },
                                {
                                    'id': '870',
                                    'text': '\u4E94\u5BB6\u6E20'
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '87',
                    'text': '\u6E2F\u6FB3\u53F0',
                    'children': [
                        {
                            'id': '5',
                            'text': '\u6FB3\u95E8'
                        },
                        {
                            'id': '6',
                            'text': '\u9999\u6E2F'
                        },
                        {
                            'id': '7',
                            'text': '\u53F0\u6E7E'
                        }
                    ]
                }
            ]
        },
        {
            'id': '999',
            'text': '\u56FD\u5916'
        },
        {
            'id': '0',
            'text': '\u5176\u4ED6'
        }
    ];
    lib.inherits(Region, InputControl);
    ui.register(Region);
    return Region;
});

define('esui/RangeCalendar', [
    'require',
    './Button',
    './MonthView',
    './CheckBox',
    './Label',
    './lib',
    './InputControl',
    './controlHelper',
    './Layer',
    './main',
    'moment',
    'underscore'
], function (require) {
    require('./Button');
    require('./MonthView');
    require('./CheckBox');
    require('./Label');
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    var helper = require('./controlHelper');
    var Layer = require('./Layer');
    var ui = require('./main');
    var m = require('moment');
    var u = require('underscore');
    function RangeCalendarLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(RangeCalendarLayer, Layer);
    RangeCalendarLayer.prototype.render = function (element) {
        var calendar = this.control;
        document.body.appendChild(element);
        element.innerHTML = getLayerHtml(calendar);
        calendar.helper.initChildren(element);
        paintLayer(calendar, calendar.view, 'render');
    };
    RangeCalendarLayer.prototype.toggle = function () {
        var element = this.getElement();
        if (!element || this.control.helper.isPart(element, 'layer-hidden')) {
            var calendar = this.control;
            paintLayer(calendar, calendar.rawValue, 'repaint');
            this.show();
        } else {
            this.hide();
        }
    };
    function paintLayer(calendar, value, state) {
        if (state === 'render') {
            var shortcutDom = calendar.helper.getPart('shortcut');
            helper.addDOMEvent(calendar, shortcutDom, 'click', shortcutClick);
            var endlessCheck = calendar.getChild('endlessCheck');
            if (endlessCheck) {
                endlessCheck.on('change', lib.curry(makeCalendarEndless, calendar));
                if (calendar.isEndless) {
                    endlessCheck.setChecked(true);
                    calendar.helper.addPartClasses('shortcut-disabled', calendar.helper.getPart(calendar));
                }
            }
            var okBtn = calendar.getChild('okBtn');
            okBtn.on('click', lib.curry(commitValue, calendar));
            var cancelBtn = calendar.getChild('cancelBtn');
            cancelBtn.on('click', u.bind(calendar.layer.hide, calendar.layer));
            var closeBtn = calendar.getChild('closeBtn');
            closeBtn.on('click', u.bind(calendar.layer.hide, calendar.layer));
        } else {
            calendar.view.begin = value.begin;
            calendar.view.end = value.end;
            calendar.value = calendar.convertToParam(value);
            var isEndless;
            if (!value.end) {
                isEndless = true;
            } else {
                isEndless = false;
            }
            calendar.setProperties({ isEndless: isEndless });
        }
        paintCal(calendar, 'begin', calendar.view.begin, state === 'render');
        paintCal(calendar, 'end', calendar.view.end, state === 'render');
        var selectedIndex = getSelectedIndex(calendar, calendar.view);
        paintMiniCal(calendar, selectedIndex);
    }
    function RangeCalendar(options) {
        this.now = new Date();
        InputControl.apply(this, arguments);
        this.layer = new RangeCalendarLayer(this);
    }
    function getLayerHtml(calendar) {
        var tpl = '' + '<div class="${shortCutClass}" id="${shortcutId}">' + '${shortCut}</div>' + '<div class="${bodyClass}">' + '${beginCalendar}${endCalendar}' + '</div>' + '<div class="${footClass}">' + '<div class="${okBtnClass}"' + ' data-ui="type:Button;childName:okBtn;">\u786E\u5B9A</div>' + '<div class="${cancelBtnClass}"' + ' data-ui="type:Button;childName:cancelBtn;">\u53D6\u6D88</div>' + '</div>' + '<div data-ui="type:Button;childName:' + 'closeBtn;skin:layerClose;height:12;"></div>';
        return lib.format(tpl, {
            bodyClass: calendar.helper.getPartClassName('body'),
            shortcutId: calendar.helper.getId('shortcut'),
            shortCutClass: calendar.helper.getPartClassName('shortcut'),
            shortCut: getMiniCalendarHtml(calendar),
            beginCalendar: getCalendarHtml(calendar, 'begin'),
            endCalendar: getCalendarHtml(calendar, 'end'),
            footClass: calendar.helper.getPartClassName('foot'),
            okBtnClass: calendar.helper.getPartClassName('okBtn'),
            cancelBtnClass: calendar.helper.getPartClassName('cancelBtn')
        });
    }
    function startOfDay(day) {
        return m(day).startOf('day').toDate();
    }
    function endOfDay(day) {
        return m(day).endOf('day').toDate();
    }
    function isOutOfRange(calendar, shortItem) {
        var range = calendar.range;
        var itemValue = shortItem.getValue.call(calendar, calendar.now);
        if (startOfDay(range.begin) > startOfDay(range.begin) || endOfDay(itemValue.end) < endOfDay(itemValue.end)) {
            return true;
        }
        return false;
    }
    function getMiniCalendarHtml(calendar) {
        var shownShortCut = calendar.shownShortCut.split(',');
        var shownShortCutHash = {};
        for (var k = 0; k < shownShortCut.length; k++) {
            shownShortCutHash[shownShortCut[k]] = true;
        }
        var tplItem = '' + '<span data-index="${shortIndex}" class="' + calendar.helper.getPartClassName('shortcut-item') + ' ${shortClass}"' + ' id="${shortId}">${shortName}</span>';
        var shortItems = calendar.shortCutItems;
        var len = shortItems.length;
        var html = [];
        for (var i = 0; i < len; i++) {
            var shortItem = shortItems[i];
            if (shownShortCutHash[shortItem.name]) {
                var shortName = shortItem.name;
                var shortClasses = [];
                if (i === 0) {
                    shortClasses = shortClasses.concat(calendar.helper.getPartClasses('shortcut-item-first'));
                }
                var disabled = isOutOfRange(calendar, shortItem);
                if (disabled) {
                    shortClasses = shortClasses.concat(calendar.helper.getPartClasses('shortcut-item-disabled'));
                }
                var shortId = calendar.helper.getId('shortcut-item' + i);
                html.push(lib.format(tplItem, {
                    shortIndex: i,
                    shortClass: shortClasses.join(' '),
                    shortId: shortId,
                    shortName: shortName
                }));
            }
        }
        return html.join('');
    }
    function getCalendarHtml(calendar, type) {
        var endlessCheckDOM = '';
        if (calendar.endlessCheck && type === 'end') {
            endlessCheckDOM = '' + '<input type="checkbox" title="\u4E0D\u9650\u7ED3\u675F" ' + 'data-ui-type="CheckBox" ' + 'data-ui-child-name="endlessCheck" />';
        }
        var tpl = '' + '<div class="${frameClass}">' + '<div class="${labelClass}">' + '<h3>${labelTitle}</h3>' + endlessCheckDOM + '</div>' + '<div class="${calClass}">' + '<div data-ui="type:MonthView;' + 'childName:${calName}"></div>' + '</div>' + '</div>';
        return lib.format(tpl, {
            frameClass: calendar.helper.getPartClassName(type),
            labelClass: calendar.helper.getPartClassName('label'),
            labelTitle: type === 'begin' ? '\u5F00\u59CB\u65E5\u671F' : '\u7ED3\u675F\u65E5\u671F',
            titleId: calendar.helper.getId(type + 'Label'),
            calClass: calendar.helper.getPartClassName(type + '-cal'),
            calName: type + 'Cal'
        });
    }
    function makeCalendarEndless(calendar) {
        var endCalendar = calendar.getChild('endCal');
        var shortCutItems = calendar.helper.getPart('shortcut');
        var selectedIndex;
        if (this.isChecked()) {
            calendar.isEndless = true;
            endCalendar.disable();
            selectedIndex = -1;
            calendar.view.end = null;
            calendar.helper.addPartClasses('shortcut-disabled', shortCutItems);
        } else {
            calendar.isEndless = false;
            endCalendar.enable();
            updateView.apply(calendar, [
                endCalendar,
                'end'
            ]);
            calendar.helper.removePartClasses('shortcut-disabled', shortCutItems);
        }
    }
    function isSameDate(date1, date2) {
        if (!date1 && date2 || date1 && !date2) {
            return false;
        } else if (!date1 && !date2) {
            return true;
        }
        return m(date1).isSame(date2, 'day');
    }
    function getSelectedIndex(calendar, value) {
        var shortcutItems = calendar.shortCutItems;
        var len = shortcutItems.length;
        for (var i = 0; i < len; i++) {
            var item = shortcutItems[i];
            var itemValue = item.getValue.call(calendar, calendar.now);
            if (isSameDate(value.begin, itemValue.begin) && isSameDate(value.end, itemValue.end)) {
                return i;
            }
        }
        return -1;
    }
    function selectIndex(calendar, index) {
        var me = calendar;
        var shortcutItems = calendar.shortCutItems;
        if (index < 0 || index >= shortcutItems.length) {
            return;
        }
        var value = shortcutItems[index].getValue.call(me, me.now);
        var begin = value.begin;
        var end = value.end;
        calendar.view = {
            begin: begin,
            end: end
        };
        paintCal(calendar, 'begin', begin);
        paintCal(calendar, 'end', end);
        paintMiniCal(me, index);
    }
    function paintMiniCal(calendar, index) {
        var shortcutItems = calendar.shortCutItems;
        var miniMode = calendar.miniMode;
        if (miniMode !== null && miniMode !== index) {
            calendar.helper.removePartClasses('shortcut-item-selected', calendar.helper.getPart('shortcut-item' + miniMode));
        }
        calendar.miniMode = index;
        if (index >= 0) {
            calendar.helper.addPartClasses('shortcut-item-selected', calendar.helper.getPart('shortcut-item' + index));
            calendar.curMiniName = shortcutItems[index].name;
        } else {
            calendar.curMiniName = null;
        }
    }
    function paintCal(calendar, type, value, bindEvent) {
        var monthView = calendar.getChild(type + 'Cal');
        if (!monthView) {
            return;
        }
        if (bindEvent === true) {
            monthView.on('change', u.bind(updateView, calendar, monthView, type));
            monthView.on('changemonth', u.bind(updateHighlightRange, null, calendar));
        }
        monthView.setProperties({
            rawValue: value,
            range: calendar.range
        });
    }
    function shortcutClick(e) {
        if (this.isEndless) {
            return;
        }
        var tar = e.target || e.srcElement;
        var classes = this.helper.getPartClasses('shortcut-item');
        var disableClasses = this.helper.getPartClasses('shortcut-item-disabled');
        while (tar && tar !== document.body) {
            if (lib.hasClass(tar, classes[0]) && !lib.hasClass(tar, disableClasses[0])) {
                var index = tar.getAttribute('data-index');
                selectIndex(this, index);
                return;
            }
            tar = tar.parentNode;
        }
    }
    function updateView(monthView, type) {
        var date = monthView.getRawValue();
        if (!date) {
            return;
        }
        this.view[type] = date;
        var selectedIndex = getSelectedIndex(this, this.view);
        paintMiniCal(this, selectedIndex);
        updateHighlightRange(this);
    }
    function commitValue(calendar) {
        var me = calendar;
        var view = calendar.view;
        var begin = view.begin;
        var end = view.end;
        if (calendar.isEndless) {
            end = null;
        }
        var dvalue = end - begin;
        if (!end) {
            dvalue = begin;
        }
        var value;
        if (dvalue > 0) {
            value = {
                'begin': begin,
                'end': end
            };
        } else if (end !== null) {
            value = {
                'begin': end,
                'end': begin
            };
        }
        var event = me.fire('beforechange', { value: value });
        if (event.isDefaultPrevented()) {
            return false;
        }
        me.rawValue = value;
        me.value = me.convertToParam(value);
        updateMain(me, value);
        me.layer.hide();
        me.fire('change', value);
    }
    function updateMain(calendar, range) {
        var text = calendar.helper.getPart('text');
        text.innerHTML = getValueText(calendar, range);
    }
    RangeCalendar.prototype.convertToParam = function (rawValue) {
        var beginTime = rawValue.begin;
        var endTime = rawValue.end;
        var beginTail = ' 00:00:00';
        var endTail = ' 23:59:59';
        var timeResult = [];
        timeResult.push(m(beginTime).format('YYYY-MM-DD') + beginTail);
        if (endTime) {
            timeResult.push(m(endTime).format('YYYY-MM-DD') + endTail);
        }
        return timeResult.join(',');
    };
    RangeCalendar.prototype.convertToRaw = function (value) {
        var strDates = value.split(',');
        if (strDates.length === 1) {
            strDates.push('2046-11-04');
        } else if (strDates[0] === '') {
            strDates[0] = '1983-09-03';
        } else if (strDates[1] === '') {
            strDates[1] = '2046-11-04';
        }
        return {
            begin: m(strDates[0], 'YYYY-MM-DD').toDate(),
            end: m(strDates[1], 'YYYY-MM-DD').toDate()
        };
    };
    function getValueText(calendar, rawValue) {
        var dateText = getDateValueText(calendar, rawValue);
        if (calendar.isEndless && dateText) {
            return dateText;
        }
        var shortcut = '';
        if (!calendar.curMiniName && calendar.miniMode !== null && calendar.miniMode >= 0 && calendar.miniMode < calendar.shortCutItems.length) {
            calendar.curMiniName = calendar.shortCutItems[calendar.miniMode].name;
        }
        if (calendar.curMiniName) {
            shortcut = calendar.curMiniName + '&nbsp;&nbsp;';
        }
        if (dateText) {
            return shortcut + dateText;
        }
        return '';
    }
    function getDateValueText(calendar, rawValue) {
        rawValue = rawValue || calendar.getRawValue();
        var begin = rawValue.begin;
        var end = rawValue.end;
        var pattern = calendar.dateFormat;
        if (begin && end) {
            return m(begin).format(pattern) + ' \u81F3 ' + m(end).format(pattern);
        } else if (!end) {
            return m(begin).format(pattern) + ' \u8D77 ';
        }
        return '';
    }
    RangeCalendar.defaultProperties = {
        dateFormat: 'YYYY-MM-DD',
        endlessCheck: false,
        shortCutItems: [
            {
                name: '\u6628\u5929',
                value: 0,
                getValue: function () {
                    var yesterday = new Date(this.now.getTime());
                    yesterday.setDate(yesterday.getDate() - 1);
                    return {
                        begin: yesterday,
                        end: yesterday
                    };
                }
            },
            {
                name: '\u6700\u8FD17\u5929',
                value: 1,
                getValue: function () {
                    var mDate = m(this.now);
                    return {
                        begin: mDate.clone().subtract('day', 7).toDate(),
                        end: mDate.clone().subtract('day', 1).toDate()
                    };
                }
            },
            {
                name: '\u4E0A\u5468',
                value: 2,
                getValue: function () {
                    var now = this.now;
                    var begin = new Date(now.getTime());
                    var end = new Date(now.getTime());
                    var startOfWeek = 1;
                    if (begin.getDay() < startOfWeek % 7) {
                        begin.setDate(begin.getDate() - 14 + startOfWeek - begin.getDay());
                    } else {
                        begin.setDate(begin.getDate() - 7 - begin.getDay() + startOfWeek % 7);
                    }
                    begin.setHours(0, 0, 0, 0);
                    end.setFullYear(begin.getFullYear(), begin.getMonth(), begin.getDate() + 6);
                    end.setHours(0, 0, 0, 0);
                    return {
                        begin: begin,
                        end: end
                    };
                }
            },
            {
                name: '\u672C\u6708',
                value: 3,
                getValue: function () {
                    return {
                        begin: m(this.now).startOf('month').toDate(),
                        end: m(this.now).toDate()
                    };
                }
            },
            {
                name: '\u4E0A\u4E2A\u6708',
                value: 4,
                getValue: function () {
                    var begin = m(this.now).subtract('month', 1).startOf('month').toDate();
                    var end = m(this.now).startOf('month').subtract('day', 1).toDate();
                    return {
                        begin: begin,
                        end: end
                    };
                }
            },
            {
                name: '\u4E0A\u4E2A\u5B63\u5EA6',
                value: 5,
                getValue: function () {
                    var now = this.now;
                    var begin = m(now).subtract('month', now.getMonth() % 3 + 3).startOf('month').toDate();
                    var end = m(now).subtract('month', now.getMonth() % 3).startOf('month').subtract('day', 1).toDate();
                    return {
                        begin: begin,
                        end: end
                    };
                }
            }
        ]
    };
    RangeCalendar.prototype.type = 'RangeCalendar';
    RangeCalendar.prototype.initOptions = function (options) {
        var now = this.now;
        var defaultRaw = {
            begin: now,
            end: now
        };
        var properties = {
            range: {
                begin: new Date(1983, 8, 3),
                end: new Date(2046, 10, 4)
            },
            rawValue: defaultRaw,
            view: u.clone(defaultRaw),
            value: this.convertToParam(defaultRaw),
            shownShortCut: '\u6628\u5929,\u6700\u8FD17\u5929,\u4E0A\u5468,\u672C\u6708,\u4E0A\u4E2A\u6708,\u4E0A\u4E2A\u5B63\u5EA6'
        };
        lib.extend(properties, RangeCalendar.defaultProperties, options);
        helper.extractValueFromInput(this, options);
        if (options.value) {
            properties.rawValue = this.convertToRaw(properties.value);
            properties.view = {
                begin: properties.rawValue.begin,
                end: properties.rawValue.end
            };
            properties.miniMode = null;
        } else if (options.rawValue) {
            properties.miniMode = null;
        } else if (!options.rawValue && options.miniMode != null) {
            var shortcutItem = properties.shortCutItems[properties.miniMode];
            if (shortcutItem) {
                properties.rawValue = shortcutItem.getValue.call(this, this.now);
                properties.miniMode = parseInt(properties.miniMode, 10);
            } else {
                properties.miniMode = null;
            }
        }
        if (options.range && typeof options.range === 'string') {
            properties.range = this.convertToRaw(properties.range);
        }
        if (options.endlessCheck === 'false') {
            properties.endlessCheck = false;
        }
        if (properties.endlessCheck) {
            if (properties.isEndless === 'false') {
                properties.isEndless = false;
            }
        } else {
            if (!properties.rawValue.end) {
                properties.endlessCheck = true;
                properties.isEndless = true;
            }
        }
        if (properties.isEndless) {
            properties.endlessCheck = true;
            properties.rawValue.end = null;
            properties.view.end = null;
            properties.view.value = this.convertToParam({
                begin: now,
                end: null
            });
        }
        this.setProperties(properties);
    };
    RangeCalendar.prototype.initStructure = function () {
        if (lib.isInput(this.main)) {
            helper.replaceMain(this);
        }
        var tpl = [
            '<div class="${className}" id="${id}"></div>',
            '<div class="${arrow}"></div>'
        ];
        this.main.innerHTML = lib.format(tpl.join('\n'), {
            className: this.helper.getPartClassName('text'),
            id: helper.getId(this, 'text'),
            arrow: this.helper.getPartClassName('arrow')
        });
    };
    RangeCalendar.prototype.initEvents = function () {
        this.helper.addDOMEvent(this.main, 'mousedown', u.bind(this.layer.toggle, this.layer));
    };
    RangeCalendar.prototype.repaint = helper.createRepaint(InputControl.prototype.repaint, {
        name: [
            'rawValue',
            'range'
        ],
        paint: function (calendar, rawValue, range) {
            if (range) {
                if (typeof range === 'string') {
                    range = calendar.convertToRaw(range);
                }
                if (!range.begin) {
                    range.begin = new Date(1983, 8, 3);
                } else if (!range.end) {
                    range.end = new Date(2046, 10, 4);
                }
                calendar.range = range;
            }
            if (rawValue) {
                updateMain(calendar, rawValue);
            }
            if (calendar.layer) {
                paintLayer(calendar, rawValue);
            }
        }
    }, {
        name: [
            'disabled',
            'hidden',
            'readOnly'
        ],
        paint: function (calendar, disabled, hidden, readOnly) {
            if (disabled || hidden || readOnly) {
                calendar.layer.hide();
            }
        }
    }, {
        name: 'isEndless',
        paint: function (calendar, isEndless) {
            if (!calendar.endlessCheck) {
                calendar.isEndless = false;
            } else {
                var endlessCheck = calendar.getChild('endlessCheck');
                if (endlessCheck) {
                    endlessCheck.setChecked(isEndless);
                }
            }
        }
    });
    RangeCalendar.prototype.setRawValue = function (date) {
        this.setProperties({ 'rawValue': date });
    };
    RangeCalendar.prototype.getRawValue = function () {
        return this.rawValue;
    };
    RangeCalendar.prototype.stringifyValue = function (rawValue) {
        return this.convertToParam(rawValue) || '';
    };
    RangeCalendar.prototype.parseValue = function (value) {
        return this.convertToRaw(value);
    };
    function updateHighlightRange(calendar) {
        function updateSingleMonth(monthView, monthViewType) {
            var begin = new Date(monthView.year, monthView.month, 1);
            begin = m(begin);
            var end = begin.clone().endOf('month');
            var cursor = begin;
            while (cursor <= end) {
                var highlight = true;
                if (monthViewType === 'begin' && (cursor <= m(rangeBegin) || cursor > m(rangeEnd))) {
                    highlight = false;
                } else if (monthViewType === 'end' && (cursor < m(rangeBegin) || cursor >= m(rangeEnd))) {
                    highlight = false;
                }
                changeHighlightState(monthView, cursor.toDate(), highlight);
                cursor.add('day', 1);
            }
        }
        function changeHighlightState(monthView, date, highlight) {
            var dateItem = monthView.getDateItemHTML(date);
            if (highlight) {
                monthView.helper.addPartClasses('month-item-highlight', dateItem);
            } else {
                monthView.helper.removePartClasses('month-item-highlight', dateItem);
            }
        }
        var beginMonth = calendar.getChild('beginCal');
        var endMonth = calendar.getChild('endCal');
        var rangeBegin = calendar.view.begin;
        var rangeEnd = calendar.view.end;
        updateSingleMonth(beginMonth, 'begin');
        updateSingleMonth(endMonth, 'end');
    }
    RangeCalendar.prototype.dispose = function () {
        if (helper.isInStage(this, 'DISPOSED')) {
            return;
        }
        if (this.layer) {
            this.layer.dispose();
            this.layer = null;
        }
        InputControl.prototype.dispose.apply(this, arguments);
    };
    lib.inherits(RangeCalendar, InputControl);
    ui.register(RangeCalendar);
    return RangeCalendar;
});

define('esui/Pager', [
    'require',
    'underscore',
    './lib',
    './main',
    './Control',
    './Select',
    './painters'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var ui = require('./main');
    var Control = require('./Control');
    require('./Select');
    function getMainHTML(pager) {
        var template = [
            '<div id="${pagerWrapperId}" class="${pagerWrapperClass}">',
            '<div id="${selectWrapperId}" ',
            'class="${selectWrapperClass}">',
            '<span id="${labelId}" class="${labelClass}">',
            '${labelText}</span>',
            '<div data-ui="type:Select;childName:select;',
            'id:${selectId};width:40;"></div>',
            '</div>',
            '<ul id="${mainId}" class="${mainClass}"></ul>',
            '</div>'
        ];
        return lib.format(template.join(''), {
            pagerWrapperId: pager.helper.getId('pager-wrapper'),
            pagerWrapperClass: pager.helper.getPartClasses(pager.layout)[0],
            selectWrapperId: pager.helper.getId('select-wrapper'),
            selectWrapperClass: pager.helper.getPartClassName('select-wrapper'),
            labelId: pager.helper.getId('label'),
            labelClass: pager.helper.getPartClassName('label'),
            labelText: '\u6BCF\u9875\u663E\u793A',
            selectId: pager.helper.getId('select'),
            mainId: pager.helper.getId('main'),
            mainClass: pager.helper.getPartClassName('main')
        });
    }
    function getPagerMainHTML(pager) {
        var plainTpl = '<li class="${className}" id="${id}"' + ' data-page="${page}">${text}</li>';
        var anchorTpl = '<li class="${className}" id="${id}">' + '<a href="${link}">${text}</a></li>';
        var omitTpl = '<li class="${className}">\u2026</li>';
        function getUrlByTemplate(num) {
            return lib.format(pager.urlTemplate, {
                page: num,
                pageSize: pager.pageSize
            });
        }
        function getTplObj(className, num, id, text) {
            var obj = { className: pager.helper.getPartClassName(className) };
            if (arguments.length > 1) {
                obj.link = getUrlByTemplate(num);
                obj.id = pager.helper.getId(id);
                obj.page = num;
                obj.text = text;
            }
            return obj;
        }
        function getSegmentHTML(obj, tpl) {
            if (!tpl) {
                var templates = {
                    anchor: anchorTpl,
                    plain: plainTpl
                };
                tpl = templates[pager.pageType] || templates.anchor;
            }
            return lib.format(tpl, obj);
        }
        function addSegmentToHTML(obj, tpl) {
            if (typeof obj === 'number') {
                obj = getTplObj('item', obj, 'page-' + obj, obj);
            }
            var segment = getSegmentHTML(obj, tpl);
            html.push(segment);
        }
        var page = pager.page;
        var backCount = pager.backCount;
        var forwardCount = pager.forwardCount;
        var totalPage = Math.ceil(pager.count / pager.pageSize);
        var html = [];
        if (page > 1) {
            var obj = getTplObj('item-extend', page - 1, 'page-back', pager.backText);
            addSegmentToHTML(obj);
        }
        if (page > backCount + 1) {
            addSegmentToHTML(1);
            if (page > backCount + 2) {
                var obj = getTplObj('item-omit');
                addSegmentToHTML(obj, omitTpl);
            }
        }
        var len = page > backCount ? backCount : page - 1;
        for (var i = page - len; i < page; i++) {
            addSegmentToHTML(i);
        }
        var obj = getTplObj('item-current', page, 'page-' + page, page);
        addSegmentToHTML(obj, plainTpl);
        var len = totalPage - page > forwardCount ? forwardCount : totalPage - page;
        for (var i = page + 1; i < page + len + 1; i++) {
            addSegmentToHTML(i);
        }
        if (page < totalPage - forwardCount) {
            if (page < totalPage - forwardCount - 1) {
                var obj = getTplObj('item-omit');
                addSegmentToHTML(obj, omitTpl);
            }
            addSegmentToHTML(totalPage);
        }
        if (page < totalPage) {
            var obj = getTplObj('item-extend', page + 1, 'page-forward', pager.forwardText);
            addSegmentToHTML(obj);
        }
        return html.join('');
    }
    function repaintPager(pager) {
        var pageSize = pager.pageSize;
        pageSize = pageSize > 0 ? pageSize : 1;
        pager.pageSize = pageSize;
        pager.getChild('select').set('value', pageSize + '');
        var totalPage = Math.ceil(pager.count / pageSize);
        var page = pager.page;
        page = page > totalPage ? totalPage : page;
        page = page > 0 ? page : 1;
        pager.page = page;
        var pagerMain = pager.helper.getPart('main');
        pagerMain.innerHTML = getPagerMainHTML(pager);
    }
    function repaintLayout(pager, style) {
        function getClasses() {
            var classes = [];
            for (var i = 0, len = arguments.length; i < len; i++) {
                classes.push(pager.helper.getPartClasses(arguments[i])[0]);
            }
            return classes;
        }
        var pagerWrapper = pager.helper.getPart('pager-wrapper');
        lib.removeClasses(pagerWrapper, getClasses('alignLeft', 'alignLeftReversed', 'alignRight', 'alignRightReversed', 'distributed', 'distributedReversed'));
        lib.addClass(pagerWrapper, pager.helper.getPartClasses(style)[0]);
    }
    function pagerClick(e) {
        var target = e.target;
        var backId = this.helper.getId('page-back');
        var forwardId = this.helper.getId('page-forward');
        var page = this.page;
        if (this.helper.isPart(target, 'item') || this.helper.isPart(target, 'item-extend')) {
            if (target.id === backId) {
                page--;
            } else if (target.id === forwardId) {
                page++;
            } else {
                page = +lib.getAttribute(target, 'data-page');
            }
            this.set('page', page);
        }
    }
    function getPageSizes(pageSizes) {
        var datasource = u.map(pageSizes, function (size) {
            return {
                text: size + '',
                value: size + ''
            };
        });
        return datasource;
    }
    function changePageSize(e) {
        var pageSize = parseInt(this.getChild('select').getValue(), 10);
        this.pageSize = pageSize;
        repaintPager(this);
        this.fire('changepagesize');
        this.fire('pagesizechange');
    }
    function showSelect(pager) {
        var selectWrapper = pager.helper.getPart('select-wrapper');
        pager.helper.removePartClasses('select-hidden', selectWrapper);
    }
    function hideSelect(pager) {
        var selectWrapper = pager.helper.getPart('select-wrapper');
        pager.helper.addPartClasses('select-hidden', selectWrapper);
    }
    function Pager(options) {
        Control.apply(this, arguments);
    }
    Pager.defaultProperties = {};
    Pager.prototype = {
        type: 'Pager',
        defaultProperties: {
            pageSizes: [
                15,
                30,
                50,
                100
            ],
            pageSize: 15
        },
        initOptions: function (options) {
            var properties = {
                pageType: 'anchor',
                count: 0,
                page: 1,
                backCount: 3,
                forwardCount: 3,
                backText: '\u4E0A\u4E00\u9875',
                forwardText: '\u4E0B\u4E00\u9875',
                urlTemplate: '',
                layout: 'alignLeft'
            };
            u.extend(properties, this.defaultProperties, Pager.defaultProperties, options);
            this.setProperties(properties);
        },
        initStructure: function () {
            this.main.innerHTML = getMainHTML(this);
            this.helper.initChildren();
            var select = this.getChild('select');
            if (!this.pageSizes || !this.pageSizes.length) {
                hideSelect(this);
            } else {
                var properties = {
                    datasource: getPageSizes(this.pageSizes),
                    value: this.pageSize + ''
                };
                select.setProperties(properties);
            }
            changePageSize.call(this);
        },
        initEvents: function () {
            var select = this.getChild('select');
            select.on('change', changePageSize, this);
            this.helper.addDOMEvent('main', 'click', pagerClick);
        },
        setProperties: function (properties) {
            properties = u.clone(properties);
            if (properties.hasOwnProperty('pageIndex') && !properties.hasOwnProperty('page')) {
                properties.page = +properties.pageIndex + 1;
            }
            var digitalProperties = [
                'count',
                'page',
                'backCount',
                'forwardCount',
                'pageSize'
            ];
            u.each(digitalProperties, function (name) {
                var value = properties[name];
                if (u.isString(value)) {
                    properties[name] = +value;
                }
            });
            var changes = Control.prototype.setProperties.apply(this, arguments);
            if (changes.hasOwnProperty('page')) {
                this.fire('changepage');
                this.fire('pagechange');
            }
        },
        repaint: require('./painters').createRepaint(Control.prototype.repaint, {
            name: 'pageSizes',
            paint: function (pager, value) {
                var select = pager.getChild('select');
                if (!value || !value.length) {
                    hideSelect(pager);
                } else {
                    var properties = {
                        datasource: getPageSizes(value),
                        value: pager.pageSize + ''
                    };
                    select.setProperties(properties);
                    showSelect(pager);
                }
            }
        }, {
            name: 'layout',
            paint: repaintLayout
        }, {
            name: [
                'pageType',
                'count',
                'pageSize',
                'page',
                'backCount',
                'forwardCount',
                'backText',
                'forwardText',
                'urlTemplate'
            ],
            paint: repaintPager
        }),
        getPageIndex: function () {
            return this.get('page') - 1;
        }
    };
    lib.inherits(Pager, Control);
    ui.register(Pager);
    return Pager;
});

define('esui/Overlay', [
    'require',
    './lib',
    './main',
    './Panel',
    'underscore',
    './painters'
], function (require) {
    var lib = require('./lib');
    var ui = require('./main');
    var Panel = require('./Panel');
    var u = require('underscore');
    function Overlay(options) {
        Panel.apply(this, arguments);
    }
    lib.inherits(Overlay, Panel);
    Overlay.prototype.type = 'Overlay';
    Overlay.prototype.parseMain = function (options) {
        var main = options.main;
        if (!main) {
            return;
        }
        var els = lib.getChildren(main);
        var len = els.length;
        var roleName;
        var roles = {};
        while (len--) {
            roleName = els[len].getAttribute('data-role');
            if (roleName) {
                roles[roleName] = els[len];
            }
        }
        options.roles = roles;
    };
    Overlay.prototype.initOptions = function (options) {
        var properties = {
            fixed: false,
            autoClose: true,
            hasMask: false
        };
        var booleanProperties = [
            'fixed',
            'autoClose',
            'hasMask'
        ];
        u.each(booleanProperties, function (property) {
            if (options[property] === 'false') {
                options[property] = false;
            }
        });
        u.extend(properties, options);
        Panel.prototype.initOptions.call(this, properties);
    };
    Overlay.prototype.initStructure = function () {
        var main = this.main;
        if (main.parentNode && main.parentNode.nodeName.toLowerCase() !== 'body') {
            document.body.appendChild(main);
        }
        this.addState('hidden');
        Panel.prototype.initStructure.apply(this, arguments);
    };
    Overlay.prototype.repaint = require('./painters').createRepaint(Panel.prototype.repaint, {
        name: [
            'width',
            'height'
        ],
        paint: function (overlay, width, height) {
            if (!isPropertyEmpty(width)) {
                if (width === 'auto') {
                    overlay.main.style.width = 'auto';
                } else {
                    overlay.main.style.width = width + 'px';
                }
            }
            if (!isPropertyEmpty(height)) {
                if (height === 'auto') {
                    overlay.main.style.height = 'auto';
                } else {
                    overlay.main.style.height = height + 'px';
                }
            }
            if (!overlay.isHidden()) {
                autoLayout.apply(overlay);
            }
        }
    }, {
        name: [
            'attachedDOM',
            'attachedControl'
        ],
        paint: function (overlay, attachedDOM, attachedControl) {
            var targetDOM = getTargetDOM.call(overlay, attachedDOM, attachedControl);
            overlay.attachedTarget = targetDOM;
        }
    });
    function close(e) {
        var target = e.target;
        var layer = this.main;
        if (!layer) {
            return;
        }
        var isChild = lib.dom.contains(layer, target);
        if (!isChild) {
            this.hide();
        }
    }
    Overlay.prototype.show = function () {
        if (this.helper.isInStage('INITED')) {
            this.render();
        } else if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        if (this.autoClose) {
            this.helper.addDOMEvent(document, 'mousedown', close);
        }
        if (this.fixed) {
            this.helper.addDOMEvent(window, 'resize', resizeHandler);
            this.helper.addDOMEvent(window, 'scroll', resizeHandler);
        }
        this.removeState('hidden');
        if (this.hasMask) {
            showMask.call(this);
        }
        this.moveToTop();
        autoLayout.apply(this);
        this.fire('show');
    };
    Overlay.prototype.hide = function () {
        if (!this.isHidden()) {
            if (this.autoClose) {
                this.helper.removeDOMEvent(document, 'mousedown', close);
            }
            this.helper.removeDOMEvent(window, 'resize', resizeHandler);
            this.helper.removeDOMEvent(window, 'scroll', resizeHandler);
            this.addState('hidden');
            if (this.hasMask) {
                hideMask.call(this);
            }
        }
        this.fire('hide');
    };
    Overlay.prototype.moveToTop = function () {
        var zIndex = this.getZIndex();
        this.main.style.zIndex = zIndex;
        var mask = getMask.call(this);
        if (mask) {
            mask.style.zIndex = zIndex - 1;
        }
    };
    Overlay.prototype.getZIndex = function () {
        var primaryClassName = this.helper.getPrimaryClassName();
        var hiddenPrimaryClassName = this.helper.getPrimaryClassName('hidden');
        var zIndex = 1203;
        var rawElements = lib.getChildren(document.body);
        for (var i = 0, len = rawElements.length; i < len; i++) {
            if (lib.hasClass(rawElements[i], primaryClassName) && !lib.hasClass(rawElements[i], hiddenPrimaryClassName)) {
                zIndex = Math.max(zIndex, rawElements[i].style.zIndex) + 10;
            }
        }
        return zIndex;
    };
    function autoLayout() {
        var attachedTarget = this.attachedTarget;
        var attachedLayout = this.attachedLayout;
        if (attachedTarget != null) {
            if (u.isString(attachedLayout)) {
                attachedLayout = attachedLayout.split(',');
            }
            this.attachLayout(attachedTarget, attachedLayout);
        } else {
            var options = u.pick(this, 'left', 'right', 'top', 'bottom', 'width', 'height');
            this.selfLayout(options);
        }
    }
    function getTargetDOM(domId, control) {
        if (domId) {
            return lib.g(domId);
        } else if (control) {
            if (u.isString(control)) {
                control = this.viewContext.get(control) || {};
            }
            return control.main;
        }
        return null;
    }
    function renderLayer(options) {
        var main = this.main;
        var properties = lib.clone(options || {});
        if (u.isArray(properties.align)) {
            var classList = u.filter(lib.getClassList(main), function (classItem) {
                return !classItem.match(/top-|bottom-|right-|left-/);
            });
            classList.push(this.helper.getPartClasses(properties.align.join('-')));
            lib.setAttribute(main, 'className', classList.join(' '));
        }
        properties = u.omit(properties, 'align');
        main.style.top = '';
        main.style.bottom = '';
        main.style.left = '';
        main.style.right = '';
        u.each(properties, function (value, name) {
            if (!isPropertyEmpty(value)) {
                main.style[name] = value + 'px';
            }
        });
    }
    function isPropertyEmpty(properties, key) {
        if (key) {
            if (!properties.hasOwnProperty(key)) {
                return true;
            }
            properties = properties[key];
        }
        return properties == null || properties !== 0 && lib.trim(properties) === '';
    }
    function getStyleNum(dom, styleName) {
        var result = lib.getStyle(dom, styleName);
        return parseInt(result, 10) || 0;
    }
    Overlay.prototype.selfLayout = function (options) {
        var page = lib.page;
        var main = this.main;
        var properties = lib.clone(options || {});
        var layerPosition = lib.getOffset(main);
        if (isPropertyEmpty(properties, 'left') && isPropertyEmpty(properties, 'right')) {
            properties.left = (page.getViewWidth() - layerPosition.width) / 2;
        } else if (!isPropertyEmpty(properties, 'left') && !isPropertyEmpty(properties, 'right')) {
            if (isPropertyEmpty(properties, 'width')) {
                properties.width = page.getViewWidth() - properties.right - properties.left - getStyleNum(this.main, 'padding-left') - getStyleNum(this.main, 'padding-right') - getStyleNum(this.main, 'border-left-width') - getStyleNum(this.main, 'border-right-width');
            }
            properties = u.omit(properties, 'right');
        }
        properties.left = Math.max(properties.left, 0);
        properties.left = page.getScrollLeft() + properties.left;
        if (isPropertyEmpty(properties, 'top') && isPropertyEmpty(properties, 'bottom')) {
            properties.top = (page.getViewHeight() - layerPosition.height) / 2;
        } else if (!isPropertyEmpty(properties, 'top') && !isPropertyEmpty(properties, 'bottom')) {
            if (isPropertyEmpty(properties, 'height')) {
                properties.height = page.getViewHeight() - properties.top - properties.bottom - getStyleNum(this.main, 'padding-top') - getStyleNum(this.main, 'padding-bottom') - getStyleNum(this.main, 'border-top-width') - getStyleNum(this.main, 'border-bottom-width');
            }
            properties = u.omit(properties, 'bottom');
        }
        properties.top = Math.max(properties.top, 0);
        properties.top = page.getScrollTop() + properties.top;
        renderLayer.call(this, properties);
    };
    Overlay.prototype.attachLayout = function (target, options) {
        var main = this.main;
        options = options || [
            'bottom',
            'left'
        ];
        var pagePosition = {
            width: lib.page.getViewWidth(),
            height: lib.page.getViewHeight(),
            scrollTop: lib.page.getScrollTop(),
            scrollLeft: lib.page.getScrollLeft()
        };
        var rect = target.getBoundingClientRect();
        var targetOffset = lib.getOffset(target);
        var targetPosition = {
            layoutLeft: targetOffset.left,
            viewLeft: rect.left,
            layoutTop: targetOffset.top,
            viewTop: rect.top,
            layoutRight: targetOffset.right,
            viewRight: rect.right,
            layoutBottom: targetOffset.bottom,
            viewBottom: rect.bottom,
            width: targetOffset.width,
            height: targetOffset.height
        };
        if (this.strictWidth) {
            main.style.minWidth = targetOffset.width + 'px';
        }
        var previousDisplayValue = main.style.display;
        main.style.display = 'block';
        main.style.top = '-5000px';
        main.style.left = '-5000px';
        var layerPosition = lib.getOffset(main);
        main.style.top = '';
        main.style.left = '';
        main.style.display = previousDisplayValue;
        var positionOptions = {
            target: targetPosition,
            layer: layerPosition,
            page: pagePosition
        };
        var properties;
        if (options[0] === 'right' || options[0] === 'left') {
            properties = positionHorizontal(positionOptions, options);
        } else {
            properties = positionVertical(positionOptions, options);
        }
        renderLayer.call(this, properties);
    };
    function positionHorizontal(options, preference) {
        var spaceRight = options.page.width - options.target.viewRight;
        var spaceLeft = options.target.viewLeft;
        var spaceBottomToTop = options.target.viewBottom;
        var spaceTopToBottom = options.page.height - options.target.viewTop;
        var validConfig = {};
        if (spaceRight >= options.layer.width) {
            validConfig.right = true;
        }
        if (spaceLeft >= options.layer.width) {
            validConfig.left = true;
        }
        if (spaceBottomToTop >= options.layer.height) {
            validConfig.bottom = true;
        }
        if (spaceTopToBottom >= options.layer.height) {
            validConfig.top = true;
        }
        var positionConfig = {
            right: options.target.layoutRight,
            left: options.target.layoutLeft - options.layer.width,
            bottom: options.target.layoutBottom - options.layer.height,
            top: options.target.layoutTop,
            center: options.target.layoutTop - (options.layer.height - options.target.height) * 1 / 2
        };
        var properties = { align: [] };
        var isLeftValid = validConfig.left;
        var isRightValid = validConfig.right;
        var horizontalPreference = preference[0];
        var defaultHorizontalOrientation = 'right';
        var orientation = isLeftValid && isRightValid ? horizontalPreference : isLeftValid && 'left' || isRightValid && 'right' || defaultHorizontalOrientation;
        properties.left = positionConfig[orientation];
        properties.align.push(orientation);
        if (preference[1] === 'center') {
            var topIsOk = 1;
            var bottomIsOk = 1;
            if (positionConfig.center < 0) {
                topIsOk = -1;
            }
            if (options.page.height - positionConfig.center - options.layer.height < 0) {
                bottomIsOk = -1;
            }
            if (topIsOk * bottomIsOk === 1) {
                properties.top = positionConfig.center;
                properties.align.push('center');
                return properties;
            } else if (topIsOk) {
                preference[1] = 'bottom';
            } else {
                preference[1] = 'top';
            }
        }
        var isTopValid = validConfig.top;
        var isBottomValid = validConfig.bottom;
        var verticalPreference = preference[1];
        var defaultVerticalAlign = 'top';
        var align = isTopValid && isBottomValid ? verticalPreference : isTopValid && 'top' || isBottomValid && 'bottom' || defaultVerticalAlign;
        properties.top = positionConfig[align];
        properties.align.push(align);
        return properties;
    }
    function positionVertical(options, preference) {
        var spaceRightToLeft = options.target.viewRight;
        var spaceLeftToRight = options.page.width - options.target.viewLeft;
        var spaceTop = options.target.viewTop;
        var spaceBottom = options.page.height - options.target.viewBottom;
        var validConfig = {};
        if (spaceRightToLeft >= options.layer.width) {
            validConfig.right = true;
        }
        if (spaceLeftToRight >= options.layer.width) {
            validConfig.left = true;
        }
        if (spaceBottom >= options.layer.height) {
            validConfig.bottom = true;
        }
        if (spaceTop >= options.layer.height) {
            validConfig.top = true;
        }
        var positionConfig = {
            right: options.target.layoutRight - options.layer.width,
            left: options.target.layoutLeft,
            center: options.target.layoutLeft - (options.layer.width - options.target.width) * 1 / 2,
            bottom: options.target.layoutBottom,
            top: options.target.layoutTop - options.layer.height
        };
        var properties = { align: [] };
        var isTopValid = validConfig.top;
        var isBottomValid = validConfig.bottom;
        var verticalPreference = preference[0];
        var defaultVerticalOrientation = 'bottom';
        var orientation = isTopValid && isBottomValid ? verticalPreference : isTopValid && 'top' || isBottomValid && 'bottom' || defaultVerticalOrientation;
        properties.top = positionConfig[orientation];
        properties.align.push(orientation);
        if (preference[1] === 'center') {
            var leftIsOk = 1;
            var rightIsOk = 1;
            if (positionConfig.center < 0) {
                leftIsOk = -1;
            }
            if (options.page.width - positionConfig.center - options.layer.width < 0) {
                rightIsOk = -1;
            }
            if (leftIsOk * rightIsOk === 1) {
                properties.left = positionConfig.center;
                properties.align.push('center');
                return properties;
            } else if (leftIsOk) {
                preference[1] = 'right';
            } else {
                preference[1] = 'left';
            }
        }
        var isLeftValid = validConfig.left;
        var isRightValid = validConfig.right;
        var horizontalPreference = preference[1];
        var defaultHorizontalAlign = 'left';
        var align = isLeftValid && isRightValid ? horizontalPreference : isLeftValid && 'left' || isRightValid && 'right' || defaultHorizontalAlign;
        properties.left = positionConfig[align];
        properties.align.push(align);
        return properties;
    }
    Overlay.prototype.moveTo = function (top, left) {
        this.selfLayout({
            top: top,
            left: left
        });
    };
    Overlay.prototype.resize = function () {
        autoLayout.apply(this);
    };
    Overlay.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        lib.removeNode('ctrl-mask-' + this.helper.getId());
        lib.removeNode(this.main);
        Panel.prototype.dispose.apply(this, arguments);
    };
    function resizeHandler() {
        if (this.isHidden()) {
            return;
        }
        autoLayout.apply(this);
    }
    function initMask(maskId) {
        var maskElement = document.createElement('div');
        maskElement.id = maskId;
        document.body.appendChild(maskElement);
    }
    function getMask() {
        var id = 'ctrl-mask-' + this.helper.getId();
        var mask = lib.g(id);
        if (!mask) {
            initMask(id);
        }
        return lib.g(id);
    }
    function showMask() {
        var mask = getMask.call(this);
        var maskClass = this.helper.getPartClassName('mask');
        mask.className = maskClass;
        mask.style.display = 'block';
    }
    function hideMask() {
        var mask = getMask.call(this);
        if ('undefined' !== typeof mask) {
            lib.removeNode(mask);
        }
    }
    ui.register(Overlay);
    return Overlay;
});

define('esui/Link', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    var paint = require('./painters');
    function Link() {
        Control.apply(this, arguments);
    }
    Link.prototype = {
        constructor: Link,
        type: 'Link',
        getCategory: function () {
            return 'container';
        },
        createMain: function () {
            return document.createElement('a');
        },
        initOptions: function (options) {
            var properties = {};
            u.extend(properties, options);
            if (properties.href == null) {
                properties.href = this.main.href;
            }
            if (properties.target == null) {
                properties.target = this.main.target;
            }
            if (properties.content == null) {
                properties.content = this.main.innerHTML;
            }
            u.extend(this, properties);
        },
        initEvents: function () {
            this.helper.delegateDOMEvent(this.main, 'click');
        },
        render: function () {
            if (this.main && this.main.nodeName.toLowerCase() === 'a') {
                Control.prototype.render.apply(this, arguments);
            }
        },
        repaint: paint.createRepaint(Control.prototype.repaint, paint.attribute('href'), paint.attribute('target'), {
            name: 'content',
            paint: function (link, content) {
                link.helper.disposeChildren();
                link.main.innerHTML = content;
                link.helper.initChildren();
            }
        })
    };
    lib.inherits(Link, Control);
    require('./main').register(Link);
    return Link;
});

define('esui/Layer', [
    'require',
    'underscore',
    './lib',
    './main',
    'mini-event/EventTarget'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var ui = require('./main');
    function Layer(control) {
        this.control = control;
    }
    Layer.prototype.nodeName = 'div';
    Layer.prototype.autoHide = true;
    function close(e) {
        var target = e.target;
        var layer = this.getElement(this);
        var main = this.control.main;
        if (!layer) {
            return;
        }
        while (target && (target !== layer && target !== main)) {
            target = target.parentNode;
        }
        if (target !== layer && target !== main) {
            this.hide();
        }
    }
    Layer.prototype.enableAutoHide = function (element) {
        var eventName = 'onwheel' in document.body ? 'wheel' : 'mousewheel';
        this.control.helper.addDOMEvent(document.documentElement, eventName, u.bind(this.hide, this));
        this.control.helper.addDOMEvent(element, eventName, function (e) {
            e.stopPropagation();
        });
    };
    Layer.prototype.create = function () {
        var element = this.control.helper.createPart('layer', this.nodeName);
        lib.addClass(element, ui.getConfig('uiClassPrefix') + '-layer');
        if (this.autoHide) {
            this.enableAutoHide(element);
        }
        return element;
    };
    Layer.prototype.addCustomClasses = function (layerClassNames) {
        var element = this.getElement();
        lib.addClasses(element, layerClassNames);
    };
    Layer.prototype.render = function (element) {
    };
    Layer.prototype.syncState = function (element) {
    };
    Layer.prototype.repaint = function () {
        var element = this.getElement(false);
        if (element) {
            this.render(element);
        }
    };
    Layer.prototype.initBehavior = function (element) {
    };
    function getHiddenClasses(layer) {
        var classes = layer.control.helper.getPartClasses('layer-hidden');
        classes.unshift(ui.getConfig('uiClassPrefix') + '-layer-hidden');
        return classes;
    }
    Layer.prototype.getElement = function (create) {
        var element = this.control.helper.getPart('layer');
        if (!element && create !== false) {
            element = this.create();
            this.render(element);
            lib.addClasses(element, getHiddenClasses(this));
            this.initBehavior(element);
            this.control.helper.addDOMEvent(document, 'mousedown', u.bind(close, this));
            this.control.helper.addDOMEvent(element, 'mousedown', function (e) {
                e.stopPropagation();
            });
            this.syncState(element);
            if (!element.parentElement) {
                document.body.appendChild(element);
            }
            this.fire('rendered');
        }
        return element;
    };
    Layer.prototype.hide = function () {
        var classes = getHiddenClasses(this);
        var element = this.getElement();
        lib.addClasses(element, classes);
        this.control.removeState('active');
        this.fire('hide');
    };
    Layer.prototype.show = function () {
        var element = this.getElement();
        element.style.zIndex = this.getZIndex();
        this.position();
        var classes = getHiddenClasses(this);
        lib.removeClasses(element, classes);
        this.control.addState('active');
        this.fire('show');
    };
    Layer.prototype.toggle = function () {
        var element = this.getElement();
        if (!element || this.control.helper.isPart(element, 'layer-hidden')) {
            this.show();
        } else {
            this.hide();
        }
    };
    Layer.prototype.position = function () {
        var element = this.getElement();
        Layer.attachTo(element, this.control.main, this.dock);
    };
    Layer.prototype.getZIndex = function () {
        return Layer.getZIndex(this.control.main);
    };
    Layer.prototype.dispose = function () {
        var element = this.getElement(false);
        if (element) {
            element.innerHTML = '';
            lib.removeNode(element);
        }
        this.control = null;
    };
    var zIndexStack = 1000;
    Layer.create = function (tagName) {
        var element = document.createElement(tagName || 'div');
        element.style.position = 'absolute';
        return element;
    };
    Layer.getZIndex = function (owner) {
        var zIndex = 0;
        while (!zIndex && owner && owner !== document) {
            zIndex = parseInt(lib.getComputedStyle(owner, 'zIndex'), 10);
            owner = owner.parentNode;
        }
        zIndex = zIndex || 0;
        return zIndex + 1;
    };
    Layer.moveToTop = function (element) {
        element.style.zIndex = ++zIndexStack;
    };
    Layer.moveTo = function (element, top, left) {
        positionLayerElement(element, {
            top: top,
            left: left
        });
    };
    Layer.resize = function (element, width, height) {
        positionLayerElement(element, {
            width: width,
            height: height
        });
    };
    Layer.attachTo = function (layer, target, options) {
        options = options || { strictWidth: false };
        var pageWidth = lib.page.getViewWidth();
        var pageHeight = lib.page.getViewHeight();
        var pageScrollTop = lib.page.getScrollTop();
        var pageScrollLeft = lib.page.getScrollLeft();
        var targetOffset = lib.getOffset(target);
        var previousDisplayValue = layer.style.display;
        layer.style.display = 'block';
        layer.style.top = '-5000px';
        layer.style.left = '-5000px';
        if (options.strictWidth) {
            layer.style.minWidth = targetOffset.width + 'px';
        }
        var layerOffset = lib.getOffset(layer);
        layer.style.top = '';
        layer.style.left = '';
        layer.style.display = previousDisplayValue;
        var properties = {};
        var bottomSpace = pageHeight - (targetOffset.bottom - pageScrollTop);
        var topSpace = targetOffset.top - pageScrollTop;
        if (bottomSpace <= layerOffset.height && topSpace > layerOffset.height) {
            properties.top = targetOffset.top - layerOffset.height;
        } else {
            properties.top = targetOffset.bottom;
        }
        var rightSpace = pageWidth - (targetOffset.left - pageScrollLeft);
        var leftSpace = targetOffset.right - pageScrollLeft;
        if (rightSpace <= layerOffset.width && leftSpace > layerOffset.width) {
            properties.left = targetOffset.right - layerOffset.width;
        } else {
            properties.left = targetOffset.left;
        }
        positionLayerElement(layer, properties);
    };
    Layer.centerToView = function (element, options) {
        var properties = options ? lib.clone(options) : {};
        if (typeof properties.width !== 'number') {
            properties.width = this.width;
        }
        if (typeof properties.height !== 'number') {
            properties.height = this.height;
        }
        properties.left = (lib.page.getViewWidth() - properties.width) / 2;
        var viewHeight = lib.page.getViewHeight();
        if (properties.height >= viewHeight && options.hasOwnProperty('minTop')) {
            properties.top = options.minTop;
        } else {
            properties.top = Math.floor((viewHeight - properties.height) / 2);
        }
        var viewWidth = lib.page.getViewWidth();
        if (properties.height >= viewWidth && options.hasOwnProperty('minLeft')) {
            properties.left = options.minLeft;
        } else {
            properties.left = Math.floor((viewWidth - properties.width) / 2);
        }
        properties.top += lib.page.getScrollTop();
        this.setProperties(properties);
    };
    function positionLayerElement(element, options) {
        var properties = lib.clone(options || {});
        if (properties.hasOwnProperty('top') && properties.hasOwnProperty('bottom')) {
            properties.height = properties.bottom - properties.top;
            delete properties.bottom;
        }
        if (properties.hasOwnProperty('left') && properties.hasOwnProperty('right')) {
            properties.width = properties.right - properties.left;
            delete properties.right;
        }
        if (properties.hasOwnProperty('top') || properties.hasOwnProperty('bottom')) {
            element.style.top = '';
            element.style.bottom = '';
        }
        if (properties.hasOwnProperty('left') || properties.hasOwnProperty('right')) {
            element.style.left = '';
            element.style.right = '';
        }
        for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
                element.style[name] = properties[name] + 'px';
            }
        }
    }
    var EventTarget = require('mini-event/EventTarget');
    lib.inherits(Layer, EventTarget);
    return Layer;
});

define('esui/Label', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    function Label(options) {
        Control.apply(this, arguments);
    }
    Label.prototype.type = 'Label';
    Label.prototype.createMain = function (options) {
        if (!options.tagName) {
            return Control.prototype.createMain.call(this);
        }
        return document.createElement(options.tagName);
    };
    Label.prototype.initOptions = function (options) {
        var properties = {};
        u.extend(properties, options);
        properties.tagName = this.main.nodeName.toLowerCase();
        if (properties.text == null) {
            properties.text = lib.trim(lib.getText(this.main));
        }
        u.extend(this, properties);
    };
    Label.prototype.initEvents = function () {
        this.helper.delegateDOMEvent(this.main, 'click');
    };
    var paint = require('./painters');
    Label.prototype.repaint = paint.createRepaint(Control.prototype.repaint, paint.attribute('title'), paint.text('text'), {
        name: 'forTarget',
        paint: function (label, forTarget) {
            if (label.main.nodeName.toLowerCase() !== 'label') {
                return;
            }
            label.helper.addDOMEvent(label.main, 'mousedown', function fixForAttribute() {
                var targetControl = this.viewContext.get(forTarget);
                var targetElement = targetControl && typeof targetControl.getFocusTarget === 'function' && targetControl.getFocusTarget();
                if (targetElement && targetElement.id) {
                    lib.setAttribute(this.main, 'for', targetElement.id);
                }
                this.helper.removeDOMEvent(this.main, 'mousedown', fixForAttribute);
            });
        }
    });
    Label.prototype.setText = function (text) {
        this.setProperties({ text: text });
    };
    Label.prototype.getText = function () {
        return this.text;
    };
    Label.prototype.setTitle = function (title) {
        this.setProperties({ title: title });
    };
    Label.prototype.getTitle = function () {
        return this.title;
    };
    lib.inherits(Label, Control);
    require('./main').register(Label);
    return Label;
});

define('esui/main', [
    'require',
    './lib',
    './ViewContext',
    './ControlCollection'
], function (require) {
    var lib = require('./lib');
    var main = {};
    main.version = '3.1.0-beta.6';
    var ViewContext = require('./ViewContext');
    var defaultViewContext = new ViewContext('default');
    main.getViewContext = function () {
        return defaultViewContext;
    };
    var config = {
        uiPrefix: 'data-ui',
        extensionPrefix: 'data-ui-extension',
        customElementPrefix: 'esui',
        instanceAttr: 'data-ctrl-id',
        viewContextAttr: 'data-ctrl-view-context',
        uiClassPrefix: 'ui',
        skinClassPrefix: 'skin',
        stateClassPrefix: 'state'
    };
    main.config = function (info) {
        lib.extend(config, info);
    };
    main.getConfig = function (name) {
        return config[name];
    };
    main.parseAttribute = function (source, valueReplacer) {
        if (!source) {
            return {};
        }
        var result = {};
        var lastStop = 0;
        var cursor = 0;
        while (cursor < source.length) {
            while (cursor < source.length && source.charAt(cursor) !== ':') {
                cursor++;
            }
            if (cursor >= source.length) {
                break;
            }
            var key = lib.trim(source.slice(lastStop, cursor));
            cursor++;
            lastStop = cursor;
            while (cursor < source.length && source.charAt(cursor) !== ';') {
                cursor++;
            }
            var lookAheadIndex = cursor + 1;
            while (lookAheadIndex < source.length) {
                var ch = source.charAt(lookAheadIndex);
                if (ch === ';') {
                    cursor = lookAheadIndex;
                }
                if (ch === ':') {
                    break;
                }
                lookAheadIndex++;
            }
            var value = lib.trim(source.slice(lastStop, cursor));
            result[key] = valueReplacer ? valueReplacer(value) : value;
            cursor++;
            lastStop = cursor;
        }
        return result;
    };
    main.getControlByDOM = function (dom) {
        if (!dom) {
            return null;
        }
        var getConf = main.getConfig;
        var controlId = dom.getAttribute(getConf('instanceAttr'));
        var viewContextId = dom.getAttribute(getConf('viewContextAttr'));
        var viewContext;
        if (controlId && viewContextId && (viewContext = ViewContext.get(viewContextId))) {
            return viewContext.get(controlId);
        }
        return null;
    };
    function registerClass(classFunc, container) {
        if (typeof classFunc === 'function') {
            var type = classFunc.prototype.type;
            if (type in container) {
                throw new Error(type + ' is exists!');
            }
            container[type] = classFunc;
        }
    }
    function createInstance(type, options, container) {
        var Constructor = container[type];
        if (Constructor) {
            delete options.type;
            return new Constructor(options);
        }
        return null;
    }
    var controlClasses = {};
    main.register = function (controlClass) {
        registerClass(controlClass, controlClasses);
    };
    main.create = function (type, options) {
        return createInstance(type, options, controlClasses);
    };
    main.get = function (id) {
        return defaultViewContext.get(id);
    };
    main.getSafely = function (id) {
        return defaultViewContext.getSafely(id);
    };
    var ControlCollection = require('./ControlCollection');
    main.wrap = function () {
        var collection = new ControlCollection();
        for (var i = 0; i < arguments.length; i++) {
            collection.add(arguments[i]);
        }
        return collection;
    };
    main.init = function (wrap, options) {
        wrap = wrap || document.body;
        options = options || {};
        var valueReplacer = options.valueReplacer || function (value) {
            return value;
        };
        function joinCamelCase(source) {
            function replacer(c) {
                return c.toUpperCase();
            }
            for (var i = 1, len = source.length; i < len; i++) {
                source[i] = source[i].replace(/^[a-z]/, replacer);
            }
            return source.join('');
        }
        function noOverrideExtend(target, source) {
            for (var key in source) {
                if (!(key in target)) {
                    target[key] = source[key];
                }
            }
        }
        function extendToOption(optionObject, terms, value) {
            if (terms.length === 0) {
                noOverrideExtend(optionObject, main.parseAttribute(value, valueReplacer));
            } else {
                optionObject[joinCamelCase(terms)] = valueReplacer(value);
            }
        }
        var rawElements = wrap.getElementsByTagName('*');
        var elements = [];
        for (var i = 0, len = rawElements.length; i < len; i++) {
            if (rawElements[i].nodeType === 1) {
                elements.push(rawElements[i]);
            }
        }
        var uiPrefix = main.getConfig('uiPrefix');
        var extPrefix = main.getConfig('extensionPrefix');
        var customElementPrefix = main.getConfig('customElementPrefix');
        var uiPrefixLen = uiPrefix.length;
        var extPrefixLen = extPrefix.length;
        var properties = options.properties || {};
        var controls = [];
        for (var i = 0, len = elements.length; i < len; i++) {
            var element = elements[i];
            if (element.getAttribute(config.instanceAttr)) {
                continue;
            }
            var attributes = element.attributes;
            var controlOptions = {};
            var extensionOptions = {};
            for (var j = 0, attrLen = attributes.length; j < attrLen; j++) {
                var attribute = attributes[j];
                var name = attribute.name;
                var value = attribute.value;
                if (name.indexOf(extPrefix) === 0) {
                    var terms = name.slice(extPrefixLen + 1).split('-');
                    var extKey = terms[0];
                    terms.shift();
                    var extOption = extensionOptions[extKey];
                    if (!extOption) {
                        extOption = extensionOptions[extKey] = {};
                    }
                    extendToOption(extOption, terms, value);
                } else if (name.indexOf(uiPrefix) === 0) {
                    var terms = name.length === uiPrefixLen ? [] : name.slice(uiPrefixLen + 1).split('-');
                    extendToOption(controlOptions, terms, value);
                }
            }
            var type = controlOptions.type;
            if (!type) {
                var nodeName = element.nodeName.toLowerCase();
                var esuiPrefixIndex = nodeName.indexOf(customElementPrefix);
                if (esuiPrefixIndex === 0) {
                    var typeFromCustomElement;
                    typeFromCustomElement = nodeName.replace(/-(\S)/g, function (match, ch) {
                        return ch.toUpperCase();
                    });
                    typeFromCustomElement = typeFromCustomElement.slice(customElementPrefix.length);
                    controlOptions.type = typeFromCustomElement;
                    type = typeFromCustomElement;
                }
            }
            if (type) {
                var controlId = controlOptions.id;
                var customOptions = controlId ? properties[controlId] : {};
                for (var key in customOptions) {
                    controlOptions[key] = valueReplacer(customOptions[key]);
                }
                var extensions = controlOptions.extensions || [];
                controlOptions.extensions = extensions;
                for (var key in extensionOptions) {
                    var extOption = extensionOptions[key];
                    var extension = main.createExtension(extOption.type, extOption);
                    extension && extensions.push(extension);
                }
                controlOptions.viewContext = options.viewContext;
                controlOptions.renderOptions = options;
                controlOptions.main = element;
                var control = main.create(type, controlOptions);
                if (control) {
                    controls.push(control);
                    if (options.parent) {
                        options.parent.addChild(control);
                    }
                    try {
                        control.render();
                    } catch (ex) {
                        var error = new Error('Render control ' + '"' + (control.id || 'anonymous') + '" ' + 'of type ' + control.type + ' ' + 'failed because: ' + ex.message);
                        error.actualError = ex;
                        throw error;
                    }
                }
            }
        }
        return controls;
    };
    var extensionClasses = {};
    main.registerExtension = function (extensionClass) {
        registerClass(extensionClass, extensionClasses);
    };
    main.createExtension = function (type, options) {
        return createInstance(type, options, extensionClasses);
    };
    var globalExtensionOptions = {};
    main.attachExtension = function (type, options) {
        globalExtensionOptions[type] = options;
    };
    main.createGlobalExtensions = function () {
        var options = globalExtensionOptions;
        var extensions = [];
        for (type in globalExtensionOptions) {
            if (globalExtensionOptions.hasOwnProperty(type)) {
                var extension = main.createExtension(type, globalExtensionOptions[type]);
                extension && extensions.push(extension);
            }
        }
        return extensions;
    };
    var ruleClasses = [];
    main.registerRule = function (ruleClass, priority) {
        ruleClasses.push({
            type: ruleClass,
            priority: priority
        });
        ruleClasses.sort(function (x, y) {
            return x.priority - y.priority;
        });
    };
    main.createRulesByControl = function (control) {
        var rules = [];
        for (var i = 0; i < ruleClasses.length; i++) {
            var RuleClass = ruleClasses[i].type;
            if (control.get(RuleClass.prototype.type) != null) {
                rules.push(new RuleClass());
            }
        }
        return rules;
    };
    return main;
});

define('esui', ['esui/main'], function (main) { return main; });

define('esui/Frame', [
    'require',
    'esui/lib',
    'esui/Control',
    'esui/painters',
    'esui'
], function (require) {
    var lib = require('esui/lib');
    var Control = require('esui/Control');
    function Frame(options) {
        Control.apply(this, arguments);
    }
    Frame.prototype.type = 'Frame';
    Frame.prototype.createMain = function () {
        return document.createElement('iframe');
    };
    Frame.prototype.initOptions = function (options) {
        var properties = {};
        lib.extend(properties, options);
        if (!properties.src) {
            properties.src = this.main.src;
        }
        this.setProperties(properties);
    };
    Frame.prototype.initStructure = function () {
        this.main.frameborder = 'no';
        this.main.marginHeight = '0';
        this.main.marginWeight = '0';
    };
    Frame.prototype.initEvents = function () {
        this.helper.delegateDOMEvent(this.main, 'load');
        this.helper.addDOMEvent(this.main, 'message', function (e) {
            var event = {
                origin: e.origin,
                data: e.data
            };
            this.fire('message', event);
        });
    };
    var paint = require('esui/painters');
    Frame.prototype.repaint = paint.createRepaint(Control.prototype.repaint, {
        name: 'src',
        paint: function (frame, src) {
            if (frame.main.src === src) {
                return;
            }
            frame.main.src = src;
        }
    }, paint.style('height'), paint.style('width'));
    Frame.prototype.callContentMethod = function (methodName) {
        var args = [].slice.call(arguments, 1);
        var contentWindow = this.main.contentWindow;
        if (!contentWindow) {
            throw new Error('No content window on this iframe');
        }
        if (typeof contentWindow[methodName] !== 'function') {
            throw new Error('No "' + methodName + '" method on window');
        }
        return contentWindow[methodName].apply(contentWindow, args);
    };
    Frame.prototype.postMessage = function (message, targetOrigin) {
        var contentWindow = this.main.contentWindow;
        if (!contentWindow) {
            throw new Error('No content window on this iframe');
        }
        if (typeof contentWindow.postMessage !== 'function') {
            throw new Error('Current browser does not support postMessage');
        }
        contentWindow.postMessage(message, targetOrigin);
    };
    lib.inherits(Frame, Control);
    require('esui').register(Frame);
    return Frame;
});

define('esui/Form', [
    'require',
    'underscore',
    './lib',
    './main',
    './Panel'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var ui = require('./main');
    var Panel = require('./Panel');
    function InputCollection(inputs) {
        this.length = inputs.length;
        for (var i = 0; i < inputs.length; i++) {
            this[i] = inputs[i];
        }
    }
    InputCollection.prototype.splice = Array.prototype.splice;
    function getData(inputs, fetchValue) {
        var store = {};
        for (var i = 0; i < inputs.length; i++) {
            var control = inputs[i];
            if (control.getCategory() === 'check' && !control.isChecked()) {
                continue;
            }
            if (control.isDisabled()) {
                continue;
            }
            var name = control.get('name');
            var value = fetchValue(control);
            if (store.hasOwnProperty(name)) {
                store[name] = [].concat(store[name], value);
            } else {
                store[name] = value;
            }
        }
        return store;
    }
    InputCollection.prototype.getData = function () {
        return getData(this, function (control) {
            return control.getRawValue();
        });
    };
    InputCollection.prototype.getDataAsString = function () {
        var store = getData(this, function (control) {
            var value = control.getValue();
            return encodeURIComponent(value);
        });
        var valueString = '';
        u.each(store, function (value, key) {
            valueString += encodeURIComponent(key) + '=' + value;
        });
        return valueString;
    };
    InputCollection.prototype.getValueAsString = function (name) {
        var data = this.getData();
        var values = data[name];
        var valueString = values ? typeof values === 'string' ? values : values.join(',') : '';
        return valueString;
    };
    InputCollection.prototype.checkAll = function () {
        for (var i = 0; i < this.length; i++) {
            var control = this[i];
            if (control.getCategory() === 'check') {
                control.setChecked(true);
            }
        }
    };
    InputCollection.prototype.uncheckAll = function () {
        for (var i = 0; i < this.length; i++) {
            var control = this[i];
            if (control.getCategory() === 'check') {
                control.setChecked(false);
            }
        }
    };
    InputCollection.prototype.checkInverse = function () {
        for (var i = 0; i < this.length; i++) {
            var control = this[i];
            if (control.getCategory() === 'check') {
                control.setChecked(!control.isChecked());
            }
        }
    };
    InputCollection.prototype.checkByValue = function (values) {
        var map = lib.toDictionary(values);
        for (var i = 0; i < this.length; i++) {
            var control = this[i];
            if (control.getCategory() === 'check') {
                var shouldBeChecked = map.hasOwnProperty(control.getValue());
                control.setChecked(shouldBeChecked);
            }
        }
    };
    function Form(options) {
        Panel.apply(this, arguments);
    }
    Form.defaultProperties = { autoValidate: false };
    Form.prototype.type = 'Form';
    Form.prototype.validateAndSubmit = function () {
        var beforeValidateEvent = this.fire('beforevalidate');
        if (beforeValidateEvent.isDefaultPrevented()) {
            return;
        }
        try {
            var isValid = this.get('autoValidate') ? this.validate() : true;
            var afterValidateEvent = this.fire('aftervalidate', { isValid: isValid });
            if (afterValidateEvent.isDefaultPrevented()) {
                return;
            }
            var data = { triggerSource: this };
            if (isValid) {
                this.fire('submit', data);
            } else {
                this.fire('invalid', data);
            }
        } catch (ex) {
            this.fire('submitfail', { error: ex });
        }
    };
    Form.prototype.initEvents = function () {
        if (this.main.nodeName.toLowerCase() === 'form') {
            this.helper.addDOMEvent(this.main, 'submit', function (e) {
                this.validateAndSubmit();
                e.preventDefault();
                return false;
            });
        }
    };
    Form.prototype.createMain = function (options) {
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = options.action || '';
        return form;
    };
    Form.prototype.initOptions = function (options) {
        var properties = u.extend({}, Form.defaultProperties, options);
        if (this.main.nodeName.toLowerCase() === 'form') {
            properties.action = this.main.getAttribute('action');
            properties.method = this.main.getAttribute('method');
        } else {
            properties.method = this.method || 'POST';
        }
        if (options.autoValidate === 'false') {
            properties.autoValidate = false;
        } else {
            properties.autoValidate = !!properties.autoValidate;
        }
        Panel.prototype.initOptions.call(this, properties);
    };
    function isInputControl(control) {
        var category = control.getCategory();
        return category === 'input' || category === 'check';
    }
    Form.prototype.getInputControls = function (name, type) {
        var result = [];
        function walk(form, root) {
            var children = root.children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var element = children[i];
                if (element.nodeType !== 1) {
                    continue;
                }
                var control = ui.getControlByDOM(element);
                if (control && isInputControl(control) && control.viewContext === form.viewContext && control.get('name') && (!name || control.get('name') === name) && (!type || control.get('type') === type)) {
                    result.push(control);
                } else {
                    walk(form, element);
                }
            }
        }
        walk(this, this.main);
        return new InputCollection(result);
    };
    Form.prototype.getData = function () {
        var inputs = this.getInputControls();
        return inputs.getData();
    };
    Form.prototype.getDataAsString = function () {
        var inputs = this.getInputControls();
        return inputs.getDataAsString();
    };
    Form.prototype.validate = function () {
        var inputs = this.getInputControls();
        var result = true;
        for (var i = 0; i < inputs.length; i++) {
            var control = inputs[i];
            if (control.isDisabled()) {
                continue;
            }
            result &= control.validate();
        }
        return !!result;
    };
    Form.prototype.repaint = function (changes, changesIndex) {
        Panel.prototype.repaint.apply(this, arguments);
        var shouldAttachSubmit = false;
        if (!changesIndex && this.submitButton) {
            shouldAttachSubmit = true;
        }
        if (changesIndex && changesIndex.hasOwnProperty('submitButton')) {
            var record = changesIndex.submitButton;
            if (record.oldValue) {
                for (var i = 0; i < record.oldValue.length; i++) {
                    var oldButton = this.viewContext.get(record.oldValue[i]);
                    if (oldButton) {
                        oldButton.un('click', this.validateAndSubmit, this);
                        oldButton.un('click', false);
                    }
                }
                shouldAttachSubmit = !!this.submitButton;
            }
        }
        if (shouldAttachSubmit) {
            for (var j = 0; j < this.submitButton.length; j++) {
                var button = this.viewContext.get(this.submitButton[j]);
                if (button) {
                    button.on('click', this.validateAndSubmit, this);
                    button.on('click', false);
                }
            }
        }
    };
    Form.prototype.setProperties = function (properties) {
        properties = u.clone(properties);
        if (properties.hasOwnProperty('submitButton')) {
            properties.submitButton = lib.splitTokenList(properties.submitButton);
        }
        Panel.prototype.setProperties.call(this, properties);
    };
    lib.inherits(Form, Panel);
    ui.register(Form);
    return Form;
});

define('esui/Extension', [
    'require',
    './lib'
], function (require) {
    var lib = require('./lib');
    function Extension(options) {
        lib.extend(this, options);
    }
    Extension.prototype.target = null;
    Extension.prototype.active = false;
    Extension.prototype.isActive = function () {
        return this.active;
    };
    Extension.prototype.activate = function () {
        this.active = true;
    };
    Extension.prototype.inactivate = function () {
        this.active = false;
    };
    Extension.prototype.attachTo = function (target) {
        if (this.target && this.target !== target) {
            if (this.active) {
                this.inactivate();
            }
        }
        this.target = target;
        if (!this.active) {
            this.activate();
        }
    };
    Extension.prototype.dispose = function () {
        if (this.active) {
            this.inactivate();
        }
        this.target = null;
    };
    return Extension;
});

define('esui/Panel', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    function Panel() {
        Control.apply(this, arguments);
    }
    Panel.prototype.type = 'Panel';
    Panel.prototype.getCategory = function () {
        return 'container';
    };
    Panel.prototype.createMain = function (options) {
        if (!options.tagName) {
            return Control.prototype.createMain.call(this);
        }
        return document.createElement(options.tagName);
    };
    Panel.prototype.initOptions = function (options) {
        var properties = {};
        u.extend(properties, options);
        properties.tagName = this.main.nodeName.toLowerCase();
        this.setProperties(properties);
    };
    Panel.prototype.repaint = require('./painters').createRepaint(Control.prototype.repaint, {
        name: 'content',
        paint: function (panel, content) {
            if (content != null) {
                panel.helper.disposeChildren();
                panel.main.innerHTML = content;
            }
            panel.helper.initChildren();
        }
    });
    Panel.prototype.setContent = function (html) {
        this.setProperties({ content: html });
    };
    function addContent(html, isPrepend) {
        var main = this.main;
        var container = document.createElement('div');
        container.innerHTML = html;
        var options = u.extend({}, this.renderOptions, {
            viewContext: this.viewContext,
            parent: this
        });
        var childNodes = container.childNodes;
        var children = [];
        for (var i = 0; i < childNodes.length; i++) {
            children.push(childNodes[i]);
        }
        var ui = require('./main');
        u.each(children, function (child) {
            if (isPrepend) {
                main.insertBefore(child, main.firstChild);
            } else {
                main.appendChild(child);
            }
            ui.init(main, options);
        });
    }
    Panel.prototype.prependContent = function (html) {
        addContent.call(this, html, true);
    };
    Panel.prototype.appendContent = function (html) {
        addContent.call(this, html, false);
    };
    function normalizeStyleName(name) {
        if (name.indexOf('-') >= 0) {
            name = name.replace(/-\w/g, function (word) {
                return word.charAt(1).toUpperCase();
            });
        }
        return name;
    }
    Panel.prototype.getStyle = function (name) {
        name = normalizeStyleName(name);
        return this.main ? this.main.style[name] : '';
    };
    Panel.prototype.setStyle = function (name, value) {
        name = normalizeStyleName(name);
        if (this.main) {
            this.main.style[name] = value || '';
        }
    };
    lib.inherits(Panel, Control);
    require('./main').register(Panel);
    return Panel;
});

define('esui/Dialog', [
    'require',
    './Button',
    './Panel',
    './lib',
    './controlHelper',
    './Control',
    './main'
], function (require) {
    require('./Button');
    require('./Panel');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var Control = require('./Control');
    var ui = require('./main');
    var maskIdPrefix = 'ctrl-mask';
    function Dialog(options) {
        Control.apply(this, arguments);
    }
    function parseMain(options) {
        var main = options.main;
        if (!main) {
            return;
        }
        var els = lib.getChildren(main);
        var len = els.length;
        var roleName;
        var roles = {};
        while (len--) {
            roleName = els[len].getAttribute('data-role');
            if (roleName) {
                roles[roleName] = els[len];
            }
        }
        options.roles = roles;
    }
    function createHead(control, mainDOM) {
        var title = 'title';
        var close = 'close-icon';
        var closeTpl = '<div class="${clsClass}" id="${clsId}">&nbsp;</div>';
        var closeIcon = '';
        if (control.closeButton) {
            closeIcon = lib.format(closeTpl, {
                'clsId': helper.getId(control, close),
                'clsClass': helper.getPartClasses(control, close).join(' ')
            });
        }
        var headTpl = '' + '<div id="${titleId}" class="${titleClass}">' + '</div>' + '${closeIcon}';
        var headClasses = [].concat(helper.getPartClasses(control, 'head'));
        var headData = {
            'titleId': helper.getId(control, title),
            'titleClass': helper.getPartClasses(control, title).join(' '),
            'closeIcon': closeIcon
        };
        var headHtml = lib.format(headTpl, headData);
        if (mainDOM) {
            control.title = mainDOM.innerHTML;
        } else {
            mainDOM = document.createElement('div');
            if (control.main.firstChild) {
                lib.insertBefore(mainDOM, control.main.firstChild);
            } else {
                control.main.appendChild(mainDOM);
            }
        }
        mainDOM.innerHTML = headHtml;
        lib.addClasses(mainDOM, headClasses);
        var properties = {
            main: mainDOM,
            renderOptions: control.renderOptions
        };
        var panel = ui.create('Panel', properties);
        panel.render();
        control.addChild(panel, 'head');
        return panel;
    }
    function closeClickHandler() {
        var event = this.fire('beforeclose');
        if (event.isDefaultPrevented()) {
            return false;
        }
        this.hide();
        this.fire('close');
        if (this.closeOnHide) {
            this.dispose();
        }
    }
    var getResizeHandler;
    function resizeHandler() {
        var page = lib.page;
        var main = this.main;
        var left = this.left;
        var top = this.top;
        var right = this.right;
        var bottom = this.bottom;
        if (left === undefined || left === null) {
            left = (page.getViewWidth() - main.offsetWidth) / 2;
        }
        if (left < 0) {
            left = 0;
        }
        if (top === undefined || top === null) {
            top = (page.getViewHeight() - main.offsetHeight) / 2;
        }
        top = Math.max(top, 0);
        main.style.left = left + 'px';
        main.style.top = page.getScrollTop() + top + 'px';
        if (right !== undefined && right !== null) {
            main.style.right = right + 'px';
        }
        if (bottom !== undefined && bottom !== null) {
            main.style.bottom = bottom + 'px';
        }
        if (this.height === 'auto') {
            var height = page.getViewHeight() - top;
            main.style.height = height + 'px';
            var body = this.getBody().main;
            var header = this.getHead().main;
            var headerHeight = parseInt(lib.getStyle(header, 'height'), 10);
            body.style.height = height - headerHeight + 'px';
        }
    }
    function initDragHandler(dialog, unbind) {
        var me = dialog;
        var head = dialog.getChild('head').main;
        if (unbind === true) {
            helper.removeDOMEvent(me, head, 'mousedown', dialogHeadDownHandler);
        } else {
            helper.addDOMEvent(me, head, 'mousedown', dialogHeadDownHandler);
        }
    }
    function makeUnselectable(dialog, node, unselected) {
        if (unselected) {
            helper.addDOMEvent(dialog, node, 'selectstart', function (e) {
                e.preventDefault();
            });
        } else {
            helper.removeDOMEvent(dialog, node, 'selectstart');
        }
    }
    function dialogHeadDownHandler(e) {
        var button = e.button;
        var isLeft = false;
        if (!e.which && button === 1 || e.which === 1) {
            isLeft = true;
        }
        if (!isLeft) {
            return;
        }
        var doc = document;
        this.addState('dragging');
        makeUnselectable(this, this.main, true);
        helper.addDOMEvent(this, doc, 'mousemove', dialogHeadMoveHandler);
        helper.addDOMEvent(this, doc, 'mouseup', dialogHeadUpHandler);
        lib.event.getMousePosition(e);
        this.dragStartPos = {
            x: e.pageX,
            y: e.pageY
        };
    }
    function dialogHeadMoveHandler(e) {
        var me = this;
        lib.event.getMousePosition(e);
        var movedDistance = {
            x: e.pageX - me.dragStartPos.x,
            y: e.pageY - me.dragStartPos.y
        };
        me.dragStartPos = {
            x: e.pageX,
            y: e.pageY
        };
        var main = me.main;
        var mainPos = lib.getOffset(main);
        var curMainLeft = mainPos.left + movedDistance.x;
        var curMainTop = mainPos.top + movedDistance.y;
        var pageWidth = lib.page.getWidth();
        var pageHeight = lib.page.getHeight();
        var offset = lib.getOffset(main);
        if (curMainTop < 0) {
            curMainTop = 0;
        } else if (curMainTop > pageHeight - offset.height) {
            curMainTop = pageHeight - offset.height;
        }
        if (curMainLeft < 0) {
            curMainLeft = 0;
        } else if (curMainLeft > pageWidth - offset.width) {
            curMainLeft = pageWidth - offset.width;
        }
        main.style.left = curMainLeft + 'px';
        main.style.top = curMainTop + 'px';
    }
    function dialogHeadUpHandler(e) {
        helper.removeDOMEvent(this, document, 'mousemove', dialogHeadMoveHandler);
        helper.removeDOMEvent(this, document, 'mouseup', dialogHeadUpHandler);
        this.removeState('dragging');
        makeUnselectable(this, this.main, false);
    }
    function showMask(dialog, zIndex) {
        var mask = getMask(dialog);
        var clazz = [];
        var maskClass = helper.getPartClasses(dialog, 'mask').join(' ');
        clazz.push(maskClass);
        mask.className = clazz.join(' ');
        mask.style.display = 'block';
        mask.style.zIndex = zIndex;
    }
    function hideMask(dialog) {
        var mask = getMask(dialog);
        if ('undefined' !== typeof mask) {
            lib.removeNode(mask);
        }
    }
    function initMask(maskId) {
        var el = document.createElement('div');
        el.id = maskId;
        document.body.appendChild(el);
    }
    function getMask(control) {
        var dialogId = helper.getId(control);
        var id = maskIdPrefix + '-' + dialogId;
        var mask = lib.g(id);
        if (!mask) {
            initMask(id);
        }
        return lib.g(id);
    }
    Dialog.OK_TEXT = '\u786E\u5B9A';
    Dialog.CANCEL_TEXT = '\u53D6\u6D88';
    Dialog.prototype = {
        type: 'Dialog',
        initOptions: function (options) {
            parseMain(options);
            var properties = {
                closeButton: true,
                closeOnHide: true,
                draggable: false,
                mask: true,
                title: '\u6211\u662F\u6807\u9898',
                content: '<p>\u6211\u662F\u5185\u5BB9</p>',
                defaultFoot: '' + '<div ' + 'class="' + this.helper.getPartClassName('ok-btn') + '" data-ui="type:Button;id:btnFootOk;' + 'childName:btnOk;skin:spring;">\u786E\u5B9A</div>' + '<div ' + 'class="' + this.helper.getPartClassName('cancel-btn') + '" ' + 'data-ui="type:Button;' + 'id:btnFootCancel;childName:btnCancel;">\u53D6\u6D88</div>',
                needFoot: true,
                roles: {}
            };
            lib.extend(properties, options);
            if (options.closeOnHide === 'false') {
                properties.closeOnHide = false;
            }
            if (options.closeButton === 'false') {
                properties.closeButton = false;
            }
            if (options.mask === 'false') {
                properties.mask = false;
            }
            if (options.needFoot === 'false') {
                properties.needFoot = false;
            }
            if (properties.needFoot) {
                if (!properties.foot) {
                    properties.foot = properties.defaultFoot;
                }
            }
            this.setProperties(properties);
        },
        initStructure: function () {
            var main = this.main;
            if (main.parentNode && main.parentNode.nodeName.toLowerCase() !== 'body') {
                document.body.appendChild(main);
            }
            this.addState('hidden');
            createHead(this, this.roles.title);
            this.createBF('body', this.roles.content);
            if (this.needFoot) {
                this.createBF('foot', this.roles.foot);
            }
        },
        initEvents: function () {
            if (this.closeButton) {
                var close = lib.g(helper.getId(this, 'close-icon'));
                if (close) {
                    helper.addDOMEvent(this, close, 'click', lib.curry(closeClickHandler, this));
                }
            }
        },
        createBF: function (type, mainDOM) {
            if (mainDOM) {
                this.content = mainDOM.innerHTML;
            } else {
                mainDOM = document.createElement('div');
                if (type === 'body') {
                    var head = this.getChild('head');
                    if (head) {
                        lib.insertAfter(mainDOM, head.main);
                    } else if (this.main.firstChild) {
                        lib.insertBefore(mainDOM, head, this.main.firstChild);
                    } else {
                        this.main.appendChild(mainDOM);
                    }
                } else {
                    this.main.appendChild(mainDOM);
                }
            }
            lib.addClasses(mainDOM, helper.getPartClasses(this, type + '-panel'));
            var properties = {
                main: mainDOM,
                renderOptions: this.renderOptions
            };
            var panel = ui.create('Panel', properties);
            panel.render();
            this.addChild(panel, type);
            return panel;
        },
        repaint: helper.createRepaint(Control.prototype.repaint, {
            name: 'height',
            paint: function (dialog, value) {
                if (value === 'auto') {
                    dialog.main.style.height = 'auto';
                } else if (value) {
                    dialog.main.style.height = value + 'px';
                }
                if (dialog.isShow) {
                    resizeHandler.apply(dialog);
                }
            }
        }, {
            name: 'width',
            paint: function (dialog, value) {
                if (value === 'auto') {
                    dialog.main.style.width = 'auto';
                } else if (value) {
                    dialog.main.style.width = value + 'px';
                }
                if (dialog.isShow) {
                    resizeHandler.apply(dialog);
                }
            }
        }, {
            name: 'title',
            paint: function (dialog, value) {
                var titleId = helper.getId(dialog, 'title');
                lib.g(titleId).innerHTML = value;
            }
        }, {
            name: 'content',
            paint: function (dialog, value) {
                if (!value) {
                    return;
                }
                var bfTpl = '' + '<div class="${class}" id="${id}">' + '${content}' + '</div>';
                var body = dialog.getBody();
                var bodyId = helper.getId(dialog, 'body');
                var bodyClass = helper.getPartClasses(dialog, 'body');
                var data = {
                    'class': bodyClass.join(' '),
                    'id': bodyId,
                    'content': value
                };
                body.setContent(lib.format(bfTpl, data));
            }
        }, {
            name: 'foot',
            paint: function (dialog, value) {
                var bfTpl = '' + '<div class="${class}" id="${id}">' + '${content}' + '</div>';
                var footId = helper.getId(dialog, 'foot');
                var footClass = helper.getPartClasses(dialog, 'foot');
                var foot = dialog.getFoot();
                if (value == null) {
                    dialog.needFoot = false;
                    if (foot) {
                        dialog.removeChild(foot);
                    }
                } else {
                    dialog.needFoot = true;
                    var data = {
                        'class': footClass.join(' '),
                        'id': footId,
                        'content': value
                    };
                    if (!foot) {
                        foot = dialog.createBF('foot');
                    }
                    foot.setContent(lib.format(bfTpl, data));
                }
            }
        }, {
            name: 'draggable',
            paint: function (dialog, draggable) {
                var unbind = false;
                if (draggable) {
                    dialog.addState('draggable');
                } else {
                    dialog.removeState('draggable');
                    unbind = true;
                }
                initDragHandler(dialog, unbind);
            }
        }),
        getBody: function () {
            return this.getChild('body');
        },
        getHead: function () {
            return this.getChild('head');
        },
        getFoot: function () {
            return this.getChild('foot');
        },
        show: function () {
            var mask = this.mask;
            if (helper.isInStage(this, 'INITED')) {
                this.render();
            } else if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            getResizeHandler = lib.curry(resizeHandler, this);
            helper.addDOMEvent(this, window, 'resize', resizeHandler);
            this.setWidth(this.width);
            this.removeState('hidden');
            resizeHandler.apply(this);
            var zIndex = 1203;
            var rawElements = document.body.children;
            var dialogNum = 0;
            for (var i = 0, len = rawElements.length; i < len; i++) {
                if (rawElements[i].nodeType === 1) {
                    if (lib.hasClass(rawElements[i], this.helper.getPrimaryClassName()) && !lib.hasClass(rawElements[i], this.helper.getPrimaryClassName('hidden'))) {
                        dialogNum++;
                    }
                }
            }
            zIndex += dialogNum * 10;
            this.main.style.zIndex = zIndex;
            if (mask) {
                showMask(this, zIndex - 1);
            }
            if (this.isShow) {
                return;
            }
            this.isShow = true;
            this.fire('show');
        },
        hide: function () {
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            helper.removeDOMEvent(this, window, 'resize', resizeHandler);
            this.addState('hidden');
            if (this.mask) {
                hideMask(this);
            }
            this.fire('hide');
        },
        setTitle: function (html) {
            this.setProperties({ 'title': html });
        },
        setContent: function (content) {
            this.setProperties({ 'content': content });
        },
        setFoot: function (foot) {
            this.setProperties({ 'foot': foot });
        },
        setHeight: function (height) {
            this.setProperties({ 'height': height });
        },
        setWidth: function (width) {
            this.setProperties({ 'width': width });
        },
        resize: function () {
            resizeHandler.apply(this);
        },
        dispose: function () {
            if (this.helper.isInStage('DISPOSED')) {
                return;
            }
            this.hide();
            var domId = this.main.id;
            lib.removeNode(domId);
            Control.prototype.dispose.apply(this, arguments);
        }
    };
    Dialog.confirm = function (args) {
        var dialogPrefix = 'dialog-confirm';
        function btnClickHandler(dialog, type) {
            dialog.fire(type);
            dialog.dispose();
        }
        var title = lib.encodeHTML(args.title) || '';
        var content = lib.encodeHTML(args.content) || '';
        var okText = lib.encodeHTML(args.okText) || Dialog.OK_TEXT;
        var cancelText = lib.encodeHTML(args.cancelText) || Dialog.CANCEL_TEXT;
        var properties = {
            type: 'confirm',
            skin: 'confirm',
            title: ''
        };
        lib.extend(properties, args);
        var tpl = [
            '<div class="${prefix}-icon ${prefix}-icon-${type}"></div>',
            '<div class="${prefix}-text">${content}</div>'
        ].join('');
        properties.id = helper.getGUID(dialogPrefix);
        properties.closeButton = false;
        properties.mask = true;
        properties.alwaysTop = true;
        var type = properties.type;
        properties.type = null;
        var dialog = ui.create('Dialog', properties);
        dialog.appendTo(document.body);
        dialog.show();
        var okBtn = dialog.getFoot().getChild('btnOk');
        var cancelBtn = dialog.getFoot().getChild('btnCancel');
        okBtn.setContent(okText);
        cancelBtn.setContent(cancelText);
        dialog.setTitle(title);
        dialog.setContent(lib.format(tpl, {
            type: type,
            content: content,
            prefix: dialog.helper.getPrimaryClassName()
        }));
        if (properties.btnHeight) {
            okBtn.set('height', properties.btnHeight);
            cancelBtn.set('height', properties.btnHeight);
        }
        if (properties.btnWidth) {
            okBtn.set('width', properties.btnWidth);
            cancelBtn.set('width', properties.btnWidth);
        }
        okBtn.on('click', lib.curry(btnClickHandler, dialog, 'ok'));
        cancelBtn.on('click', lib.curry(btnClickHandler, dialog, 'cancel'));
        return dialog;
    };
    Dialog.alert = function (args) {
        var dialogPrefix = 'dialog-alert';
        var okPrefix = 'dialog-alert-ok';
        function btnClickHandler(dialog, okBtn) {
            dialog.fire('ok');
            okBtn.dispose();
            dialog.dispose();
        }
        var title = lib.encodeHTML(args.title) || '';
        var content = lib.encodeHTML(args.content) || '';
        var okText = lib.encodeHTML(args.okText) || Dialog.OK_TEXT;
        var properties = {
            type: 'warning',
            skin: 'alert',
            title: ''
        };
        lib.extend(properties, args);
        var tpl = [
            '<div class="${prefix}-icon ${prefix}-icon-${type}"></div>',
            '<div class="${prefix}-text">${content}</div>'
        ].join('');
        var dialogId = helper.getGUID(dialogPrefix);
        properties.id = dialogId;
        properties.closeButton = false;
        properties.mask = true;
        properties.alwaysTop = true;
        var type = properties.type;
        properties.type = null;
        var dialog = ui.create('Dialog', properties);
        dialog.appendTo(document.body);
        dialog.setTitle(title);
        dialog.setContent(lib.format(tpl, {
            type: type,
            content: content,
            prefix: dialog.helper.getPrimaryClassName()
        }));
        dialog.setFoot('' + '<div ' + 'class="' + dialog.helper.getPartClassName('ok-btn') + '"' + ' data-ui="type:Button;childName:okBtn;id:' + dialogId + '-' + okPrefix + '; skin:spring;width:50;">' + okText + '</div>');
        dialog.show();
        var okBtn = dialog.getFoot().getChild('okBtn');
        okBtn.on('click', lib.curry(btnClickHandler, dialog, okBtn));
        if (properties.btnHeight) {
            okBtn.set('height', properties.btnHeight);
        }
        if (properties.btnwidth) {
            okBtn.set('width', properties.btnwidth);
        }
        return dialog;
    };
    lib.inherits(Dialog, Control);
    ui.register(Dialog);
    return Dialog;
});

define('esui/Crumb', [
    'require',
    'underscore',
    './lib',
    './Control',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    function Crumb() {
        Control.apply(this, arguments);
    }
    Crumb.defaultProperties = { separator: '>' };
    Crumb.prototype.type = 'Crumb';
    Crumb.prototype.initOptions = function (options) {
        var properties = { path: [] };
        u.extend(properties, Crumb.defaultProperties, options);
        var children = lib.getChildren(this.main);
        if (!options.path && children.length) {
            properties.path = u.map(children, function (element) {
                var node = { text: lib.getText(element) };
                if (element.nodeName.toLowerCase() === 'a') {
                    node.href = lib.getAttribute(element, 'href');
                }
                return node;
            });
        }
        this.setProperties(properties);
    };
    Crumb.prototype.initEvents = function () {
        this.helper.addDOMEvent(this.main, 'click', click);
    };
    function click(e) {
        var node = e.target;
        var children = lib.getChildren(this.main);
        while (node !== this.main) {
            if (this.helper.isPart(node, 'node')) {
                var index = lib.hasAttribute(node, 'data-index') ? node.getAttribute('data-index') : getPathIndex(children, node);
                var event = this.fire('click', { item: this.path[index] });
                event.isDefaultPrevented() && e.preventDefault();
                event.isPropagationStopped() && e.stopPropagation();
                return;
            }
            node = node.parentNode;
        }
    }
    function getPathIndex(children, node) {
        for (var i = children.length - 1; i > -1; i -= 2) {
            if (children[i] === node) {
                return i / 2;
            }
        }
    }
    Crumb.prototype.textNodeTemplate = '<span class="${classes}" data-index="${index}">${text}</span>';
    Crumb.prototype.linkNodeTemplate = '<a class="${classes}" href="${href}" data-index="${index}">${text}</a>';
    Crumb.prototype.separatorTemplate = '<span class="${classes}">${text}</span>';
    Crumb.prototype.getNodeHTML = function (node, index) {
        var classes = this.helper.getPartClasses('node');
        if (index === 0) {
            classes.push.apply(classes, this.helper.getPartClasses('node-first'));
        }
        if (index === this.path.length - 1) {
            classes.push.apply(classes, this.helper.getPartClasses('node-last'));
        }
        var template = node.href ? this.linkNodeTemplate : this.textNodeTemplate;
        var data = {
            href: u.escape(node.href),
            text: u.escape(node.text),
            index: index,
            classes: classes.join(' ')
        };
        return lib.format(template, data);
    };
    Crumb.prototype.getSeparatorHTML = function () {
        return lib.format(this.separatorTemplate, {
            classes: this.helper.getPartClassName('separator'),
            text: u.escape(this.separator)
        });
    };
    var paint = require('./painters');
    Crumb.prototype.repaint = paint.createRepaint(Control.prototype.repaint, {
        name: [
            'path',
            'separator'
        ],
        paint: function (crumb, path) {
            var html = u.map(path, crumb.getNodeHTML, crumb);
            var separator = crumb.getSeparatorHTML();
            crumb.main.innerHTML = html.join(separator);
        }
    });
    require('./main').register(Crumb);
    lib.inherits(Crumb, Control);
    return Crumb;
});

define('esui/SafeWrapper', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    function SafeWrapper() {
    }
    u.each([
        'enable',
        'disable',
        'setDisabled',
        'show',
        'hide',
        'toggle',
        'setValue',
        'setRawValue',
        'addChild',
        'removeChild',
        'set',
        'addState',
        'removeState',
        'toggleState',
        'on',
        'off',
        'fire',
        'dispose',
        'destroy',
        'initOptions',
        'createMain',
        'initStructure',
        'setViewContext',
        'render',
        'repaint',
        'appendTo',
        'insertBefore',
        'initChildren',
        'disposeChildren'
    ], function (method) {
        SafeWrapper.prototype[method] = function () {
        };
    });
    u.each([
        'isDisabled',
        'isHidden',
        'hasState',
        'isPropertyChanged'
    ], function (method) {
        SafeWrapper.prototype[method] = function () {
            return false;
        };
    });
    u.each([
        'getRawValue',
        'getChild',
        'get'
    ], function (method) {
        SafeWrapper.prototype[method] = function () {
            return null;
        };
    });
    u.each(['getValue'], function (method) {
        SafeWrapper.prototype[method] = function () {
            return '';
        };
    });
    u.each(['setProperties'], function (method) {
        SafeWrapper.prototype[method] = function () {
            return {};
        };
    });
    SafeWrapper.prototype.getCategory = function () {
        return 'control';
    };
    SafeWrapper.prototype.getChildSafely = function (childName) {
        var wrapper = new SafeWrapper();
        wrapper.childName = childName;
        wrapper.parent = this;
        if (this.viewContext) {
            wrapper.viewContext = this.viewContext;
        }
        return wrapper;
    };
    return SafeWrapper;
});

define('esui/Control', [
    'require',
    './lib',
    'underscore',
    './main',
    './Helper',
    './SafeWrapper',
    'mini-event/EventTarget'
], function (require) {
    var lib = require('./lib');
    var u = require('underscore');
    var ui = require('./main');
    var Helper = require('./Helper');
    function Control(options) {
        options = options || {};
        this.helper = new Helper(this);
        this.helper.changeStage('NEW');
        this.children = [];
        this.childrenIndex = {};
        this.currentStates = {};
        this.domEvents = {};
        this.main = options.main ? options.main : this.createMain(options);
        if (!this.id && !options.id) {
            this.id = lib.getGUID();
        }
        this.initOptions(options);
        this.helper.initViewContext();
        this.helper.initExtensions();
        this.helper.changeStage('INITED');
        this.fire('init', { options: options });
    }
    Control.prototype = {
        constructor: Control,
        ignoreStates: ['disabled'],
        getCategory: function () {
            return 'control';
        },
        initOptions: function (options) {
            options = options || {};
            this.setProperties(options);
        },
        createMain: function () {
            if (!this.type) {
                return document.createElement('div');
            }
            var name = this.type.replace(/([A-Z])/g, function (match, ch) {
                return '-' + ch.toLowerCase();
            });
            return document.createElement(ui.getConfig('customElementPrefix') + '-' + name.slice(1));
        },
        initStructure: function () {
        },
        initEvents: function () {
        },
        render: function () {
            if (this.helper.isInStage('INITED')) {
                this.fire('beforerender');
                this.domIDPrefix = this.viewContext.id;
                this.initStructure();
                this.initEvents();
                if (!this.main.id) {
                    this.main.id = this.helper.getId();
                }
                this.main.setAttribute(ui.getConfig('instanceAttr'), this.id);
                this.main.setAttribute(ui.getConfig('viewContextAttr'), this.viewContext.id);
                this.helper.addPartClasses();
                if (this.states) {
                    this.states = typeof this.states === 'string' ? this.states.split(' ') : this.states;
                    u.each(this.states, this.addState, this);
                }
            }
            this.repaint();
            if (this.helper.isInStage('INITED')) {
                this.helper.changeStage('RENDERED');
                this.fire('afterrender');
            }
        },
        repaint: function (changes, changesIndex) {
            if (!changesIndex || changesIndex.hasOwnProperty('disabled')) {
                var method = this.disabled ? 'addState' : 'removeState';
                this[method]('disabled');
            }
            if (!changesIndex || changesIndex.hasOwnProperty('hidden')) {
                var method = this.hidden ? 'addState' : 'removeState';
                this[method]('hidden');
            }
        },
        appendTo: function (wrap) {
            if (wrap instanceof Control) {
                wrap = wrap.main;
            }
            wrap.appendChild(this.main);
            if (this.helper.isInStage('NEW') || this.helper.isInStage('INITED')) {
                this.render();
            }
        },
        insertBefore: function (reference) {
            if (reference instanceof Control) {
                reference = reference.main;
            }
            reference.parentNode.insertBefore(this.main, reference);
            if (this.helper.isInStage('NEW') || this.helper.isInStage('INITED')) {
                this.render();
            }
        },
        dispose: function () {
            if (!this.helper.isInStage('DISPOSED')) {
                this.helper.beforeDispose();
                this.helper.dispose();
                this.helper.afterDispose();
            }
        },
        destroy: function () {
            var main = this.main;
            this.dispose();
            lib.removeNode(main);
        },
        get: function (name) {
            var method = this['get' + lib.pascalize(name)];
            if (typeof method === 'function') {
                return method.call(this);
            }
            return this[name];
        },
        set: function (name, value) {
            var method = this['set' + lib.pascalize(name)];
            if (typeof method === 'function') {
                return method.call(this, value);
            }
            var property = {};
            property[name] = value;
            this.setProperties(property);
        },
        isPropertyChanged: function (propertyName, newValue, oldValue) {
            return oldValue !== newValue;
        },
        setProperties: function (properties) {
            if (!this.stage) {
                if (properties.hasOwnProperty('id')) {
                    this.id = properties.id;
                }
                if (properties.hasOwnProperty('group')) {
                    this.group = properties.group;
                }
                if (properties.hasOwnProperty('skin')) {
                    this.skin = properties.skin;
                }
            }
            delete properties.id;
            delete properties.group;
            delete properties.skin;
            if (properties.hasOwnProperty('viewContext')) {
                this.setViewContext(properties.viewContext);
                delete properties.viewContext;
            }
            if (this.hasOwnProperty('disabled')) {
                this.disabled = !!this.disabled;
            }
            if (this.hasOwnProperty('hidden')) {
                this.hidden = !!this.hidden;
            }
            var changes = [];
            var changesIndex = {};
            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    var newValue = properties[key];
                    var getterMethodName = 'get' + lib.pascalize(key) + 'Property';
                    var oldValue = this[getterMethodName] ? this[getterMethodName]() : this[key];
                    var isChanged = this.isPropertyChanged(key, newValue, oldValue);
                    if (isChanged) {
                        this[key] = newValue;
                        var record = {
                            name: key,
                            oldValue: oldValue,
                            newValue: newValue
                        };
                        changes.push(record);
                        changesIndex[key] = record;
                    }
                }
            }
            if (changes.length && this.helper.isInStage('RENDERED')) {
                this.repaint(changes, changesIndex);
            }
            return changesIndex;
        },
        setViewContext: function (viewContext) {
            var oldViewContext = this.viewContext;
            if (oldViewContext === viewContext) {
                return;
            }
            if (oldViewContext) {
                this.viewContext = null;
                oldViewContext.remove(this);
            }
            this.viewContext = viewContext;
            viewContext && viewContext.add(this);
            var children = this.children;
            if (children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    children[i].setViewContext(viewContext);
                }
            }
            if (this.viewContext && this.helper.isInStage('RENDERED')) {
                this.main.setAttribute(ui.getConfig('viewContextAttr'), this.viewContext.id);
            }
        },
        setDisabled: function (disabled) {
            this[disabled ? 'disable' : 'enable']();
        },
        disable: function () {
            this.addState('disabled');
        },
        enable: function () {
            this.removeState('disabled');
        },
        isDisabled: function () {
            return this.hasState('disabled');
        },
        show: function () {
            this.removeState('hidden');
        },
        hide: function () {
            this.addState('hidden');
        },
        toggle: function () {
            this[this.isHidden() ? 'show' : 'hide']();
        },
        isHidden: function () {
            return this.hasState('hidden');
        },
        addState: function (state) {
            if (!this.hasState(state)) {
                this.currentStates[state] = true;
                this.helper.addStateClasses(state);
                var properties = {};
                var statePropertyName = state.replace(/-(\w)/, function (m, c) {
                    return c.toUpperCase();
                });
                properties[statePropertyName] = true;
                this.setProperties(properties);
            }
        },
        removeState: function (state) {
            if (this.hasState(state)) {
                this.currentStates[state] = false;
                this.helper.removeStateClasses(state);
                var properties = {};
                var statePropertyName = state.replace(/-(\w)/, function (m, c) {
                    return c.toUpperCase();
                });
                properties[statePropertyName] = false;
                this.setProperties(properties);
            }
        },
        toggleState: function (state) {
            var methodName = this.hasState(state) ? 'removeState' : 'addState';
            this[methodName](state);
        },
        hasState: function (state) {
            return !!this.currentStates[state];
        },
        addChild: function (control, childName) {
            childName = childName || control.childName;
            if (control.parent) {
                control.parent.removeChild(control);
            }
            this.children.push(control);
            control.parent = this;
            if (childName) {
                control.childName = childName;
                this.childrenIndex[childName] = control;
            }
            if (this.viewContext !== control.viewContext) {
                control.setViewContext(this.viewContext);
            }
        },
        removeChild: function (control) {
            var children = this.children;
            var len = children.length;
            while (len--) {
                if (children[len] === control) {
                    children.splice(len, 1);
                }
            }
            var childName = control.childName;
            if (childName) {
                this.childrenIndex[childName] = null;
            }
            control.parent = null;
        },
        disposeChildren: function () {
            var children = this.children.slice();
            for (var i = 0; i < children.length; i++) {
                children[i].dispose();
            }
            this.children = [];
            this.childrenIndex = {};
        },
        getChild: function (childName) {
            return this.childrenIndex[childName] || null;
        },
        getChildSafely: function (childName) {
            var child = this.getChild(childName);
            if (!child) {
                var SafeWrapper = require('./SafeWrapper');
                child = new SafeWrapper();
                child.childName = childName;
                child.parent = this;
                if (this.viewContext) {
                    child.viewContext = this.viewContext;
                }
            }
            return child;
        },
        initChildren: function (wrap, options) {
            this.helper.initChildren(wrap, options);
        }
    };
    var EventTarget = require('mini-event/EventTarget');
    lib.inherits(Control, EventTarget);
    return Control;
});

define('esui/CommandMenu', [
    'require',
    'underscore',
    './lib',
    './Control',
    './Layer',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var Control = require('./Control');
    var Layer = require('./Layer');
    function selectItem(e) {
        var target = e.target;
        while (target !== e.currentTarget && !lib.hasAttribute(target, 'data-index')) {
            target = target.parentNode;
        }
        var index = +target.getAttribute('data-index');
        var item = this.datasource[index];
        if (item.disabled) {
            return;
        }
        this.layer.hide();
        if (target === e.currentTarget) {
            return;
        }
        if (item) {
            if (typeof item.handler === 'function') {
                item.handler.call(this, item, index);
            }
        }
        this.fire('select', {
            item: item,
            index: index
        });
    }
    function CommandMenuLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(CommandMenuLayer, Layer);
    CommandMenuLayer.prototype.nodeName = 'ul';
    CommandMenuLayer.prototype.dock = { strictWidth: true };
    CommandMenuLayer.prototype.render = function (element) {
        var html = '';
        for (var i = 0; i < this.control.datasource.length; i++) {
            var classes = this.control.helper.getPartClasses('node');
            if (i === this.control.activeIndex) {
                classes.push.apply(classes, this.control.helper.getPartClasses('node-active'));
            }
            if (this.control.datasource[i].disabled) {
                classes.push.apply(classes, this.control.helper.getPartClasses('node-disabled'));
            }
            html += '<li data-index="' + i + '"' + ' class="' + classes.join(' ') + '">';
            html += this.control.getItemHTML(this.control.datasource[i]);
        }
        element.innerHTML = html;
    };
    CommandMenuLayer.prototype.initBehavior = function (element) {
        this.control.helper.addDOMEvent(element, 'click', selectItem);
    };
    function CommandMenu() {
        Control.apply(this, arguments);
        this.layer = new CommandMenuLayer(this);
    }
    CommandMenu.prototype.type = 'CommandMenu';
    CommandMenu.prototype.itemTemplate = '<span>${text}</span>';
    CommandMenu.prototype.getItemHTML = function (item) {
        var data = { text: u.escape(item.text) };
        return lib.format(this.itemTemplate, data);
    };
    CommandMenu.prototype.initEvents = function () {
        this.helper.addDOMEvent(this.main, 'click', u.bind(this.layer.toggle, this.layer));
    };
    var paint = require('./painters');
    CommandMenu.prototype.repaint = paint.createRepaint(Control.prototype.repaint, paint.style('width'), paint.style('height'), {
        name: 'datasource',
        paint: function (menu) {
            menu.layer.repaint();
        }
    }, paint.text('displayText'), {
        name: [
            'disabled',
            'hidden',
            'readOnly'
        ],
        paint: function (menu, disabled, hidden, readOnly) {
            if (disabled || hidden || readOnly) {
                menu.layer.hide();
            }
        }
    });
    CommandMenu.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        if (this.layer) {
            this.layer.dispose();
            this.layer = null;
        }
        Control.prototype.dispose.apply(this, arguments);
    };
    lib.inherits(CommandMenu, Control);
    require('./main').register(CommandMenu);
    return CommandMenu;
});

define('esui/CheckBox', [
    'require',
    'underscore',
    './lib',
    './InputControl',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    function syncChecked(e) {
        var checked = lib.g(this.boxId).checked;
        this.setProperties({ checked: checked });
    }
    function CheckBox() {
        InputControl.apply(this, arguments);
    }
    CheckBox.prototype = {
        type: 'CheckBox',
        createMain: function () {
            return document.createElement('label');
        },
        getCategory: function () {
            return 'check';
        },
        initOptions: function (options) {
            var properties = {
                value: this.main.value || 'on',
                checked: this.main.checked || false
            };
            u.extend(properties, options);
            properties.name = properties.name || this.main.getAttribute('name');
            var datasource = properties.datasource;
            delete properties.datasource;
            this.setProperties(properties);
            if (datasource != null) {
                if (u.isArray(datasource)) {
                    this.checked = u.any(datasource, function (item) {
                        return item.value == this.value;
                    }, this);
                } else if (this.rawValue == datasource) {
                    this.checked = true;
                }
            }
            if (!this.title) {
                this.title = this.main.title || (this.getValue() === 'on' ? '' : this.getValue());
            }
        },
        initStructure: function () {
            if (this.main.nodeName.toLowerCase() === 'input') {
                this.boxId = this.main.id || this.helper.getId('box');
                this.helper.replaceMain();
                this.main.id = this.helper.getId();
            } else {
                this.boxId = this.helper.getId('box');
            }
            var html = '<input type="checkbox" name="${name}" id="${id}" />' + '<span id="${textId}"></span>';
            this.main.innerHTML = lib.format(html, {
                name: this.name,
                id: this.boxId,
                textId: this.helper.getId('text')
            });
        },
        initEvents: function () {
            var box = lib.g(this.boxId);
            this.helper.addDOMEvent(box, 'click', function (e) {
                this.fire('click');
                if (!box.addEventListener) {
                    syncChecked.call(this, e);
                }
            });
            if (box.addEventListener) {
                this.helper.addDOMEvent(box, 'change', syncChecked);
            }
        },
        setProperties: function (properties) {
            var changes = InputControl.prototype.setProperties.apply(this, arguments);
            if (changes.hasOwnProperty('checked')) {
                this.fire('change');
            }
        },
        getFocusTarget: function () {
            var box = lib.g(this.boxId);
            return box;
        },
        updateTitle: function (title) {
            this.title = title;
            title = u.escape(title);
            this.helper.getPart('text').innerHTML = title;
            lib.setAttribute(this.boxId, 'title', title);
        },
        repaint: require('./painters').createRepaint(InputControl.prototype.repaint, {
            name: [
                'rawValue',
                'checked'
            ],
            paint: function (box, rawValue, checked) {
                var value = box.stringifyValue(rawValue);
                var box = lib.g(box.boxId);
                box.value = value;
                box.checked = checked;
            }
        }, {
            name: [
                'disabled',
                'readOnly'
            ],
            paint: function (box, disabled, readOnly) {
                var box = lib.g(box.boxId);
                box.disabled = disabled;
                box.readOnly = readOnly;
            }
        }, {
            name: 'title',
            paint: function (box, title) {
                box.updateTitle(title);
            }
        }),
        setChecked: function (checked) {
            this.setProperties({ checked: checked });
        },
        isChecked: function () {
            if (this.helper.isInStage('RENDERED')) {
                var box = lib.g(this.boxId);
                return box.checked;
            } else {
                return this.checked;
            }
        }
    };
    lib.inherits(CheckBox, InputControl);
    require('./main').register(CheckBox);
    return CheckBox;
});

define('esui/ControlCollection', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    function ControlCollection() {
        this.length = 0;
    }
    ControlCollection.prototype.splice = Array.prototype.splice;
    ControlCollection.prototype.add = function (control) {
        var index = u.indexOf(this, control);
        if (index < 0) {
            [].push.call(this, control);
        }
    };
    ControlCollection.prototype.remove = function (control) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === control) {
                [].splice.call(this, i, 1);
                return;
            }
        }
    };
    ControlCollection.prototype.each = function (iterator, thisObject) {
        u.each(this, function (control, i) {
            iterator.call(thisObject || control, control, i, this);
        });
    };
    ControlCollection.prototype.invoke = function (methodName) {
        var args = [this];
        args.push.apply(args, arguments);
        return u.invoke.apply(u, args);
    };
    u.each([
        'enable',
        'disable',
        'setDisabled',
        'show',
        'hide',
        'toggle',
        'addChild',
        'removeChild',
        'set',
        'setProperties',
        'addState',
        'removeState',
        'toggleState',
        'on',
        'off',
        'fire',
        'dispose',
        'destroy',
        'setViewContext',
        'render',
        'repaint',
        'appendTo',
        'insertBefore'
    ], function (method) {
        ControlCollection.prototype[method] = function () {
            var args = [method];
            args.push.apply(args, arguments);
            var result = this.invoke.apply(this, args);
            return result && result[0];
        };
    });
    u.each([
        'isDisabled',
        'isHidden',
        'hasState',
        'get',
        'getCategory',
        'getChild',
        'getChildSafely'
    ], function (method) {
        ControlCollection.prototype[method] = function () {
            var first = this[0];
            return first ? first[method].apply(first, arguments) : undefined;
        };
    });
    return ControlCollection;
});

define('esui/ViewContext', [
    'require',
    './ControlCollection',
    './lib',
    './SafeWrapper'
], function (require) {
    var ControlCollection = require('./ControlCollection');
    function ControlGroup(name) {
        ControlCollection.apply(this, arguments);
        this.name = name;
    }
    require('./lib').inherits(ControlGroup, ControlCollection);
    ControlGroup.prototype.add = undefined;
    ControlGroup.prototype.remove = undefined;
    ControlGroup.prototype.disposeGroup = function () {
        for (var i = 0; i < this.length; i++) {
            delete this[i];
        }
        this.length = 0;
    };
    function addToGroup(control, group) {
        ControlCollection.prototype.add.call(group, control);
    }
    function removeFromGroup(control, group) {
        ControlCollection.prototype.remove.call(group, control);
    }
    function getGroupNames(control) {
        var group = control.get('group');
        return group ? group.split(/[\t\r\n ]/) : [];
    }
    var counter = 8587523;
    function getGUID() {
        return 'vt' + counter++;
    }
    var pool = {};
    function ViewContext(id) {
        this.controls = {};
        this.groups = {};
        id = id || getGUID();
        if (pool.hasOwnProperty(id)) {
            var i = 1;
            var prefix = id + '-';
            while (pool.hasOwnProperty(prefix + i)) {
                i++;
            }
            id = prefix + i;
        }
        this.id = id;
        pool[this.id] = this;
    }
    ViewContext.get = function (id) {
        return pool[id] || null;
    };
    ViewContext.prototype.add = function (control) {
        var exists = this.controls[control.id];
        if (exists) {
            if (exists === control) {
                return;
            }
            exists.setViewContext(null);
        }
        this.controls[control.id] = control;
        var groups = getGroupNames(control);
        for (var i = 0; i < groups.length; i++) {
            var groupName = groups[i];
            if (!groupName) {
                continue;
            }
            var group = this.getGroup(groupName);
            addToGroup(control, group);
        }
        control.setViewContext(this);
    };
    ViewContext.prototype.remove = function (control) {
        delete this.controls[control.id];
        var groups = getGroupNames(control);
        for (var i = 0; i < groups.length; i++) {
            var groupName = groups[i];
            if (!groupName) {
                continue;
            }
            var group = this.getGroup(groupName);
            removeFromGroup(control, group);
        }
        control.setViewContext(null);
    };
    ViewContext.prototype.get = function (id) {
        return this.controls[id];
    };
    ViewContext.prototype.getControls = function () {
        return require('./lib').extend({}, this.controls);
    };
    var SafeWrapper = require('./SafeWrapper');
    ViewContext.prototype.getSafely = function (id) {
        var control = this.get(id);
        if (!control) {
            control = new SafeWrapper();
            control.id = id;
            control.viewContext = this;
        }
        return control;
    };
    ViewContext.prototype.getGroup = function (name) {
        if (!name) {
            throw new Error('name is unspecified');
        }
        var group = this.groups[name];
        if (!group) {
            group = this.groups[name] = new ControlGroup(name);
        }
        return group;
    };
    ViewContext.prototype.clean = function () {
        for (var id in this.controls) {
            if (this.controls.hasOwnProperty(id)) {
                var control = this.controls[id];
                control.dispose();
                if (control.viewContext && control.viewContext === this) {
                    this.remove(control);
                }
            }
        }
        for (var name in this.groups) {
            if (this.groups.hasOwnProperty(name)) {
                this.groups[name].disposeGroup();
                this.groups[name] = undefined;
            }
        }
    };
    ViewContext.prototype.dispose = function () {
        this.clean();
        delete pool[this.id];
    };
    return ViewContext;
});

define('esui/main', [
    'require',
    './lib',
    './ViewContext',
    './ControlCollection'
], function (require) {
    var lib = require('./lib');
    var main = {};
    main.version = '3.1.0-beta.6';
    var ViewContext = require('./ViewContext');
    var defaultViewContext = new ViewContext('default');
    main.getViewContext = function () {
        return defaultViewContext;
    };
    var config = {
        uiPrefix: 'data-ui',
        extensionPrefix: 'data-ui-extension',
        customElementPrefix: 'esui',
        instanceAttr: 'data-ctrl-id',
        viewContextAttr: 'data-ctrl-view-context',
        uiClassPrefix: 'ui',
        skinClassPrefix: 'skin',
        stateClassPrefix: 'state'
    };
    main.config = function (info) {
        lib.extend(config, info);
    };
    main.getConfig = function (name) {
        return config[name];
    };
    main.parseAttribute = function (source, valueReplacer) {
        if (!source) {
            return {};
        }
        var result = {};
        var lastStop = 0;
        var cursor = 0;
        while (cursor < source.length) {
            while (cursor < source.length && source.charAt(cursor) !== ':') {
                cursor++;
            }
            if (cursor >= source.length) {
                break;
            }
            var key = lib.trim(source.slice(lastStop, cursor));
            cursor++;
            lastStop = cursor;
            while (cursor < source.length && source.charAt(cursor) !== ';') {
                cursor++;
            }
            var lookAheadIndex = cursor + 1;
            while (lookAheadIndex < source.length) {
                var ch = source.charAt(lookAheadIndex);
                if (ch === ';') {
                    cursor = lookAheadIndex;
                }
                if (ch === ':') {
                    break;
                }
                lookAheadIndex++;
            }
            var value = lib.trim(source.slice(lastStop, cursor));
            result[key] = valueReplacer ? valueReplacer(value) : value;
            cursor++;
            lastStop = cursor;
        }
        return result;
    };
    main.getControlByDOM = function (dom) {
        if (!dom) {
            return null;
        }
        var getConf = main.getConfig;
        var controlId = dom.getAttribute(getConf('instanceAttr'));
        var viewContextId = dom.getAttribute(getConf('viewContextAttr'));
        var viewContext;
        if (controlId && viewContextId && (viewContext = ViewContext.get(viewContextId))) {
            return viewContext.get(controlId);
        }
        return null;
    };
    function registerClass(classFunc, container) {
        if (typeof classFunc === 'function') {
            var type = classFunc.prototype.type;
            if (type in container) {
                throw new Error(type + ' is exists!');
            }
            container[type] = classFunc;
        }
    }
    function createInstance(type, options, container) {
        var Constructor = container[type];
        if (Constructor) {
            delete options.type;
            return new Constructor(options);
        }
        return null;
    }
    var controlClasses = {};
    main.register = function (controlClass) {
        registerClass(controlClass, controlClasses);
    };
    main.create = function (type, options) {
        return createInstance(type, options, controlClasses);
    };
    main.get = function (id) {
        return defaultViewContext.get(id);
    };
    main.getSafely = function (id) {
        return defaultViewContext.getSafely(id);
    };
    var ControlCollection = require('./ControlCollection');
    main.wrap = function () {
        var collection = new ControlCollection();
        for (var i = 0; i < arguments.length; i++) {
            collection.add(arguments[i]);
        }
        return collection;
    };
    main.init = function (wrap, options) {
        wrap = wrap || document.body;
        options = options || {};
        var valueReplacer = options.valueReplacer || function (value) {
            return value;
        };
        function joinCamelCase(source) {
            function replacer(c) {
                return c.toUpperCase();
            }
            for (var i = 1, len = source.length; i < len; i++) {
                source[i] = source[i].replace(/^[a-z]/, replacer);
            }
            return source.join('');
        }
        function noOverrideExtend(target, source) {
            for (var key in source) {
                if (!(key in target)) {
                    target[key] = source[key];
                }
            }
        }
        function extendToOption(optionObject, terms, value) {
            if (terms.length === 0) {
                noOverrideExtend(optionObject, main.parseAttribute(value, valueReplacer));
            } else {
                optionObject[joinCamelCase(terms)] = valueReplacer(value);
            }
        }
        var rawElements = wrap.getElementsByTagName('*');
        var elements = [];
        for (var i = 0, len = rawElements.length; i < len; i++) {
            if (rawElements[i].nodeType === 1) {
                elements.push(rawElements[i]);
            }
        }
        var uiPrefix = main.getConfig('uiPrefix');
        var extPrefix = main.getConfig('extensionPrefix');
        var customElementPrefix = main.getConfig('customElementPrefix');
        var uiPrefixLen = uiPrefix.length;
        var extPrefixLen = extPrefix.length;
        var properties = options.properties || {};
        var controls = [];
        for (var i = 0, len = elements.length; i < len; i++) {
            var element = elements[i];
            if (element.getAttribute(config.instanceAttr)) {
                continue;
            }
            var attributes = element.attributes;
            var controlOptions = {};
            var extensionOptions = {};
            for (var j = 0, attrLen = attributes.length; j < attrLen; j++) {
                var attribute = attributes[j];
                var name = attribute.name;
                var value = attribute.value;
                if (name.indexOf(extPrefix) === 0) {
                    var terms = name.slice(extPrefixLen + 1).split('-');
                    var extKey = terms[0];
                    terms.shift();
                    var extOption = extensionOptions[extKey];
                    if (!extOption) {
                        extOption = extensionOptions[extKey] = {};
                    }
                    extendToOption(extOption, terms, value);
                } else if (name.indexOf(uiPrefix) === 0) {
                    var terms = name.length === uiPrefixLen ? [] : name.slice(uiPrefixLen + 1).split('-');
                    extendToOption(controlOptions, terms, value);
                }
            }
            var type = controlOptions.type;
            if (!type) {
                var nodeName = element.nodeName.toLowerCase();
                var esuiPrefixIndex = nodeName.indexOf(customElementPrefix);
                if (esuiPrefixIndex === 0) {
                    var typeFromCustomElement;
                    typeFromCustomElement = nodeName.replace(/-(\S)/g, function (match, ch) {
                        return ch.toUpperCase();
                    });
                    typeFromCustomElement = typeFromCustomElement.slice(customElementPrefix.length);
                    controlOptions.type = typeFromCustomElement;
                    type = typeFromCustomElement;
                }
            }
            if (type) {
                var controlId = controlOptions.id;
                var customOptions = controlId ? properties[controlId] : {};
                for (var key in customOptions) {
                    controlOptions[key] = valueReplacer(customOptions[key]);
                }
                var extensions = controlOptions.extensions || [];
                controlOptions.extensions = extensions;
                for (var key in extensionOptions) {
                    var extOption = extensionOptions[key];
                    var extension = main.createExtension(extOption.type, extOption);
                    extension && extensions.push(extension);
                }
                controlOptions.viewContext = options.viewContext;
                controlOptions.renderOptions = options;
                controlOptions.main = element;
                var control = main.create(type, controlOptions);
                if (control) {
                    controls.push(control);
                    if (options.parent) {
                        options.parent.addChild(control);
                    }
                    try {
                        control.render();
                    } catch (ex) {
                        var error = new Error('Render control ' + '"' + (control.id || 'anonymous') + '" ' + 'of type ' + control.type + ' ' + 'failed because: ' + ex.message);
                        error.actualError = ex;
                        throw error;
                    }
                }
            }
        }
        return controls;
    };
    var extensionClasses = {};
    main.registerExtension = function (extensionClass) {
        registerClass(extensionClass, extensionClasses);
    };
    main.createExtension = function (type, options) {
        return createInstance(type, options, extensionClasses);
    };
    var globalExtensionOptions = {};
    main.attachExtension = function (type, options) {
        globalExtensionOptions[type] = options;
    };
    main.createGlobalExtensions = function () {
        var options = globalExtensionOptions;
        var extensions = [];
        for (type in globalExtensionOptions) {
            if (globalExtensionOptions.hasOwnProperty(type)) {
                var extension = main.createExtension(type, globalExtensionOptions[type]);
                extension && extensions.push(extension);
            }
        }
        return extensions;
    };
    var ruleClasses = [];
    main.registerRule = function (ruleClass, priority) {
        ruleClasses.push({
            type: ruleClass,
            priority: priority
        });
        ruleClasses.sort(function (x, y) {
            return x.priority - y.priority;
        });
    };
    main.createRulesByControl = function (control) {
        var rules = [];
        for (var i = 0; i < ruleClasses.length; i++) {
            var RuleClass = ruleClasses[i].type;
            if (control.get(RuleClass.prototype.type) != null) {
                rules.push(new RuleClass());
            }
        }
        return rules;
    };
    return main;
});

define('esui/helper/children', [
    'require',
    'underscore',
    '../main'
], function (require) {
    var u = require('underscore');
    var ui = require('../main');
    var helper = {};
    helper.initChildren = function (wrap, options) {
        wrap = wrap || this.control.main;
        options = u.extend({}, this.control.renderOptions, options);
        options.viewContext = this.control.viewContext;
        options.parent = this.control;
        ui.init(wrap, options);
    };
    helper.disposeChildren = function () {
        var children = this.control.children.slice();
        u.each(children, function (child) {
            child.dispose();
        });
        this.children = [];
        this.childrenIndex = {};
    };
    helper.disableChildren = function () {
        u.each(this.control.children, function (child) {
            child.disable();
        });
    };
    helper.enableChildren = function () {
        u.each(this.control.children, function (child) {
            child.enable();
        });
    };
    return helper;
});

define('esui/Helper', [
    'require',
    'underscore',
    './helper/children',
    './helper/dom',
    './helper/event',
    './helper/html',
    './helper/life',
    './helper/template'
], function (require) {
    var u = require('underscore');
    function Helper(control) {
        this.control = control;
    }
    u.extend(Helper.prototype, require('./helper/children'), require('./helper/dom'), require('./helper/event'), require('./helper/html'), require('./helper/life'), require('./helper/template'));
    return Helper;
});

define('esui/controlHelper', [
    'require',
    './lib',
    './Helper',
    './painters',
    'underscore',
    './Layer'
], function (require) {
    var lib = require('./lib');
    var Helper = require('./Helper');
    var helper = {};
    helper.getGUID = lib.getGUID;
    var methods = [
        'initViewContext',
        'initExtensions',
        'isInStage',
        'changeStage',
        'dispose',
        'beforeDispose',
        'afterDispose',
        'getPartClasses',
        'addPartClasses',
        'removePartClasses',
        'getStateClasses',
        'addStateClasses',
        'removeStateClasses',
        'getId',
        'replaceMain',
        'addDOMEvent',
        'removeDOMEvent',
        'clearDOMEvents'
    ];
    helper.createRepaint = require('./painters').createRepaint;
    require('underscore').each(methods, function (name) {
        helper[name] = function (control) {
            var helper = control.helper || new Helper(control);
            var args = [].slice.call(arguments, 1);
            return helper[name].apply(helper, args);
        };
    });
    helper.extractValueFromInput = function (control, options) {
        var main = control.main;
        if (lib.isInput(main)) {
            if (main.value && !options.value) {
                options.value = main.value;
            }
            if (main.name && !options.name) {
                options.name = main.name;
            }
            if (main.disabled && (options.disabled === null || options.disabled === undefined)) {
                options.disabled = main.disabled;
            }
            if (main.readOnly && (options.readOnly === null || options.readOnly === undefined)) {
                options.readOnly = main.readonly || main.readOnly;
            }
        }
    };
    var layer = helper.layer = {};
    var Layer = require('./Layer');
    layer.create = Layer.create;
    layer.getZIndex = Layer.getZIndex;
    layer.moveToTop = Layer.moveToTop;
    layer.moveTo = Layer.moveTo;
    layer.resize = Layer.resize;
    layer.attachTo = Layer.attachTo;
    layer.centerToView = Layer.centerToView;
    return helper;
});

define('esui/InputControl', [
    'require',
    './lib',
    './controlHelper',
    './Control',
    './Validity',
    './validator/Validity',
    './main'
], function (require) {
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var Control = require('./Control');
    var ValidityLabel = require('./Validity');
    var Validity = require('./validator/Validity');
    var main = require('./main');
    function InputControl(options) {
        options = options ? lib.extend({}, options) : {};
        if (options.main && !options.name) {
            options.name = options.main.getAttribute('name');
        }
        Control.call(this, options);
    }
    InputControl.prototype = {
        constructor: InputControl,
        ignoreStates: Control.prototype.ignoreStates.concat('read-only'),
        getCategory: function () {
            return 'input';
        },
        getFocusTarget: function () {
            return null;
        },
        getValue: function () {
            return this.stringifyValue(this.getRawValue());
        },
        setValue: function (value) {
            var rawValue = this.parseValue(value);
            this.setRawValue(rawValue);
        },
        getRawValue: function () {
            return this.rawValue;
        },
        setRawValue: function (rawValue) {
            this.setProperties({ rawValue: rawValue });
        },
        setProperties: function (properties) {
            var value = properties.value;
            delete properties.value;
            if (value != null && properties.rawValue == null) {
                properties.rawValue = this.parseValue(value);
            }
            if (this.hasOwnProperty('readOnly')) {
                this.readOnly = !!this.readOnly;
            }
            return Control.prototype.setProperties.call(this, properties);
        },
        repaint: helper.createRepaint(Control.prototype.repaint, {
            name: 'disabled',
            paint: function (control, value) {
                var nodeName = control.main.nodeName.toLowerCase();
                if (nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea') {
                    control.main.disabled = value;
                }
            }
        }, {
            name: 'readOnly',
            paint: function (control, value) {
                var method = value ? 'addState' : 'removeState';
                control[method]('read-only');
                var nodeName = control.main.nodeName.toLowerCase();
                if (nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea') {
                    control.main.readOnly = value;
                }
            }
        }, {
            name: 'hidden',
            paint: function (control, hidden) {
                var validityLabel = control.getValidityLabel(true);
                if (validityLabel) {
                    var classPrefix = main.getConfig('uiClassPrefix');
                    var classes = [].concat(classPrefix + '-hidden', classPrefix + '-validity-hidden', helper.getPartClasses(control, 'validity-hidden'));
                    var method = control.isHidden() ? 'addClasses' : 'removeClasses';
                    lib[method](validityLabel, classes);
                }
            }
        }),
        stringifyValue: function (rawValue) {
            return rawValue != null ? rawValue + '' : '';
        },
        parseValue: function (value) {
            return value;
        },
        setReadOnly: function (readOnly) {
            readOnly = !!readOnly;
            this[readOnly ? 'addState' : 'removeState']('read-only');
        },
        isReadOnly: function () {
            return this.hasState('read-only');
        },
        getValidationResult: function () {
            var validity = new Validity();
            var eventArg = { validity: validity };
            eventArg = this.fire('beforevalidate', eventArg);
            var rules = main.createRulesByControl(this);
            for (var i = 0, len = rules.length; i < len; i++) {
                var rule = rules[i];
                validity.addState(rule.getName(), rule.check(this.getValue(), this));
            }
            if (!validity.isValid()) {
                eventArg = this.fire('invalid', eventArg);
            }
            this.fire('aftervalidate', eventArg);
            return validity;
        },
        checkValidity: function () {
            var validity = this.getValidationResult();
            return validity.isValid();
        },
        validate: function () {
            var validity = this.getValidationResult();
            this.showValidity(validity);
            return validity.isValid();
        },
        getValidityLabel: function (dontCreate) {
            if (!helper.isInStage(this, 'RENDERED')) {
                return null;
            }
            var label = this.validityLabel && this.viewContext.get(this.validityLabel);
            if (!label && !dontCreate) {
                var options = {
                    id: this.id + '-validity',
                    viewContext: this.viewContext
                };
                label = new ValidityLabel(options);
                if (this.main.nextSibling) {
                    var nextSibling = this.main.nextSibling;
                    label.insertBefore(nextSibling);
                } else {
                    label.appendTo(this.main.parentNode);
                }
                this.validityLabel = label.id;
            }
            if ((lib.ie === 8 || lib.ie === 7) && label) {
                lib.toggleClass(label.main.parentNode, 'fuck-the-ie');
            }
            return label;
        },
        showValidity: function (validity) {
            if (this.validity) {
                this.removeState('validity-' + this.validity.getValidState());
            }
            this.validity = validity;
            this.addState('validity-' + validity.getValidState());
            var label = this.getValidityLabel();
            if (!label) {
                return;
            }
            var properties = {
                target: this,
                focusTarget: this.getFocusTarget(),
                validity: validity
            };
            label.setProperties(properties);
        },
        hideValidity: function () {
            var validity = new Validity();
            this.showValidity(validity);
        },
        showValidationMessage: function (validState, message) {
            message = message || '';
            var validity = new Validity();
            validity.setCustomValidState(validState);
            validity.setCustomMessage(message);
            this.showValidity(validity);
        },
        dispose: function () {
            if (helper.isInStage(this, 'DISPOSED')) {
                return;
            }
            var validityLabel = this.getValidityLabel(true);
            if (validityLabel) {
                validityLabel.dispose();
            }
            Control.prototype.dispose.apply(this, arguments);
        }
    };
    lib.inherits(InputControl, Control);
    return InputControl;
});

define('esui/Select', [
    'require',
    'underscore',
    './lib',
    './InputControl',
    './Layer',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    var Layer = require('./Layer');
    function selectValue(e) {
        var target = lib.event.getTarget(e);
        var layer = this.layer.getElement();
        while (target && target !== layer && !lib.hasAttribute(target, 'data-index')) {
            target = target.parentNode;
        }
        if (target && !this.helper.isPart(target, 'item-disabled')) {
            var index = target.getAttribute('data-index');
            this.set('selectedIndex', +index);
            this.layer.hide();
        }
    }
    function SelectLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(SelectLayer, Layer);
    SelectLayer.prototype.nodeName = 'ol';
    SelectLayer.prototype.render = function (element) {
        var html = '';
        for (var i = 0; i < this.control.datasource.length; i++) {
            var item = this.control.datasource[i];
            var classes = this.control.helper.getPartClasses('item');
            if (item.disabled) {
                classes.push.apply(classes, this.control.helper.getPartClasses('item-disabled'));
            }
            html += '<li data-index="' + i + '" ' + 'class="' + classes.join(' ') + '">';
            html += this.control.getItemHTML(item);
            html += '</li>';
        }
        element.innerHTML = html;
    };
    SelectLayer.prototype.initBehavior = function (element) {
        this.control.helper.addDOMEvent(element, 'click', selectValue);
    };
    SelectLayer.prototype.syncState = function (element) {
        var classes = this.control.helper.getPartClasses('item-selected');
        var items = lib.getChildren(element);
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if (i === this.control.selectedIndex) {
                lib.addClasses(item, classes);
            } else {
                lib.removeClasses(item, classes);
            }
        }
    };
    SelectLayer.prototype.dock = { strictWidth: true };
    function Select(options) {
        InputControl.apply(this, arguments);
        this.layer = new SelectLayer(this);
    }
    Select.prototype.type = 'Select';
    function adjustValueProperties(context) {
        if (context.selectedIndex == null && context.rawValue == null && context.value == null) {
            context.selectedIndex = -1;
        }
        if (context.rawValue != null) {
            context.value = null;
            context.selectedIndex = null;
        } else if (context.value != null) {
            context.selectedIndex = null;
        }
        if (context.selectedIndex == null && (context.value != null || context.rawValue != null)) {
            context.selectedIndex = -1;
            var value = context.rawValue || context.value;
            for (var i = 0; i < context.datasource.length; i++) {
                if (context.datasource[i].value == value) {
                    context.selectedIndex = i;
                    break;
                }
            }
            delete context.value;
            delete context.rawValue;
        }
        if (context.selectedIndex < 0 || context.selectedIndex >= context.datasource.length) {
            if (context.emptyText) {
                context.selectedIndex = -1;
            } else {
                context.selectedIndex = -1;
                for (var i = 0; i < context.datasource.length; i++) {
                    if (!context.datasource[i].disabled) {
                        context.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    }
    Select.prototype.initOptions = function (options) {
        var defaults = { datasource: [] };
        var properties = {};
        u.extend(properties, defaults, options);
        if (this.main.nodeName.toLowerCase() === 'select') {
            properties.datasource = [];
            var elements = this.main.getElementsByTagName('option');
            for (var i = 0, length = elements.length; i < length; i++) {
                var item = elements[i];
                var dataItem = {
                    name: item.name || item.text,
                    value: item.value
                };
                if (item.disabled) {
                    dataItem.disabled = true;
                }
                properties.datasource.push(dataItem);
                if (item.selected && properties.selectedIndex == null && properties.value == null && properties.rawValue == null) {
                    properties.selectedIndex = item.value ? i : 0;
                }
            }
            this.helper.extractOptionsFromInput(this.main, properties);
        }
        if (typeof properties.selectedIndex === 'string') {
            properties.selectedIndex = +properties.selectedIndex;
        }
        this.setProperties(properties);
    };
    Select.prototype.itemTemplate = '<span>${text}</span>';
    Select.prototype.getItemHTML = function (item) {
        var data = {
            text: u.escape(item.name || item.text),
            value: u.escape(item.value)
        };
        return lib.format(this.itemTemplate, data);
    };
    Select.prototype.displayTemplate = '${text}';
    Select.prototype.getDisplayHTML = function (item) {
        if (!item) {
            return u.escape(this.emptyText || '');
        }
        var data = {
            text: u.escape(item.name || item.text),
            value: u.escape(item.value)
        };
        return lib.format(this.displayTemplate, data);
    };
    Select.prototype.initStructure = function () {
        if (this.main.nodeName.toLowerCase() === 'select') {
            this.helper.replaceMain();
        }
        this.main.tabIndex = 0;
        this.main.innerHTML = this.helper.getPartHTML('text', 'span');
    };
    Select.prototype.initEvents = function () {
        this.helper.addDOMEvent(this.main, 'click', u.bind(this.layer.toggle, this.layer));
        this.layer.on('rendered', u.bind(addLayerClass, this));
    };
    function addLayerClass() {
        this.fire('layerrendered', { layer: this.layer });
    }
    function updateValue(select) {
        var textHolder = select.helper.getPart('text');
        var selectedItem = select.selectedIndex === -1 ? null : select.datasource[select.selectedIndex];
        textHolder.innerHTML = select.getDisplayHTML(selectedItem);
        var layerElement = select.layer.getElement(false);
        if (layerElement) {
            select.layer.syncState(layerElement);
        }
    }
    Select.prototype.getRawValue = function () {
        if (this.selectedIndex < 0) {
            return null;
        }
        var item = this.datasource[this.selectedIndex];
        return item ? item.value : null;
    };
    var paint = require('./painters');
    Select.prototype.repaint = paint.createRepaint(InputControl.prototype.repaint, paint.style('width'), paint.style('height'), {
        name: 'datasource',
        paint: function (select) {
            select.layer.repaint();
        }
    }, {
        name: [
            'selectedIndex',
            'emptyText',
            'datasource'
        ],
        paint: updateValue
    }, {
        name: [
            'disabled',
            'hidden',
            'readOnly'
        ],
        paint: function (select, disabled, hidden, readOnly) {
            if (disabled || hidden || readOnly) {
                select.layer.hide();
            }
        }
    });
    Select.prototype.updateDatasource = function (datasource) {
        if (!datasource) {
            datasource = this.datasource;
        }
        this.datasource = datasource;
        var record = { name: 'datasource' };
        this.repaint([record], { datasource: record });
    };
    Select.prototype.setProperties = function (properties) {
        if (properties.datasource == null) {
            properties.datasource = this.datasource;
        }
        if (properties.value == null && properties.rawValue == null && properties.selectedIndex == null && properties.datasource === this.datasource) {
            properties.selectedIndex = this.selectedIndex;
        }
        if (!properties.hasOwnProperty('emptyText')) {
            properties.emptyText = this.emptyText;
        }
        adjustValueProperties(properties);
        var changes = InputControl.prototype.setProperties.apply(this, arguments);
        if (changes.hasOwnProperty('selectedIndex')) {
            this.fire('change');
        }
        return changes;
    };
    Select.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }
        if (this.layer) {
            this.layer.dispose();
            this.layer = null;
        }
        InputControl.prototype.dispose.apply(this, arguments);
    };
    Select.prototype.getSelectedItem = function () {
        return this.get('datasource')[this.get('selectedIndex')];
    };
    lib.inherits(Select, InputControl);
    require('./main').register(Select);
    return Select;
});

define('esui/MonthView', [
    'require',
    './Button',
    './Select',
    './Panel',
    './lib',
    './controlHelper',
    './Control',
    './main',
    'moment'
], function (require) {
    require('./Button');
    require('./Select');
    require('./Panel');
    var lib = require('./lib');
    var helper = require('./controlHelper');
    var Control = require('./Control');
    var ui = require('./main');
    var m = require('moment');
    function MonthView(options) {
        Control.apply(this, arguments);
    }
    function getYearOptions(monthView) {
        var range = monthView.viewRange || monthView.range;
        var ds = [];
        var end = range.end.getFullYear();
        for (var i = range.begin.getFullYear(); i <= end; i++) {
            ds.push({
                text: i,
                value: i
            });
        }
        return ds;
    }
    function getMonthOptions(monthView, year) {
        var range = monthView.viewRange || monthView.range;
        var ds = [];
        var len = 11;
        var i = 0;
        if (year === range.begin.getFullYear()) {
            i = range.begin.getMonth();
        }
        if (year === range.end.getFullYear()) {
            len = range.end.getMonth();
        }
        for (; i <= len; i++) {
            ds.push({
                text: i + 1,
                value: i
            });
        }
        return ds;
    }
    function getMainHTML(monthView) {
        var tpl = [
            '<div class="${headClass}"><table><tr>',
            '<td width="40" align="left">',
            '<div class="${monthBackClass}"',
            ' data-ui-type="Button"',
            ' data-ui-child-name="monthBack"',
            ' data-ui-id="${monthBackId}"',
            '></div>',
            '</td>',
            '<td>',
            '<div class="${yearSelectClass}"',
            ' data-ui="type:Select;childName:yearSel;',
            ' id:${yearSelId};"></div>',
            '</td>',
            '<td>',
            '<div class="${monthSelectClass}"',
            ' data-ui="type:Select;childName:monthSel;',
            ' id:${monthSelId};"></div>',
            '</td>',
            '<td width="40" align="right">',
            '<div class="${monthForClass}"',
            ' data-ui-type="Button"',
            ' data-ui-child-name="monthForward"',
            ' data-ui-id="${monthForwardId}"',
            '></div>',
            '</td>',
            '</tr></table></div>',
            '<div id="${monthMainId}" class="${monthMainClass}"></div>'
        ];
        tpl = tpl.join('');
        return lib.format(tpl, {
            headClass: monthView.helper.getPartClassName('head'),
            monthBackId: monthView.helper.getId('monthBack'),
            monthForwardId: monthView.helper.getId('monthForward'),
            yearSelId: monthView.helper.getId('yearSel'),
            monthSelId: monthView.helper.getId('monthSel'),
            monthMainId: monthView.helper.getId('monthMain'),
            monthMainClass: monthView.helper.getPartClassName('month'),
            monthBackClass: monthView.helper.getPartClassName('month-back'),
            monthForClass: monthView.helper.getPartClassName('month-forward'),
            yearSelectClass: monthView.helper.getPartClassName('year-select'),
            monthSelectClass: monthView.helper.getPartClassName('month-select')
        });
    }
    function getMonthMainHTML(monthView) {
        var titles = [];
        if (monthView.mode === 'multi') {
            titles.push('');
        }
        titles = titles.concat([
            '\u4E00',
            '\u4E8C',
            '\u4E09',
            '\u56DB',
            '\u4E94',
            '\u516D',
            '\u65E5'
        ]);
        var tplHead = '' + '<table border="0" cellpadding="0" cellspacing="0" ' + 'class="${className}"><thead><tr>';
        var html = [];
        html.push(lib.format(tplHead, { className: monthView.helper.getPartClassName('month-main') }));
        var tplHeadItem = '' + '<td id="${id}" data-index="${index}" class="${className}">' + '${text}</td>';
        var headItemClass = monthView.helper.getPartClassName('month-title');
        var headItemId = monthView.helper.getId('month-title');
        var emptyHeadItemClass = monthView.helper.getPartClassName('month-select-all');
        var tLen = titles.length;
        for (var tIndex = 0; tIndex < tLen; tIndex++) {
            html.push(lib.format(tplHeadItem, {
                className: titles[tIndex] === '' ? emptyHeadItemClass : headItemClass,
                text: titles[tIndex],
                index: tIndex,
                id: headItemId + '-' + tIndex
            }));
        }
        html.push('</tr></thead><tbody><tr>');
        var tplItem = '' + '<td data-year="${year}" data-month="${month}" ' + 'data-date="${date}" class="${className}" ' + 'id="${id}">${date}</td>';
        var rowSelectClass = monthView.helper.getPartClassName('month-row-select');
        var tplRowSelectId = monthView.helper.getId('row-select');
        var rowTagIndex = 0;
        var tplRowSelectTpl = '' + '<td id="${id}" class="' + rowSelectClass + '">&gt;</td>';
        var index = 0;
        var year = monthView.year;
        var month = monthView.month;
        var repeater = new Date(year, month, 1);
        var nextMonth = new Date(year, month + 1, 1);
        var begin = 1 - (repeater.getDay() + 6) % 7;
        repeater.setDate(begin);
        var itemClass = monthView.helper.getPartClassName('month-item');
        var todayClass = monthView.helper.getPartClassName('month-item-today');
        var virClass = monthView.helper.getPartClassName('month-item-virtual');
        var disabledClass = monthView.helper.getPartClassName('month-item-disabled');
        var range = monthView.range;
        if (monthView.mode === 'multi') {
            html.push(lib.format(tplRowSelectTpl, { 'id': tplRowSelectId + '-' + rowTagIndex++ }));
        }
        while (nextMonth - repeater > 0 || index % 7 !== 0) {
            if (begin > 1 && index % 7 === 0) {
                html.push('</tr><tr>');
                if (monthView.mode === 'multi') {
                    html.push(lib.format(tplRowSelectTpl, { 'id': tplRowSelectId + '-' + rowTagIndex++ }));
                }
            }
            var virtual = repeater.getMonth() !== month;
            var disabled = false;
            if (repeater < range.begin) {
                disabled = true;
            } else if (repeater > range.end) {
                disabled = true;
            }
            var currentClass = itemClass;
            if (virtual) {
                currentClass += ' ' + virClass;
            } else if (m().isSame(repeater, 'day')) {
                currentClass += ' ' + todayClass;
            }
            if (disabled) {
                currentClass += ' ' + disabledClass;
            }
            html.push(lib.format(tplItem, {
                year: repeater.getFullYear(),
                month: repeater.getMonth(),
                date: repeater.getDate(),
                className: currentClass,
                id: getItemId(monthView, repeater)
            }));
            repeater = new Date(year, month, ++begin);
            index++;
        }
        monthView.rowTagNum = rowTagIndex;
        html.push('</tr></tbody></table>');
        return html.join('');
    }
    function getItemId(monthView, date) {
        return monthView.helper.getId(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
    }
    function monthViewClick(e) {
        var tar = e.target || e.srcElement;
        var allSelectClasses = helper.getPartClasses(this, 'month-select-all');
        var headClasses = helper.getPartClasses(this, 'month-title');
        var itemClasses = helper.getPartClasses(this, 'month-item');
        var rowSelectClasses = helper.getPartClasses(this, 'month-row-select');
        var virClasses = helper.getPartClasses(this, 'month-item-virtual');
        var disabledClasses = helper.getPartClasses(this, 'month-item-disabled');
        while (tar && tar !== document.body) {
            if (lib.hasClass(tar, itemClasses[0]) && !lib.hasClass(tar, virClasses[0]) && !lib.hasClass(tar, disabledClasses[0])) {
                selectByItem(this, tar);
                return;
            } else if (this.mode === 'multi') {
                if (lib.hasClass(tar, rowSelectClasses[0])) {
                    selectByTagClick(this, tar);
                    return;
                }
                if (lib.hasClass(tar, headClasses[0])) {
                    selectByColumn(this, tar);
                    return;
                }
                if (lib.hasClass(tar, allSelectClasses[0])) {
                    selectAll(this);
                    return;
                }
            }
            tar = tar.parentNode;
        }
    }
    function parseToCache(monthView) {
        var rawValue = monthView.rawValue;
        monthView.viewValue = {};
        for (var i = 0; i < rawValue.length; i++) {
            var singleDay = rawValue[i];
            var year = singleDay.getFullYear();
            var month = singleDay.getMonth();
            var date = singleDay.getDate();
            var id = year + '-' + month + '-' + date;
            monthView.viewValue[id] = {
                isSelected: true,
                value: new Date(year, month, date)
            };
        }
    }
    function isItemSelectable(monthView, dateItem) {
        var virtualClasses = helper.getPartClasses(monthView, 'month-item-virtual');
        var disabledClasses = helper.getPartClasses(monthView, 'month-item-disabled');
        if (!lib.hasClass(dateItem, virtualClasses[0]) && !lib.hasClass(dateItem, disabledClasses[0])) {
            return 1;
        } else if (lib.hasClass(dateItem, virtualClasses[0]) && !lib.hasClass(dateItem, disabledClasses[0])) {
            return -1;
        }
        return 0;
    }
    function setRowTagSelected(monthView, rowTagItem, isSelected) {
        helper.removePartClasses(monthView, 'month-row-select-selected', rowTagItem);
        if (isSelected) {
            helper.addPartClasses(monthView, 'month-row-select-selected', rowTagItem);
        }
    }
    function batchRepaintRowTag(monthView) {
        var rowTagNum = monthView.rowTagNum;
        var rowTagId = helper.getId(monthView, 'row-select');
        for (var i = 0; i < rowTagNum; i++) {
            var rowTag = lib.g(rowTagId + '-' + i);
            repaintRowTag(monthView, rowTag);
        }
    }
    function repaintRowTag(monthView, rowTag) {
        var selectedClasses = helper.getPartClasses(monthView, 'month-item-selected');
        var dateItem = rowTag.nextSibling;
        var isAllSelected = true;
        var selectableNum = 0;
        while (dateItem) {
            if (isItemSelectable(monthView, dateItem) === 1) {
                ++selectableNum;
                if (!lib.hasClass(dateItem, selectedClasses[0])) {
                    isAllSelected = false;
                    break;
                }
            }
            dateItem = dateItem.nextSibling;
        }
        if (selectableNum === 0) {
            isAllSelected = false;
        }
        setRowTagSelected(monthView, rowTag, isAllSelected);
    }
    function selectByColumn(monthView, columnTag) {
        var index = columnTag.getAttribute('data-index');
        var columnSelectedClasses = helper.getPartClasses(monthView, 'month-title-selected');
        var selectAll = true;
        if (lib.hasClass(columnTag, columnSelectedClasses[0])) {
            selectAll = false;
            helper.removePartClasses(monthView, 'month-title-selected', columnTag);
        } else {
            helper.addPartClasses(monthView, 'month-title-selected', columnTag);
        }
        var rowTagNum = monthView.rowTagNum;
        var rowTagId = helper.getId(monthView, 'row-select');
        var viewValue = monthView.viewValue;
        var changedDates = [];
        for (var i = 0; i < rowTagNum; i++) {
            var rowTag = lib.g(rowTagId + '-' + i);
            var sibling = rowTag.parentNode.children[index];
            if (isItemSelectable(monthView, sibling) === 1) {
                var date = sibling.getAttribute('data-date');
                var month = sibling.getAttribute('data-month');
                var year = sibling.getAttribute('data-year');
                var id = year + '-' + month + '-' + date;
                viewValue[id] = {
                    isSelected: selectAll,
                    value: new Date(year, month, date)
                };
                changedDates.push(id);
            }
        }
        if (changedDates && changedDates.length > 0) {
            updateMultiRawValue(monthView);
            updateMultiSelectState(monthView, changedDates, selectAll);
            batchRepaintRowTag(monthView);
            repaintAllSelectTag(monthView);
        }
    }
    function setColumnTagSelected(monthView, columnTagItem, isSelected) {
        helper.removePartClasses(monthView, 'month-title-selected', columnTagItem);
        if (isSelected) {
            helper.addPartClasses(monthView, 'month-title-selected', columnTagItem);
        }
    }
    function batchRepaintColumnTag(monthView) {
        var headItemId = helper.getId(monthView, 'month-title');
        for (var i = 1; i <= 7; i++) {
            var columnTag = lib.g(headItemId + '-' + i);
            repaintColumnTag(monthView, columnTag);
        }
    }
    function repaintColumnTag(monthView, columnTagItem) {
        var selectedClasses = helper.getPartClasses(monthView, 'month-item-selected');
        var index = columnTagItem.getAttribute('data-index');
        var isAllSelected = true;
        var selectableNum = 0;
        var rowTagNum = monthView.rowTagNum;
        var rowTagId = helper.getId(monthView, 'row-select');
        for (var i = 0; i < rowTagNum; i++) {
            var rowTag = lib.g(rowTagId + '-' + i);
            var sibling = rowTag.parentNode.children[index];
            if (isItemSelectable(monthView, sibling) === 1) {
                ++selectableNum;
                if (!lib.hasClass(sibling, selectedClasses[0])) {
                    isAllSelected = false;
                    break;
                }
            }
        }
        if (selectableNum === 0) {
            isAllSelected = false;
        }
        setColumnTagSelected(monthView, columnTagItem, isAllSelected);
    }
    function selectByTagClick(monthView, rowTag) {
        var row = rowTag.parentNode;
        var rowSelectClasses = helper.getPartClasses(monthView, 'month-row-select');
        var rowSelectedClasses = helper.getPartClasses(monthView, 'month-row-select-selected');
        var virtualClasses = helper.getPartClasses(monthView, 'month-item-virtual');
        var disabledClasses = helper.getPartClasses(monthView, 'month-item-disabled');
        var selectAll = true;
        if (lib.hasClass(rowTag, rowSelectedClasses[0])) {
            selectAll = false;
            helper.removePartClasses(monthView, 'month-row-select-selected', rowTag);
        } else {
            helper.addPartClasses(monthView, 'month-row-select-selected', rowTag);
        }
        var children = row.children;
        var viewValue = monthView.viewValue;
        var changedDates = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType === 1 && !lib.hasClass(child, rowSelectClasses[0]) && !lib.hasClass(child, virtualClasses[0]) && !lib.hasClass(child, disabledClasses[0])) {
                var date = child.getAttribute('data-date');
                var month = child.getAttribute('data-month');
                var year = child.getAttribute('data-year');
                var id = year + '-' + month + '-' + date;
                viewValue[id] = {
                    isSelected: selectAll,
                    value: new Date(year, month, date)
                };
                changedDates.push(id);
            }
        }
        if (changedDates && changedDates.length > 0) {
            updateMultiRawValue(monthView);
            updateMultiSelectState(monthView, changedDates, selectAll);
            batchRepaintColumnTag(monthView);
            repaintAllSelectTag(monthView);
        }
    }
    function repaintAllSelectTag(monthView) {
        var rowTagNum = monthView.rowTagNum;
        var rowTagId = helper.getId(monthView, 'row-select');
        var selectAllTag = lib.g(helper.getId(monthView, 'month-title-0'));
        var rowSelectedClasses = helper.getPartClasses(monthView, 'month-row-select-selected');
        var selectedRowNum = 0;
        for (var i = 0; i < rowTagNum; i++) {
            var rowTag = lib.g(rowTagId + '-' + i);
            if (lib.hasClass(rowTag, rowSelectedClasses[0])) {
                selectedRowNum++;
            }
        }
        if (selectedRowNum === rowTagNum) {
            helper.addPartClasses(monthView, 'month-select-all-selected', selectAllTag);
        } else {
            helper.removePartClasses(monthView, 'month-select-all-selected', selectAllTag);
        }
    }
    function selectAll(monthView) {
        var rowTagNum = monthView.rowTagNum;
        var rowTagId = helper.getId(monthView, 'row-select');
        for (var i = 0; i < rowTagNum; i++) {
            var rowTag = lib.g(rowTagId + '-' + i);
            helper.removePartClasses(monthView, 'month-row-select-selected', rowTag);
            selectByTagClick(monthView, rowTag);
        }
    }
    function updateMultiRawValue(monthView) {
        var selectedDates = [];
        for (var key in monthView.viewValue) {
            if (monthView.viewValue[key].isSelected) {
                selectedDates.push(monthView.viewValue[key].value);
            }
        }
        selectedDates.sort(function (a, b) {
            return a - b;
        });
        monthView.rawValue = selectedDates;
        monthView.fire('change');
    }
    function updateMultiSelectState(monthView, dates, selectAll) {
        if (selectAll) {
            paintMultiSelected(monthView, dates);
        } else {
            resetMultiSelected(monthView, dates);
        }
    }
    function resetMultiSelected(monthView, dates) {
        var me = monthView;
        for (var i = 0; i < dates.length; i++) {
            var id = helper.getId(monthView, dates[i]);
            var item = lib.g(id);
            if (item) {
                lib.removeClasses(item, helper.getPartClasses(me, 'month-item-selected'));
            }
        }
    }
    function paintMultiSelected(monthView, dates) {
        var me = monthView;
        for (var i = 0; i < dates.length; i++) {
            var id = helper.getId(monthView, dates[i]);
            var item = lib.g(id);
            if (item) {
                lib.addClasses(item, helper.getPartClasses(me, 'month-item-selected'));
            }
        }
    }
    function switchState(monthView, item, className) {
        if (!item) {
            return false;
        }
        var classes = helper.getPartClasses(monthView, className);
        if (lib.hasClass(item, classes[0])) {
            helper.removePartClasses(monthView, className, item);
            return false;
        } else {
            helper.addPartClasses(monthView, className, item);
            return true;
        }
    }
    function selectByItem(monthView, item) {
        var date = item.getAttribute('data-date');
        var month = item.getAttribute('data-month');
        var year = item.getAttribute('data-year');
        var id = year + '-' + month + '-' + date;
        if (monthView.mode === 'multi') {
            var state = switchState(monthView, item, 'month-item-selected');
            monthView.viewValue[id] = {
                isSelected: state,
                value: new Date(year, month, date)
            };
            updateMultiRawValue(monthView);
            var rowTag = item.parentNode.firstChild;
            repaintRowTag(monthView, rowTag);
            batchRepaintColumnTag(monthView);
            repaintAllSelectTag(monthView);
        } else {
            var itemSelectClasses = helper.getPartClasses(monthView, 'month-item-selected');
            if (lib.hasClass(item, itemSelectClasses[0])) {
                return;
            }
            var newDate = new Date(year, month, date);
            updateSingleSelectState(monthView, monthView.rawValue, newDate);
            monthView.rawValue = newDate;
            monthView.fire('change');
            monthView.fire('itemclick');
        }
    }
    function reviseYearMonth(monthView, year, month) {
        var me = monthView;
        var range = me.viewRange || me.range;
        var rangeBegin = range.begin.getFullYear() * 12 + range.begin.getMonth();
        var rangeEnd = range.end.getFullYear() * 12 + range.end.getMonth();
        var viewMonth = year * 12 + month;
        var view = new Date(year, month, 1);
        month = view.getMonth();
        if (rangeBegin - viewMonth > 0) {
            month += rangeBegin - viewMonth;
        } else if (viewMonth - rangeEnd > 0) {
            month -= viewMonth - rangeEnd;
        }
        view.setMonth(month);
        month = view.getMonth();
        year = view.getFullYear();
        return {
            year: year,
            month: month
        };
    }
    function repaintMonthView(monthView, year, month) {
        if (year == null) {
            year = monthView.year;
        }
        if (month == null) {
            month = monthView.month;
        }
        var me = monthView;
        var revisedYearMonth = reviseYearMonth(me, year, month);
        me.month = revisedYearMonth.month;
        me.year = revisedYearMonth.year;
        var yearSelect = me.getChild('yearSel');
        var lastYear = yearSelect.getValue();
        yearSelect.setProperties({
            datasource: getYearOptions(me),
            value: me.year
        });
        if (+lastYear === me.year) {
            yearSelect.fire('change');
        }
    }
    function updateSingleSelectState(monthView, oldDate, newDate) {
        if (oldDate !== newDate) {
            if (oldDate) {
                var lastSelectedItem = lib.g(getItemId(monthView, oldDate));
                if (lastSelectedItem) {
                    switchState(monthView, lastSelectedItem, 'month-item-selected');
                }
            }
            var curSelectedItem = lib.g(getItemId(monthView, newDate));
            if (curSelectedItem) {
                if (isItemSelectable(monthView, curSelectedItem)) {
                    switchState(monthView, curSelectedItem, 'month-item-selected');
                } else {
                    monthView.rawValue = null;
                    return null;
                }
            }
        }
        return newDate;
    }
    function goToNextMonth(monthView) {
        var nowDate = new Date(monthView.year, monthView.month, 1);
        var newDate = m(nowDate).add('month', 1);
        repaintMonthView(monthView, newDate.year(), newDate.month());
    }
    function goToPrevMonth(monthView) {
        var nowDate = new Date(monthView.year, monthView.month, 1);
        var newDate = m(nowDate).subtract('month', 1);
        repaintMonthView(monthView, newDate.year(), newDate.month());
    }
    function changeYear(monthView, yearSel) {
        var year = parseInt(yearSel.getValue(), 10);
        monthView.year = year;
        var month = monthView.month;
        var revisedYearMonth = reviseYearMonth(monthView, year, month);
        month = revisedYearMonth.month;
        monthView.month = month;
        var monthSelect = monthView.getChild('monthSel');
        var changes = monthSelect.setProperties({
            datasource: getMonthOptions(monthView, monthView.year),
            value: monthView.month
        });
        if (!changes.hasOwnProperty('rawValue')) {
            changeMonth(monthView, monthSelect);
        }
        monthView.fire('changeyear');
    }
    function changeMonth(monthView, monthSel) {
        var month = parseInt(monthSel.getValue(), 10);
        monthView.month = month;
        updateMain(monthView);
        monthView.fire('changemonth');
    }
    function updateMain(monthView) {
        var monthMainId = helper.getId(monthView, 'monthMain');
        var monthMain = lib.g(monthMainId);
        monthMain.innerHTML = getMonthMainHTML(monthView);
        var rowElements = monthMain.getElementsByTagName('tr');
        var lastRow = rowElements[rowElements.length - 1];
        helper.addPartClasses(monthView, 'last-row', lastRow);
        updateSelectStateByValue(monthView);
    }
    function rangeAdapter(range) {
        var begin;
        var end;
        if (typeof range === 'string') {
            var beginAndEnd = range.split(',');
            begin = parseToDate(beginAndEnd[0]);
            end = parseToDate(beginAndEnd[1]);
        } else {
            begin = range.begin;
            end = range.end;
        }
        if (begin > end) {
            return {
                begin: end,
                end: begin
            };
        }
        return {
            begin: begin,
            end: end
        };
    }
    function parseToDate(dateStr) {
        function parse(source) {
            var dates = source.split('-');
            if (dates) {
                return new Date(parseInt(dates[0], 10), parseInt(dates[1], 10) - 1, parseInt(dates[2], 10));
            }
            return null;
        }
        dateStr = dateStr + '';
        var dateAndHour = dateStr.split(' ');
        var date = parse(dateAndHour[0]);
        if (dateAndHour[1]) {
            var clock = dateAndHour[1].split(':');
            date.setHours(clock[0]);
            date.setMinutes(clock[1]);
            date.setSeconds(clock[2]);
        }
        return date;
    }
    function parseValueByMode(value, mode) {
        if (mode === 'single') {
            return parseToDate(value);
        } else {
            var dateStrs = value.split(',');
            var dates = [];
            for (var i = 0; i < dateStrs.length - 1; i += 2) {
                var begin = parseToDate(dateStrs[i]);
                var end = parseToDate(dateStrs[i + 1]);
                var temp;
                if (!begin || !end) {
                    continue;
                }
                if (begin - end === 0) {
                    dates.push(begin);
                } else {
                    temp = begin;
                    while (temp <= end) {
                        dates.push(temp);
                        temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1);
                    }
                }
            }
            return dates;
        }
    }
    function updateSelectStateByValue(monthView) {
        if (monthView.mode !== 'multi') {
            updateSingleSelectState(monthView, null, monthView.rawValue);
            return;
        }
        var viewValue = monthView.viewValue;
        for (var key in viewValue) {
            var item = lib.g(helper.getId(monthView, key));
            if (item) {
                var isSelectable = isItemSelectable(monthView, item);
                if (isSelectable === 1) {
                    if (viewValue[key].isSelected) {
                        helper.addPartClasses(monthView, 'month-item-selected', item);
                    } else {
                        helper.removePartClasses(monthView, 'month-item-selected', item);
                    }
                } else if (isSelectable === 0) {
                    viewValue[key].isSelected = false;
                    updateMultiRawValue(monthView);
                }
            }
        }
        batchRepaintRowTag(monthView);
        batchRepaintColumnTag(monthView);
        repaintAllSelectTag(monthView);
    }
    function addCustomClassesForSelectLayer(monthView, selectClass, e) {
        var layerClasses = monthView.helper.getPartClasses(selectClass + '-layer');
        var layer = e.layer;
        layer.addCustomClasses(layerClasses);
        monthView.fire('selectlayerrendered', { layer: layer });
    }
    MonthView.prototype = {
        type: 'MonthView',
        initOptions: function (options) {
            var properties = {
                range: {
                    begin: new Date(1982, 10, 4),
                    end: new Date(2046, 10, 4)
                },
                dateFormat: 'YYYY-MM-DD',
                paramFormat: 'YYYY-MM-DD',
                viewValue: {},
                mode: 'single'
            };
            lib.extend(properties, options);
            this.setProperties(properties);
        },
        setProperties: function (properties) {
            if (properties.range) {
                properties.range = rangeAdapter(properties.range);
            }
            var now = new Date();
            var mode = properties.mode || this.mode;
            if (properties.rawValue == null) {
                if (properties.value) {
                    properties.rawValue = parseValueByMode(properties.value, mode);
                } else {
                    if (this.rawValue == null) {
                        if (mode === 'single') {
                            properties.rawValue = now;
                        } else {
                            properties.rawValue = [];
                        }
                    }
                }
            }
            var year = properties.year;
            var month = properties.month;
            if (!year && month == null) {
                if (mode === 'single') {
                    if (properties.rawValue) {
                        year = properties.rawValue.getFullYear();
                        month = properties.rawValue.getMonth() + 1;
                    }
                } else {
                    year = now.getFullYear();
                    month = now.getMonth() + 1;
                }
            }
            if (year && month) {
                properties.year = parseInt(year, 10);
                properties.month = parseInt(month, 10) - 1;
            } else if (properties.hasOwnProperty('year')) {
                if (this.month == null) {
                    delete properties.year;
                }
            } else if (properties.hasOwnProperty('month')) {
                if (this.year == null) {
                    delete properties.month;
                } else {
                    properties.month = parseInt(month, 10) - 1;
                }
            }
            var changes = Control.prototype.setProperties.apply(this, arguments);
            if (changes.hasOwnProperty('rawValue')) {
                this.fire('change');
            }
            return changes;
        },
        initStructure: function () {
            this.main.innerHTML = getMainHTML(this);
            this.initChildren(this.main);
            if (this.mode === 'multi') {
                this.addState('multi-select');
            }
        },
        initEvents: function () {
            var monthBack = this.getChild('monthBack');
            monthBack.on('click', lib.curry(goToPrevMonth, this));
            var monthForward = this.getChild('monthForward');
            monthForward.on('click', lib.curry(goToNextMonth, this));
            var monthSel = this.getChild('monthSel');
            monthSel.on('change', lib.curry(changeMonth, this, monthSel));
            monthSel.on('layerrendered', lib.curry(addCustomClassesForSelectLayer, this, 'month-select'));
            var yearSel = this.getChild('yearSel');
            yearSel.on('change', lib.curry(changeYear, this, yearSel));
            yearSel.on('layerrendered', lib.curry(addCustomClassesForSelectLayer, this, 'year-select'));
            var monthMain = this.helper.getPart('monthMain');
            helper.addDOMEvent(this, monthMain, 'click', monthViewClick);
        },
        repaint: helper.createRepaint(Control.prototype.repaint, {
            name: [
                'range',
                'rawValue',
                'year',
                'month'
            ],
            paint: function (monthView, range, rawValue, year, month) {
                if (rawValue) {
                    if (monthView.mode === 'multi') {
                        parseToCache(monthView);
                    }
                }
                repaintMonthView(monthView, monthView.year, monthView.month);
            }
        }, {
            name: 'disabled',
            paint: function (monthView, disabled) {
                var monthBack = monthView.getChild('monthBack');
                monthBack.setProperties({ disabled: disabled });
                var monthForward = monthView.getChild('monthForward');
                monthForward.setProperties({ disabled: disabled });
                var monthSel = monthView.getChild('monthSel');
                monthSel.setProperties({ disabled: disabled });
                var yearSel = monthView.getChild('yearSel');
                yearSel.setProperties({ disabled: disabled });
            }
        }),
        disable: function () {
            this.setProperties({ disabled: true });
            this.addState('disabled');
        },
        enable: function () {
            this.setProperties({ disabled: false });
            this.removeState('disabled');
        },
        setRange: function (range) {
            this.setProperties({ 'range': range });
        },
        setRawValue: function (date) {
            this.setProperties({ 'rawValue': date });
        },
        getRawValue: function () {
            return this.rawValue;
        },
        getValue: function () {
            return this.stringifyValue(this.rawValue);
        },
        stringifyValue: function (rawValue) {
            if (this.mode === 'single') {
                return lib.date.format(rawValue, this.paramFormat) || '';
            } else {
                var dateStrs = [];
                var oneDay = 86400000;
                for (var i = 0; i < rawValue.length; i++) {
                    if (i === 0) {
                        dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                    } else {
                        if (rawValue[i] - rawValue[i - 1] > oneDay) {
                            dateStrs.push(lib.date.format(rawValue[i - 1], this.paramFormat));
                            dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                        } else if (i === rawValue.length - 1) {
                            dateStrs.push(lib.date.format(rawValue[i], this.paramFormat));
                        } else {
                            continue;
                        }
                    }
                }
                return dateStrs.join(',');
            }
        },
        parseValue: function (value) {
            return parseValueByMode(value, this.mode);
        },
        setRawValueWithoutFireChange: function (value) {
            this.rawValue = value;
            parseToCache(this);
        },
        getDateItemHTML: function (date) {
            return lib.g(getItemId(this, date));
        }
    };
    lib.inherits(MonthView, Control);
    ui.register(MonthView);
    return MonthView;
});

define('esui/Calendar', [
    'require',
    './MonthView',
    'underscore',
    'moment',
    './lib',
    './main',
    './InputControl',
    './Layer',
    './painters'
], function (require) {
    require('./MonthView');
    var u = require('underscore');
    var moment = require('moment');
    var lib = require('./lib');
    var ui = require('./main');
    var InputControl = require('./InputControl');
    var Layer = require('./Layer');
    function CalendarLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(CalendarLayer, Layer);
    CalendarLayer.prototype.render = function (element) {
        document.body.appendChild(element);
        element.innerHTML = '<div data-ui-type="MonthView" ' + 'data-ui-child-name="monthView"></div>';
        var calendar = this.control;
        calendar.helper.initChildren(element);
        var monthView = calendar.getChild('monthView');
        monthView.setProperties({
            'rawValue': calendar.rawValue,
            'range': calendar.range
        });
        monthView.on('change', syncMonthViewValue, calendar);
        if (calendar.autoHideLayer) {
            monthView.on('itemclick', u.bind(calendar.layer.toggle, calendar.layer));
        }
    };
    CalendarLayer.prototype.toggle = function () {
        var element = this.getElement();
        if (!element || this.control.helper.isPart(element, 'layer-hidden')) {
            var calendar = this.control;
            var monthView = calendar.getChild('monthView');
            monthView.setProperties({
                'rawValue': calendar.rawValue,
                'range': calendar.range
            });
            this.show();
        } else {
            this.hide();
        }
    };
    function Calendar() {
        InputControl.apply(this, arguments);
        this.layer = new CalendarLayer(this);
    }
    function syncMonthViewValue() {
        var monthView = this.getChild('monthView');
        var date = monthView.getRawValue();
        if (!date) {
            return;
        }
        this.rawValue = date;
        updateDisplayText(this);
        this.fire('change');
    }
    function updateDisplayText(calendar) {
        var textHolder = calendar.helper.getPart('text');
        textHolder.innerHTML = u.escape(calendar.getValue());
    }
    Calendar.prototype = {
        type: 'Calendar',
        initOptions: function (options) {
            var now = new Date();
            var properties = {
                range: {
                    begin: new Date(1983, 8, 3),
                    end: new Date(2046, 10, 4)
                },
                dateFormat: 'YYYY-MM-DD',
                paramFormat: 'YYYY-MM-DD',
                rawValue: now,
                autoHideLayer: false
            };
            u.extend(properties, options);
            if (options.autoHideLayer === 'false') {
                properties.autoHideLayer = false;
            }
            if (lib.isInput(this.main)) {
                this.helper.extractOptionsFromInput(this.main, properties);
            }
            this.paramFormat = properties.paramFormat;
            if (options.value) {
                properties.rawValue = this.parseValue(properties.value);
            }
            var range = properties.range;
            if (typeof range === 'string') {
                var beginAndEnd = range.split(',');
                var begin = this.parseValue(beginAndEnd[0]);
                var end = this.parseValue(beginAndEnd[1]);
                properties.range = {
                    begin: begin,
                    end: end
                };
            }
            this.setProperties(properties);
        },
        initStructure: function () {
            if (lib.isInput(this.main)) {
                this.helper.replaceMain();
            }
            var template = [
                '<div class="${classes}" id="${id}">${value}</div>',
                '<div class="${arrow}"></div>'
            ];
            this.main.innerHTML = lib.format(template.join(''), {
                classes: this.helper.getPartClassName('text'),
                id: this.helper.getId('text'),
                arrow: this.helper.getPartClassName('arrow')
            });
        },
        initEvents: function () {
            this.helper.addDOMEvent(this.main, 'click', u.bind(this.layer.toggle, this.layer));
        },
        repaint: require('./painters').createRepaint(InputControl.prototype.repaint, {
            name: [
                'rawValue',
                'range'
            ],
            paint: function (calendar, rawValue, range) {
                updateDisplayText(calendar);
                var monthView = calendar.getChild('monthView');
                if (monthView) {
                    monthView.setProperties({
                        rawValue: rawValue,
                        range: range
                    });
                }
            }
        }, {
            name: [
                'disabled',
                'hidden',
                'readOnly'
            ],
            paint: function (calendar, disabled, hidden, readOnly) {
                if (disabled || hidden || readOnly) {
                    calendar.layer.hide();
                }
            }
        }),
        setRange: function (range) {
            this.setProperties({ 'range': range });
        },
        stringifyValue: function (rawValue) {
            return moment(rawValue).format(this.dateFormat) || '';
        },
        parseValue: function (value) {
            var date = moment(value, this.paramFormat).toDate();
            return date;
        },
        dispose: function () {
            if (this.helper.isInStage('DISPOSED')) {
                return;
            }
            if (this.layer) {
                this.layer.dispose();
                this.layer = null;
            }
            InputControl.prototype.dispose.apply(this, arguments);
        }
    };
    lib.inherits(Calendar, InputControl);
    ui.register(Calendar);
    return Calendar;
});

define('esui/painters', [
    'require',
    'underscore',
    './lib'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var painters = {};
    painters.state = function (name) {
        return {
            name: name,
            paint: function (control, value) {
                var method = value ? 'addState' : 'removeState';
                control[method](this.name);
            }
        };
    };
    painters.attribute = function (name, attribute, value) {
        return {
            name: name,
            attribute: attribute || name,
            value: value,
            paint: function (control, value) {
                var options = this.value != null && typeof this.value === 'object' ? this.value : { defaultValue: this.value };
                value = value == null ? options.defaultValue : value;
                value = value == null ? '' : value;
                if (options.forceRemove && value === false) {
                    control.main.removeAttribute(this.attribute);
                } else {
                    control.main.setAttribute(this.attribute, value);
                }
            }
        };
    };
    var unitProperties = {
        width: true,
        height: true,
        top: true,
        right: true,
        bottom: true,
        left: true,
        fontSize: true,
        padding: true,
        paddingTop: true,
        paddingRight: true,
        paddingBottom: true,
        paddingLeft: true,
        margin: true,
        marginTop: true,
        marginRight: true,
        marginBottom: true,
        marginLeft: true,
        borderWidth: true,
        borderTopWidth: true,
        borderRightWidth: true,
        borderBottomWidth: true,
        borderLeftWidth: true
    };
    painters.style = function (name, property) {
        return {
            name: name,
            property: property || name,
            paint: function (control, value) {
                if (value == null) {
                    return;
                }
                if (unitProperties.hasOwnProperty(this.property)) {
                    value = value === 0 ? '0' : value + 'px';
                }
                control.main.style[this.property] = value;
            }
        };
    };
    painters.html = function (name, element, generate) {
        return {
            name: name,
            element: element || '',
            generate: generate,
            paint: function (control, value) {
                var element = typeof this.element === 'function' ? this.element(control) : this.element ? control.helper.getPart(this.element) : control.main;
                if (element) {
                    var html = typeof this.generate === 'function' ? this.generate(control, value) : value;
                    element.innerHTML = html || '';
                }
            }
        };
    };
    painters.text = function (name, element, generate) {
        return {
            name: name,
            element: element || '',
            generate: generate,
            paint: function (control, value) {
                var element = typeof this.element === 'function' ? this.element(control) : this.element ? control.helper.getPart(this.element) : control.main;
                if (element) {
                    var html = typeof this.generate === 'function' ? this.generate(control, value) : value;
                    element.innerHTML = u.escape(html || '');
                }
            }
        };
    };
    painters.delegate = function (name, member, method) {
        return {
            name: name,
            member: this.member,
            method: this.method,
            paint: function (control, value) {
                control[this.member][this.method](value);
            }
        };
    };
    painters.createRepaint = function () {
        var painters = [].concat.apply([], [].slice.call(arguments));
        return function (changes, changesIndex) {
            var index = lib.extend({}, changesIndex);
            for (var i = 0; i < painters.length; i++) {
                var painter = painters[i];
                if (typeof painter === 'function') {
                    painter.apply(this, arguments);
                    continue;
                }
                var propertyNames = [].concat(painter.name);
                var shouldPaint = !changes;
                if (!shouldPaint) {
                    for (var j = 0; j < propertyNames.length; j++) {
                        var name = propertyNames[j];
                        if (changesIndex.hasOwnProperty(name)) {
                            shouldPaint = true;
                            break;
                        }
                    }
                }
                if (!shouldPaint) {
                    continue;
                }
                var properties = [this];
                for (var j = 0; j < propertyNames.length; j++) {
                    var name = propertyNames[j];
                    properties.push(this[name]);
                    delete index[name];
                }
                try {
                    painter.paint.apply(painter, properties);
                } catch (ex) {
                    var paintingPropertyNames = '"' + propertyNames.join('", "') + '"';
                    var error = new Error('Failed to paint [' + paintingPropertyNames + '] ' + 'for control "' + (this.id || 'anonymous') + '" ' + 'of type ' + this.type + ' ' + 'because: ' + ex.message);
                    error.actualError = error;
                    throw error;
                }
            }
            var unpainted = [];
            for (var key in index) {
                if (index.hasOwnProperty(key)) {
                    unpainted.push(index[key]);
                }
            }
            return unpainted;
        };
    };
    return painters;
});

define('esui/Button', [
    'require',
    'underscore',
    './lib',
    './painters',
    './Control',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var paint = require('./painters');
    var Control = require('./Control');
    function Button(options) {
        Control.apply(this, arguments);
    }
    function getBorderInfo(dom) {
        var result = {};
        result.borderTop = parseInt(lib.getComputedStyle(dom, 'borderTopWidth'), 10);
        result.borderBottom = parseInt(lib.getComputedStyle(dom, 'borderBottomWidth'), 10);
        return result;
    }
    Button.prototype = {
        type: 'Button',
        initOptions: function (options) {
            var properties = {
                content: '',
                disabled: false
            };
            u.extend(properties, options);
            properties.tagName = this.main.nodeName.toLowerCase();
            if (properties.text == null) {
                properties.text = lib.getText(this.main);
            }
            var innerDiv = this.main.firstChild;
            if (!properties.content && innerDiv && innerDiv.nodeName.toLowerCase() !== 'div') {
                properties.content = this.main.innerHTML;
            }
            this.setProperties(properties);
        },
        createMain: function () {
            var div = document.createElement('div');
            div.innerHTML = '<button type="button"></button>';
            return div.firstChild;
        },
        initEvents: function () {
            this.helper.delegateDOMEvent(this.main, 'click');
        },
        repaint: paint.createRepaint(Control.prototype.repaint, paint.style('width'), {
            name: 'height',
            paint: function (button, value) {
                if (!value) {
                    return;
                }
                var main = button.main;
                main.style.height = value + 'px';
                var lineHeight = value;
                main.style.lineHeight = lineHeight + 'px';
                var offsetHeight = main.offsetHeight;
                if (offsetHeight === value) {
                    var borderInfo = getBorderInfo(main);
                    var height = value + borderInfo.borderTop + borderInfo.borderBottom;
                    main.style.height = height + 'px';
                }
            }
        }, paint.html('content'), {
            name: 'disabled',
            paint: function (button, disabled) {
                var nodeName = button.main.nodeName.toLowerCase();
                if (nodeName === 'button' || nodeName === 'input') {
                    button.main.disabled = !!disabled;
                }
            }
        }),
        setContent: function (content) {
            this.setProperties({ 'content': content });
        }
    };
    lib.inherits(Button, Control);
    require('./main').register(Button);
    return Button;
});

define('esui/lib/string', [
    'require',
    'underscore'
], function (require) {
    var u = require('underscore');
    var lib = {};
    var WHITESPACE = /^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g;
    lib.trim = function (source) {
        if (!source) {
            return '';
        }
        return String(source).replace(WHITESPACE, '');
    };
    lib.format = function (template, data) {
        if (!template) {
            return '';
        }
        if (data == null) {
            return template;
        }
        return template.replace(/\$\{(.+?)\}/g, function (match, key) {
            var replacer = data[key];
            if (typeof replacer === 'function') {
                replacer = replacer(key);
            }
            return replacer == null ? '' : replacer;
        });
    };
    lib.camelize = function (source) {
        if (!source) {
            return '';
        }
        return source.replace(/-([a-z])/g, function (alpha) {
            return alpha.toUpperCase();
        });
    };
    lib.pascalize = function (source) {
        if (!source) {
            return '';
        }
        return source.charAt(0).toUpperCase() + lib.camelize(source.slice(1));
    };
    lib.splitTokenList = function (input) {
        if (!input) {
            return [];
        }
        if (u.isArray(input)) {
            return;
        }
        return u.chain(input.split(/[,\s]/)).map(lib.trim).compact().value();
    };
    return lib;
});

define('esui/lib/dom', [
    'require',
    'underscore',
    './string'
], function (require) {
    var u = require('underscore');
    var string = require('./string');
    var lib = {};
    lib.g = function (id) {
        if (!id) {
            return null;
        }
        return typeof id === 'string' ? document.getElementById(id) : id;
    };
    lib.isInput = function (element) {
        var nodeName = element.nodeName.toLowerCase();
        return nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea';
    };
    lib.removeNode = function (element) {
        if (typeof element === 'string') {
            element = lib.g(element);
        }
        if (!element) {
            return;
        }
        var parent = element.parentNode;
        if (parent) {
            parent.removeChild(element);
        }
    };
    lib.insertAfter = function (element, reference) {
        var parent = reference.parentNode;
        if (parent) {
            parent.insertBefore(element, reference.nextSibling);
        }
        return element;
    };
    lib.insertBefore = function (element, reference) {
        var parent = reference.parentNode;
        if (parent) {
            parent.insertBefore(element, reference);
        }
        return element;
    };
    lib.getChildren = function (element) {
        return u.filter(element.children, function (child) {
            return child.nodeType === 1;
        });
    };
    lib.getComputedStyle = function (element, key) {
        if (!element) {
            return '';
        }
        var doc = element.nodeType === 9 ? element : element.ownerDocument || element.document;
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            var styles = doc.defaultView.getComputedStyle(element, null);
            if (styles) {
                return styles[key] || styles.getPropertyValue(key);
            }
        } else if (element && element.currentStyle) {
            return element.currentStyle[key];
        }
        return '';
    };
    lib.getStyle = function (element, key) {
        key = string.camelize(key);
        return element.style[key] || (element.currentStyle ? element.currentStyle[key] : '') || lib.getComputedStyle(element, key);
    };
    lib.getOffset = function (element) {
        var rect = element.getBoundingClientRect();
        var offset = {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
        var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
        var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        offset.top = offset.top + scrollTop - clientTop;
        offset.bottom = offset.bottom + scrollTop - clientTop;
        offset.left = offset.left + scrollLeft - clientLeft;
        offset.right = offset.right + scrollLeft - clientLeft;
        return offset;
    };
    lib.getText = function (element) {
        var text = '';
        if (element.nodeType === 3 || element.nodeType === 4) {
            text += element.nodeValue;
        } else if (element.nodeType !== 8) {
            u.each(element.childNodes, function (child) {
                text += lib.getText(child);
            });
        }
        return text;
    };
    lib.dom = {};
    lib.dom.first = function (element) {
        element = lib.g(element);
        if (element.firstElementChild) {
            return element.firstElementChild;
        }
        var node = element.firstChild;
        for (; node; node = node.nextSibling) {
            if (node.nodeType === 1) {
                return node;
            }
        }
        return null;
    };
    lib.dom.last = function (element) {
        element = lib.g(element);
        if (element.lastElementChild) {
            return element.lastElementChild;
        }
        var node = element.lastChild;
        for (; node; node = node.previousSibling) {
            if (node.nodeType === 1) {
                return node;
            }
        }
        return null;
    };
    lib.dom.next = function (element) {
        element = lib.g(element);
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        var node = element.nextSibling;
        for (; node; node = node.nextSibling) {
            if (node.nodeType === 1) {
                return node;
            }
        }
        return null;
    };
    lib.dom.contains = function (container, contained) {
        container = lib.g(container);
        contained = lib.g(contained);
        return container.contains ? container !== contained && container.contains(contained) : !!(container.compareDocumentPosition(contained) & 16);
    };
    return lib;
});

define('esui/lib/attribute', [
    'require',
    './dom'
], function (require) {
    var dom = require('./dom');
    var lib = {};
    lib.hasAttribute = function (element, name) {
        if (element.hasAttribute) {
            return element.hasAttribute(name);
        } else {
            return element.attributes && element.attributes[name] && element.attributes[name].specified;
        }
    };
    var ATTRIBUTE_NAME_MAPPING = function () {
        var result = {
            cellpadding: 'cellPadding',
            cellspacing: 'cellSpacing',
            colspan: 'colSpan',
            rowspan: 'rowSpan',
            valign: 'vAlign',
            usemap: 'useMap',
            frameborder: 'frameBorder'
        };
        var div = document.createElement('div');
        div.innerHTML = '<label for="test" class="test"></label>';
        var label = div.getElementsByTagName('label')[0];
        if (label.getAttribute('className') === 'test') {
            result['class'] = 'className';
        } else {
            result.className = 'class';
        }
        if (label.getAttribute('for') === 'test') {
            result.htmlFor = 'for';
        } else {
            result['for'] = 'htmlFor';
        }
        return result;
    }();
    lib.setAttribute = function (element, key, value) {
        element = dom.g(element);
        if (key === 'style') {
            element.style.cssText = value;
        } else {
            key = ATTRIBUTE_NAME_MAPPING[key] || key;
            element.setAttribute(key, value);
        }
        return element;
    };
    lib.getAttribute = function (element, key) {
        element = dom.g(element);
        if (key === 'style') {
            return element.style.cssText;
        }
        key = ATTRIBUTE_NAME_MAPPING[key] || key;
        return element.getAttribute(key);
    };
    lib.removeAttribute = function (element, key) {
        element = dom.g(element);
        key = ATTRIBUTE_NAME_MAPPING[key] || key;
        element.removeAttribute(key);
    };
    return lib;
});

define('esui/lib', [
    'require',
    'underscore',
    './lib/attribute',
    './lib/class',
    './lib/date',
    './lib/dom',
    './lib/event',
    './lib/lang',
    './lib/page',
    './lib/string'
], function (require) {
    var lib = {};
    var u = require('underscore');
    if (/msie (\d+\.\d+)/i.test(navigator.userAgent)) {
        lib.ie = document.documentMode || +RegExp.$1;
    }
    u.extend(lib, require('./lib/attribute'), require('./lib/class'), require('./lib/date'), require('./lib/dom'), require('./lib/event'), require('./lib/lang'), require('./lib/page'), require('./lib/string'));
    return lib;
});

define('esui/BoxGroup', [
    'require',
    'underscore',
    './lib',
    './InputControl',
    './painters',
    './main'
], function (require) {
    var u = require('underscore');
    var lib = require('./lib');
    var InputControl = require('./InputControl');
    function BoxGroup() {
        InputControl.apply(this, arguments);
    }
    BoxGroup.prototype.type = 'BoxGroup';
    function extractDatasourceFromDOM(element, options) {
        var boxes = element.getElementsByTagName('input');
        var labels = element.getElementsByTagName('label');
        var labelIndex = {};
        for (var i = labels.length - 1; i >= 0; i--) {
            var label = labels[i];
            var forAttribute = lib.getAttribute(label, 'for');
            if (forAttribute) {
                labelIndex[forAttribute] = label;
            }
        }
        var datasource = [];
        var values = [];
        for (var i = 0, length = boxes.length; i < length; i++) {
            var box = boxes[i];
            if (box.type === options.boxType && (options.name || '') === box.name) {
                var item = { value: box.value };
                var label = box.id && labelIndex[box.id];
                item.title = label ? lib.getText(label) : '';
                if (!item.title) {
                    item.title = box.title || (box.value === 'on' ? box.value : '');
                }
                datasource.push(item);
                if (box.getAttribute('checked') !== null && box.getAttribute('checked') !== '') {
                    values.push(box.value);
                }
            }
        }
        options.datasource = datasource;
        if (!options.rawValue && !options.value) {
            options.rawValue = values;
        }
    }
    BoxGroup.prototype.initOptions = function (options) {
        var properties = {
            datasource: [],
            orientation: 'horizontal',
            boxType: 'radio'
        };
        u.extend(properties, options);
        var datasource = properties.datasource;
        if (!datasource.length) {
            extractDatasourceFromDOM(this.main, properties);
        }
        if (!properties.hasOwnProperty('rawValue') && !properties.hasOwnProperty('value')) {
            if (properties.boxType === 'radio' && datasource.length) {
                properties.rawValue = [datasource[0].value];
            } else {
                properties.rawValue = [];
            }
        }
        this.setProperties(properties);
    };
    function syncCheckedState(element) {
        var label = element.parentNode;
        var checkedClass = this.helper.getPartClasses('wrapper-checked');
        if (element.checked) {
            lib.addClasses(label, checkedClass);
        } else {
            lib.removeClasses(label, checkedClass);
        }
    }
    function syncValue() {
        u.each(this.getBoxElements(), syncCheckedState, this);
        var result = u.chain(this.getBoxElements()).where({ checked: true }).pluck('value').value();
        this.rawValue = result;
        this.fire('change');
    }
    var itemTemplate = [
        '<label title="${title}" class="${wrapperClass}">',
        '    <input type="${type}" name="${name}" id="${id}" title="${title}" value="${value}"${checked} />',
        '    <span>${title}</span>',
        '</label>'
    ];
    itemTemplate = itemTemplate.join('');
    function render(group, datasource, boxType) {
        group.helper.clearDOMEvents();
        var html = '';
        var classes = [].concat(group.helper.getPartClasses(boxType), group.helper.getPartClasses('wrapper'));
        var valueIndex = lib.toDictionary(group.rawValue);
        var name = group.name || lib.getGUID();
        for (var i = 0; i < datasource.length; i++) {
            var item = datasource[i];
            var wrapperClass = '';
            if (valueIndex[item.value]) {
                wrapperClass += ' ' + group.helper.getPartClassName('wrapper-checked');
            }
            var data = {
                wrapperClass: classes.join(' ') + wrapperClass,
                id: group.helper.getId('box-' + i),
                type: group.boxType,
                name: name,
                title: lib.trim(item.title || item.name || item.text),
                value: item.value,
                checked: valueIndex[item.value] ? ' checked="checked"' : ''
            };
            html += lib.format(itemTemplate, data);
        }
        group.main.innerHTML = html;
        var eventName = group.main.addEventListener ? 'change' : 'click';
        u.each(group.getBoxElements(), function (box) {
            this.helper.addDOMEvent(box, eventName, syncValue);
        }, group);
    }
    BoxGroup.prototype.setProperties = function (properties) {
        if ((properties.datasource || properties.boxType) && (!properties.hasOwnProperty('rawValue') && !properties.hasOwnProperty('value')) && (!this.rawValue || !this.rawValue.length)) {
            properties.rawValue = [];
        }
        var changes = InputControl.prototype.setProperties.apply(this, arguments);
        if (changes.hasOwnProperty('rawValue')) {
            this.fire('change');
        }
    };
    BoxGroup.prototype.isPropertyChanged = function (propertyName, newValue, oldValue) {
        if (propertyName === 'rawValue') {
            return '' + newValue !== '' + oldValue;
        }
        return newValue !== oldValue;
    };
    BoxGroup.prototype.repaint = require('./painters').createRepaint(InputControl.prototype.repaint, {
        name: [
            'datasource',
            'boxType'
        ],
        paint: render
    }, {
        name: [
            'disabled',
            'readOnly'
        ],
        paint: function (group, disabled, readOnly) {
            u.each(group.getBoxElements(), function (box) {
                box.disabled = disabled;
                box.readOnly = readOnly;
            });
        }
    }, {
        name: 'rawValue',
        paint: function (group, rawValue) {
            rawValue = rawValue || [];
            group.rawValue = rawValue;
            var map = {};
            for (var i = 0; i < rawValue.length; i++) {
                map[rawValue[i]] = true;
            }
            u.each(group.getBoxElements(), function (box) {
                box.checked = map.hasOwnProperty(box.value);
                syncCheckedState.call(group, box);
            });
        }
    }, {
        name: 'orientation',
        paint: function (group, orientation) {
            group.removeState('vertical');
            group.removeState('horizontal');
            group.addState(orientation);
        }
    });
    BoxGroup.prototype.parseValue = function (value) {
        return u.isArray(value) ? value : (value + '').split(',');
    };
    BoxGroup.prototype.getBoxElements = function () {
        return u.where(this.main.getElementsByTagName('input'), { type: this.boxType });
    };
    lib.inherits(BoxGroup, InputControl);
    require('./main').register(BoxGroup);
    return BoxGroup;
});

define('startup/ui', [], {});