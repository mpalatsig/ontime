webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/active-event/active-event.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/active-event/active-event.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n\n<div *ngIf=\"event\">\n  <div>\n    <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n  </div>\n  <div>\n    <h1> Active event: {{event.summary}}</h1>\n  </div>\n  <form enctype=\"multipart/form-data\">\n\n    <div>\n      <p for=\"date-name-input\"> Started at {{event.startDate | date: 'dd/MM/yyyy' }}</p>\n\n    </div>\n    <div>\n      <p for=\"date-name-input\"> End Date at {{event.endDate | date: 'dd/MM/yyyy' }}</p>\n    </div>\n    <div>\n      <div>\n        <p>Description</p>\n        <p>{{event.description}}</p>\n      </div>\n    </div>\n    <div>\n      <div> Attendees:\n        <ul>\n          <li *ngFor=\"let attendee of attendees\">\n            <span *ngIf=\"(attendee.userID.displayName != '')\"> {{ attendee.userID.displayName }} </span><span *ngIf=\"(attendee.userID.displayName == '' && attendee.userID.username != '')\"> {{ attendee.userID.username }} </span><span *ngIf=\"(attendee.userID.displayName == '' && attendee.userID.username == '')\"> {{ attendee.userID.email }} </span>\n            <span *ngIf=\"(attendee.timeLate == null && event.status == true)\"> <button (click)=\"setArrival(attendee._id)\" type=\"submit\" name=\"button\">Set Time Arrival</button> </span>\n            <span *ngIf=\"(attendee.timeLate > 0)\">{{ attendee.timeLate }} minutes late</span>\n            <span *ngIf=\"(attendee.timeLate <= 0 && attendee.timeLate != null)\">On time!</span>\n            <span *ngIf=\"(attendee.timeLate == null && event.status == false)\"> <button (click)=\"setArrival(attendee._id)\" type=\"submit\" name=\"button\">Mark as On Time</button> </span>\n            <span *ngIf=\"(attendee.timeLate == null && event.status == false)\"> <button (click)=\"justify()\" type=\"submit\" name=\"button\">Mark as Justified</button> </span>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div>Total Penalties to Pay: {{ event.penaltyAmount }} EUR </div>\n    <div *ngIf=\"(event.status == false)\">\n      <button (click)=\"startEvent()\" type=\"submit\" name=\"action\">Start Event</button>\n    </div>\n    <div *ngIf=\"(event.status == true)\">\n      <button (click)=\"stopEvent()\" type=\"submit\" name=\"action\">Finish Event</button>\n    </div>\n\n  </form>\n</div>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/active-event/active-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__ = __webpack_require__("../../../../../src/app/services/penalty.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__ = __webpack_require__("../../../../../src/app/services/eventuser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveEventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ActiveEventComponent = (function () {
    function ActiveEventComponent(eventService, eventUserService, teamService, penaltyService, session, route, router) {
        this.eventService = eventService;
        this.eventUserService = eventUserService;
        this.teamService = teamService;
        this.penaltyService = penaltyService;
        this.session = session;
        this.route = route;
        this.router = router;
        this.buttonArrivalCheck = false;
        this.lateTime = "has not arrived";
    }
    ActiveEventComponent.prototype.ngOnInit = function () {
        this.initializeComponent();
    };
    ActiveEventComponent.prototype.initializeComponent = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.eventService.getEvent(params.id).subscribe(function (result) {
                _this.event = result;
                _this.eventUserService.indexEventUsersRelations(result._id).subscribe(function (attendees) {
                    _this.attendees = attendees;
                    console.log(_this.attendees);
                    _this.teamService.indexTeams().subscribe((function (teamsAvailable) {
                        _this.availableTeamsEvent = teamsAvailable;
                        console.log(teamsAvailable);
                    }), (function (err) { return console.log(err); }));
                });
            });
        });
    };
    ActiveEventComponent.prototype.startEvent = function () {
        var _this = this;
        this.status = true;
        this.eventService.startEvent(this.event, this.status)
            .subscribe(function (event) {
            console.log(_this.status);
            var newEventData = {
                summary: _this.event.summary,
                description: _this.event.description,
                team: _this.event.team,
                attendees: _this.event.attendees,
                startDate: new Date(),
                endDate: _this.event.endDate,
                status: true,
                penaltyAmount: _this.event.penaltyAmount,
            };
            _this.eventService.editEvent(_this.event, newEventData)
                .subscribe(function (event) {
                console.log(event);
                _this.initializeComponent();
            });
        }, function (err) { _this.error = err; });
    };
    ActiveEventComponent.prototype.stopEvent = function () {
        var _this = this;
        this.status = false;
        this.eventService.stopEvent(this.event, this.status)
            .subscribe(function (event) {
            console.log(_this.status);
            _this.saveTimeLatesInEvent();
            _this.initializeComponent();
            var teamUpdates = {
                penalties: _this.event.penaltyAmount
            };
            _this.teamService.editTeam(_this.event.team, teamUpdates).subscribe(function (team) {
                console.log(team);
            });
        }, function (err) { _this.error = err; });
    };
    ActiveEventComponent.prototype.setArrival = function (relationID, event) {
        var _this = this;
        this.eventUserService.editEventUsersRelations(relationID, this.event.startDate)
            .subscribe(function (relation) {
            _this.relation = relation;
            var currentRelation = _this.attendees.filter(function (e) { return e._id == relationID; });
            currentRelation[0].timeLate = _this.relation.timeLate; //set the value of the first and only object of the array "currentRelation" to timeLate
            _this.saveTimeLatesInEvent();
        }, function (err) { _this.error = err; });
    };
    ActiveEventComponent.prototype.checkTimeLates = function () {
        var sumTimeLates = this.attendees.reduce(function (x, y) { return x + y.timeLate; }, 0);
        console.log("the sumTimeLates is: " + sumTimeLates);
        return sumTimeLates;
    };
    ActiveEventComponent.prototype.saveTimeLatesInEvent = function () {
        var _this = this;
        this.event.penaltyAmount = this.checkTimeLates();
        var eventFinishedData = {
            summary: this.event.summary,
            description: this.event.description,
            team: this.event.team,
            attendees: this.event.attendees,
            startDate: this.event.startDate,
            endDate: this.event.startDate,
            status: this.event.status,
            penaltyAmount: this.event.penaltyAmount,
        };
        console.log("Le estoy pasando estos datos para editar");
        console.log(eventFinishedData);
        this.eventService.editEvent(this.event, eventFinishedData)
            .subscribe(function (event) {
            console.log(event);
        }, function (err) { return _this.error = err; });
    };
    return ActiveEventComponent;
}());
ActiveEventComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-active-event',
        template: __webpack_require__("../../../../../src/app/active-event/active-event.component.html"),
        styles: [__webpack_require__("../../../../../src/app/active-event/active-event.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__["a" /* EventUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__["a" /* EventUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_team_service__["a" /* TeamService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _g || Object])
], ActiveEventComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=active-event.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n  <!-- Dropdown Structure -->\n  <ul id=\"dropdown1\" class=\"dropdown-content\">\n    <li><a href=\"#!\">one</a></li>\n    <li><a href=\"#!\">two</a></li>\n    <li class=\"divider\"></li>\n    <li><a href=\"#!\">three</a></li>\n  </ul>\n  <nav class=\"light-blue\">\n  <div class=\"nav-wrapper\">\n    <a href=\"#!\" class=\"brand-logo\">Ontime</a>\n    <a href=\"\" data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n    <ul class=\"right hide-on-med-and-down\">\n      <li><a [routerLink]=\"['/teams']\">My Teams</a></li>\n      <li><a (click)=\"logout()\">Logout</a></li>\n      <li><a class=\"dropdown-button\" data-activates=\"dropdown1\">{{ session.user.username }}<i class=\"material-icons right\">arrow_drop_down</i></a></li>\n    </ul>\n    <ul class=\"side-nav\" id=\"mobile-demo\">\n      <li><a [routerLink]=\"['/teams']\">My Teams</a></li>\n      <li><a (click)=\"logout()\">Logout</a></li>\n      <!-- Dropdown Trigger -->\n      <li><a class=\"dropdown-button\" data-activates=\"dropdown1\">{{ session.user.username }}<i class=\"material-icons right\">arrow_drop_down</i></a></li>\n    </ul>\n  </div>\n</nav>\n\n</div>\n\n\n\n<nav  class=\"light-blue\" *ngIf=\"!session.user\">\n  <div class=\"nav-wrapper\">\n    <a href=\"#!\" class=\"brand-logo\">Ontime</a>\n    <a href=\"\" data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n    <ul class=\"right hide-on-med-and-down\">\n      <li><a [routerLink]=\"['/signup']\">Signup</a></li>\n      <li><a [routerLink]=\"['/login']\">Login</a></li>\n    </ul>\n    <ul class=\"side-nav\" id=\"mobile-demo\">\n      <li><a [routerLink]=\"['/signup']\">Signup</a></li>\n      <li><a [routerLink]=\"['/login']\">Login</a></li>\n    </ul>\n  </div>\n</nav>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_init_js__ = __webpack_require__("../../../../../src/app/js/init.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_init_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__js_init_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(session, router) {
        this.session = session;
        this.router = router;
        this.title = 'app';
        console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* isDevMode */])());
        if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production === false) {
            console.log("Si está en production");
        }
        else {
            console.log("No está una mierda");
        }
    }
    AppComponent.prototype.logout = function () {
        this.session.logout().subscribe();
        this.router.navigate(['/login']);
        console.log("user has logged out");
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_materialize_css__ = __webpack_require__("../../../../materialize-css/dist/js/materialize.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_materialize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_materialize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_materialize__ = __webpack_require__("../../../../angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_penalty_service__ = __webpack_require__("../../../../../src/app/services/penalty.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_eventuser_service__ = __webpack_require__("../../../../../src/app/services/eventuser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes__ = __webpack_require__("../../../../../src/app/routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__login_form_login_form_component__ = __webpack_require__("../../../../../src/app/login-form/login-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__signup_form_signup_form_component__ = __webpack_require__("../../../../../src/app/signup-form/signup-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__events_list_events_list_component__ = __webpack_require__("../../../../../src/app/events-list/events-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__new_event_form_new_event_form_component__ = __webpack_require__("../../../../../src/app/new-event-form/new-event-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__edit_event_edit_event_component__ = __webpack_require__("../../../../../src/app/edit-event/edit-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__new_team_form_new_team_form_component__ = __webpack_require__("../../../../../src/app/new-team-form/new-team-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__teams_list_teams_list_component__ = __webpack_require__("../../../../../src/app/teams-list/teams-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__edit_team_edit_team_component__ = __webpack_require__("../../../../../src/app/edit-team/edit-team.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__active_event_active_event_component__ = __webpack_require__("../../../../../src/app/active-event/active-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__team_team_component__ = __webpack_require__("../../../../../src/app/team/team.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_teamuser_service__ = __webpack_require__("../../../../../src/app/services/teamuser.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_14__login_form_login_form_component__["a" /* LoginFormComponent */],
            __WEBPACK_IMPORTED_MODULE_15__signup_form_signup_form_component__["a" /* SignupFormComponent */],
            __WEBPACK_IMPORTED_MODULE_16__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_17__events_list_events_list_component__["a" /* EventsListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__new_event_form_new_event_form_component__["a" /* NewEventFormComponent */],
            __WEBPACK_IMPORTED_MODULE_19__edit_event_edit_event_component__["a" /* EditEventComponent */],
            __WEBPACK_IMPORTED_MODULE_20__new_team_form_new_team_form_component__["a" /* NewTeamFormComponent */],
            __WEBPACK_IMPORTED_MODULE_21__teams_list_teams_list_component__["a" /* TeamsListComponent */],
            __WEBPACK_IMPORTED_MODULE_22__edit_team_edit_team_component__["a" /* EditTeamComponent */],
            __WEBPACK_IMPORTED_MODULE_23__active_event_active_event_component__["a" /* ActiveEventComponent */],
            __WEBPACK_IMPORTED_MODULE_24__team_team_component__["a" /* TeamComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1_angular2_materialize__["a" /* MaterializeModule */],
            __WEBPACK_IMPORTED_MODULE_13__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__routes__["a" /* routes */]),
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__services_session_service__["a" /* SessionService */],
            __WEBPACK_IMPORTED_MODULE_6__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_7__services_team_service__["a" /* TeamService */],
            __WEBPACK_IMPORTED_MODULE_8__services_penalty_service__["a" /* PenaltyService */],
            __WEBPACK_IMPORTED_MODULE_9__services_eventuser_service__["a" /* EventUserService */],
            __WEBPACK_IMPORTED_MODULE_25__services_teamuser_service__["a" /* TeamUserService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/edit-event/edit-event.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/edit-event/edit-event.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n\n\n<div *ngIf =\"event\">\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n</div>\n<div>\n  <h1>Edit {{event.summary}} Event</h1>\n</div>\n<form enctype=\"multipart/form-data\">\n  <div>\n    <div>\n      <label for=\"title\">Title for the event</label>\n      <input id=\"title\" type=\"text\" name=\"title\"  [(ngModel)]=\"formInfo.summary\">\n    </div>\n  </div>\n  <div>\n      <label for=\"date-name-input\"> Current Starting Date: {{event.startDate | date: 'dd/MM/yyyy' }}, New Start Date: </label>\n      <input type=\"datetime-local\" name=\"startDate\" class=\"form-control\" placeholder=\"From\" [(ngModel)]=\"formInfo.startDate\">\n    </div>\n    <div>\n      <label for=\"date-name-input\"> Current Finish Date {{event.endDate  | date: 'dd/MM/yyyy' }}, New End Date</label>\n      <input type=\"datetime-local\" name=\"endDate\" class=\"form-control\" placeholder=\"Until\" [(ngModel)]=\"formInfo.endDate\">\n    </div>\n  <div>\n    <div>\n      <label for=\"description\">Descripcion</label>\n      <textarea id=\"description\" type=\"text\" name=\"description\" [(ngModel)]=\"formInfo.description\"></textarea>\n    </div>\n  </div>\n  <div>\n    <div>\n      <label for=\"attendees\">Attendees</label>\n      <input id=\"attendees\" type=\"text\" name=\"attendees\" [(ngModel)]=\"formInfo.attendees\">\n    </div>\n  </div>\n  <!-- <div>\n    <label for=\"teamsav\">Team of the event</label>\n    <select class=\"form-control\" id=teams [(ngModel)]=\"formInfo.team\" name=\"team\">\n      <option *ngFor=\"let availableTeamEvent of availableTeamsEvent\" [ngValue]=\"availableTeamEvent.teamID._id\" #teamValue >{{ availableTeamEvent.teamID.teamName }}</option>\n    </select>\n  </div> -->\n  <div>\n    <button (click)=\"editEvent()\" type=\"submit\" name=\"action\">Edit</button>\n  </div>\n  <div>\n    <button (click)=\"deleteEvent()\" type=\"submit\" name=\"action\">Delete</button>\n  </div>\n  <div>\n    <!-- <button (click)=\"startEvent()\" type=\"submit\" name=\"action\">Start Event</button> -->\n    <a [routerLink]=\"['/event/', event._id, 'active']\">Start Event</a>\n  </div>\n\n</form>\n</div>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/edit-event/edit-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__ = __webpack_require__("../../../../../src/app/services/penalty.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditEventComponent = (function () {
    function EditEventComponent(eventService, penaltyService, session, route, router) {
        this.eventService = eventService;
        this.penaltyService = penaltyService;
        this.session = session;
        this.route = route;
        this.router = router;
        this.formInfo = {
            summary: '',
            description: '',
            team: '',
            attendees: '',
            startDate: '',
            endDate: '',
            status: '',
            penaltyAmount: '',
        };
    }
    EditEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.eventService.getEvent(params.id).subscribe(function (result) {
                _this.event = result;
                _this.formInfo.summary = _this.event.summary;
                _this.formInfo.description = _this.event.description;
                _this.formInfo.team = _this.event.team;
                _this.formInfo.attendees = _this.event.attendees;
                _this.formInfo.startDate = _this.event.startDate;
                _this.formInfo.endDate = _this.event.endDate;
                _this.formInfo.status = _this.event.status;
                _this.formInfo.penaltyAmount = _this.event.penaltyAmount;
            });
        });
    };
    EditEventComponent.prototype.editEvent = function () {
        var _this = this;
        this.eventService.editEvent(this.event, this.formInfo)
            .subscribe(function (event) { return _this.router.navigate(['/home']); }, function (err) { return _this.error = err; });
    };
    EditEventComponent.prototype.deleteEvent = function () {
        var _this = this;
        this.eventService.deleteEvent(this.event._id)
            .subscribe(function (event) { return _this.router.navigate(['/home']); }, function (err) { return _this.error = err; });
    };
    return EditEventComponent;
}());
EditEventComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-edit-event',
        template: __webpack_require__("../../../../../src/app/edit-event/edit-event.component.html"),
        styles: [__webpack_require__("../../../../../src/app/edit-event/edit-event.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _e || Object])
], EditEventComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=edit-event.component.js.map

/***/ }),

/***/ "../../../../../src/app/edit-team/edit-team.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/edit-team/edit-team.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n\n<div *ngIf =\"team\">\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Home </a>\n</div>\n<div>\n  <h1>Edit {{team.teamName}} team</h1>\n</div>\n<form enctype=\"multipart/form-data\">\n  <div>\n    <div>\n      <label for=\"teamName\">Name of the team</label>\n      <input id=\"teamName\" type=\"text\" name=\"teamName\"  [(ngModel)]=\"formInfo.teamName\">\n    </div>\n  </div>\n  <div>\n    <div>\n      <label for=\"members\">Members</label>\n      <input id=\"members\" type=\"text\" name=\"members\"  [(ngModel)]=\"formInfo.members\">\n    </div>\n  </div>\n  <div>\n    <button (click)=\"editTeam()\" type=\"submit\" name=\"action\">Edit</button>\n  </div>\n  <div>\n    <button (click)=\"deleteTeam()\" type=\"submit\" name=\"action\">Delete</button>\n  </div>\n\n</form>\n</div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/edit-team/edit-team.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditTeamComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditTeamComponent = (function () {
    function EditTeamComponent(teamService, session, route, router) {
        this.teamService = teamService;
        this.session = session;
        this.route = route;
        this.router = router;
        this.formInfo = {
            teamName: '',
            members: ''
        };
    }
    EditTeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.teamService.getTeam(params.id)
                .subscribe(function (returnedTeam) {
                _this.team = returnedTeam;
                _this.formInfo.teamName = _this.team.teamName;
                _this.formInfo.members = _this.team.members;
            });
        });
    };
    EditTeamComponent.prototype.editTeam = function () {
        var _this = this;
        this.teamService.editTeam(this.team, this.formInfo)
            .subscribe(function (team) { return _this.router.navigate(['/teams']); }, function (err) { return _this.error = err; });
    };
    return EditTeamComponent;
}());
EditTeamComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-edit-team',
        template: __webpack_require__("../../../../../src/app/edit-team/edit-team.component.html"),
        styles: [__webpack_require__("../../../../../src/app/edit-team/edit-team.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _d || Object])
], EditTeamComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=edit-team.component.js.map

/***/ }),

/***/ "../../../../../src/app/events-list/events-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n/*.card {\n  width: 60%;\n  margin-left: 20%;\n  margin-right: 20%;\n\n}*/\n\n\n.container  {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.container .row {\n  margin: 0 auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/events-list/events-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container row\" *ngIf=\"user\">\n\n\n\n  <div *ngIf=\"events\" class=\"col s12 m6 offset-m3\">\n\n  <h4> My Events List </h4><span>\n    <button class=\"waves-effect waves-light btn light-blue \" type=\"button\" name=\"button\" [routerLink]=\"['/newevent']\">Create New Event</button>\n  </span>\n  <span><button class=\"waves-effect waves-light btn light-blue\" type=\"button\" name=\"button\" [routerLink]=\"['/newteam']\">Create New Team</button>\n  </span>\n\n    <div *ngFor=\"let event of events | async\">\n\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"card light-blue lighten-5\">\n            <div class=\"card-content  light-blue-text text-darken-3\">\n              <span class=\"card-title light-blue-text text-darken-4\">Event: {{ event.eventID.summary }}</span>\n              <p>{{ event.eventID.description }}</p>\n            </div>\n            <div class=\"card-action\">\n              <a class=\"right-align light-blue-text\" [routerLink]=\"['/event', event.eventID._id]\">Edit</a>\n              <a class=\"right-align light-blue-text\" [routerLink]=\"['/event/', event.eventID._id, 'active']\">Start Event</a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/events-list/events-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventsListComponent = (function () {
    function EventsListComponent(eventService, session) {
        this.eventService = eventService;
        this.session = session;
    }
    EventsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.isLoggedIn().subscribe(function (u) { _this.user = u; });
        this.events = this.eventService.indexEvents();
    };
    return EventsListComponent;
}());
EventsListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-events-list',
        template: __webpack_require__("../../../../../src/app/events-list/events-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/events-list/events-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _b || Object])
], EventsListComponent);

var _a, _b;
//# sourceMappingURL=events-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  home works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(session, router) {
        this.session = session;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/js/init.js":
/***/ (function(module, exports) {

(function($){
  $(function(){


  $(".dropdown-button").dropdown();
  $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


/***/ }),

/***/ "../../../../../src/app/login-form/login-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*vertical-align: middle;\n  margin-top: 10%;*/\n  height: 100vh;\n}\n\n.btn {\n\n}\n\n.backlink {\n  margin-top: 300px;\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login-form/login-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"valign-wrapper login\" *ngIf=\"!session.user\">\n\n<div class=\"row\">\n  <form class=\"col s12\">\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input id=\"username\" type=\"text\" class=\"validate\" [(ngModel)]=\"username\" name=\"username\">\n        <label for=\"email\">Username</label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input id=\"password\" type=\"password\" class=\"validate\" [(ngModel)]=\"password\" name=\"password\">\n        <label for=\"password\">Password</label>\n      </div>\n    </div>\n    <button (click)=\"login()\" class=\"btn waves-effect waves-light light-blue\" type=\"submit\" name=\"action\">Login\n    <i class=\"material-icons right\">send</i>\n  </button>\n  </form>\n  <p class=\"error\"> {{ error }} </p>\n  <div class=\"center-align backlink\">\n    <a [routerLink]=\"['/signup']\"> You don't have an account, Go to signup </a>\n  </div>\n</div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login-form/login-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginFormComponent = (function () {
    function LoginFormComponent(session, router) {
        this.session = session;
        this.router = router;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent.prototype.login = function () {
        var _this = this;
        this.session.login(this.username, this.password)
            .subscribe(function (user) {
            console.log(user);
            _this.router.navigate(['home']);
        }, function (err) { return _this.error = err; });
        console.log(this.username + " is logged");
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login-form',
        template: __webpack_require__("../../../../../src/app/login-form/login-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login-form/login-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], LoginFormComponent);

var _a, _b;
//# sourceMappingURL=login-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/new-event-form/new-event-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/new-event-form/new-event-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user\">\n\n\n\n\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n</div>\n<div>\n  <h1>New Event</h1>\n</div>\n<form enctype=\"multipart/form-data\">\n  <div>\n    <div>\n      <label for=\"title\">Title for the Event</label>\n      <input id=\"title\" type=\"text\" name=\"title\" [(ngModel)]=\"summary\" required>\n    </div>\n  </div>\n  <div>\n      <label for=\"date-name-input\"> Start Date</label>\n      <input type=\"datetime-local\" name=\"startDate\" class=\"form-control\" placeholder=\"From\" [(ngModel)]=\"startDate\">\n    </div>\n    <div>\n      <label for=\"date-name-input\"> End Date</label>\n      <input type=\"datetime-local\" name=\"endDate\" class=\"form-control\" placeholder=\"Until\" [(ngModel)]=\"endDate\">\n    </div>\n  <div>\n    <div>\n      <label for=\"description\">Descripcion</label>\n      <textarea id=\"description\" type=\"text\" name=\"description\" [(ngModel)]=\"description\"></textarea>\n    </div>\n  </div>\n  <div>\n    <div>\n      <label for=\"attendees\">Attendees</label>\n      <input id=\"attendees\" type=\"text\" name=\"attendees\" [(ngModel)]=\"attendees\">\n    </div>\n  </div>\n  <div>\n    <label for=\"teamsav\">Team of the event</label>\n    <select class=\"form-control\" id=teams [(ngModel)]=\"team\" name=\"team\">\n      <option *ngFor=\"let availableTeamEvent of availableTeamsEvent\" [ngValue]=\"availableTeamEvent.teamID._id\" #teamValue >{{ availableTeamEvent.teamID.teamName }}</option>\n    </select>\n  </div>\n  <div>\n    <button (click)=\"newEvent()\" type=\"submit\" name=\"action\">Submit</button>\n  </div>\n</form>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/new-event-form/new-event-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewEventFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewEventFormComponent = (function () {
    function NewEventFormComponent(eventService, teamService, session, router) {
        this.eventService = eventService;
        this.teamService = teamService;
        this.session = session;
        this.router = router;
    }
    NewEventFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teamService.indexTeams()
            .subscribe((function (teamsAvailable) {
            _this.availableTeamsEvent = teamsAvailable;
            console.log(teamsAvailable);
        }), (function (err) { return console.log(err); }));
    };
    NewEventFormComponent.prototype.newEvent = function () {
        var _this = this;
        this.eventService.newEvent(this.summary, this.description, this.team, this.attendees, this.startDate, this.endDate, this.status, this.penaltyAmount)
            .subscribe(function (event) { return console.log(event); }, function (err) { return _this.error = err; });
    };
    return NewEventFormComponent;
}());
NewEventFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-new-event-form',
        template: __webpack_require__("../../../../../src/app/new-event-form/new-event-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/new-event-form/new-event-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_team_service__["a" /* TeamService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _d || Object])
], NewEventFormComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=new-event-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/new-team-form/new-team-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/new-team-form/new-team-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n</div>\n<div>\n  <h1>Create a New Team</h1>\n</div>\n<form enctype=\"multipart/form-data\">\n  <div>\n    <div>\n      <label for=\"title\">Name of the Team</label>\n      <input id=\"title\" type=\"text\" name=\"teamName\" [(ngModel)]=\"teamName\" required>\n    </div>\n  </div>\n  <div>\n    <div>\n      <label for=\"members\">Members</label>\n      <input id=\"members\" type=\"text\" name=\"members\" [(ngModel)]=\"members\">\n    </div>\n  </div>\n\n  <div>\n    <button (click)=\"newTeam()\" type=\"submit\" name=\"action\">Create</button>\n  </div>\n</form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/new-team-form/new-team-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewTeamFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewTeamFormComponent = (function () {
    function NewTeamFormComponent(teamService, session, router) {
        this.teamService = teamService;
        this.session = session;
        this.router = router;
    }
    NewTeamFormComponent.prototype.ngOnInit = function () {
    };
    NewTeamFormComponent.prototype.newTeam = function () {
        var _this = this;
        this.teamService.newTeam(this.teamName, this.members)
            .subscribe(function (team) { return console.log(team); }, function (err) { return _this.error = err; });
    };
    return NewTeamFormComponent;
}());
NewTeamFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-new-team-form',
        template: __webpack_require__("../../../../../src/app/new-team-form/new-team-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/new-team-form/new-team-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _c || Object])
], NewTeamFormComponent);

var _a, _b, _c;
//# sourceMappingURL=new-team-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signup_form_signup_form_component__ = __webpack_require__("../../../../../src/app/signup-form/signup-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_form_login_form_component__ = __webpack_require__("../../../../../src/app/login-form/login-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_list_events_list_component__ = __webpack_require__("../../../../../src/app/events-list/events-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__new_event_form_new_event_form_component__ = __webpack_require__("../../../../../src/app/new-event-form/new-event-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_event_edit_event_component__ = __webpack_require__("../../../../../src/app/edit-event/edit-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_team_form_new_team_form_component__ = __webpack_require__("../../../../../src/app/new-team-form/new-team-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__teams_list_teams_list_component__ = __webpack_require__("../../../../../src/app/teams-list/teams-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__edit_team_edit_team_component__ = __webpack_require__("../../../../../src/app/edit-team/edit-team.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__active_event_active_event_component__ = __webpack_require__("../../../../../src/app/active-event/active-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__team_team_component__ = __webpack_require__("../../../../../src/app/team/team.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });










var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_0__signup_form_signup_form_component__["a" /* SignupFormComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__login_form_login_form_component__["a" /* LoginFormComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__events_list_events_list_component__["a" /* EventsListComponent */] },
    { path: 'newevent', component: __WEBPACK_IMPORTED_MODULE_3__new_event_form_new_event_form_component__["a" /* NewEventFormComponent */] },
    { path: 'event/:id', component: __WEBPACK_IMPORTED_MODULE_4__edit_event_edit_event_component__["a" /* EditEventComponent */] },
    { path: 'event/:id/active', component: __WEBPACK_IMPORTED_MODULE_8__active_event_active_event_component__["a" /* ActiveEventComponent */] },
    { path: 'newteam', component: __WEBPACK_IMPORTED_MODULE_5__new_team_form_new_team_form_component__["a" /* NewTeamFormComponent */] },
    { path: 'teams', component: __WEBPACK_IMPORTED_MODULE_6__teams_list_teams_list_component__["a" /* TeamsListComponent */] },
    { path: 'team/:id/details', component: __WEBPACK_IMPORTED_MODULE_9__team_team_component__["a" /* TeamComponent */] },
    { path: 'team/:id/edit', component: __WEBPACK_IMPORTED_MODULE_7__edit_team_edit_team_component__["a" /* EditTeamComponent */] },
];
//# sourceMappingURL=routes.js.map

/***/ }),

/***/ "../../../../../src/app/services/event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventService = (function () {
    function EventService(http) {
        this.http = http;
        this.BASE_URL = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].BASE_URL;
        this.options = { withCredentials: true };
        this.count = 0;
    }
    EventService.prototype.indexEvents = function () {
        console.log('index events');
        return this.http.get(this.BASE_URL + "/api/events", this.options)
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.newEvent = function (summary, description, team, attendees, startDate, endDate, status, penaltyAmount) {
        console.log('new event');
        return this.http.post(this.BASE_URL + "/api/events", {
            summary: summary,
            description: description,
            team: team,
            attendees: attendees,
            startDate: startDate,
            endDate: endDate,
            status: status,
            penaltyAmount: penaltyAmount,
        }, this.options)
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.getEvent = function (id) {
        console.log('get event');
        return this.http.get(this.BASE_URL + "/api/events/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.editEvent = function (event, formInfo) {
        console.log('edit event');
        console.log('lo que devuelve formInfo es:');
        console.log(formInfo);
        console.log(event);
        return this.http.put(this.BASE_URL + "/api/events/edit/" + event._id, formInfo, this.options)
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.deleteEvent = function (id) {
        console.log('delete event');
        return this.http.delete(this.BASE_URL + "/api/events/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.startEvent = function (event, status) {
        console.log('start event');
        return this.http.put(this.BASE_URL + "/api/events/start/" + event._id, { status: status }, this.options)
            .map(function (res) { return res.json(); });
        //  this.count++;
        //  console.log(`Count is now ${this.count}`);
    };
    EventService.prototype.stopEvent = function (event, status) {
        console.log('stop event');
        return this.http.put(this.BASE_URL + "/api/events/stop/" + event._id, { status: status }, this.options)
            .map(function (res) { return res.json(); });
    };
    return EventService;
}());
EventService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], EventService);

var _a;
//# sourceMappingURL=event.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/eventuser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventUserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventUserService = (function () {
    function EventUserService(http) {
        this.http = http;
        this.BASE_URL = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].BASE_URL;
        this.options = { withCredentials: true };
    }
    EventUserService.prototype.indexEventUsersRelations = function (id) {
        return this.http
            .get(this.BASE_URL + "/api/events/" + id + "/users", this.options)
            .map(function (res) { return res.json(); });
    };
    EventUserService.prototype.editEventUsersRelations = function (relationID, startDate) {
        return this.http
            .put(this.BASE_URL + "/api/events/eventusers/" + relationID, { startDate: startDate }, this.options)
            .map(function (res) { return res.json(); });
    };
    return EventUserService;
}());
EventUserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], EventUserService);

var _a;
//# sourceMappingURL=eventuser.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/penalty.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PenaltyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PenaltyService = (function () {
    function PenaltyService(http) {
        this.http = http;
        this.BASE_URL = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].BASE_URL;
        this.options = { withCredentials: true };
    }
    PenaltyService.prototype.indexPenalties = function () {
        return this.http.get(this.BASE_URL + "/api/penalties", this.options)
            .map(function (res) { return res.json(); });
    };
    PenaltyService.prototype.newPenalty = function (teamName, members) {
        return this.http.post(this.BASE_URL + "/api/penalties", { teamName: teamName, members: members }, this.options)
            .map(function (res) { return res.json(); });
    };
    PenaltyService.prototype.getPenalty = function (id) {
        return this.http.get(this.BASE_URL + "/api/penalties/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    PenaltyService.prototype.editPenalty = function (event, formInfo) {
        return this.http.put(this.BASE_URL + "/api/penalties/" + event._id, formInfo, this.options)
            .map(function (res) { return res.json(); });
    };
    PenaltyService.prototype.deletePenalty = function (id) {
        return this.http.delete(this.BASE_URL + "/api/penalties/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    return PenaltyService;
}());
PenaltyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], PenaltyService);

var _a;
//# sourceMappingURL=penalty.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SessionService = (function () {
    function SessionService(http) {
        var _this = this;
        this.http = http;
        this.startLoginCompleted = false;
        this.BASE_URL = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].BASE_URL + "/api/auth";
        this.options = { withCredentials: true };
        this.isLoggedIn().subscribe(function (user) {
            console.log("Welcome again user " + user.username);
            _this.user = user;
            _this.startLoginCompleted = true;
        }, function (e) { return _this.startLoginCompleted = true; });
    }
    SessionService.prototype.handleError = function (e) {
        console.error("Error en la llamada a la API");
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(e.json().message);
    };
    SessionService.prototype.signup = function (username, password, email) {
        return this.http.post(this.BASE_URL + "/signup", { username: username, password: password, email: email }, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SessionService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(this.BASE_URL + "/login", { username: username, password: password }, this.options)
            .map(function (res) {
            _this.user = res.json();
            return _this.user;
        })
            .catch(this.handleError);
    };
    SessionService.prototype.logout = function () {
        var _this = this;
        return this.http.get(this.BASE_URL + "/logout", this.options)
            .map(function (res) {
            res.json();
            _this.user = undefined;
        })
            .catch(this.handleError);
    };
    SessionService.prototype.isLoggedIn = function () {
        return this.http.get(this.BASE_URL + "/loggedin", this.options)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    return SessionService;
}());
SessionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SessionService);

var _a;
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/team.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TeamService = (function () {
    function TeamService(http) {
        this.http = http;
        this.BASE_URL = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].BASE_URL;
        this.options = { withCredentials: true };
    }
    TeamService.prototype.indexTeams = function () {
        return this.http.get(this.BASE_URL + "/api/teams", this.options)
            .map(function (res) { return res.json(); });
    };
    TeamService.prototype.newTeam = function (teamName, members) {
        return this.http.post(this.BASE_URL + "/api/teams", { teamName: teamName, members: members }, this.options)
            .map(function (res) { return res.json(); });
    };
    TeamService.prototype.getTeam = function (id) {
        return this.http.get(this.BASE_URL + "/api/teams/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    TeamService.prototype.editTeam = function (teamID, formInfo) {
        return this.http.put(this.BASE_URL + "/api/teams/" + teamID, formInfo, this.options)
            .map(function (res) { return res.json(); });
    };
    TeamService.prototype.deleteTeam = function (id) {
        return this.http.delete(this.BASE_URL + "/api/teams/" + id, this.options)
            .map(function (res) { return res.json(); });
    };
    return TeamService;
}());
TeamService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TeamService);

var _a;
//# sourceMappingURL=team.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/teamuser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamUserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TeamUserService = (function () {
    function TeamUserService(http) {
        this.http = http;
        this.BASE_URL = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].BASE_URL;
        this.options = { withCredentials: true };
    }
    TeamUserService.prototype.indexTeamUsersRelations = function (id) {
        console.log("Entra en la ruta del servicio");
        return this.http
            .get(this.BASE_URL + "/api/teamusers/" + id + "/index", this.options)
            .map(function (res) { return res.json(); });
    };
    TeamUserService.prototype.editTeamUsersRelations = function (relationID, penalties) {
        return this.http
            .put(this.BASE_URL + "/api/teamusers/" + relationID + "/edit", { penalties: penalties }, this.options)
            .map(function (res) { return res.json(); });
    };
    return TeamUserService;
}());
TeamUserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TeamUserService);

var _a;
//# sourceMappingURL=teamuser.service.js.map

/***/ }),

/***/ "../../../../../src/app/signup-form/signup-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".signup {\n  height: 100vh;\n}\n\n.btn {\n  margin-left: 20%;\n}\n\n.backlink {\n  margin-top: 400px;\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/signup-form/signup-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"valign-wrapper signup\" *ngIf=\"!session.user\">\n\n  <div class=\"row\">\n    <form class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"email\" type=\"email\" class=\"validate\" [(ngModel)]=\"email\" name=\"email\">\n          <label for=\"email\">Email</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"username\" type=\"text\" class=\"validate\" [(ngModel)]=\"username\" name=\"username\">\n          <label for=\"username\">Username</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"password\" type=\"password\" class=\"validate\" [(ngModel)]=\"password\" name=\"password\">\n          <label for=\"password\">Password</label>\n        </div>\n      </div>\n      <div class=\"row\">\n      <button (click)=\"signup()\" class=\"center-align btn waves-effect waves-light\" type=\"submit\" name=\"action\">Signup\n      <i class=\"material-icons right\">send</i>\n    </button>\n    </div>\n    </form>\n    <p class=\"error\"> {{ error }} </p>\n    <div class=\"backlink\">\n      <a [routerLink]=\"['/login']\"> Already with Account, Go to Login </a>\n    </div>\n  </div>\n\n\n\n<!--\n<form>\n  <h2> Signup </h2>\n  <label> Username </label>\n  <input type=\"text\" [(ngModel)]=\"username\" name=\"username\"/>\n  <br>\n  <label> Email </label>\n  <input type=\"email\" [(ngModel)]=\"email\" name=\"email\"/>\n  <br>\n  <label> Password </label>\n  <input type=\"password\" [(ngModel)]=\"password\" name=\"password\"/>\n\n  <button (click)=\"signup()\"> signup </button>\n\n</form>\n\n<p class=\"error\"> {{ error }} </p>\n\n<a [routerLink]=\"['/login']\"> Already has an account, Go to login </a> -->\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/signup-form/signup-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupFormComponent = (function () {
    function SignupFormComponent(session, router) {
        this.session = session;
        this.router = router;
    }
    SignupFormComponent.prototype.ngOnInit = function () { };
    SignupFormComponent.prototype.signup = function () {
        var _this = this;
        this.session.signup(this.username, this.password, this.email)
            .subscribe(function (user) {
            console.log(user);
            _this.router.navigate(['/home']);
            console.log(_this.username + " is logged");
        }, function (err) { return _this.error = err; });
    };
    return SignupFormComponent;
}());
SignupFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-signup-form',
        template: __webpack_require__("../../../../../src/app/signup-form/signup-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/signup-form/signup-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], SignupFormComponent);

var _a, _b;
//# sourceMappingURL=signup-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/team/team.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/team/team.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n\n<div *ngIf=\"team\">\n\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n</div>\n<div>\n  <h1> Team: {{team.teamName}}</h1>\n</div>\n\n<div>\n  <div>\n    <p>Total Money to Pay:</p>\n    <p>{{team.penalties}} EUR</p>\n  </div>\n</div>\n\n<div>\n      <div> Attendees:\n        <ul>\n          <li *ngFor=\"let attendee of attendees\">\n            <span > {{ attendee.userID.displayName }} </span>\n\n          </li>\n        </ul>\n      </div>\n    </div>\n\n  </div>\n\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/team/team.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__ = __webpack_require__("../../../../../src/app/services/penalty.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__ = __webpack_require__("../../../../../src/app/services/eventuser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_teamuser_service__ = __webpack_require__("../../../../../src/app/services/teamuser.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TeamComponent = (function () {
    function TeamComponent(eventService, eventUserService, teamService, teamUserService, penaltyService, session, route, router) {
        this.eventService = eventService;
        this.eventUserService = eventUserService;
        this.teamService = teamService;
        this.teamUserService = teamUserService;
        this.penaltyService = penaltyService;
        this.session = session;
        this.route = route;
        this.router = router;
    }
    TeamComponent.prototype.ngOnInit = function () {
        this.initializeComponent();
    };
    TeamComponent.prototype.initializeComponent = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.teamService.getTeam(params.id).subscribe(function (team) {
                console.log("nos devuelve team:");
                console.log(team);
                _this.team = team;
                _this.teamUserService.indexTeamUsersRelations(team._id).subscribe((function (attendees) {
                    _this.attendees = attendees;
                    console.log(_this.attendees);
                }), (function (err) { return console.log(err); }));
            });
        });
    };
    return TeamComponent;
}());
TeamComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-team',
        template: __webpack_require__("../../../../../src/app/team/team.component.html"),
        styles: [__webpack_require__("../../../../../src/app/team/team.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__["a" /* EventUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_eventuser_service__["a" /* EventUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_team_service__["a" /* TeamService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__services_teamuser_service__["a" /* TeamUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_teamuser_service__["a" /* TeamUserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_penalty_service__["a" /* PenaltyService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _h || Object])
], TeamComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=team.component.js.map

/***/ }),

/***/ "../../../../../src/app/teams-list/teams-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/teams-list/teams-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"session.user && session.startLoginCompleted\">\n\n\n<div>\n  <a [routerLink]=\"['/home']\"> Go Back to Events </a>\n</div>\n\n<h3> My Teams List </h3>\n\n\n<div>\n  <button type=\"button\" name=\"button\" [routerLink]=\"['/newteam']\">Create New Team</button>\n</div>\n\n<div *ngIf=\"(teams)\">\n  <div  *ngFor=\"let team of teams\" class=\"blocky\">\n    <h3> {{ team.teamID.teamName }} </h3>\n    <a [routerLink]=\"['/team/', team.teamID._id, 'details']\"> View Details </a><br>\n    <a [routerLink]=\"['/team/', team.teamID._id, 'edit']\"> Edit </a>\n  </div>\n</div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/teams-list/teams-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_team_service__ = __webpack_require__("../../../../../src/app/services/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__("../../../../../src/app/services/session.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamsListComponent = (function () {
    function TeamsListComponent(teamService, session) {
        this.teamService = teamService;
        this.session = session;
    }
    TeamsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teamService.indexTeams()
            .subscribe((function (team) {
            _this.teams = team;
            console.log(_this.teams);
        }), (function (err) { return console.log(err); }));
    };
    return TeamsListComponent;
}());
TeamsListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-teams-list',
        template: __webpack_require__("../../../../../src/app/teams-list/teams-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/teams-list/teams-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_team_service__["a" /* TeamService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _b || Object])
], TeamsListComponent);

var _a, _b;
//# sourceMappingURL=teams-list.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true,
    BASE_URL: "",
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map
