import React, { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import usePaymentForm from "../hooks/usePaymentForm";
import { ColorButton, CustomAlert } from "../../../lib";
import Box from "@mui/material/Box";
import {
  accountNumberInvalid,
  amountToSmall,
} from "../../../../translations/pl/errorMessages";
import {
  GetMonthlyCostQuery,
  useGetMonthlyCostQuery,
} from "../../../../generated/graphql";
import accessClient from "../../../../graphql/clients/accessClient";
import { useAuth } from "../../../auth";
import InfoBox from "./InfoBox";
import ExercisesTable from "./ExercisesTable";

const CheckoutForm = () => {
  const { handleSubmit, errorMessage } = usePaymentForm();
  const { user } = useAuth();
  const [exercisesWithPrice, setExercisesWithPrice] = useState<
    {
      id: string;
      day: any;
      price: number;
    }[]
  >([]);


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

  useEffect(() => {
    const e = data?.getMonthlyCost.actualExercises.map((a, i) => ({
      ...a,
      price:
        i == 0 && data.getMonthlyCost.firstTimeDiscountApplied
          ? 0
          : data.getMonthlyCost.groupPrice,
    }))!;

    console.log(e)

    setExercisesWithPrice(e);
  }, [data]);

  return (
    <Box
      sx={{
        p: { xs: 10, md: 30 },
      }}
    >
      <ExercisesTable data={exercisesWithPrice} />
      <InfoBox amount={data?.getMonthlyCost.amount!} />
      <form onSubmit={(e) => handleSubmit(e, data?.getMonthlyCost.amount!)}>
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
