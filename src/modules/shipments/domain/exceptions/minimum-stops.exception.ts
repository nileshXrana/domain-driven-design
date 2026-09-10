import { ProblemDocument } from 'http-problem-details';
import { HttpStatus } from '@nestjs/common';
import { ProblemDocumentExtension } from 'http-problem-details';

export class MinimumStopsException extends Error {
  doc = new ProblemDocument({
    type: 'https://example.com/probs/out-of-credit',
    title: 'You do not have enough credit.',
    detail: 'Your current balance is 30, but that costs 50.',
    instance: '/account/12345/msgs/abc',
    status: 400,
  });
}
