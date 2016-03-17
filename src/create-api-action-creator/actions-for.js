export default function (configuration) {
  const { success, pending } = configuration;

  return {
    pending() {
      return {
        type: pending
      }
    },

    success({ request, response }) {
      return {
        type: success,
        request,
        response
      }
    }
  };
};
