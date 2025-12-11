import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDb } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

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
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const data = snap.data() as Blog;
      const imgSnaps = await getDocs(collection(db, "blogs", id, "images"));
      const imgs = imgSnaps.docs
        .map((d) => d.data() as any)
        .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
      const parser = new DOMParser();
      const docEl = parser.parseFromString(data.content || "", "text/html");
      let idx = 0;
      Array.from(docEl.body.querySelectorAll("img[data-image-index]"))
        .forEach((el) => {
          const info = imgs[idx++];
          if (info?.dataUrl) (el as HTMLImageElement).src = info.dataUrl;
          el.removeAttribute("data-image-index");
        });
      const html = docEl.body.innerHTML;
      setBlog({ ...data, content: html });
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
