const GbxClient = require("@evotm/gbxclient").GbxClient;
const fs = require("fs");
const config = require("./config.js");
const scriptName = config.scriptName;

async function main() {
    let gbx = new GbxClient();
    try {
				await gbx.connect("127.0.0.1", config.port);
    		await gbx.call("SetApiVersion", "2022-03-21");
        await gbx.call("Authenticate", "SuperAdmin", config.password);
    } catch (e) {
        console.log(e);
        console.log("Authenticate to server failed.");
        process.exit(0);
    }

		await gbx.call("EnableCallbacks", true);
    await gbx.callScript("XmlRpc.EnableCallbacks", "true");

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
            const mapFolder = await gbx.call("GetMapsDirectory");
            let folder = mapFolder.replace(/\\/g, "/").split("/");
            folder = folder.splice(0, folder.length - 2).join("/");

            const file = folder + "/Scripts/Modes/" + scriptName;
            console.log(file);
            if (fs.existsSync(file)) {
                const data = fs.readFileSync(file);
                try {
                    const success = await gbx.call("SetModeScriptText", data.toString());
                    console.log(success);
                } catch (e) {
                    console.error(e.faultString);
                }
            }
            else {
                console.error("File not found");
            }
        }
    });

    // to get all callbacks the server sends
    gbx.on("callback", async (method, response) => {
       // console.log(method, response);
    });

}

main();