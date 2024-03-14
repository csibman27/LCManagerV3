import { assert } from "chai";
import { db } from "../../src/models/db.js";

suite("Browser test", () => {
  setup(async () => {
    db.init();
  });

  test("Firefox", async () => {
    // const myWindow = window.open("", "", "width=200,height=100");
    const pass = "just pass for now";
  });
});
