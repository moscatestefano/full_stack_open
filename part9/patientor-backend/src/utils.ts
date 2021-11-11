import { Fields, Entry, EntryWithoutId, Gender, NewPatientEntry, EntryBase, Diagnosis, Discharge, HealthCheckRating, SickLeave } from './types'

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
    const newPatientEntry: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    }
    return newPatientEntry
}

const toNewEntry = (newEntry: any): EntryWithoutId => {
    let entryToValidate = parseEntry(newEntry);
    if (!entryToValidate)
        throw new Error("Entry not valid");
  
    let entry: Omit<EntryBase, "id"> = {
      date: parseString(entryToValidate.date),
      description: parseString(entryToValidate.description),
      specialist: parseString(entryToValidate.specialist),
      diagnosisCodes: parseDiagnosis(entryToValidate.diagnosisCodes),
    };
  
    switch (entryToValidate.type) {
      case "Hospital":
        return {
          ...entry,
          type: entryToValidate.type,
          discharge: parseDischarge(entryToValidate.discharge),
        };
      case "HealthCheck":
        return {
          ...entry,
          type: entryToValidate.type,
          healthCheckRating: parseHealthCheckRating(
            entryToValidate.healthCheckRating
          ),
        };
      case "OccupationalHealthcare":
        return {
          ...entry,
          type: entryToValidate.type,
          employerName: parseString(entryToValidate.employerName),
          sickLeave: parseSickLeave(entryToValidate.sickLeave),
        };
      default:
        return assertNever(entryToValidate);
    }
  };

const assertNever = (value: never): never => {
  throw new Error(`${JSON.stringify(value)}`)
}

const parseEntry = (entries: any): EntryWithoutId => {
    if (entries.map((entry: any) => !isEntry(entry)))
    {
      throw new Error("There are invalid entries.");
    }
    return entries;
}

const parseHealthCheckRating = (healthCheck: any): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheck))
    throw new Error("Incorrect health check rating.")
  return healthCheck
}

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating)
}

const parseDiagnosis = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
    const validCodes = diagnosisCodes.every((code:any) => parseString(code))
    if (validCodes)
        return diagnosisCodes
    else
      throw new Error("Diagnosis code is not valid.")
}

const parseDischarge = (text: any): Discharge => {
    return {
      date: text.date,
      criteria: text.criteria
    }
}

const parseSickLeave = (sickleave: any): SickLeave => {
  if (!sickleave)
    throw new Error("Incorrect sick leave.")
  const startDate = parseString(sickleave.startDate)
  const endDate = parseString(sickleave.endDate)

  return {
    startDate,
    endDate
  }
}

const isEntry = (entry: any): entry is Entry => {
    const healthCheck: boolean = entry.type === "HealthCheck";
    const occupationalHealthcare: boolean = entry.type === "OccupationalHealthcare";
    const hospital: boolean = entry.type === "Hospital";
  
    return healthCheck || occupationalHealthcare || hospital; 
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isGender = (text: any): text is Gender => {
    return Object.values(Gender).includes(text)
}

const parseGender = (text: unknown): Gender => {
    if (!text || !isGender(text))
        throw new Error('Incorrect gender value')
    
    return text
}

const parseString = (text: unknown): string => {
    if (!text || !isString(text))
        throw new Error('Incorrect or missing field')
    
    return text
}

export default {
  toNewPatientEntry,
  toNewEntry
}