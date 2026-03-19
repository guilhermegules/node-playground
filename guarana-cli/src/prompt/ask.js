import readline from 'readline';

export function ask(question, defaultValue = null) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer ? answer.trim() : defaultValue);
    });
  });
}
