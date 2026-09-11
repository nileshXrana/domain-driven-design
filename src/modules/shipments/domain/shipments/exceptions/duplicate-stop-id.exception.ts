import { ProblemDocument } from 'http-problem-details';

export class DuplicateStopIdException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/duplicate-stop-id',
    title: 'Stop IDs must be unique.',
    detail: 'Every stop in a shipment must have a unique stop ID.',
    instance: '/shipments',
    status: 400,
  });
}
