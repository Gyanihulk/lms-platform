import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adamya Courses",
  description: "Gyani Hulk aspiring Software Engineer",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div >{children}</div>;
};

export default AuthLayout;
