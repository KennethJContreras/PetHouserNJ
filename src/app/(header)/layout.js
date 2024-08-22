import Navbar from "@/components/Navbar";

export default function HeaderLayout({children}) {

    return (
        <>
        <Navbar />
        {children}
        </>

    );
}