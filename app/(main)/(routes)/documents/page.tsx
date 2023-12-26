import { UserButton } from "@clerk/nextjs";

const DocumentsPage = () => {
    return (
        <>
            <p>Hello world</p>
            <UserButton afterSignOutUrl="/" />
        </>
    );
}

export default DocumentsPage;