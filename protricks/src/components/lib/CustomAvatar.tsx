import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { styled } from "@mui/material/styles";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";

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

interface CustomAvatarProps {
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
}));

const CustomAvatar: React.FC<CustomAvatarProps> = (props) => {
  const { name, size, imgSrc, BadgeIcon } = props;

  return BadgeIcon ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <SmallIconButton color="secondary">
          <BadgeIcon />
        </SmallIconButton>
      }
    >
      <Avatar
        src={
          imgSrc
            ? `${process.env.REACT_APP_ENDPOINT}/uploads/${imgSrc}`
            : undefined
        }
        sx={{
          bgcolor: stringToColor(name),
          ...(size === "small" && { width: 50, height: 50, fontSize: 20 }),
          ...(size === "medium" && { width: 100, height: 100, fontSize: 40 }),
          ...(size === "large" && { width: 300, height: 300, fontSize: 60 }),
        }}
        children={`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
      />
    </Badge>
  ) : (
    <Avatar
      src={
        imgSrc
          ? `${process.env.REACT_APP_ENDPOINT}/uploads/${imgSrc}`
          : undefined
      }
      sx={{
        bgcolor: stringToColor(name),
        ...(size === "small" && { width: 50, height: 50, fontSize: 20 }),
        ...(size === "medium" && { width: 100, height: 100, fontSize: 40 }),
        ...(size === "large" && { width: 300, height: 300, fontSize: 60 }),
      }}
      children={`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
    />
  );
};

export default CustomAvatar;
