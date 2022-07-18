import { ACTIONS } from './App'

export default function DigitButton({ dispatch, digit }) {
  return (
    <button 
      className="dark-grey span-two"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  )
}