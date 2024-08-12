import { CardWrapper } from "components/Auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
