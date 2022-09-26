describe('Shapes test', () => {
  it('successfully loads', () => {
    cy.request('/api/shapes') // change URL to match your dev URL
  })
});

describe('Units test', () => {
  it('successfully loads', () => {
    cy.request('/api/units')
  })
})


describe('Triangle Perimeter test', () => {
  it('successfully loads', () => {
    cy.request('POST', 'api/triangle/calc', { a: 4, b:5, c:6 }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('perimeter', 15) // true
      }
    )
  })
})

describe('Rectangle Perimeter test', () => {
  it('successfully loads', () => {
    cy.request('POST', 'api/rectangle/calc', { l: 4, w:5 }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('perimeter', 18) // true
      }
    )
  })
})

describe('square Perimeter test', () => {
  it('successfully loads', () => {
    cy.request('POST', 'api/square/calc', { l: 5, w:5 }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('perimeter', 20) // true
      }
    )
  })
})



