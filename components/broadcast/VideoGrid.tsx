'use client'
import React from 'react'
import { broadcastData } from '@/data/broadcast'

export default function VideoGrid() {
    const archiveVideos = broadcastData.filter(v => !v.isLive)

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveVideos.map((video) => (
                <div key={video.id} className="group bg-[#1a1510] border border-white/10 rounded-lg overflow-hidden transition-all hover:border-red-600/50 hover:shadow-red-900/10">
                    <div className="relative aspect-video">
                        {/* Placeholder for real images */}
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-600">
                            🎬 {video.title}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                        </div>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                <span className="text-white text-xl">▶</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-red-500 font-bold uppercase tracking-wider">
                                {video.category}
                            </span>
                            <span className="text-xs text-gray-500">
                                {video.publishDate}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-200 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                            {video.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                            {video.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
