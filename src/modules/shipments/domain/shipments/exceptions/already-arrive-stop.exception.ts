import { ProblemDocument } from 'http-problem-details';

export class AlreadyArriveStopException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/already-arrive-stop',
    title: 'Stop already arrived.',
    detail: 'The requested stop has already been arrived.',
    instance: '/shipments',
    status: 400,
  });
}
