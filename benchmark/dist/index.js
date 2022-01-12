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
var dequal_1 = require("dequal");
var react_1 = __importDefault(require("fast-deep-equal/es6/react"));
var react_fast_compare_1 = __importDefault(require("react-fast-compare"));
var run_1 = require("./run");
var fixtures = __importStar(require("./fixtures"));
// eslint-disable-next-line import/no-relative-packages
var __1 = require("../..");
// run(fixtures.simple, {
//   dequal: (data) => {
//     dequalLite(data[0], data[1]);
//   },
//   'dequal (lite)': (data) => {
//     dequalLite(data[0], data[1]);
//   },
//   '@react-hookz/deep-compare': (data) => {
//     isEqual(data[0], data[1]);
//   },
//   '@react-hookz/deep-compare (simple)': (data) => {
//     isEqualSimple(data[0], data[1]);
//   },
//   'fast-deep-equal': (data) => {
//     fastDeepEqual(data[0], data[1]);
//   },
//   'react-fast-compare': (data) => {
//     reactFastCompare(data[0], data[1]);
//   },
// });
(0, run_1.run)(fixtures.complex, {
    dequal: function (data) {
        (0, dequal_1.dequal)(data[0], data[1]);
    },
    '@react-hookz/deep-compare': function (data) {
        (0, __1.isEqual)(data[0], data[1]);
    },
    'fast-deep-equal': function (data) {
        // it fails on data views
        (0, react_1.default)(data[0], data[1]);
    },
    'react-fast-compare': function (data) {
        (0, react_fast_compare_1.default)(data[0], data[1]);
    },
});
