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
const apiKey = "$2y$10$vpsEL72Uv1Yuz9nTVARUuZ7UHLzWUEWhV2kCZoRbUTSWSdS7QO2";
function getHadith() {
    return __awaiter(this, arguments, void 0, function* (i = 0) {
        var _a, _b;
        const hadithNum = Math.round(Math.random() * 7000);
        const apiUrl = `https://hadithapi.com/api/hadiths?hadithNumber=${hadithNum}&apiKey=${apiKey}`;
        try {
            const res = yield fetch(apiUrl);
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            const hadithData = yield res.json();
            const randHadith = hadithData.hadiths.data[Math.floor(Math.random() * hadithData.hadiths.data.length)];
            if (!randHadith.hadithEnglish.trim()) {
                throw new Error("No english hadith");
            }
            return {
                header: (_a = randHadith === null || randHadith === void 0 ? void 0 : randHadith.englishNarrator) !== null && _a !== void 0 ? _a : null,
                hadith_english: randHadith.hadithEnglish,
                refno: `${(_b = randHadith === null || randHadith === void 0 ? void 0 : randHadith.book) === null || _b === void 0 ? void 0 : _b.bookName} ${randHadith === null || randHadith === void 0 ? void 0 : randHadith.hadithNumber} (${randHadith === null || randHadith === void 0 ? void 0 : randHadith.status})`
            };
        }
        catch (error) {
            console.log(error);
            if (i < 10) {
                getHadith(++i);
            }
            else {
                return {
                    header: null,
                    hadith_english: null,
                    refno: ""
                };
            }
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
