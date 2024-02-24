import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gyaan Bhandaar",
  description: "Gyani Hulk aspiring Software Engineer",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div >{children}</div>;
};

export default AuthLayout;
