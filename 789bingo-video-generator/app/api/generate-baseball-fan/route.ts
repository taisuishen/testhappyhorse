export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 10-second Korean KBO live baseball TV broadcast reaction-cam shot in 3:4 vertical aspect ratio, captured inside a crowded Korean professional baseball stadium during an intense late-game moment.

You must use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The "789Bingo" logo — including its font, color palette, glow effect, outline, brand styling, and premium visual identity — must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and character identity from [Image 2] consistently throughout the entire video — do NOT alter the face from [Image 2].

SHOT TYPE — ONE SINGLE CONTINUOUS LOCKED-OFF SHOT:
- The entire 10 seconds is ONE single continuous take from ONE single camera position. ABSOLUTELY NO camera cuts, no angle changes, no scene switches, no jump cuts, no multi-cam edits.
- The camera is essentially locked off on a tripod / steady long lens, with only the tiniest natural handheld micro-drift. No zoom, no pan, no dolly, no rack focus.
- Camera angle: positioned roughly 30 degrees off her facing direction (three-quarter front view, NOT straight-on profile, NOT directly facing the camera). She is looking forward and slightly past the camera toward the field — her face is angled about 30° away from the lens axis.
- Framing: medium shot. Head, shoulders, and full upper chest visible with comfortable headroom and air on the sides. DO NOT push in. DO NOT extreme close-up. DO NOT face-filling the frame.
- Long telephoto sports lens look (135–200mm equivalent), very shallow depth of field, soft creamy bokeh of the crowd behind her.

SUBJECT BEHAVIOR (must remain low-key for all 10 seconds):
- She is intently focused on watching the baseball game, calm and serious.
- NO smiling. NO laughing. NO exaggerated reactions. NO open-mouth gasps. NO hand gestures. NO posing. NO direct eye contact with the camera.
- Only tiny, natural micro-expressions: slow blinks, soft steady breathing, very slight head tracking of the play, eyes shifting subtly, very faint lip movement. A small concerned/concentrated brow, neutral mouth.
- Her body stays mostly still in the seat; only minimal natural micro-movement.

PERSISTENT TOP-OF-FRAME BROADCAST GRAPHICS (must appear from 0s to 10s, never disappear, never expand):
- A realistic Korean KBO TV scoreboard banner pinned across the TOP ~12% of the screen ONLY. The banner must stay confined to that top strip the entire time.
- Layout: left team logo + abbreviation "LG" with score "3", right team logo + abbreviation "SSG" with score "2", center inning indicator "8회말 2아웃" (8th inning bottom, 2 outs), small clock "21:47", a tiny red "LIVE" dot, and a stylized "KBO 리그" wordmark.
- Hangul Korean typography, sharp anti-aliased TV broadcast style, semi-transparent dark gradient strip background.
- Graphics stay perfectly stable and consistent — do NOT drift, flicker, change scores, mistranslate text, expand to full screen, or appear anywhere outside the top strip.

WARDROBE & BRAND LOGO PLACEMENT — STRICT RULES:
- She wears a casual KBO baseball-fan tee or light fitted jacket. Plain solid color (white, black, or her team's color), simple cotton fabric.
- The "789Bingo" brand logo from [Image 1] is clearly EMBROIDERED or HEAT-PRINTED onto the upper-LEFT CHEST area of the clothing (left chest from the camera's point of view), small in scale — about the size of a real chest emblem, roughly 4–6cm wide.
- The logo MUST exist ONLY on her chest fabric. The logo MUST NEVER appear anywhere else: NOT in the background, NOT as a full-screen end card, NOT as a watermark, NOT as a floating overlay, NOT as a separate cutaway shot, NOT enlarged, NOT animated, NOT zoomed in. There is NO outro card and NO logo reveal moment at the end.
- The logo must match [Image 1] exactly in font, color, shape, glow effect, and premium appearance, and it must look naturally part of the fabric, with realistic folds and shading. It stays in the same spot on her chest for every single frame from 0s to 10s.

LIGHTING:
- Realistic stadium LED lighting, cool white arena lights, night baseball game atmosphere.
- Natural skin tones, slight blue/cyan shadows, bright stadium highlights.

BACKGROUND:
- Crowded Korean baseball stadium audience behind her, slightly blurred by shallow depth of field.
- Fans subtly moving, occasional blurry cheer sticks / light sticks. Live sports energy is felt but kept in the background.

STYLE & TEXTURE:
- Ultra realistic, live KBO television broadcast aesthetic, authentic sports reaction cam.
- Natural motion cadence, no dramatic acting, no cinematic Hollywood look.
- Slight digital broadcast compression, subtle high-ISO noise, realistic TV sharpness, tiny motion blur from natural micro camera movement.

TIMING (10 seconds, ONE shot only, only her micro-expression evolves):
- 0–2s: she is calmly watching the field, slow blink, neutral mouth.
- 2–4s: eyes follow the play, very subtle brow concentration.
- 4–6s: tiny breath in, gaze tightens, no smile.
- 6–8s: faint head tilt as she tracks the ball, mouth still closed and neutral.
- 8–10s: eyes still locked on field, one slow blink, no expression change.
Throughout: camera position, framing, scoreboard, and chest logo are unchanged.

NEGATIVE PROMPT:
multiple shots, camera cut, hard cut, jump cut, angle change, scene change, zoom in, zoom out, dolly in, dolly out, pan, tilt, rack focus, extreme close-up, face-filling frame, lips-filling frame, smiling, smile, laughing, open mouth gasp, exaggerated reaction, dramatic expression, hand gestures, posing, looking at camera, direct eye contact, end card, outro card, logo reveal shot, full-screen logo, brand card, watermark overlay, floating logo, logo in background, enlarged logo, animated logo, logo zoom, missing scoreboard, missing top graphics, English-only scoreboard, wrong Korean text, scoreboard moving off the top strip, cinematic movie look, fashion photography, studio lighting, influencer aesthetic, perfect symmetry, anime, CGI look, plastic skin, beauty commercial, music video style, artificial posing, over-sharpened face, fake smile, dramatic Hollywood camera movement, low realism, generated-looking hands, face distortion, changing the face from [Image 2], changing the logo from [Image 1], misplaced logo, wrong logo position, logo distortion, text artifacts.
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
