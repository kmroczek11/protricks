import { styled } from "@mui/system";

export const Form = styled("form")`
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
`;

export const Button = styled("button")`
  width: 100%;
  border-radius: 24px;
  padding: 0.6rem 1.2rem;
  text-transform: none;

  &:hover {
    background: #d3d3d3;
  }
`;

export const PaymentMessage = styled("div")`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`;

export const PaymentElement = styled("div")`
  margin-bottom: 24px;
`;

export const Spinner = styled("div")`
  border-radius: 50%;
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before,
  &:after {
    border-radius: 50%;
    position: absolute;
    content: "";
  }

  &:before {
    before {
      width: 10.4px;
      height: 20.4px;
      background: #5469d4;
      border-radius: 20.4px 0 0 20.4px;
      top: -0.2px;
      left: -0.2px;
      -webkit-transform-origin: 10.4px 10.2px;
      transform-origin: 10.4px 10.2px;
      -webkit-animation: loading 2s infinite ease 1.5s;
      animation: loading 2s infinite ease 1.5s;
    }

    &:after {
      width: 10.4px;
      height: 10.2px;
      background: #5469d4;
      border-radius: 0 10.2px 10.2px 0;
      top: -0.1px;
      left: 10.2px;
      -webkit-transform-origin: 0px 10.2px;
      transform-origin: 0px 10.2px;
      -webkit-animation: loading 2s infinite ease;
      animation: loading 2s infinite ease;
    }

    @keyframes loading {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @media (max-width: 600px) {
      form {
        width: 80vw;
        min-width: initial;
      }
    }
  }
`;
