export const runtime = "nodejs";

function getTokenFromLoginResponse(
  loginData: any
): string | undefined {
  return loginData?.t?.token;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "请上传图片" }, { status: 400 });
    }

    const account = process.env.BINGO_ACCOUNT;
    const password = process.env.BINGO_PASSWORD;
    const fingerprint = process.env.BINGO_FINGERPRINT || "72198a2079651758cad4629d7a3da949";

    if (!account || !password) {
      return Response.json({ error: "BINGO_ACCOUNT 或 BINGO_PASSWORD 未配置" }, { status: 500 });
    }

    const loginResp = await fetch("https://qa-bo.789bingo.com/api/admin/index/login", {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://qa-bo.789bingo.com",
        referer: "https://qa-bo.789bingo.com/pc.html",
        "x-fingerprint": fingerprint,
        "x-lang": "zh",
        "x-session-platform-code": "bingo",
      },
      body: JSON.stringify({
        bIsManagementSide: 1,
        account,
        password,
      }),
    });

    const loginData = await loginResp.json();

    if (!loginResp.ok || !loginData?.success) {
      return Response.json({ error: "登录失败", detail: loginData }, { status: 500 });
    }

    const token = getTokenFromLoginResponse(loginData);

    if (!token) {
      return Response.json(
        {
          error: "登录成功但没有识别到 x-session-token，请按实际登录返回字段修改 getTokenFromLoginResponse",
          detail: loginData,
        },
        { status: 500 }
      );
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("projectCode", "cx_sports");
    uploadForm.append("platformCode", "1");
    uploadForm.append("userId", "1027571");
    uploadForm.append("expireAfterDays", "0");

    const uploadResp = await fetch("https://qa-upload.789bingo.com/api/upload/image", {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        origin: "https://qa-bo.789bingo.com",
        referer: "https://qa-bo.789bingo.com/",
        "x-fingerprint": fingerprint,
        "x-lang": "zh",
        "x-session-platform-code": "bingo",
        "x-session-token": token,
      },
      body: uploadForm,
    });

    const uploadData = await uploadResp.json();

    if (!uploadResp.ok || !uploadData?.success) {
      return Response.json({ error: "图片上传失败", detail: uploadData }, { status: 500 });
    }

    const host = uploadData?.t?.resServerHost;
    const path = uploadData?.t?.path;

    if (!host || !path) {
      return Response.json({ error: "上传成功但没有返回公网地址", detail: uploadData }, { status: 500 });
    }

    return Response.json({ imageUrl: `${host}${path}`, raw: uploadData });
  } catch (error: any) {
    return Response.json({ error: error?.message || "上传接口异常" }, { status: 500 });
  }
}
