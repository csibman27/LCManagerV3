import { assert } from "chai";
import { db } from "../src/models/db.js";

suite("User API tests", () => {
  const al = {
    firstName: "Al",
    lastName: "Capone",
    email: "al@capone.com",
    password: "1",
  };

  setup(async () => {
    db.init();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(al);
    assert.deepEqual(al, newUser);
  });
});
