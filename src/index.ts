import getMoisture from "./data-collection/moisture"
import sendData from "./data-collection/network"
import getTemperature from "./data-collection/temperature"
import * as dotenv from "dotenv"

dotenv.config()

type ThingSpeakData = {
	temp: any
	moisture: any
}

const dataQueue: ThingSpeakData[] = []

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
		await sendData(data?.temp, data?.moisture)
	}
}, 15000)
