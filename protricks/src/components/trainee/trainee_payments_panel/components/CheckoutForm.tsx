import {PaymentElement} from '@stripe/react-stripe-js';
import { Form } from 'formik';
import { ColorButton } from '../../../lib';

const CheckoutForm = () => {
  return (
    <Form>
      <PaymentElement />
      <ColorButton>Submit</ColorButton>
    </Form>
  );
};

export default CheckoutForm;