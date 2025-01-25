import RootLayout from "@/app/(a)/layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <div className="mb-0 flex min-h-screen items-center justify-center overflow-hidden pb-0 sm:overflow-auto">
        {children}
      </div>
    </RootLayout>
  );
}

export default Layout;
