'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SecureLayout from '@/components/secure/SecureLayout'
import WhistleblowerForm from '@/components/secure/WhistleblowerForm'
import VolunteerForm from '@/components/secure/VolunteerForm'

export default function SecurePage() {
    const [activeTab, setActiveTab] = useState<'whistleblower' | 'volunteer'>('whistleblower')

    return (
        <SecureLayout>
            <div className="flex justify-center mb-12">
                <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
                    <button
                        onClick={() => setActiveTab('whistleblower')}
                        className={`px-6 py-2 rounded-full transition-all text-sm font-bold ${activeTab === 'whistleblower'
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        صدای مردم 📢
                    </button>
                    <button
                        onClick={() => setActiveTab('volunteer')}
                        className={`px-6 py-2 rounded-full transition-all text-sm font-bold ${activeTab === 'volunteer'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        همکاری داوطلبانه 🤝
                    </button>
                </div>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'whistleblower' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === 'whistleblower' ? <WhistleblowerForm /> : <VolunteerForm />}
            </motion.div>
        </SecureLayout>
    )
}
