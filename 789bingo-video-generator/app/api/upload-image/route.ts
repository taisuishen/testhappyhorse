export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        { error: "请上传图片" },
        { status: 400 }
      );
    }

    const fingerprint =
      process.env.BINGO_FINGERPRINT ||
      "72198a2079651758cad4629d7a3da949";

    // 固定 token
    const token = process.env.BINGO_TOKEN!;

    const uploadForm = new FormData();

    uploadForm.append("file", file);

    uploadForm.append("projectCode", "cx_sports");

    uploadForm.append("platformCode", "1");

    uploadForm.append("userId", "1027571");

    uploadForm.append("expireAfterDays", "0");

    const uploadResp = await fetch(
      "https://qa-upload.789bingo.com/api/upload/image",
      {
        method: "POST",

        headers: {
          accept: "application/json, text/plain, */*",

          origin: "https://qa-bo.789bingo.com",

          referer: "https://qa-bo.789bingo.com/",

          "x-fingerprint": fingerprint,

          "x-lang": "zh",

          "x-session-platform-code": "bingo",

          // 关键
          "x-session-token": token,
        },

        body: uploadForm,
      }
    );

    const uploadData = await uploadResp.json();

    console.log("uploadData:", uploadData);

    if (!uploadResp.ok || !uploadData?.success) {
      return Response.json(
        {
          error: "图片上传失败",

          detail: uploadData,
        },
        { status: 500 }
      );
    }

    const host = uploadData?.t?.resServerHost;

    const path = uploadData?.t?.path;

    return Response.json({
      imageUrl: `${host}${path}`,
    });
  } catch (e: any) {
    console.error(e);

    return Response.json(
      {
        error: e?.message || "上传失败",
      },
      { status: 500 }
    );
  }
}
