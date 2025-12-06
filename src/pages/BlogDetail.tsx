import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDb } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Blog = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime?: string;
  color?: string;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const db = await getDb();
      const snap = await getDoc(doc(db, "blogs", id));
      if (snap.exists()) setBlog(snap.data() as Blog);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="container mx-auto px-6 py-16">Loading...</div>;
  if (!blog) return <div className="container mx-auto px-6 py-16">Not found</div>;

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-muted-foreground mb-8">{blog.excerpt}</p>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetail;
