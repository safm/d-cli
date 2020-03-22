const { program } = require("commander");
const diffTool = require("./actions/diff");
const listFiles = require("./actions/ls");
const order = require("./actions/order");

async function start() {
  program
    .version("0.0.2")
    .command("diff <file1> <file2>")
    .description("Line by line difference between 2 text files")
    .action(diffTool);

  program
    .command("ls [path]")
    .description("List of all the files at a given path")
    .option("-l, --list", "Shows list of files with size and type information")
    .action(listFiles);

  program
    .command("order")
    .description("Order a MacBook Pro 16")
    .action(order);

  await program.parseAsync(process.argv);
}

start();
