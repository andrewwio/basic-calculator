/* eslint-disable default-case */
import { useReducer } from 'react'
import DigitButton from './DigitButton'
import ZeroButton from './ZeroButton'
import OperationButton from './OperationButton'
import GreyOperationButton from './GreyOperationButton'
import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      
      if (payload.digit === "0" && state.currentValue === "0") {
        return state
      }
      if (payload.digit === "." && state.currentValue.includes(".")) {
        return state
      }

        return {
          ...state,
          currentValue: `${state.currentValue || ""}${payload.digit}`
      }
      
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentValue == null && state.previousValue == null) {
          return state
        }
        if (state.previousValue == null) {
          return {
            ...state,
            operation: payload.operation,
            previousValue: state.currentValue,
            currentValue: null
          }
        }
        return {
          ...state,
          previousValue: evaluate(state),
          operation: payload.operation,
          currentValue: null
        }
      case ACTIONS.CLEAR:
        return {}
  }
}

function evaluate({ currentValue, previousValue, operation }) {
  const prev = parseFloat(previousValue)
  const current = parseFloat(currentValue)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "−":
      computation = prev - current
      break
    case "×":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }
  return computation.toString()
}

function App() {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(reducer, {})
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-value">
          {previousValue} {operation}
        </div>
        <div className="current-value">
          {currentValue}
        </div>
      </div>
      <button className="grey" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <GreyOperationButton operation="+/-" dispatch={dispatch} />
      <GreyOperationButton operation="%" dispatch={dispatch} />
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="−" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <ZeroButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button className="orange">=</button>
    </div>
  );
}

export default App;
