const BlackCoffee = require("../models/API.models");

const apiData = async (req, res) => {
  try {
    const data = await BlackCoffee.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const apiDataKey = async (req, res) => {
  try {
    const key = req.params.key;

    const data = await BlackCoffee.aggregate([
      { $project: { _id: 1, [key]: 1 } }, 
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  apiData,
  apiDataKey,
};
