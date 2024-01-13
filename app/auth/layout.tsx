import { Navbar } from "./_components/navbar";

const AuthLayout = ({ 
    children
}: { 
    children: React.ReactNode
}) => {
    return (
        <div className="h-full flex justify-center">
            <Navbar />
            {children}
        </div>
    );
};

export default AuthLayout;