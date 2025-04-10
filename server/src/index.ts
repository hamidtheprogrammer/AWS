import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

const cats: { title: string; description: string; image: string }[] = [
  {
    title: "Sleepy Cat",
    description: "This cat loves naps. And who doesn't?",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Playful Cat",
    description: "Zoomies at 3 AM guaranteed.",
    image:
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Curious Cat",
    description: "Exploring every corner of the house.",
    image:
      "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
  res.status(200).json(cats);
});

app.listen(8010, "0.0.0.0", () => {
  console.log("SERVER UP!!");
});
