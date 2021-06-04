'use strict'
const { validate } = use("Validator");
const User = use("App/Models/User");

class UserController {
  async postLogin({ request, response, auth }) {
    //validate form inputs
    console.log("DEBUG: postLogin");
    const validation = await validate(
      request.all(),
      {
        username: "required",
        password: "required"
      },
      {
        unique: "{{ field }} is not unique",
        required: "{{ field }} is required."
      }
    );
    // show error messages upon validation fail
    if (validation.fails()) {
      return response
        .status("200")
        .send({ success: false, message: validation.messages()[0].message });
    }

    // return auth.authenticator('jwt').withRefreshToken().attempt(phone_number,password)
    // const user = await auth.authenticator('jwt').withRefreshToken().attempt(phone_number,password)
    try {
      const { username, password } = request.all();
      const user = await User.findByOrFail("username", username);
      const jwt = await auth
        .authenticator("jwt")
        .withRefreshToken()
        .attempt(username, password);

      if (!user.is_active) {
        return response
          .status("200")
          .json({ message: "Account is not active", success: false });
      }

      if (!user.is_confirmed) {
        return response
          .status("200")
          .json({ message: "Account is not confirmed", success: false });
      }
      return response.status("200").json({
        message: "Login successful",
        data: {
          user: user,
          jwt: jwt
        },
        success: true
      });
    } catch (error) {
      console.log(error);
      return response.status("400").json({
        message: "These credentials do not match our records.",
        success: false,
        data: {}
      });
    }
  }
  
  async postLogout({ auth, response }) {
    try {
      const apiToken = auth.getAuthHeader();
      await auth.authenticator("jwt").revokeTokens([apiToken]);
      return response
        .status("200")
        .json({ success: true, message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .json({ success: false, message: "Logout error" });
    }
  }
}

module.exports = UserController
