import React, { useState } from 'react';
import {
  Bot, Send, Sparkles, FileText, CheckCircle2,
  AlertTriangle, ShieldCheck, HelpCircle, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { AssistantResponse } from '../types';

interface AiAssistantPageProps {
  onNavigate: (route: string) => void;
  currentDepth: number;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  onNavigate,
  currentDepth
}) => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; data?: AssistantResponse }>>([
    {
      sender: 'assistant',
      text: "DRISHTI Engineering Copilot online. I am grounded exclusively on historical offset-well DDR reports, WellTwin telemetry, and OISD safety references. Ask me about upcoming risk intervals, offset precedents, or active anomaly evidence.",
      data: undefined
    }
  ]);

  const suggestedQuestions = [
    "Why should I be concerned about the next 100m?",
    "What happened around 2850m in nearby wells?",
    "Which historical well is most similar to X01?",
    "Show evidence and sources for the current active alert",
    "What safety references apply to stuck pipe prevention?"
  ];

  const handleSend = async (qText?: string) => {
    const q = (qText || queryInput).trim();
    if (!q || isLoading) return;

    setQueryInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setIsLoading(true);

    try {
      const res = await api.queryAssistant(q, 'X01', currentDepth);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: res.answer,
          data: res
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: "The prototype knowledge base does not contain enough verifiable evidence to answer this reliably."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-[#4DA3FF]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              DRISHTI Engineering Copilot
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              RAG DECISION SUPPORT
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Evidence-grounded operational reasoning strictly anchored in verified Daily Drilling Reports & OISD guidelines
          </p>
        </div>

        <span className="text-xs font-mono text-[#8C9AB5] px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          Grounded on 15 Offset Wells
        </span>
      </div>

      {/* Suggested Questions Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-[#8C9AB5] flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#4DA3FF]" />
          <span>SUGGESTED PROMPTS:</span>
        </span>
        {suggestedQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sq)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/[0.04] text-[#F5F8FF] hover:text-[#7CC4FF] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all text-left"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl space-y-6 min-h-[460px] flex flex-col justify-between">
        <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-3xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#4DA3FF] text-[#030817] font-semibold rounded-tr-sm'
                    : 'bg-[#030817] text-[#F5F8FF] border border-white/[0.08] rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Evidence & Sources Citation Box if returned by RAG engine */}
                {msg.data && msg.data.sources && msg.data.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#4DA3FF]">
                      <span className="font-bold flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>VERIFIABLE CITATION SOURCES:</span>
                      </span>
                      <span>Confidence: {msg.data.confidence}%</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.data.sources.map((src, sIdx) => (
                        <div key={sIdx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] text-[11px]">
                          <div className="font-mono font-bold text-[#7CC4FF]">
                            {src.document} — Page {src.page}
                          </div>
                          <div className="text-[#8C9AB5] text-[10px] mt-0.5">{src.section}</div>
                          <div className="text-white italic text-[10px] mt-1 border-l-2 border-[#4DA3FF]/40 pl-1.5">
                            "{src.excerpt}"
                          </div>
                        </div>
                      ))}
                    </div>

                    {msg.data.suggested_actions && (
                      <div className="pt-2 text-[11px] text-[#F5F8FF]">
                        <span className="font-bold text-[#42D6A4]">Recommended Engineer Actions:</span>
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#8C9AB5]">
                          {msg.data.suggested_actions.map((act, aIdx) => (
                            <li key={aIdx}>{act}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs font-mono text-[#7CC4FF] p-3 rounded-xl bg-[#030817] border border-white/[0.06] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-ping" />
              <span>Retrieving offset well records & evaluating evidence...</span>
            </div>
          )}
        </div>

        {/* Query Input Bar */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask a technical drilling question (e.g. 'Why should I be concerned about the next 100m?')"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-[#030817] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-[#8C9AB5] focus:outline-none focus:border-[#4DA3FF] font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={!queryInput.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF] disabled:opacity-40 disabled:pointer-events-none font-semibold text-xs transition-all shadow-glow-blue flex items-center space-x-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
