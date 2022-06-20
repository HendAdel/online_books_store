"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var validateTokenMiddleware = function (req, _res, next) {
    try {
        var authHeader = req.get("Authorization");
        console.log("validateTokenMiddleware " + authHeader);
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            console.log("bearer: " + bearer);
            var token = authHeader.split(' ')[1];
            console.log("token: " + token);
            if (token && bearer === 'bearer') {
                var verifyToken = jsonwebtoken_1.default.verify(token, config_1.default.token);
                console.log("verifyToken: " + verifyToken);
                if (verifyToken) {
                    console.log("verifyToken is true ");
                    next();
                }
                else {
                    throw new Error("User is not authorized");
                }
            }
            else {
                throw new Error("User is not authorized");
            }
        }
        else {
            throw new Error("User is not authorized");
        }
    }
    catch (error) {
        throw new Error("User is not authorized ".concat(error.message));
    }
};
exports.default = validateTokenMiddleware;
