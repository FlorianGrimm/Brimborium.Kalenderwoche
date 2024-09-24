export function createUtcDate(year: number, month: number, day: number) {
    const result = new Date(0);
    result.setUTCFullYear(year, month - 1, day);
    return result;
}

const ticksPerDay = (24 * 60 * 60 * 1000);

const mapYearToKW1 = new Map<number, Date>();

export function getKW1OfYear(year: number) {
    const result = mapYearToKW1.get(year);
    if (result != undefined) { return result; }

    const dtKW1 = new Date(0);
    dtKW1.setUTCFullYear(year, 0, 1);

    const firstDay = dtKW1.getDay() || 7;    // Wochentag für den 1.1. des Jahres (1=Mo, 2=Di, ..., 7=So)

    // Ist der 1.1 später als Donnerstag, startet die erste Kalenderwoche erst am folgenden Montag
    if (firstDay > 4) {
        dtKW1.setTime(dtKW1.getTime() + (8 - firstDay) * ticksPerDay);
    } else {
        // Sonst startet die erste Kalenderwoche am Montag vor dem 1.1 bzw. am 1.1 wenn er ein Montag ist
        dtKW1.setTime(dtKW1.getTime() + (1 - firstDay) * ticksPerDay);
    }
    mapYearToKW1.set(year, dtKW1);
    return dtKW1;
}

export type KWYear = { kw: number; year: number };
const mapDateToKWYear = new Map<number, KWYear>();

function calcKW(daysDt: number, year: number) {
    // dt:Date
    // const daysDt = Math.floor(dt.getTime() / ticksPerDay);
    // let year = dt.getFullYear();
    const dtKWPrev = getKW1OfYear(year - 1);
    const dtKWCurr = getKW1OfYear(year);
    const dtKWNext = getKW1OfYear(year + 1);
    const daysKWPrev = Math.floor(dtKWPrev.getTime() / ticksPerDay);
    const daysKWCurr = Math.floor(dtKWCurr.getTime() / ticksPerDay);
    const daysKWNext = Math.floor(dtKWNext.getTime() / ticksPerDay);
    if (daysKWPrev <= daysDt && daysDt < daysKWCurr) {
        const kw = 1 + Math.floor((daysDt - daysKWPrev) / 7);
        return { kw: kw, year: (year - 1) };
    }
    if (daysKWCurr <= daysDt && daysDt < daysKWNext) {
        const kw = 1 + Math.floor((daysDt - daysKWCurr) / 7);
        return { kw: kw, year: year };
    }
    if (daysKWNext <= daysDt) {
        const kw = 1 + Math.floor((daysDt - daysKWNext) / 7);
        return { kw: kw, year: year + 1 };
    }
    return { kw: 0, year: 0 };
}
export function getKW(dt: Date) {
    const daysDt = Math.floor(dt.getTime() / ticksPerDay);
    let result = mapDateToKWYear.get(daysDt);
    if (result == undefined) {
        result = calcKW(daysDt, dt.getUTCFullYear());
        if (mapDateToKWYear.size > 10000) { mapDateToKWYear.clear(); }
        mapDateToKWYear.set(daysDt, result);
    }
    return result;
}


export function getISOWeek(date: Date): number {
    // Kopiere das Datum und setze die Zeit auf Mitternacht
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);

    // Der erste Tag einer ISO Woche ist Montag
    const dayOfWeek = (tempDate.getDay() + 6) % 7;

    // Setze das Datum auf den Donnerstag der aktuellen Woche (ISO 8601)
    tempDate.setDate(tempDate.getDate() - dayOfWeek + 3);

    // Berechne den 1. Januar des aktuellen Jahres
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4);

    // Setze das Datum auf den Donnerstag der ersten Woche des Jahres
    const firstThursdayDayOfWeek = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstThursdayDayOfWeek + 3);

    // Berechne die Kalenderwoche
    const diff = tempDate.getTime() - firstThursday.getTime();
    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

export function getISOWeekAndYear(date: Date): { year: number, kw: number } {
    // Kopiere das Datum und setze die Zeit auf Mitternacht
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);

    // Der erste Tag einer ISO Woche ist Montag
    const dayOfWeek = (tempDate.getDay() + 6) % 7;

    // Setze das Datum auf den Donnerstag der aktuellen Woche (ISO 8601)
    tempDate.setDate(tempDate.getDate() - dayOfWeek + 3);

    // Berechne den 1. Januar des aktuellen Jahres
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4);

    // Setze das Datum auf den Donnerstag der ersten Woche des Jahres
    const firstThursdayDayOfWeek = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstThursdayDayOfWeek + 3);

    // Berechne die Kalenderwoche
    const diff = tempDate.getTime() - firstThursday.getTime();
    const kw = 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));

    // Berechne das Jahr (ISO-Jahr)
    const year = tempDate.getFullYear();

    // Falls die Woche 1 ist und der aktuelle Tag vor dem ersten Donnerstag des Jahres liegt, ist es das Vorjahr
    if (kw === 1 && tempDate < firstThursday) {
        return { year: year - 1, kw: kw };
    }

    // Falls die Woche größer als 52 ist und das Datum nach dem letzten Donnerstag des Jahres liegt, ist es das nächste Jahr
    const lastThursday = new Date(year, 11, 28); // 28. Dezember ist der späteste mögliche Donnerstag im Jahr
    const lastThursdayDayOfWeek = (lastThursday.getDay() + 6) % 7;
    lastThursday.setDate(lastThursday.getDate() - lastThursdayDayOfWeek + 3);

    if (kw >= 52 && tempDate > lastThursday) {
        return { year: year + 1, kw: 1 };
    }

    return { kw: kw,year:year };
}
