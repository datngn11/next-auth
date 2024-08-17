"use client";

import { UserInfo } from "components/UserInfo";
import { useCurrentUser } from "src/hooks/useCurrentUser";

const ServerPage = () => {
  const { user } = useCurrentUser();

  return <UserInfo user={user} label="📱 Client component" />;
};

export default ServerPage;
