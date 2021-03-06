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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
var database_1 = __importDefault(require("../database"));
var order_details_1 = require("./order_details");
var orderDetailsM = new order_details_1.orderDetailsModel();
var orderModel = /** @class */ (function () {
    function orderModel() {
    }
    orderModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select id, o_date, o_total, user_id from orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("cannot get the orders ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "Insert into orders (o_date, o_total, user_id) \n        values( $1, $2, $3) returning id, o_date, o_total, user_id";
                        return [4 /*yield*/, conn.query(sql, [o.o_date, o.o_total, o.user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("cannot create the new order ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.showById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "Select id, o_date, o_total, user_id from orders Where id = ($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("cannot get the order ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.updateById = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "Update orders set o_date = $2, o_total = $3, user_id = $4 Where id = ($1)\n         returning id, o_date, o_total, user_id";
                        return [4 /*yield*/, conn.query(sql, [o.id, o.o_date, o.o_total, o.user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("cannot update the order ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.create_o_d = function (order_id, b_count, book_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        console.log('open connection to create_o_d');
                        sql = "Insert into orders_details (order_id, b_count, book_id) \n            values( $1, $2, $3) returning id, order_id, b_count, book_id";
                        console.log('sql statment: ' + sql);
                        return [4 /*yield*/, conn.query(sql, [order_id, b_count, book_id])];
                    case 2:
                        result = _a.sent();
                        console.log('execute the query, rowsCount:' + result.rowCount);
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("cannot create the new order Details ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        console.log('delete orderD M orderId: ' + id);
                        return [4 /*yield*/, orderDetailsM.deleteById(id)];
                    case 2:
                        _a.sent();
                        sql = "Delete from orders Where id = ($1) returning id, o_date, o_total, user_id";
                        console.log('delete order H sql: ' + sql);
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        console.log('deleted order H orderId: ' + result.rows[0].id);
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_6 = _a.sent();
                        throw new Error("cannot delete the order ".concat(err_6));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return orderModel;
}());
exports.orderModel = orderModel;
