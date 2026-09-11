import { ProblemDocument } from 'http-problem-details';

export class MissingStopSequenceException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/missing-stop-sequence',
    title: 'Stop sequence is required.',
    detail: 'Every stop must have a sequence number defining its order.',
    instance: '/shipments',
    status: 400,
  });
}