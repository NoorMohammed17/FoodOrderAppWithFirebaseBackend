import { useRef ,useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() ==="";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {

    const [enteredFormIsValid, setEnteredFormIsValid] = useState({
        name:true,
        street:true,
        postalCode:true,
        city:true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

     const enteredNameIsValid = !isEmpty(enteredName)
     const enteredStreetIsValid = !isEmpty(enteredStreet)
     const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
     const enteredCityIsValid = !isEmpty(enteredCity)

    

     const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

     if(!formIsValid){
        return;
     }
     setEnteredFormIsValid({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postalCode:enteredPostalCodeIsValid,
        city:enteredCityIsValid,
     })
     


  };

  const nameControlClasses = `${classes.control} ${ enteredFormIsValid.name ? "" : classes.invalid}`;

  const streetControlClasses = `${classes.control} ${ enteredFormIsValid.street ? "" : classes.invalid}`;

  const cityControlClasses = `${classes.control} ${ enteredFormIsValid.city ? "" : classes.invalid}`;

  const postalCodeControlClasses = `${classes.control} ${ enteredFormIsValid.postalCode ? "" : classes.invalid}`;



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'  ref={nameInputRef}/>
        {!enteredFormIsValid.name && <p>Name field should not be empty !</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!enteredFormIsValid.street && <p>Street field should not be empty !</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!enteredFormIsValid.postalCode && <p>Please entered valid postal code( 5 characters long !)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!enteredFormIsValid.city && <p>City field should not be empty !</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;