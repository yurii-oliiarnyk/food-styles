export const validators = {
  name: {
    validate: (value: string) => value.length > 3,
    message: "Name is too short",
  },
  password: {
    validate: (value: string) => value.length >= 6,
    message: "Password is too short",
  },
  email: {
    validate: (value: string) => {
      // eslint-disable-next-line no-useless-escape
      const testRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      return !!value.match(testRegex);
    },
    message: "Email is not valid",
  },
};
