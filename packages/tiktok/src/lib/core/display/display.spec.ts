import { DisplayTicTok } from './display';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

const displayTicTok = new DisplayTicTok('bearer_access_token');

describe('DisplayTicTok', () => {
  it('should work', () => {
    expect(displayTicTok.userInfo()).toBeDefined();
    expect(displayTicTok.listVideo({})).toBeDefined();
    expect(
      displayTicTok.queryVideo({ filters: { video_ids: [] } })
    ).toBeDefined();
  });
});
