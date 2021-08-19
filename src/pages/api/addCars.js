import nextConnect from "next-connect";
import multer from "multer";
import { createCar } from "../../database/createCar";
import { verify } from "jsonwebtoken";
import { secret } from "../../../api/secret";
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/photos/cars",
    filename: (req, file, cb) => {
      return cb(null, file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use((req, res, next) => {
  verify(req.headers.Authorization, secret, function (err, decoded) {
    if (!err && decoded) {
      return next();
    }
    res.status(401).json({ message: "You are not authorized!" });
  });
});

apiRoute.use(upload.array("theFiles"));

apiRoute.post((req, res) => {
  req.body.photoUrl = req.files[0]
    ? "./photos/cars/" + req.files[0].originalname
    : null;
  createCar(req.body);

  res.status(200).json({ files: JSON.stringify(req.files) });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
