import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const Add = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.8 488.8" {...props} width={props.width} height={props.height}>
    <G fill="#fff">
      <Path d="M488.8 383V9.9c0-5.5-4.4-9.9-9.9-9.9H105.8c-5.5 0-9.9 4.4-9.9 9.9V383c0 5.5 4.4 9.9 9.9 9.9h373.1c5.5 0 9.9-4.4 9.9-9.9zm-19.8-9.9H115.7V19.8H469v353.3z" />
      <Path d="M9.9 488.8H383c5.5 0 9.9-4.4 9.9-9.9s-4.4-9.9-9.9-9.9H19.8V105.8c0-5.5-4.4-9.9-9.9-9.9S0 100.3 0 105.8v373.1c0 5.5 4.4 9.9 9.9 9.9zm201.9-282.5h70.7V277c0 5.5 4.4 9.9 9.9 9.9s9.9-4.4 9.9-9.9v-70.7H373c5.5 0 9.9-4.4 9.9-9.9s-4.4-9.9-9.9-9.9h-70.7v-70.7c0-5.5-4.4-9.9-9.9-9.9s-9.9 4.4-9.9 9.9v70.7h-70.7c-5.5 0-9.9 4.4-9.9 9.9s4.4 9.9 9.9 9.9z" />
    </G>
  </Svg>
)

export default Add