import { ProblemDocument } from 'http-problem-details';

export class MinimumStopsException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/minimum-stops',
    title: 'There should be at least 1 stop.',
    detail: 'A shipment must have at least 1 stop.',
    instance: '/shipments',
    status: 400,
  });
}