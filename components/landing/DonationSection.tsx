import type { LandingEvent } from './types'
import { ASSET_HERO_IMG1 } from './assets'
import { sanitizeUrl } from './sanitizeUrl'
import { SectionTitle } from './SectionTitle'

/*
 * Figma node 6055:4560 — "Donation" section.
 *
 * Desktop:
 *   Photo collage: left 466×358px + right column 2×(338×169px), gap 18px, rounded-[24px]
 *   Text below: Inter Regular 15px, text-center, #b7b5bb, line-height 24px
 *   "In partnership with": Satisfy 20px, #98969d, tracking 0.4px
 *   Partner logo: opacity 30%
 *
 * Mobile: same layout scaled down, photos stacked in 2-column grid.
 */

const DEFAULT_DONATION_TEXT =
  `Starting your investing journey can feel intimidating, especially when there's no perfect rubric to follow.\nIn this meet-up we will try to answer a few questions Starting your investing journey can feel intimidating, especially when there's no perfect rubric to follow. In this meet-up we will try to answer a few questions:`

export function DonationSection({ event }: { event: LandingEvent }) {
  const s = event.settings
  const img1 = sanitizeUrl(s?.donationImage1Url) || ASSET_HERO_IMG1
  const img2 = sanitizeUrl(s?.donationImage2Url) || ASSET_HERO_IMG1
  const img3 = sanitizeUrl(s?.donationImage3Url) || ASSET_HERO_IMG1
  const text = s?.donationText ?? DEFAULT_DONATION_TEXT
  const partnerName = s?.partnerName ?? 'Roastery Coffee'
  const partnerLogo = sanitizeUrl(s?.partnerLogoUrl) ?? null

  return (
    <>
      {/* ── Mobile ── */}
      <div className="w-full md:hidden px-4" style={{ paddingTop: 60 }}>
        <SectionTitle>Donation</SectionTitle>

        {/* Photo collage */}
        <div className="flex gap-2 w-full" style={{ marginTop: 20, height: 180 }}>
          <div className="flex-1 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={img1} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2" style={{ width: '38%' }}>
            <div className="flex-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={img2} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={img3} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Text */}
        <p style={{ marginTop: 18, fontFamily: '"Inter",sans-serif', fontWeight: 400, fontSize: 13, lineHeight: '22px', color: '#b7b5bb', textAlign: 'center' }}>
          {text}
        </p>

        {/* In partnership with */}
        <div className="flex flex-col items-center" style={{ marginTop: 36, gap: 20 }}>
          <p style={{ fontFamily: 'Satisfy,cursive', fontWeight: 400, fontSize: 16, color: '#98969d', letterSpacing: '0.32px', margin: 0 }}>
            In partnership with
          </p>
          {partnerLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Partner" src={partnerLogo} style={{ width: 210, height: 40, objectFit: 'contain' }} />
          ) : (
            <p style={{ fontFamily: '"Georgia",serif', fontWeight: 400, fontSize: 22, letterSpacing: '0.15em', color: '#fff', opacity: 0.3, margin: 0, textTransform: 'uppercase', textAlign: 'center' }}>
              {partnerName}
            </p>
          )}
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col items-center" style={{ paddingTop: 120 }}>
        <div style={{ width: 841 }}>
          <SectionTitle>Donation</SectionTitle>

          {/* Photo collage: gap 18px */}
          <div className="flex" style={{ marginTop: 32, gap: 18, height: 358 }}>
            {/* Large left — 466px */}
            <div className="overflow-hidden rounded-[24px]" style={{ width: 466, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={img1} className="w-full h-full object-cover" />
            </div>
            {/* Two stacked right — 338px each */}
            <div className="flex flex-col" style={{ gap: 18, width: 338, flexShrink: 0 }}>
              <div className="overflow-hidden rounded-[24px]" style={{ height: 169 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={img2} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[24px]" style={{ height: 169 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={img3} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Text below photos — Inter Regular 15px, centred */}
          <p style={{ marginTop: 18, fontFamily: '"Inter",sans-serif', fontWeight: 400, fontSize: 15, lineHeight: '24px', color: '#b7b5bb', textAlign: 'center' }}>
            {text}
          </p>

          {/* In partnership with — Satisfy 20px, #98969d, centred */}
          <div className="flex flex-col items-center" style={{ marginTop: 40, gap: 27 }}>
            <p style={{ fontFamily: 'Satisfy,cursive', fontWeight: 400, fontSize: 20, color: '#98969d', letterSpacing: '0.4px', margin: 0, textAlign: 'center' }}>
              In partnership with
            </p>
            {partnerLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Partner" src={partnerLogo} style={{ width: 420, height: 54, objectFit: 'contain' }} />
            ) : (
              <p style={{ fontFamily: '"Georgia",serif', fontWeight: 400, fontSize: 36, letterSpacing: '0.15em', color: '#fff', opacity: 0.3, margin: 0, textTransform: 'uppercase', textAlign: 'center' }}>
                {partnerName}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
