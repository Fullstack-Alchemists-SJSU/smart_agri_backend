import axios from "axios"

export enum Data{
	TEMPERATURE,
	MOISTURE
}

export const FieldMapping = {
	FieldTemperature: "field1",
	FieldMoisture: "field2"
}
const sendData = async (temp: any, moisture: any) => {

	var url = `https://api.thingspeak.com/update?api_key=${process.env.THINGS_WRITE_KEY}&${FieldMapping.FieldTemperature}=${temp}&${FieldMapping.FieldMoisture}=${moisture}`

	try{

		const response = await axios.get(url)

		if (response.data === 0) console.log("Failed to update data")
		else console.log("Data successfully update. ", response.data)
	}catch(e){
		console.log("Error: ", e)
	}

}

export default sendData