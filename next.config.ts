import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // output standalone is Docker-only
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async redirects() {
    return [
      { source: '/philosophy', destination: '/curriculum', permanent: true },
      { source: '/scenes', destination: '/curriculum', permanent: true },
      { source: '/labs', destination: '/curriculum', permanent: true },
      { source: '/labs/all', destination: '/scenes/all', permanent: true },
      { source: '/labs/:slug', destination: '/scenes/:slug', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
