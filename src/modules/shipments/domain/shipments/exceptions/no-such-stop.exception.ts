import { ProblemDocument } from 'http-problem-details';

export class NoSuchStopException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/no-such-stop',
    title: 'Stop not found.',
    detail: 'The requested stop does not exist.',
    instance: '/stops',
    status: 404,
  });
}
