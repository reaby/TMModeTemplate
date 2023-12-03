const GbxClient = require("@evotm/gbxclient").GbxClient;
const fs = require("fs");
const config = require("./config.js");
const scriptName = config.scriptName;
const gbx = new GbxClient();

async function reloadMode() {
	const mapFolder = await gbx.call("GetMapsDirectory");
	let folder = mapFolder.replace(/\\/g, "/").split("/");
	folder = folder.splice(0, folder.length - 2).join("/");

	const file = folder + "/Scripts/Modes/" + scriptName;
	console.log(file);
	if (fs.existsSync(file)) {
		const data = fs.readFileSync(file);
		try {
			await gbx.call("SetModeScriptText", data.toString());
			const message = "Re-deployed file: "+ file;
			console.log(message);
			await gbx.call("ChatSendServerMessage", "Script reload!")
		} catch (e) {
			console.error(e.faultString);
			await gbx.call("ChatSendServerMessage", e.faultString);
		}
	}
	else {
		console.error("File not found");
	}
}

async function main() {
	try {
		await gbx.connect("127.0.0.1", config.port);
		await gbx.call("SetApiVersion", "2023-04-24");
		await gbx.call("Authenticate", "SuperAdmin", config.password);
	} catch (e) {
		console.log(e);
		console.log("Authenticate to server failed.");
		process.exit(0);
	}

	await gbx.call("EnableCallbacks", true);
	await gbx.callScript("XmlRpc.EnableCallbacks", "true");
	await gbx.call("SendDisplayManialinkPage", fs.readFileSync("./manialink.xml").toString(), 0, false);
	gbx.on("ManiaPlanet.PlayerChat", async (response) => {
		const id = response[0];
		const login = response[1];
		const text = response[2];
		if (id == 0) return;

		if (text.startsWith("/add")) {
			await gbx.call("ConnectFakePlayer");
		}

		if (text.startsWith("/remove")) {
			await gbx.call("DisconnectFakePlayer", "*");
		}

		if (text.startsWith("/reload")) {
			reloadMode();
		}
	});

	gbx.on("ManiaPlanet.PlayerManialinkPageAnswer", (response) => {
		const PlayerUid = response[0];
		const login = response[1];
		const answer = response[2];
		if (answer=="minicontrol.reload"){
			reloadMode();
		}
	});

	// to get all callbacks the server sends
	gbx.on("callback", async (method, response) => {
		// console.log(method, response);
	});

}

main();