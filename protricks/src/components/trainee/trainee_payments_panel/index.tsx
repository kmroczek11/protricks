import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import {
  CreatePaymentIntentMutation,
  CreatePaymentIntentMutationVariables,
  GetMonthlyCostQuery,
  useCreatePaymentIntentMutation,
  useGetMonthlyCostQuery,
} from "../../../generated/graphql";
import createAccessClient from "../../../graphql/clients/accessClient";
import { useAuth } from "../../auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const TraineePaymentsPanel: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const [exercisesWithPrice, setExercisesWithPrice] = useState<
    {
      id: string;
      day: any;
      price: number | null | undefined;
    }[]
  >([]);

  const { isLoading, mutate: createPaymentIntent } =
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
    isLoading: getMonthlyCostLoading,
    error,
    refetch,
  } = useGetMonthlyCostQuery<GetMonthlyCostQuery, Error>(
    createAccessClient(),
    {
      getMonthlyCostInput: {
        userId: user?.id!,
      },
    },
    { refetchInterval: 1000 }
  );

  useEffect(() => {
    if (!data?.getMonthlyCost.actualExercises) return;

    const e = data?.getMonthlyCost.actualExercises!.map((a, i) => ({
      ...a,
      price:
        i == 0 && data.getMonthlyCost.firstTimeDiscountApplied
          ? 0
          : data.getMonthlyCost.groupPrice,
    }))!;

    console.log(e);

    setExercisesWithPrice(e);
  }, [data]);

  console.log(data?.getMonthlyCost);

  useEffect(() => {
    if (!data?.getMonthlyCost.amount) return;

    createPaymentIntent({
      input: {
        amount: data?.getMonthlyCost.amount!,
      },
    });
  }, [data?.getMonthlyCost.amount]);

  // const appearance = {
  //   theme: "stripe",
  // };

  const options = {
    clientSecret,
    // appearance,
  };

  return (
    <div className="App">
      {clientSecret && stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            amount={data?.getMonthlyCost.amount!}
            exercisesWithPrice={exercisesWithPrice!}
          />
        </Elements>
      )}
    </div>
  );
};

export default TraineePaymentsPanel;
