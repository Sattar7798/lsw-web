'use client'
import { DiplomaticDocument } from '@/data/diplomatic'
import { motion } from 'framer-motion'

interface StatementCardProps {
    statement: DiplomaticDocument;
    index: number;
}

export default function StatementCard({ statement, index }: StatementCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-matte-gold/30 hover:shadow-[0_0_20px_rgba(197,160,89,0.1)] overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${statement.status === 'Delivered' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                            statement.status === 'Sent' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                                'bg-gray-500'
                        }`}></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-matte-gold">
                        {statement.recipient}
                    </span>
                </div>

                <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded bg-black/20">
                    {statement.date}
                </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-gray-200 group-hover:text-white transition-colors mb-3 leading-tight">
                {statement.title}
            </h3>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                {statement.summary}
            </p>

            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    ID: {statement.id}
                </div>

                <button className="flex items-center gap-2 text-xs text-matte-gold font-bold uppercase tracking-wide group-hover:underline decoration-matte-gold/50 underline-offset-4">
                    Read Full Text
                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </motion.div>
    )
}
