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
            className="bg-white border text-black border-gray-100 p-6 rounded shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-1 block">
                        {statement.recipient}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug">
                        {statement.title}
                    </h3>
                </div>
                <div className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wide ${statement.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        statement.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                    }`}>
                    {statement.status}
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {statement.summary}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-400 font-mono border-t border-gray-100 pt-4">
                <span>Ref: {statement.id}</span>
                <span className="flex items-center gap-2 group-hover:text-[#c5a059] transition-colors cursor-pointer">
                    View Document ({statement.language}) ↗
                </span>
            </div>
        </motion.div>
    )
}
