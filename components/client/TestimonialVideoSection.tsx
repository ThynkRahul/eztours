"use client";

import { useRef, useState, useEffect } from "react";

interface VideoData {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

interface TestimonialVideoSectionProps {
  currentLocale: string;
}

const localeBasedVideoData: Record<string, VideoData[]> = {
  en: [
    {
      id: 1,
      title: "Great experience with Eaze Tours!",
      videoUrl: "/video/en/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excellent Service and Support",
      videoUrl: "/video/en/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Highly Recommend Their Packages",
      videoUrl: "/video/en/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
  ],
  es: [
    {
      id: 1,
      title: "¡Gran experiencia con Eaze Tours!",
      videoUrl: "/video/es/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excelente servicio y apoyo",
      videoUrl: "/video/es/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Recomiendo mucho sus paquetes",
      videoUrl: "/video/es/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
  ],
  fr: [
    {
      id: 1,
      title: "Super expérience avec Eaze Tours !",
      videoUrl: "/video/fr/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excellent service et soutien",
      videoUrl: "/video/fr/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Je recommande vivement leurs forfaits",
      videoUrl: "/video/fr/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
  ],
  de: [
    {
      id: 1,
      title: "Tolle Erfahrung mit Eaze Tours!",
      videoUrl: "/video/de/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Ausgezeichneter Service und Support",
      videoUrl: "/video/de/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Sehr zu empfehlen!",
      videoUrl: "/video/de/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
  ],
};

export default function TestimonialVideoSection({ currentLocale }: TestimonialVideoSectionProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideos, setPlayingVideos] = useState<boolean[]>([]);
  const [fullscreenStates, setFullscreenStates] = useState<boolean[]>([]);

  const videoData = localeBasedVideoData[currentLocale] || localeBasedVideoData["en"];

  useEffect(() => {
    setPlayingVideos(Array(videoData.length).fill(false));
    setFullscreenStates(Array(videoData.length).fill(false));
  }, [currentLocale]);

  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        const onLoadedMetadata = () => {
          try {
            video.currentTime = 1;
          } catch (err) {
            console.warn("Seek failed:", err);
          }
        };
        video.addEventListener("loadedmetadata", onLoadedMetadata);
        return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
      }
    });
  }, [videoData]);

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
        video.removeAttribute("controls");
      }
    });

    const selectedVideo = videoRefs.current[index];
    if (selectedVideo) {
      selectedVideo.play();
      selectedVideo.setAttribute("controls", "true");
      setPlayingVideos(videoRefs.current.map((_, i) => i === index));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const newStates = videoRefs.current.map(video => {
        const elem = document.fullscreenElement;
        return elem === video || elem === video?.parentElement;
      });
      setFullscreenStates(newStates);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex justify-center mt-8 mb-8 px-4">
      <div className="w-full max-w-screen-xl px-6 lg:px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.map((video, index) => (
            <div
              key={video.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform transform hover:scale-105"
            >
              <div
                className="relative w-full bg-black cursor-pointer"
                style={{ aspectRatio: "3 / 4" }}
                onClick={() => handlePlay(index)}
              >
                {/* Video */}
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  className={`absolute top-0 left-0 w-full h-full rounded-t-2xl z-10 ${
                    fullscreenStates[index] ? "object-contain" : "object-cover"
                  }`}
                  poster={video.thumbnail}
                  preload="metadata"
                  muted
                  playsInline
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>

                {/* Play Button Overlay */}
                {!playingVideos[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-[#025C7A]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
