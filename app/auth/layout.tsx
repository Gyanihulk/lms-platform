const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at top, #d9e8ff, #00224A)", 
      // lightblue (#d9e8ff) to navyblue (#00224A)
    }}
  >      {children}
    </div>
   );
}
 
export default AuthLayout;