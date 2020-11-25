/// <reference types="cypress" />

Cypress.config('baseUrl', Cypress.config('API_ROOT'));

describe('Authentication endpoint', () => {

  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.loginAsDefaultUser();
  });

  it('gets current User', () => {
    cy.fixture("authentication/default-user").then((fx) => {
      cy.request({
        method: 'GET',
        url: '/user',
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body.user.email).to.equal(fx.user.email);
      })
    })
  });

  it('updates default user', () => {
    cy.fixture("authentication/default-user").then((fx) => {
      // TODO: once helpers added, get a profile to confirm there is no image assigned yet
      cy.request({
        method: 'PUT',
        url: '/user',
        body: {
          "user": {
              "image": "https://www.pinclipart.com/picdir/big/575-5757890_cat-online-chat-clip-art-silhouette-profil-chat.png"
                  }
              },
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body.user.image).to.equal('https://www.pinclipart.com/picdir/big/575-5757890_cat-online-chat-clip-art-silhouette-profil-chat.png');
      })
    })    
  });

  it('updates non-existent user', () => {
    cy.fixture("authentication/default-user").then((fx) => {
      cy.request({
        method: 'PUT',
        url: '/user',
        body: {
          "non-ex-user": {
              "image": "https://www.pinclipart.com/picdir/big/575-5757890_cat-online-chat-clip-art-silhouette-profil-chat.png"
                  }
              },
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.body.errors.message).to.equal('Cannot read property \'username\' of undefined');
      })
    })
  });

  it('gets admin profile', () => {
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.request({
        method: 'GET',
        url: `/profiles/${fx.profile.username}`,
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body).to.deep.equal(fx);
      })
    })   
  });

  it('follows admin', () => {
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.request({
        method: 'POST',
        url: `/profiles/${fx.profile.username}/follow`,
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body.profile.username).to.equal(fx.profile.username);
        expect(response.body.profile.following).to.equal(true);
      })
    })  
  });

  it('unfollows admin', () => {
    // TODO: remove dependency on the previous test. use helper to follow user first?
    cy.fixture("profile/admin-profile").then((fx) => {
      cy.request({
        method: 'DELETE',
        url: `/profiles/${fx.profile.username}/follow`,
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body.profile.username).to.equal(fx.profile.username);
        expect(response.body.profile.following).to.equal(false);
      })
    })  
  });  

})