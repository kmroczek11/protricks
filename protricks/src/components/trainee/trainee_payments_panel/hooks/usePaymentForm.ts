import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreatePaymentMutation } from "../../../../generated/graphql";
import createAccessClient from "../../../../graphql/clients/accessClient";

const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { isLoading, mutate } = useCreatePaymentMutation<Error>(
    createAccessClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setErrorMessage(err?.data?.response.errors[0].message);
      },
    }
    //   onSuccess: (
    //     data: AutoLogInUserMutation,
    //     _variables: AutoLogInUserMutationVariables,
    //     _context: unknown
    //   ) => onSuccessCallback(data),}
  );

  const handleSubmit = async (event: FormEvent, amountToCharge: number) => {
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    mutate({
      input: {
        paymentMethodId,
        amount: amountToCharge * 100,
      },
    });
  };

  return {
    handleSubmit,
    errorMessage,
  };
};

export default usePaymentForm;
