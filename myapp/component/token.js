module.exports = {
  checkOrPass: async (req, res, next) => {
    const token = req.headers.token;
    if (token && token !== '' && token !== 'null') {
      module.exports.check(req, res, next);
    } else {
      next();
    }
  },
  check: async (req, res, next) => {
    const token = req.headers.token;
    if (token && token === '1234567890') {
      // req.body._user = userinfo;
      next();
      return false;
      // const DB = await db();
      // const userColl = DB.collection('sales');
      // const userinfo = await userColl.findOne({
      //   token
      // }, {
      //     projection: {
      //       _id: true
      //     }
      //   });
      // if (userinfo) {
      //   req.body._user = userinfo;
      //   next();
      //   return false;
      // }
    }
    res.status(401);
    res.send({ msg: 'token is not available' });
  }
}