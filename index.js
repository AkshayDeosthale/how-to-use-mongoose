const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");
const app = express();
const port = 3000;
const getImages = require("./getImages");
const Photo = require("./Photos");

mongoose.connect(
  "mongodb://localhost:27017/testDB",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

// async function run() {
//   try {
//     // const user = await User.create({
//     //   name: "Nitin",
//     //   age: 26,
//     //   email: "akshay.deosthale6@gmail.com",
//     //   hobbies: ["coding", "games"],
//     //   address: {
//     //     street: "Bharat nagar",
//     //     city: "Nagpur",
//     //   },
//     // });
//     // const user = await User.findOne({ name: "Nitin" });
//     // const user = await User.findOne({ name: "Akshay" });
//     // console.log(user);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// run();

const storeImages = async (imagesData) => {
  imagesData.forEach(async (image) => {
    const img = await Photo.create({
      id: image.id,
      created_at: image.created_at,
      width: image.width,
      height: image.height,
      url: {
        raw: image.urls.raw,
        full: image.urls.full,
        regular: image.urls.regular,
        small: image.urls.small,
      },
      download: image.links.download,
      lastName: image.user.last_name,
      twitter: image.user.twitter_username,
      bio: image.user.bio,
      location: image.user.location,
    });
  });
};

app.get("/photos", async (req, res) => {
  const pics = await Photo.find();
  res.json(pics).status(403);
});

app.get("/photos/:slug", async (req, res, next) => {
  const pics = await Photo.findOne({ lastName: req.params.slug });
  res.json(pics).status(403);
});

app.get("/pull", async (req, res) => {
  const imagesData = await getImages();
  await storeImages(imagesData);
});

app.listen(port, () => {
  console.log(`MongoDB app listening on port ${port}`);
});
