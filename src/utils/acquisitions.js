import Chart from "chart.js/auto";

export async function getAquisitionsByYear() {
  return new Chart("myChart", {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["server.length", "R720-2", "Server2222", "SAN"],
      datasets: [
        {
          label: "Services",
          data: [123213, 123213, 1234124, 4213342],
          // backgroundColor:"green"
          backgroundColor: ["green", "red", "yellow"],
        },
      ],
    },
    options: {},
  });
}

export async function getDimensions() {
  const dimensionsQuery = {
    dimensions: ["Artworks.widthCm", "Artworks.heightCm"],
    measures: ["Artworks.count"],
    filters: [
      {
        member: "Artworks.classification",
        operator: "equals",
        values: ["Painting"],
      },
      {
        member: "Artworks.widthCm",
        operator: "set",
      },
      {
        member: "Artworks.widthCm",
        operator: "lt",
        values: ["500"],
      },
      {
        member: "Artworks.heightCm",
        operator: "set",
      },
      {
        member: "Artworks.heightCm",
        operator: "lt",
        values: ["500"],
      },
    ],
  };

  const resultSet = await cubeApi.load(dimensionsQuery);

  return resultSet.tablePivot().map((row) => ({
    width: parseInt(row["Artworks.widthCm"]),
    height: parseInt(row["Artworks.heightCm"]),
    count: parseInt(row["Artworks.count"]),
  }));
}
