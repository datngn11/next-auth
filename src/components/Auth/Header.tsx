interface IProps {
  label: string;
}

const Header = ({ label }: IProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-x-4">
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
