import { db } from "../../src/models/db.js";

suite("Array test", () => {
  setup(async () => {
    db.init();
  });

  test("Test for determining server age", async () => {
    const days = [];
    const servers = await db.serverStore.getAllServers();
    for (let i = 0; i < servers.length; i++) {
      const s = servers[i].pdate;
      // convert the value to a date before calling the method
      const purchaseDate = new Date(s);
      const dateNow = new Date();
      // Calculating the time difference of two dates
      const differenceInTime = dateNow.getTime() - purchaseDate.getTime();
      // calculating the number of days between two dates
      const diffInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      // console.log("Result in days: " + diffInDays);
      // Convert days to Year
      const daysToYear = diffInDays / 365;
      // console.log("Years: " + daysToYear);
      days.push(diffInDays);
      // year = daysToYear;
    }
  });
});
