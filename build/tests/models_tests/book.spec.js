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
var book_1 = require("../../models/book");
var category_1 = require("../../models/category");
var author_1 = require("../../models/author");
var publisher_1 = require("../../models/publisher");
var database_1 = __importDefault(require("../../database"));
var bookM = new book_1.bookModel();
var category = new category_1.categoryModel();
var author = new author_1.authorModel();
var publisher = new publisher_1.publisherModel();
describe("book Model", function () {
    var book = {
        title: 'ANbiaa Allah',
        author_id: 1,
        category_id: 1,
        publisher_id: 1,
        published_year: '1999',
        pages: 200, price: 100,
        isbn: '30009771481037',
        in_stock: 6
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createBook;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, category.create({ name: 'literature' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, author.create({ id: 1, name: "Ahmed Bahget" })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, publisher.create({ p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, bookM.create(book)];
                case 4:
                    createBook = _a.sent();
                    book.id = createBook.id;
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
                    sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 3:
                    _a.sent();
                    sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 4:
                    _a.sent();
                    sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 5:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should have an index method', function () {
        expect(bookM.index).toBeDefined();
    });
    it('Should have an create method', function () {
        expect(bookM.create).toBeDefined();
    });
    it('Should have an showById method', function () {
        expect(bookM.showById).toBeDefined();
    });
    it('Should have an updateById method', function () {
        expect(bookM.updateById).toBeDefined();
    });
    it('Should have an deleteById method', function () {
        expect(bookM.deleteById).toBeDefined();
    });
    it('create method should add new book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bookM.create({
                        title: 'Albraq',
                        author_id: 1,
                        category_id: 1,
                        publisher_id: 1,
                        published_year: '2004',
                        pages: 100, price: 30,
                        isbn: '30009771481055',
                        in_stock: 4
                    })];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        id: 2,
                        title: 'Albraq',
                        author_id: 1,
                        category_id: 1,
                        publisher_id: 1,
                        published_year: '2004',
                        pages: 100, price: 30,
                        isbn: '30009771481055',
                        in_stock: 4
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Index method should return a list of books', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bookM.index()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('showById method should return one book with the same id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bookM.showById('1')];
                case 1:
                    result = _a.sent();
                    expect(result.id).toBe(1);
                    expect(result.title).toBe(book.title);
                    expect(result.author_id).toBe(book.author_id);
                    expect(result.category_id).toBe(book.category_id);
                    expect(result.publisher_id).toBe(book.publisher_id);
                    expect(result.published_year).toBe(book.published_year);
                    expect(result.pages).toBe(book.pages);
                    expect(result.price).toBe(book.price);
                    expect(result.isbn).toBe(book.isbn);
                    expect(result.in_stock).toBe(book.in_stock);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updateById method should return one book with new data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bookM.updateById(__assign(__assign({}, book), { title: 'Anbiaa Allah', published_year: '1972', pages: 478, in_stock: 5, id: 1 }))];
                case 1:
                    result = _a.sent();
                    expect(result.id).toBe(1);
                    expect(result.title).toBe('Anbiaa Allah');
                    expect(result.author_id).toBe(book.author_id);
                    expect(result.category_id).toBe(book.category_id);
                    expect(result.publisher_id).toBe(book.publisher_id);
                    expect(result.published_year).toBe('1972');
                    expect(result.pages).toBe(478);
                    expect(result.price).toBe(book.price);
                    expect(result.isbn).toBe(book.isbn);
                    expect(result.in_stock).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Delete method should remove one book with the same id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookM.deleteById('1');
                    return [4 /*yield*/, bookM.index()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
