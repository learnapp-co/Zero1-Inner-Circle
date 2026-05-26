import { prisma } from '@/lib/prisma'
import { LandingPage } from '@/components/landing/LandingPage'
import type { LandingEvent } from '@/components/landing/types'

export const dynamic = 'force-dynamic'

async function getEvent(): Promise<LandingEvent | null> {
  try {
    const event = await prisma.event.findFirst({
      orderBy: { createdAt: 'desc' },
      include: { settings: true },
    })
    if (!event) return null

    // Stale Prisma module workaround: inject fields the in-memory module doesn't SELECT
    if (event.settings) {
      const raw = await prisma.$queryRaw<Array<{ selectionProcess: unknown; missionFormEnabled: boolean; missionFormButtonText: string | null }>>`
        SELECT "selectionProcess", "missionFormEnabled", "missionFormButtonText" FROM "EventSettings" WHERE "eventId" = ${event.id}
      `
      if (raw[0] !== undefined) {
        ;(event.settings as Record<string, unknown>).selectionProcess = raw[0].selectionProcess
        ;(event.settings as Record<string, unknown>).missionFormEnabled = raw[0].missionFormEnabled
        ;(event.settings as Record<string, unknown>).missionFormButtonText = raw[0].missionFormButtonText
      }
    }

    const s = event.settings
    return {
      id: event.id,
      name: event.name,
      date: event.date,
      time: event.time,
      city: event.city,
      venue: event.venue,
      price: event.price ?? null,
      maxCapacity: event.maxCapacity,
      heroImageUrl: event.heroImageUrl ?? null,
      settings: s
        ? {
            accentColor: s.accentColor,
            allowPlusOne: s.allowPlusOne,
            logoUrl: s.logoUrl ?? null,
            missionFormUrl: s.missionFormUrl ?? null,
            missionFormEnabled: s.missionFormEnabled,
            missionFormButtonText: (s as Record<string, unknown>).missionFormButtonText as string | null ?? null,
            instagramUrl: s.instagramUrl ?? null,
            emailAddress: s.emailAddress ?? null,
            aboutText: s.aboutText ?? null,
            sessionDescription: s.sessionDescription ?? null,
            partnerLogoUrl: s.partnerLogoUrl ?? null,
            partnerName: s.partnerName ?? null,
            navLogoUrl: s.navLogoUrl ?? null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            activities: Array.isArray(s.activities) ? (s.activities as any[]) : null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            timeline: Array.isArray(s.timeline) ? (s.timeline as any[]) : null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            thingsToKnow: Array.isArray(s.thingsToKnow) ? (s.thingsToKnow as any[]) : null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectionProcess: Array.isArray(s.selectionProcess) ? (s.selectionProcess as any[]) : null,
            heroSubtitle: s.heroSubtitle ?? null,
            eventAbout: s.eventAbout ?? null,
            eventCardImageUrl: s.eventCardImageUrl ?? null,
            eventCardSubtitle: s.eventCardSubtitle ?? null,
            donationText: s.donationText ?? null,
            donationImage1Url: s.donationImage1Url ?? null,
            donationImage2Url: s.donationImage2Url ?? null,
            donationImage3Url: s.donationImage3Url ?? null,
          }
        : null,
    }
  } catch {
    return null
  }
}

const DEFAULT_EVENT: LandingEvent = {
  id: '',
  name: 'Zero1 Money Circle',
  date: 'June 2025',
  time: '11 AM – 3 PM',
  city: 'Mumbai',
  venue: 'TBD — sent 24 hrs before',
  price: '₹3,000',
  maxCapacity: 30,
  heroImageUrl: null,
  settings: null,
}

export default async function RootPage() {
  const event = await getEvent()
  return <LandingPage event={event ?? DEFAULT_EVENT} />
}
