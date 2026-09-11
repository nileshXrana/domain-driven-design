import { ProblemDocument } from 'http-problem-details';

export class NoSuchShipmentException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/no-such-shipment',
    title: 'Shipment not found.',
    detail: 'The requested shipment does not exist.',
    instance: '/shipments',
    status: 404,
  });
}
