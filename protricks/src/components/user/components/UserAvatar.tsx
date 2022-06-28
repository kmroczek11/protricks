import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { styled } from "@mui/material/styles";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import {
  ChangeProfilePicMutation,
  ChangeProfilePicMutationVariables,
  useChangeProfilePicMutation,
} from "../../../generated/graphql";
import CustomAlert from "../../lib/CustomAlert";
import Box from "@mui/material/Box";
import { useAuth } from "../../../context";

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

interface UserAvatarProps {
  name: string;
  size?: "small" | "medium" | "large";
  imgSrc?: string;
  BadgeIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const SmallIconButton = styled(IconButton)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `5px solid ${theme.palette.background.paper}`,
  backgroundColor: theme.palette.primary.dark,

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
})) as typeof IconButton;

const noFileProvided =
  "Nie przesłano zdjęcia. Zdjęcie musi być w formacie png lub jpg/jpeg.";

const invalidExtension = "Nieprawidłowe rozszerzenie pliku.";

const invalidMimeType = "Nieprawidłowy typ MIME.";

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { name, size, imgSrc, BadgeIcon } = props;
  const [user, setUser] = useAuth();
  const [changeProfilePicStatus, setChangeProfilePicStatus] =
    useState<string>("");

  const { isLoading, mutate } = useChangeProfilePicMutation<Error>(
    graphqlRequestClient(false),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setChangeProfilePicStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: ChangeProfilePicMutation,
        _variables: ChangeProfilePicMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.setItem("token", data.changeProfilePic.token);
        setUser(data.changeProfilePic.user);
      },
    }
  );

  const onFileChange = (e) => {
    mutate({
      input: {
        userId: user?.id!,
        image: e.target.files[0],
      },
    });
  };

  return isLoading ? null : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <React.Fragment>
            <SmallIconButton color="secondary" component="label">
              {BadgeIcon && <BadgeIcon />}
              <input
                id="icon-button-file"
                color="primary"
                type="file"
                onChange={onFileChange}
                hidden
              />
            </SmallIconButton>
          </React.Fragment>
        }
      >
        <Avatar
          src={imgSrc ? `${process.env.REACT_APP_ENDPOINT}/uploads/${imgSrc}` : undefined}
          sx={{
            bgcolor: stringToColor(name),
            ...(size === "small" && { width: 50, height: 50, fontSize: 20 }),
            ...(size === "medium" && { width: 100, height: 100, fontSize: 40 }),
            ...(size === "large" && { width: 300, height: 300, fontSize: 60 }),
          }}
          children={`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
        />
      </Badge>
      {changeProfilePicStatus === "No file provided" ? (
        <CustomAlert severity="error" msg={noFileProvided} />
      ) : changeProfilePicStatus === "Invalid extension" ? (
        <CustomAlert severity="error" msg={invalidExtension} />
      ) : changeProfilePicStatus === "Invalid mime type" ? (
        <CustomAlert severity="error" msg={invalidMimeType} />
      ) : (
        changeProfilePicStatus && (
          <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
        )
      )}
    </Box>
  );
};

export default UserAvatar;
