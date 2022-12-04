
export interface facultySelector {
    scienceCouple: string[],
    facultyChange: {
        (array: {
            _id: number,
            faculty_name: string,
            hei: {
                _id: string,
                hei_name: string,
                short_name: string
            }
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
    _id: string,
    faculty_name: string,
    contract_score: number,
    grant_score: number,
    contract_limit: number,
    grant_limit: number,
    hei: {
        _id: string,
        hei_name: string,
        short_name: string
    }
}[]