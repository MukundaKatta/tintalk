"use client";

import { useState } from "react";
import Link from "next/link";

const RESPONSES: Record<string, string> = {
  sad: "that makes sense. sadness is trying to tell you something — usually that you lost or missed something that mattered. what happened recently that felt like a loss?",
  anxious:
    "anxiety is your brain running worst-case simulations on repeat. let's slow it down — what's the one thing you're most worried about right now?",
  lonely:
    "loneliness hits different when you're surrounded by people who don't get you. when was the last time you felt genuinely seen by someone?",
  angry:
    "anger usually shows up when a boundary got crossed. something felt unfair or out of your control. what set it off today?",
  scared:
    "being scared takes guts to admit. most people just pretend they're fine. what's the fear about — is it something happening now, or something you think might happen?",
};

const KEYWORDS = Object.keys(RESPONSES);

function findResponse(input: string): string | null {
  const lower = input.toLowerCase();
  for (const keyword of KEYWORDS) {
    if (lower.includes(keyword)) {
      return RESPONSES[keyword];
    }
  }
  return null;
}

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function TryPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { from: "user", text };
    const response = findResponse(text);
    const botMsg: Message = {
      from: "bot",
      text:
        response ??
        "i hear you. can you tell me more about how you're feeling? try describing it in a word — like sad, anxious, lonely, angry, or scared.",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-500" />
          Tintalk
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
            Text-first therapy
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Say what you feel. No filter needed.
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Type a feeling — try <span className="font-medium text-neutral-700">sad</span>,{" "}
            <span className="font-medium text-neutral-700">anxious</span>,{" "}
            <span className="font-medium text-neutral-700">lonely</span>,{" "}
            <span className="font-medium text-neutral-700">angry</span>, or{" "}
            <span className="font-medium text-neutral-700">scared</span>.
          </p>
        </div>

        <div className="flex flex-1 flex-col rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-neutral-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-900">
            Anonymous · Now
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5 text-sm">
            {messages.length === 0 && (
              <p className="text-center text-neutral-400 py-12">
                Your messages will appear here. Start by typing how you feel.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-3 max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-neutral-100"
                    : "bg-violet-50 self-end text-violet-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="border-t border-neutral-200 p-4 flex gap-3">
            <input
              type="text"
              placeholder="Type how you're feeling..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
            <button
              type="submit"
              className="rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Send
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with canned responses.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real experience.
        </p>
      </div>
    </div>
  );
}
