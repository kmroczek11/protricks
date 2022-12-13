import React, {useEffect} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Container } from '@mui/system';
 
const stripePromise = loadStripe('pk_test_51MAsN1IyDnSXVChX2ykvh5aqKLm7rc8Xx9wJc0mnnzRnCKbMtcSFiPIsYaig9l28LcsRvVxk6RcIckC9ZjDLBwmX00Z3rePGkR');
 
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