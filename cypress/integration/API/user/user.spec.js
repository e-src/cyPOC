/// <reference types="cypress" />

describe('Authentication endpoint', () => {

  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.loginAsDefaultUser();
  });

  it('gets current User', () => {
    cy.fixture("authentication/default-user").then((fx) => {
      cy.getCurrentUser()
      .then((response) => {
        expect(response.body.user.email).to.equal(fx.user.email);
      })
    })
  });

  it('updates default user', () => {
    cy.getCurrentUser()
      .then((response) =>{
        expect(response.body.user.image).to.be.empty
      });
    cy.fixture("users/user-updated-image").then((fx) => {
      cy.updateUser(fx)
      .then((response) => {
        expect(response.body.user.image).to.equal(fx.user.image);
      })
      cy.getCurrentUser()
      .then((response) =>{
        expect(response.body.user.image).to.equal(fx.user.image);
      });  
    })    
  });

  it('updates non-existent user', () => {
    cy.fixture("users/invalid-user-updated-image").then((fx) => {
      cy.updateUser(fx, false)
      .then((response) => {
        expect(response.body.errors.message).to.equal('Cannot read property \'username\' of undefined');
      })
    })
  });

  it('gets admin profile', () => {
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.getProfile(fx.profile.username)
      .then((response) => {
        expect(response.body).to.deep.equal(fx);
      })
    })   
  });

  it('follows admin', () => {
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.followUser(fx.profile.username)
      .then((response) => {
        expect(response.body.profile.username).to.equal(fx.profile.username);
        expect(response.body.profile.following).to.equal(true);
      })
    })  
  });

  it('unfollows admin', () => {
    // TODO: remove dependency on the previous test. use helper to follow user first?
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.unfollowUser(fx.profile.username)
      .then((response) => {
        expect(response.body.profile.username).to.equal(fx.profile.username);
        expect(response.body.profile.following).to.equal(false);
      })
    })  
  });  

})