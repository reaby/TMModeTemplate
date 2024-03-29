const GbxClient = require("@evotm/gbxclient").GbxClient;
const fs = require("fs");
const config = require("./config.js");
const scriptName = config.scriptName;
let gbx = new GbxClient();

async function main() {
	try {
		await gbx.connect("127.0.0.1", config.port);
		await gbx.call("Authenticate", "SuperAdmin", config.password);
	} catch (e) {
		console.log(e);
		console.log("Authenticate to server failed.");
		process.exit(0);
	}
	await gbx.call("SetApiVersion", "2023-04-24");
	const mapFolder = await gbx.call("GetMapsDirectory");
	let folder = mapFolder.replace(/\\/g, "/").split("/");
	folder = folder.splice(0, folder.length - 2).join("/");
	const file = folder + "/Scripts/Modes/" + scriptName;
	const message = "Re-deployed file: " + scriptName;
	console.log(message);
	const date = new Date();
	await gbx.call("ChatSendServerMessage", `[${date.toLocaleTimeString()}] Script reload`);
	if (fs.existsSync(file)) {
		const data = fs.readFileSync(file);
		try {
			await gbx.call("SetModeScriptText", data.toString());
		} catch (e) {
			console.error(e.faultString);
		}
	}
	else {
		console.error("File not found");
	}

	await gbx.disconnect();
	process.exit(0);
}

main();