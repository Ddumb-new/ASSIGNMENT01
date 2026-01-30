// src/controllers/portfolioController.ts

import { Request, Response } from "express";

// In-memory portfolio data
const profile = {
  name: "Dawa Angchuk Sherpa",
  title: "Full-Stack Developer",
  summary: "Aspiring web developer with a passion for building interactive web applications."
};

const about = {
  bio: "I am a student at Georgian College, learning JavaScript frameworks and backend development. I enjoy coding, music, and creative hobbies.",
  hobbies: ["Music", "Sketching", "Nature walks"]
};

const projects = [
  {
    id: 1,
    name: "Personal Portfolio Website",
    description: "A responsive portfolio website built with HTML, CSS, and JS.",
    url: "https://github.com/username/portfolio"
  },
  {
    id: 2,
    name: "Todo API",
    description: "A RESTful API for managing todo tasks using Node.js and Express.",
    url: "https://github.com/username/todo-api"
  }
];

// In-memory contact messages
let contactMessages: { name: string; email: string; message: string }[] = [];

// Controllers

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json(profile);
};

export const getAbout = (req: Request, res: Response) => {
  res.status(200).json(about);
};

export const getProjects = (req: Request, res: Response) => {
  res.status(200).json(projects);
};

export const postContact = (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  contactMessages.push({ name, email, message });
  res.status(201).json({ message: "Contact message received successfully." });
};

// Optional: export contact messages for testing (can remove later)
export const getContactMessages = (req: Request, res: Response) => {
  res.status(200).json(contactMessages);
};
