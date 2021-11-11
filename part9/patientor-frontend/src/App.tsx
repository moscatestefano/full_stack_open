import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { setDiagnosesList, setPatientList } from "./state";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailPage from "./PatientSingleView/PatientDetailPage";

const App = () => {
  const [, dispatch] = useStateValue();
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosesList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientDetailPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
