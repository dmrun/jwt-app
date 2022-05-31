import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
  {
    username: "Jonh",
    title: "Post 1",
  },
  {
    username: "Jones",
    title: "Post 2",
  },
];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
});

app.post("/login", (req, res) => {
  //Authenticate User

  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

/**
 *
 * @param {*} user
 * @returns
 */
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
}

app.listen(4000);
