import { Channel } from "../../../../models/channels";

const DeleteChannel = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(403).json({ message: "forbidden" });
  }
  //  get the query
  const { id } = req.query;
  console.log(id);
  try {
    const remove = await Channel.destroy({
      where: {
        id,
      },
    });
    if (remove === 0) {
      res.status(404).json({ message: "Channel with that id was not found" });
    }
    res
      .status(200)
      .json({ message: `Successfully deleted channel with id-> ${id}` });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    console.log(e);
  }
};
export default DeleteChannel;
