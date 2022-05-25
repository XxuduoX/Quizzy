
//-------------------------------------quiz.js section----------------------------------------------------------------//
!function (z, v) {
    "use strict"; z.quiz = function (t, e) {
        var o = this; o.$el = z(t),
            o.$el.data("quiz", o),
            o.options = z.extend(z.quiz.defaultOptions, e);
        var s = o.options.questions,
            u = s.length,
            i = o.options.startScreen,
            n = o.options.startButton,
            r = o.options.homeButton,
            a = o.options.resultsScreen,
            c = o.options.gameOverScreen,
            d = o.options.nextButtonText,
            l = o.options.finishButtonText,
            h = o.options.restartButtonText,
            q = 1,
            p = 0,
            f = !1;
        o.methods = {
            init: function () {
                o.methods.setup(),
                    z(v).on("click", n, function (t) { t.preventDefault(), o.methods.start() }),
                    z(v).on("click", r, function (t) { t.preventDefault(), o.methods.home() }),
                    z(v).on("click", ".answers a", function (t) {
                        t.preventDefault(),
                            o.methods.answerQuestion(this)
                    }),
                    z(v).on("click", "#quiz-next-btn", function (t) { t.preventDefault(), o.methods.nextQuestion() }),
                    z(v).on("click", "#quiz-finish-btn", function (t) { t.preventDefault(), o.methods.finish() }),
                    z(v).on("click", "#quiz-restart-btn, #quiz-retry-btn", function (t) { t.preventDefault(), o.methods.restart() })
            },
            setup: function () {
                var i = ""; o.options.counter && (i += '<div id="quiz-counter"></div>'),
                    i += '<div id="questions">', z.each(s, function (t, e) {
                        i += '<div class="question-container">',
                            i += '<p class="question">' + e.q + "</p>", i += '<ul class="answers">',
                            z.each(e.options, function (t, e) { i += '<li><a href="#" data-index="' + t + '">' + e + "</a></li>" }), i += "</ul>", i += "</div>"
                    }),
                    i += "</div>", 0 === z(a).length && (i += '<div id="' + a.substr(1) + '">', i += '<p id="quiz-results"></p>', i += "</div>"),
                    i += '<div id="quiz-controls">', i += '<p id="quiz-response"></p>',
                    i += '<div id="quiz-buttons">',
                    i += '<a href="#" id="quiz-next-btn">' + d + "</a>",
                    i += '<a href="#" id="quiz-finish-btn">' + l + "</a>",
                    i += '<a href="#" id="quiz-restart-btn">' + h + "</a>",
                    i += "</div>",
                    o.$el.append(i += "</div>").addClass("quiz-container quiz-start-state"),
                    z("#quiz-counter").hide(),
                    z(".question-container").hide(),
                    z(c).hide(), z(a).hide(),
                    z("#quiz-controls").hide(),
                    "function" == typeof o.options.setupCallback && o.options.setupCallback()
            },
            start: function () {
                o.$el.removeClass("quiz-start-state").addClass("quiz-questions-state"),
                    z(i).hide(), z("#quiz-controls").hide(), z("#quiz-finish-btn").hide(),
                    z("#quiz-restart-btn").hide(), z("#questions").show(),
                    z("#quiz-counter").show(), z(".question-container:first-child").show().addClass("active-question"),
                    o.methods.updateCounter()
            }, answerQuestion: function (t) {
                if (!f) {
                    f = !0; var e = z(t), i = "", n = e.data("index"), t = q - 1;
                    if (n === s[t].correctIndex) e.addClass("correct"), i = s[t].correctResponse, p++;
                    else if (e.addClass("incorrect"),
                        i = s[t].incorrectResponse, !o.options.allowIncorrect) return void o.methods.gameOver(i);
                    q++ === u && (z("#quiz-next-btn").hide(), z("#quiz-finish-btn").show()),
                        z("#quiz-response").html(i), z("#quiz-controls").fadeIn(),
                        "function" == typeof o.options.answerCallback && o.options.answerCallback(q, n, s[t])
                }
            },

            nextQuestion: function () {
                f = !1, z(".active-question").hide().removeClass("active-question").next(".question-container").show().addClass("active-question"), z("#quiz-controls").hide(), o.methods.updateCounter(),
                    "function" == typeof o.options.nextCallback && o.options.nextCallback()
            },
            gameOver: function (t) {
                var e; 0 === z(c).length && (e = "", e += '<div id="' + c.substr(1) + '">',
                    e += '<p id="quiz-gameover-response"></p>', e += '<p><a href="#" id="quiz-retry-btn">' + h + "</a></p>",
                    o.$el.append(e += "</div>")), z("#quiz-gameover-response").html(t), z("#quiz-counter").hide(), z("#questions").hide(),
                    z("#quiz-finish-btn").hide(), z(c).show()
            },
            finish: function () {
                o.$el.removeClass("quiz-questions-state").addClass("quiz-results-state"),
                    z(".active-question").hide().removeClass("active-question"), z("#quiz-counter").hide(),
                    z("#quiz-response").hide(), z("#quiz-finish-btn").hide(), z("#quiz-next-btn").hide(),
                    z("#quiz-restart-btn").show(), z(a).show();
                var t = o.options.resultsFormat.replace("%score", p).replace("%total", u); z("#quiz-results").html(t),
                    "function" == typeof o.options.finishCallback && o.options.finishCallback()
            },
            restart: function () {
                o.methods.reset(), o.$el.addClass("quiz-questions-state"),
                    z("#questions").show(), z("#quiz-counter").show(), z(".question-container:first-child").show().addClass("active-question"),
                    o.methods.updateCounter()
            }, reset: function () {
                f = !1, q = 1, p = 0, z(".answers a").removeClass("correct incorrect"),
                    o.$el.removeClass().addClass("quiz-container"), z("#quiz-restart-btn").hide(), z(c).hide(), z(a).hide(),
                    z("#quiz-controls").hide(), z("#quiz-response").show(), z("#quiz-next-btn").show(), z("#quiz-counter").hide(),
                    z(".active-question").hide().removeClass("active-question"),
                    "function" == typeof o.options.resetCallback && o.options.resetCallback()
            },
            home: function () {
                o.methods.reset(), o.$el.addClass("quiz-start-state"), z(i).show(),
                    "function" == typeof o.options.homeCallback && o.options.homeCallback()
            },

            updateCounter: function () { var t = o.options.counterFormat.replace("%current", q).replace("%total", u); z("#quiz-counter").html(t) }
        },
            o.methods.init()
    },
        z.quiz.defaultOptions = {
            allowIncorrect: !0, counter: !0, counterFormat: "%current/%total", startScreen: "#quiz-start-screen",
            startButton: "#quiz-start-btn", homeButton: "#quiz-home-btn",
            resultsScreen: "#quiz-results-screen",
            resultsFormat: "You got %score out of %total correct!",
            gameOverScreen: "#quiz-gameover-screen",
            nextButtonText: "Next", finishButtonText: "Finish",
            restartButtonText: "Restart"
        },
        z.fn.quiz = function (t) { return this.each(function () { new z.quiz(this, t) }) }
}(jQuery, (window, document));
//-------------------------------------easytime.js section----------------------------------------------------------------//
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).easytimer = {}) }(this, (function (t) { "use strict"; function e(t, e) { var n = Object.keys(t); if (Object.getOwnPropertySymbols) { var r = Object.getOwnPropertySymbols(t); e && (r = r.filter((function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable }))), n.push.apply(n, r) } return n } function n(t) { for (var n = 1; n < arguments.length; n++) { var r = null != arguments[n] ? arguments[n] : {}; n % 2 ? e(Object(r), !0).forEach((function (e) { o(t, e, r[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e)) })) } return t } function r(t) { return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) } function o(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t } function s(t, e, n) { var r, o = ""; if ((t = "number" == typeof t ? String(t) : t).length > e) return t; for (r = 0; r < e; r += 1)o += String(n); return (o + t).slice(-o.length) } function i() { this.reset() } function u() { this.events = {} } i.prototype.toString = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["hours", "minutes", "seconds"], e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ":", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2; t = t || ["hours", "minutes", "seconds"], e = e || ":", n = n || 2; var r, o = []; for (r = 0; r < t.length; r += 1)void 0 !== this[t[r]] && ("secondTenths" === t[r] ? o.push(this[t[r]]) : o.push(s(this[t[r]], n, "0"))); return o.join(e) }, i.prototype.reset = function () { this.secondTenths = 0, this.seconds = 0, this.minutes = 0, this.hours = 0, this.days = 0 }, u.prototype.on = function (t, e) { var n = this; return Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(e), function () { return n.removeListener(t, e) } }, u.prototype.removeListener = function (t, e) { if (Array.isArray(this.events[t])) { var n = this.events[t].indexOf(e); n > -1 && this.events[t].splice(n, 1) } }, u.prototype.removeAllListeners = function (t) { t ? Array.isArray(this.events[t]) && (this.events[t] = []) : this.events = {} }, u.prototype.emit = function (t) { for (var e = this, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)r[o - 1] = arguments[o]; Array.isArray(this.events[t]) && this.events[t].forEach((function (t) { return t.apply(e, r) })) }; var c = 10, a = 60, f = 60, h = 24, d = "secondTenths", l = "seconds", p = "minutes", v = "hours", y = "days", m = [d, l, p, v, y], b = { secondTenths: 100, seconds: 1e3, minutes: 6e4, hours: 36e5, days: 864e5 }, g = { secondTenths: c, seconds: a, minutes: f, hours: h }; function w(t, e) { return (t % e + e) % e } function O() { var t, e, o, s, O, T, j, A, E, P, S = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, D = new i, L = new i, x = new u, V = !1, M = !1, U = {}, k = { detail: { timer: this } }; function I(t, e) { var n = g[t]; L[t] = e, D[t] = t === y ? Math.abs(e) : w(e >= 0 ? e : n - w(e, n), n) } function _(t) { return B(t, y) } function z(t) { return B(t, v) } function C(t) { return B(t, p) } function R(t) { return B(t, l) } function q(t) { return B(t, d) } function B(t, e) { var n = L[e]; return I(e, rt(t, b[e])), L[e] !== n } function F() { G(), Z() } function G() { clearInterval(t), t = void 0, V = !1, M = !1 } function H(t) { yt() ? (E = K(), T = ot(O.target)) : $(t), J() } function J() { var n = b[e]; Y(W(Date.now())) || (t = setInterval(N, n), V = !0, M = !1) } function K() { return W(Date.now()) - L.secondTenths * b.secondTenths * o } function N() { var t = W(Date.now()); X(Q()), s(k.detail.timer), Y(t) && (ut(), pt("targetAchieved", k)) } function Q() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : W(Date.now()), e = o > 0 ? t - E : E - t, n = {}; return n.secondTenths = q(e), n.seconds = R(e), n.minutes = C(e), n.hours = z(e), n.days = _(e), n } function W(t) { return Math.floor(t / b[e]) * b[e] } function X(t) { t.secondTenths && pt("secondTenthsUpdated", k), t.seconds && pt("secondsUpdated", k), t.minutes && pt("minutesUpdated", k), t.hours && pt("hoursUpdated", k), t.days && pt("daysUpdated", k) } function Y(t) { return T instanceof Array && t >= P } function Z() { D.reset(), L.reset() } function $(t) { e = tt((t = t || {}).precision), s = "function" == typeof t.callback ? t.callback : function () { }, A = !0 === t.countdown, o = !0 === A ? -1 : 1, "object" === r(t.startValues) ? st(t.startValues) : j = null, E = K(), Q(), "object" === r(t.target) ? T = ot(t.target) : A ? (t.target = { seconds: 0 }, T = ot(t.target)) : T = null, U = { precision: e, callback: s, countdown: "object" === r(t) && !0 === t.countdown, target: T, startValues: j }, O = t } function tt(t) { if (!et(t = "string" == typeof t ? t : l)) throw new Error("Error in precision parameter: ".concat(t, " is not a valid value")); return t } function et(t) { return m.indexOf(t) >= 0 } function nt(t) { var e; if ("object" === r(t)) if (t instanceof Array) { if (5 !== t.length) throw new Error("Array size not valid"); e = t } else { for (var n in t) if (m.indexOf(n) < 0) throw new Error("Error in startValues or target parameter: ".concat(n, " is not a valid input value")); e = [t.secondTenths || 0, t.seconds || 0, t.minutes || 0, t.hours || 0, t.days || 0] } var o = (e = e.map((function (t) { return parseInt(t, 10) })))[0], s = e[1] + rt(o, c), i = e[2] + rt(s, a), u = e[3] + rt(i, f), d = e[4] + rt(u, h); return e[0] = o % c, e[1] = s % a, e[2] = i % f, e[3] = u % h, e[4] = d, e } function rt(t, e) { var n = t / e; return n < 0 ? Math.ceil(n) : Math.floor(n) } function ot(t) { if (t) { var e = it(T = nt(t)); return P = E + e.secondTenths * b.secondTenths * o, T } } function st(t) { j = nt(t), D.secondTenths = j[0], D.seconds = j[1], D.minutes = j[2], D.hours = j[3], D.days = j[4], L = it(j, L) } function it(t, e) { var n = e || {}; return n.days = t[4], n.hours = n.days * h + t[3], n.minutes = n.hours * f + t[2], n.seconds = n.minutes * a + t[1], n.secondTenths = n.seconds * c + t[[0]], n } function ut() { F(), pt("stopped", k) } function ct() { F(), H(O), pt("reset", k) } function at() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; t = n(n({}, S), t), vt() || (H(t), pt("started", k)) } function ft() { G(), M = !0, pt("paused", k) } function ht(t, e) { x.on(t, e) } function dt(t, e) { x.removeListener(t, e) } function lt(t) { x.removeAllListeners(t) } function pt(t, e) { x.emit(t, e) } function vt() { return V } function yt() { return M } function mt() { return D } function bt() { return L } function gt() { return U } $(S), void 0 !== this && (this.start = at, this.pause = ft, this.stop = ut, this.reset = ct, this.isRunning = vt, this.isPaused = yt, this.getTimeValues = mt, this.getTotalTimeValues = bt, this.getConfig = gt, this.addEventListener = ht, this.on = ht, this.removeEventListener = dt, this.removeAllEventListeners = lt, this.off = dt) } t.Timer = O, t.default = O, Object.defineProperty(t, "__esModule", { value: !0 }) }));
//-------------------------------------script section----------------------------------------------------------------//
$(document).ready(function () {
    $('#fullpage').fullpage({ //initialize
        //set options
        sectionsColor: ['#B5F2C2', '#FFFFFFF', '#FFFFFFF', '#FFFFFFF'],
        navigation: false,
        navigationPosition: 'right',
        anchors: ['section1', 'section2', 'section3', 'section4'], //name the anchors for each section
        afterLoad: function (origin, destination, direction) {
            if (destination.index == 1) { //section 2
                cardani.play();


            }
            else if (destination.index == 2) { //section 3


            }

            else if (destination.index == 0) { //section 1
                logoMoveIn.play();
                nameMoveIn.play();


            }
        }

    });
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    $("[id='button-addon2']").click(function () {
        $("#playername").html(
            "Hi, " + $("#name").val() + "!")
    });


});

$("[id='btnQuiz1']").click(function () {
    document.getElementById("car-lock").className = "fas fa-lock-open";
});

//welcome section//
tippy('#quizzTippy', {
    content: "Quizzy is an online quiz app that aims to test children's knowledge on parts and anatomies of vehicles.",
    trigger: 'mouseenter', //trigger tippy on hower
    placement: 'bottom',
});

tippy('.quiz1-pic', {
    content: "Let's Take a Ride!",
    trigger: 'mouseenter', //trigger tippy on hower
    followCursor: true,
});
tippy('.quiz2-pic', {
    content: "Remember to always buckle up your seatbelt!",
    trigger: 'mouseenter', //trigger tippy on hower
    followCursor: true,
});


//welcome-animation
var logoMoveIn = anime({
    targets: '.logo',
    opacity: [0, 1],
    translateX: 530,
    easing: 'easeOutBounce',
    duration: '3000',
    delay: '1000'
});
var nameMoveIn = anime({
    targets: '#name-welcome',
    scale: [50, 1],
    easing: 'easeOutBounce',
    rotate: 360,
    duration: '1000',
    opacity: [0, 1],
    delay: 200
});

var emojiL=anime({
    targets: '#emojiL',
    rotate: [{value: -20,easing: 'easeOutBounce',  duration: 1000},
    {value: 40,easing: 'easeOutBounce',  duration: 2000}],
    loop: true,
    direction: 'alternate',
    autoplay:true,
});

var emojiL=anime({
    targets: '#emojiR',
    rotate: [{value: 20,easing: 'easeOutBounce',  duration: 1000},
    {value: -40,easing: 'easeOutBounce',  duration: 2000}],
    loop: true,
    direction: 'alternate',
    autoplay:true,
});
//section 2 animation
var welcomeWords=anime({
    targets: '.WelcomeNote1,.welcomeText',
    scale:[1,1.3],
    easing: 'linear',
    duration:800,
    loop: true,
    direction: 'alternate'

});
var cardani = anime({
    targets: '.card',
    opacity: [0, 1],
    easing: 'easeOutQuad',
    delay: anime.stagger(500, { start: 400 }),
});

var bikeAni = anime({
    targets: '.st5',
    rotate: 360, 
    easing: 'linear',
    loop: true,
    direction: 'reverse',
});

var bikeAni2 = anime({
    targets: '.st0,.st1,.st2,.st3,.st4',
    translateY: 6,
    easing: 'linear',
    duration:1000,
    loop: true,
    direction: 'alternate',
});


var carAni = anime({
    targets: '.st7-2',
    rotate: 360, 
    easing: 'linear',
    duration:1000,
    loop: true,
    direction: 'reverse',
});

var carAni2 = anime({
    targets: '.st1-2,.st3-2,.st4-2,.st5-2,.st6-2',
    translateY: 6,
    easing: 'linear',
    duration:1000,
    loop: true,
    direction: 'alternate',
});

var truckAni = anime({
    targets: '.st8-3',
    rotate: 360, 
    easing: 'linear',
    duration:1000,
    loop: true,
    direction: 'reverse',
});

var truckAni2 = anime({
    targets: '.st1-3,.st3-3,.st4-3,.st5-3,.st6-3,.st7-3',
    translateY: 6,
    easing: 'linear',
    duration:1000,
    loop: true,
    direction: 'alternate',
});



//quiz 1 animation
var bikeMove = anime({
    targets: '.quiz1-pic',
    translateX: [{value: 150,easing: 'easeInOutSine', duration: 1000},
    {value: -300,easing: 'easeInOutSine',  duration: 2000},
    {value: 150,easing: 'easeInOutSine',  duration: 1000},
    {value: -300,easing: 'easeInOutSine',  duration: 2000}],
    direction: 'alternate',
    loop:true,
    autoplay:true,
});

var wheelAni = anime({
    targets: '.st36-B',
    rotate: 360, 
    easing: 'linear',
    duration:3000,
    loop: true,
});

var carMove = anime({
    targets: '.quiz2-pic',
    translateX: [{value: 150,easing: 'easeInOutSine', duration: 1000},
    {value: -300,easing: 'easeInOutSine',  duration: 2000},
    {value: 150,easing: 'easeInOutSine',  duration: 1000},
    {value: -300,easing: 'easeInOutSine',  duration: 2000}],
    direction: 'alternate',
    loop:true,
    autoplay:true,
});

var wheelCarAni = anime({
    targets: '.st25-c,.st27-c,.st26-c,.st11-c',
    rotate: 360, 
    easing: 'linear',
    duration:3000,
    loop: true,
});

var smoke = anime({
    targets: '.st21-c',
    scale:[0.5,1],
    opacity: [0, 1],
    easing: 'linear',
    duration:1500,
    direction: 'reverse',
    loop: true,
});


//TIMER

var timer = new easytimer.Timer();
$('.startButton').click(function () {
    timer.start();
});
$('.resetButton').click(function () {
    timer.reset();
});
timer.addEventListener('secondsUpdated', function (e) {
    $('.values').html(timer.getTimeValues().toString());
    $('#timeRecord').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function (e) {
    $('.values').html(timer.getTimeValues().toString());
    $('#timeRecord').html(timer.getTimeValues().toString());
});
timer.addEventListener('reset', function (e) {
    $('.values').html(timer.getTimeValues().toString());
    $('#timeRecord').html(timer.getTimeValues().toString());
});


//quiz1 section//

$('#quiz').quiz({
    // allows incorrect options
    allowIncorrect: false,

    // counter settings
    counter: true,
    counterFormat: 'Question: %current/%total',

    // default selectors & format
    startScreen: '#quiz-start-screen',
    startButton: '#quiz-start-btn',
    homeButton: '#quiz-home-btn',
    resultsScreen: '#quiz-results-screen',
    resultsFormat: 'You got %score out of %total correct!',
    gameOverScreen: '#quiz-gameover-screen',

    // button text
    nextButtonText: 'Next',
    finishButtonText: 'Finish',
    restartButtonText: 'Restart',

    answerCallback: function (currentQuestion, selected, questions, [currentQuestionIndex]) {
        // do something
    },

    nextCallback: function () {
        // do something
    },

    finishCallback: function () {
        // do something
        timer.stop();
        $('.values').html(" ");
    },

    homeCallback: function () {
        // do something
    },

    resetCallback: function () {
        // do something
        timer.reset();
    },

    setupCallback: function () {
        // do something
    },

    questions: [
        {
            'q': 'How many wheels does a bicyle have?',
            'options': [
                '1',
                '2',
                '3',
                '4'
            ],
            'correctIndex': 1,
            'correctResponse': "That's correct!Well done!",
            'incorrectResponse': 'Hint: Bicycle only have 2 wheels.'
        },
        {
            'q': 'What do you need to wear when driving a bicycle?',
            'options': [
                'Helmet',
                'Candy',
                'Toy',
                'Watch'
            ],
            'correctIndex': 0,
            'correctResponse': "That's correct!Well done!",
            'incorrectResponse': 'Hint: We wear helmet when riding a bicycle.'
        },
        {
            'q': 'Which part circle in the image is use to stop the bicycle? <img src="img/bicycle-half.jpg" style="width:40%">',
            'options': [
                '1',
                '2',
                '3',
                '4'
            ],
            'correctIndex': 0,
            'correctResponse': "That's correct!Well done!",
            'incorrectResponse': 'Hint: We use handle brake to stop a bicycle.'
        },
        {
            'q': 'What is the normal price range for a bicycle?',
            'options': [
                '$10',
                '$1',
                '$100',
                '$5'
            ],
            'correctIndex': 2,
            'correctResponse': "That's correct!Well done!",
            'incorrectResponse': 'Hint: A normal bicycle cost around $100.'
        },
        {
            'q': 'Which path should you take when riding a bicycle?',
            'options': [
                'A path full of grass and rock',
                'Sidewalk for people to use only',
                'Highway',
                'Bike path'
            ],
            'correctIndex': 3,
            'correctResponse': "That's correct!Well done!",
            'incorrectResponse': 'Hint: Bicycle should only take the bike path.'
        }
    ]


});
const myQuiz = [
    {
        'q': 'A s<a href="https://www.jqueryscript.net/tags.php?/map/">map</a>le question?',
        'options': [
            'Answer 1',
            'Answer 2',
            'Answer 3',
            'Answer 4'
        ],
        'correctIndex': 1,
        'correctResponse': 'Custom correct response.',
        'incorrectResponse': 'Custom incorrect response.'
    },
    {
        'q': 'A smaple question?',
        'options': [
            'Answer 1',
            'Answer 2'
        ],
        'correctIndex': 1,
        'correctResponse': 'Custom correct response.',
        'incorrectResponse': 'Custom incorrect response.'
    },
    {
        'q': 'A smaple question?',
        'options': [
            'Answer 1',
            'Answer 2',
            'Answer 3',
            'Answer 4'
        ],
        'correctIndex': 2,
        'correctResponse': 'Custom correct response.',
        'incorrectResponse': 'Custom incorrect response.'
    },
    {
        'q': 'A smaple question?',
        'options': [
            'Answer 1',
            'Answer 2'
        ],
        'correctIndex': 1,
        'correctResponse': 'Custom correct response.',
        'incorrectResponse': 'Custom incorrect response.'
    },
    {
        'q': 'A smaple question?',
        'options': [
            'Answer 1',
            'Answer 2',
            'Answer 3',
            'Answer 4'
        ],
        'correctIndex': 3,
        'correctResponse': 'Custom correct response.',
        'incorrectResponse': 'Custom incorrect response.'
    }
]
