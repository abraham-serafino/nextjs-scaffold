describe('/users/login', () => {
  it('Should return a user if u/p is correct', () => {
    cy.request("POST", "http://localhost:3000/api/users/login", {
      username: "admin",
      password: "password"
    }).then((response) => {
      expect(response.body).to.have.property("success")

      const { fullname, isAdmin } = response.body.success
      expect(fullname).toBe("Bob Smith")
      expect(isAdmin).toBe(0)
    })
  })
})