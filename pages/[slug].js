import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "markdown-to-jsx";

function BlogPost({ post }) {
  return <ReactMarkdown>{post.content}</ReactMarkdown>;
}

export default BlogPost;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);
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
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
