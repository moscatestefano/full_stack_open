import React from "react";
import { Diagnosis, Entry } from "../types";
import { useStateValue } from "../state";

interface DetailsProps {
  entry: Entry;
}

const Details = ({entry}: DetailsProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode: string) => {
        const diagnosis = diagnoses?.filter(
          (diagnosis: Diagnosis) => diagnosis.code === diagnosisCode
        );
        if (diagnosis) {
        return (
          <li key={`${entry.id}`}>
            {diagnosisCode}{" "}{diagnosis[0].name}
          </li>
        );
        }
      })}
    </ul>
  );
};

export default Details;