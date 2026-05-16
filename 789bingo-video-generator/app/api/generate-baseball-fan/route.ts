export const runtime = "nodejs";

const prompt = `
Hyper realistic Korean KBO baseball stadium audience-cam shot, 10 seconds, vertical 4:3.

Use [Image 1] as the exact 789Bingo logo reference.
Use [Image 2] as the exact face and identity reference for the female spectator.

Style:
Real live sports broadcast audience-cam, similar to concert jumbotron or baseball stadium big-screen crowd capture.

The female spectator is NOT isolated or framed like a main character.
She appears naturally as one person among many spectators in the crowd.

Shot from far away with a long telephoto sports broadcast lens (200mm–400mm), creating realistic stadium compression and distant candid capture feeling.

One single continuous locked-off shot.
Tiny natural live-broadcast micro drift only.

Camera angle:
Front-facing audience angle.
She looks toward the baseball field, never at the camera.

Framing:
Wide crowd framing.
The female spectator occupies only a moderate portion of the frame.
Clearly show multiple surrounding spectators sitting beside and behind her.
The scene should feel like a real random audience capture during a live baseball broadcast.

The crowd is equally important in composition.
Do not isolate the woman from the surrounding audience.

789Bingo logo:
Small embroidered 789Bingo logo on upper-left chest area of her shirt.
Clearly visible but naturally integrated into the clothing.

Expression:
Calm and focused watching the game.
No exaggerated emotion.
No cheering.
No smiling.
Only subtle blinking, breathing, and tiny eye movement.

Background:
Quiet Korean baseball crowd with subtle natural movement.
No dramatic reactions.
Soft telephoto compression and creamy stadium bokeh.

Top overlay:
Small realistic Korean KBO broadcast scoreboard at the top:
LG 3 — SSG 2
8회말 2아웃
21:47
LIVE
KBO 리그

Lighting:
Realistic Korean stadium LED lighting at night.
Natural skin tones.
Live TV broadcast texture.
Subtle digital compression and high-ISO sports broadcast noise.

Ultra realistic sports broadcast aesthetic.
Natural candid spectator capture.
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
            ratio: "4:3",
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
