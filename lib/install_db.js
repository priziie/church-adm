//script para inicializar la base y cargar anuncios pre poblados
const connection = require("./connection");
const Usuario = require("../models/Usuario");
const Informacion = require("../models/Informacion");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const dropTables = async tabla => {
  try {
    await connection.dropCollection(tabla);
    console.log("Borrado tabla", tabla);
  } catch (err) {
    console.log("Error al borrar tabla", err);
  }
};

const insertInfoParro = async data => {
  try {
    const info = new Informacion(data);
    // const result = await info.save();
    // console.log("Guardado", result);
    //return result;
    return info.save();
  } catch (err) {
    console.log("Error", err);
  }
};

const insertAdminUser = async data => {
  try {
    const usuario = new Usuario(data);
    const result = await usuario.save();
    console.log("Guardado", result);
  } catch (err) {
    console.log("Error", err);
  }
};
// const getEncryptPwd = async (pwd)=>{
//     try {
//         const con =  await bcrypt.hash(pwd, saltRounds);
//         console.log(con);
//         return con;
//     } catch (error) {
//         console.log('Error in bcrypt', err)
//     }
// }
//borrando tablas
dropTables("usuarios");
dropTables("informacions");
const parro = {
  nombre: "Parroquia El Calvario",
  direccion: "Cojutepeque, Depto. Cuscatlan, El Salvador, C.A",
  parroco: "Padre Simeón Reyes",
  telefono: "2372-0333",
  departamento: "Cuscatlan",
  ciudad: "Cojutepeque"
};
insertInfoParro(parro).then(result => {
  console.log(result);

  const password = bcrypt.hashSync("12345", saltRounds);

  let usuario = {
    username: "admin",
    nombre: "Default account",
    parroquia: result._id,
    password: password,
    email: ""
  };
  insertAdminUser(usuario);
});
