import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import {
  CreateChargeMutation,
  CreateChargeMutationVariables,
  useCreateChargeMutation,
} from "../../../generated/graphql";
import accessClient from "../../../graphql/clients/accessClient";

function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { isLoading: creatingTraineeLoading, mutate } =
    useCreateChargeMutation<Error>(accessClient(), {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        // setRegistrationStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: CreateChargeMutation,
        _variables: CreateChargeMutationVariables,
        _context: unknown
      ) => {
        // setRegistrationStatus("Success");
        // setUser(data.createTrainee.user);
      },
    });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const amountToCharge = 100;

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
      input: { paymentMethodId, amount: amountToCharge },
    });
    // fetch(`${process.env.REACT_APP_HOST}/graphql`, {
    //   method: 'POST',
    //   body: JSON.stringify(({
    //     paymentMethodId,
    //     amount: amountToCharge
    //   })),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
  };

  return {
    handleSubmit,
  };
}

export default usePaymentForm;
