"use client";

import { UserRole } from "@prisma/client";
import { RoleGate } from "components/Auth/RoleGate";
import { FormSuccess } from "components/FormSuccess";
import { Button } from "components/UI/button";
import { Card, CardContent, CardHeader } from "components/UI/card";
import { toast } from "sonner";
import { admin } from "src/actions/admin";

const AdminPage = () => {
  const onApiRouteClick = async () => {
    try {
      const res = await fetch("/api/admin");

      if (res.ok) {
        toast.success("API Route OK");
      }

      return res;
    } catch (error) {
      toast.error("API Route Error");
    }
  };

  const onServerActionClick = async () => {
    try {
      const res = await admin();

      if (res.success) {
        toast.success(res.success);
      }
      if (res.error) {
        toast.error(res.error);
      }

      return res;
    } catch {
      toast.error("Server Action Error");
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <CardContent>
            <FormSuccess message="You are an admin and have access to this page." />
          </CardContent>
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only API Route</p>

          <Button onClick={onApiRouteClick}>Click</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only Server Action</p>

          <Button onClick={onServerActionClick}>Click</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
