import { NavBar } from "src/app/(protected)/_components/NavBar";

interface IProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: IProtectedLayoutProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <NavBar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
