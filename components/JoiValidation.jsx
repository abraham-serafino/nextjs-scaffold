const JoiValidation = ({ label, errorDetails, shouldApplyValidation = true }) =>

  shouldApplyValidation ? (
    <ul className="validationError" style={{
      fontSize: "0.75em",
      color: "red",
      listStyle: "none"
      }}>

      {(errorDetails || []).map((error, i) => (
        error.context.label === label) ?
          (<li key={i}>{error.message}</li>) : null
        )}
    </ul>) : null

export default JoiValidation
