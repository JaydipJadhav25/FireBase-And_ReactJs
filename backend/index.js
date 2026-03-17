import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { TokenModel } from "./model/token.model.js";
import  admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf-8")
);





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});





const connectDB = async () => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect("mongodb://localhost:27017/NotificationSystem'");
    console.log('Connected to MongoDB !');
  } catch (error) {
    console.error('Connection to MongoDB  failed!', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}));



app.get("/" , (req , res) =>{
     return res.json({
        message : "this is firebase notification server !"
     })
})


//save token db

app.post("/save-token", async (req, res) => {
  const { token } = req.body;

  console.log("token : " , token);

  await TokenModel.create({ token });

  res.json({ message: "Token saved" });
});


//sendd notification to user


app.get("/send-notification", async (req, res) => {

  const tokens = await TokenModel.find();

  const tokenList = tokens.map(t => t.token);

//   const message = {
//     notification: {
//       title: "New Update 🚀",
//       body: "Check our latest feature!"
//     },
//     tokens: tokenList
//   };

const message = {
  notification: {
    title: "🚀 New Feature Launched!",
    body: "Try our new dashboard now"
  },
  webpush: {
    notification: {
      icon: "https://www.shutterstock.com/image-vector/ai-generate-logo-artificial-intelligence-600nw-2519534733.jpg",
      image: "https://www.shutterstock.com/image-vector/ai-generate-logo-artificial-intelligence-600nw-2519534733.jpg",
      badge: "https://thumbs.dreamstime.com/b/ai-artificial-intelligence-logo-hand-machine-learning-concept-sphere-grid-wave-binary-code-big-data-innovation-152226694.jpg",
      vibrate: [200, 100, 200],
      requireInteraction: true
    }
  },
  data: {
    url: "https://smart-mess-system.vercel.app/"
  },
  tokens: tokenList
};




  const response = await admin.messaging().sendEachForMulticast(message);

  res.json(response);
});





//create connection with mongodb
connectDB()
.then(()=>{
    app.listen(port , ()=>{
        console.log("Server is Running On Port : " , port);
    })
})
.catch(()=>{
    console.log("Server Start Error!")
})













