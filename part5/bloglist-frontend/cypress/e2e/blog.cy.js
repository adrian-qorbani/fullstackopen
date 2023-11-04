describe("Blog-list app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Zoro",
      username: "zoro",
      password: "supersecretpassword",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Favorite Blog List");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Login").click();
      cy.get("#username").type("zoro");
      cy.get("#password").type("supersecretpassword");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("Add Blog").click();
      cy.get("#input_title").type("a blog created");
      cy.get("#input_author").type("cypress");
      cy.get("#input_url").type("http://cypress.com");
      cy.contains("Save").click();
      cy.contains("a blog created");
    });
  });
});
