import { BackButton } from "components/Auth/BackButton";
import Header from "components/Auth/Header";
import { Socials } from "components/Auth/Socials";
import { Card, CardHeader, CardContent, CardFooter } from "components/UI/card";

interface IProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocials?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  showSocials,
  backButtonLabel,
  backButtonHref,
}: IProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
