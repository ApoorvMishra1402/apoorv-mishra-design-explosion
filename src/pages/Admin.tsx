import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getDb } from "@/lib/firebase";
import { addDoc, collection, getDocs, orderBy, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAppConfig } from "@/lib/appConfig";
import { Button } from "@/components/ui/button";
import { MessagesSection } from "@/components/MessagesSection";

const Admin = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  type Block =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "quote"; text: string }
    | { type: "image"; url: string };
  const [blocks, setBlocks] = useState<Block[]>([{ type: "heading", text: "" }, { type: "paragraph", text: "" }]);
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("primary");
  const [blogs, setBlogs] = useState<Array<{ id: string; title: string; excerpt: string; date: string; active?: boolean }>>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!date) setDate(new Date().toISOString().slice(0, 10));
  }, [date]);

  const moveBlock = (from: number, to: number) => {
    setBlocks((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const compressFileToDataUrl = (file: File, maxW = 1024, maxH = 768, quality = 0.7) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("canvas"));
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const refreshBlogs = async () => {
    const db = await getDb();
    const q = query(collection(db, "blogs"), orderBy("date", "desc"));
    const snaps = await getDocs(q);
    const list = snaps.docs.map((d) => {
      const data = d.data() as any;
      return { id: d.id, title: data.title, excerpt: data.excerpt, date: data.date, active: data.active !== false };
    });
    setBlogs(list);
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  const serializeBlocks = (bs: Block[]) => {
    const images: string[] = [];
    const html = bs
      .map((b) => {
        if (b.type === "heading") return `<h2>${(b as any).text}</h2>`;
        if (b.type === "paragraph") return `<p>${(b as any).text}</p>`;
        if (b.type === "quote") return `<blockquote>${(b as any).text}</blockquote>`;
        if (b.type === "image") {
          const idx = images.push((b as any).url) - 1;
          return `<img data-image-index="${idx}" alt="" />`;
        }
        return "";
      })
      .join("\n");
    return { html, images };
  };

  const handleCreate = async () => {
    const db = await getDb();
    const { html, images } = serializeBlocks(blocks);
    const docRef = await addDoc(collection(db, "blogs"), {
      title,
      excerpt,
      content: html,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      date,
      readTime: "5 min read",
      color,
      active: true,
    });
    if (images.length) {
      await Promise.all(
        images.map((dataUrl, index) => addDoc(collection(db, "blogs", docRef.id, "images"), { index, dataUrl })),
      );
    }
    setTitle("");
    setExcerpt("");
    setBlocks([{ type: "heading", text: "" }, { type: "paragraph", text: "" }]);
    setTags("");
    alert(`Blog created: ${docRef.id}`);
    refreshBlogs();
  };

  const parseHtmlToBlocks = (html: string): Block[] => {
    const blocks: Block[] = [];
    const parser = new DOMParser();
    const docEl = parser.parseFromString(html, "text/html");
    Array.from(docEl.body.children).forEach((el) => {
      const tag = el.tagName.toLowerCase();
      if (tag === "h2") blocks.push({ type: "heading", text: el.textContent || "" });
      else if (tag === "p") blocks.push({ type: "paragraph", text: el.textContent || "" });
      else if (tag === "blockquote") blocks.push({ type: "quote", text: el.textContent || "" });
      else if (tag === "img") {
        const idxAttr = (el as HTMLElement).getAttribute("data-image-index");
        if (idxAttr != null) blocks.push({ type: "image", url: "" });
      }
    });
    return blocks;
  };

  const startEdit = async (id: string) => {
    const db = await getDb();
    const q = query(collection(db, "blogs"));
    const snaps = await getDocs(q);
    const found = snaps.docs.find((d) => d.id === id);
    if (!found) return;
    const data = found.data() as any;
    setTitle(data.title || "");
    setExcerpt(data.excerpt || "");
    setColor(data.color || "primary");
    setDate(data.date || new Date().toISOString().slice(0, 10));
    setTags(Array.isArray(data.tags) ? data.tags.join(", ") : "");
    const bs = parseHtmlToBlocks(data.content || "");
    const imgSnaps = await getDocs(collection(db, "blogs", id, "images"));
    const images = imgSnaps.docs
      .map((d) => d.data() as any)
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    let imgIdx = 0;
    setBlocks(
      bs.map((b) => (b.type === "image" ? { type: "image", url: images[imgIdx++]?.dataUrl || "" } : b)),
    );
    setEditingId(id);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const db = await getDb();
    const { html, images } = serializeBlocks(blocks);
    await updateDoc(doc(db, "blogs", editingId), {
      title,
      excerpt,
      content: html,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      date,
      color,
    });
    const existing = await getDocs(collection(db, "blogs", editingId, "images"));
    await Promise.all(existing.docs.map((d) => deleteDoc(d.ref)));
    if (images.length) {
      await Promise.all(
        images.map((dataUrl, index) => addDoc(collection(db, "blogs", editingId, "images"), { index, dataUrl })),
      );
    }
    setEditingId(null);
    refreshBlogs();
  };

  const removeBlog = async (id: string) => {
    const db = await getDb();
    await deleteDoc(doc(db, "blogs", id));
    refreshBlogs();
  };

  const toggleActive = async (id: string, next: boolean) => {
    const db = await getDb();
    await updateDoc(doc(db, "blogs", id), { active: next });
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, active: next } : b)));
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
      <div className="grid gap-4 max-w-3xl">
        <input className="w-full px-3 py-2 border bg-card" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full px-3 py-2 border bg-card" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <div className="border bg-card p-3">
          <div className="flex gap-2 mb-3">
            <Button variant="outline" onClick={() => setBlocks((b) => [...b, { type: "heading", text: "New heading" }])}>Add Heading</Button>
            <Button variant="outline" onClick={() => setBlocks((b) => [...b, { type: "paragraph", text: "New paragraph" }])}>Add Paragraph</Button>
            <Button variant="outline" onClick={() => setBlocks((b) => [...b, { type: "quote", text: "Quote" }])}>Add Quote</Button>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = await compressFileToDataUrl(file);
                setBlocks((b) => [...b, { type: "image", url }]);
              }} />
              <span className="px-3 py-2 border rounded">Add Image</span>
            </label>
          </div>
          <div>
            {blocks.map((b, i) => (
              <div key={i} className="group mb-2 border p-2 bg-background" draggable onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", String(i));
              }} onDragOver={(e) => {
                e.preventDefault();
                const from = Number(e.dataTransfer.getData("text/plain"));
                if (!Number.isNaN(from) && from !== i) moveBlock(from, i);
              }}>
                <div className="text-xs text-muted-foreground mb-1">{b.type}</div>
                {b.type !== "image" ? (
                  <input className="w-full px-2 py-1 border bg-card" value={(b as any).text} onChange={(e) => {
                    const val = e.target.value;
                    setBlocks((prev) => prev.map((blk, idx) => idx === i ? ({ ...blk, text: val } as any) : blk));
                  }} />
                ) : (
                  <img src={(b as any).url} alt="" className="max-h-40 object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
        <input className="w-full px-3 py-2 border bg-card" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input className="w-full px-3 py-2 border bg-card" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
        <div className="flex gap-2">
          {(["primary","secondary","accent"] as const).map((c) => (
            <button key={c} className={`px-3 py-2 border ${color===c?"border-foreground":"border-border"}`} onClick={() => setColor(c)} type="button">
              {c}
            </button>
          ))}
        </div>
        {editingId ? (
          <div className="flex gap-2">
            <Button onClick={saveEdit}>Save Changes</Button>
            <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={handleCreate}>Create Blog</Button>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Existing Blogs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {blogs.map((b) => (
            <div key={b.id} className="border-2 border-border bg-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-muted-foreground">{b.date}</div>
                </div>
                <span className={`text-xs px-2 py-1 border ${b.active?"border-primary text-primary":"border-muted text-muted-foreground"}`}>{b.active?"Active":"Inactive"}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{b.excerpt}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => startEdit(b.id)}>Edit</Button>
                <Button variant="destructive" onClick={() => removeBlog(b.id)}>Delete</Button>
                <Button variant="outline" onClick={() => toggleActive(b.id, !b.active)}>{b.active?"Mark Inactive":"Mark Active"}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <MessagesSection />
      </div>
    </div>
  );
};

export default Admin;
