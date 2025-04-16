import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getAllCatPosts, savePost } from "./services/post-service.js";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

dotenv.config();

export type Cat = {
  title: string;
  description: string;
  image: string;
};

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callBack) => {
      const allowedOrigins = ["http://127.0.0.1:5500"];

      if (!origin || allowedOrigins.includes(origin as string)) {
        callBack(null, true);
      } else {
        callBack(new Error("Origin not allowed"), false);
      }
    },
  })
);

app.get("/cats", async (req: Request, res: Response): Promise<void> => {
  try {
    const cats = await getAllCatPosts();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

app.post(
  "/post-cat",
  upload.single("image"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const image = req.file as Express.Multer.File;

      const { title, description } = req.body;

      if (!image) {
        return res.status(400).json({ message: "Please upload an image" });
      }

      const input = {
        Body: image.buffer,
        Bucket: "test-bucket-hamidisagoodboy",
        Key: image.originalname,
        ContentType: image.mimetype,
      };
      const command = new PutObjectCommand(input);
      const response = await client.send(command);

      if (response.$metadata.httpStatusCode === 200) {
        const url = `https://test-bucket-hamidisagoodboy.s3.us-east-1.amazonaws.com/${image.originalname}`;

        const cat: Cat = {
          title,
          description,
          image: url,
        };

        const savedCat = await savePost(cat);
        res.status(201).json(savedCat);
      } else {
        res.status(400).json({ message: "Upload failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  }
);

app.listen(8010, "0.0.0.0", () => {
  console.log("SERVER UP!!");
});
