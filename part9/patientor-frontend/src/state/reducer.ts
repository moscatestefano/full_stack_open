import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAIL":
      return {
        ...state,
        patient: action.payload,
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
  
      };
    case "ADD_ENTRY": 
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientDetail = (patient: Patient):Action => {
  console.log("HERE");
  return {
    type: "SET_PATIENT_DETAIL",
    payload: patient
  };
};

export const setPatientList = (patients: Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addEntry = (newEntry: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntry,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]):Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};
