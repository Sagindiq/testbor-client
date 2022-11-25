
export interface facultySelector {
    facultiesArr: {
        _id: number,
        faculty_name: string,
        hei_short_name: string
    }[],
    facultyChange: {
        (array: {
            _id: number,
            faculty_name: string,
            hei_short_name: string 
        }[] | any): void
    }
}

export interface facultyChange {
    (array: {
        _id: number,
        faculty_name: string,
        hei_short_name: string
    }[]): void
}

export interface facultyArr {
    _id: number,
    faculty_name: string,
    hei_short_name: string
}[]