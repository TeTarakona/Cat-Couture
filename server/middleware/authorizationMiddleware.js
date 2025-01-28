const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://catcouture.com",
  issuerBaseURL: `https://dev-n6zf0jzrcnjath8q.us.auth0.com/`,
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
