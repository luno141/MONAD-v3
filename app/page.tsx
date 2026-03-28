import { ArcadeNavbar } from "@/src/components/landing/arcade-navbar";
import { ArcadeHero } from "@/src/components/landing/arcade-hero";
import { HowItWorks } from "@/src/components/landing/how-it-works";
import { MonadFlexBanner } from "@/src/components/landing/monad-flex-banner";
import { LiveStatsStrip } from "@/src/components/landing/live-stats-strip";
import { LeaderboardPreview } from "@/src/components/landing/leaderboard-preview";
import { RelicGallery } from "@/src/components/landing/relic-gallery";
import { ArcadeFooter } from "@/src/components/landing/arcade-footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full relative">
      <ArcadeNavbar />
      <ArcadeHero />
      <HowItWorks />
      <MonadFlexBanner />
      <LiveStatsStrip />
      <LeaderboardPreview />
      <RelicGallery />
      <ArcadeFooter />
    </main>
  );
}
