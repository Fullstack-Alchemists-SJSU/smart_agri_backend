import * as w1temp from "w1temp"

export const TEMP_DATA_GPIO_PIN = 4

const getTemperature = () => {
	w1temp
		.getSensor("28-00000087dd5d")
		.then((sensor: any) => {
			const temp = sensor.getTemperature()
			console.log(`Temperature: ${temp.toFixed(2)}°C`)
		})
		.catch((err) => {
			console.log("Error: ", err)
		})
}

export default getTemperature
