"use strict";

const jwt = require("jsonwebtoken");

//funcion que crea un middleware de autenticación jwt
module.exports = () => {
  return (req, res, next) => {
    //recogemos el token
    console.log("entro");
    const token = req.get("authorization");

    if (!token) {
      const error = new Error("no token provided");
      error.status = 401;
      next(error);
    }

    //verificando token
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        ignoreExpiration: true
      },
      (err, tokenDescodificado) => {
        if (err) {
          // if(err.name == "TokenExpiredError"){
          const error = new Error("token expired");
          error.status = 440;
          next(error);
          return;
          // }

          // next(new Error('invalid token'));
          // return;
        }
        req.user_id = tokenDescodificado.user_id;
        req.parroquia = tokenDescodificado.parroquia;
        next();
      }
    );
  };
};
