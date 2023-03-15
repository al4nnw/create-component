const fs = require("fs");
const path = require("path");

async function createComponent(name) {
	try {
		// Find the current working directory and create a "components" folder inside it
		const cwd = process.cwd();
		const componentsDir = path.join(cwd, "components");
		if (!fs.existsSync(componentsDir)) {
			fs.mkdirSync(componentsDir);
		}

		// Create a new folder for the component inside the "components" folder
		const componentDir = path.join(componentsDir, name);
		if (!fs.existsSync(componentDir)) {
			fs.mkdirSync(componentDir);
		}

		// Create the .tsx file with default component code
		const tsxFileName = `${name}.tsx`;
		const tsxFilePath = path.join(componentDir, tsxFileName);
		if (!fs.existsSync(tsxFilePath)) {
			const tsxFileContent = getDefaultTSXFileContent(name);
			fs.writeFileSync(tsxFilePath, tsxFileContent);
			console.log(`Created ${tsxFilePath}`);
		} else {
			console.log(`${tsxFilePath} already exists`);
		}

		// Create the .module.scss file with empty content
		const scssFileName = `${name}.module.scss`;
		const scssFilePath = path.join(componentDir, scssFileName);
		if (!fs.existsSync(scssFilePath)) {
			fs.writeFileSync(scssFilePath, "");
			console.log(`Created ${scssFilePath}`);
		} else {
			console.log(`${scssFilePath} already exists`);
		}
	} catch (error) {
		console.error(
			`An error occurred while creating component ${name}:`,
			error.message
		);
	}
}

function getDefaultTSXFileContent(name) {
	return `import styles from "./${name}.module.scss";

export interface ${name}Props {}

export function ${name}({}: ${name}Props) {
  return (
    <div className={styles.${name}}>
      <h1>${name}</h1>
    </div>
  );
}`;
}

module.exports = {
	createComponent,
};
