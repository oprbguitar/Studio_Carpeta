"use strict";

const DEFAULT_ALLOWED_MODELS = [
  "openrouter/free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3.6-plus-preview:free"
];

function isFreeModel(model) {
  return model === "openrouter/free" || model.endsWith(":free");
}

function allowedModels() {
  const configured = (process.env.AI_ALLOWED_MODELS || "")
    .split(",")
    .map(model => model.trim())
    .filter(Boolean);
  return (configured.length ? configured : DEFAULT_ALLOWED_MODELS).filter(isFreeModel);
}

module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: { code: "method_not_allowed", message: "Usa GET para listar modelos." } }));
    return;
  }

  const models = allowedModels();
  const defaultModel = models.includes(process.env.AI_MODEL_DEFAULT)
    ? process.env.AI_MODEL_DEFAULT
    : models[0] || "openrouter/free";

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({
    provider: process.env.AI_PROVIDER || "openrouter",
    defaultModel,
    models: models.map(id => ({ id, label: id }))
  }));
};
