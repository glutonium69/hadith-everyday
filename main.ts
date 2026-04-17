const narrator: HTMLParagraphElement | null = document.querySelector(".narrator p");
const hadith: HTMLParagraphElement | null = document.querySelector(".hadith p");
const book: HTMLParagraphElement | null = document.querySelector(".book p");
const apiKey = "$2y$10$vpsEL72Uv1Yuz9nTVARUuZ7UHLzWUEWhV2kCZoRbUTSWSdS7QO2";

interface HadithData {
    header: string | null,
    hadith_english: string | null,
    refno: string
}

async function getHadith(i = 0): Promise<HadithData> {
    const hadithNum: number = Math.round(Math.random() * 7000);
    const apiUrl: RequestInfo = `https://hadithapi.com/api/hadiths?hadithNumber=${hadithNum}&apiKey=${apiKey}`;

    try {
        const res: Response = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const hadithData: any = await res.json();
        const randHadith: any = hadithData.hadiths.data[
            Math.floor(Math.random() * hadithData.hadiths.data.length)
        ];

        if (!randHadith.hadithEnglish.trim()) {
            throw new Error("No english hadith");
        }

        return {
            header: randHadith?.englishNarrator ?? null,
            hadith_english: randHadith.hadithEnglish,
            refno: `${randHadith?.book?.bookName} ${randHadith?.hadithNumber} (${randHadith?.status})`
        }
    } catch (error) {
        console.log(error)
        if (i < 10) {
            getHadith(++i);
        } else {
            return {
                header: null,
                hadith_english: null,
                refno: ""
            }
        }
    }
}

async function setHadith(): Promise<void> {
    const hadithData = await getHadith();

    if (narrator) {
        narrator.textContent = hadithData.header ?? "No header found";
    }
    if (hadith) {
        hadith.textContent = hadithData.hadith_english ?? "No hadith found";
    }
    if (book) {
        book.textContent = String(hadithData.refno) ?? "No refno found";
    }
}

setHadith();
