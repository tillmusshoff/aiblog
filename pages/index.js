import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="text-orange-500">
          <Link href="/[slug]" as={`/${post.slug}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Blog;

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      ...data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
