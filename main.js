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
const narrator = document.querySelector(".narrator p");
const hadith = document.querySelector(".hadith p");
const book = document.querySelector(".book p");
function getHadith() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const scriptures = ["bukhari", "tirmidhi", "abudawud", "muslim"];
        const pickedScriptures = scriptures[Math.floor(Math.random() * scriptures.length)];
        const apiUrl = 'https://random-hadith-generator.vercel.app/' + pickedScriptures;
        try {
            const res = yield fetch(apiUrl);
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            const hadithData = yield res.json();
            return {
                header: (_b = (_a = hadithData === null || hadithData === void 0 ? void 0 : hadithData.data) === null || _a === void 0 ? void 0 : _a.header) !== null && _b !== void 0 ? _b : null,
                hadith_english: (_d = (_c = hadithData === null || hadithData === void 0 ? void 0 : hadithData.data) === null || _c === void 0 ? void 0 : _c.hadith_english) !== null && _d !== void 0 ? _d : null,
                refno: (_f = (_e = hadithData === null || hadithData === void 0 ? void 0 : hadithData.data) === null || _e === void 0 ? void 0 : _e.refno) !== null && _f !== void 0 ? _f : null
            };
        }
        catch (error) {
            console.log(error);
            return {
                header: null,
                hadith_english: null,
                refno: null
            };
        }
    });
}
function setHadith() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const hadithData = yield getHadith();
        if (narrator) {
            narrator.textContent = (_a = hadithData.header) !== null && _a !== void 0 ? _a : "No header found";
        }
        if (hadith) {
            hadith.textContent = (_b = hadithData.hadith_english) !== null && _b !== void 0 ? _b : "No hadith found";
        }
        if (book) {
            book.textContent = (_c = String(hadithData.refno)) !== null && _c !== void 0 ? _c : "No refno found";
        }
    });
}
setHadith();
