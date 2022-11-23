const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
  return token;
};

const decodeToken = (token) => {
  let result = jwt.decode(token, process.env.JWT_SECRET);
  return result;
};

const validateToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const validateAndGenerateToken = async (user) => {
  try {
    if (validateToken(user.usu_token)) return { token: user.usu_token };
  } catch (error) {
    let payload = { usu: user.usu_id };
    let token = await generateJWT(payload);

    await updateToken(user.usu_id, token);

    return { token };
  }
};

module.exports = {
  generateJWT,
  decodeToken,
  validateToken,
  validateAndGenerateToken,
};
