import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie } from "./fixtures.js";

suite("Browser test", () => {

  setup(async () => {
    db.init();
  });

  test("Firefox", async () => {

    const myWindow = window.open("", "", "width=200,height=100");
  });
});