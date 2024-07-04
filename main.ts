const narrator: HTMLParagraphElement | null = document.querySelector(".narrator p");
const hadith: HTMLParagraphElement | null = document.querySelector(".hadith p");
const book: HTMLParagraphElement | null = document.querySelector(".book p");

interface HadithData {
    header: string | null,
    hadith_english: string | null,
    refno: number | null
}

async function getHadith(): Promise<HadithData> {
    const scriptures: String[] = ["bukhari", "tirmidhi", "abudawud", "muslim"];
    const pickedScriptures: String = scriptures[Math.floor(Math.random() * scriptures.length)];
    const apiUrl: RequestInfo = 'https://random-hadith-generator.vercel.app/' + pickedScriptures;

    try {
        const res: Response = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const hadithData: any = await res.json();

        return {
            header: hadithData?.data?.header ?? null,
            hadith_english: hadithData?.data?.hadith_english ?? null,
            refno: hadithData?.data?.refno ?? null
        }
    } catch (error) {
        console.log(error)
        return {
            header: null,
            hadith_english: null,
            refno: null
        }
    }
}

async function setHadith(): Promise<void>{
    const hadithData = await getHadith();

    if(narrator){
        narrator.textContent = hadithData.header ?? "No header found";
    }
    if(hadith){
        hadith.textContent = hadithData.hadith_english ?? "No hadith found";
    }
    if(book){
        book.textContent = String(hadithData.refno) ?? "No refno found";
    }
}

setHadith();