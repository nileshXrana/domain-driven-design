import { ProblemDocument } from 'http-problem-details';

export class StopTypeMismatchException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/stop-type-mismatch',
    title: 'Stop type mismatch.',
    detail: 'The requested stop is not of the expected type.',
    instance: '/stops',
    status: 400,
  });
}
