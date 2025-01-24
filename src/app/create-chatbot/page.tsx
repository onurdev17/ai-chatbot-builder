// import Model from "@/components/Model";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), {
  loading: () => (
    <div className="flex h-[36rem] w-[28rem] items-center justify-center">
      <div className="animate-pulse text-cyan-500">Loading AI Assistant...</div>
    </div>
  ),
});

function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Model />
    </div>
  );
}

export default Page;
