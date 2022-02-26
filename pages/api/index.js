import { sequelize } from "../../config/db";
import Subscriber from "../../models/subscriber";
import { Channel } from "../../models/channels";

const handler = async (req, res) => {
  try {
    // Create the defined models to the db
    const attempt = await sequelize.sync();
    console.log(attempt.queries);

    res.status(200).json({ message: "Models are upto date" });
  } catch (e) {
    console.log("An error occured while fulfulling your request");

  }
};
export default handler;
