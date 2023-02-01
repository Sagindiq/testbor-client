export interface facultySelector {
    allFaculties: {
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
    }[],
    facultyChange: {
        (array: {
            _id: string,
            faculty_name: string,
            hei: {
                _id: string,
                hei_name: string,
                short_name: string,
                address: string
            }
        }[] | any): void
    }
}

export interface facultyChange {
    (array: {
        _id: string,
        faculty_name: string,
        hei: {
            short_name: string,
            hei_name: string,
            hei_address: string
        }
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
        short_name: string,
        address: string
    }
}[]

export interface facultyObject {
    _id: string,
    faculty_name: string,
    contract_score: number,
    grant_score: number,
    contract_limit: number,
    grant_limit: number,
    hei: {
        _id: string,
        hei_name: string,
        short_name: string,
        address: string
    }
}