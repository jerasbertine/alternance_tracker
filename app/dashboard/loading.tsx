export default function DashboardLoading() {
  return (
    <div className="flex flex-1">
      <div className="w-56 bg-sidebar" />
      <main className="flex-1 p-8">
        <div className="h-7 w-48 bg-secondary rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-secondary rounded animate-pulse mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-border rounded p-4">
              <div className="h-3 w-24 bg-secondary rounded animate-pulse mb-2" />
              <div className="h-8 w-12 bg-secondary rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-secondary border border-border rounded p-3 min-h-50 animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  );
}
