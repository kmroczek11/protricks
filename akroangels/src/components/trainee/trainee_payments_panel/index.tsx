import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import {
  CreatePaymentIntentMutation,
  CreatePaymentIntentMutationVariables,
  GetMonthlyExercisesQuery,
  useCreatePaymentIntentMutation,
  useGetMonthlyExercisesQuery,
} from "../../../generated/graphql";
import createAccessClient from "../../../graphql/clients/accessClient";
import { useAuth } from "../../auth";
import { LoadingScreen } from "../../lib";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const TraineePaymentsPanel: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  const { isLoading: isCreatePaymentIntentLoading, mutate: createPaymentIntent } =
    useCreatePaymentIntentMutation<Error>(createAccessClient(), {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setErrorMessage(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: CreatePaymentIntentMutation,
        _variables: CreatePaymentIntentMutationVariables,
        _context: unknown
      ) => setClientSecret(data.createPaymentIntent.clientSecret),
    });

  const {
    data,
    isLoading: getMonthlyExercisesLoading,
    error,
    refetch,
  } = useGetMonthlyExercisesQuery<GetMonthlyExercisesQuery, Error>(
    createAccessClient(),
    {
      input: {
        userId: user?.id!,
      },
    },
    { refetchInterval: 1000 }
  );

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    // appearance,
  };

  return (
    <React.Fragment>
      {clientSecret && stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          {getMonthlyExercisesLoading ?
            <LoadingScreen /> :
            <CheckoutForm
              price={data?.getMonthlyExercises.price!}
              monthObjects={data?.getMonthlyExercises.monthObjects!}
            />}
        </Elements>
      )}
    </React.Fragment>
  );
};

export default TraineePaymentsPanel;
