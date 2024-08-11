interface IProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Readonly<IProps>) => {
  return (
    <>
      <div className="bg-blue-500">Navbar</div>
      {children}
    </>
  );
};

export default DashboardLayout;
