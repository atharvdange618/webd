import chalk from "chalk";

export async function start(conf) {
  const config = await conf;
  console.log(chalk.bgCyanBright("Starting the app"));
  console.log(chalk.gray("Received configuration in start -"), config);
}
