import { MailAdapter } from './../adapters/mail-adapter';
import { FeedBacksRepository } from './../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedBacksRepository: FeedBacksRepository,
        private mailAdapter: MailAdapter,
    ) {}
    
    async execute (request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        await this.feedBacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
          subject: "Novo Feedback",
          body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do Feedback: ${type} </p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
          ].join("\n"),
        });
    }
}
