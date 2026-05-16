"use client";

import { useRef, useState } from "react";

type Status = "idle" | "uploading" | "creating" | "polling" | "success" | "failed";
type Template = "cherry" | "tiktok" | "happyhorse" | "baseball";

const TIKTOK_REFERENCE_VIDEO = "https://litter.catbox.moe/49eknj.mp4";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [taskId, setTaskId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("上传人物图片，选择模板，一键生成热门短视频");
  const [template, setTemplate] = useState<Template>("cherry");
  const needImage = template !== "happyhorse";
  const fileRef = useRef<HTMLInputElement | null>(null);

  function onPickFile(nextFile?: File) {
    if (!nextFile) return;
    setFile(nextFile);
    setImageUrl("");
    setVideoUrl("");
    setTaskId("");
    setStatus("idle");
    setMessage("图片已选择，可以开始生成");
    setPreview(URL.createObjectURL(nextFile));
  }

  function onSelectTemplate(next: Template) {
    setTemplate(next);
    setVideoUrl("");
    setTaskId("");
    setStatus("idle");
    setMessage(
      next === "tiktok"
        ? "已选择 TikTok 舞蹈模板，上传人物图片后生成换人舞蹈视频"
        : next === "happyhorse"
        ? "已选择 Happy Horse 模板，无需上传图片，直接生成品牌视频"
        : next === "baseball"
        ? "已选择球场看球模板，上传自拍后生成球场反应镜头，衣服带 789Bingo logo"
        : "已选择樱花树下的约定模板，上传人物图片后生成视频"
    );
  }

  async function pollTask(nextTaskId: string) {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 15000));

      const resp = await fetch("/api/task-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: nextTaskId }),
      });

      const data = await resp.json();
      const taskStatus = data?.output?.task_status;

      if (taskStatus === "SUCCEEDED") {
        const output = data?.output || {};
        const url =
          output.video_url ||
          output.watermark_video_url ||
          output.output_video_url ||
          output.result_url ||
          output.video?.url ||
          output.results?.video_url ||
          output.results?.url ||
          output.results?.[0]?.video_url ||
          output.results?.[0]?.url ||
          "";
        setVideoUrl(url);
        setStatus("success");
        setMessage(
          url
            ? "视频生成成功"
            : `视频生成成功，但未找到视频字段。原始 output：${JSON.stringify(output)}`
        );
        return;
      }

      if (["FAILED", "CANCELED", "UNKNOWN"].includes(taskStatus)) {
        setStatus("failed");
        setMessage(`视频生成失败：${JSON.stringify(data)}`);
        return;
      }

      setMessage(`视频生成中，当前状态：${taskStatus || "处理中"}`);
    }
  }

  async function handleGenerate() {
    if (needImage && !file) {
      alert("请先上传人物图片");
      return;
    }

    try {
      setVideoUrl("");
      setTaskId("");

      let uploadedImageUrl = "";

      if (needImage) {
        setStatus("uploading");
        setMessage("正在上传图片到图床...");

        const formData = new FormData();
        formData.append("file", file as File);

        const uploadResp = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResp.json();

        if (!uploadResp.ok || !uploadData?.imageUrl) {
          throw new Error(`图片上传失败：${JSON.stringify(uploadData)}`);
        }

        uploadedImageUrl = uploadData.imageUrl;
        setImageUrl(uploadedImageUrl);
        setMessage("公网图片地址已生成，正在创建视频任务...");
      } else {
        setImageUrl("");
        setMessage("正在创建文生视频任务...");
      }

      setStatus("creating");

      const endpoint =
        template === "tiktok"
          ? "/api/generate-tiktok-dance"
          : template === "happyhorse"
          ? "/api/generate-happy-horse"
          : template === "baseball"
          ? "/api/generate-baseball-fan"
          : "/api/generate-video";

      const generateResp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: needImage ? JSON.stringify({ imageUrl: uploadedImageUrl }) : "{}",
      });

      const generateData = await generateResp.json();
      const nextTaskId = generateData?.output?.task_id;

      if (!generateResp.ok || !nextTaskId) {
        throw new Error(`视频任务创建失败：${JSON.stringify(generateData)}`);
      }

      setTaskId(nextTaskId);
      setStatus("polling");
      setMessage("视频任务已创建，正在等待生成结果...");
      await pollTask(nextTaskId);
    } catch (error: any) {
      setStatus("failed");
      setMessage(error?.message || "处理失败");
    }
  }

  const loading = ["uploading", "creating", "polling"].includes(status);

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">789Bingo AI Video</div>
        <h1>抖音热门视频生成</h1>
        <p>{message}</p>
      </section>

      <section className="card">
        <div className="templateHeader">
          <span>模板选择</span>
          <small>当前开放 4 个模板</small>
        </div>

        <div className="templateGrid">
          <button
            className={`templateButton ${template === "cherry" ? "active" : ""}`}
            type="button"
            onClick={() => onSelectTemplate("cherry")}
          >
            樱花树下的约定
          </button>
          <button
            className={`templateButton tiktok ${template === "tiktok" ? "active" : ""}`}
            type="button"
            onClick={() => onSelectTemplate("tiktok")}
          >
            TikTok 舞蹈
          </button>
          <button
            className={`templateButton happyhorse ${template === "happyhorse" ? "active" : ""}`}
            type="button"
            onClick={() => onSelectTemplate("happyhorse")}
          >
            Happy Horse 文生
          </button>
          <button
            className={`templateButton baseball ${template === "baseball" ? "active" : ""}`}
            type="button"
            onClick={() => onSelectTemplate("baseball")}
          >
            球场看球
          </button>
        </div>

        {template === "tiktok" && (
          <div className="referenceBox">
            <strong>原始参考视频</strong>
            <video src={TIKTOK_REFERENCE_VIDEO} controls playsInline muted />
            <span>系统会让你上传的人物跳出与这段视频相同的舞蹈动作</span>
          </div>
        )}

        {template === "happyhorse" && (
          <div className="referenceBox">
            <strong>纯文生视频</strong>
            <span>该模板无需上传图片，直接点击下方按钮即可生成 Happy Horse 品牌视频</span>
          </div>
        )}

        {template === "baseball" && (
          <div className="referenceBox">
            <strong>球场看球模板</strong>
            <span>
              上传一张正脸自拍，系统会生成韩国职业棒球直播镜头切到你看球反应的视频，衣服胸口会自动印上 789Bingo
              logo
            </span>
          </div>
        )}

        {needImage && (
          <div className="uploadBox" onClick={() => fileRef.current?.click()}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => onPickFile(event.target.files?.[0])}
            />

            {preview ? (
              <img src={preview} alt="人物图片预览" />
            ) : (
              <div>
                <strong>上传人物图片</strong>
                <span>点击选择 Image 2 人物参考图</span>
              </div>
            )}
          </div>
        )}

        <button className="generateButton" type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? "生成处理中..." : "立即生成视频"}
        </button>

        {imageUrl && (
          <div className="infoBox">
            <strong>公网图片地址</strong>
            <span>{imageUrl}</span>
          </div>
        )}

        {taskId && (
          <div className="infoBox">
            <strong>任务 ID</strong>
            <span>{taskId}</span>
          </div>
        )}
      </section>

      {videoUrl && (
        <section className="result">
          <h2>生成结果</h2>
          <video src={videoUrl} controls autoPlay loop playsInline />
          <div className="infoBox">
            <strong>视频链接</strong>
            <span>{videoUrl}</span>
            <div className="linkActions">
              <a href={videoUrl} target="_blank" rel="noreferrer">
                新窗口打开
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(videoUrl);
                  setMessage("视频链接已复制到剪贴板");
                }}
              >
                复制链接
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
