import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

function Blog({ posts }) {
  function createDescription(content) {
    const description = content.substring(0, 140);
    return `${description}...`;
  }
  return (
    <>
      <Nav />
      <Hero posts={posts} />
      <ul className="flex flex-wrap mt-10 justify-center 2xl:mx-16">
        {posts.map((post) => (
          <li
            key={post.slug}
            className=" text-orange-500 w-full sm:w-[45%] md:w-[30%] mx-4 my-4"
          >
            <Link href="/[slug]" as={`/${post.slug}`}>
              <div className="bg-white  rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <i className="fas fa-bookmark text-violet-500"></i>
                </div>
                <p className=" text-gray-700 -mt-1">{post.date}</p>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={"/images/" + post.slug + ".png"}
                    alt={post.title}
                    className="w-full rounded-lg object-cover h-64"
                    width={800}
                    height={500}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-search text-violet-400 text-5xl"></i>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">
                  {createDescription(post.description)}
                </p>
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
