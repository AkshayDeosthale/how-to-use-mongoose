const axios = require("axios");

const getImages = async () => {
  const res = await axios.get(
    "https://api.unsplash.com/photos/?client_id=6Rg3uCQhXE2TEBOW6Sew4eL_lsoHvdW-ZDnwRFrMbyY"
  );
  const data = res.data;

  return data;
};

module.exports = getImages;
