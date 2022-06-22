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
var publisher_1 = require("../../models/publisher");
var database_1 = __importDefault(require("../../database"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var publisherM = new publisher_1.publisherModel();
var request = (0, supertest_1.default)(index_1.default);
var publisher = {
    p_name: 'El-Shroq',
    p_address: 'Cairo',
    phone: '0245698712'
};
describe("publisher endpoints CRUD methods test", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdpublisher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publisherM.create(publisher)];
                case 1:
                    createdpublisher = _a.sent();
                    publisher.id = createdpublisher.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 3:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should create a new publisher', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, p_name;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .post('/publishers')
                        .set('Content-type', 'application/json')
                        .send({
                        p_name: 'test_publisher'
                    })];
                case 1:
                    result = _b.sent();
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, p_name = _a.p_name;
                    expect(id).toBe(2);
                    expect(p_name).toBe('test_publisher');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should List all publishers', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/publishers')
                        .set('Content-type', 'application/json')];
                case 1:
                    result = _a.sent();
                    console.log("the publisher endpoint test result: " + result.body);
                    expect(result.status).toBe(200);
                    expect(result.body.data.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return one publisher', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, p_name, p_address, phone;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .get("/publishers/ ".concat(publisher.id))
                        .set('Content-type', 'application/json')];
                case 1:
                    result = _b.sent();
                    console.log("the publisher endpoint test result get publisher by ID: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, p_name = _a.p_name, p_address = _a.p_address, phone = _a.phone;
                    expect(id).toBe(publisher.id);
                    expect(p_name).toBe("El-Shroq");
                    expect(p_address).toBe('Cairo');
                    expect(phone).toBe('0245698712');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should update publisher by Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, p_name;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .put("/publishers/ ".concat(publisher.id))
                        .set('Content-type', 'application/json')
                        .send({
                        p_name: 'test_update', id: publisher.id
                    })];
                case 1:
                    result = _b.sent();
                    console.log("the publisher endpoint test result update publisher: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, p_name = _a.p_name;
                    expect(id).toBe(publisher.id);
                    expect(p_name).toBe('test_update');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should delete one publisher by Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, p_name;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/publishers/ ".concat(publisher.id))
                        .set('Content-type', 'application/json')
                        .send({ id: publisher.id })];
                case 1:
                    result = _b.sent();
                    console.log("the publisher endpoint test result delete publisher: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, p_name = _a.p_name;
                    expect(id).toBe(publisher.id);
                    expect(p_name).toBe('test_update');
                    return [2 /*return*/];
            }
        });
    }); });
});
