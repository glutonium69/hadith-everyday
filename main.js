const narrator = document.querySelector(".narrator p");
const hadith = document.querySelector(".hadith p");
const book = document.querySelector(".book p");

async function getHadith() {
    const scriptures = ["bukhari", "tirmidhi", "abudawud", "muslim"];
    const pickedScriptures = scriptures[Math.round(Math.random() * scriptures.length)];
    const apiUrl = 'https://random-hadith-generator.vercel.app/' + pickedScriptures;

    try {
        const res = await fetch(apiUrl);
        const hadithData = await res.json();
        
        return {
            narrator: hadithData.data.header,
            hadith: hadithData.data.hadith_english,
            source: hadithData.data.refno
        }
    } catch (error) {
        console.log(error)
        return {
            narrator: null,
            hadith: null,
            source: null
        }
    }
}

async function setHadith(){
    const hadithData = await getHadith();
    narrator.textContent = hadithData.narrator;
    hadith.textContent = hadithData.hadith;
    book.textContent = hadithData.source;
}

setHadith();