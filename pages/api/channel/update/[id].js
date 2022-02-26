import { Channel } from "../../../../models/channels";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    res.status(403).json({ message: "The method is not supported" });
  }
  //   find the data to be updated
  const toUpdate = req.body;
  try {
    const result = await Channel.update(toUpdate, {
      where: {
        id: req.query.id,
      },
    });
    console.log(result);
    res.status(200).json({ message: "Updates were effected" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error" });
  }
};
export default handler;
