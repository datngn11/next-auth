import { auth, signOut } from "src/auth";

const Settings = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";

    await signOut({
      redirectTo: "/auth/login",
    });
  };

  return (
    <div>
      {JSON.stringify(session)}
      <form action={handleSignOut}>
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default Settings;
