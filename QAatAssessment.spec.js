describe('QA Automation Test', () => {

    it('Access computer-database.gatling page', () => {
        cy.visit('https://computer-database.gatling.io/computers/')
    });

    //1) Locating Commodore 64 in the table: 
    it('Locate Commodore 64', () => {
        cy.get('#searchbox').type('Commodore 64');
        cy.get('#searchsubmit').click();
    });

    //a. Inside Commodore 64 edit section:
    it('Edit Commodore 64', () => {
        cy.contains('Commodore 64').should('be.visible')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
    });

    //i. Negative test case (this 'it' will fail)
    it('Negative TC: Verfify computer name to be Commodore 65', () => {
        cy.get('#name').contains("Commodore 65")
    });

    //i. Positive test case. The 3 text boxes will be cleared, retyped and saved with the same info
    it('Valid data is updated successfully', () => {
        cy.get('#name').clear();
        cy.get('#introduced').clear();
        cy.get('#discontinued').clear();
        cy.get('#name').type('Commodore 64');
        cy.get('#introduced').type('1982-08-01');
        cy.get('#discontinued').type('1994-01-01');
        cy.get('.primary').click();
        cy.get('.alert-message').should('be.visible');
    });
    
    // Filtered by HP
    it('Filter computer list by “HP”', () => {
        cy.get('#searchbox').type('HP ');
        cy.get('#searchsubmit').click();
    });

    // Mapping and printing each value 
    it('Table Filtered and printed', () => {
        cy.get('table')
            .find('tbody tr')
            .each(($row, rowIndex) => {
                cy.wrap($row)
                    .find('td')
                    .each(($cell, columnIndex) => {
                        const cellText = $cell.text();
                        cy.log(`Row ${rowIndex}, Column ${columnIndex}: ${cellText}`);
                    });
            });
    });

       // Cleared search and Filtered by IBM
    it('Filter computer list by “IBM”', () => {
        cy.get('#searchbox')
            .clear()
            .type('IBM');
        cy.get('#searchsubmit').click();
    });

    it('Positioned on last page', () => {  
        cy.get('.next > a').click()
        cy.wait(1000)
        cy.get('.current > a', { timeout: 8000 }).contains('Displaying 11 to 20')
        cy.get('.next > a').click()
        cy.wait(1000)
        cy.get('#pagination > ul > li.next.disabled').should('have.class', 'next disabled') 
    });

    // Mapping and printing computer name values 
    it('Table Filtered and Computer Names Printed', () => {
        cy.get('table')
        .find('tbody tr')
        .each(($row, rowIndex) => {
          const firstCellText = $row.find('td').first().text();
          cy.log(`Row ${rowIndex}, Computer Name: ${firstCellText}`);
        });
    }); 

       // Adding a new computer
       it('Adding a new computer for Evans & Sutherland', () => {
        cy.get('#add').click();
        cy.get('#name').type('Testing'+1);
        cy.get('#introduced').type('2023-05-07');
        cy.get('#discontinued').type('2023-05-08');
        cy.get('#company').select('Evans & Sutherland')
        cy.wait(2000)
        cy.get('.primary').click();
        // the computer was successfully created
        cy.get('.alert-message',{ timeout: 8000 }).should('be.visible')
    });

});