var assert = require('assert');

describe('NOW-App-Setup', () => {
  it('Check App Setup', async () => {
    const source = await driver.getPageSource();
    console.log(`Page source length: ${source.length} characters`);
    await expect(source.length).toBeGreaterThan(100);
  });
});
