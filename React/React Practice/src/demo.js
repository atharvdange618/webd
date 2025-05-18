import chalk from 'chalk';
const log = console.log;

log(chalk.blue('Hello') + ' World' + chalk.red('!'));

log(chalk.blue.bgRed.bold('Hello world!'));

log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
    `);

log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));