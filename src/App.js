// ISSUES: 
// 1. Start with 0
// 2. Make +/- & % functional
// 3. Default to 0
// 4. Change operation when two operations are clicked back to back
// 5. Display previousValue in main output div
// 6. If you click "." first, then the app crashes

/* eslint-disable default-case */
import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import ZeroButton from './ZeroButton'
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
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false
        }
      }  

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
        return {
          currentValue: null
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentValue == null ||
          state.previousValue == null
        ) {
        return state
        }
        return {
          ...state,
          overwrite: true,
          previousValue: null,
          operation: null,
          currentValue: evaluate(state)
        }
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
    // case "+/-":
    //   computation = prev * -1
    //   break
    // case "%":
    //   computation = prev * current / 100
    //   break
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(value) {
  if (value == null) return
  const [integer, decimal] = value.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
} 

function App() {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(reducer, {})
  // console.log(previousValue, currentValue)
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-value">
          {formatOperand(previousValue)} {operation}
        </div>
        <div className="current-value">
          {formatOperand(currentValue)} {formatOperand(previousValue)}
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
      <button className="orange" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;

// /* eslint-disable default-case */
// import { useReducer } from 'react'
// import DigitButton from './DigitButton'
// import ZeroButton from './ZeroButton'
// import OperationButton from './OperationButton'
// import GreyOperationButton from './GreyOperationButton'
// import './styles.css'

// export const ACTIONS = {
//   ADD_DIGIT: 'add-digit',
//   CHOOSE_OPERATION: 'choose-operation',
//   CLEAR: 'clear',
//   EVALUATE: 'evaluate'
// }

// function reducer(state, { type, payload }) {
//   switch (type) {
//     case ACTIONS.ADD_DIGIT:
//       if (state.overwrite) {
//         return {
//           ...state,
//           currentValue: payload.digit,
//           overwrite: false
//         }
//       }  

//       if (payload.digit === "0" && state.currentValue === "0") {
//         return state
//       }
//       if (payload.digit === "." && state.currentValue.includes(".")) {
//         return state
//       }

//         return {
//           ...state,
//           currentValue: `${state.currentValue || ""}${payload.digit}`
//       }
      
//       case ACTIONS.CHOOSE_OPERATION:
//         if (state.currentValue == null && state.previousValue == null) {
//           return state
//         }
//         if (state.previousValue == null) {
//           return {
//             ...state,
//             operation: payload.operation,
//             previousValue: state.currentValue,
//             currentValue: null
//           }
//         }
//         return {
//           ...state,
//           previousValue: evaluate(state),
//           operation: payload.operation,
//           currentValue: null
//         }
//       case ACTIONS.CLEAR:
//         return {}
//       case ACTIONS.EVALUATE:
//         if (
//           state.operation == null ||
//           state.currentValue == null ||
//           state.previousValue == null
//         ) {
//         return state
//         }
//         return {
//           ...state,
//           overwrite: true,
//           previousValue: null,
//           operation: null,
//           currentValue: evaluate(state)
//         }
//   }
// }

// function evaluate({ currentValue, previousValue, operation }) {
//   const prev = parseFloat(previousValue)
//   const current = parseFloat(currentValue)
//   if (isNaN(prev) || isNaN(current)) return ""
//   let computation = ""
//   switch (operation) {
//     case "+":
//       computation = prev + current
//       break
//     case "−":
//       computation = prev - current
//       break
//     case "×":
//       computation = prev * current
//       break
//     case "÷":
//       computation = prev / current
//       break
//     case "+/-":
//       computation = prev * -1
//       break
//     case "%":
//       computation = prev / 100
//       break
//   }
//   return computation.toString()
// }

// const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// })
// function formatOperand(value) {
//   if (value == null) return
//   const [integer, decimal] = value.split(".")
//   if (decimal == null) return INTEGER_FORMATTER.format(integer)
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
// }

// function App() {
//   const [{ currentValue, previousValue, operation }, dispatch] = useReducer(reducer, {})
  
//   return (
//     <div className="calculator-grid">
//       <div className="output">
//         <div className="previous-value">
//           {previousValue} {operation}
//         </div>
//         <div className="current-value">
//           {currentValue}
//         </div>
//       </div>
//       <button className="grey" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
//       <GreyOperationButton operation="+/-" dispatch={dispatch} />
//       <GreyOperationButton operation="%" dispatch={dispatch} />
//       <OperationButton operation="÷" dispatch={dispatch} />
//       <DigitButton digit="7" dispatch={dispatch} />
//       <DigitButton digit="8" dispatch={dispatch} />
//       <DigitButton digit="9" dispatch={dispatch} />
//       <OperationButton operation="×" dispatch={dispatch} />
//       <DigitButton digit="4" dispatch={dispatch} />
//       <DigitButton digit="5" dispatch={dispatch} />
//       <DigitButton digit="6" dispatch={dispatch} />
//       <OperationButton operation="−" dispatch={dispatch} />
//       <DigitButton digit="1" dispatch={dispatch} />
//       <DigitButton digit="2" dispatch={dispatch} />
//       <DigitButton digit="3" dispatch={dispatch} />
//       <OperationButton operation="+" dispatch={dispatch} />
//       <ZeroButton digit="0" dispatch={dispatch} />
//       <DigitButton digit="." dispatch={dispatch} />
//       <button className="orange" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
//     </div>
//   );
// }

// export default App;
