const config = require("config");

module.exports = function() {
  /**set all JwtPrivateKey, ClientId, ClientSecret in terminal. Follow example below for all three keys
   * export JwtPrivateKey="PrivateKeyString" */
  try {
    const JwtPrivateKey = config.get("JwtPrivateKey");
    const ClientId = config.get("ClientId");
    const ClientSecret = config.get("ClientSecret");
    if (!JwtPrivateKey || !ClientId || !ClientSecret) {
      throw new Error(
        "FATAL ERROR: JwtPrivateKey or ClientId or ClientSecret is not defined"
      );
    }
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
};
