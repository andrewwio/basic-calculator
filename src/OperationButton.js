import { ACTIONS } from './App'

export default function DigitButton({ dispatch, operation }) {
  return (
    <button 
      className="orange"
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>
      {operation}
    </button>
  )
}