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
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6E56F8, #4429C9)",
              color: "white",
              fontSize: 24,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            AT
          </div>
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
