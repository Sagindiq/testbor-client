import { ReactEventHandler } from "react"

export interface sciencesInterface {
    sciences: {
        _id: string,
        science_name: string
    }[],
    handleChange: Function
};