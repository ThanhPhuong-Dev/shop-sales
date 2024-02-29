function convertDataChart(data, type) {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        if (Array.isArray(opt[type])) {
          opt[type].forEach((item) => {
            if (!object[item['type']]) {
              object[item['type']] = 1;
            } else {
              object[item['type']] += 1;
            }
          });
        }
      });

    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: item,
          value: object[item]
        };
      });

    return results;
  } catch (e) {
    return [];
  }
}

export default convertDataChart;
