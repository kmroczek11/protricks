import React, { FormEvent, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
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
import Typography from "@mui/material/Typography";

interface CheckoutFormProps {
  exercisesWithPrice: Array<{
    id: string;
    day: any;
    price: number | null | undefined;
  }>;
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const { exercisesWithPrice, amount } = props;
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoading: isCreatePaymentItemLoading, mutate: createPaymentItem } =
    useCreatePaymentItemMutation<Error>(createAccessClient(), {});

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");

          createPaymentItem({
            input: {
              amount,
            },
          });
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

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
      {amount != 0 ? (
        <React.Fragment>
          <ExercisesTable data={exercisesWithPrice} />
          <InfoBox amount={amount} />
          <Form onSubmit={handleSubmit}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              // onChange={(e) => setEmail(e.value.email)}
            />
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
        </React.Fragment>
      ) : (
        <Typography
          variant="h1"
          color="secondary"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Wszystko zapłacone!
        </Typography>
      )}
    </Box>
  );
};

export default CheckoutForm;
