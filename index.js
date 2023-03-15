#!/usr/bin/env node

const yargs = require("yargs");
const { createComponent } = require("./create-component");

// Define CLI commands and options with Yargs
yargs
	.command(
		"create-component <name>",
		"Create a new component",
		(yargs) => {
			yargs.positional("name", {
				describe: "Name of the component",
				type: "string",
			});
		},
		async (argv) => {
			// Call createComponent function from the imported module
			await createComponent(argv.name);
		}
	)
	.demandCommand(1, "Please provide a valid command")
	.help().argv;
