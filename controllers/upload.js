import { User } from "../models/user.js";
import { s3, BUCKET } from "../middlewares/upload.js";

// POST
export const uploadFile = async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $push: { file: req.file },
    });
    res.status(202).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE
export const deleteFile = async (req, res) => {
  const { id } = req.params;
  const filename = req.params.key;
  // MONGODB
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { $pull: { file: { key: filename } } },
      false,
      true
    );
    res.status(200).json({ messagge: "file eliminato!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  console.log(filename);
  // DELETE ON AWS S3
  await s3
    .deleteObject({
      Bucket: BUCKET,
      Key: filename,
    })
    .promise();
};

// GET - GET FILES
export const getFile = async (req, res) => {
  const filename = req.params.filename;
  let filesAWS = await s3
    .getObject({
      Bucket: BUCKET,
      Key: filename,
    })
    .promise();
  res.send(filesAWS.Body);
};

// GET FILE LIST - AMAZON S3
export const getFileList = async (req, res) => {
  let fileList = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  let mappedFileList = fileList.Contents.map((item) => item.key);
  res.send(mappedFileList);
};
