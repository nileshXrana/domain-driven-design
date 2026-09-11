import { ProblemDocument } from 'http-problem-details';

export class ArriveStopException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/arrive-stop',
    title: 'Cannot arrive at stop.',
    detail:
      'The requested stop cannot be arrived at before the previous stop is departed.',
    instance: '/shipments',
    status: 400,
  });
}
