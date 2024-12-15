export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      {children}
    </div>
  );
}
