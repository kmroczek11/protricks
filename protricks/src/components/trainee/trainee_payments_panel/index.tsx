import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';
import * as Stripe from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
export type StripeTypes = {
  clientSecret: '{{CLIENT_SECRET}}';
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: string
    }
  }
};

const options: StripeTypes = {
  clientSecret: '{{CLIENT_SECRET}}',
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#008b8b'
    }
  },
};



const TraineePaymentsPanel: React.FC = () => {

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements >
  );
}

export default TraineePaymentsPanel