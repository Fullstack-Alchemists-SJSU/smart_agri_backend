import device, { RASPI_DEVICE_ID } from "./aws/device"
import getMoisture from "./data-collection/moisture"
import {
	publishSensorData,
	sendDataToThingspeak,
} from "./data-collection/network"
import getTemperature from "./data-collection/temperature"
import * as dotenv from "dotenv"

dotenv.config()

type ThingSpeakData = {
	temp: any
	moisture: any
}

const DRY_VALUE = 1000
const WET_VALUE = 200

/**
 * For AWS
 */

const SENSOR_READ_INTERVAL = 1000 // Read and publish every 60 seconds

device.on("connect", () => {
	console.log("Connected to AWS IoT")
	startSensorMonitoring(SENSOR_READ_INTERVAL)
})

device.on("error", (error) => {
	console.error("AWS IoT Error:", error)
})

async function readAndPublishSensorData() {
	try {
		const temp = await getTemperature()
		const rawMoisture = await getMoisture()

		var moisturePer = 0

		if (rawMoisture > DRY_VALUE) moisturePer = 0
		else if (rawMoisture < WET_VALUE) moisturePer = 100
		else
			moisturePer =
				(100 * (DRY_VALUE - rawMoisture)) / (DRY_VALUE - WET_VALUE)

		console.log("temp: ", temp, " moisture: ", rawMoisture)

		await publishSensorData(temp, rawMoisture, moisturePer, Date.now(), RASPI_DEVICE_ID)
		console.log("Sensor data published successfully")
	} catch (error) {
		console.error("Error reading or publishing sensor data:", error)
	}
}

// Function to periodically read and publish sensor data
export function startSensorMonitoring(intervalMs: number) {
	setInterval(readAndPublishSensorData, intervalMs)
}

/**
 * For Thingspeak
 */

/*const dataQueue: ThingSpeakData[] = []

setInterval(async () => {
	try {
		const temp = await getTemperature()
		const moisture = await getMoisture()

		dataQueue.push({temp, moisture})

		console.log(`Added {${temp}, ${moisture}} to queue`)
	} catch (error) {
		console.error("Error reading sensor data:", error)
	}
}, 1000)

setInterval(async () => {
	if (dataQueue.length > 0) {
		const data = dataQueue.shift()
		await sendDataToThingspeak(data?.temp, data?.moisture)
	}
}, 15000)*/
