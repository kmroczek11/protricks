import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import usePaymentForm from "../hooks/usePaymentForm";
import { ColorButton, CustomAlert } from "../../../lib";
import Box from "@mui/material/Box";
import { accountNumberInvalid, amountToSmall } from "../../../../translations/pl/errorMessages";

const CheckoutForm = () => {
  const { handleSubmit, errorMessage } = usePaymentForm();

  return (
    <Box
      sx={{
        p: { xs: 10, md: 30 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <CardElement />
        <ColorButton
          variant="contained"
          color="success"
          type="submit"
          sx={{ my: 2 }}
        >
          Zapłać
        </ColorButton>
      </form>
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
