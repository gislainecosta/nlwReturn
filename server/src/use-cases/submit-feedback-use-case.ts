import { FeedBacksRepository } from './../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedBacksRepository: FeedBacksRepository,
    ) {}
    
    async execute (request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        await this.feedBacksRepository.create({
            type,
            comment,
            screenshot
        })
    }
}
