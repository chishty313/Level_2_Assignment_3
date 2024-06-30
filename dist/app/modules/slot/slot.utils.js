"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatter = void 0;
const dateFormatter = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.dateFormatter = dateFormatter;
