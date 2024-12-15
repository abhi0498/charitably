export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Organization Dashboard</h1>
      {children}
    </div>
  );
}
