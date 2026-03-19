export function parseArgs(args) {
  return {
    projectName: args[0],
    template: args.find((arg) => arg.startsWith('--template='))?.split('=')[1],
  };
}
