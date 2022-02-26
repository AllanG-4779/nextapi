import { Channel } from "../../../../models/channels";

const AddChannel = async (req, res) => {
  //  Collect the data submitted
  if (req.method !== "POST") {
    res.status(403).json({ error: "Request submitted not supported" });
  }
  try {
    const newInsert = await Channel.create(req.body);
    await newInsert.save();
    res.status(201).json({ message: "Channel added successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "The server was unable to fulfill your request" });
  }
};
export default AddChannel;
