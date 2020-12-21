export const thumbnailImg = (req, res) => {
  if (req.file) {
    console.log(req.file);
  } else {
    return res.status(500).json({ message: "Server Error" });
  }
};
