import jwt from "jsonwebtoken";

const generateToken = (userId: string, role: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    {
      id: userId,
      role,
    },
    jwtSecret,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;