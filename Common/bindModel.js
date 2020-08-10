import get from "lodash.get"
import set from "lodash.set"

const bindModel = (state, setState) => ({
  model(path) {
    const value = get(state, path, "")

    return {
      value,

      checked: value || false,

      onChange(event) {
        const originalValue = value
        const target = event.target

        const newValue = target.type === 'checkbox' ?
          target.checked :
          target.value

        const newState = {}
        set(newState, path, newValue)

        setState({
          ...state,
          ...newState
          })
      }
    };
  },

  arrayItem(pathToArray, index, arrayElementSubPath) {
    const stateArray = get(state, pathToArray, null) || []
    const value = arrayElementSubPath ?
                    get(stateArray[index], arrayElementSubPath, "") :
                      stateArray[index]

    return {
      value: value || "",

      checked: value || false,

      onChange(event) {
        const originalValue = value
        const target = event.target

        const newValue = target.type === "checkbox" ?
          target.checked :
          target.value

        if (arrayElementSubPath) {
          set(stateArray[index], arrayElementSubPath, newValue)
        } else {
          stateArray[index] = newValue
        }

        const newState = {};
        set(newState, pathToArray, stateArray);

        setState({
          ...state,
          newState
          });
      }
    }
  },

  state,

  setState
})


export default bindModel
