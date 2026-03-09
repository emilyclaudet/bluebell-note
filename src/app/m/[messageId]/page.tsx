import type { Metadata } from "next";
import Link from "next/link";
import BluebellIcon from "@/components/BluebellIcon";

// Mock data for the static prototype — will be replaced with DB lookup
const MOCK_MESSAGE = {
  id: "demo",
  senderName: "Alex",
  recipientName: "Jordan",
  messageText:
    "I just wanted you to know that your friendship means the world to me. Remember that rainy Tuesday when you drove across town just to bring me soup because I mentioned I had a cold? That's the kind of person you are — someone who listens, really listens, and then shows up.\n\nI don't say it enough, but I'm so grateful you're in my life.",
  relationshipType: "friend",
  createdAt: new Date().toISOString(),
};

export const metadata: Metadata = {
  title: `${MOCK_MESSAGE.senderName} sent you a Bluebell`,
  description: "Someone wrote you a heartfelt message.",
};

export default async function MessagePage({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const { messageId } = await params;

  // For now, always show mock data. In production, fetch from DB.
  const message = { ...MOCK_MESSAGE, id: messageId };

  return (
    <div className="min-h-screen bg-mist flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center gap-2 py-6">
        <BluebellIcon className="w-6 h-6" />
        <span className="text-sm font-medium text-plum/50 tracking-tight">
          Bluebell
        </span>
      </header>

      {/* Message */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Bloom animation container */}
          <div className="animate-bloom">
            <div className="text-center mb-6">
              <p className="text-sm text-bluebell font-medium tracking-wide uppercase mb-1">
                A Bluebell for {message.recipientName}
              </p>
              <div className="w-12 h-px bg-bluebell/20 mx-auto" />
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-lavender">
              <div className="font-serif text-lg sm:text-xl leading-relaxed text-plum whitespace-pre-wrap mb-8">
                {message.messageText}
              </div>
              <div className="text-right">
                <p className="text-plum/50 text-sm mb-1">With love,</p>
                <p className="text-plum font-medium text-lg">
                  {message.senderName}
                </p>
              </div>
            </div>
          </div>

          {/* Growth loop CTA */}
          <div className="text-center mt-12">
            <p className="text-plum/50 text-sm mb-4">
              Someone just sent you a Bluebell.
              <br />
              Want to send one to someone else?
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-bluebell text-white rounded-full font-medium
                hover:bg-bluebell-dark transition-colors"
            >
              Send a Bluebell
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-plum/30">
        Made with quiet kindness
      </footer>
    </div>
  );
}
