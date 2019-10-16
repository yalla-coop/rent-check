import checkAuth from '../utils/auth';

function authMiddleware() {
  return {
    before: (handler, next) => {
      checkAuth(handler.event)
        .then(user => {
          // set user data on event
          // eslint-disable-next-line no-param-reassign
          handler.event.user = user;
          // We have the user, trigger next middleware
          return next();
        })
        .catch(error => {
          return handler.callback(null, {
            statusCode: 401,
            body: JSON.stringify({
              error: error.message,
            }),
          });
        });
    },
  };
}

export default authMiddleware;
