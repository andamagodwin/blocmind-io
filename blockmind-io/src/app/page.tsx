import { Navbar,Hero } from "@/components";


export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Hero/>
      </div>
      
    </div>
  );
}
