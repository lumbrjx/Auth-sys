import { createUser } from "domains/auth/auth.services";

createUser({
  username: "jhon",
  email: "doe",
  password: "superpassword",
});
