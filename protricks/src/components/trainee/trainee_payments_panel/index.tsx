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
import ExercisesTable from "./components/ExercisesTable";
import InfoBox from "./components/InfoBox";
import Box from "@mui/material/Box";
import { SelectedItem } from "./types/SelectedItem.type";
import Typography from "@mui/material/Typography";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const TraineePaymentsPanel: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [totalAmount, setTotalAmount] = useState<number>()

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

  useEffect(() => {
    let sum = 0

    selectedItems.forEach((s) => sum += s.amount)
    setTotalAmount(sum)
  }, [selectedItems])

  useEffect(() => {
    createPaymentIntent({
      input: {
        amount: totalAmount!
      }
    })
  }, [totalAmount])

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    // appearance,
  };

  return (
    getMonthlyExercisesLoading ?
      <LoadingScreen /> :
      <Box
        sx={{
          p: { xs: 10, md: 30 },
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Wybierz miesiące do zapłaty, klikając na odpowiednie rzędy tabeli.<br />
          Następnie pojawi się formularz płaceniowy.
        </Typography>
        <InfoBox amount={totalAmount!} />
        {clientSecret && stripePromise && totalAmount != 0 &&
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          </Elements>}
        <ExercisesTable
          price={data?.getMonthlyExercises.price!}
          monthObjects={data?.getMonthlyExercises.monthObjects!}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Box>
  );
};

export default TraineePaymentsPanel;
