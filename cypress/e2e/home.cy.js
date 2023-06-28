import patients from "../../test/data/patients.js"
import doctors from "../../test/data/doctors.js"
import appointments from "../../test/data/appointments.js"

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Page contains 3 React Components', () => {
    cy.getByData("patients").should("exist").type(patients)
    cy.getByData("doctors").should("exist").type(doctors)
    cy.getByData("appointments").should("exist").type(appointments)
    cy.get("#sendData").should("exist").click()
  })


})