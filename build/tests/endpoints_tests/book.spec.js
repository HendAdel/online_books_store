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
var book_1 = require("../../models/book");
var database_1 = __importDefault(require("../../database"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var category_1 = require("../../models/category");
var author_1 = require("../../models/author");
var publisher_1 = require("../../models/publisher");
var bookM = new book_1.bookModel();
var category = new category_1.categoryModel();
var author = new author_1.authorModel();
var publisher = new publisher_1.publisherModel();
var request = (0, supertest_1.default)(index_1.default);
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
describe("book endpoints CRUD methods test", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdbook;
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
                    createdbook = _a.sent();
                    book.id = createdbook.id;
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
    it('Should create a new book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, title, author_id, category_id, publisher_id, published_year, pages, price, isbn, in_stock;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .post('/books')
                        .set('Content-type', 'application/json')
                        .send({
                        title: 'test_book',
                        author_id: 1,
                        category_id: 1,
                        publisher_id: 1,
                        published_year: '2022',
                        pages: 200, price: 100,
                        isbn: '30009771481088',
                        in_stock: 20
                    })];
                case 1:
                    result = _b.sent();
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, title = _a.title, author_id = _a.author_id, category_id = _a.category_id, publisher_id = _a.publisher_id, published_year = _a.published_year, pages = _a.pages, price = _a.price, isbn = _a.isbn, in_stock = _a.in_stock;
                    expect(id).toBe(2);
                    expect(title).toBe('test_book');
                    expect(author_id).toBe(1);
                    expect(category_id).toBe(1);
                    expect(publisher_id).toBe(1);
                    expect(published_year).toBe('2022');
                    expect(pages).toBe(200);
                    expect(price).toBe(100);
                    expect(isbn).toBe('30009771481088');
                    expect(in_stock).toBe(20);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should List all books', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/books')
                        .set('Content-type', 'application/json')];
                case 1:
                    result = _a.sent();
                    console.log("the book endpoint test result: " + result.body);
                    expect(result.status).toBe(200);
                    expect(result.body.data.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return one book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, title, author_id, category_id, publisher_id, published_year, pages, price, isbn, in_stock;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .get("/books/ ".concat(book.id))
                        .set('Content-type', 'application/json')];
                case 1:
                    result = _b.sent();
                    console.log("the book endpoint test result get book by ID: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, title = _a.title, author_id = _a.author_id, category_id = _a.category_id, publisher_id = _a.publisher_id, published_year = _a.published_year, pages = _a.pages, price = _a.price, isbn = _a.isbn, in_stock = _a.in_stock;
                    expect(id).toBe(book.id);
                    expect(title).toBe('ANbiaa Allah');
                    expect(author_id).toBe(1);
                    expect(category_id).toBe(1);
                    expect(publisher_id).toBe(1);
                    expect(published_year).toBe('1999');
                    expect(pages).toBe(200);
                    expect(price).toBe(100);
                    expect(isbn).toBe('30009771481037');
                    expect(in_stock).toBe(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should update book by Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, title;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .put("/books/ ".concat(book.id))
                        .set('Content-type', 'application/json')
                        .send({
                        title: 'test_update', id: book.id
                    })];
                case 1:
                    result = _b.sent();
                    console.log("the book endpoint test result update book: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, title = _a.title;
                    expect(id).toBe(book.id);
                    expect(title).toBe('test_update');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should delete one book by Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, id, title;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/books/ ".concat(book.id))
                        .set('Content-type', 'application/json')
                        .send({ id: book.id })];
                case 1:
                    result = _b.sent();
                    console.log("the book endpoint test result delete book: " + result.body.data);
                    expect(result.status).toBe(200);
                    _a = result.body.data, id = _a.id, title = _a.title;
                    expect(id).toBe(book.id);
                    expect(title).toBe('test_update');
                    return [2 /*return*/];
            }
        });
    }); });
});
