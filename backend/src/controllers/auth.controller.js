const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios(nombre,email,telefono,password_hash)
       VALUES($1,$2,$3,$4) RETURNING id,email`,
      [nombre, email, telefono, hash]
    );

    res.json({ message: "Usuario creado", user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM usuarios WHERE email=$1`,
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "Usuario no existe" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
