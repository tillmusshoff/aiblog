import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import Image from "next/image";

function BlogPost({ post }) {
  const router = useRouter();
  //get slugg of page
  const { slug } = router.query;
  return (
    <div>
      <Nav />
      <div className="mx-4">
        <div className="max-w-4xl mx-auto px-6 py-8 bg-gray-100 rounded-lg shadow-lg mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-4">
              {post.data.title}
            </h1>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={"/images/" + slug + ".png"}
                alt={post.title}
                className="w-full rounded-lg object-cover"
                width={800}
                height={500}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-search text-violet-400 text-5xl"></i>
              </div>
            </div>
            <p className="text-violet-700 mb-6 text-right">
              {post.data.date} <span>, Author: {post.data.author}</span>
            </p>
            <div className="prose prose-lg text-gray-500">
              <ReactMarkdown className="text-gray-500">
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = matter(fileContent);

  return {
    props: {
      post: {
        ...data,
        content: data.content,
        orig: data.orig.toString(), // Convert the Uint8Array to a string
      },
    },
  };
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
