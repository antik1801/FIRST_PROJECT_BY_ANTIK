
export type TMonth =  "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December" ;


export type TAcademicSemesterName =  "Autumn" | "Summer" | "Fall";

export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
    name: TAcademicSemesterName,
    year: string,
    code: TAcademicSemesterCode,
    startMonth: TMonth,
    endMonth: TMonth,
    isDeleted: boolean,
}

export type TAcademicSemesterNameCodeMapper = {
    [key: string] : string;
}