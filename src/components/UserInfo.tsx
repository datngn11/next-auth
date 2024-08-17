import { Badge } from "components/UI/badge";
import { Card, CardContent, CardHeader } from "components/UI/card";
import { ExtendedUser } from "src/types/next-auth";

interface IUserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: IUserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-y-2">
          <p>
            <span className="font-semibold">ID:</span> {user?.id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
          <p>
            <span className="font-semibold">2FA:</span>{" "}
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
