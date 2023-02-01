import { ReactEventHandler } from "react"

export interface examInterface {
    sciences: {
        _id: string,
        science_name: string
    }[],
    handleChange: Function
};

export interface processInterface {
    actionId: number,
    sciences: {
        visible: boolean
    },
    faculties: {
        visible: boolean,
    },
    tests: {
        visible: boolean,
        requires: string[]
    },
    result: {
        visible: boolean,
        requires: {
            first_science_score: number,
            second_science_score: number,
            status: string,
            faculties: object[]
        }
    }
}