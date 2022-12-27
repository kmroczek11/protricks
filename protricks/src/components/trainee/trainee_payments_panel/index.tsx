import React, {useEffect} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Container } from '@mui/system';
 
const stripePromise = loadStripe('pk_test_51MAsN1IyDnSXVChX2ykvh5aqKLm7rc8Xx9wJc0mnnzRnCKbMtcSFiPIsYaig9l28LcsRvVxk6RcIckC9ZjDLBwmX00Z3rePGkR');
/*function identity<Type>(arg: Type): Type {
  return arg;
}

const appearance = {

  rules: {
    '.Tab': {
      border: '1px solid #E0E6EB',
      boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
    },

    '.Tab:hover': {
      color: 'var(--colorText)',
    },

    '.Tab--selected': {
      borderColor: '#E0E6EB',
      boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
    },

    '.Input--invalid': {
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
    },

    
  }
}; */

function App() {
  return (
      
    <Container sx={{p:15}}>
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
    </Container>
    
  );
}
 
export default App;