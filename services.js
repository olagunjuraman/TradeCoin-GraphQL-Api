const axios = require("axios");

const getPrice = async (args) => {
  const { type, margin } = args;
  if (type.toLowerCase() != "sell" && type.toLowerCase() != "buy") {
    throw "type can only be buy or sell!!!";
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
        );
        const { USD } = res.data.bpi;
        let newPrice;

        if (type.toLowerCase() === "sell") {
          newPrice = USD.rate_float - margin * USD.rate_float;
        } else if (type.toLowerCase() === "buy") {
          newPrice = USD.rate_float + margin * USD.rate_float;
        } else {
          newPrice = undefined;
        }

        resolve({
          price: newPrice,
          currency: "NGN",
          type: type.toUpperCase(),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = {
  getPrice,
};
