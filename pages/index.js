import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Hero from "../components/Hero";

function Blog({ posts }) {
  return (
    <>
      <Hero posts={posts} />
      <ul className="flex flex-wrap mt-10 justify-center space-x-8">
        {posts.map((post) => (
          <li key={post.slug} className="w-1/3 text-orange-500">
            <Link href="/[slug]" as={`/${post.slug}`}>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="mb-2 text-gray-700">{post.date}</p>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 rounded-lg object-cover"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
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
      slug: filename.replace(".md", ""),
      ...data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
