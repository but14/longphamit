import { client } from './client'

export interface BlogPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: {
    vi: string
    en: string
  }
  slug: {
    current: string
  }
  excerpt: {
    vi: string
    en: string
  }
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  content: {
    vi: any[]
    en: any[]
  }
  tags?: string[]
  publishedAt: string
  readTime?: number
  isDraft: boolean
}

// Fetch all published blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post" && isDraft != true] | order(publishedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      "coverImage": coverImage {
        "url": asset->url,
        alt
      },
      tags,
      publishedAt,
      readTime,
      isDraft
    }`
  )
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      "coverImage": coverImage {
        "url": asset->url,
        alt
      },
      content,
      tags,
      publishedAt,
      readTime,
      isDraft
    }`,
    { slug }
  )
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const result = await client.fetch(
    `*[_type == "post" && isDraft != true] {
      tags
    }`
  )
  const allTags = result.flatMap((post: any) => post.tags || [])
  return Array.from(new Set(allTags))
}

// Search posts by query - Currently disabled due to TypeScript compatibility
// export async function searchPosts(query: string): Promise<BlogPost[]> {
//   const params: { query: string } = { query: `*${query}*` }
//   return client.fetch<BlogPost[]>(
//     `*[_type == "post" && isDraft != true && (
//       title.vi match $query || 
//       title.en match $query || 
//       excerpt.vi match $query || 
//       excerpt.en match $query ||
//       $query in tags
//     )] | order(publishedAt desc) {
//       _id,
//       _createdAt,
//       _updatedAt,
//       title,
//       slug,
//       excerpt,
//       "coverImage": coverImage {
//         "url": asset->url,
//         alt
//       },
//       tags,
//       publishedAt,
//       readTime,
//       isDraft
//     }`,
//     params
//   )
// }
