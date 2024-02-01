/// <reference types="cypress" />

import FormPage from '../support/page-object/formPage';

describe('Test na stronie testy-zadanie.zapisani.dev', () => {
  it('Wypełnienie formularza i sprawdzenie komunikatu przy wybraniu brakującego produktu', () => {
    cy.visit('/')
    cy.intercept('POST', '/services/participant/validate').as('validateResponse');
    cy.acceptCookies();
    FormPage.fillFormWithTestData()
    FormPage.selectProductField1("product_field_83cf9412")
    FormPage.clickRegistrationButton()
  
    cy.wait('@validateResponse').then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body.errors).to.contain('Rejestracja niemożliwa. Wybrany produkt nie jest dostępny.');
    });
  })
})