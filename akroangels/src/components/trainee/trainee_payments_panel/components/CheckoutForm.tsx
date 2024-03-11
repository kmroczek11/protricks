import React, { FormEvent, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { ColorButton, CustomAlert } from "../../../lib";
import Box from "@mui/material/Box";
import { Button, Form, PaymentMessage, Spinner } from ".";
import {
  accountNumberInvalid,
  amountToSmall,
} from "../../../../translations/pl/errorMessages";
import ExercisesTable from "./ExercisesTable";
import InfoBox from "./InfoBox";
import { useCreatePaymentItemMutation } from "../../../../generated/graphql";
import createAccessClient from "../../../../graphql/clients/accessClient";

interface CheckoutFormProps {
  price: number,
  monthObjects: Array<{
    month: string,
    payed: boolean,
    exercises: Array<{
      id: string,
      day: any
    }>
  }>
}

export type SelectedItem = {
  month: string;
  amount: number
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const { price, monthObjects } = props;
  console.log(monthObjects)
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [totalAmount, setTotalAmount] = useState<number>()

  useEffect(() => {
    let sum = 0

    selectedItems.forEach((s) => sum += s.amount)
    setTotalAmount(sum)
  }, [selectedItems])
  
  const { isLoading: isCreatePaymentItemLoading, mutate: createPaymentItem } =
    useCreatePaymentItemMutation<Error>(createAccessClient(), {});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/uczen/platnosci`,
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error!.type === "card_error" || error!.type === "validation_error") {
      setErrorMessage(error!.message!);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        p: { xs: 10, md: 30 },
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
        <ExercisesTable
          price={price}
          monthObjects={monthObjects}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <InfoBox amount={totalAmount!} />
            <Form onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" />
              <Button id="submit" disabled={isLoading || !stripe || !elements}>
                <span id="button-text">{isLoading ? <Spinner /> : "Zapłać"}</span>
              </Button>
            </Form>
        {errorMessage === "account_number_invalid" && (
          <CustomAlert severity="error" msg={accountNumberInvalid} />
        )}
        {errorMessage === "amount_to_small" && (
          <CustomAlert severity="error" msg={amountToSmall} />
        )}
    </Box>
  );
};

export default CheckoutForm;
