"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What platforms do you develop games for?",
    answer: "We specialize in mobile games for Android using Flutter, as well as Roblox experiences. Our games are built with cross-platform capabilities in mind, ensuring smooth performance across devices.",
  },
  {
    question: "Are your games free to play?",
    answer: "Yes! All our games are free to download and play. We offer optional in-app purchases for cosmetics and convenience features, but our games are designed to be fully enjoyable without spending money.",
  },
  {
    question: "How often do you release updates?",
    answer: "We ship updates weekly for our live games. This includes bug fixes, new content, seasonal events, and quality-of-life improvements based on player feedback.",
  },
  {
    question: "Do you offer game development consulting?",
    answer: "Absolutely! We partner with indie studios and creators to help with prototyping, UX design, monetization strategy, and full game development. Contact us through our services page to learn more.",
  },
  {
    question: "How can I join beta testing for upcoming games?",
    answer: "Visit any of our 'Coming Soon' game pages and join the waitlist with your email. Beta testers get early access and exclusive in-game rewards when the game launches.",
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <div
        className={`rounded-2xl border bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-300 ${
          isOpen ? "border-white/20" : "border-white/10 hover:border-white/20"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="flex w-full items-start gap-4 rounded-2xl p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <h3
            className="flex-1 text-base font-semibold text-white"
            itemProp="name"
          >
            {faq.question}
          </h3>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-white/80" : "group-hover:text-white/70"
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="answer"
              id={answerId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p
                className="px-6 pb-6 text-sm leading-relaxed text-white/70"
                itemProp="text"
              >
                {faq.answer}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container-px py-20 border-t border-white/5">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60 ring-1 ring-white/10 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-white/60">
            Everything you need to know about our games and studio.
          </p>
        </motion.div>

        <div 
          className="space-y-4"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
