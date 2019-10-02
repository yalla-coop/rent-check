function validationMiddleware(schema) {
  return {
    before: async (handler, next) => {
      try {
        await schema.validate(handler.event.body, {
          abortEarly: false,
        });
        return next();
      } catch (errs) {
        return {
          statusCode: 422,
          body: JSON.stringify(errs),
        };
      }
    },
  };
}

export default validationMiddleware;
