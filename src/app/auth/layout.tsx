interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Readonly<IProps>) => {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      {children}
    </div>
  );
};

export default AuthLayout;
