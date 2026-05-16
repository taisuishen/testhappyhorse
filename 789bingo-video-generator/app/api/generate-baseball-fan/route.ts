export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 10-second Korean KBO live baseball TV broadcast reaction-cam shot in 3:4 vertical aspect ratio, captured inside a crowded Korean professional baseball stadium during an intense late-game moment.

Use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The “789Bingo” logo, including font, color palette, glow effect, outline, premium styling, and visual identity, must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and identity consistently throughout the entire video.

ONE SINGLE CONTINUOUS LOCKED-OFF SHOT:
The entire 10 seconds is one continuous take from one camera position. The camera is locked on a tripod with only tiny natural handheld micro drift. Long telephoto sports lens look, 135mm–200mm equivalent. Very shallow depth of field with compressed stadium background and soft creamy bokeh.

CAMERA ANGLE:
Three-quarter front angle with a natural 20–30° side offset from her face direction. Her body is slightly angled toward the field rather than directly toward camera. Her eyes and gaze are continuously focused on the baseball field, never toward the lens. The shot should feel like a real sports broadcast spectator capture rather than a portrait setup.

FRAMING:
Medium-wide seated spectator framing. Show her clearly from head to upper legs/knees while seated naturally in the stadium chair. Keep both shoulders, torso, lap, and chest area fully visible during the entire video. Her hands stay naturally lowered near her lap or seat armrest and never block the chest logo or camera view.

Include 1–2 spectators seated on both sides of her and a visible row of fans behind her. Maintain natural spacing and realistic stadium crowd composition.

789Bingo LOGO VISIBILITY:
The 789Bingo chest logo must remain fully visible and readable during the entire 10 seconds. Place the logo clearly on the upper-left chest area of her clothing with enough lighting and camera angle visibility for the branding to be recognizable at all times.

The logo appears as a realistic embroidered or heat-printed chest patch integrated naturally into the fabric with stitching, folds, and shading.

TOP-OF-FRAME KBO SCOREBOARD:
A smaller and more realistic Korean KBO TV scoreboard banner appears across only the top 6–8% of the frame. The scoreboard should feel subtle and proportional like a real television broadcast overlay rather than dominating the screen.

Scoreboard layout:
Left side:
LG logo + “LG” + score “3”

Right side:
SSG logo + “SSG” + score “2”

Center:
“8회말 2아웃”

Additional elements:
small clock “21:47”
tiny red LIVE dot
“KBO 리그” wordmark

Use authentic Korean TV broadcast typography with a slim semi-transparent dark gradient strip background.

SUBJECT BEHAVIOR:
She is calmly and seriously focused on the baseball game with authentic micro-expressions only:
slow blinking,
steady breathing,
subtle eye tracking,
tiny head movement following the play,
slight concentrated brow tension,
neutral mouth expression.

Her posture remains relaxed and natural throughout the shot.

WARDROBE:
Casual Korean baseball fan shirt or fitted light jacket in solid neutral or team colors with natural cotton texture and realistic folds.

LIGHTING:
Realistic stadium LED lighting.
Cool white arena lights.
Night baseball atmosphere.
Natural skin tones.
Subtle blue/cyan shadows.
Bright stadium highlights.

BACKGROUND:
Crowded Korean baseball stadium audience with subtle movement, occasional cheer sticks, and realistic live sports atmosphere. Nearby spectators remain recognizable while deeper background crowds fall into softer bokeh.

STYLE & TEXTURE:
Ultra realistic live KBO television broadcast aesthetic.
Authentic sports reaction cam.
Natural motion cadence.
Subtle digital TV compression.
Slight high-ISO broadcast noise.
Realistic TV sharpness.
Tiny natural motion blur.

TIMING:
0–2s:
She calmly watches the field with a slow blink.

2–4s:
Her eyes subtly follow the play with slight brow concentration.

4–6s:
A tiny breath in, gaze becomes more focused.

6–8s:
Slight head tilt tracking the ball.

8–10s:
Eyes remain locked on the field with one final slow blink.

Throughout the entire 10 seconds:
camera position remains unchanged,
framing remains unchanged,
scoreboard remains unchanged,
789Bingo chest logo remains visible and unobstructed.

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
