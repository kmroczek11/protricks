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
import { useCreatePaymentItemMutation } from "../../../../generated/graphql";
import createAccessClient from "../../../../graphql/clients/accessClient";
import { SelectedItem } from "../types/SelectedItem.type";

interface CheckoutFormProps {
  selectedItems: SelectedItem[],
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const { selectedItems, setSelectedItems } = props;

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/uczen/platnosc_powiodla_sie`,
        },
        redirect: "if_required"
      });

      if (error) {
        console.error(error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded");
        selectedItems.forEach((s) => {
          createPaymentItem({
            input: {
              month: s.month,
              amount: s.amount,
            },
          });
        })

        setSelectedItems([])
      } else {
        console.log("Payment failed");
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false);
  };

  return (
    <Box sx={{
      pb: 5,
      display: "flex",
      justifyContent: "center"
    }}>
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
