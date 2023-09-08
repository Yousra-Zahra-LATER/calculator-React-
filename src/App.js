import './App.css';
import './styles.css'
import { useReducer } from 'react';


function App() {
  //Hooks useReducer pour modifier mon état, comment, en definissant mes cas d'actions sur app avec switch( ajout, supp, mod)...
//ACTIONS est un objet 
//on doit définir tout d'abord les différents types d'actions
//qui sont utilisés pour identifier les différentes opérations que votre calculatrice peut effectuer.
//ces actions sont sous forme de clés (chaînes de caractères)
//'add-digit' est le type de l'action ADD_DIGIT
const ACTIONS={
      //ajotuer un chiffre
      ADD_DIGIT:'add-digit',
      //choisir op
      CHOOSE_OPERATION: 'choose-operation',
      //0
      CLEAR:'clear',
        //supp un chiffre
      DELETE_DIGIT:'delete_digit',
      //result
      EVALUATE: 'evaluate'
}

// la fonction de reducer définit deux arg state (l'état actuel) et action (l'action dispatchée==lancé)
//action={type,payload}
const reducer=(state,action)=>{
  
 switch(action.type){

    case ACTIONS.ADD_DIGIT:
      //lorsque j'evalue et je veux inserer un nouveau chiffre sans passer par AC, je clique directement sur a new digit
      if(state.overwite){
        return{
          ...state,
          overwite:false,
          currentOperand:action.payload.digit
        }
      }
      //condition de vérification pour ne pas afficher plusieurs 0 au debut si user saisi un 0 alors que l'état de current est '' (vide) par défaut donc il retourne le state tel qu'il est.
      if(state.currentOperand==='0' && action.payload.digit==='0' ){
      return state;}
      // Vérification pour éviter d'ajouter plusieurs points ('.') dans currentOperand, retourne l'état tel qu'il est.
      if(state.currentOperand.includes('.') && action.payload.digit==='.') {
        return state}
         
      // Si les conditions ci-dessus ne sont pas remplies, ajoute le chiffre spécifié par l'utilisateur à currentOperand.
      return {
      ...state,
      currentOperand: state.currentOperand + action.payload.digit  
    };
    
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand=== '' && state.previousOperand=== '')
       {return state}
       //quand je change d'operation sur place
      if(state.currentOperand=== ''){
        return {
          //la creation d'une copie de l'etat initial (avec ses 3 prop) et pour ne pas le modifier
          //si je supp la copie je ne recoit pas state.previousOperand, seulement loperation
          ...state,
          operation:action.payload.op
        };
      }
      //quand je met la prmiere fois loperation
      if(state.previousOperand=== ''){
      return {
        ...state,
        operation:action.payload.op,
        previousOperand:state.currentOperand,
        currentOperand:''
      };
    }
    //quand prevO et currO existe et on veut ajouter un 3 eme chiffre
    return {
      ...state,
      previousOperand:eval(state.previousOperand+state.operation+state.currentOperand).toString(),
      operation:action.payload.op,
      currentOperand:''
    }
      case ACTIONS.CLEAR:
    return {
      currentOperand: '',
      previousOperand: '',
      operation: '',
      overwite:false

    };
    case ACTIONS.DELETE_DIGIT:
 
    return {
      ...state,
      // Utilise la méthode slice() pour obtenir tous les caractères sauf le dernier.
        currentOperand: state.currentOperand.slice(0, -1)
    };

    case ACTIONS.EVALUATE:
      if(state.operation=== ''||  state.previousOperand===''|| state.currentOperand===''){
        return state
      }
    return {
      ...state,
     currentOperand:eval(state.previousOperand+state.operation+state.currentOperand).toString(),
     previousOperand:'',
     operation:'',
     overwite:true
     
    };
    default:
      return state;
  }
}


   //const [state, dispatch] = useReducer(reducer, {'cc'});
   // Initialize the state using useReducer
   //notre state ici sont { currentOperand,  previousOperand, operation}
   //la fonction dispatch pour envoyer les actions au reducer, qui est la fonction implimentée en haut donc pour la maj de l'état

const [state,dispatch]=useReducer(reducer,
  { currentOperand : '',
    previousOperand: '',
    operation :'',
    overwite:false }
  );

  //fonction Dispatch indique au reducer que vous souhaitez effectuer une action de type "ADD_DIGIT" 
  //et que vous lui fournissez la valeur du chiffre que vous souhaitez ajouter 
  const handleDigitClick = (digit) => {
    return dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit} });
  };

  const handleoOperationClick = (op) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {op} });
  };

  const handleDeleteClick = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };
  const handleAC = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };
 
  const handleEqual = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };
 

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{state.previousOperand} {state.operation}</div>
          <div className='current-operand'>  {state.currentOperand} </div>
      </div>
      <button className='span-two'onClick={() => handleAC()}>AC</button>
      <button onClick={() => handleDeleteClick ()}>DEL</button>
      <button onClick={() => handleoOperationClick ('/')}>÷</button>
      <button onClick={() => handleDigitClick ('1')}>1</button>
      <button onClick={() => handleDigitClick ('2')}>2</button>
      <button onClick={() => handleDigitClick ('3')}>3</button>
      <button onClick={() => handleoOperationClick ('*')}>*</button>
      <button onClick={() => handleDigitClick ('4')}>4</button>
      <button onClick={() => handleDigitClick ('5')}>5</button>
      <button onClick={() => handleDigitClick ('6')}>6</button>
      <button onClick={() => handleoOperationClick ('+')}>+</button>
      <button onClick={() => handleDigitClick ('7')}>7</button>
      <button onClick={() => handleDigitClick ('8')}>8</button>
      <button onClick={() => handleDigitClick ('9')}>9</button>
      <button onClick={() => handleoOperationClick ('-')}>-</button>
      <button onClick={() => handleDigitClick ('.')}>.</button>
      <button onClick={() => handleDigitClick ('0')}>0</button>
      <button className='span-two' onClick={() => handleEqual ()}>=</button>
    </div>
  );
}

export default App;
