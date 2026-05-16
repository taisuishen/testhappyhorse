export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 10-second Korean KBO live baseball TV broadcast reaction-cam shot in 3:4 vertical aspect ratio, captured inside a crowded Korean professional baseball stadium during an intense late-game moment.

Use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The “789Bingo” logo, including font, color palette, glow effect, outline, premium styling, and visual identity, must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and identity consistently throughout the entire video.

SHOT STYLE:
Real live sports broadcast spectator-cam aesthetic.
The shot should feel like a distant telephoto lens capture from across the stadium, similar to celebrity spectator shots or viral sports-broadcast audience captures. The camera feels physically far away from the subject rather than placed directly in front of her face.

ONE SINGLE CONTINUOUS LOCKED-OFF SHOT:
The entire 10 seconds is one continuous take from one distant camera position. The camera is mounted on a stabilized long-lens broadcast rig with only tiny natural handheld micro drift.

LENS & DISTANCE:
Extreme long telephoto sports lens look, 200mm–400mm equivalent.
Strong background compression.
Realistic distant-camera perspective.
The framing should feel naturally captured from far away across the stadium rather than from close range.

CAMERA ANGLE:
Natural three-quarter spectator angle with approximately 25–35° side offset from her face direction.
Her body is slightly turned toward the baseball field.
Her eyes and gaze remain continuously focused on the game and never toward the lens.

FRAMING:
Medium telephoto spectator framing.
Show her from head to upper waist/thigh area while seated naturally.
Leave natural negative space around her.
Do not frame like a close portrait.
The camera should feel observational and detached.

The chest logo area remains clearly visible and unobstructed during the entire shot.

BACKGROUND:
Background spectators remain calm and quiet.
No cheering.
No waving.
No exaggerated reactions.
No crowd celebration.

The surrounding audience quietly watches the game with subtle natural movement only.
Soft crowd motion in the background.
Deep compressed stadium depth with creamy realistic bokeh.

SUBJECT BEHAVIOR:
She quietly watches the baseball game with calm concentration.
Natural micro-expressions only:
slow blinking,
steady breathing,
tiny eye tracking,
very subtle head movement,
neutral mouth expression,
slight focused brow tension.

No smiling.
No cheering.
No hand gestures.
No exaggerated emotion.

Her hands remain lowered naturally near her lap and never block the camera or chest logo.

TOP-OF-FRAME KBO SCOREBOARD:
A realistic Korean KBO TV scoreboard banner appears subtly across only the top 6–8% of the frame.

Scoreboard layout:
Left side:
LG logo + “LG” + score “3”

Right side:
SSG logo + “SSG” + score “2”

Center:
“8회말 2아웃”

Additional broadcast elements:
small clock “21:47”
tiny red LIVE dot
“KBO 리그” wordmark

Authentic Korean TV broadcast typography with a slim semi-transparent dark gradient strip background.

789Bingo LOGO PLACEMENT:
The 789Bingo logo appears as a small embroidered or heat-printed patch on the upper-left chest area of her clothing.
Approximately 4–6cm wide.
Realistic stitching, folds, shading, and natural fabric integration.
The logo remains fully visible and readable throughout the entire video.

WARDROBE:
Casual Korean baseball fan clothing in neutral or team colors.
Natural cotton fabric texture.
Realistic folds and stitching.

LIGHTING:
Realistic Korean baseball stadium LED lighting.
Cool white arena lights.
Night game atmosphere.
Natural skin tones.
Subtle blue/cyan stadium shadows.
Bright realistic stadium highlights.

STYLE & TEXTURE:
Ultra realistic live KBO television broadcast aesthetic.
Authentic sports spectator-cam realism.
Natural motion cadence.
Subtle digital TV compression.
Slight high-ISO broadcast noise.
Realistic TV sharpness.
Tiny natural motion blur.

TIMING:
0–2s:
She quietly watches the game with a slow blink.

2–4s:
Her eyes subtly track the play.

4–6s:
A small breath in, slight concentration increase.

6–8s:
Tiny head adjustment following the ball.

8–10s:
Eyes remain focused on the field with one final slow blink.

Throughout the entire 10 seconds:
camera position remains unchanged,
broadcast framing remains unchanged,
scoreboard remains unchanged,
789Bingo chest logo remains visible,
the atmosphere remains calm, observational, and realistic.

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
