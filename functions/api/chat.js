/* Cloudflare Pages Functions：/api/chat
   GET  -> 服务与知识库状态；POST -> RAG 问答
   密钥通过 Cloudflare Secret「GLM_API_KEY」注入，不进入前端代码。 */
import { handleApi } from "../_lib/handler.js";

export const onRequestGet = (ctx) => handleApi(ctx.request, ctx.env);
export const onRequestPost = (ctx) => handleApi(ctx.request, ctx.env);
export const onRequestOptions = (ctx) => handleApi(ctx.request, ctx.env);
