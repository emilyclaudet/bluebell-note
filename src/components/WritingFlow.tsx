"use client";

import { useState, useMemo } from "react";
import {
  RelationshipType,
  RELATIONSHIP_LABELS,
  RELATIONSHIP_EMOJI,
  getRandomPrompts,
} from "@/data/prompts";

type Step =
  | "relationship"
  | "compose"
  | "schedule"
  | "preview"
  | "confirmed";

interface FormData {
  relationshipType: RelationshipType | null;
  prompts: string[];
  messageText: string;
  deliveryOption: "date" | "surprise";
  deliveryDate: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
}

const INITIAL_FORM: FormData = {
  relationshipType: null,
  prompts: [],
  messageText: "",
  deliveryOption: "date",
  deliveryDate: "",
  recipientName: "",
  recipientEmail: "",
  senderName: "",
  senderEmail: "",
};

const RELATIONSHIP_TYPES: RelationshipType[] = [
  "friend",
  "partner",
  "parent",
  "sibling",
  "coworker",
  "mentor",
  "other",
];

export default function WritingFlow() {
  const [step, setStep] = useState<Step>("relationship");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  function selectRelationship(type: RelationshipType) {
    const prompts = getRandomPrompts(type);
    setForm((f) => ({ ...f, relationshipType: type, prompts }));
    setStep("compose");
  }

  function refreshPrompts() {
    if (!form.relationshipType) return;
    setForm((f) => ({
      ...f,
      prompts: getRandomPrompts(f.relationshipType!),
    }));
  }

  function canSchedule() {
    return (
      form.recipientName.trim() &&
      form.recipientEmail.trim() &&
      form.senderName.trim() &&
      form.senderEmail.trim() &&
      (form.deliveryOption === "surprise" || form.deliveryDate)
    );
  }

  function getDeliveryDateDisplay(): string {
    if (form.deliveryOption === "surprise") {
      return "A surprise day within the next 30 days";
    }
    return new Date(form.deliveryDate + "T00:00:00").toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      {step !== "confirmed" && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {(
            ["relationship", "compose", "schedule", "preview"] as Step[]
          ).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stepIndex(step) >= i
                  ? "bg-bluebell w-8"
                  : "bg-bluebell/20 w-6"
              }`}
            />
          ))}
        </div>
      )}

      {/* Step 1: Relationship Picker */}
      {step === "relationship" && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-center text-plum mb-2">
            Who is this Bluebell for?
          </h2>
          <p className="text-center text-plum/60 mb-8">
            This helps us suggest the right writing prompts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RELATIONSHIP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => selectRelationship(type)}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white border-2 border-transparent
                  hover:border-bluebell hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-2xl">{RELATIONSHIP_EMOJI[type]}</span>
                <span className="text-sm font-medium text-plum">
                  {RELATIONSHIP_LABELS[type]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Compose (with prompts inline) */}
      {step === "compose" && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-center text-plum mb-2">
            Write your message
          </h2>
          <p className="text-center text-plum/60 mb-6">
            Say what you feel. There&apos;s no wrong way to do this.
          </p>

          {/* Inline prompts */}
          <div className="mb-6 space-y-2">
            <p className="text-xs font-medium text-plum/40 uppercase tracking-wide mb-3">
              A few things to think about
            </p>
            {form.prompts.map((prompt, i) => (
              <p
                key={i}
                className="text-sm text-plum/60 italic pl-4 border-l-2 border-bluebell/20"
              >
                &ldquo;{prompt}&rdquo;
              </p>
            ))}
            <button
              onClick={refreshPrompts}
              className="text-xs text-bluebell hover:text-bluebell-dark transition-colors cursor-pointer mt-1"
            >
              Show different prompts
            </button>
          </div>

          <textarea
            value={form.messageText}
            onChange={(e) =>
              setForm((f) => ({ ...f, messageText: e.target.value }))
            }
            placeholder={`Dear ${form.relationshipType ? RELATIONSHIP_LABELS[form.relationshipType].replace(/^(A |My )/, "").toLowerCase() : "friend"}, I just wanted to tell you...`}
            rows={8}
            className="w-full p-5 rounded-2xl bg-white border border-lavender text-plum
              placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-bluebell/30
              focus:border-bluebell resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between mt-2 mb-6">
            <p className="text-xs text-plum/40">
              {form.messageText.length} characters
            </p>
            {form.messageText.length > 0 && form.messageText.length < 50 && (
              <p className="text-xs text-pink">
                A little more would make it even better
              </p>
            )}
          </div>

          {/* Image upload placeholder */}
          <div className="mb-8 p-4 rounded-2xl border-2 border-dashed border-lavender bg-white/50 text-center">
            <p className="text-sm text-plum/40">
              Image upload coming soon (1-3 photos)
            </p>
          </div>

          <div className="flex gap-3 justify-between">
            <button
              onClick={() => setStep("relationship")}
              className="px-6 py-3 text-plum/60 hover:text-plum transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep("schedule")}
              disabled={!form.messageText.trim()}
              className="px-8 py-3 bg-bluebell text-white rounded-full font-medium
                hover:bg-bluebell-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Schedule + Recipient Details */}
      {step === "schedule" && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-center text-plum mb-2">
            When and who
          </h2>
          <p className="text-center text-plum/60 mb-8">
            Choose when to deliver your Bluebell and who it&apos;s for.
          </p>

          {/* Delivery option */}
          <div className="space-y-3 mb-8">
            <label className="block text-sm font-medium text-plum mb-2">
              Delivery
            </label>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, deliveryOption: "date" }))
                }
                className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  form.deliveryOption === "date"
                    ? "border-bluebell bg-bluebell/5"
                    : "border-lavender bg-white hover:border-bluebell/40"
                }`}
              >
                <p className="font-medium text-plum">Pick a date</p>
                <p className="text-xs text-plum/50 mt-1">
                  Choose exactly when it arrives
                </p>
              </button>
              <button
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    deliveryOption: "surprise",
                    deliveryDate: "",
                  }))
                }
                className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  form.deliveryOption === "surprise"
                    ? "border-bluebell bg-bluebell/5"
                    : "border-lavender bg-white hover:border-bluebell/40"
                }`}
              >
                <p className="font-medium text-plum">Surprise them</p>
                <p className="text-xs text-plum/50 mt-1">
                  Random day within 30 days
                </p>
              </button>
            </div>
            {form.deliveryOption === "date" && (
              <div className="p-4 rounded-2xl bg-white border border-lavender">
                <input
                  type="date"
                  min={tomorrow}
                  value={form.deliveryDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                  }
                  className="w-full p-3 rounded-xl bg-mist border border-lavender text-plum
                    focus:outline-none focus:ring-2 focus:ring-bluebell/30 focus:border-bluebell"
                />
                {form.deliveryDate && (
                  <p className="text-sm text-bluebell font-medium mt-3 text-center">
                    Delivering on{" "}
                    {new Date(form.deliveryDate + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Recipient info */}
          <div className="space-y-4 mb-8">
            <label className="block text-sm font-medium text-plum">
              Who is this for?
            </label>
            <input
              type="text"
              placeholder="Their name"
              value={form.recipientName}
              onChange={(e) =>
                setForm((f) => ({ ...f, recipientName: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-white border border-lavender text-plum
                placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-bluebell/30 focus:border-bluebell"
            />
            <input
              type="email"
              placeholder="Their email address"
              value={form.recipientEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, recipientEmail: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-white border border-lavender text-plum
                placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-bluebell/30 focus:border-bluebell"
            />
          </div>

          {/* Sender info */}
          <div className="space-y-4 mb-8">
            <label className="block text-sm font-medium text-plum">
              And who are you?
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={form.senderName}
              onChange={(e) =>
                setForm((f) => ({ ...f, senderName: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-white border border-lavender text-plum
                placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-bluebell/30 focus:border-bluebell"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={form.senderEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, senderEmail: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-white border border-lavender text-plum
                placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-bluebell/30 focus:border-bluebell"
            />
          </div>

          <div className="flex gap-3 justify-between">
            <button
              onClick={() => setStep("compose")}
              className="px-6 py-3 text-plum/60 hover:text-plum transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep("preview")}
              disabled={!canSchedule()}
              className="px-8 py-3 bg-bluebell text-white rounded-full font-medium
                hover:bg-bluebell-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Preview */}
      {step === "preview" && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-center text-plum mb-2">
            Here&apos;s what {form.recipientName} will see
          </h2>
          <p className="text-center text-plum/60 mb-8">
            Take a moment to read it over.
          </p>

          {/* Preview card mimicking recipient page */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-lavender mb-8">
            <div className="text-center mb-6">
              <p className="text-sm text-bluebell font-medium tracking-wide uppercase">
                A Bluebell for you
              </p>
            </div>
            <div className="font-serif text-lg leading-relaxed text-plum whitespace-pre-wrap mb-6">
              {form.messageText}
            </div>
            <div className="text-right">
              <p className="text-plum/60 text-sm">With love,</p>
              <p className="text-plum font-medium">{form.senderName}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-lavender mb-8">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-plum/50">To</span>
                <span className="text-plum">
                  {form.recipientName} ({form.recipientEmail})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-plum/50">Delivery</span>
                <span className="text-plum">{getDeliveryDateDisplay()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            <button
              onClick={() => setStep("schedule")}
              className="px-6 py-3 text-plum/60 hover:text-plum transition-colors cursor-pointer"
            >
              Go back
            </button>
            <button
              onClick={() => setStep("confirmed")}
              className="px-8 py-3 bg-green text-white rounded-full font-medium
                hover:opacity-90 transition-opacity cursor-pointer"
            >
              Send this Bluebell
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Confirmation */}
      {step === "confirmed" && (
        <div className="animate-fade-in text-center py-8">
          <div className="text-5xl mb-4">{"\uD83C\uDF3C"}</div>
          <h2 className="text-2xl font-semibold text-plum mb-2">
            Your Bluebell is on its way
          </h2>
          <p className="text-plum/60 mb-2">
            {form.recipientName} will receive your message on
          </p>
          <p className="text-bluebell font-medium mb-8">
            {getDeliveryDateDisplay()}
          </p>
          <p className="text-sm text-plum/40 mb-8">
            We&apos;ll send you a confirmation email at {form.senderEmail}
          </p>
          <button
            onClick={() => {
              setForm(INITIAL_FORM);
              setStep("relationship");
            }}
            className="px-8 py-3 bg-bluebell text-white rounded-full font-medium
              hover:bg-bluebell-dark transition-colors cursor-pointer"
          >
            Send another Bluebell
          </button>
        </div>
      )}
    </div>
  );
}

function stepIndex(step: Step): number {
  const steps: Step[] = [
    "relationship",
    "compose",
    "schedule",
    "preview",
  ];
  return steps.indexOf(step);
}
