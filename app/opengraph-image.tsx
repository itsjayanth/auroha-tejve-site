import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#07070a",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(110,86,248,0.5), transparent 45%), radial-gradient(circle at 85% 75%, rgba(169,150,255,0.35), transparent 45%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="ogMarkBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#6E56F8" />
                <stop offset="1" stopColor="#4429C9" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#ogMarkBg)" />
            <path
              d="M10.5 46L32 24L53.5 46"
              stroke="#FFFFFF"
              strokeWidth={7.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M32 8.5L38 14.5L32 20.5L26 14.5Z" fill="#FFFFFF" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, color: "#a2a2b3", fontWeight: 500 }}>
            Auroha Tejve
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            color: "#f4f4f7",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          We build the software behind modern commerce.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 26,
            color: "#a2a2b3",
            textAlign: "center",
          }}
        >
          Shopify Apps · Shopify Stores · B2B SaaS · AI Solutions
        </div>
      </div>
    ),
    { ...size }
  );
}
