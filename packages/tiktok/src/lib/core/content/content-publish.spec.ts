import { ContentPublishTicTok } from './content-publish';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

const contentPublishTicTok = new ContentPublishTicTok('');
describe('ContentPublishTicTok', () => {
  it('should work', () => {
    expect(contentPublishTicTok.queryCreatorInfo()).toBeDefined();
  });
});
