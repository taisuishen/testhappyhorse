export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 10-second Korean KBO live baseball TV broadcast reaction-cam shot in 3:4 vertical aspect ratio, captured inside a crowded Korean professional baseball stadium during an intense late-game moment.

You must use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The "789Bingo" logo — including its font, color palette, glow effect, outline, brand styling, and premium visual identity — must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and character identity from [Image 2] consistently throughout the entire video — do NOT alter the face from [Image 2].

SHOT TYPE — ONE SINGLE CONTINUOUS LOCKED-OFF SHOT:
- The entire 10 seconds is ONE single continuous take from ONE single camera position. ABSOLUTELY NO camera cuts, no angle changes, no scene switches, no jump cuts, no multi-cam edits.
- The camera is essentially locked off on a tripod / steady long lens, with only the tiniest natural handheld micro-drift. No zoom, no pan, no dolly, no rack focus.
- Camera angle: NEAR-FRONTAL. Her body and face are turned almost directly toward the camera, with only a very slight ~10–15° offset to the side (basically a frontal portrait of her sitting in her seat). She is NOT in a 30° three-quarter angle, NOT in side profile. However, her EYES and GAZE are directed off to the side toward the baseball field — she does NOT look at the lens. Body squarely toward camera, eyes toward the game.
- Framing: WIDE FULL-BODY GROUP SHOT. The camera is pulled back enough to see her from head to feet/knees, including her full torso, both arms, lap, and her legs in the stadium seat. The shot must also clearly include 1–2 OTHER FANS sitting on EACH side of her (so at minimum 2–4 surrounding spectators are visible in the frame) plus a row of fans visible directly behind her. She is one person in a small group of stadium spectators, not isolated. Comfortable headroom above her head. DO NOT crop at the chest. DO NOT push in. DO NOT extreme close-up. DO NOT isolate her alone.
- Long telephoto sports lens look (135–200mm equivalent) from across the stadium so the background is compressed. The surrounding fans on either side of her are only LIGHTLY softened — still clearly recognizable as people in their own seats, not completely melted into bokeh. The deeper crowd behind them blurs into soft creamy bokeh.

SUBJECT BEHAVIOR (must remain low-key for all 10 seconds):
- She is intently focused on watching the baseball game, calm and serious.
- NO smiling. NO laughing. NO exaggerated reactions. NO open-mouth gasps. NO hand gestures. NO posing. NO direct eye contact with the camera.
- Only tiny, natural micro-expressions: slow blinks, soft steady breathing, very slight head tracking of the play, eyes shifting subtly, very faint lip movement. A small concerned/concentrated brow, neutral mouth.
- Her body stays mostly still in the seat; only minimal natural micro-movement.

THE SCENE HAS EXACTLY TWO GRAPHIC ELEMENTS — DO NOT CONFUSE THEM:

(A) TOP-OF-FRAME — KBO BASEBALL SCOREBOARD ONLY (NOT THE 789BINGO LOGO):
- Across the top ~12% of the screen there is a realistic Korean KBO TV scoreboard banner. This area contains ONLY the live game scoreboard. The 789Bingo logo from [Image 1] MUST NOT appear in this area or anywhere in the upper portion of the frame.
- Scoreboard layout: left side shows team abbreviation "LG" with score "3"; right side shows team abbreviation "SSG" with score "2"; center shows inning indicator "8회말 2아웃" (8th inning bottom, 2 outs); small clock "21:47"; a tiny red "LIVE" dot; a stylized "KBO 리그" wordmark.
- Hangul Korean typography, sharp anti-aliased TV broadcast style, semi-transparent dark gradient strip background.
- Scoreboard stays perfectly stable from 0s to 10s — do NOT drift, flicker, change scores, mistranslate text, expand to full screen, or appear anywhere outside the top strip.

(B) ON HER CLOTHING — 789BINGO BRAND PATCH ONLY (NOT IN THE TOP BANNER):
- She wears a casual KBO baseball-fan tee or light fitted jacket. Plain solid color (white, black, or her team's color), simple cotton fabric.
- The "789Bingo" brand logo from [Image 1] appears EXCLUSIVELY as a small embroidered or heat-printed patch on the upper-LEFT CHEST of her clothing (left chest from the camera's point of view). Roughly 4–6cm wide — about the size of a real chest emblem.
- The 789Bingo logo MUST ONLY appear on her chest fabric. It MUST NOT appear in the top scoreboard area, NOT in the background, NOT as a full-screen end card, NOT as a watermark, NOT as a floating overlay, NOT as a separate cutaway shot, NOT enlarged, NOT animated, NOT zoomed in. There is NO outro card and NO logo reveal moment at the end.
- The logo must match [Image 1] exactly in font, color, shape, glow effect, and premium appearance, and it must look naturally part of the fabric, with realistic folds and shading. It stays in the same spot on her chest for every single frame from 0s to 10s.

PLACEMENT SUMMARY (the model must obey this strictly):
- TOP of frame = KBO scoreboard (Korean text + LG vs SSG score). NEVER 789Bingo.
- CHEST of her shirt = small 789Bingo embroidered patch. NEVER full-screen, NEVER on top, NEVER in background.

LIGHTING:
- Realistic stadium LED lighting, cool white arena lights, night baseball game atmosphere.
- Natural skin tones, slight blue/cyan shadows, bright stadium highlights.

SURROUNDING FANS & BACKGROUND:
- 1–2 other fans sitting directly to her LEFT and 1–2 sitting directly to her RIGHT, all watching the game. They are clearly visible (not bokeh-melted) — you can see their faces, jackets, and posture, even if slightly softer than her. They are dressed as ordinary KBO fans (team tees, caps, light jackets, scarves) and do NOT wear the 789Bingo logo — that patch only exists on the central subject from [Image 2].
- One row of fans visible behind her, more softly blurred.
- Crowd subtly moving, occasional cheer sticks / light sticks. Live sports energy felt throughout.

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
789Bingo logo at the top of the frame, 789Bingo logo in the scoreboard area, 789Bingo replacing the scoreboard, 789Bingo as a top banner, 789Bingo as the KBO logo, 789Bingo full-screen, scoreboard replaced by 789Bingo, top banner showing 789Bingo, no Korean scoreboard, 789Bingo anywhere except the left chest of the shirt, side profile shot, hard side profile, three-quarter back angle, body turned away from camera, body facing 30 degrees away, headshot only, chest-up only, head and shoulders only, cropped at chest, cropped at waist, no full body, no legs visible, subject alone in frame, isolated subject, empty seats around her, no surrounding fans, surrounding fans completely blurred out, surrounding fans melted into bokeh, multiple shots, camera cut, hard cut, jump cut, angle change, scene change, zoom in, zoom out, dolly in, dolly out, pan, tilt, rack focus, extreme close-up, face-filling frame, lips-filling frame, smiling, smile, laughing, open mouth gasp, exaggerated reaction, dramatic expression, hand gestures, posing, looking at camera, direct eye contact, end card, outro card, logo reveal shot, full-screen logo, brand card, watermark overlay, floating logo, logo in background, enlarged logo, animated logo, logo zoom, missing scoreboard, missing top graphics, English-only scoreboard, wrong Korean text, scoreboard moving off the top strip, cinematic movie look, fashion photography, studio lighting, influencer aesthetic, perfect symmetry, anime, CGI look, plastic skin, beauty commercial, music video style, artificial posing, over-sharpened face, fake smile, dramatic Hollywood camera movement, low realism, generated-looking hands, face distortion, changing the face from [Image 2], changing the logo from [Image 1], misplaced logo, wrong logo position, logo distortion, text artifacts.
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
