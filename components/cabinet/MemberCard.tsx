'use client'
import { CabinetMember } from '@/data/cabinet'
import { motion } from 'framer-motion'

interface MemberCardProps {
    member: CabinetMember;
    index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#1a1510] border border-[#3e342a] rounded-lg p-6 hover:border-[#c5a059] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,160,89,0.1)]"
        >
            {/* Top Secret Stamp */}
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="border-2 border-red-800 text-red-800 px-2 py-1 text-xs font-bold uppercase rotate-12 transform">
                    محرمانه
                </div>
            </div>

            <div className="flex items-start gap-4">
                {/* Avatar Placeholder */}
                <div className="w-16 h-16 rounded-full bg-[#0f0c09] border border-[#3e342a] flex items-center justify-center overflow-hidden shrink-0">
                    <span className="text-3xl grayscale opacity-50">👤</span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#e0dacd] mb-1 font-nastaliq group-hover:text-[#c5a059] transition-colors">
                        {member.role}
                    </h3>
                    <div className="h-0.5 w-12 bg-[#c5a059]/30 mb-2"></div>
                    <p className="text-sm text-[#8a8175] font-bold mb-3">
                        {member.name}
                    </p>
                    <p className="text-xs text-[#6b635a] leading-relaxed mb-4">
                        {member.bio}
                    </p>

                    {/* Priorities List */}
                    <div className="space-y-1">
                        <p className="text-[10px] text-[#c5a059] uppercase tracking-widest mb-1">اولویـت‌ها:</p>
                        {member.priorities.map((p, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#8a8175]">
                                <span className="w-1 h-1 bg-[#c5a059] rounded-full"></span>
                                {p}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
