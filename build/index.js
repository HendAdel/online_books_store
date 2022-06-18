"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv = __importStar(require("dotenv"));
var author_1 = __importDefault(require("./handlers/author"));
var category_1 = __importDefault(require("./handlers/category"));
var publisher_1 = __importDefault(require("./handlers/publisher"));
var user_1 = __importDefault(require("./handlers/user"));
var book_1 = __importDefault(require("./handlers/book"));
var order_1 = __importDefault(require("./handlers/order"));
var database_1 = __importDefault(require("./database"));
dotenv.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
app.use(express_1.default.json());
// add routing for / path
app.get('/', function (req, res) {
    console.log("user routes in index page");
    database_1.default.connect().then(function (client) {
        return client
            .query('SELECT NOW()')
            .then(function (res) {
            client.release();
            console.log(res.rows);
        })
            .catch(function (err) {
            client.release();
            console.log(err.stack);
        });
    });
    res.json({
        message: 'Hello World 🌍'
    });
});
// app.use('/api', userRoutes)
// app.get('/users', (_req: Request, res: Response) => {
//   try {
//     console.log(`user routes in index page`)
//       res.send('this is the Users INDEX route')
//   } catch (err) {
//       res.status(400)
//       res.json(err)
//   }
// })
(0, category_1.default)(app);
(0, publisher_1.default)(app);
(0, user_1.default)(app);
(0, book_1.default)(app);
(0, order_1.default)(app);
(0, author_1.default)(app);
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
