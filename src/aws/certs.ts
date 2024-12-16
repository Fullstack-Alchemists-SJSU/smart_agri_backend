import * as fs from "fs"
import * as path from "path"

// Update these paths before running the application:
export const certPath = path.join(
	__dirname,
	"../../certs/5e01e7f9e1747c9bcfa58928f55b22c26ada409b3b048a2ea6f62a2b32570204-certificate.pem.crt"
)
export const keyPath = path.join(
	__dirname,
	"../../certs/5e01e7f9e1747c9bcfa58928f55b22c26ada409b3b048a2ea6f62a2b32570204-private.pem.key"
)
export const caPath = path.join(__dirname, "../certs/AmazonRootCA1.pem")

// Check if all certificate files exist
if (
	!fs.existsSync(certPath) ||
	!fs.existsSync(keyPath) ||
	!fs.existsSync(caPath)
) {
	console.error(
		"One or more certificate files are missing. Please check the file paths."
	)
} else {
	console.log("All certificate files are set up correctly.")
}
