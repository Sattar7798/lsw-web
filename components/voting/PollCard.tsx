'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Poll } from '@/data/polls'

export default function PollCard({ poll }: { poll: Poll }) {
    const [voted, setVoted] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [results, setResults] = useState(poll.options)
    const [total, setTotal] = useState(poll.totalVotes)

    // Fetch real-time votes on mount
    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const res = await fetch('/api/vote');
                const data = await res.json();

                // Update results with real data from server
                if (data) {
                    const newResults = poll.options.map(opt => ({
                        ...opt,
                        votes: data[opt.id] !== undefined ? data[opt.id] : opt.votes
                    }));
                    setResults(newResults);

                    // Recalculate total
                    const newTotal = newResults.reduce((acc, curr) => acc + curr.votes, 0);
                    setTotal(newTotal);
                }
            } catch (error) {
                console.error('Failed to fetch votes', error);
            }
        };

        fetchVotes();

        // Check local storage only for UI state (voted status), but trust server for counts
        const hasVoted = localStorage.getItem(`voted_${poll.id}`);
        if (hasVoted) {
            setVoted(true);
            setSelectedOption(hasVoted);
        }
    }, [poll.id, poll.options]);

    const handleVote = async (optionId: string) => {
        if (voted) return;

        // Optimistic UI update
        const previousResults = [...results];
        const previousTotal = total;

        const newResults = results.map(opt =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        setResults(newResults);
        setTotal(total + 1);
        setVoted(true);
        setSelectedOption(optionId);

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pollId: poll.id, optionId })
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Vote failed');
                // Revert state if failed
                setResults(previousResults);
                setTotal(previousTotal);
                setVoted(false);
                setSelectedOption(null);
                return;
            }

            // Persist local state
            localStorage.setItem(`voted_${poll.id}`, optionId);

        } catch (error) {
            console.error('Vote submission error', error);
            // Revert state
            setResults(previousResults);
            setTotal(previousTotal);
            setVoted(false);
            setSelectedOption(null);
        }
    };

    return (
        <div className="bg-[#292524] border border-[#d4af37]/20 rounded-xl p-6 shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-[#f5f5f4] mb-6 font-nastaliq leading-loose border-b border-white/5 pb-4">
                {poll.question}
            </h3>

            <div className="space-y-4">
                {results.map((option) => {
                    const percentage = Math.round((option.votes / total) * 100) || 0
                    const isSelected = selectedOption === option.id

                    return (
                        <div key={option.id} className="relative">
                            {/* Vote Button / Result Bar Container */}
                            <button
                                onClick={() => handleVote(option.id)}
                                disabled={voted}
                                className={`w-full relative h-14 rounded-lg border overflow-hidden transition-all duration-300 ${voted
                                    ? 'border-transparent bg-black/20 cursor-default'
                                    : 'border-white/10 bg-white/5 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 cursor-pointer'
                                    }`}
                            >
                                {/* Progress Bar (Only visible if voted) */}
                                {voted && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`absolute top-0 bottom-0 right-0 h-full ${isSelected
                                            ? 'bg-gradient-to-l from-[#d4af37] to-[#b4941f]'
                                            : 'bg-white/10'
                                            }`}
                                    />
                                )}

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex justify-between items-center px-4 z-10 w-full">
                                    <span className={`font-sans font-bold text-sm md:text-base flex items-center gap-2 ${voted && isSelected ? 'text-black mix-blend-hard-light' : 'text-[#e7e5e4]'
                                        }`}>
                                        {isSelected && <span className="text-[#d4af37] drop-shadow-md">✓</span>}
                                        {option.text}
                                    </span>

                                    {voted && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`font-mono text-sm font-bold ${isSelected ? 'text-black/80' : 'text-[#a8a29e]'
                                                }`}
                                        >
                                            {percentage}%
                                        </motion.span>
                                    )}
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-[#78716c] font-sans">
                <span>مجموع آراء: <span className="text-[#d4af37] font-mono text-sm">{total.toLocaleString('fa-IR')}</span></span>
                <span className="flex items-center gap-2 bg-[#15803d]/20 px-2 py-1 rounded-full border border-[#15803d]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                    <span className="text-[#4ade80]">نظرسنجی فعال</span>
                </span>
            </div>
        </div>
    )
}
