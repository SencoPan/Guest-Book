const { register, login, getAll } = require('../methods/user');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    const {
      body: {username, password}
    } = req;
    try {
      const user = await register(username, password);
      if( user.error ) {
        res.status(500).json({
          error: user.error
        });
        return;
      }
      const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 8.4e7});;

      res.status(200).json({message: 'Sign up', data: { auth: true, token: token, user: user }})
    }
    catch (error) {
      res.status(500).json({error})
    }
  },
  login: async ( req, res ) => {
    const {
      body: {username, password}
    } = req;
  //  try {
      const user = await login(username, password);
      if( user.error ) {
        res.status(500).json({
          error: user.error
        });
        return;
      }
      const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 8.4e7});

      res.status(200).json({message: 'Logged in', data: {auth: true, token: token, user: user}})
/*    } catch (error) {
      res.status(500).json({
        error
      })
    }*/
  },
  get: async (req, res) => {
    const response = await getAll();

    res.status(200).json(response);
  }
};