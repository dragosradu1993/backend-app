const { generateProfile } = require("./profileGenerator.utils");
const profileGeneratorUtils = require("./profileGenerator.utils");
const userGeneratorUtils = require("./userGenerator.utils");

module.exports = {
  requestGenerator: (jsonRequest) => {
    let request, profile;
    const user = userGeneratorUtils.generateUser()
    user["roleName"] = jsonRequest.roleName
    profile = profileGeneratorUtils.generateProfile(jsonRequest.gender)

    request = {
      body: {
        email: user.email,
        password: user.password,
        roleName: user.roleName,
        profile
      }
    }

    return request
  }
}