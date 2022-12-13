import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm';
import { ColorButton } from '../../lib';
 
const PaymentForm = () => {
  const { handleSubmit } = usePaymentForm();
 
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <ColorButton>Zapłać</ColorButton>
    </form>
  );
};
 
export default PaymentForm;