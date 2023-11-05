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

  it("user login form is shown", function () {
    cy.contains("Username:");
    cy.contains("Password:");
    cy.contains("Login");
  });

  describe("Login functionality", function () {
    it("succeeds with authentic authentication", function () {
      cy.contains("Login").click();
      cy.get("#username").type("zoro");
      cy.get("#password").type("supersecretpassword");
      cy.get("#login-button").click();
      cy.contains("Zoro logged in.");
    });

    it("login fails with wrong password", function () {
      cy.contains("Login").click();
      cy.get("#username").type("zoro");
      cy.get("#password").type("someotherstuff");
      cy.get("#login-button").click();

      cy.get("#error").should("contain", "Wrong credentials");

      cy.get("html").should("not.contain", "Zoro logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "zoro", password: "supersecretpassword" });
    });

    it("a new blog can be created", function () {
      cy.contains("Add Blog").click();
      cy.get("#input_title").type("a blog created");
      cy.get("#input_author").type("cypress");
      cy.get("#input_url").type("http://cypress.com");
      cy.contains("Save").click();
      cy.visit("http://localhost:5173");

      cy.contains("a blog created");

    });

    it("blog post can be liked", function () {
      cy.contains("Add Blog").click();
      cy.get("#input_title").type("some true story blog");
      cy.get("#input_author").type("cypress");
      cy.get("#input_url").type("http://something.com/something");
      cy.contains("Save").click();
      cy.visit("http://localhost:5173");

      cy.get("#like-button").click();
      cy.contains("1");
    });

    it("user who created a blog can delete it", function () {
      cy.contains("Add Blog").click();
      cy.get("#input_title").type("some true story blog");
      cy.get("#input_author").type("cypress");
      cy.get("#input_url").type("http://something.com/something");
      cy.contains("Save").click();
      cy.visit("http://localhost:5173");

      cy.contains("Show").click();
      cy.get("#remove").click();

      cy.get("html").should("not.contain", "some true story blog");
    });
  });

  describe("Sorting blogs by number of likes", function () {
    beforeEach(function () {
      cy.login({ username: "zoro", password: "supersecretpassword" });
      cy.createBlog({
        title: "javascript is lovely",
        author: "Cypress",
        url: "http://somecoolweb.com",
      });
      cy.createBlog({
        title: "c++ is not so lovely",
        author: "Cypress",
        url: "http://somecoolerweb.com",
      });
      cy.createBlog({
        title: "fullstack development is hard",
        author: "Cypress",
        url: "http://coolestweb.com",
      });

      cy.contains("javascript is lovely").parent().parent().as("blog1");
      cy.contains("c++ is not so lovely").parent().parent().as("blog2");
      cy.contains("fullstack development is hard").parent().parent().as("blog3");
    });

    it("they are ordered by number of likes", function () {
      cy.get("@blog1").contains("Show").click();
      cy.get("@blog2").contains("Show").click();
      cy.get("@blog3").contains("Show").click();
      cy.get("@blog1").contains("#like-button").as("like1");
      cy.get("@blog2").contains("#like-button").as("like2");
      cy.get("@blog3").contains("#like-button").as("like3");

      cy.get("@like2").click();
      cy.wait(1000);
      cy.get("@like1").click();
      cy.wait(1000);
      cy.get("@like1").click();
      cy.wait(1000);
      cy.get("@like3").click();
      cy.wait(1000);
      cy.get("@like3").click();
      cy.wait(1000);
      cy.get("@like3").click();
      cy.wait(1000);

      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("3");
        cy.wrap(blogs[1]).contains("2");
        cy.wrap(blogs[2]).contains("1");
      });
    });
  });
});
