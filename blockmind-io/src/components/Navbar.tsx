
import Image from "next/image";

const Navbar = ()=>{
    return (
        <div className="dark h-20 flex items-center align-middle">
            <div className="w-2/12 h-20 flex justify-center items-center align-middle">
                <Image src='/images/logo-colored.png' width={60} height={60} alt="logo"/>
                <h1 className="font-[family-name:var(--font-academy)] text-[#bbbbbb]">Blocmind</h1>
            </div>
            
            
        </div>
    )
}

export default Navbar;