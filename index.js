#!/usr/bin/env node

const yargs = require("yargs");
const { createComponent } = require("./create-component");

console.log("Initiating");

yargs
	.command(
		"create-component <name> <path>",
		"Create a new component",
		(yargs) => {
			yargs
				.positional("name", {
					describe: "Name of the component",
					type: "string",
				})
				.positional("path", {
					describe: "Folder path for the component",
					type: "string",
				});
		},
		(argv) =>
			createComponent(argv.name, argv.path)
				.then(() => console.log("Component created successfully"))
				.catch((err) => console.error(err))
	)
	.demandCommand(1, "Please provide a valid command")
	.parse();
