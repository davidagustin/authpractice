# Install pnpm globally
FROM node:20-alpine AS base
RUN npm install -g pnpm

# Build the application
FROM base AS builder
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY . .
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi && pnpm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HTTPS=true

# Don't run as root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000 3001
CMD ["pnpm", "start:https"] 