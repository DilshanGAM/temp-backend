import Info from "../models/info.js";

// Create new info
export const createInfo = async (req, res) => {
  try {
    const info = new Info(req.body);
    await info.save();
    res.status(201).send(info);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read info
export const getInfo = async (_req, res) => {
  try {
    const info = await Info.find();
    res.send(info);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update info
export const updateInfo = async (req, res) => {
  try {
    const info = await Info.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!info) {
      return res.status(404).send();
    }
    res.send(info);
  } catch (error) {
    res.status(400).send(error);
  }
};
