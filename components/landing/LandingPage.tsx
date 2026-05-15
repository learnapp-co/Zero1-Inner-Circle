import type { LandingEvent } from './types'
import { LandingNav } from './LandingNav'
import { HeroSection } from './HeroSection'
import { UpcomingEvents } from './UpcomingEvents'
import { AboutSection } from './AboutSection'
import { ActivitiesGrid } from './ActivitiesGrid'
import { TimelineSection } from './TimelineSection'
import { SelectionCriteria } from './SelectionCriteria'
import { ThingsToKnow } from './ThingsToKnow'
import { DonationSection } from './DonationSection'
import { LandingFooter } from './LandingFooter'
import { MissionBar } from './MissionBar'

/*
 * Full expanded landing page — Figma node 6055:4051 (1440×6209px).
 * Renders every section, fully visible (no collapse).
 * Collapsed/show-more behaviour will be added separately once this is approved.
 *
 * Desktop section widths (from Figma):
 *   Nav bar: 1044px
 *   Hero: full bleed
 *   Upcoming Events card: 820px
 *   About: 820px
 *   Skills you'll learn: 820px
 *   Flow of the Event: 760px (with left/right card cols)
 *   Selection Process: 841px
 *   Things to Know: 841px
 *   Donation: 841px
 *   Footer: full width
 */
export function LandingPage({ event }: { event: LandingEvent }) {
  return (
    <div className="min-h-screen" style={{ background: '#0f071a' }}>

      {/* ── Sticky desktop nav ── */}
      <LandingNav event={event} />

      {/* ── Hero — full bleed ── */}
      <HeroSection event={event} />

      {/* ══════════════════════ MOBILE ══════════════════════ */}
      <div className="md:hidden w-full">

        <UpcomingEvents event={event} />

        <div className="px-4" style={{ paddingTop: 48 }}>
          <AboutSection event={event} />
        </div>

        <div style={{ height: 60 }} />
        <ActivitiesGrid event={event} />

        <TimelineSection event={event} />

        <div style={{ paddingTop: 60 }}>
          <SelectionCriteria event={event} />
        </div>

        <div style={{ paddingTop: 60 }}>
          <ThingsToKnow event={event} />
        </div>

        <DonationSection event={event} />

      </div>

      {/* ══════════════════════ DESKTOP ══════════════════════ */}
      <div className="hidden md:flex flex-col items-center w-full">

        {/* Upcoming Events — 820px centered */}
        <UpcomingEvents event={event} />

        {/* About the event — 820px */}
        <div style={{ width: 820, paddingTop: 80 }}>
          <AboutSection event={event} />
        </div>

        {/* Skills you'll learn — 820px */}
        <div style={{ width: 820, paddingTop: 100 }}>
          <ActivitiesGrid event={event} />
        </div>

        {/* Flow of the Event — 760px zig-zag */}
        <TimelineSection event={event} />

        {/* Selection Process — 841px */}
        <div style={{ width: 841, paddingTop: 100 }}>
          <SelectionCriteria event={event} />
        </div>

        {/* Things to Know — 841px */}
        <div style={{ width: 841, paddingTop: 100 }}>
          <ThingsToKnow event={event} />
        </div>

        {/* Donation */}
        <DonationSection event={event} />

        <div style={{ height: 80 }} />
      </div>

      {/* ── Footer — always visible ── */}
      <LandingFooter event={event} />

      {/* ── Mobile sticky CTA ── */}
      <MissionBar event={event} />
      <div className="md:hidden" style={{ height: 104 }} />
    </div>
  )
}
