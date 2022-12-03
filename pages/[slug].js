import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Nav from "../components/Nav";

function BlogPost({ post }) {
  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.date}</p>
        <div className="prose prose-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </>
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
