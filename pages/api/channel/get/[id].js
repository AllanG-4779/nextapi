import { Channel } from "../../../../models/channels";

const specific = async (req, res) => {
  if (req.method !== "GET") {
    res.status(403).json({ error: "Request aborted" });
  }
  const { id } = req.query;
  try {
    const channels = await Channel.findByPk(id);
    if (channels == null) {
      res.status(404).json({ error: "Channel not found" });
    }
    res.status(200).json( channels );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default specific;
