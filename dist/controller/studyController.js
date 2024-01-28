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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startTime = new Date().getHours();
        console.log(startTime);
        return res.status(200).json({
            message: "student created successfully",
            //   data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating student  ",
        });
    }
});
exports.create = create;
