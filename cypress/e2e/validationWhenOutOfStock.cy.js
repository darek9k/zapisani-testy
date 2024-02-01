/// <reference types="cypress" />

import FormPage from '../support/page-object/formPage';

describe('Test na stronie testy-zadanie.zapisani.dev', () => {
  it('Wypełnienie formularza i sprawdzenie komunikatu po wybraniu brakującego produktu', () => {
    cy.visit('/')
    cy.acceptCookies();
    FormPage.fillFormWithTestData()
    FormPage.selectProductField1('product_field_83cf9412')
    FormPage.clickRegistrationButton()
    cy.get('.modal-content') 
    .should('be.visible') 
    .should('contain.text', 'Rejestracja niemożliwa. Wybrany produkt nie jest dostępny.')
    })
})