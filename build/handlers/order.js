"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var orderM = new order_1.orderModel();
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var neworder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderM.create(req.body)];
            case 1:
                neworder = _a.sent();
                res.json({ data: neworder });
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
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderM.index()];
            case 1:
                orders = _a.sent();
                res.json({ data: orders });
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderM.showById(req.params.id)];
            case 1:
                order = _a.sent();
                res.json({ data: order });
                return [2 /*return*/];
        }
    });
}); };
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedorder, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderM.updateById(req.body)];
            case 1:
                updatedorder = _a.sent();
                res.json({ data: updatedorder });
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
    var order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('delete order H orderId: ' + req.body.id);
                return [4 /*yield*/, orderM.deleteById(req.body.id)];
            case 1:
                order = _a.sent();
                console.log('deleted order H object: ' + order);
                res.json({ data: order });
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
var create_o_d = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, count, bookId, neworder, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.body.order_id);
                console.log('order H orderId: ' + orderId);
                count = req.body.b_count;
                console.log('book count:' + count);
                bookId = req.body.book_id;
                console.log('order H bookId' + bookId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderM.create_o_d(orderId, count, bookId)];
            case 2:
                neworder = _a.sent();
                console.log('order details after calling insert method' + neworder);
                res.json({ data: neworder });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var ordersRoutes = function (app) {
    app.post('/orders', create);
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.put('/orders/:id', edit);
    app.delete('/orders/:id', remove);
    app.post('/orders/:id/books', create_o_d);
};
exports.default = ordersRoutes;
