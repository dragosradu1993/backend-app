const uploadFile = require("../services/upload/upload.service");
const path = require('path')
const fs = require('fs')

const upload = async (req, res) => {
  try {

    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getLogoFileInfo = async (req, res) => {
  const directoryPath = path.resolve(`./resources/${req.query.env}/upload/logo`)
  const baseUrl = (`./static/${req.query.env}/upload/logo/`)
  console.log(directoryPath)
  fs.readdir(directoryPath, function (err, files) {
    if(err) {
      res.status(500).send({
        message: "Unable to find files!"
      })
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  })
}


const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
module.exports = {
  upload,
  getListFiles,
  getLogoFileInfo,
  download
};