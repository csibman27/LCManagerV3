import { assert } from "chai";
import { apiService } from "./api-service.js";
import { assertSubset } from "../test-utils.js";
import { al } from "../../fixtures.js";

suite("User API tests", () => {
  setup(async () => {});
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await apiService.createUser(al);
    assertSubset(al, newUser);
    assert.isDefined(newUser._id);
  });
});
