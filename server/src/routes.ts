import express from 'express';
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedBackRepository } from './repositories/prisma/prisma-feedbacks-repository'


export const routes = express.Router()

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a08a189ff4fde",
    pass: "ec056c935ac4bc",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBackRepository = new PrismaFeedBackRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedBackRepository
  );
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })


  // await transport.sendMail({
  //   from: "Equipe Dev <quipedev@dev.com.br>",
  //   to: "Gislaine Costa <devgislainecosta@gmail.com>",
  //   subject: "Novo feedback",
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p>Tipo do Feedback: ${type} </p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join("\n"),
  // });

  return res.status(201).send();
});
