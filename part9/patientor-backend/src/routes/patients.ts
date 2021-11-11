import express from 'express'

import patientService from '../services/patientService'

const router = express.Router()

router.get('/api/patients', (_req, res) => {
    res.send(patientService.getFilteredPatients())
})

router.get('/api/patients/:id', (_req, res) => {
    console.log("PARAM", _req.params.id)
    const patient = patientService.findById(_req.params.id)
    
    if (patient)
        res.send(patient)
    else
        res.sendStatus(404)
})

router.post('/api/patients', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatientEntry = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries: []
    })
    res.json(newPatientEntry)
})

export default router