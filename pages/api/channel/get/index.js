import { sequelize } from "../../../../config/db";
import { Channel } from "../../../../models/channels";

const channels = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json({ error: "Request aborted" });
  }
  try {
    const channels = await Channel.findAll();
    console.log(channels);
    res.status(200).json(channels);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default channels;
