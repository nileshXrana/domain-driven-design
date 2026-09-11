import { ProblemDocument } from 'http-problem-details';

export class NotArriveStopException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/not-arrive-stop',
    title: 'Stop not arrived yet.',
    detail: 'The requested stop has not been arrived yet.',
    instance: '/shipments',
    status: 400,
  });
}
