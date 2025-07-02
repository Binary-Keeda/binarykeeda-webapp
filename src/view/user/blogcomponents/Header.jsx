const Header = ({ blog }) => {
  return (
    <header className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-14 pb-0">
      <p className="uppercase text-xs tracking-wide text-orange-500 font-semibold mb-2">
        {blog.category || "Roadmap"} · {blog.readTime || "15 minute read"}
      </p>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800 mb-3">
        {blog.title}
      </h1>

      {/* <p className="text-sm text-gray-500">
        Published on {blog.publishedDate || "June 14, 2025"}
      </p> */}
    </header>
  );
};

export default Header;
