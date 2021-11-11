import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatientDetail, useStateValue } from "../state";
import Details from "./Details";
import { HealthCheckRating, assertNever } from "../types";
import { EntryFormValues } from "../AddEntry";
import AddEntryModal from "../AddEntry/AddEntryModal";

const PatientDetailPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = { ...values, sickLeave: undefined };
      if (patient?.id){
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries/`, entry);
      dispatch(addEntry(newPatient));
      closeModal();
      }
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetail(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      fetchPatientDetails()
      .catch(() => "obligatory catch");
    }
  }, [patient, id, dispatch]);

  const displayGenderIcon = () => {
    switch(patient?.gender) {
      case "male": return <Icon name="mars" size="small" />;
      case "female": return <Icon name="venus" size="small" />;
      case "other": return <Icon name="genderless" size="small" />;
      default: return null;
    }
  };

  return (
    <>
      <div>
        <h2>{patient?.name}</h2> {displayGenderIcon()}
      </div>
      <div>
        <span>ssn:</span> <span>{patient?.ssn}</span>
      </div>
      <div>
        <span>occupation:</span> <span>{patient?.occupation}</span>
      </div>
      <h3>Entries</h3>
      <ul>{patient?.entries?.map((entry: Entry) => {
        switch (entry.type) { // EVERY CASE COULD USE ITS OWN COMPONENT
          case "Hospital":
            return (
            <div>
              <span><Icon name="hospital" size="large" /></span>
              <div>{entry.date}</div>
              <div>{entry.description}</div>
              <div>
                {entry.diagnosisCodes && <Details entry={entry} />}
                {entry.discharge && (
                <div>
                  <span>Discharge:</span>{" "}
                  {entry.discharge.criteria}
                  {entry.discharge.date}
                </div>)}
                </div>
            </div>);
          case "OccupationalHealthcare":
            return (
              <div>
                <span><Icon name="stethoscope" size="large" /></span>
                <div>{entry.date}</div>
                <div>{entry.employerName}</div>
                <div>
                  {entry.description}
                  {entry.sickLeave && (
                  <div>
                    <span>From:</span>{" "}
                    {entry.sickLeave.startDate}
                    To: {entry.sickLeave.endDate}
                  </div>)}
                  </div>
              </div>);
          case "HealthCheck":
            return (<div>
            <span><Icon name="user md" size="large" /></span>
            <div>
              <div>{entry.date}</div>
            </div>
            <div>{entry.description}</div>
            {entry.diagnosisCodes && <Details entry={entry} />}
            {entry.healthCheckRating === HealthCheckRating.Healthy ? <Icon name="heart" size="small" color="green" /> : null}
            {entry.healthCheckRating === HealthCheckRating.LowRisk ? <Icon name="heart" size="small" color="yellow" /> : null}
            {entry.healthCheckRating === HealthCheckRating.HighRisk ? <Icon name="heart" size="small" color="orange" /> : null}
            {entry.healthCheckRating === HealthCheckRating.CriticalRisk ? <Icon name="heart" size="small" color="red" /> : null}
            )
            </div>);
          default:
            assertNever(entry);
        }
      })}</ul>
      <AddEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} error={error} />;
    </>
  );
};

export default PatientDetailPage;