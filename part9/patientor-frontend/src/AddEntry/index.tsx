import React from 'react';
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { EntryWithoutId } from '../types';

export type EntryFormValues = Omit<EntryWithoutId, "type">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            employerName: "",
            sickLeave: {startDate: "", endDate: ""}
        }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required.";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.sickLeave?.startDate || !values.sickLeave?.endDate)
                    errors.sickLeave = requiredError;
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form>
                        <Field 
                          label="Description"
                          placeholder="Description"
                          name="description"
                          component={TextField}
                        />
                        <Field
                          label="Date"
                          placeholder="YYYY-MM-DD"
                          name="date"
                          component={TextField}
                        />
                        <Field
                          label="Specialist"
                          placeholder="specialist"
                          name="date"
                          component={TextField}
                        />
                        <DiagnosisSelection
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          diagnoses={diagnoses}
                        />
                        <Field
                          label="Employer Name"
                          placeholder="Name of the employer"
                          name="employerName"
                          component={TextField}
                        />
                        <div>
                            <p>Sick Leave</p>
                            <Field
                              label="Start Date"
                              placeholder="Start Date"
                              name="startDate"
                              component={TextField}
                            />
                            <Field
                              label="End Date"
                              placeholder="End Date"
                              name="endDate"
                              component={TextField}
                            />
                        </div>
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                                >
                                Add entry
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;