import {adminRegister, adminLogin} from '.././../../../prismaFunctions.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Login
    const { username, password } = req.body;
    const loginResult = await adminLogin(username, password);
    res.json(loginResult);
  } else if (req.method === 'PUT') {
    // Example: Register
    const { name, username, password } = req.body;
    const registerResult = await adminRegister(name, username, password);
    res.json(registerResult);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
