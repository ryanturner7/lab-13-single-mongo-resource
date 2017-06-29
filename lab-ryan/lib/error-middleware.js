'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);
  if(err.message.toLowerCase().includes('Validation failed.'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('Duplicate key.'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('Object ID failed.'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
