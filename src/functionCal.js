import { ACTIONS } from "./App";
import { useReducer } from 'react';
  //fonction Dispatch indique au reducer que vous souhaitez effectuer une action de type "ADD_DIGIT" 
  //et que vous lui fournissez la valeur du chiffre que vous souhaitez ajouter 
 const handleDigitClick = (digit) => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };
  export default handleDigitClick;