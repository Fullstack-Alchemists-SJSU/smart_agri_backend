import * as aws from "aws-iot-device-sdk"
import {certPath, keyPath, caPath} from "./certs"
import * as dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

console.log("access: ", process.env.ACCESS_KEY_ID, process.env.SECRET_KEY)

export const RASPI_DEVICE_ID = "raspi_5"

// Configure the AWS IoT device
const device = new aws.device({
	host: "a1vub54w3k1uoy-ats.iot.us-west-2.amazonaws.com",
	certPath,
	keyPath,
	caPath,
	clientId: RASPI_DEVICE_ID,
	protocol: "wss", // WebSocket secure connection
	region: "us-west-2", // Specify your AWS region,
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretKey: process.env.SECRET_KEY,
})

// Event handler for successful connection
device.on("connect", () => {
	console.log("Connected to AWS IoT")
})

// Event handler for connection errors
device.on("error", (error) => {
	console.error("Error:", error)
})

export default device
