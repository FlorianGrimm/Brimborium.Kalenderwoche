// import * as jest from 'jest';
// import * as tsjest from 'ts-jest';

import { 
    createUtcDate,
    getKW1OfYear,
    getKW,
    getISOWeekAndYear
} from './index';

test('createUtcDate',()=>{
    expect(createUtcDate(2024, 12, 30)).toStrictEqual(new Date(Date.parse("2024-12-30T00:00:00.000Z")));
    expect(createUtcDate(2024, 12, 30).toISOString()).toBe("2024-12-30T00:00:00.000Z");
})

test('getKW1OfYear(2019)', () => {
    expect(getKW1OfYear(2019)).toStrictEqual(createUtcDate(2018,12,31));
});
test('getKW1OfYear(2020)', () => {
    expect(getKW1OfYear(2020)).toStrictEqual(createUtcDate(2019,12,30));
});
test('getKW1OfYear(2021)', () => {
    expect(getKW1OfYear(2021)).toStrictEqual(createUtcDate(2021,1,4));
});
test('getKW1OfYear(2022)', () => {
    expect(getKW1OfYear(2022)).toStrictEqual(createUtcDate(2022,1,3));
});
test('getKW1OfYear(2023)', () => {
    expect(getKW1OfYear(2023)).toStrictEqual(createUtcDate(2023,1,2));
});
test('getKW1OfYear(2024)', () => {
    expect(getKW1OfYear(2024)).toStrictEqual(createUtcDate(2024,1,1));
});
test('getKW1OfYear(2025)', () => {
    expect(getKW1OfYear(2025)).toStrictEqual(createUtcDate(2024,12,30));
});

test('getKW(2019)',()=>{
    expect(getKW(createUtcDate(2018, 12, 30))).toStrictEqual({kw:52, year:2018});
    expect(getKW(createUtcDate(2018, 12, 31))).toStrictEqual({kw:1, year:2019});
    expect(getKW(createUtcDate(2019, 1, 1))).toStrictEqual({kw:1, year:2019});
    expect(getKW(createUtcDate(2019, 1, 6))).toStrictEqual({kw:1, year:2019});
    expect(getKW(createUtcDate(2019, 1, 7))).toStrictEqual({kw:2, year:2019});
    expect(getKW(createUtcDate(2019, 12, 30))).toStrictEqual({kw:1, year:2020});
    expect(getKW(createUtcDate(2019, 12, 31))).toStrictEqual({kw:1, year:2020});
});
test('getKW(2020)',()=>{
    expect(getKW(createUtcDate(2019, 12, 30))).toStrictEqual({kw:1, year:2020});
    expect(getKW(createUtcDate(2019, 12, 31))).toStrictEqual({kw:1, year:2020});
    expect(getKW(createUtcDate(2020, 1, 1))).toStrictEqual({kw:1, year:2020});
    expect(getKW(createUtcDate(2020, 1, 5))).toStrictEqual({kw:1, year:2020});
    expect(getKW(createUtcDate(2020, 1, 6))).toStrictEqual({kw:2, year:2020});
    expect(getKW(createUtcDate(2020, 12, 28))).toStrictEqual({kw:53, year:2020});
    expect(getKW(createUtcDate(2020, 12, 31))).toStrictEqual({kw:53, year:2020});
});
test('getKW(2021)',()=>{
    expect(getKW(createUtcDate(2021, 1, 1))).toStrictEqual({kw:53, year:2020});
    expect(getKW(createUtcDate(2021, 1, 2))).toStrictEqual({kw:53, year:2020});
    expect(getKW(createUtcDate(2021, 1, 3))).toStrictEqual({kw:53, year:2020});
    expect(getKW(createUtcDate(2021, 1, 4))).toStrictEqual({kw:1, year:2021});
    expect(getKW(createUtcDate(2021, 1, 10))).toStrictEqual({kw:1, year:2021});
    expect(getKW(createUtcDate(2021, 1, 11))).toStrictEqual({kw:2, year:2021});
    expect(getKW(createUtcDate(2021, 2, 1))).toStrictEqual({kw:5, year:2021});
    expect(getKW(createUtcDate(2021, 12, 26))).toStrictEqual({kw:51, year:2021});
    expect(getKW(createUtcDate(2021, 12, 27))).toStrictEqual({kw:52, year:2021});
    expect(getKW(createUtcDate(2021, 12, 31))).toStrictEqual({kw:52, year:2021});
});

test('getKW(2022)',()=>{
    expect(getKW(createUtcDate(2021, 12, 27))).toStrictEqual({kw:52, year:2021});
    expect(getKW(createUtcDate(2021, 12, 31))).toStrictEqual({kw:52, year:2021});
    expect(getKW(createUtcDate(2022, 1, 1))).toStrictEqual({kw:52, year:2021});
    expect(getKW(createUtcDate(2022, 1, 2))).toStrictEqual({kw:52, year:2021});
    expect(getKW(createUtcDate(2022, 1, 3))).toStrictEqual({kw:1, year:2022});
    expect(getKW(createUtcDate(2022, 1, 9))).toStrictEqual({kw:1, year:2022});
    expect(getKW(createUtcDate(2022, 1, 10))).toStrictEqual({kw:2, year:2022});
    expect(getKW(createUtcDate(2022, 2, 1))).toStrictEqual({kw:5, year:2022});
    expect(getKW(createUtcDate(2022, 12, 25))).toStrictEqual({kw:51, year:2022});
    expect(getKW(createUtcDate(2022, 12, 26))).toStrictEqual({kw:52, year:2022});
    expect(getKW(createUtcDate(2022, 12, 30))).toStrictEqual({kw:52, year:2022});
    expect(getKW(createUtcDate(2022, 12, 31))).toStrictEqual({kw:52, year:2022});
    expect(getKW(createUtcDate(2022, 12, 26))).toStrictEqual({kw:52, year:2022});
    expect(getKW(createUtcDate(2022, 12, 31))).toStrictEqual({kw:52, year:2022});
});

test('getKW(2023)',()=>{
    expect(getKW(createUtcDate(2023, 1, 1))).toStrictEqual({kw:52, year:2022});
    expect(getKW(createUtcDate(2023, 1, 2))).toStrictEqual({kw:1, year:2023});
    expect(getKW(createUtcDate(2023, 1, 8))).toStrictEqual({kw:1, year:2023});
    expect(getKW(createUtcDate(2023, 1, 9))).toStrictEqual({kw:2, year:2023});
    expect(getKW(createUtcDate(2023, 2, 1))).toStrictEqual({kw:5, year:2023});
    expect(getKW(createUtcDate(2023, 12, 25))).toStrictEqual({kw:52, year:2023});
    expect(getKW(createUtcDate(2023, 12, 30))).toStrictEqual({kw:52, year:2023});
    expect(getKW(createUtcDate(2023, 12, 31))).toStrictEqual({kw:52, year:2023});
});

test('getKW(2024)',()=>{
    expect(getKW(createUtcDate(2024, 1, 1))).toStrictEqual({kw:1, year:2024});
    expect(getKW(createUtcDate(2024, 1, 7))).toStrictEqual({kw:1, year:2024});
    expect(getKW(createUtcDate(2024, 1, 29))).toStrictEqual({kw:5, year:2024});
    expect(getKW(createUtcDate(2024, 2, 1))).toStrictEqual({kw:5, year:2024});
    expect(getKW(createUtcDate(2024, 2, 4))).toStrictEqual({kw:5, year:2024});
    expect(getKW(createUtcDate(2024, 2, 19))).toStrictEqual({kw:8, year:2024});
    expect(getKW(createUtcDate(2024, 2, 21))).toStrictEqual({kw:8, year:2024});
    expect(getKW(createUtcDate(2024, 2, 25))).toStrictEqual({kw:8, year:2024});
    expect(getKW(createUtcDate(2024, 12, 23))).toStrictEqual({kw:52, year:2024});
    expect(getKW(createUtcDate(2024, 12, 29))).toStrictEqual({kw:52, year:2024});
    expect(getKW(createUtcDate(2024, 12, 30))).toStrictEqual({kw:1, year:2025});
    expect(getKW(createUtcDate(2024, 12, 31))).toStrictEqual({kw:1, year:2025});
});

test('getKW(2025)',()=>{
    expect(getKW(createUtcDate(2025, 1, 1))).toStrictEqual({kw:1, year:2025});
    expect(getKW(createUtcDate(2025, 1, 5))).toStrictEqual({kw:1, year:2025});
    expect(getKW(createUtcDate(2025, 1, 6))).toStrictEqual({kw:2, year:2025});
    expect(getKW(createUtcDate(2025, 2, 1))).toStrictEqual({kw:5, year:2025});
    expect(getKW(createUtcDate(2025, 12, 22))).toStrictEqual({kw:52, year:2025});
    expect(getKW(createUtcDate(2025, 12, 28))).toStrictEqual({kw:52, year:2025});
    expect(getKW(createUtcDate(2025, 12, 29))).toStrictEqual({kw:1, year:2026});
    expect(getKW(createUtcDate(2025, 12, 30))).toStrictEqual({kw:1, year:2026});
    expect(getKW(createUtcDate(2025, 12, 31))).toStrictEqual({kw:1, year:2026});
});

//getISOWeekAndYear

test('getISOWeekAndYear(2019)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2018, 12, 30))).toStrictEqual({kw:52, year:2018});
    expect(getISOWeekAndYear(createUtcDate(2018, 12, 31))).toStrictEqual({kw:1, year:2019});
    expect(getISOWeekAndYear(createUtcDate(2019, 1, 1))).toStrictEqual({kw:1, year:2019});
    expect(getISOWeekAndYear(createUtcDate(2019, 1, 6))).toStrictEqual({kw:1, year:2019});
    expect(getISOWeekAndYear(createUtcDate(2019, 1, 7))).toStrictEqual({kw:2, year:2019});
    expect(getISOWeekAndYear(createUtcDate(2019, 12, 30))).toStrictEqual({kw:1, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2019, 12, 31))).toStrictEqual({kw:1, year:2020});
});
test('getISOWeekAndYear(2020)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2019, 12, 30))).toStrictEqual({kw:1, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2019, 12, 31))).toStrictEqual({kw:1, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2020, 1, 1))).toStrictEqual({kw:1, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2020, 1, 5))).toStrictEqual({kw:1, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2020, 1, 6))).toStrictEqual({kw:2, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2020, 12, 28))).toStrictEqual({kw:53, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2020, 12, 31))).toStrictEqual({kw:53, year:2020});
});
test('getISOWeekAndYear(2021)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 1))).toStrictEqual({kw:53, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 2))).toStrictEqual({kw:53, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 3))).toStrictEqual({kw:53, year:2020});
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 4))).toStrictEqual({kw:1, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 10))).toStrictEqual({kw:1, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 1, 11))).toStrictEqual({kw:2, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 2, 1))).toStrictEqual({kw:5, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 12, 26))).toStrictEqual({kw:51, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 12, 27))).toStrictEqual({kw:52, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 12, 31))).toStrictEqual({kw:52, year:2021});
});

test('getISOWeekAndYear(2022)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2021, 12, 27))).toStrictEqual({kw:52, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2021, 12, 31))).toStrictEqual({kw:52, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2022, 1, 1))).toStrictEqual({kw:52, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2022, 1, 2))).toStrictEqual({kw:52, year:2021});
    expect(getISOWeekAndYear(createUtcDate(2022, 1, 3))).toStrictEqual({kw:1, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 1, 9))).toStrictEqual({kw:1, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 1, 10))).toStrictEqual({kw:2, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 2, 1))).toStrictEqual({kw:5, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 25))).toStrictEqual({kw:51, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 26))).toStrictEqual({kw:52, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 30))).toStrictEqual({kw:52, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 31))).toStrictEqual({kw:52, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 26))).toStrictEqual({kw:52, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2022, 12, 31))).toStrictEqual({kw:52, year:2022});
});

test('getISOWeekAndYear(2023)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2023, 1, 1))).toStrictEqual({kw:52, year:2022});
    expect(getISOWeekAndYear(createUtcDate(2023, 1, 2))).toStrictEqual({kw:1, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 1, 8))).toStrictEqual({kw:1, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 1, 9))).toStrictEqual({kw:2, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 2, 1))).toStrictEqual({kw:5, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 12, 25))).toStrictEqual({kw:52, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 12, 30))).toStrictEqual({kw:52, year:2023});
    expect(getISOWeekAndYear(createUtcDate(2023, 12, 31))).toStrictEqual({kw:52, year:2023});
});

test('getISOWeekAndYear(2024)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2024, 1, 1))).toStrictEqual({kw:1, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 1, 7))).toStrictEqual({kw:1, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 1, 29))).toStrictEqual({kw:5, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 2, 1))).toStrictEqual({kw:5, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 2, 4))).toStrictEqual({kw:5, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 2, 19))).toStrictEqual({kw:8, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 2, 21))).toStrictEqual({kw:8, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 2, 25))).toStrictEqual({kw:8, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 12, 23))).toStrictEqual({kw:52, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 12, 29))).toStrictEqual({kw:52, year:2024});
    expect(getISOWeekAndYear(createUtcDate(2024, 12, 30))).toStrictEqual({kw:1, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2024, 12, 31))).toStrictEqual({kw:1, year:2025});
});

test('getISOWeekAndYear(2025)',()=>{
    expect(getISOWeekAndYear(createUtcDate(2025, 1, 1))).toStrictEqual({kw:1, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 1, 5))).toStrictEqual({kw:1, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 1, 6))).toStrictEqual({kw:2, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 2, 1))).toStrictEqual({kw:5, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 12, 22))).toStrictEqual({kw:52, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 12, 28))).toStrictEqual({kw:52, year:2025});
    expect(getISOWeekAndYear(createUtcDate(2025, 12, 29))).toStrictEqual({kw:1, year:2026});
    expect(getISOWeekAndYear(createUtcDate(2025, 12, 30))).toStrictEqual({kw:1, year:2026});
    expect(getISOWeekAndYear(createUtcDate(2025, 12, 31))).toStrictEqual({kw:1, year:2026});
});
