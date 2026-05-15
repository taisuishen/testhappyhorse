export const runtime = "nodejs";

const prompt = `
Create a cinematic ultra-detailed vertical fantasy video in 3:4 aspect ratio.

You must use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The "789Bingo" logo, font style, color palette, glow effect, outline, brand styling, and premium visual identity must match [Image 1] exactly.

[Image 2] is the uploaded character reference image. The main character must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, temperament, body proportions, clothing design, accessories, and overall visual identity.

Preserve the original headdress, hairstyle, clothing, accessories, and character identity from [Image 2] consistently throughout the entire video.

The character is gently leaning beneath an enormous blooming cherry blossom tree. She holds a fresh red rose in her right hand while slightly lowering her head and softly smelling the flower. Her expression is calm, emotional, elegant, romantic, and slightly melancholic.

The character appears in a semi-silhouette cinematic effect, with soft translucent facial lighting, clear delicate facial features, realistic skin texture, glowing eyes, and no dark muddy shadows on the face.

Use cinematic golden-hour backlighting with warm sunset rim light outlining the character's silhouette while softly illuminating facial details.

The background features a magnificent European vintage clock tower completely covered with blooming roses and climbing rose vines. Architectural details, windows, and vintage structure remain subtly visible beneath the flowers and vines.

Pink cherry blossom petals drift naturally through the air. The scene should feel extremely detailed, dreamy, romantic, elegant, and cinematic.

Place the "789Bingo" brand logo from [Image 1] on the upper-left chest area of the character's clothing from [Image 2]. The logo must match [Image 1] exactly in font, color, shape, logo styling, glow effect, and premium appearance. It must look naturally printed or embroidered on the clothing, not floating in the air, not placed in the background, not distorted.

Video duration: 5 seconds.
Camera movement: slow cinematic push-in.
Motion: subtle floating sakura petals, gentle hair movement, soft cloth movement, rose petals swaying slightly.
Style: Douyin viral fantasy video, cinematic romantic fantasy, ultra realistic, luxury commercial advertisement, film-grade lighting, highly detailed.

Negative prompt: low quality, blurry face, distorted anatomy, bad hands, extra fingers, duplicate body, mutated face, dark face, overexposed skin, flat lighting, cartoon, low detail, cropped head, broken limbs, messy background, floating logo, misplaced logo, wrong logo position, text artifacts, watermark, logo distortion, oversaturated colors, unrealistic eyes, ugly hands, bad proportions, low resolution, changing the face from [Image 2], changing the outfit from [Image 2], changing the logo from [Image 1].
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
          //model:"wan2.7-i2v-2026-04-25",
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
            duration: 5
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
