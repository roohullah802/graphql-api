import jwt from "jsonwebtoken";
export class Auth {
  static refreshToken(user) {
    return (
      jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN,
      ),
      { expiresIn: "15m" }
    );
  }

  static accessToken(user) {
    return (
      jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.REFRESH_TOKEN,
      ),
      { expiresIn: "7d" }
    );
  }
}
