import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';


const app = express()

app.use(express.json())

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a08a189ff4fde",
    pass: "ec056c935ac4bc",
  },
});

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body
    
    const feedback = await prisma.feedback.create({ 
        data: {
            type,
            comment,
            screenshot
        }
    })

    await transport.sendMail({
      from: "Equipe Dev <quipedev@dev.com.br>",
      to: "Gislaine Costa <devgislainecosta@gmail.com>",
      subject: "Novo feedback",
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do Feedback: ${type} </p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });


    return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
    console.log('HTTP server running!')
})