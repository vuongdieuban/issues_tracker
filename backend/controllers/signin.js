const config = require("config");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { User } = require("../models/user");

class SigninController {
  signin = async (req, res) => {
    const ClientId = config.get("ClientId");
    const ClientSecret = config.get("ClientSecret");

    const { accessToken } = req.body;
    const oauth2Client = new OAuth2(ClientId, ClientSecret);

    oauth2Client.setCredentials({ access_token: accessToken });

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2"
    });

    try {
      const { data } = await oauth2.userinfo.get();
      // CHeck if user exist based on googleId, if user not exist in database, create user. Return a signed JWT.
      // If user already exist, load up existed user. Return a signed JWT.
      const { id: googleId, email, name } = data;
      let user = await User.findOne({ googleId });
      if (!user) {
        user = new User({
          googleId,
          name,
          email
        });
        await user.save();
      }
      const jwtToken = user.generateAuthToken();
      res
        .header("x-auth-token", jwtToken)
        .header("access-control-expose-headers", "x-auth-token")
        .json(jwtToken);
    } catch (err) {
      res.status(401).send("Wrong authentication credential");
      console.log(err);
    }
  };
}

module.exports = new SigninController();
