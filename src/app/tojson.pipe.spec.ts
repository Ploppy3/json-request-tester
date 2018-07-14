import { TojsonPipe } from './tojson.pipe';

describe('TojsonPipe', () => {
  it('create an instance', () => {
    const pipe = new TojsonPipe();
    expect(pipe).toBeTruthy();
  });
});
