import { PaymentElement } from '@stripe/react-stripe-js';
import { Form } from 'formik';
import { ColorButton } from '../../../lib';


const CheckoutForm = () => {
  const { handleSubmit, errorMessage } = usePaymentForm();
  const { user } = useAuth();

  const {
    data,
    isLoading: getMonthlyCostLoading,
    error,
    refetch,
  } = useGetMonthlyCostQuery<GetMonthlyCostQuery, Error>(
    accessClient(),
    {
      getMonthlyCostInput: {
        userId: user?.id!,
      },
    },
    { refetchInterval: 1000 }
  );

  return (
    <Form>
      <PaymentElement />
      <ColorButton>Submit</ColorButton>
    </Form>
  );
};

export default CheckoutForm;
