import patientsData from '../../data/patients'

import { Patient, FilteredPatient, NewPatientEntry, PublicPatient, Entry } from '../types'
import {v1 as uuid} from 'uuid'

const patients: Array<Patient> = patientsData

const getPatients = (): Array<Patient> => {
    return patients
}

const getFilteredPatients = (): Array<PublicPatient> => {
    return patients.map(({id, name, occupation, gender, dateOfBirth}) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }))
}

const findById = (id: string): Patient | FilteredPatient | PublicPatient | undefined => {
    const entry = patients.find(p => p.id === id)
    return entry
}

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }

    patients.push(newPatientEntry)
    return newPatientEntry
}

const addEntry = (patient: Patient, newentry: Entry): Patient => {
    const id: string = uuid()

    const entry: Entry = {
        ...newentry,
        id
    }
    patient.entries.push(entry)

    return patient
}

export default {
    getPatients,
    getFilteredPatients,
    findById,
    addPatient,
    addEntry
}