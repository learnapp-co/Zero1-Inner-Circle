import type { LandingEvent } from './types'
import { ASSET_HERO_IMG2, ASSET_CARD_ICON_DATE, ASSET_CARD_ICON_PASSES, ASSET_INFO_ICON } from './assets'
import { sanitizeUrl } from './sanitizeUrl'
import { SectionTitle } from './SectionTitle'

/*
 * Figma node 6055:4197 — "Upcoming events" section.
 * Card: 820×457px desktop / full-width mobile.
 * Event name rendered with 3-layer Gilroy ExtraBold shadow (orange → yellow → white).
 */

function StackedEventTitle({ name, size }: { name: string; size: 'sm' | 'lg' }) {
  const fs = size === 'lg' ? 29.681 : 22
  const offsets = size === 'lg' ? [4, 2, 0] : [3, 1.5, 0]
  const h = size === 'lg' ? 34 : 26
  const style: React.CSSProperties = {
    position: 'absolute', left: 0, top: 0, width: '100%',
    fontFamily: '"Gilroy-ExtraBold","Gilroy","Satoshi",sans-serif',
    fontWeight: 800, fontSize: fs, lineHeight: 1.1,
    textTransform: 'uppercase', whiteSpace: 'nowrap', margin: 0,
  }
  return (
    <div style={{ position: 'relative', height: h + offsets[0] }}>
      <p style={{ ...style, top: offsets[0], color: '#f57434' }}>{name}</p>
      <p style={{ ...style, top: offsets[1], color: '#f5bd34' }}>{name}</p>
      <p style={{ ...style, top: offsets[2], color: '#ffffff' }}>{name}</p>
    </div>
  )
}

export function UpcomingEvents({ event }: { event: LandingEvent }) {
  const cardImage = sanitizeUrl(event.settings?.eventCardImageUrl) || ASSET_HERO_IMG2
  const cardSubtitle = event.settings?.eventCardSubtitle ?? 'Curating the right mix of investments'

  return (
    <>
      {/* ── Mobile ── */}
      <div className="w-full md:hidden px-4" style={{ paddingTop: 40 }}>
        <SectionTitle>Upcoming events</SectionTitle>
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ marginTop: 20, aspectRatio: '820/457' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={cardImage}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager" fetchPriority="high" />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(15,7,26,0) 0%, rgba(15,7,26,0.705) 50%, #0f071a 100%)',
          }} />

          {/* Title overlay — top centre */}
          <div className="absolute flex flex-col items-center" style={{ top: 20, left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontStyle: 'italic', fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: 6 }}>
              ACTIVITY 1
            </p>
            <div style={{ transform: 'none' }}>
              <StackedEventTitle name={event.name} size="sm" />
            </div>
            <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 400, fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>
              {cardSubtitle}
            </p>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3" style={{ gap: 8 }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={ASSET_CARD_ICON_DATE} style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 12, lineHeight: 1.4, color: '#fff' }}>{event.date}</p>
                <div className="flex items-center" style={{ gap: 4 }}>
                  <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 12, color: '#fff' }}>{event.city}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={ASSET_INFO_ICON} style={{ width: 14, height: 14, opacity: 0.5 }} />
                </div>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={ASSET_CARD_ICON_PASSES} style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 12, lineHeight: 1.4, color: '#fff' }}>Only {event.maxCapacity} passes</p>
                <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 12, color: '#fff' }}>{event.price ?? '₹3,000'} + GST (you &amp; your +1)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col items-center" style={{ paddingTop: 80 }}>
        <div style={{ width: 820 }}>
          <SectionTitle>Upcoming events</SectionTitle>
          <div className="relative overflow-hidden rounded-3xl" style={{ marginTop: 24, width: 820, height: 457 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={cardImage}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager" fetchPriority="high" />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(15,7,26,0) 0%, rgba(15,7,26,0.6) 55%, #0f071a 100%)',
            }} />

            {/* Title overlay — top centre */}
            <div className="absolute flex flex-col items-center" style={{ top: 28, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: 420 }}>
              <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', marginBottom: 8 }}>
                ACTIVITY 1
              </p>
              <StackedEventTitle name={event.name} size="lg" />
              <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 400, fontStyle: 'italic', fontSize: 24, color: '#fff', marginTop: 8 }}>
                {cardSubtitle}
              </p>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between" style={{ padding: '0 22px 20px' }}>
              {/* Date + city */}
              <div className="flex items-center" style={{ gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={ASSET_CARD_ICON_DATE} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 16, lineHeight: 1.4, color: '#fff' }}>
                    {event.date}{event.time ? `, [${event.time}]` : ''}
                  </p>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 16, color: '#fff' }}>{event.city}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={ASSET_INFO_ICON} style={{ width: 24, height: 24, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
              {/* Passes + price */}
              <div className="flex items-center" style={{ gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={ASSET_CARD_ICON_PASSES} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 16, lineHeight: 1.4, color: '#fff' }}>Only {event.maxCapacity} passes</p>
                  <p style={{ fontFamily: 'Satoshi,sans-serif', fontWeight: 500, fontSize: 16, color: '#fff' }}>{event.price ?? '₹3,000'} + GST (you &amp; your +1)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
