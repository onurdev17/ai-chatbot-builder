import FutureFeatures from "@/components/FutureFeatures";
import Hero from "@/components/Hero";
import Safari from "@/components/Safari";
import img from "/public/safari-section.png";

export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center gap-10">
      <Hero />
      <Safari imageSrc={img.src} />
      <FutureFeatures />
    </div>
  );
}
