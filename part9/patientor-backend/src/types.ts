export interface Patient {
    id: string
    name: string
    occupation: string
    gender: Gender
    ssn?: string
    dateOfBirth?: string
    entries: Entry[]
  }

  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

  export interface FilteredPatient {
    id: string
    name: string
    occupation: string
    gender: Gender
    dateOfBirth?: string
    entries: Entry[]
  }

  export type PublicPatient = {
    id: string
    name: string
    occupation: string
    gender: Gender
    dateOfBirth?: string
    entries?: Entry[]
  }

  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

  export interface EntryBase {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes: Array<Diagnosis['code']>
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends EntryBase {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  export interface HospitalEntry extends EntryBase {
    type: "Hospital";
    discharge: Discharge
  }
  
  export interface Discharge {
    date: string;
    criteria: string;
  }
  
  export interface OccupationalHealthcareEntry extends EntryBase {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }
  
  export interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
  export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;
  
  
  export type EntryWithoutId =
    | Omit<HospitalEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">
    | Omit<HealthCheckEntry, "id">

  export type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
  }

  export type NewPatientEntry = Omit<Patient, 'id'>