import { useRouter } from "next/router";

export default function Hero({ posts }) {
  const router = useRouter();
  const openRandomPost = async () => {
    // Read the list of posts from the /posts directory using the fetch API

    // Pick a random post from the list
    const randomIndex = Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomIndex];

    // Return the slug of the randomly selected post
    router.push(`/${randomPost.slug}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-800 to-black text-white text-center">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-5xl leading-none mb-2 font-bold">
          <span className="text-gradient-to-r main-head">An AI For An AI</span>{" "}
          <span className="align-middle">👀</span>
        </h1>
        <p className="text-3xl font-light mb-8 text-white">
          Learn the latest in AI and machine learning from experts in the field.
        </p>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 rounded-lg shadow-md hover:shadow-lg button hover:-translate-y-1 transition-all duration 200 text-white"
            onClick={() => openRandomPost()}
          >
            Explore a Random Post
          </button>
        </div>
      </div>
    </div>
  );
}
