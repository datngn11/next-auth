"use client";

import { Button } from "components/UI/button";
import { logout } from "src/actions/logout";
import { useCurrentUser } from "src/hooks/useCurrentUser";

const Settings = () => {
  const { user } = useCurrentUser();

  const handleSignOut = async () => {
    logout();
  };

  return <div className="rounded-xl  bg-white p-10">Settings</div>;
};

export default Settings;
