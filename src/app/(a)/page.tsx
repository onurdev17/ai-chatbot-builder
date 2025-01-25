import FutureFeatures from "@/components/FutureFeatures";
import Hero from "@/components/Hero";
import Safari from "@/components/Safari";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <Hero />
      <Safari />
      <FutureFeatures />
    </div>
  );
}
