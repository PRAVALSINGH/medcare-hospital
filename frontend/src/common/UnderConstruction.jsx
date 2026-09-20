import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Construction size={32} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Page Under Construction
        </h1>

        <p className="mt-2 max-w-md text-sm text-slate-500">
          This feature is currently under development.
          We will make it available soon.
        </p>
      </div>
    </main>
  );
}