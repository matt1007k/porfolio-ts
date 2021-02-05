import { UsernamePasswordInput } from "../resolvers/inputs/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [{ field: "email", message: "email is invalid" }];
  }
  if (options.username.length <= 2) {
    return [{ field: "username", message: "username must be grather than 2" }];
  }
  if (options.password.length <= 2) {
    return [{ field: "password", message: "password must be grather than 2" }];
  }
};
