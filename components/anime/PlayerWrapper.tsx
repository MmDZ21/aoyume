"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { EpisodesList, Episode } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AnimeOnlinePlayer = dynamic(
    () => import('@/components/anime/AnimeOnlinePlayer'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full aspect-video bg-gray-900 rounded-xl animate-pulse flex items-center justify-center text-gray-500">
                در حال بارگذاری پلیر...
            </div>
        )
    }
);

/** Encode URL only if it doesn't already contain percent-encoded sequences (avoids double encoding). */
function encodeUrlIfNeeded(url: string): string {
    if (/%[0-9A-Fa-f]{2}/.test(url)) return url;
    return encodeURI(url);
}

interface PlayerWrapperProps {
    episodes: EpisodesList;
}

export default function PlayerWrapper({ episodes }: PlayerWrapperProps) {
    const [selectedQuality, setSelectedQuality] = useState<string>(episodes[0]?.quality || "");
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(episodes[0]?.episodes?.[0] || null);
    const [prevAnimeId, setPrevAnimeId] = useState<number | undefined>(episodes[0]?.episodes?.[0]?.anime_id);

    const currentAnimeId = episodes[0]?.episodes?.[0]?.anime_id;

    // Reset selection when anime changes (Derived State Pattern)
    if (currentAnimeId !== prevAnimeId) {
        setPrevAnimeId(currentAnimeId);
        if (episodes.length > 0) {
            const firstGroup = episodes[0];
            const firstEp = firstGroup?.episodes?.[0];
            if (firstEp) {
                 setSelectedQuality(firstGroup.quality);
                 setSelectedEpisode(firstEp);
            }
        }
    }

    const currentEpisodes = useMemo(() => {
        return episodes.find(g => g.quality === selectedQuality)?.episodes || [];
    }, [episodes, selectedQuality]);

    const handleEpisodeSelect = (episode: Episode) => {
        setSelectedEpisode(episode);
    };

    if (!episodes || episodes.length === 0) {
        return <div className="text-center p-4">هنوز قسمتی آپلود نشده است.</div>;
    }

    // Prepare player props
    const videoSrc = selectedEpisode?.direct_link || "";
    
    // Debugging logs
    console.log("Selected Episode:", selectedEpisode);
    console.log("Subtitles raw:", selectedEpisode?.subtitles);

    // Choose the first subtitle if available, preferably Persian
    // Ensure subtitles is an array before trying to find/access
    const subtitles = Array.isArray(selectedEpisode?.subtitles) ? selectedEpisode.subtitles : [];
    
    const subtitleUrl = subtitles.find((s: { url: string; lang: string }) => s.lang === 'per')?.url || 
                        subtitles[0]?.url || 
                        "";
    
    console.log("Selected Subtitle URL (relative):", subtitleUrl);

    const poster = selectedEpisode?.thumbnail || "";
    const title = `قسمت ${selectedEpisode?.number}`;

    const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL || 'https://dl.aoyume.ir';
    const subtitlePathPrefix = process.env.NEXT_PUBLIC_SUBTITLES_PATH ?? '';
    const subtitleBase = subtitlePathPrefix ? `${fileBaseUrl}/${subtitlePathPrefix}` : fileBaseUrl.replace(/\/$/, '');
    const fullSubtitleUrl = subtitleUrl 
        ? (subtitleUrl.startsWith("http") ? encodeUrlIfNeeded(subtitleUrl) : encodeUrlIfNeeded(`${subtitleBase}/${subtitleUrl}`))
        : "";

    console.log("Full Subtitle URL:", fullSubtitleUrl);

    return (
        <div className="flex flex-col gap-4">
             {selectedEpisode ? (
                <AnimeOnlinePlayer
                    src={videoSrc}
                    poster={poster}
                    subUrl={fullSubtitleUrl}
                    title={title}
                    key={selectedEpisode.id}
                />
            ) : (
                <div className="w-full aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-slate-500">
                    لطفا یک قسمت را انتخاب کنید
                </div>
            )}

            <div className="bg-card border rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {episodes.map((group) => (
                        <Button
                            key={group.quality}
                            variant={selectedQuality === group.quality ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedQuality(group.quality)}
                        >
                            {group.quality}
                        </Button>
                    ))}
                </div>

                <div className="h-60 w-full overflow-y-auto rounded-md border p-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {currentEpisodes.map((episode) => (
                            <div 
                                key={episode.id}
                                className={cn(
                                    "cursor-pointer rounded-lg border p-2 hover:bg-accent transition-colors flex flex-col gap-2",
                                    selectedEpisode?.id === episode.id ? "bg-accent border-primary" : ""
                                )}
                                onClick={() => handleEpisodeSelect(episode)}
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                    {episode.thumbnail ? (
                                        <Image
                                            src={episode.thumbnail}
                                            alt={`Episode ${episode.number}`}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                            No Thumb
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm font-medium text-center">
                                    قسمت {episode.number}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
