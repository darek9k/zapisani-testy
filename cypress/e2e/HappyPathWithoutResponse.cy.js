/// <reference types="cypress" />

import FormPage from '../support/page-object/formPage';

describe('Test na stronie testy-zadanie.zapisani.dev', () => {
    it('Wypełnienie formularza i sprawdzenie sukcesu oraz weryfikacja ilości dostępnych sztuk', () => {
        let initialCount;
        cy.visit('/')
        cy.acceptCookies()
        FormPage.fillFormWithTestData()
        FormPage.selectProductField1('product_field_f5296ba2')

        //pobranie danych początkowych 'Dostępne'
        extractNumber().then((number) => {
            initialCount = number;
        });

        FormPage.clickRegistrationButton()
        FormPage.selectingCash();
        FormPage.checkingSukces();
        FormPage.clickEndBtn()
        //pobranie danych końcowych 'Dostępne' oraz asercja
        extractNumber().then((number) => {
            expect(initialCount - number).to.eq(1)
        });
    });

    function extractNumber() {
        return cy.xpath('(//div/div[@class="col"])[3]')
            .invoke('text')
            .then((text) => {
                const number = text.match(/\d{3}/)[0];
                return number;
            });
    }
});

