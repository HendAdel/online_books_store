"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
var routes = (0, express_1.Router)();
// const jwt = 
var userM = new user_1.userModel();
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newuser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userM.create(req.body)];
            case 1:
                newuser = _a.sent();
                res.json({
                    status: "success",
                    data: __assign({}, newuser),
                    message: "User created successfully"
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Test show all users handler");
                return [4 /*yield*/, userM.index()];
            case 1:
                users = _a.sent();
                console.log("Test show all users handler after calling index method");
                console.log("Test show all users handler result" + users);
                // res.send('this is the user index route');
                res.json(users);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oneUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Test show by id handler");
                return [4 /*yield*/, userM.showById(req.params.id)];
            case 1:
                oneUser = _a.sent();
                console.log("Test show by id after calling model method");
                console.log("Test show by id user: " + oneUser);
                res.json(oneUser);
                return [2 /*return*/];
        }
    });
}); };
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateduser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Test Update by id handler");
                return [4 /*yield*/, userM.updateById(req.body)];
            case 1:
                updateduser = _a.sent();
                console.log("Test update H by id after calling model method");
                console.log("Test update H by id user: " + updateduser);
                res.json(updateduser);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userM.deleteById(req.body.id)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Test login handler");
                return [4 /*yield*/, userM.login_authenticate(req.body.email, req.body.u_password)];
            case 1:
                user = _a.sent();
                console.log("Test login handler get user" + user);
                if (user) {
                    token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token);
                    console.log("Test login handler make token: " + token);
                    return [2 /*return*/, res.json({
                            status: 'Success',
                            data: __assign(__assign({}, user), { token: token }),
                            message: 'You signed in successfully.'
                        })];
                }
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            status: 'Error',
                            message: 'User name or password not correct, please try again!'
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// routes.route('/').post(create);
// routes.route('/users').get(index);
var usersRoutes = function (app) {
    app.post('/users', create);
    app.get('/users', authentication_middleware_1.default, index);
    app.get('/users/:id', authentication_middleware_1.default, show);
    app.put('/users/:id', authentication_middleware_1.default, edit);
    app.delete('/users/:id', authentication_middleware_1.default, remove);
    app.post('/users/login', login);
};
exports.default = usersRoutes; //routes;
