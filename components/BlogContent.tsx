"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface BlogContentProps {
  content: any[];
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      
      // Convert Sanity image ref to URL
      const imageUrl = value.asset.url || `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`;
      
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-center text-neutral-400 mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="my-6">
          <SyntaxHighlighter
            language={value.language || "javascript"}
            style={oneDark}
            customStyle={{
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-neutral-300 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-neutral-300 bg-neutral-800/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-300">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-neutral-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-neutral-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
