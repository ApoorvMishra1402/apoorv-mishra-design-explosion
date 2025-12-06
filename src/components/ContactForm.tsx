import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      // Using Formspree - replace with your form ID
      const response = await fetch("https://formspree.io/f/xpwzgvkq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setStatus("error");
      toast({
        title: "Failed to send",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-mono text-muted-foreground uppercase">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`w-full px-4 py-3 bg-card border-2 ${
            errors.name ? "border-destructive" : "border-border"
          } text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors`}
        />
        {errors.name && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-mono text-muted-foreground uppercase">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 bg-card border-2 ${
            errors.email ? "border-destructive" : "border-border"
          } text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors`}
        />
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-mono text-muted-foreground uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          rows={5}
          className={`w-full px-4 py-3 bg-card border-2 ${
            errors.message ? "border-destructive" : "border-border"
          } text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none`}
        />
        {errors.message && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground text-right">
          {formData.message.length}/1000
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle size={18} />
            Message Sent!
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};
