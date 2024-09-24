import getMoisture from "./data-collection/moisture"
import getTemperature from "./data-collection/temperature"

setInterval(getTemperature, 1000)
setInterval(getMoisture, 1000)
