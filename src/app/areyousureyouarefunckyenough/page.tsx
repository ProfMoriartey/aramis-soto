"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

// —— Edit these with your real questions/answers ——
const QUESTIONS: string[] = [
  "Q1) With your own common sense, complete this phrase: 'shit _____' ",
  "Q2) You are Mexican, you are waiting at the bus terminal, your bus is late, you express your anger by saying: ",
  "Q3) Are you having fun?",
];

// Put correct answers here (same order). Case/punct/spacing doesn't matter.
const ANSWERS: string[] = [
  "Happens",
  "¿Donde esta el chingado camion?",
  "so much fun",
];

// Normalizer: lowercase, strip punctuation/spaces/diacritics
function normalize(s: string | undefined): string {
  if (!s) return "";
  return s
    .normalize?.("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]/giu, "")
    .toLowerCase()
    .trim();
}

export default function FunckClearancePage() {
  const [inputs, setInputs] = useState<string[]>(
    Array(QUESTIONS.length).fill(""),
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<boolean[]>(
    Array(QUESTIONS.length).fill(false),
  );

  const allCorrect =
    showResults &&
    results.length === QUESTIONS.length &&
    results.every(Boolean);

  function update(idx: number, value: string) {
    setInputs((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    // Hide indicators after any edit; user must press "Check Answers" again
    if (showResults) setShowResults(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Compute results safely, guarding indexes
    const checked = inputs.map((val, i) => {
      const userN = normalize(val);
      const ansN = normalize(ANSWERS[i]); // safe: normalize handles undefined
      return userN.length > 0 && ansN.length > 0 && userN === ansN;
    });
    setResults(checked);
    setShowResults(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-neutral-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <LockKeyhole className="h-6 w-6 text-purple-400" />
          Funck Clearance
        </h1>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-neutral-200 hover:bg-neutral-400"
        >
          <Link href="/">← Back</Link>
        </Button>
      </div>

      <Card className="rounded-2xl border-neutral-800 bg-neutral-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            Level 69 Funck Security
          </CardTitle>
          <p className="text-sm text-neutral-400">
            This is a funck test, your clearance level will be determined now.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            {QUESTIONS.map((q, i) => {
              const show = showResults; // only show state after "Check Answers"
              const ok = show && results[i] === true;

              return (
                <div key={i} className="grid gap-2">
                  <label
                    className="text-sm font-medium text-neutral-200"
                    htmlFor={`q${i}`}
                  >
                    {q}
                  </label>
                  <textarea
                    id={`q${i}`}
                    rows={3}
                    placeholder="Type your answer here…"
                    className={[
                      "w-full rounded-xl border bg-neutral-950 p-3 text-sm outline-none",
                      "border-neutral-800 focus:border-neutral-700 focus:ring-0",
                      show && ok ? "border-green-700" : "",
                      show && !ok ? "border-red-700" : "",
                    ].join(" ")}
                    value={inputs[i] ?? ""} // guard index
                    onChange={(e) => update(i, e.target.value)}
                  />
                  {show && (
                    <div className="flex items-center gap-2 text-xs">
                      {ok ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-400">Looks good.</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-4 w-4 text-red-400" />
                          <span className="text-red-400">Nope. Try again.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Separator className="my-2 bg-neutral-800" />

            <div className="flex items-center gap-3">
              {!allCorrect ? (
                <Button
                  type="submit"
                  className="rounded-xl bg-purple-700 hover:bg-purple-600"
                >
                  Check Answers
                </Button>
              ) : (
                <Button
                  asChild
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500"
                >
                  <Link href="/areyousureyouarefunckyenough/funckystuff">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Clearance Granted: Enter FunckTown
                  </Link>
                </Button>
              )}

              {showResults && !allCorrect && (
                <span className="text-xs text-neutral-400">
                  Tip: spacing/punctuation don’t matter.
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
