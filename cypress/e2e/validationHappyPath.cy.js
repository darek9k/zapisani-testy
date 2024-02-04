/// <reference types="cypress" />

import FormPage from '../support/page-object/formPage';

describe('Test na stronie testy-zadanie.zapisani.dev', () => {
  it('Wypełnienie formularza i sprawdzenie sukcesu oraz weryfikacja ilości dostępnych sztuk', () => {
    let initialCount;
    cy.intercept('GET', '/services/event/all-data/06a9d').as('getData')
    cy.visit('/')
    cy.acceptCookies()
    FormPage.fillFormWithTestData()
    FormPage.selectProductField1('product_field_f5296ba2')

    //pobranie danych początkowych 'Dostępne'
    cy.wait('@getData')
      .its('response.body')
      .then((body) => {
        initialCount = extractCountData(body, 'Produkt');
      });

    FormPage.clickRegistrationButton()
    selectingCash();
    checkingSukces();
    cy.intercept('GET', '/services/event/all-data/06a9d').as('getFinalData')
    FormPage.clickEndBtn()

    //sprawdzenie i asercja ilości 'Dostępne'
    cy.wait('@getFinalData')
      .its('response.body')
      .then((body) => {
        expect(extractCountData(body, 'Produkt') - initialCount).to.eq(1);
      });
  })
})

function selectingCash() {
  cy.url().should('include', '/platnosc');
  cy.get('[test-id="btn-cash"]', { timeout: 10000 }).click();
  cy.get('[test-id="registration-button"]').click();
  cy.url().should('include', '/zakonczono/gotowka');
}

function extractCountData(response, label) {
  const productField = response.definition.find(item => item.label === label);
  const selectedOption = productField.options.find(option => option.value === 'Produkt z ograniczoną pulą');

  const count = selectedOption.count;
  return count;
}

function checkingSukces() {
  cy.get('.text-center')
    .eq(0)
    .should('contain', 'Rejestracja przyjęta', { timeout: 5000 });

  cy.get('.text-center')
    .eq(1)
    .should('contain', 'Rejestracja przyjęta. Dziękujemy!');
}

