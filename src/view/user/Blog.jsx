// import Navbar from "./blogcomponents/Navbar";
// import Header from "./blogcomponents/Header";
// import Sidebar from "./blogcomponents/Sidebar";
// import BlogContent from "./blogcomponents/Content";
// import Footer from "./blogcomponents/Footer";

// const BlogLayout = () => (
//   <div className="bg-white text-black font-sans">
//     {/* <Navbar /> */}
//     <Header />
//     <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6">
//       <Sidebar />
//       <div className="lg:col-span-3">
//         <BlogContent />
//       </div>
//     </div>
//     <Footer />
//   </div>
// );

// export default BlogLayout;

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import Navbar from "./blogcomponents/Navbar";
import Header from "./blogcomponents/Header";
import Sidebar from "./blogcomponents/Sidebar";
import BlogContent from "./blogcomponents/Content";
import Footer from "./blogcomponents/Footer";

import blogs from "./data/blogData.json"; 

const BlogLayout = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogs.find((b) => b.slug === slug);
    setBlog(found);
  }, [slug]);

  if (!blog) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-white text-black font-sans">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.keywords.join(", ")} />
        <meta name="author" content="Vaibhav Chauhan" />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${slug}`} />
      </Helmet>

      <Header blog={blog} />
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-4 gap-10 mt-2">
        <Sidebar sections={blog.sections} />
        <div className="lg:col-span-3">
          <BlogContent sections={blog.sections} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
