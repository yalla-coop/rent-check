function validationMiddleware(schema) {
  return {
    before: (handler, next) => {
      schema
        .validate(handler.event.body, {
          abortEarly: false,
        })
        .then(() => {
          return next();
        })
        .catch(err => {
          return handler.callback(null, {
            statusCode: 422,
            body: JSON.stringify({
              error: err,
            }),
          });
        });
    },
  };
}

export default validationMiddleware;
