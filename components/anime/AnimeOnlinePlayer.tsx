"use client";

import { useEffect, useRef } from 'react';
import { MediaPlayer, MediaProvider, Track, type MediaPlayerInstance, type MediaProviderAdapter, type VideoProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

import JASSUB from 'jassub';

interface Props {
  src: string;
  subUrl: string;
  poster: string;
  title: string;
}

export default function AnimeOnlinePlayer({ src, subUrl, poster, title }: Props) {
  const player = useRef<MediaPlayerInstance>(null);
  const jassubRef = useRef<JASSUB | null>(null);
  const isInitialized = useRef(false);
  console.log("subUrl: ",subUrl)
  console.log("src: ",encodeURI(src))
  const onProviderChange = async (provider: MediaProviderAdapter | null) => {
    if (provider?.type === 'video' && !isInitialized.current) {
      const videoElement = (provider as VideoProvider).video;
      if (!videoElement) return;

      isInitialized.current = true;

      // Fetch subtitles manually to handle CORS/Errors gracefully
      let subContent: string | null = null;
      if (subUrl) {
        try {
          const response = await fetch(subUrl);
          if (response.ok) {
            subContent = await response.text();
          } else {
            console.error(`Subtitle fetch failed: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error("Subtitle fetch error (CORS?):", error);
        }
      }

      if (!subContent) {
        console.warn("No subtitle content available to initialize JASSUB.");
        return;
      }

      setTimeout(() => {
        if (jassubRef.current) {
          jassubRef.current.destroy();
        }

        try {
            jassubRef.current = new JASSUB({
            video: videoElement,
            subContent: subContent, // Use content instead of URL
            workerUrl: '/subtitles/jassub-worker.js',
            wasmUrl: '/subtitles/jassub-worker.wasm',
            fonts: [
                '/fonts/Vazir.woff2',
                '/fonts/B Koodak.woff2'
            ],
            fallbackFont: 'vazir', 
            availableFonts: {
                'b koodak': '/fonts/B Koodak.woff2',
                'bkoodak': '/fonts/B Koodak.woff2',
                'vazir': '/fonts/Vazir.woff2',
            },
            debug: false, 
            });
        } catch (e) {
            console.error("JASSUB initialization failed:", e);
        }
      }, 0);
    }
  };

  useEffect(() => {
    return () => {
      isInitialized.current = false;
      if (jassubRef.current) {
        jassubRef.current.destroy();
        jassubRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950 shadow-2xl border border-white/5">
      <MediaPlayer
        ref={player}
        title={title}
        src={{ 
          src, 
          type: "video/mp4" as const
        }}
        poster={poster}
        onProviderChange={onProviderChange}
        playsInline
        className="w-full h-full"
      >
        <MediaProvider>
            {/* Fallback track for non-ASS/mobile */}
            {subUrl && (
                <Track 
                    src={subUrl.replace('.ass', '.srt')} 
                    kind="subtitles" 
                    label="Farsi (Simple)" 
                    lang="fa" 
                />
            )}
        </MediaProvider>

        <PlyrLayout 
            icons={plyrLayoutIcons} 
            thumbnails={null}
        />
      </MediaPlayer>
    </div>
  );
}
