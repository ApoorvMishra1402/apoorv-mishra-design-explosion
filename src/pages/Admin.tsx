import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getDb } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!date) setDate(new Date().toISOString().slice(0, 10));
  }, [date]);

  const handleCreate = async () => {
    const db = await getDb();
    const docRef = await addDoc(collection(db, "blogs"), {
      title,
      excerpt,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      date,
      readTime: "5 min read",
      color: "primary",
    });
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    alert(`Blog created: ${docRef.id}`);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <div className="space-y-4">
          <input className="w-full px-3 py-2 border bg-card" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full px-3 py-2 border bg-card" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => login(email, password)}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
      <div className="grid gap-4 max-w-2xl">
        <input className="w-full px-3 py-2 border bg-card" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full px-3 py-2 border bg-card" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <textarea className="w-full px-3 py-2 border bg-card h-40" placeholder="Content (HTML allowed)" value={content} onChange={(e) => setContent(e.target.value)} />
        <input className="w-full px-3 py-2 border bg-card" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input className="w-full px-3 py-2 border bg-card" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button onClick={handleCreate}>Create Blog</Button>
      </div>
    </div>
  );
};

export default Admin;
