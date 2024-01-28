import { assert } from "chai";
import { apiService } from "./api-service.js";
import { assertSubset } from "../test-utils.js";
import { Al } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {});
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await apiService.createUser(Al);
    assertSubset(Al, newUser);
    assert.isDefined(newUser._id);
  });
});
