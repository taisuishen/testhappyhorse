export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 10-second Korean KBO live baseball TV broadcast clip in 3:4 vertical aspect ratio, captured inside a crowded Korean professional baseball stadium during an intense late-game moment.

You must use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The "789Bingo" logo — including its font, color palette, glow effect, outline, brand styling, and premium visual identity — must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and character identity from [Image 2] consistently throughout the entire video — do NOT alter the face from [Image 2].

This is NOT one continuous shot. The video uses multiple live broadcast camera angles cut together like a real KBO television feed, with clean hard cuts between angles. The framing is observational and slightly distant — DO NOT push into extreme close-ups of the face; keep her face at a comfortable medium / medium-close framing as if shot from across the stands with a long sports telephoto lens.

PERSISTENT TOP-OF-FRAME BROADCAST GRAPHICS (visible on every shot):
- A realistic Korean KBO TV scoreboard banner pinned across the top ~12% of the screen.
- Layout: left team logo + abbreviation "LG" with score "3", right team logo + abbreviation "SSG" with score "2", center inning indicator "8회말 2아웃" (8th inning, bottom, 2 outs), small clock "21:47", a tiny "LIVE" red dot, and a stylized "KBO 리그" wordmark.
- Hangul Korean typography, sharp anti-aliased TV broadcast style, semi-transparent dark gradient strip background.
- Graphics stay perfectly stable and consistent across all camera cuts — do not drift, flicker, change scores, or mistranslate text.

SHOT LIST (5 cuts, 2 seconds each, hard cuts between shots):

- 0–2s — WIDE ESTABLISHING SHOT:
  Wide stadium overview from high upper deck. Bright white stadium LED lights, packed Korean crowd waving thundersticks, scoreboard graphics visible at the top. The subject is NOT featured yet. Slight handheld camera drift.

- 2–4s — MEDIUM CROWD SHOT:
  Camera at field level looking up into the stands, panning slowly across rows of fans cheering, blurred foreground railings. Telephoto compression. The subject is not yet visible.

- 4–6s — MEDIUM REACTION SHOT (subject introduction):
  Hard cut to the female spectator from [Image 2] sitting among the crowd, framed from chest up with some headroom and visible shoulders. She is NOT looking at the camera; she is watching the field. Long telephoto sports lens, shallow depth of field, creamy bokeh of the crowd behind her. Soft handheld instability. Tiny micro-expressions: slow blink, soft breath. Her clothing (casual baseball-fan tee or light jacket) clearly shows the "789Bingo" brand logo from [Image 1] on the upper-left chest area.

- 6–8s — 3/4 PROFILE CUT:
  Hard cut to a different camera angle on the same spectator — three-quarter profile from a slightly lower and side position, still medium framing (chest up), shoulders and upper torso visible. Slight subtle zoom-in. She bites her lip very slightly, eyes tracking the play. Logo on the chest remains clearly visible and stable, sharp, undistorted.

- 8–10s — PULL-BACK GROUP REACTION:
  Hard cut to a wider medium shot showing her plus 1–2 nearby fans reacting around her. The crowd energy rises, people behind her stand up or raise arms in slow motion. She lets out a small gasp / mouth slightly opens. Camera drifts gently. Logo on her chest still visible.

CAMERA & LENS STYLE:
- Live KBO TV sports broadcast camera operator behavior, multiple operators across the stadium.
- Long telephoto sports lenses, 135–300mm equivalent, very shallow depth of field, compressed stadium background, soft creamy bokeh.
- Slight handheld instability, tiny autofocus breathing, gentle live camera drift.
- Framing slightly imperfect, like a real sports director's live camera cut.
- Keep the subject at medium / medium-close distance — NEVER extreme close-up, NEVER face-filling the frame.

LIGHTING:
- Realistic stadium LED lighting, cool white arena lights, night baseball game atmosphere.
- Natural skin tones, slight blue/cyan shadows, bright stadium highlights.

SUBJECT WARDROBE & BRAND LOGO PLACEMENT:
- She wears a casual baseball-fan outfit (fitted team-style tee or light jacket).
- The "789Bingo" brand logo from [Image 1] is clearly placed on the upper-left chest area of the clothing in every shot that shows her, matching [Image 1] exactly in font, color, shape, glow effect, and premium appearance.
- The logo looks naturally printed or embroidered on the fabric — NOT floating, NOT in background, NOT distorted, NOT mirrored, NOT recolored.
- Logo stays stable, sharp, and consistent across every frame and every camera cut.

BACKGROUND:
- Crowded Korean baseball stadium audience, fans waving cheer sticks, light sticks, team flags.
- Occasional blurry cheering gestures, depth and realism in crowd movement, live sports energy.

STYLE & TEXTURE:
- Ultra realistic, live television broadcast aesthetic, authentic KBO sports reaction cam.
- Natural motion cadence, no dramatic acting, no cinematic Hollywood look.
- Slight digital broadcast compression, subtle high-ISO noise, realistic TV sharpness, tiny motion blur from live camera movement.

NEGATIVE PROMPT:
extreme close-up, face-filling frame, lips-filling frame, single continuous one-shot take, no camera cuts, missing scoreboard, missing top graphics, English-only scoreboard, wrong Korean text, cinematic movie look, fashion photography, studio lighting, influencer aesthetic, perfect symmetry, exaggerated emotions, overacting, anime, CGI look, plastic skin, beauty commercial, music video style, artificial posing, direct eye contact, over-sharpened face, fake smile, dramatic Hollywood camera movement, low realism, generated-looking hands, face distortion, changing the face from [Image 2], changing the logo from [Image 1], floating logo, misplaced logo, wrong logo position, logo distortion, text artifacts, watermark.
`;

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return Response.json({ error: "缺少 imageUrl" }, { status: 400 });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "DASHSCOPE_API_KEY 未配置" }, { status: 500 });
    }

    const createResp = await fetch(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-DashScope-Async": "enable",
        },
        body: JSON.stringify({
          model: "happyhorse-1.0-r2v",
          input: {
            prompt,
            media: [
              {
                type: "reference_image",
                url: "https://uat-img.789bingo.com/merchant/fbc05060-d7a2-4823-9ecf-29e25d9036bd.png",
              },
              {
                type: "reference_image",
                url: imageUrl,
              },
            ],
          },
          parameters: {
            resolution: "720P",
            ratio: "3:4",
            duration: 10,
          },
        }),
      }
    );

    const createData = await createResp.json();

    if (!createResp.ok) {
      return Response.json(createData, { status: createResp.status });
    }

    return Response.json(createData);
  } catch (error: any) {
    return Response.json({ error: error?.message || "生成接口异常" }, { status: 500 });
  }
}
