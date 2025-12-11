import { useEffect, useState } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

type Message = { id: string; name: string; email: string; message: string; processed?: boolean };

export const MessagesSection = ({ adminUid }: { adminUid?: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const db = await getDb();
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const snaps = await getDocs(q);
        const list: Message[] = snaps.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setMessages(list);
      } catch {
        setMessages([]);
      }
    })();
  }, []);

  const toggleProcessed = async (m: Message) => {
    const db = await getDb();
    await updateDoc(doc(db, "messages", m.id), { processed: !m.processed });
    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, processed: !x.processed } : x)));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Incoming Messages</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {messages.map((m) => (
            <div key={m.id} className="border-2 border-border bg-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <a href={`mailto:${m.email}`} className="text-sm text-primary underline">{m.email}</a>
                </div>
                <span className={`text-xs px-2 py-1 border ${m.processed?"border-primary text-primary":"border-muted text-muted-foreground"}`}>{m.processed?"Processed":"Unprocessed"}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{m.message}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toggleProcessed(m)}>{m.processed?"Mark Unprocessed":"Mark Processed"}</Button>
                <a href={`mailto:${m.email}`} className="px-3 py-2 border rounded">Email</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
