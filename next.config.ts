import type { NextConfig } from "next";

const brotliAsset = (
  source: string,
  contentType: string,
): NonNullable<Awaited<ReturnType<NonNullable<NextConfig["headers"]>>>>[number] => ({
  source,
  headers: [
    { key: "Content-Encoding", value: "br" },
    { key: "Content-Type", value: contentType },
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  ],
});

const nextConfig: NextConfig = {
  async headers() {
    return [
      brotliAsset("/unity/Build/:file*.data.br", "application/octet-stream"),
      brotliAsset("/unity/Build/:file*.wasm.br", "application/wasm"),
      brotliAsset("/unity/Build/:file*.js.br", "application/javascript"),
    ];
  },
};

export default nextConfig;
