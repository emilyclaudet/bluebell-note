import BluebellIcon from "@/components/BluebellIcon";
import WritingFlow from "@/components/WritingFlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <header className="flex items-center justify-center gap-2 py-6">
        <BluebellIcon className="w-7 h-7" />
        <span className="text-lg font-semibold text-plum tracking-tight">
          Bluebell
        </span>
      </header>

      {/* Hero */}
      <main className="px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-plum leading-tight mb-4">
            Send a Bluebell to someone
            <br />
            you love
          </h1>
          <p className="text-plum/60 max-w-md mx-auto leading-relaxed">
            Write a heartfelt message and schedule it for delivery.
            No special occasion required — kindness blooms on its own.
          </p>
        </div>

        <WritingFlow />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-plum/30">
        Made with quiet kindness
      </footer>
    </div>
  );
}
