import bindModel from "components/bindModel"
import { Fragment, useState } from "react"
import { Validation, required } from "components/Validation"

const Home = () => {
  const handleChange = (_, newValue) => console.log(`state.sex: ${newValue}`)

  const { model, state, setState } = bindModel(useState({
        sex: "M",
        applyValidation: false
        }), handleChange)

  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, applyValidation: true })
  }

  return (
    <form onSubmit={handleSubmit}>
      <select {...model("sex")} >
        <option value="">-Select-</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <p />

      <input type="text" {...model("sex")} />

      <Validation
          rules={[required]}
          {...model("sex")}
          apply={state.applyValidation}
          />
    </form>
    )
}

export default Home
