import axios from "axios"
import device from "../aws/device"

export enum Data {
	TEMPERATURE,
	MOISTURE,
}

export const FieldMapping = {
	FieldTemperature: "field1",
	FieldMoisture: "field2",
}

// Function to send data to ThingSpeak
export const sendDataToThingspeak = async (temp: any, moisture: any) => {
	var url = `https://api.thingspeak.com/update?api_key=${process.env.THINGS_WRITE_KEY}&${FieldMapping.FieldTemperature}=${temp}&${FieldMapping.FieldMoisture}=${moisture}`

	try {
		const response = await axios.get(url)

		if (response.data === 0) console.log("Failed to update data")
		else console.log("Data successfully update. ", response.data)
	} catch (e) {
		console.log("Error: ", e)
	}
}

// Function to publish sensor data to AWS IoT
export async function publishSensorData(
	temp: number,
	moisture: number,
	rawMoisture: number,
	timestamp: number,
	device_id: string
): Promise<void> {
	return new Promise((resolve, reject) => {
		const topic = "soil/data"
		const payload = JSON.stringify({
			temp,
			moisture,
			rawMoisture,
			timestamp,
			device_id,
		})

		device.publish(topic, payload, undefined, (err: any) => {
			if (err) {
				console.error("Error publishing message:", err)
				reject(err)
			} else {
				console.log("Message published successfully")
				resolve()
			}
		})
	})
}
