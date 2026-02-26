# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci

# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time args (ESTOS DEBEN ESTAR AQUÍ)
ARG NEXT_PUBLIC_FASTAPI_URL
ARG NEXT_PUBLIC_USE_FAKE_API
ARG NEXT_PUBLIC_WATSON_INTEGRATION_ID
ARG NEXT_PUBLIC_WATSON_REGION
ARG NEXT_PUBLIC_WATSON_SERVICE_INSTANCE_ID
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG FASTAPI_URL

# Disponibles durante "next build"
ENV NEXT_PUBLIC_FASTAPI_URL=$NEXT_PUBLIC_FASTAPI_URL \
    NEXT_PUBLIC_USE_FAKE_API=$NEXT_PUBLIC_USE_FAKE_API \
    NEXT_PUBLIC_WATSON_INTEGRATION_ID=$NEXT_PUBLIC_WATSON_INTEGRATION_ID \
    NEXT_PUBLIC_WATSON_REGION=$NEXT_PUBLIC_WATSON_REGION \
    NEXT_PUBLIC_WATSON_SERVICE_INSTANCE_ID=$NEXT_PUBLIC_WATSON_SERVICE_INSTANCE_ID \
    NEXTAUTH_URL=$NEXTAUTH_URL \
    NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
    FASTAPI_URL=$FASTAPI_URL

RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]