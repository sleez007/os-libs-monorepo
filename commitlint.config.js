const conventionalRegex =
  /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)(\([\w-]+\))?: .+/;

module.exports = {
  plugins: [
    {
      rules: {
        'custom-ticket-number': ({ raw }) => {
          if (!conventionalRegex.test(raw)) {
            return [
              false,
              'Commit message must start with one of the following:\n' +
                '- A conventional commit (e.g., fix(lib-name): fixed bug)' +
                '- A conventional commit (e.g., docs(lib-name): fixed bug)',
            ];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-ticket-number': [2, 'always'],
  },
};
